'use client'

import { useSidebar } from "@/components/ui/sidebar"
import { AlignJustify, User, LogOut, Settings, ChevronDown } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { redirect, RedirectType } from "next/navigation"
import Swal from "sweetalert2"

interface UserInterface{
  name:string
  email: string
  address:string
}
export default function NavbarSidebar({user}:{user:UserInterface}) {
  const { toggleSidebar } = useSidebar()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = async () => {

    return
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for cookies/session
    })

    if (response.ok) {
      redirect('/', RedirectType.push)
    }
    

    setIsDropdownOpen(false)
    
    Swal.fire({
      icon: 'error',
      title: `Gagal Logout`,
      confirmButtonText: 'Ulangi'
    });
    return

  }

  const handleSettings = () => {
    // Implementasi settings logic di sini
   
    setIsDropdownOpen(false)
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
      {/* Left side - Hamburger toggle */}
      <div className="flex items-center">
        <button
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center justify-center"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <AlignJustify className="h-5 w-5 text-gray-600" />
        </button>

        {/* Optional: Add app title or breadcrumb here */}
        {/* <h1 className="ml-4 text-lg font-semibold text-gray-800 hidden sm:block">
          Dashboard
        </h1> */}
      </div>

      {/* Right side - Profile dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          aria-label="Profile menu"
        >
          {/* Profile image placeholder - ganti dengan img src jika ada foto profil */}
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-gray-600" />
          </div>

          {/* Optional: Username */}
          <span className="text-sm font-medium text-gray-700 hidden md:block">
            {user?.name || 'Admin'}
          </span>

          <ChevronDown
            className={cn(
              "h-4 w-4 text-gray-600 transition-transform duration-200",
              isDropdownOpen && "rotate-180"
            )}
          />
        </button>

        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
            {/* Profile info */}
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin'} </p>
              <p className="text-xs text-gray-500">{user?.email || 'admin@example.com'}</p>
            </div>

            {/* <button
              onClick={handleSettings}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
            >
              <Settings className="h-4 w-4 mr-3" />
              Settings
            </button> */}

            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
            >
              <LogOut className="h-4 w-4 mr-3" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}