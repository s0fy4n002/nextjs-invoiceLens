export type AttendanceType = 'CHECK_IN' | 'CHECK_OUT'

export interface AttendanceUploadRequest {
  file: File
  employeeId: number
  type: AttendanceType
  latitude?: string
  longitude?: string
  note?: string
}

export interface AttendanceResponse {
  success: boolean
  message: string
  data?: any
  error?: string
}

export interface ValidationResult {
  isValid: boolean
  message?: string
  statusCode?: number
}