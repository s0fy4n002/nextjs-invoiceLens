import { NextRequest, NextResponse } from 'next/server'
import { AttendanceService } from '@/lib/services/attendances/attendance.service'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Extract data from form
    const file = formData.get('photo') as File
    const employeeId = parseInt(formData.get('employeeId') as string)
    const type = formData.get('type') as 'CHECK_IN' | 'CHECK_OUT'
    const latitude = formData.get('latitude') as string
    const longitude = formData.get('longitude') as string
    const note = formData.get('note') as string

    // Use attendance service
    const result = await AttendanceService.recordAttendance(
      file,
      employeeId,
      type,
      latitude,
      longitude,
      note
    )

    if (!result.success) {
      const statusCode = result.message.includes('not found') ? 404 : 
                        result.message.includes('already') ? 400 : 
                        result.message.includes('Missing') ? 400 : 500
      
      return NextResponse.json(
        { 
          success: false,
          message: result.message,
          error: result.error 
        },
        { status: statusCode }
      )
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      data: result.data,
      type: result.type
    })

  } catch (error) {
    console.error('Error in attendance upload API:', error)
    return NextResponse.json(
      { 
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}