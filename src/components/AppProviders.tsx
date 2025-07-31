
'use client';

import React, { type ReactNode, useState, useEffect, useCallback, createContext, useContext } from 'react';
import type { User as AppUser, Course, CartItem, WishlistItem, EBook, Subscription, Book, AddOn } from '@/lib/types';
import axios from 'axios';
import { usePathname, useSearchParams } from 'next/navigation';

// --- Unique User ID Management ---
const getUniqueUserId = (): string => {
  if (typeof window === 'undefined') return 'server-user';
  let userId = localStorage.getItem('edtechcart_unique_user_id');
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem('edtechcart_unique_user_id', userId);
  }
  return userId;
};

// --- Analytics Event Tracking ---
const trackAnalyticsEvent = (eventType: string, details: object) => {
  if (typeof window === 'undefined') return;
  const uniqueUserId = getUniqueUserId();
  const sessionId = sessionStorage.getItem('edtechcart_session_id') || '';

  const payload = {
    type: eventType,
    sessionId,
    uniqueUserId,
    details: {
      path: window.location.pathname,
      ...details
    }
  };
  
  // Use sendBeacon for reliability, especially on page unload
  if (navigator.sendBeacon) {
    const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
    navigator.sendBeacon('/api/analytics/track', blob);
  } else {
    axios.post('/api/analytics/track', payload).catch(err => console.error("Analytics fallback failed:", err));
  }
};


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
  register: (details: any) => Promise<AppUser | null>;
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
    getUniqueUserId(); // Ensure unique user ID is set on first load
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
      const response = await axios.post('/api/users/login', { email, password });
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

  const register = async (details: any): Promise<AppUser | null> => {
    setIsLoading(true);
    try {
        const response = await axios.post('/api/users', details);
        if (response.status === 201) {
            const userFromDb = response.data;
            const userToStore: AppUser = { ...userFromDb, id: userFromDb._id.toString() };
            return userToStore;
        } else {
            throw new Error(response.data.message || "Registration failed");
        }
    } catch (error: any) {
       console.error("Error during app registration:", error);
       const errorMessage = error.response?.data?.message || error.message || "An unknown error occurred during registration.";
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
  
  const value = { user, isLoading, login, logout, register };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// --- CART CONTEXT ---
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Course | EBook | Subscription | AddOn | Book, type: CartItem['type']) => void;
  removeFromCart: (itemId: string, type: CartItem['type']) => void;
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
  const { user } = useAuth();
  
  const getCartKey = useCallback(() => {
    const uniqueUserId = getUniqueUserId();
    return `edtechcart_cart_${user?.id || uniqueUserId}`;
  }, [user]);

  useEffect(() => {
    const cartKey = getCartKey();
    const storedCart = localStorage.getItem(cartKey);
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        }
      } catch (e) { console.error('Failed to parse cart', e); }
    } else {
        setCartItems([]); // Clear cart if key changes (e.g. on login)
    }
  }, [user, getCartKey]);

  useEffect(() => {
    const cartKey = getCartKey();
    localStorage.setItem(cartKey, JSON.stringify(cartItems));
  }, [cartItems, getCartKey]);

  const addToCart = useCallback((item: CartItem['item'], type: CartItem['type']) => {
    setCartItems((prev) => {
      const uniqueItemId = item.id || item._id;
      if (!uniqueItemId) return prev;
      const existing = prev.find(i => (i.item.id || i.item._id) === uniqueItemId && i.type === type);
      if (existing) return prev;
      
      trackAnalyticsEvent('add_to_cart', {
          itemId: uniqueItemId,
          itemType: type,
          itemTitle: item.title,
          price: item.price
      });
      return [...prev, { type, item }];
    });
  }, []);

  const removeFromCart = useCallback((itemId: string, type: CartItem['type']) => {
    setCartItems((prev) => prev.filter(i => !((i.item.id || i.item._id) === itemId && i.type === type)));
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const subtotal = cartItems.reduce((sum, cartItem) => sum + (cartItem.item.price || 0), 0);
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
  addToWishlist: (item: WishlistItem['item'], type: WishlistItem['type']) => void;
  removeFromWishlist: (itemId: string, type: WishlistItem['type']) => void;
}
export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);
export function useWishlist() {
    const context = useContext(WishlistContext);
    if (!context) throw new Error('useWishlist must be used within AppProviders');
    return context;
}

const WishlistProvider = ({ children }: { children: ReactNode }) => {
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
    const { user } = useAuth();
    
    const getWishlistKey = useCallback(() => {
        const uniqueUserId = getUniqueUserId();
        return `edtechcart_wishlist_${user?.id || uniqueUserId}`;
    }, [user]);

    useEffect(() => {
        const wishlistKey = getWishlistKey();
        const storedWishlist = localStorage.getItem(wishlistKey);
        if (storedWishlist) {
            try {
                const parsedWishlist = JSON.parse(storedWishlist);
                if (Array.isArray(parsedWishlist)) {
                    setWishlistItems(parsedWishlist);
                }
            } catch (e) { console.error('Failed to parse wishlist', e); }
        } else {
             setWishlistItems([]);
        }
    }, [user, getWishlistKey]);

    useEffect(() => {
        const wishlistKey = getWishlistKey();
        localStorage.setItem(wishlistKey, JSON.stringify(wishlistItems));
    }, [wishlistItems, getWishlistKey]);

    const addToWishlist = useCallback((item: WishlistItem['item'], type: WishlistItem['type']) => {
        setWishlistItems((prev) => {
            const uniqueItemId = item.id || item._id;
             if (!uniqueItemId) return prev;
            const existing = prev.find(i => (i.item.id || i.item._id) === uniqueItemId && i.type === type);
            if (existing) return prev;

            trackAnalyticsEvent('add_to_wishlist', {
                itemId: uniqueItemId,
                itemType: type,
                itemTitle: item.title,
            });
            return [...prev, { type, item }];
        });
    }, []);

    const removeFromWishlist = useCallback((itemId: string, type: WishlistItem['type']) => {
        setWishlistItems((prev) => prev.filter(i => !((i.item.id || i.item._id) === itemId && i.type === type)));
    }, []);

    return (
        <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};


// --- APP PROVIDERS ---
export default function AppProviders({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Return a skeleton or null to avoid hydration errors
    return null;
  }

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          {children}
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
