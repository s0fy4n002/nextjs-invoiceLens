import { NextRequest, NextResponse } from 'next/server'
import { comparePassword } from '@/lib/password'
import { signToken } from '@/lib/jwt'
import { prisma } from '@/lib/prisma';
import verifyRecaptcha from '@/lib/recapcha-service';

export async function POST(request: NextRequest) {
  try {
    const { email, password, recaptchaToken } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email dan password harus diisi' },
        { status: 400 }
      )
    }

    if (!recaptchaToken) {
      return NextResponse.json(
        { message: 'Token reCAPTCHA diperlukan' },
        { status: 400 }
      );
    }

    const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
      if (!isRecaptchaValid) {
        return NextResponse.json(
          { message: 'Verifikasi reCAPTCHA gagal. Silakan coba lagi.' },
          { status: 400 }
        );
      }

    // Cari user
    const user = await prisma.employee.findUnique({
      where: { email }
    })
    console.log('user: ', user)

    if (!user) {
      return NextResponse.json(
        { message: 'Email atau password salah' },
        { status: 401 }
      )
    }

    // Verifikasi password
    const isValidPassword = await comparePassword(password, user.password)
    console.log('isValidPassword ', isValidPassword)
    
    if (!isValidPassword) {
      return NextResponse.json(
        { message: 'Email atau password salah' },
        { status: 401 }
      )
    }

    // Generate token
    const token = await signToken({ userId: user.id, email: user.email })


    const response = NextResponse.json({
      message: 'Login berhasil',
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    })

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,     //7 days
      path: '/'
    })

    return response

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}