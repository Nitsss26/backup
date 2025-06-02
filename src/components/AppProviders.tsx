"use client";

import React, { type ReactNode, useState, useEffect } from 'react';
// import { ThemeProvider } from "next-themes"; // Example, if using next-themes

// Placeholder AuthContext
interface AuthContextType {
  user: any | null; // Replace 'any' with your User type
  isLoading: boolean;
  login: (credentials: any) => Promise<void>;
  logout: () => Promise<void>;
  register: (details: any) => Promise<void>;
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
  const [user, setUser] = useState<any | null>(null); // Replace 'any' with User type
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data
    const storedUser = localStorage.getItem('edtechcart_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: any) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockUser = { id: 'user1', name: credentials.email.split('@')[0], email: credentials.email, role: credentials.email.includes('admin') ? 'admin' : (credentials.email.includes('provider') ? 'provider' : 'student') }; // Example role logic
    setUser(mockUser);
    localStorage.setItem('edtechcart_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser(null);
    localStorage.removeItem('edtechcart_user');
    setIsLoading(false);
  };

  const register = async (details: any) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockUser = { id: 'newUser', name: details.name, email: details.email, role: 'student' };
    setUser(mockUser);
    localStorage.setItem('edtechcart_user', JSON.stringify(mockUser));
    setIsLoading(false);
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
    // Avoid hydration mismatch by rendering nothing or a loader on the server.
    // Or, ensure your ThemeProvider handles SSR correctly.
    return null; 
  }
  
  return (
    // <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        {children}
      </AuthProvider>
    // </ThemeProvider>
  );
}
