"use client";

import { adminUrl } from "@/lib/utils";
import { Calendar, Home, PanelTop, User } from "lucide-react";



export const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: PanelTop,
  },
  {
    title: "404 not found",
    url: `/404-not-found`,
    icon: Calendar,
  },

];
