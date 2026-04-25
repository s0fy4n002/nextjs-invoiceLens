'use client';
import { usePathname } from 'next/navigation';
import {
  AlarmCheck,
  Calendar,
  Car,
  ChevronDown,
  ChevronUp,
  Home,
  HomeIcon,
  Inbox,
  LogOut,
  LucideShoppingBasket,
  Plus,
  PlusCircle,
  Search,
  Settings,
  ShoppingBasket,
  User,
  User2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

// Gunakan dropdown menu dari shadcn/ui, bukan dari radix langsung
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { NavContent } from '../dashboard/sidebar/NavContent';
import { items } from '../dashboard/sidebar/nav-item-dashboard';


export function AppSidebar() {
  const pathname = usePathname();

  
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      {/* <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Admin Page
                  <ChevronDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="bottom"
                className="w-[--radix-popper-anchor-width] min-w-56"
                align="center"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader> */}
      
      
      <div className="max-w-full overflow-x-hidden pe-5">
        <SidebarSeparator className="mb-4" />
      </div>

      <SidebarContent>
        <NavContent items={items} />
      </SidebarContent>

      {/* <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width] min-w-56"
                align="center"
              >
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter> */}
    </Sidebar>
  );
}
