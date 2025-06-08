
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
import { LogOut, Settings, UserCircle, LayoutGrid, BookOpen, DollarSign, Users, Edit3, BarChart3, ShieldAlert, FileCheck2, MessageSquare, Briefcase, Heart, ShoppingBag, PlusCircle, Edit, FileQuestion, Palette, ListChecks, Eye } from 'lucide-react';
import { useAuth } from '@/components/AppProviders';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { StudentDashboardHeaderNav } from '@/components/layout/StudentDashboardHeaderNav';

const studentNavItems: NavItem[] = [
  { href: '/dashboard/student', label: 'Overview', icon: LayoutGrid },
  { href: '/dashboard/student/courses', label: 'My Courses', icon: BookOpen },
  { href: '/dashboard/student/certificates', label: 'Certificates', icon: FileCheck2 },
  { href: '/dashboard/student/wishlist', label: 'Wishlist', icon: Heart },
  { href: '/dashboard/student/orders', label: 'Order History', icon: ShoppingBag },
  { href: '/dashboard/profile', label: 'Profile Settings', icon: Settings, isShared: true },
];

const providerNavItems: NavItem[] = [
  { href: '/dashboard/seller', label: 'Seller Dashboard', icon: LayoutGrid },
  { href: '/dashboard/seller/courses', label: 'Manage Courses', icon: Edit3 },
  { href: '/dashboard/seller/courses/new', label: 'Create New Course', icon: PlusCircle },
  { href: '/dashboard/seller/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/seller/reviews', label: 'Student Reviews', icon: MessageSquare },
  { href: '/dashboard/seller/earnings', label: 'Earnings & Payouts', icon: DollarSign },
  { href: '/dashboard/profile', label: 'Profile & Settings', icon: Settings, isShared: true },
];

const adminNavItems: NavItem[] = [
  { href: '/admin', label: 'Admin Overview', icon: LayoutGrid },
  { href: '/admin/users', label: 'User Management', icon: Users },
  { href: '/admin/courses', label: 'Course Management', icon: Edit },
  { href: '/admin/reviews', label: 'Review Moderation', icon: Eye },
  { href: '/admin/content', label: 'Platform Content', icon: FileQuestion },
  { href: '/admin/payments', label: 'Payments & Revenue', icon: DollarSign },
  { href: '/admin/settings', label: 'Platform Settings', icon: Palette },
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
  const [shouldShowMainSidebar, setShouldShowMainSidebar] = useState(false);
  const [isStudentAreaWithHeaderNav, setIsStudentAreaWithHeaderNav] = useState(false);


  useEffect(() => {
    if (!isLoading && !user) {
      router.push(`/auth/login?redirect=${currentPath}`);
      return;
    }

    if (user) {
      const isAdminContext = currentPath.startsWith('/admin');
      const isSellerContext = currentPath.startsWith('/dashboard/seller');
      const isStudentContext = currentPath.startsWith('/dashboard/student');
      const isProfilePage = currentPath === '/dashboard/profile';

      // Student pages that use the secondary header nav instead of the main sidebar
      const studentPagesUsingHeaderNav = [
        '/dashboard/student',
        '/dashboard/student/courses',
        '/dashboard/student/certificates',
        '/dashboard/student/wishlist',
        '/dashboard/student/orders',
      ];
      
      const currentIsStudentPageWithHeaderNav = studentPagesUsingHeaderNav.includes(currentPath) && user.role === 'student';
      setIsStudentAreaWithHeaderNav(currentIsStudentPageWithHeaderNav);

      let navs: NavItem[] = [];
      let showSidebar = false;

      if (user.role === 'admin') {
        if (isAdminContext || isProfilePage) {
          navs = adminNavItems;
          showSidebar = true; // Admin always gets sidebar for admin areas or their profile
        } else if (!isAdminContext) { // If admin is on non-admin page (e.g. /dashboard/student accidentally)
           router.push('/admin'); // Redirect to admin dashboard
        }
      } else if (user.role === 'provider') {
        if (isSellerContext || isProfilePage) {
          navs = providerNavItems;
          showSidebar = true; // Provider always gets sidebar for seller areas or their profile
        } else if (!isSellerContext) {
            router.push('/dashboard/seller');
        }
      } else if (user.role === 'student') {
        navs = studentNavItems;
        if (isProfilePage) { // Student profile page uses the main sidebar
          showSidebar = true;
        } else if (isStudentContext && !currentIsStudentPageWithHeaderNav) { 
          // Other student pages not using header nav might use sidebar (e.g. hypothetical student settings page)
          showSidebar = true; 
        } else {
          showSidebar = false; // Student pages using header nav don't show main sidebar
        }
         if(!isStudentContext && !isProfilePage) {
            router.push('/dashboard/student');
        }
      } else {
        router.push('/auth/login'); // Fallback for unknown roles
      }
      
      setActiveNavItems(navs);
      setShouldShowMainSidebar(showSidebar);
    }
  }, [user, isLoading, router, currentPath]);


  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <LayoutGrid className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
    <SidebarProvider defaultOpen={shouldShowMainSidebar && !isStudentAreaWithHeaderNav}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1">
          {shouldShowMainSidebar && (
            <Sidebar className="border-r bg-card text-card-foreground" collapsible="icon">
              <SidebarHeader className="p-4 flex flex-col items-center text-center group-data-[collapsible=icon]:hidden">
                  <Avatar className="h-20 w-20 mb-2 border-2 border-primary p-0.5">
                    <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint={`${user.role} user avatar big dashboard sidebar`}/>
                    <AvatarFallback>{userInitial}</AvatarFallback>
                  </Avatar>
                  <h2 className="font-semibold text-lg">{user.name}</h2>
                  <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
              </SidebarHeader>
              <SidebarHeader className="p-2 hidden group-data-[collapsible=icon]:flex justify-center">
                   <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint={`${user.role} user avatar small dashboard sidebar icon`}/>
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

          <SidebarInset className={`flex-1 bg-slate-50 dark:bg-slate-900 ${!shouldShowMainSidebar ? 'md:ml-0' : ''}`}>
             {isStudentAreaWithHeaderNav && user.role === 'student' && (
                <StudentDashboardHeaderNav navItems={studentNavItems} user={user} />
             )}
            <div className="p-4 md:p-6 lg:p-8">
              {children}
            </div>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
