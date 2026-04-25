"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSidebar } from "@/components/ui/sidebar"
import { AlignJustify, ChevronDown, LogOut, User } from "lucide-react"
import { redirect, RedirectType } from "next/navigation"
import Swal from "sweetalert2"

export default function NavbarSidebar({ user }) {
  const { toggleSidebar } = useSidebar()

  const handleLogout = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })

    if (response.ok) {
      redirect("/", RedirectType.push)
      return
    }

    Swal.fire({
      icon: "error",
      title: "Gagal Logout",
      confirmButtonText: "Ulangi",
    })
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
      
      {/* Left Side */}
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <AlignJustify className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Right Side - Dropdown */}
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-gray-600" />
              </div>

              <span className="text-sm font-medium text-gray-700 hidden md:block">
                {user?.name || "Admin"}
              </span>

              <ChevronDown className="h-4 w-4 text-gray-600" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="min-w-48">
            {/* Header */}
            <DropdownMenuLabel>
              <div>
                <p className="font-medium">{user?.name || "Admin"}</p>
                <p className="text-xs text-gray-500">{user?.email || "admin@example.com"}</p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {/* Logout */}
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 focus:text-red-600 cursor-pointer"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}
