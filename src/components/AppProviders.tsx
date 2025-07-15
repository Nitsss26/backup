
'use client';

import React, { type ReactNode, useState, useEffect, useCallback, createContext, useContext } from 'react';
import { SidebarProvider as UISidebarProvider } from '@/components/ui/sidebar';
import type { User as AppUser, Course, CartItem } from '@/lib/types';
import axios from 'axios'; // Import axios for API calls

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
}

interface AuthContextType {
  user: AppUser | null;
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

  const login = async ({ email }: LoginParams): Promise<AppUser | null> => {
    setIsLoading(true);
    try {
      // This is now the definitive source of truth for login.
      // It hits the backend, which queries the real database.
      const response = await axios.post('/api/users', {
        email: email,
        // For simplicity, we pass a mock firebaseUid. In a real scenario,
        // this would come from a real auth provider like Firebase Auth.
        firebaseUid: `mock_uid_for_${email}`
      });

      if (response.status === 200 || response.status === 201) {
        const userFromDb = response.data;

        // The user object from the API should already have a string `id`
        const userToStore: AppUser = {
            ...userFromDb,
            id: userFromDb._id.toString() 
        };
        
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
      // Extract a user-friendly error message if available
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
