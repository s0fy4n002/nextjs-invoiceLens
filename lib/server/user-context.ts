import 'server-only'
import { cache } from 'react'
import { verifyToken } from '@/lib/jwt'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// Cache the user data per request
export const getCurrentUser = cache(async () => {
  
  console.log('di access ulang cache nya')
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')?.value

    if (!token) {
      redirect('/')
    }

    const payload = await verifyToken(token)
    
    if (!payload) {
      redirect('/')
    }

    const user = await prisma.employee.findFirst({
      where: { id: payload.userId },
      select: {
        id: true,
        name: true,
        email: true,
      }
    })

    if (!user) {
      redirect('/')
    }

    return user
  } catch (error) {
    console.error('Error getting current user:', error)
    redirect('/')
  }
})