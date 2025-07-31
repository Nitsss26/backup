// "use client";

// import React, { useEffect, useState } from 'react';
// import { Header } from '@/components/layout/Header';
// import { Footer } from '@/components/layout/Footer';
// import { DashboardSidebarNav, type NavItem } from '@/components/layout/DashboardSidebarNav';
// import {
//   SidebarProvider,
//   Sidebar,
//   SidebarHeader,
//   SidebarContent,
//   SidebarFooter,
//   SidebarInset,
// } from "@/components/ui/sidebar";
// import { APP_NAME } from '@/lib/constants';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Button } from '@/components/ui/button';
// import { LogOut, Settings, UserCircle, LayoutGrid, BookOpen, DollarSign, Users, Edit3, BarChart3, ShieldAlert, FileCheck2, MessageSquare, Briefcase, Heart, ShoppingBag, PlusCircle, Edit, FileQuestion, Palette, ListChecks, Eye } from 'lucide-react';
// import { useAuth } from '@/components/AppProviders';
// import { useRouter, usePathname } from 'next/navigation';
// import Link from 'next/link';
// import '../globals.css'; 
// import { Skeleton } from '@/components/ui/skeleton';

// const providerNavItems: NavItem[] = [
//   { href: '/dashboard/seller', label: 'Seller Dashboard', icon: LayoutGrid },
//   { href: '/dashboard/seller/courses', label: 'Manage Courses', icon: Edit3 },
//   { href: '/dashboard/seller/courses/new', label: 'Create New Course', icon: PlusCircle },
//   { href: '/dashboard/seller/analytics', label: 'Analytics', icon: BarChart3 },
//   { href: '/dashboard/seller/reviews', label: 'Student Reviews', icon: MessageSquare },
//   { href: '/dashboard/seller/earnings', label: 'Earnings & Payouts', icon: DollarSign },
//   { href: '/dashboard/profile', label: 'Profile & Settings', icon: Settings, isShared: true },
// ];

// const adminNavItems: NavItem[] = [
//   { href: '/admin', label: 'Admin Overview', icon: LayoutGrid },
//   { href: '/admin/users', label: 'User Management', icon: Users },
//   { href: '/admin/courses', label: 'Course Management', icon: Edit },
//   { href: '/admin/reviews', label: 'Review Moderation', icon: Eye },
//   { href: '/admin/content', label: 'Platform Content', icon: FileQuestion },
//   { href: '/admin/payments', label: 'Payments & Revenue', icon: DollarSign },
//   { href: '/admin/settings', label: 'Platform Settings', icon: Palette },
//   { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
// ];

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { user, isLoading, logout } = useAuth();
//   const router = useRouter();
//   const currentPath = usePathname();
//   const [activeNavItems, setActiveNavItems] = useState<NavItem[]>([]);
//   const [shouldShowMainSidebar, setShouldShowMainSidebar] = useState(false);
//   const [isLayoutClient, setIsLayoutClient] = useState(false);

//   useEffect(() => {
//     setIsLayoutClient(true);
//   }, []);

//   useEffect(() => {
//     if (!isLayoutClient || isLoading) return;

//     if (!user) {
//       if (currentPath.startsWith('/admin') || currentPath.startsWith('/dashboard')) {
//         router.push(`/auth/login?redirect=${currentPath}`);
//       }
//       return;
//     }

//     const isAdminRoute = currentPath.startsWith('/admin');
//     const isSellerRoute = currentPath.startsWith('/dashboard/seller');
//     const isProfilePage = currentPath === '/dashboard/profile';

//     let navs: NavItem[] = [];
//     let showSidebar = false;

//     if (user.role === 'admin') {
//       if (isAdminRoute || isProfilePage) {
//         navs = adminNavItems;
//         showSidebar = true;
//       }
//     } else if (user.role === 'provider') {
//       if (isSellerRoute || isProfilePage) {
//         navs = providerNavItems;
//         showSidebar = true;
//       } else if (isAdminRoute) {
//         router.push('/');
//       }
//     } else if (user.role === 'student') {
//         showSidebar = false;
//         if(isAdminRoute || isSellerRoute) {
//            router.push('/');
//         }
//     } else {
//         router.push('/auth/login');
//     }
    
//     setActiveNavItems(navs);
//     setShouldShowMainSidebar(showSidebar);
//   }, [user, isLoading, router, currentPath, isLayoutClient]);

//   if (isLoading || !isLayoutClient) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-background">
//         <LayoutGrid className="h-12 w-12 animate-spin text-primary" />
//       </div>
//     );
//   }

//   const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "?";

//   if (!shouldShowMainSidebar) {
//       return (
//         <div className="flex flex-col min-h-screen">
//           <Header />
//             <main className="flex-1">
//               {children}
//             </main>
//           <Footer/>
//         </div>
//       )
//   }

