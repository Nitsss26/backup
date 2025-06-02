"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  children?: NavItem[];
  role?: 'student' | 'provider' | 'admin' | 'all'; // For role-specific links
  disabled?: boolean;
}

interface DashboardSidebarNavProps {
  navItems: NavItem[];
  userRole: 'student' | 'provider' | 'admin' | null;
}

export function DashboardSidebarNav({ navItems, userRole }: DashboardSidebarNavProps) {
  const pathname = usePathname();

  const renderNavItems = (items: NavItem[], isSubmenu = false) => {
    return items
      .filter(item => !item.role || item.role === 'all' || item.role === userRole)
      .map((item) => {
        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
        const ButtonComponent = isSubmenu ? SidebarMenuSubButton : SidebarMenuButton;
        const ItemComponent = isSubmenu ? SidebarMenuSubItem : SidebarMenuItem;

        return (
          <ItemComponent key={item.href}>
            <ButtonComponent
              asChild
              isActive={isActive}
              className={cn(
                "w-full justify-start",
                isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
              )}
              disabled={item.disabled}
              tooltip={item.label}
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            </ButtonComponent>
            {item.children && item.children.length > 0 && (
              <SidebarMenuSub>
                {renderNavItems(item.children, true)}
              </SidebarMenuSub>
            )}
          </ItemComponent>
        );
      });
  };

  return (
    <SidebarMenu>
      {renderNavItems(navItems)}
    </SidebarMenu>
  );
}
