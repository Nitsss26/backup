
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
import { LogOut, Settings, UserCircle, LayoutGrid, BookOpen, DollarSign, Users, Edit3, BarChart3, ShieldAlert, FileCheck2, MessageSquare, Briefcase, Heart, ShoppingBag, PlusCircle } from 'lucide-react';
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
  { href: '/dashboard/profile', label: 'Profile Settings', icon: Settings, isShared: true }, // Mark as shared
];

const providerNavItems: NavItem[] = [
  { href: '/dashboard/seller', label: 'Dashboard', icon: LayoutGrid },
  { href: '/dashboard/seller/courses', label: 'Manage Courses', icon: Edit3 },
  { href: '/dashboard/seller/courses/new', label: 'Create Course', icon: PlusCircle },
  { href: '/dashboard/seller/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/seller/reviews', label: 'Student Reviews', icon: MessageSquare },
  { href: '/dashboard/seller/earnings', label: 'Earnings', icon: DollarSign },
  { href: '/dashboard/profile', label: 'Profile Settings', icon: Settings, isShared: true }, // Mark as shared
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
  const [showSidebar, setShowSidebar] = useState(false);
  const [isStudentExclusivePage, setIsStudentExclusivePage] = useState(false);


  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login');
      return;
    }
    if (user) {
      const studentExclusivePaths = ['/dashboard/student/courses', '/dashboard/student/certificates', '/dashboard/student/wishlist', '/dashboard/student/orders', '/dashboard/student'];
      const isStudentPage = currentPath.startsWith('/dashboard/student');
      const isAdminPage = currentPath.startsWith('/admin');
      const isSellerPage = currentPath.startsWith('/dashboard/seller');
      const isProfilePage = currentPath === '/dashboard/profile';

      setIsStudentExclusivePage(studentExclusivePaths.includes(currentPath));

      if (isAdminPage && user.role === 'admin') {
        setActiveNavItems(adminNavItems);
        setShowSidebar(true);
      } else if ((isSellerPage || (isProfilePage && user.role === 'provider')) && user.role === 'provider') {
        setActiveNavItems(providerNavItems);
        setShowSidebar(true);
      } else if (isStudentPage && user.role === 'student') {
        setActiveNavItems(studentNavItems); // For StudentDashboardHeaderNav
        setShowSidebar(isProfilePage); // Only show main sidebar for student's profile page
      } else {
        // Redirect logic if user is on a page not matching their role (excluding shared profile)
        if (!isProfilePage) {
            if (user.role === 'admin') router.push('/admin');
            else if (user.role === 'provider') router.push('/dashboard/seller');
            else router.push('/dashboard/student');
        } else { // If it's the profile page, determine sidebar based on actual role
           if (user.role === 'admin') { setActiveNavItems(adminNavItems); setShowSidebar(true); }
           else if (user.role === 'provider') { setActiveNavItems(providerNavItems); setShowSidebar(true); }
           else { setActiveNavItems(studentNavItems); setShowSidebar(true); } // Student on profile page gets sidebar
        }
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
          {showSidebar && (
            <Sidebar className="border-r bg-background text-foreground" collapsible="icon">
              <SidebarHeader className="p-4 flex flex-col items-center text-center group-data-[collapsible=icon]:hidden">
                  <Avatar className="h-20 w-20 mb-2">
                    <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint={`${user.role} user avatar big`}/>
                    <AvatarFallback>{userInitial}</AvatarFallback>
                  </Avatar>
                  <h2 className="font-semibold text-lg">{user.name}</h2>
                  <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
              </SidebarHeader>
              <SidebarHeader className="p-2 hidden group-data-[collapsible=icon]:flex justify-center">
                   <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint={`${user.role} user avatar small`}/>
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

          <SidebarInset className={`flex-1 bg-slate-50 dark:bg-slate-900 ${!showSidebar && isStudentExclusivePage ? 'md:ml-0' : ''}`}>
             {isStudentExclusivePage && (
                <StudentDashboardHeaderNav navItems={studentNavItems.filter(item => !item.isShared || currentPath === item.href)} user={user} />
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
