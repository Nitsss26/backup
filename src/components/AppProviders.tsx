
'use client';

import React, { type ReactNode, useState, useEffect, useCallback, createContext, useContext } from 'react';
import { SidebarProvider as UISidebarProvider } from '@/components/ui/sidebar';
import type { User as AppUser, Course, CartItem } from '@/lib/types';
import { auth, onAuthStateChanged, signOut as firebaseSignOut, type FirebaseUser } from '@/lib/firebase';
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
  firebaseUser: FirebaseUser;
  role?: 'student' | 'provider';
  isNewUser?: boolean;
  name?: string;
  phone?: string;
}

interface AuthContextType {
  user: AppUser | null;
  firebaseUser: FirebaseUser | null;
  isLoading: boolean;
  login: (params: LoginParams) => Promise<AppUser | null>;
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
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser && fbUser.emailVerified) { // Only proceed if email is verified
        setFirebaseUser(fbUser);
        const storedUser = localStorage.getItem('edtechcart_user');
        if (storedUser && JSON.parse(storedUser).firebaseUid === fbUser.uid) {
          setUser(JSON.parse(storedUser));
        } else {
          await login({ firebaseUser: fbUser });
        }
      } else {
        // If user is not verified or doesn't exist, treat as logged out
        setUser(null);
        setFirebaseUser(null);
        localStorage.removeItem('edtechcart_user');
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async ({ firebaseUser, role, name, phone }: LoginParams): Promise<AppUser | null> => {
    setIsLoading(true);
    try {
      
      const response = await axios.post('/api/users', {
        email: firebaseUser.email,
        name: name || firebaseUser.displayName || 'New User',
        avatarUrl: firebaseUser.photoURL,
        firebaseUid: firebaseUser.uid,
        role: role,
        phone: phone || firebaseUser.phoneNumber,
      });

      const appUser: AppUser = response.data;
      setUser(appUser);
      localStorage.setItem('edtechcart_user', JSON.stringify(appUser));
      return appUser;

    } catch (error) {
      console.error("Error during app login/sync:", error);
      await firebaseSignOut(auth);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    await firebaseSignOut(auth);
    setUser(null);
    setFirebaseUser(null);
    localStorage.removeItem('edtechcart_user');
    setIsLoading(false);
  };
  
  const value = { user, firebaseUser, isLoading, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// --- CART CONTEXT ---
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (course: Course) => void;
  removeFromCart: (courseId: string) => void;
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
        } else {
          localStorage.removeItem('edtechcart_cart');
        }
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
        localStorage.removeItem('edtechcart_cart');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('edtechcart_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((course: Course) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.course.id === course.id);
      if (existingItem) {
        return prevItems;
      }
      return [...prevItems, { course }];
    });
  }, []);

  const removeFromCart = useCallback((courseId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.course.id !== courseId));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.course.price, 0);
  const total = subtotal;

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, subtotal, total }}>
      {children}
    </CartContext.Provider>
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

  if (!mounted) {
    return null;
  }

  return (
    <AuthProvider>
      <CartProvider>
        <UISidebarProvider>
          <SidebarContextWrapper>
            {children}
          </SidebarContextWrapper>
        </UISidebarProvider>
      </CartProvider>
    </AuthProvider>
  );
}
