import { adminSupabase } from '@/lib/supabase-server'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import path from 'path'
import { isAllowedFileSignature } from '../utils/validateImage';

const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const allowedExtensions = ["jpg", "jpeg", "png", "webp", "pdf"]

const MAX_FILE_SIZE = 1 * 1024 * 1024 // 1MB

// Deteksi provider dari env
const isLocalStorage = process.env.DATABASE_NAME !== 'SUPABASE'
// Path di luar root Next.js
const BUCKET_NAME = 'invoices';
const LOCAL_STORAGE_BASE = path.resolve(process.cwd(), `../storage/${BUCKET_NAME}`)

export class StorageService {
  static async validateFile(file: File): Promise<{ isValid: boolean; message?: string }> {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return {
        isValid: false,
        message: 'File type not allowed. Only JPEG and PNG are allowed.'
      }
    }

    const ext = file.name.split(".").pop()?.toLowerCase()

    if (!ext || !allowedExtensions.includes(ext)) {
      throw new Error("Invalid file extension")
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    if (!isAllowedFileSignature(buffer)) {
      throw new Error("File signature invalid")
    }

    if (file.size > MAX_FILE_SIZE) {
      return {
        isValid: false,
        message: 'File too large. Maximum size is 5MB.'
      }
    }

    return { isValid: true }
  }

  static async createBucketIfNotExists(bucketName: string = BUCKET_NAME): Promise<{ success: boolean; error?: any }> {
    try {
      const { data, error } = await adminSupabase.storage.getBucket(bucketName)

      if (!data) {
        const { error: createError } = await adminSupabase.storage.createBucket(bucketName, {
          public: true,
          allowedMimeTypes: ALLOWED_FILE_TYPES,
          fileSizeLimit: MAX_FILE_SIZE
        })

        if (createError) {
          console.error('Failed to create bucket:', createError)
          return { success: false, error: createError }
        }
      }

      return { success: true }
    } catch (error) {
      console.error('Error checking/creating bucket:', error)
      return { success: false, error }
    }
  }

  static async upload(
    file: File
  ): Promise<{ success: boolean; photoUrl?: string; error?: string }> {

    if (isLocalStorage) {
      return this.uploadToLocal(file)
    } else {
      return this.uploadToSupabase(file)
    }
  }

  public static async uploadToSupabase(
    file: File) {

    try {
      // Validasi file
      const validation = await this.validateFile(file)
      if (!validation.isValid) {
        return { success: false, message: validation.message }
      }

      // Konversi file ke buffer
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Generate unique filename
      const fileExtension = file.name.split('.').pop() || 'jpg'
      const fileName = `${uuidv4()}.${fileExtension}`

      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')

      const filePath = `invoice/${year}/${month}/${day}/${fileName}`

      // Pastikan bucket ada
      const bucketResult = await this.createBucketIfNotExists()
      if (!bucketResult.success) {
        return { success: false, message: 'Failed to initialize storage' }
      }

      // Upload ke Supabase Storage
      const { error: uploadError } = await adminSupabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, buffer, {
          contentType: file.type,
          upsert: false,
          cacheControl: '3600'
        })

      if (uploadError) {
        console.error('error upload supabase: ', uploadError)
        return { success: false, message: 'Failed to upload photo to storage' }
      }

      // Dapatkan URL publik
      const { data: urlData } = adminSupabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath)
      console.log('upload selesai')
      return {
        success: true,
        photoUrl: urlData.publicUrl
      }

    } catch (error) {
      console.error('Storage service error:', error)
      return { success: false, message: 'Failed to process file upload' }
    }
  }

  private static async uploadToLocal(
    file: File
  ): Promise<{ success: boolean; photoUrl?: string; error?: string }> {
    try {
      const buffer = Buffer.from(await file.arrayBuffer())

      const employeeDir = path.join(LOCAL_STORAGE_BASE)
      fs.mkdirSync(employeeDir, { recursive: true })

      // Nama file: CHECK_IN_2024-01-15T10-30-00.jpg
      const ext = file.name.split('.').pop() || 'jpg'
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
      const fileName = `$${timestamp}.${ext}`
      const filePath = path.join(employeeDir, fileName)

      // Tulis file
      fs.writeFileSync(filePath, buffer)

      // URL yang disimpan ke DB (relative path untuk serve via API route)
      const photoUrl = `/api/${BUCKET_NAME}/photo/${fileName}`

      return { success: true, photoUrl }
    } catch (error) {
      console.error('Local storage upload error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to save photo'
      }
    }
  }
}