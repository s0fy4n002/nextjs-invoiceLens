"use client";

import * as React from "react";
import { AppSidebar } from "@/components/ui/app-sidebar";
// Import navbar yang baru
import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils"
import NavbarSidebar from "./NavbarSidebar";

export default function SidebarWrapper({
  children,
  user
}: {
  children: React.ReactNode;
  user: any
}) {
  const [open, setOpen] = React.useState(true);

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <AppSidebar />
      <main
        className={cn(
          "transition-all duration-300 ease-in-out w-full flex flex-col", 
          open ? "md:w-[calc(100vw-16rem)]" : "md:w-[calc(100vw-3rem)]"
        )}
      >
        <NavbarSidebar user={user} />
        <div className="flex-1 p-4">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}