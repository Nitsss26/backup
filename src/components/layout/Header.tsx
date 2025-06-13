
// "use client";

// import Link from 'next/link';
// import { BookOpenText, GraduationCap, LayoutGrid, Menu, Search, ShoppingCart, X, Store, LogIn, UserPlus, Book, Home } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { UserProfileDropdown } from '@/components/UserProfileDropdown';
// import { APP_NAME, CATEGORIES } from '@/lib/constants';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import React from 'react';
// import { useAuth, useCart } from '@/components/AppProviders'; 
// import { Skeleton } from '@/components/ui/skeleton';
// import { ThemeToggleButton } from '@/components/ThemeToggleButton';
// import { useTheme } from 'next-themes';
// import { Badge as UiBadge } from '@/components/ui/badge'; // Renamed to avoid conflict

// export function Header() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
//   const { user, isLoading } = useAuth(); 
//   const { cartItems } = useCart();
//   const { theme } = useTheme();

//   // Define theme-aware classes
//   const getNavLinkClasses = () => {
//     return theme === 'light' 
//       ? "text-foreground/70 hover:text-foreground transition-colors"
//       : "text-foreground hover:text-foreground/80 transition-colors";
//   };

//   const getButtonClasses = () => {
//     return theme === 'light'
//       ? "flex text-foreground/70 hover:text-foreground transition-colors"
//       : "flex text-foreground hover:text-foreground/80 transition-colors";
//   };

//   const getIconClasses = () => {
//     return theme === 'light'
//       ? "h-4 w-4 text-foreground/70 hover:text-foreground transition-colors"
//       : "h-4 w-4 text-foreground hover:text-foreground/80 transition-colors";
//   };

//   const getMobileNavLinkClasses = () => {
//     return theme === 'light'
//       ? "flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors text-base"
//       : "flex items-center gap-2 text-foreground hover:text-foreground/80 transition-colors text-base";
//   };

//   const navLinks = [
//     { href: '/courses', label: 'Courses', icon: BookOpenText },
//     { href: '/compare', label: 'Compare', icon: Book },
//     { href: '/sell-courses', label: 'Sell on EdTechCart', icon: Store },
//     { href: '/about', label: 'About', icon: Store },
//     { href: '/contact', label: 'Contact', icon: Store },
//   ];

//   let dashboardLink = null;
//   if (user && !isLoading) {
//     if (user.role === 'student') {
//       dashboardLink = { href: '/dashboard/student', label: 'My Learning', icon: LayoutGrid };
//     } else if (user.role === 'provider') {
//       dashboardLink = { href: '/dashboard/seller', label: 'Seller Dashboard', icon: LayoutGrid };
//     } else if (user.role === 'admin') {
//       dashboardLink = { href: '/admin', label: 'Admin Panel', icon: LayoutGrid };
//     }
//   }
  
//   const allMobileNavLinks = dashboardLink ? [...navLinks, dashboardLink] : navLinks;

//   const cartItemCount = cartItems.length;

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-secondary/30 backdrop-blur supports-[backdrop-filter]:bg-secondary/30">
//       <div className="container flex h-16 items-center justify-between">
//         <Link href="/" className="flex items-center gap-2">
//           <GraduationCap className="h-7 w-7 text-primary" />
//           <span className="font-bold text-xl text-primary">{APP_NAME}</span>
//         </Link>

//         <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
//           <DropdownMenu>
//           <Button variant="ghost" className={`${getButtonClasses()} -mr-7`} asChild>
//             <Link href="/">
//               <Home className={getIconClasses()} /> Home
//             </Link>
//           </Button>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className={`flex items-center gap-1 ${getButtonClasses()} -mr-4`}>
//                 <LayoutGrid className={getIconClasses()} /> Categories
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="start">
//               {CATEGORIES.map((category) => (
//                 <DropdownMenuItem key={category.id} asChild>
//                   <Link className={getNavLinkClasses()} href={`/courses?category=${category.slug}`}>{category.name}</Link>
//                 </DropdownMenuItem>
//               ))}
//             </DropdownMenuContent>
//           </DropdownMenu>
//           {navLinks.map(link => ( 
//             <Link key={link.href} href={link.href} className={getNavLinkClasses()}>
//               {link.label}
//             </Link>
//           ))}
//         </nav>

