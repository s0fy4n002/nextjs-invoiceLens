"use client";

import { ChevronRight } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { NavItem } from "@/app/types";

export function NavContent({ items = [] }: { items: NavItem[] }) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // Auto-open menu jika ada submenu yang aktif
  useEffect(() => {
    const activeParent = items.find((item) =>
      item.items?.some((subItem) => subItem.url === pathname)
    );
    if (activeParent) {
      setOpenMenu(activeParent.title);
    }
  }, [pathname, items]);

  return (
    <>
      <SidebarGroup className="px-2 py-0">
       
        <SidebarMenu>
          {items.slice(0).map((item, index) => {
            const isActive = item.url === pathname;

            // Menu dengan submenu
            if (item.items && item.items.length > 0) {
              const isOpen = openMenu === item.title;

              return (
                <Collapsible
                  key={item.title}
                  open={isOpen}
                  onOpenChange={(open) => {
                    setOpenMenu(open ? item.title : null);
                  }}
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        className="cursor-pointer"
                        tooltip={item.title}
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              className="data-[active=true]:bg-green-300 cursor-pointer"
                              asChild
                              isActive={subItem.url === pathname}
                            >
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            }

            // Menu tanpa submenu
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  className="data-[active=true]:bg-green-300 cursor-pointer"
                  asChild
                  isActive={isActive}
                  tooltip={item.title}
                  onClick={() => setOpenMenu(null)} // Tutup semua submenu
                >
                  <Link
                    href={item.url}
                    target={item.title === "App" ? "_blank" : undefined}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
}
