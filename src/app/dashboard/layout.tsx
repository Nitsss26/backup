"use client";

import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { DashboardSidebarNav, type NavItem } from '@/components/layout/DashboardSidebarNav';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { APP_NAME } from '@/lib/constants';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogOut, Settings, UserCircle, LayoutGrid, BookOpen, DollarSign, Users, Edit3, BarChart3, ShieldAlert, FileCheck2, MessageSquare } from 'lucide-react';
import { useAuth } from '@/components/AppProviders';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const studentNavItems: NavItem[] = [
  { href: '/dashboard/student', label: 'Overview', icon: LayoutGrid },
  { href: '/dashboard/student/courses', label: 'My Courses', icon: BookOpen },
  { href: '/dashboard/student/certificates', label: 'Certificates', icon: FileCheck2 },
  { href: '/dashboard/student/wishlist', label: 'Wishlist', icon: UserCircle }, // Placeholder icon
  { href: '/dashboard/student/orders', label: 'Order History', icon: DollarSign },
  { href: '/dashboard/profile', label: 'Profile Settings', icon: Settings },
];

const providerNavItems: NavItem[] = [
  { href: '/dashboard/seller', label: 'Dashboard', icon: LayoutGrid },
  { href: '/dashboard/seller/courses', label: 'Manage Courses', icon: Edit3 },
  { href: '/dashboard/seller/courses/new', label: 'Create Course', icon: UserCircle }, // Placeholder icon
  { href: '/dashboard/seller/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/seller/reviews', label: 'Student Reviews', icon: MessageSquare },
  { href: '/dashboard/seller/earnings', label: 'Earnings', icon: DollarSign },
  { href: '/dashboard/profile', label: 'Profile Settings', icon: Settings },
];

const adminNavItems: NavItem[] = [
  { href: '/admin', label: 'Overview', icon: LayoutGrid },
  { href: '/admin/users', label: 'User Management', icon: Users },
  { href: '/admin/courses', label: 'Course Approval', icon: FileCheck2 },
  { href: '/admin/reviews', label: 'Review Moderation', icon: MessageSquare },
  { href: '/admin/content', label: 'Content Management', icon: Edit3 },
  { href: '/admin/payments', label: 'Payments & Revenue', icon: DollarSign },
  { href: '/admin/settings', label: 'Platform Settings', icon: Settings },
];


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const [navItems, setNavItems] = useState<NavItem[]>([]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login');
    } else if (user) {
      switch (user.role) {
        case 'student': setNavItems(studentNavItems); break;
        case 'provider': setNavItems(providerNavItems); break;
        case 'admin': setNavItems(adminNavItems); break;
        default: setNavItems([]);
      }
    }
  }, [user, isLoading, router]);
  
  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LayoutGrid className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1">
          <Sidebar className="border-r bg-sidebar text-sidebar-foreground" collapsible="icon">
            <SidebarHeader className="p-4 flex flex-col items-center text-center group-data-[collapsible=icon]:hidden">
                <Avatar className="h-20 w-20 mb-2">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback>{userInitial}</AvatarFallback>
                </Avatar>
                <h2 className="font-semibold text-lg">{user.name}</h2>
                <p className="text-xs text-sidebar-foreground/70 capitalize">{user.role}</p>
            </SidebarHeader>
            <SidebarHeader className="p-2 hidden group-data-[collapsible=icon]:flex justify-center">
                 <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback>{userInitial}</AvatarFallback>
                </Avatar>
            </SidebarHeader>

            <SidebarContent className="p-2">
              <DashboardSidebarNav navItems={navItems} userRole={user.role} />
            </SidebarContent>
            <SidebarFooter className="p-2 mt-auto">
              <Button variant="ghost" className="w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4 group-data-[collapsible=icon]:mr-0" />
                <span className="group-data-[collapsible=icon]:hidden">Logout</span>
              </Button>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset className="flex-1 bg-slate-50 dark:bg-slate-900">
            <div className="p-4 md:p-8">
              {children}
            </div>
          </SidebarInset>
        </div>
        {/* <Footer /> Removed footer from dashboard layout to maximize content area */}
      </div>
    </SidebarProvider>
  );
}
