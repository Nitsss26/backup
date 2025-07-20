
'use client';

import React, { type ReactNode, useState, useEffect, useCallback, createContext, useContext } from 'react';
import { SidebarProvider as UISidebarProvider } from '@/components/ui/sidebar';
import type { User as AppUser, Course, CartItem, WishlistItem, EBook, Subscription } from '@/lib/types';
import axios from 'axios';

// --- SIDEBAR CONTEXT ---
interface SidebarContextType {
  userRole: 'student' | 'provider' | 'admin' | null;
}
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);
export function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebarContext must be used within AppProviders');
  }
  return context;
}

// --- AUTH CONTEXT ---
interface LoginParams {
  email: string;
  password?: string;
}

interface AuthContextType {
  user: AppUser | null;
  isLoading: boolean;
  login: (params: Required<LoginParams>) => Promise<AppUser | null>;
  logout: () => Promise<void>;
}
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AppProviders');
  }
  return context;
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('edtechcart_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.id) {
             setUser(parsedUser);
        } else {
            localStorage.removeItem('edtechcart_user');
        }
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        localStorage.removeItem('edtechcart_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async ({ email, password }: Required<LoginParams>): Promise<AppUser | null> => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/users/login', { email, password }); // Assumes a dedicated login route
      if (response.status === 200) {
        const userFromDb = response.data;
        const userToStore: AppUser = { ...userFromDb, id: userFromDb._id.toString() };
        setUser(userToStore);
        localStorage.setItem('edtechcart_user', JSON.stringify(userToStore));
        return userToStore;
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (error: any) {
      console.error("Error during app login:", error);
      setUser(null);
      localStorage.removeItem('edtechcart_user');
      const errorMessage = error.response?.data?.message || error.message || "An unknown error occurred during login.";
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = async () => {
    setIsLoading(true);
    setUser(null);
    localStorage.removeItem('edtechcart_user');
    setIsLoading(false);
  };
  
  const value = { user, isLoading, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// --- CART CONTEXT ---
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Course | EBook | Subscription, type: 'course' | 'ebook' | 'subscription') => void;
  removeFromCart: (itemId: string, type: 'course' | 'ebook' | 'subscription') => void;
  clearCart: () => void;
  subtotal: number;
  total: number;
}
export const CartContext = createContext<CartContextType | undefined>(undefined);
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within AppProviders');
  return context;
}

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('edtechcart_cart');
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        }
      } catch (e) { console.error('Failed to parse cart', e); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('edtechcart_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((item: Course | EBook | Subscription, type: 'course' | 'ebook' | 'subscription') => {
    setCartItems((prev) => {
      const existing = prev.find(i => i.item.id === item.id && i.type === type);
      if (existing) return prev;
      return [...prev, { type, item }];
    });
  }, []);

  const removeFromCart = useCallback((itemId: string, type: 'course' | 'ebook' | 'subscription') => {
    setCartItems((prev) => prev.filter(i => !(i.item.id === itemId && i.type === type)));
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const subtotal = cartItems.reduce((sum, cartItem) => sum + cartItem.item.price, 0);
  const total = subtotal;

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, subtotal, total }}>
      {children}
    </CartContext.Provider>
  );
};

// --- WISHLIST CONTEXT ---
interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (item: Course | EBook | Subscription, type: 'course' | 'ebook' | 'subscription') => void;
  removeFromWishlist: (itemId: string, type: 'course' | 'ebook' | 'subscription') => void;
}
export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);
export function useWishlist() {
    const context = useContext(WishlistContext);
    if (!context) throw new Error('useWishlist must be used within AppProviders');
    return context;
}

const WishlistProvider = ({ children }: { children: ReactNode }) => {
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

    useEffect(() => {
        const storedWishlist = localStorage.getItem('edtechcart_wishlist');
        if (storedWishlist) {
            try {
                const parsedWishlist = JSON.parse(storedWishlist);
                if (Array.isArray(parsedWishlist)) {
                    setWishlistItems(parsedWishlist);
                }
            } catch (e) { console.error('Failed to parse wishlist', e); }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('edtechcart_wishlist', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    const addToWishlist = useCallback((item: Course | EBook | Subscription, type: 'course' | 'ebook' | 'subscription') => {
        setWishlistItems((prev) => {
            const existing = prev.find(i => i.item.id === item.id && i.type === type);
            if (existing) return prev;
            return [...prev, { type, item }];
        });
    }, []);

    const removeFromWishlist = useCallback((itemId: string, type: 'course' | 'ebook' | 'subscription') => {
        setWishlistItems((prev) => prev.filter(i => !(i.item.id === itemId && i.type === type)));
    }, []);

    return (
        <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

// --- SIDEBAR CONTEXT WRAPPER ---
function SidebarContextWrapper({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const userRole = user?.role || null;

  return (
    <SidebarContext.Provider value={{ userRole }}>
      {children}
    </SidebarContext.Provider>
  );
}

// --- APP PROVIDERS ---
export default function AppProviders({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <UISidebarProvider>
            <SidebarContextWrapper>
              {children}
            </SidebarContextWrapper>
          </UISidebarProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