//         <div className="flex items-center gap-2 sm:gap-3">
//         <div className="hidden sm:block relative w-full max-w-xs">
//   <Input 
//     type="search" 
//     placeholder="Search courses..." 
//     className="pl-5  border border-blue-400" 
//   />
//   <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
// </div>
//           {/* <div className="hidden sm:block relative w-full max-w-xs">
          
//             <Input type="search" placeholder="Search courses..." className="pl-5 border border-blue-400 " />
//             <Search className="absolute color-blue top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground justify-end" />
//           </div> */}
//           <ThemeToggleButton />
//           <Button variant="ghost" size="icon" asChild className="relative">
//             <Link href="/cart">
//               <ShoppingCart className="h-5 w-5" />
//               {cartItemCount > 0 && (
//                 <UiBadge 
//                   variant="destructive" 
//                   className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs rounded-full bg-primary text-primary-foreground"
//                 >
//                   {cartItemCount}
//                 </UiBadge>
//               )}
//               <span className="sr-only">Shopping Cart</span>
//             </Link>
//           </Button>
          
//           <div className="hidden md:flex items-center gap-3">
//             {isLoading ? (
//               <Skeleton className="h-9 w-24 rounded-md" />
//             ) : !user ? (
//               <>
//                 <Button className='' variant="outline" size="sm" asChild>
//                   <Link href="/auth/login">Login</Link>
//                 </Button>
//                 <Button variant="default" size="sm" asChild>
//                   <Link href="/auth/register">Sign Up</Link>
//                 </Button>
//               </>
//             ) : (
//               <UserProfileDropdown />
//             )}
//           </div>
          
