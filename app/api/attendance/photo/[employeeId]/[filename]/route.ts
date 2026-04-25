// app/api/attendance/photo/[employeeId]/[filename]/route.ts
import fs from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

const LOCAL_STORAGE_BASE = path.resolve(process.cwd(), '../storage/attendance')

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ employeeId: string; filename: string }> }
) {
  const resolvedParams = await params;
  const filePath = path.join(LOCAL_STORAGE_BASE, resolvedParams.employeeId, resolvedParams.filename)
  
  // Security: pastikan path tidak keluar dari storage folder
  const resolvedPath = path.resolve(filePath)
  const resolvedBase = path.resolve(LOCAL_STORAGE_BASE)
  if (!resolvedPath.startsWith(resolvedBase)) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  if (!fs.existsSync(filePath)) {
    return new NextResponse('Not Found', { status: 404 })
  }

  const buffer = fs.readFileSync(filePath)
  const ext = resolvedParams.filename.split('.').pop()?.toLowerCase()
  const mimeTypes: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp'
  }

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': mimeTypes[ext || 'jpg'] ?? 'image/jpeg',
      'Cache-Control': 'private, max-age=3600'
    }
  })
}