//   return (
//     <SidebarProvider defaultOpen={shouldShowMainSidebar}>
//       <div className="flex flex-col min-h-screen">
//         <Header />
//         <div className="flex flex-1">
//           {user && (
//             <Sidebar 
//               className="group border-r bg-card text-card-foreground transition-all duration-300 ease-in-out w-16 hover:w-64 h-[calc(100vh-64px)] sticky top-16 z-30 md:w-16 md:hover:w-64"
//               collapsible="none"
//             >
//               <SidebarHeader className="p-4 flex flex-col items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-[.w-16]:hidden">
//                 <Avatar className="h-20 w-20 mb-2 border-2 border-primary p-0.5">
//                   <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint={`${user.role} user avatar big dashboard sidebar`} />
//                   <AvatarFallback>{userInitial}</AvatarFallback>
//                 </Avatar>
//                 <h2 className="font-semibold text-lg">{user.name}</h2>
//                 <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
//               </SidebarHeader>
//               <SidebarHeader className="p-2 flex justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300 group-[.w-16]:flex">
//                  <Avatar className="h-8 w-8">
//                    <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint={`${user.role} user avatar small dashboard sidebar icon`} />
//                    <AvatarFallback>{userInitial}</AvatarFallback>
//                  </Avatar>
//               </SidebarHeader>
//               <SidebarContent className="p-2">
//                 <DashboardSidebarNav navItems={activeNavItems} userRole={user.role} />
//               </SidebarContent>
//               <SidebarFooter className="p-2 mb-3">
//                 <Button 
//                   variant="ghost" 
//                   className="w-full justify-start items-center group-[.w-16]:justify-start group-[.w-16]:h-8 group-[.w-16]:p-2 group-hover:justify-start transition-all duration-300"
//                   onClick={logout}
//                 >
//                   <LogOut className="mr-2 h-4 w-4 group-[.w-16]:mr-0 group-hover:mr-2 transition-all duration-300" />
//                   <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-[.w-16]:hidden">Logout</span>
//                 </Button>
//               </SidebarFooter>
//             </Sidebar>
//           )}
//           <SidebarInset className={`flex-1 bg-slate-50 dark:bg-slate-900 ${!shouldShowMainSidebar ? 'md:ml-0' : 'md:ml-16 md:group-hover:ml-64 transition-all duration-300'}`}>
//             <div className="p-4 md:p-6 lg:p-8">
//               {children}
//             </div>
//           </SidebarInset>
//         </div>
//       </div>
//     </SidebarProvider>
//   );
// }

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
import '../globals.css'; 
import { Skeleton } from '@/components/ui/skeleton';

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
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
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
  const [isLayoutClient, setIsLayoutClient] = useState(false);

  useEffect(() => {
    setIsLayoutClient(true);
  }, []);

  useEffect(() => {
    if (!isLayoutClient || isLoading) return;

    if (!user) {
      if (currentPath.startsWith('/admin') || currentPath.startsWith('/dashboard')) {
        router.push(`/auth/login?redirect=${currentPath}`);
      }
      return;
    }

    const isAdminRoute = currentPath.startsWith('/admin');
    const isSellerRoute = currentPath.startsWith('/dashboard/seller');
    const isProfilePage = currentPath === '/dashboard/profile';

    let navs: NavItem[] = [];
    let showSidebar = false;

    if (user.role === 'admin') {
      if (isAdminRoute || isProfilePage) {
        navs = adminNavItems;
        // Disable sidebar for /admin/analytics route
        showSidebar = currentPath !== '/admin/analytics';
      }
    } else if (user.role === 'provider') {
      if (isSellerRoute || isProfilePage) {
        navs = providerNavItems;
        showSidebar = true;
      } else if (isAdminRoute) {
        router.push('/');
      }
    } else if (user.role === 'student') {
        showSidebar = false;
        if (isAdminRoute || isSellerRoute) {
           router.push('/');
        }
    } else {
        router.push('/auth/login');
    }
    
    setActiveNavItems(navs);
    setShouldShowMainSidebar(showSidebar);
  }, [user, isLoading, router, currentPath, isLayoutClient]);

  if (isLoading || !isLayoutClient) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <LayoutGrid className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "?";

  if (!shouldShowMainSidebar) {
      return (
        <div className="flex flex-col min-h-screen">
          <Header />
            <main className="flex-1">
              {children}
            </main>
          <Footer/>
        </div>
      )
  }

  return (
    <SidebarProvider defaultOpen={shouldShowMainSidebar}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1">
          {user && (
            <Sidebar 
              className="group border-r bg-card text-card-foreground transition-all duration-300 ease-in-out w-16 hover:w-64 h-[calc(100vh-64px)] sticky top-16 z-30 md:w-16 md:hover:w-64"
              collapsible="none"
            >
              <SidebarHeader className="p-4 flex flex-col items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-[.w-16]:hidden">
                <Avatar className="h-20 w-20 mb-2 border-2 border-primary p-0.5">
                  <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint={`${user.role} user avatar big dashboard sidebar`} />
                  <AvatarFallback>{userInitial}</AvatarFallback>
                </Avatar>
                <h2 className="font-semibold text-lg">{user.name}</h2>
                <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
              </SidebarHeader>
              <SidebarHeader className="p-2 flex justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300 group-[.w-16]:flex">
                 <Avatar className="h-8 w-8">
                   <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint={`${user.role} user avatar small dashboard sidebar icon`} />
                   <AvatarFallback>{userInitial}</AvatarFallback>
                 </Avatar>
              </SidebarHeader>
              <SidebarContent className="p-2">
                <DashboardSidebarNav navItems={activeNavItems} userRole={user.role} />
              </SidebarContent>
              <SidebarFooter className="p-2 mb-3">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start items-center group-[.w-16]:justify-start group-[.w-16]:h-8 group-[.w-16]:p-2 group-hover:justify-start transition-all duration-300"
                  onClick={logout}
                >
                  <LogOut className="mr-2 h-4 w-4 group-[.w-16]:mr-0 group-hover:mr-2 transition-all duration-300" />
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-[.w-16]:hidden">Logout</span>
                </Button>
              </SidebarFooter>
            </Sidebar>
          )}
          <SidebarInset className={`flex-1 bg-slate-50 dark:bg-slate-900 ${!shouldShowMainSidebar ? 'md:ml-0' : 'md:ml-16 md:group-hover:ml-64 transition-all duration-300'}`}>
            <div className="p-4 md:p-6 lg:p-8">
              {children}
            </div>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}