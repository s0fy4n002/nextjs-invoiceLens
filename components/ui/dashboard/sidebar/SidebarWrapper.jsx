"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import * as React from "react";
import NavbarSidebar from "./NavbarSidebar";

export default function SidebarWrapper({ children, user }) {
  const [open, setOpen] = React.useState(true);

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out w-full",
          open
            ? "md:grid-cols-[16rem_1fr]"    // sidebar width = 16rem
            : "md:grid-cols-[3rem_1fr]"     // collapsed = 3rem
        )}
      >
        {/* SIDEBAR */}
        <AppSidebar />

        {/* MAIN CONTENT */}
        <main className="flex flex-col w-full">
          <NavbarSidebar user={user} />
          <div className="flex-1 p-4">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
