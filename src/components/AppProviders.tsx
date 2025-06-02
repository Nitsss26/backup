
"use client";

import React, { type ReactNode, useState, useEffect } from 'react';
import type { User as AppUser } from '@/lib/types'; // Use the existing User type

// Define AuthContextType using AppUser
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

// Mock Auth Provider
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data
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

    // Specific emails for roles for testing
    if (email === 'admin@example.com') {
      role = 'admin';
    } else if (
      // Seller emails from placeholder-data.ts
      email === 'expert.tutors@example.com' ||
      email === 'kaushik.learning@example.com' ||
      email === 'vidya.mandir@example.com' ||
      email === 'innovate.skillhub@example.com' ||
      email === 'gyan.ganga@example.com'
    ) {
      role = 'provider';
    }
    // Other emails will default to student

    const mockUser: AppUser = {
      id: 'user-' + Math.random().toString(36).substring(7),
      name: credentials.email.split('@')[0],
      email: credentials.email,
      role: role,
      avatarUrl: `https://placehold.co/100x100/EBF4FF/3B82F6?text=${credentials.email.charAt(0).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      // Add default properties for provider if role is provider
      ...(role === 'provider' && {
        verificationStatus: email === 'kaushik.learning@example.com' ? 'verified' : 'pending', // Example logic
        documentsSubmitted: email === 'kaushik.learning@example.com' ? true : true, // Example logic
        bio: "Dedicated course provider.",
      }),
      ...(role === 'student' && {
        bio: "Eager learner.",
      }),
      ...(role === 'admin' && {
        bio: "Platform administrator.",
      }),
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
    // After logout, router.push('/auth/login') or similar would typically be called from where logout is initiated,
    // or a global effect could watch for user === null and redirect.
  };

  const register = async (details: any): Promise<AppUser | null> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const userRole = details.role || 'student';
    const mockUser: AppUser = {
      id: 'newUser-' + Math.random().toString(36).substring(7),
      name: details.name,
      email: details.email,
      role: userRole,
      avatarUrl: `https://placehold.co/100x100/EBF4FF/3B82F6?text=${details.name.charAt(0).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      ...(userRole === 'provider' && {
        verificationStatus: 'unverified',
        documentsSubmitted: false,
        bio: "New course provider ready to share knowledge!",
      }),
      ...(userRole === 'student' && {
        bio: "Excited to start learning!",
      }),
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

export default function AppProviders({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null; 
  }
  
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
