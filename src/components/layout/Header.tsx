
"use client";

import Link from 'next/link';
import { BookOpenText, GraduationCap, LayoutGrid, Menu, Search, ShoppingCart, X, Store, LogIn, UserPlus, Book, Home, MessageSquare, Info, Heart } from 'lucide-react';
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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import React, { useState } from 'react';
import { useAuth, useCart, useWishlist } from '@/components/AppProviders'; 
import { Skeleton } from '@/components/ui/skeleton';
import { ThemeToggleButton } from '@/components/ThemeToggleButton';
import { useTheme } from 'next-themes';
import { Badge as UiBadge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SearchBar } from '@/components/SearchBar';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { user, isLoading } = useAuth(); 
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { theme } = useTheme();

  // Handle scroll effect for mobile
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Define theme-aware classes
  const getNavLinkClasses = () => {
    return "text-foreground/70 hover:text-foreground transition-colors text-[8px] md:text-xs lg:text-xs";
  };

  const getButtonClasses = () => {
    return "flex text-foreground/70 hover:text-foreground transition-colors text-[10px] md:text-xs lg:text-sm";
  };

  const getIconClasses = () => {
    return "h-4 w-4 text-foreground/70 hover:text-foreground transition-colors";
  };

  const getMobileNavLinkClasses = () => {
    return "flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors text-base";
  };

  const navLinks = [
    { href: '/compare', label: 'Compare Courses', icon: Book },
    { href: '/sell-courses', label: 'Sell on EdTechCart', icon: Store },
    { href: '/about', label: 'About', icon: Info },
    { href: '/contact', label: 'Contact', icon: MessageSquare },
  ];

  let dashboardLink = null;
  if (user && !isLoading) {
    if (user.role === 'student') {
      dashboardLink = { href: '/', label: 'Home', icon: Home };
    } else if (user.role === 'provider') {
      dashboardLink = { href: '/dashboard/seller', label: 'Seller Dashboard', icon: LayoutGrid };
    } else if (user.role === 'admin') {
      dashboardLink = { href: '/admin', label: 'Admin Panel', icon: LayoutGrid };
    }
  }
  
  // Reorder mobile nav links: Dashboard first, then Categories, then other links
  const orderedMobileNavLinks = [];
  if (dashboardLink) {
    orderedMobileNavLinks.push(dashboardLink);
  }
  orderedMobileNavLinks.push(...navLinks);
  
  const cartItemCount = cartItems.length;
  const wishlistItemCount = wishlistItems.length;

  return (
    <header data-analytics-section="Header" className={`sticky top-0 z-50 w-full border-b bg-[#15243f] shadow-md transition-all duration-300 ${isScrolled ? 'h-14' : 'h-26'} md:h-16`}>
      {/* Mobile Header */}
      <div className="md:hidden bg-[#15243f] h-full overflow-hidden">
        {/* Normal Header - When not scrolled */}
        {!isScrolled && (
          <div className="transition-all duration-300">
            {/* Top Row - Menu, Logo, User Text, User Icon, Cart */}
            <div className="flex items-center h-14 px-3 gap-2">
              {/* Hamburger Menu */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 p-0 flex-shrink-0">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full max-w-xs p-6">
                  <SheetHeader className="text-left mb-6">
                    <SheetTitle asChild>
                      <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                        <GraduationCap className="h-7 w-7 text-primary" />
                        <span className="font-bold text-xl text-primary">{APP_NAME}</span>
                      </Link>
                    </SheetTitle>
                    <SheetDescription className="sr-only">Main navigation menu</SheetDescription>
                  </SheetHeader>
                  <div className="flex flex-col gap-6">
                    <SearchBar />
                    <nav className="flex flex-col gap-4">
                      {/* Categories dropdown with proper alignment */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="justify-start flex items-center gap-2 text-base p-0 h-auto">
                            <LayoutGrid className="h-5 w-5" />
                            <span>Course Categories</span>
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
                      
                      <Link href="/" className={getMobileNavLinkClasses()} onClick={() => setIsMobileMenuOpen(false)}>
                        <Home className="h-5 w-5" />
                        Home
                      </Link>
                      {/* Other navigation links */}
                      {orderedMobileNavLinks.map(link => ( 
                         <Link key={link.href} href={link.href} className={getMobileNavLinkClasses()} onClick={() => setIsMobileMenuOpen(false)}>
                          <link.icon className="h-5 w-5" />
                          {link.label}
                        </Link>
                      ))}
                      
                      
                      
                      {!isLoading && !user && (
                        <>
                          <DropdownMenuSeparator />
                          <Link href="/auth/login" className={getMobileNavLinkClasses()} onClick={() => setIsMobileMenuOpen(false)}>
                            <LogIn className="h-5 w-5" />
                            Login
                          </Link>
                          <Link href="/auth/register" className={`${getMobileNavLinkClasses()} text-white !text-white`} onClick={() => setIsMobileMenuOpen(false)}>
                            <UserPlus className="h-5 w-5" />
                            Sign Up
                          </Link>
                        </>
                      )}
                       {isLoading && ( 
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

              {/* Logo */}
              <Link href="/" className="flex items-center flex-shrink-0">
                <img
                  src="/logoo.png"
                  alt="Logo"
                  width={80}
                  height={32}
                  className="h-8 w-auto object-contain"
                />
              </Link>

              {/* User Icon with Dropdown and Cart - Justified to end */}
              <div className="flex-1"></div> {/* Spacer to push icons to end */}
              <div className="flex items-center gap-2 justify-end">
                {user && !isLoading && (
                  <UserProfileDropdown />
                )}
                <Button variant="ghost" size="icon" asChild className="relative h-8 w-8 p-0 flex-shrink-0">
                  <Link href="/wishlist">
                    <Heart className="!h-5 !w-5 stroke-white" />
                    {wishlistItemCount > 0 && (
                      <UiBadge 
                        variant="destructive" 
                        className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs rounded-full bg-orange-500 text-white"
                      >
                        {wishlistItemCount > 9 ? '9+' : wishlistItemCount}
                      </UiBadge>
                    )}
                    <span className="sr-only">Wishlist</span>
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild className="relative h-8 w-8 p-0 flex-shrink-0">
                  <Link href="/cart">
                    <ShoppingCart className="!h-5 !w-5 stroke-white" />
                    {cartItemCount > 0 && (
                      <UiBadge 
                        variant="destructive" 
                        className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs rounded-full bg-orange-500 text-white"
                      >
                        {cartItemCount > 9 ? '9+' : cartItemCount}
                      </UiBadge>
                    )}
                    <span className="sr-only">Shopping Cart</span>
                  </Link>
                </Button>
              </div>
            </div>

            {/* Bottom Row - Search Bar Only */}
            <div className="h-12 px-3 py-2">
              <SearchBar />
            </div>
          </div>
        )}

        {/* Compact Header - When scrolled (Amazon style) */}
        {isScrolled && (
          <div className="flex items-center h-14 px-3 gap-2 bg-[#15243f]">
            {/* Hamburger Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 p-0 flex-shrink-0">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-xs p-6">
                 <SheetHeader className="text-left mb-6">
                    <SheetTitle asChild>
                      <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                        <GraduationCap className="h-7 w-7 text-primary" />
                        <span className="font-bold text-xl text-primary">{APP_NAME}</span>
                      </Link>
                    </SheetTitle>
                    <SheetDescription className="sr-only">Main navigation menu</SheetDescription>
                  </SheetHeader>
                <div className="flex flex-col gap-6">
                  <SearchBar />
                  <nav className="flex flex-col gap-4">
                    {/* Categories dropdown with proper alignment */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="justify-start flex items-center gap-2 text-base p-0 h-auto">
                          <LayoutGrid className="h-5 w-5" />
                          <span>Categories</span>
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
                    
                    {/* Other navigation links */}
                    {orderedMobileNavLinks.map(link => ( 
                       <Link key={link.href} href={link.href} className={getMobileNavLinkClasses()} onClick={() => setIsMobileMenuOpen(false)}>
                        <link.icon className="h-5 w-5" />
                        {link.label}
                      </Link>
                    ))}
                    
                    <Link href="/wishlist" className={getMobileNavLinkClasses()} onClick={() => setIsMobileMenuOpen(false)}>
                      <Heart className="h-5 w-5" />
                      Wishlist
                    </Link>
                    
                    {!isLoading && !user && (
                      <>
                        <DropdownMenuSeparator />
                        <Link href="/auth/login" className={getMobileNavLinkClasses()} onClick={() => setIsMobileMenuOpen(false)}>
                          <LogIn className="h-5 w-5" />
                          Login
                        </Link>
                        <Link href="/auth/register" className={`${getMobileNavLinkClasses()} text-white !text-white`} onClick={() => setIsMobileMenuOpen(false)}>
                          <UserPlus className="h-5 w-5" />
                          Sign Up
                        </Link>
                      </>
                    )}
                     {isLoading && ( 
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

            {/* Search Bar - Takes most space */}
            <div className="flex-1 mx-2">
              <SearchBar />
            </div>

            {/* Cart Icon and User Icon - Justified to end */}
            <div className="flex items-center gap-2 justify-end">
              {user && !isLoading && (
                <UserProfileDropdown />
              )}
              <Button variant="ghost" size="icon" asChild className="relative h-8 w-8 p-0 flex-shrink-0">
                <Link href="/wishlist">
                  <Heart className="!h-5 !w-5 stroke-white" />
                  {wishlistItemCount > 0 && (
                    <UiBadge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs rounded-full bg-orange-500 text-white"
                    >
                      {wishlistItemCount > 9 ? '9+' : wishlistItemCount}
                    </UiBadge>
                  )}
                  <span className="sr-only">Wishlist</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild className="relative h-8 w-8 p-0 flex-shrink-0">
                <Link href="/cart">
                  <ShoppingCart className="!h-5 !w-5 stroke-white" />
                  {cartItemCount > 0 && (
                    <UiBadge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs rounded-full bg-orange-500 text-white"
                    >
                      {cartItemCount > 9 ? '9+' : cartItemCount}
                    </UiBadge>
                  )}
                  <span className="sr-only">Shopping Cart</span>
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Header - Fixed background color */}
      <div className="hidden md:block bg-[#15243f]">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/logoo.png"
              alt="Logo"
              width={160}
              height={160}
              className="w-100 h-100 object-contain"
            />
          </Link>

          <nav data-analytics-section="Header Nav" className="hidden md:flex items-center gap-1 lg:gap-2 xl:gap-4 text-[10px] md:text-xs lg:text-sm font-medium">
            <Button variant="ghost" className={`${getButtonClasses()} px-1 md:px-2 xl:px-3`} asChild>
              <Link href="/">
                <Home className={getIconClasses()} />
                <span className="ml-1 text-xs">Home</span>
              </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={`flex items-center gap-1 ${getButtonClasses()} px-1 md:px-2 xl:px-3`}>
                  <LayoutGrid className={getIconClasses()} />
                  <span className="ml-1 text-xs">Categories</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {CATEGORIES.map((category) => (
                  <DropdownMenuItem key={category.id} asChild>
                    <Link className={getNavLinkClasses()} href={`/courses?category=${category.slug}`}>{category.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {navLinks.map(link => ( 
              <Link key={link.href} href={link.href} className={`${getNavLinkClasses()} px-1 md:px-2 xl:px-3 py-2 rounded-md whitespace-nowrap`}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:block relative w-full max-w-xs">
              <SearchBar />
            </div>
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link href="/wishlist">
                <Heart className="!h-6 !w-6 stroke-white" />
                {wishlistItemCount > 0 && (
                  <UiBadge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs rounded-full bg-primary text-primary-foreground"
                  >
                    {wishlistItemCount}
                  </UiBadge>
                )}
                <span className="sr-only">Wishlist</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link href="/cart">
                <ShoppingCart className="!h-6 !w-6 stroke-white" />
                {cartItemCount > 0 && (
                  <UiBadge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs rounded-full bg-primary text-primary-foreground"
                  >
                    {cartItemCount}
                  </UiBadge>
                )}
                <span className="sr-only">Shopping Cart</span>
              </Link>
            </Button>
            
            <div className="hidden md:flex items-center gap-3">
              {isLoading ? (
                <Skeleton className="h-9 w-24 rounded-md" />
              ) : !user ? (
                <>
                  <Button className='' variant="outline" size="sm" asChild>
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
          </div>
        </div>
      </div>
    </header>
  );
}
