
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
  SidebarInset,
} from "@/components/ui/sidebar";
import { APP_NAME } from '@/lib/constants';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogOut, Settings, UserCircle, LayoutGrid, BookOpen, DollarSign, Users, Edit3, BarChart3, ShieldAlert, FileCheck2, MessageSquare, Briefcase, Heart, ShoppingBag } from 'lucide-react';
import { useAuth } from '@/components/AppProviders';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { StudentDashboardHeaderNav } from '@/components/layout/StudentDashboardHeaderNav'; // New import

const studentNavItems: NavItem[] = [
  { href: '/dashboard/student', label: 'Overview', icon: LayoutGrid },
  { href: '/dashboard/student/courses', label: 'My Courses', icon: BookOpen },
  { href: '/dashboard/student/certificates', label: 'Certificates', icon: FileCheck2 },
  { href: '/dashboard/student/wishlist', label: 'Wishlist', icon: Heart }, 
  { href: '/dashboard/student/orders', label: 'Order History', icon: ShoppingBag },
  { href: '/dashboard/profile', label: 'Profile Settings', icon: Settings },
];

const providerNavItems: NavItem[] = [
  { href: '/dashboard/seller', label: 'Dashboard', icon: LayoutGrid },
  { href: '/dashboard/seller/courses', label: 'Manage Courses', icon: Edit3 },
  { href: '/dashboard/seller/courses/new', label: 'Create Course', icon: PlusCircle }, 
  { href: '/dashboard/seller/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/seller/reviews', label: 'Student Reviews', icon: MessageSquare },
  { href: '/dashboard/seller/earnings', label: 'Earnings', icon: DollarSign },
  { href: '/dashboard/profile', label: 'Profile Settings', icon: Settings },
];

const adminNavItems: NavItem[] = [
  { href: '/admin', label: 'Overview', icon: LayoutGrid },
  { href: '/admin/users', label: 'User Management', icon: Users },
  { href: '/admin/courses', label: 'Course Management', icon: Briefcase },
  { href: '/admin/reviews', label: 'Review Moderation', icon: MessageSquare },
  { href: '/admin/content', label: 'Platform Content', icon: Edit3 },
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
  const currentPath = usePathname();
  const [activeNavItems, setActiveNavItems] = useState<NavItem[]>([]);


  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login');
    } else if (user) {
      if (currentPath.startsWith('/admin')) {
         setActiveNavItems(adminNavItems);
      } else if (currentPath.startsWith('/dashboard/seller') || (currentPath === '/dashboard/profile' && user.role ==='provider')) {
        setActiveNavItems(providerNavItems);
      } else if (currentPath.startsWith('/dashboard/student') || (currentPath === '/dashboard/profile' && user.role ==='student')) {
        setActiveNavItems(studentNavItems);
      } else {
         // Fallback or redirect logic if needed
         if (user.role === 'admin') router.push('/admin');
         else if (user.role === 'provider') router.push('/dashboard/seller');
         else router.push('/dashboard/student');
      }
    }
  }, [user, isLoading, router, currentPath]);
  
  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LayoutGrid className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "?";
  
  const isStudentDashboard = user.role === 'student' && currentPath.startsWith('/dashboard/student');
  const isSharedProfilePageForStudent = user.role === 'student' && currentPath === '/dashboard/profile';


  return (
    <SidebarProvider defaultOpen={!isStudentDashboard}> {/* Conditionally default open */}
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1">
          {(!isStudentDashboard || isSharedProfilePageForStudent) && !currentPath.startsWith('/admin') && user.role !== 'admin' && user.role === 'provider' && ( // Main sidebar for seller or admin
            <Sidebar className="border-r bg-background text-foreground" collapsible="icon">
              <SidebarHeader className="p-4 flex flex-col items-center text-center group-data-[collapsible=icon]:hidden">
                  <Avatar className="h-20 w-20 mb-2">
                    <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="user profile picture"/>
                    <AvatarFallback>{userInitial}</AvatarFallback>
                  </Avatar>
                  <h2 className="font-semibold text-lg">{user.name}</h2>
                  <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
              </SidebarHeader>
              <SidebarHeader className="p-2 hidden group-data-[collapsible=icon]:flex justify-center">
                   <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="user profile small"/>
                    <AvatarFallback>{userInitial}</AvatarFallback>
                  </Avatar>
              </SidebarHeader>
              <SidebarContent className="p-2">
                <DashboardSidebarNav navItems={activeNavItems} userRole={user.role} />
              </SidebarContent>
              <SidebarFooter className="p-2 mt-auto">
                <Button variant="ghost" className="w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4 group-data-[collapsible=icon]:mr-0" />
                  <span className="group-data-[collapsible=icon]:hidden">Logout</span>
                </Button>
              </SidebarFooter>
            </Sidebar>
          )}

          {/* Admin Sidebar always shown if path is /admin */}
           {user.role === 'admin' && currentPath.startsWith('/admin') && (
             <Sidebar className="border-r bg-background text-foreground" collapsible="icon">
              <SidebarHeader className="p-4 flex flex-col items-center text-center group-data-[collapsible=icon]:hidden">
                  <Avatar className="h-20 w-20 mb-2">
                    <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="admin user picture"/>
                    <AvatarFallback>{userInitial}</AvatarFallback>
                  </Avatar>
                  <h2 className="font-semibold text-lg">{user.name}</h2>
                  <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
              </SidebarHeader>
              <SidebarHeader className="p-2 hidden group-data-[collapsible=icon]:flex justify-center">
                   <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="admin user small"/>
                    <AvatarFallback>{userInitial}</AvatarFallback>
                  </Avatar>
              </SidebarHeader>
              <SidebarContent className="p-2">
                <DashboardSidebarNav navItems={adminNavItems} userRole="admin" />
              </SidebarContent>
              <SidebarFooter className="p-2 mt-auto">
                <Button variant="ghost" className="w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4 group-data-[collapsible=icon]:mr-0" />
                  <span className="group-data-[collapsible=icon]:hidden">Logout</span>
                </Button>
              </SidebarFooter>
            </Sidebar>
           )}


          <SidebarInset className={`flex-1 bg-slate-50 dark:bg-slate-900 ${isStudentDashboard && !isSharedProfilePageForStudent ? 'md:ml-0' : ''}`}>
             {isStudentDashboard && !isSharedProfilePageForStudent && (
                <StudentDashboardHeaderNav navItems={studentNavItems} user={user} />
             )}
            <div className="p-4 md:p-8">
              {children}
            </div>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
