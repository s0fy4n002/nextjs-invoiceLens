import 'server-only'
import { getCurrentUser } from './user-context'

// Untuk mengakses user data di server components
export async function getUser() {
  return await getCurrentUser()
}


export async function getUserId() {
  const user = await getCurrentUser()
  return user.id
}