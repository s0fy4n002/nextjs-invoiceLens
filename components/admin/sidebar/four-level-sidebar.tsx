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
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";

// Gunakan dropdown menu dari shadcn/ui, bukan dari radix langsung
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
  {
    title: "Logout",
    url: "/",
    icon: LogOut,
  },
];
export function AppSidebar() {
  return (
   <Sidebar variant="sidebar" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarSeparator />
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupAction>
            <Plus /> <span className="sr-only">Add Project</span>
          </SidebarGroupAction>

          <SidebarGroupContent>
            <SidebarMenu>
             
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive
                    className="data-[active=true]:bg-blue-300 text-blue-500"
                  >
                    <Link href={item.url} className="py-6">
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive>
                  <Link href={""}>
                    <LucideShoppingBasket />
                    <span>Badge</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuBadge>24</SidebarMenuBadge>
              </SidebarMenuItem>

              {/* Level 1 - Getting Started */}
              <Collapsible className="group/collapsible-1" defaultOpen>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      isActive
                      asChild
                      className="data-[active=true]:bg-blue-300 text-blue-500"
                    >
                      <Link href="#" className="py-6">
                        <ShoppingBasket /> Getting Started{" "}
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible-1:rotate-180" />
                      </Link>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="#installation">
                            <span>Installation</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>

                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="#structure">
                            <span>Project Structure</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>

                      {/* Level 2 - Advanced Setup */}
                      <SidebarMenuSubItem>
                        <Collapsible className="group/collapsible-2">
                          <CollapsibleTrigger asChild>
                            <SidebarMenuSubButton className="">
                              <button>Advanced Setup</button>
                              <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible-2:rotate-180" />
                            </SidebarMenuSubButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>

                            <SidebarMenuSub className="">
                              <SidebarMenuSubItem>
                                <SidebarMenuSubButton asChild className="">
                                  <Link href="#config">
                                    <span>Configuration</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>

                              <SidebarMenuSubItem>
                                <SidebarMenuSubButton asChild className="">
                                  <Link href="#env">
                                    <span>Environment Variables</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            </SidebarMenuSub>

                          </CollapsibleContent>
                        </Collapsible>
                      </SidebarMenuSubItem>
                    
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
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
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}