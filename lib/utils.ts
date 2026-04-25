import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const urlAdmin = process.env.NEXT_PUBLIC_URL_ADMIN || 'admin-panel'
const urlLogin = process.env.NEXT_PUBLIC_URL_LOGIN || 'login-panel'
export const adminUrl = urlAdmin.replace(/^\/+/, '');
export const loginUrl = urlLogin.replace(/^\/+/, '');