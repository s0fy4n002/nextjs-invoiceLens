// app/api/employees/register/route.ts
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'


export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      nik,
      name,
      email,
      phone,
      password,
      position,
      department,
      status = 'active',
      joinDate,
      recaptchaToken
    } = body

    // Validate required fields
    if (!nik || !name || !email || !password || !department || !position) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate recaptcha (optional - implement your recaptcha verification)
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'Recaptcha verification required' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingEmail = await prisma.employee.findUnique({
      where: { email }
    })

    if (existingEmail) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    // Check if NIK already exists
    const existingNik = await prisma.employee.findUnique({
      where: { nik }
    })

    if (existingNik) {
      return NextResponse.json(
        { error: 'NIK already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create employee
    const employee = await prisma.employee.create({
      data: {
        nik,
        name,
        email,
        phone: phone || null,
        password: hashedPassword,
        position,
        department,
        status,
        joinDate: joinDate ? new Date(joinDate) : null
      },
      select: {
        id: true,
        nik: true,
        name: true,
        email: true,
        phone: true,
        position: true,
        department: true,
        status: true,
        joinDate: true,
        createdAt: true
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Employee registered successfully',
      data: employee
    })

  } catch (error) {
    console.error('Error registering employee:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}