//           <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
//             <SheetTrigger asChild className="md:hidden">
//               <Button variant="ghost" size="icon">
//                 <Menu className="h-6 w-6" />
//                 <span className="sr-only">Toggle menu</span>
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right" className="w-full max-w-xs p-6">
//               <div className="flex flex-col gap-6">
//                 <Link href="/" className="flex items-center gap-2 mb-4" onClick={() => setIsMobileMenuOpen(false)}>
//                   <GraduationCap className="h-7 w-7 text-primary" />
//                   <span className="font-bold text-xl text-primary">{APP_NAME}</span>
//                 </Link>
//                 <Input type="search" placeholder="Search courses..." />
//                 <nav className="flex flex-col gap-4">
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" className="justify-start flex items-center gap-2 text-base">
//                         <LayoutGrid className="h-5 w-5" /> Categories
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="start" className="w-56">
//                       {CATEGORIES.map((category) => (
//                         <DropdownMenuItem key={category.id} asChild>
//                           <Link href={`/courses?category=${category.slug}`} onClick={() => setIsMobileMenuOpen(false)}>{category.name}</Link>
//                         </DropdownMenuItem>
//                       ))}
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                   {allMobileNavLinks.map(link => ( 
//                      <Link key={link.href} href={link.href} className={getMobileNavLinkClasses()} onClick={() => setIsMobileMenuOpen(false)}>
//                       <link.icon className="h-5 w-5" />
//                       {link.label}
//                     </Link>
//                   ))}
//                   {!isLoading && !user && (
//                     <>
//                       <DropdownMenuSeparator />
//                       <Link href="/auth/login" className={getMobileNavLinkClasses()} onClick={() => setIsMobileMenuOpen(false)}>
//                         <LogIn className="h-5 w-5" />
//                         Login
//                       </Link>
//                       <Link href="/auth/register" className={getMobileNavLinkClasses()} onClick={() => setIsMobileMenuOpen(false)}>
//                         <UserPlus className="h-5 w-5" />
//                         Sign Up
//                       </Link>
//                     </>
//                   )}
//                    {isLoading && ( 
//                     <>
//                       <DropdownMenuSeparator />
//                       <Skeleton className="h-8 w-full rounded-md" />
//                       <Skeleton className="h-8 w-full rounded-md" />
//                     </>
//                   )}
//                    {user && !isLoading && (
//                      <>
//                       <DropdownMenuSeparator />
//                        <UserProfileDropdown />
//                      </>
//                    )}
//                 </nav>
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </header>
//   );
// }

// components/layout/Header.tsx
"use client";

import Link from 'next/link';
import { BookOpenText, GraduationCap, LayoutGrid, Menu, Search, ShoppingCart, Heart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserProfileDropdown } from '@/components/UserProfileDropdown';
import { APP_NAME, CATEGORIES } from '@/lib/constants';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import React from 'react';
import { useAuth, useCart } from '@/components/AppProviders';
import { Skeleton } from '@/components/ui/skeleton';
import { ThemeToggleButton } from '@/components/ThemeToggleButton';
import { Badge as UiBadge } from '@/components/ui/badge';
import Image from 'next/image';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { user, isLoading } = useAuth();
  const { cartItems } = useCart();

  const navLinks = [
    { href: '/categories', label: 'Categories', icon: LayoutGrid },
    { href: '/courses', label: 'Courses', icon: BookOpenText },
    { href: '/upcoming', label: 'Upcoming', icon: BookOpenText },
    { href: '/educators', label: 'Top Educators', icon: User },
    { href: '/plus', label: 'Save with Plus', icon: Heart },
    { href: '/resources', label: 'Explore Resources', icon: BookOpenText },
  ];

  const cartItemCount = cartItems.length;

  return (
    <header className="sticky top-0 z-50 bg-gray-800 py-4 px-6 flex items-center justify-between border-b border-gray-700">
      <div className="flex items-center space-x-6">
        <Link href="/" className="flex items-center gap-2">
          <GraduationCap className="h-7 w-7 text-blue-400" />
          <span className="font-bold text-2xl text-white">{APP_NAME}</span>
        </Link>
        <nav className="hidden md:flex space-x-4">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-gray-300 hover:text-blue-400 transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <Input
            type="search"
            placeholder="Search for courses, educators and more"
            className="bg-gray-700 text-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-300">INR - English</span>
          <Image src="https://flagcdn.com/16x12/in.png" alt="India Flag" width={16} height={12} />
        </div>
        <div className="flex space-x-3">
          <Button variant="ghost" size="icon" className="text-gray-300 hover:text-blue-400">
            <Heart className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" asChild className="relative text-gray-300 hover:text-blue-400">
            <Link href="/cart">
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <UiBadge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs rounded-full bg-red-600"
                >
                  {cartItemCount}
                </UiBadge>
              )}
            </Link>
          </Button>
          {isLoading ? (
            <Skeleton className="h-9 w-24 rounded-md" />
          ) : !user ? (
            <>
              <Button variant="ghost" size="sm" asChild className="text-gray-300 hover:text-blue-400">
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button variant="default" size="sm" asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/auth/register">Sign Up</Link>
              </Button>
            </>
          ) : (
            <UserProfileDropdown />
          )}
        </div>
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-blue-400">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs bg-gray-800 text-white p-6">
            <div className="flex flex-col gap-6">
              <Link href="/" className="flex items-center gap-2 mb-4" onClick={() => setIsMobileMenuOpen(false)}>
                <GraduationCap className="h-7 w-7 text-blue-400" />
                <span className="font-bold text-xl">{APP_NAME}</span>
              </Link>
              <Input type="search" placeholder="Search courses..." className="bg-gray-700 text-white rounded-full" />
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 text-gray-300 hover:text-blue-400"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                ))}
                {!isLoading && !user && (
                  <>
                    <Link href="/auth/login" className="flex items-center gap-2 text-gray-300 hover:text-blue-400" onClick={() => setIsMobileMenuOpen(false)}>
                      <User className="h-5 w-5" />
                      Login
                    </Link>
                    <Link href="/auth/register" className="flex items-center gap-2 text-gray-300 hover:text-blue-400" onClick={() => setIsMobileMenuOpen(false)}>
                      <User className="h-5 w-5" />
                      Sign Up
                    </Link>
                  </>
                )}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}