import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import SidebarWrapper from "@/components/dashboard/sidebar/SidebarWrapper";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Absensi",
  description: "Web Absensi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let user = {
    id: "User 001",
    name: "Staff",
    email: "staff@example.com"
  }
  
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.png" sizes="any" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarWrapper user={user}>{children}</SidebarWrapper>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
