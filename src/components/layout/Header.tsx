
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

"use client";

import Link from 'next/link';
import { BookOpenText, GraduationCap, LayoutGrid, Menu, Search, ShoppingCart, X, Store, LogIn, UserPlus, Book, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserProfileDropdown } from '@/components/UserProfileDropdown';
import { APP_NAME, CATEGORIES } from '@/lib/constants';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React from 'react';
import { useAuth, useCart } from '@/components/AppProviders'; 
import { Skeleton } from '@/components/ui/skeleton';
import { ThemeToggleButton } from '@/components/ThemeToggleButton';
import { useTheme } from 'next-themes';
import { Badge as UiBadge } from '@/components/ui/badge';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { user, isLoading } = useAuth(); 
  const { cartItems } = useCart();
  const { theme } = useTheme();

  const getNavLinkClasses = () => {
    return theme === 'light' 
      ? "text-foreground/70 hover:text-foreground transition-colors"
      : "text-gray-300 hover:text-white transition-colors duration-300";
  };

  const getButtonClasses = () => {
    return theme === 'light'
      ? "flex text-foreground/70 hover:text-foreground transition-colors"
      : "flex text-gray-300 hover:text-white transition-colors duration-300";
  };

  const getIconClasses = () => {
    return theme === 'light'
      ? "h-4 w-4 text-foreground/70 hover:text-foreground transition-colors"
      : "h-4 w-4 text-gray-300 hover:text-white transition-colors duration-300";
  };

  const getMobileNavLinkClasses = () => {
    return theme === 'light'
      ? "flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors text-base"
      : "flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-base";
  };

  const navLinks = [
    { href: '/courses', label: 'Courses', icon: BookOpenText },
    { href: '/compare', label: 'Compare', icon: Book },
    { href: '/sell-courses', label: 'Sell on EdTechCart', icon: Store },
    { href: '/about', label: 'About', icon: Store },
    { href: '/contact', label: 'Contact', icon: Store },
  ];

  let dashboardLink = null;
  if (user && !isLoading) {
    if (user.role === 'student') {
      dashboardLink = { href: '/dashboard/student', label: 'My Learning', icon: LayoutGrid };
    } else if (user.role === 'provider') {
      dashboardLink = { href: '/dashboard/seller', label: 'Seller Dashboard', icon: LayoutGrid };
    } else if (user.role === 'admin') {
      dashboardLink = { href: '/admin', label: 'Admin Panel', icon: LayoutGrid };
    }
  }
  
  const allMobileNavLinks = dashboardLink ? [...navLinks, dashboardLink] : navLinks;

  const cartItemCount = cartItems.length;

  return (
    <header className="sticky top-0 z-50 w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-800 shadow-lg">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
          <GraduationCap className="h-8 w-8 text-blue-500" />
          <span className="font-bold text-2xl text-white bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">{APP_NAME}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <DropdownMenu>
            <Button variant="ghost" className={`${getButtonClasses()} -mr-7`} asChild>
              <Link href="/">
                <Home className={getIconClasses()} /> Home
              </Link>
            </Button>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className={`flex items-center gap-1 ${getButtonClasses()} -mr-4 group hover:bg-gray-800 rounded-full px-4 py-2`}>
                <LayoutGrid className={`${getIconClasses()} group-hover:text-blue-500`} /> Categories
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-gray-800 border-gray-700 text-white">
              {CATEGORIES.map((category) => (
                <DropdownMenuItem key={category.id} asChild>
                  <Link className={`${getNavLinkClasses()} hover:bg-gray-700 px-4 py-2`} href={`/courses?category=${category.slug}`}>{category.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {navLinks.map(link => ( 
            <Link key={link.href} href={link.href} className={`${getNavLinkClasses()} hover:bg-gray-800 px-4 py-2 rounded-full`}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block relative w-full max-w-xs">
            <Input 
              type="search" 
              placeholder="Search courses..." 
              className="bg-gray-800 text-white border-gray-700 focus:border-blue-500 rounded-full pl-10 pr-4 py-2 transition-all duration-300" 
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-blue-500" />
          </div>
          <ThemeToggleButton />
          <Button variant="ghost" size="icon" asChild className="relative hover:bg-gray-800 rounded-full">
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5 text-gray-300 hover:text-blue-500" />
              {cartItemCount > 0 && (
                <UiBadge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs rounded-full bg-blue-600 text-white"
                >
                  {cartItemCount}
                </UiBadge>
              )}
              <span className="sr-only">Shopping CartК</span>
            </Link>
          </Button>
          
          <div className="hidden md:flex items-center gap-3">
            {isLoading ? (
              <Skeleton className="h-9 w-24 rounded-full bg-gray-700" />
            ) : !user ? (
              <>
                <Button variant="outline" size="sm" asChild className="border-blue-500 text-blue-500 hover:bg-blue-500/10 rounded-full">
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button variant="default" size="sm" asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                  <Link href="/auth/register">Sign Up</Link>
                </Button>
              </>
            ) : (
              <UserProfileDropdown />
            )}
          </div>
          
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="hover:bg-gray-800 rounded-full">
                <Menu className="h-6 w-6 text-gray-300 hover:text-blue-500" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-gray-900 text-white border-gray-800 p-6">
              <div className="flex flex-col gap-6">
                <Link href="/" className="flex items-center gap-2 mb-4" onClick={() => setIsMobileMenuOpen(false)}>
                  <GraduationCap className="h-8 w-8 text-blue-500" />
                  <span className="font-bold text-2xl text-white">{APP_NAME}</span>
                </Link>
                <Input type="search" placeholder="Search courses..." className="bg-gray-800 text-white border-gray-700 focus:border-blue-500 rounded-full" />
                <nav className="flex flex-col gap-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="justify-start flex items-center gap-2 text-base text-gray-300 hover:text-white hover:bg-gray-800 rounded-full">
                        <LayoutGrid className="h-5 w-5" /> Categories
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56 bg-gray-800 border-gray-700 text-white">
                      {CATEGORIES.map((category) => (
                        <DropdownMenuItem key={category.id} asChild>
                          <Link href={`/courses?category=${category.slug}`} onClick={() => setIsMobileMenuOpen(false)} className="hover:bg-gray-700 px-4 py-2">{category.name}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {allMobileNavLinks.map(link => ( 
                    <Link key={link.href} href={link.href} className={`${getMobileNavLinkClasses()} hover:bg-gray-800 rounded-full px-4 py-2`} onClick={() => setIsMobileMenuOpen(false)}>
                      <link.icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  ))}
                  {!isLoading && !user && (
                    <>
                      <DropdownMenuSeparator className="bg-gray-700" />
                      <Link href="/auth/login" className={`${getMobileNavLinkClasses()} hover:bg-gray-800 rounded-full px-4 py-2`} onClick={() => setIsMobileMenuOpen(false)}>
                        <LogIn className="h-5 w-5" />
                        Login
                      </Link>
                      <Link href="/auth/register" className={`${getMobileNavLinkClasses()} hover:bg-gray-800 rounded-full px-4 py-2`} onClick={() => setIsMobileMenuOpen(false)}>
                        <UserPlus className="h-5 w-5" />
                        Sign Up
                      </Link>
                    </>
                  )}
                  {isLoading && ( 
                    <>
                      <DropdownMenuSeparator className="bg-gray-700" />
                      <Skeleton className="h-8 w-full rounded-full bg-gray-700" />
                      <Skeleton className="h-8 w-full rounded-full bg-gray-700" />
                    </>
                  )}
                  {user && !isLoading && (
                    <>
                      <DropdownMenuSeparator className="bg-gray-700" />
                      <UserProfileDropdown />
                    </>
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}