import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    items?: {
        title: string;
        url: string;
        isActive?: boolean;
      }[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}


export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
  discount?: string;
}

export interface Category {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}


interface PostpaidType {
  name: string;
  logo: string;
  category_logo?:string;
  category?:string;
}

interface PrepaidType {
  category: string;
  category_logo: string;
  logo: string;
  name: string;
}