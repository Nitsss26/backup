
"use client";

import Link from 'next/link';
import { BookOpenText, GraduationCap, LayoutGrid, Menu, Search, ShoppingCart, X, Store, LogIn, UserPlus, Book, Home, UserCircle, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getNavLinkClasses = () => {
    return theme === 'light' 
      ? "text-foreground/70 hover:text-foreground transition-colors"
      : "text-foreground hover:text-foreground/80 transition-colors";
  };

  const getButtonClasses = () => {
    return theme === 'light'
      ? "flex text-foreground/70 hover:text-foreground transition-colors"
      : "flex text-foreground hover:text-foreground/80 transition-colors";
  };

  const getIconClasses = () => {
    return theme === 'light'
      ? "h-4 w-4 text-foreground/70 hover:text-foreground transition-colors"
      : "h-4 w-4 text-foreground hover:text-foreground/80 transition-colors";
  };

  const getMobileNavLinkClasses = () => {
    return theme === 'light'
      ? "flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors text-base"
      : "flex items-center gap-2 text-foreground hover:text-foreground/80 transition-colors text-base";
  };

  const navLinks = [
    { href: '/courses', label: 'Courses', icon: BookOpenText },
    { href: '/subscriptions', label: 'Subscriptions', icon: Star },
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
  const wishlistItemCount = wishlistItems.length;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#15243f] shadow-md">
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

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <DropdownMenu>
            <Button variant="ghost" className={`${getButtonClasses()} -mr-7`} asChild>
              <Link href="/">
                <Home className={getIconClasses()} /> Home
              </Link>
            </Button>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={`flex items-center gap-1 ${getButtonClasses()} -mr-4`}>
                  <LayoutGrid className={getIconClasses()} /> Categories
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
              <Link key={link.href} href={link.href} className={getNavLinkClasses()}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:block w-full max-w-xs">
              <SearchBar />
            </div>
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link href="/dashboard/student/wishlist">
                <Heart className="!h-6 !w-6 stroke-white" />
                {wishlistItemCount > 0 && (
                  <UiBadge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs rounded-full bg-primary text-primary-foreground">
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
                  <UiBadge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs rounded-full bg-primary text-primary-foreground">
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
    </header>
  );
}
