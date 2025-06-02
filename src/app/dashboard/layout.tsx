
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
  { href: '/admin/settings', label: 'Platform Settings', icon: Palette }, // Using Palette as example
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
  const [showSidebar, setShowSidebar] = useState(false);
  const [isStudentExclusivePage, setIsStudentExclusivePage] = useState(false);


  useEffect(() => {
    if (!isLoading && !user) {
      router.push(`/auth/login?redirect=${currentPath}`); // Redirect to login if not authenticated
      return;
    }
    if (user) {
      const isAdminPage = currentPath.startsWith('/admin');
      const isSellerPage = currentPath.startsWith('/dashboard/seller');
      const isStudentPage = currentPath.startsWith('/dashboard/student');
      const isProfilePage = currentPath === '/dashboard/profile';

      // Determine if the current student page is one that uses the header nav instead of the main sidebar
      const studentPagesWithHeaderNav = ['/dashboard/student/courses', '/dashboard/student/certificates', '/dashboard/student/wishlist', '/dashboard/student/orders', '/dashboard/student'];
      setIsStudentExclusivePage(studentPagesWithHeaderNav.includes(currentPath) && user.role === 'student');

      if (isAdminPage && user.role === 'admin') {
        setActiveNavItems(adminNavItems);
        setShowSidebar(true);
      } else if (isSellerPage && user.role === 'provider') {
        setActiveNavItems(providerNavItems);
        setShowSidebar(true);
      } else if (isStudentPage && user.role === 'student') {
         setActiveNavItems(studentNavItems); // For StudentDashboardHeaderNav
         // Show sidebar for student's profile, or if they somehow land on a generic /dashboard/student page that's not exclusive.
         setShowSidebar(isProfilePage || (isStudentPage && !studentPagesWithHeaderNav.includes(currentPath)));
      } else if (isProfilePage) { // Shared profile page logic
         if (user.role === 'admin') { setActiveNavItems(adminNavItems); setShowSidebar(true); }
         else if (user.role === 'provider') { setActiveNavItems(providerNavItems); setShowSidebar(true); }
         else { setActiveNavItems(studentNavItems); setShowSidebar(true); } // Student on profile page gets sidebar
      } else {
        // If user is authenticated but on a path not matching their role (and not profile), redirect
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

  return (
    <SidebarProvider defaultOpen={showSidebar}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1">
          {showSidebar && ( // Only render sidebar if showSidebar is true
            <Sidebar className="border-r bg-background text-foreground" collapsible="icon">
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

          {/* Adjust main content area based on whether sidebar is shown for student exclusive pages */}
          <SidebarInset className={`flex-1 bg-slate-50 dark:bg-slate-900 ${isStudentExclusivePage && !showSidebar ? 'md:ml-0' : ''}`}>
             {isStudentExclusivePage && ( // Render StudentDashboardHeaderNav only for student exclusive pages
                <StudentDashboardHeaderNav navItems={studentNavItems.filter(item => !item.isShared || currentPath === item.href)} user={user} />
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
