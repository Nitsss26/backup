
"use client";

import React, { type ReactNode, useState, useEffect, useCallback } from 'react';
import type { User as AppUser, Course, CartItem } from '@/lib/types';

// --- AUTH CONTEXT ---
interface AuthContextType {
  user: AppUser | null;
  isLoading: boolean;
  login: (credentials: any) => Promise<AppUser | null>;
  logout: () => Promise<void>;
  register: (details: any) => Promise<AppUser | null>;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const generateMockObjectId = () => {
  return Array(24).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('edtechcart_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: any): Promise<AppUser | null> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    let role: AppUser['role'] = 'student';
    const email = credentials.email.toLowerCase();
    if (email === 'admin@example.com') role = 'admin';
    else if (['expert.tutors@example.com', 'kaushik.learning@example.com', 'vidya.mandir@example.com', 'innovate.skillhub@example.com', 'gyan.ganga@example.com'].includes(email)) role = 'provider';
    
    const mockUser: AppUser = {
      id: generateMockObjectId(),
      name: credentials.email.split('@')[0],
      email: credentials.email,
      role: role,
      avatarUrl: `https://placehold.co/100x100/EBF4FF/3B82F6?text=${credentials.email.charAt(0).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      ...(role === 'provider' && { verificationStatus: email === 'kaushik.learning@example.com' ? 'verified' : 'pending', documentsSubmitted: email === 'kaushik.learning@example.com' ? true : true, bio: "Dedicated course provider." }),
      ...(role === 'student' && { bio: "Eager learner." }),
      ...(role === 'admin' && { bio: "Platform administrator." }),
    };
    setUser(mockUser);
    localStorage.setItem('edtechcart_user', JSON.stringify(mockUser));
    setIsLoading(false);
    return mockUser;
  };

  const logout = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser(null);
    localStorage.removeItem('edtechcart_user');
    setIsLoading(false);
  };

  const register = async (details: any): Promise<AppUser | null> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const userRole = details.role || 'student';
    const mockUser: AppUser = {
      id: generateMockObjectId(),
      name: details.name,
      email: details.email,
      role: userRole,
      avatarUrl: `https://placehold.co/100x100/EBF4FF/3B82F6?text=${details.name.charAt(0).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      ...(userRole === 'provider' && { verificationStatus: 'unverified', documentsSubmitted: false, bio: "New course provider ready to share knowledge!" }),
      ...(userRole === 'student' && { bio: "Excited to start learning!" }),
    };
    setUser(mockUser);
    localStorage.setItem('edtechcart_user', JSON.stringify(mockUser));
    setIsLoading(false);
    return mockUser;
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
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
  total: number; // Could be same as subtotal if no discounts/taxes yet
}

export const CartContext = React.createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('edtechcart_cart');
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) { // Basic validation
          setCartItems(parsedCart);
        } else {
          localStorage.removeItem('edtechcart_cart'); // Clear invalid cart
        }
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
        localStorage.removeItem('edtechcart_cart'); // Clear corrupted cart
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('edtechcart_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((course: Course) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.course.id === course.id);
      if (existingItem) {
        // Course is already in cart, do nothing or show a message
        return prevItems;
      }
      return [...prevItems, { course }];
    });
  }, []);

  const removeFromCart = useCallback((courseId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.course.id !== courseId));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.course.price, 0);
  const total = subtotal; // For now, total is same as subtotal

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, subtotal, total }}>
      {children}
    </CartContext.Provider>
  );
};


// --- APP PROVIDERS (combines Auth and Cart) ---
export default function AppProviders({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Avoid rendering children on server or before hydration if they depend on client-side context
    return null; 
  }
  
  return (
    <AuthProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </AuthProvider>
  );
}
