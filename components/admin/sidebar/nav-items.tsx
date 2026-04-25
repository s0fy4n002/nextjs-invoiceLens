"use client";

import { adminUrl } from "@/lib/utils";
import { Home, PanelTop } from "lucide-react";



export const items = [
  {
    title: "App",
    url: "/",
    icon: PanelTop,
  },
  {
    title: "Home",
    url: `/${adminUrl}`,
    icon: Home,
  },

 
];
