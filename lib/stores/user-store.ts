import { Employee } from '@/app/generated/prisma/client'
import { create } from 'zustand'

interface UserState {
  user: Employee | null
  setUser: (user: Employee) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}))