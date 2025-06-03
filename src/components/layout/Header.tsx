
"use client";

import Link from 'next/link';
import { BookOpenText, GraduationCap, LayoutGrid, Menu, Search, ShoppingCart, X, Store, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserProfileDropdown } from '@/components/UserProfileDropdown';
import { APP_NAME, CATEGORIES } from '@/lib/constants';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator, // Added
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React from 'react';
import { useAuth } from '@/components/AppProviders'; 
import { Skeleton } from '@/components/ui/skeleton'; // Added

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { user, isLoading } = useAuth(); 

  const navLinks = [
    { href: '/courses', label: 'Courses', icon: BookOpenText },
    { href: '/sell-courses', label: 'Sell on EdTechCart', icon: Store },
    { href: '/about', label: 'About', icon: Store }, // Assuming Store icon is okay for About/Contact for now
    { href: '/contact', label: 'Contact', icon: Store },
  ];

  // Dynamically add dashboard link based on user role
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
  
  // Links for the mobile menu primarily
  const allMobileNavLinks = dashboardLink ? [...navLinks, dashboardLink] : navLinks;


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <GraduationCap className="h-7 w-7 text-primary" />
          <span className="font-bold text-xl text-primary">{APP_NAME}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1">
                <LayoutGrid className="h-4 w-4" /> Categories
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {CATEGORIES.map((category) => (
                <DropdownMenuItem key={category.id} asChild>
                  <Link href={`/courses?category=${category.slug}`}>{category.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {navLinks.map(link => ( 
            <Link key={link.href} href={link.href} className="text-foreground/70 hover:text-foreground transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block relative w-full max-w-xs">
            <Input type="search" placeholder="Search courses..." className="pl-10" />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shopping Cart</span>
            </Link>
          </Button>
          
          {/* Desktop: Conditional Auth buttons vs UserProfileDropdown */}
          <div className="hidden md:flex items-center gap-2">
            {isLoading ? (
              <Skeleton className="h-9 w-24 rounded-md" />
            ) : !user ? (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button variant="default" size="sm" asChild>
                  <Link href="/auth/register">Sign Up</Link>
                </Button>
              </>
            ) : (
              <UserProfileDropdown />
            )}
          </div>
          
          {/* Mobile Menu Trigger */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs p-6">
              <div className="flex flex-col gap-6">
                <Link href="/" className="flex items-center gap-2 mb-4" onClick={() => setIsMobileMenuOpen(false)}>
                  <GraduationCap className="h-7 w-7 text-primary" />
                  <span className="font-bold text-xl text-primary">{APP_NAME}</span>
                </Link>
                <Input type="search" placeholder="Search courses..." />
                <nav className="flex flex-col gap-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="justify-start flex items-center gap-2 text-base">
                        <LayoutGrid className="h-5 w-5" /> Categories
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                      {CATEGORIES.map((category) => (
                        <DropdownMenuItem key={category.id} asChild>
                          <Link href={`/courses?category=${category.slug}`} onClick={() => setIsMobileMenuOpen(false)}>{category.name}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {allMobileNavLinks.map(link => ( 
                     <Link key={link.href} href={link.href} className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors text-base" onClick={() => setIsMobileMenuOpen(false)}>
                      <link.icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  ))}
                  {/* Add Login/Sign Up if not logged in and not loading */}
                  {!isLoading && !user && (
                    <>
                      <DropdownMenuSeparator />
                      <Link href="/auth/login" className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors text-base" onClick={() => setIsMobileMenuOpen(false)}>
                        <LogIn className="h-5 w-5" />
                        Login
                      </Link>
                      <Link href="/auth/register" className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors text-base" onClick={() => setIsMobileMenuOpen(false)}>
                        <UserPlus className="h-5 w-5" />
                        Sign Up
                      </Link>
                    </>
                  )}
                   {isLoading && ( // Show skeleton in mobile menu if auth state is loading
                    <>
                      <DropdownMenuSeparator />
                      <Skeleton className="h-8 w-full rounded-md" />
                      <Skeleton className="h-8 w-full rounded-md" />
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
