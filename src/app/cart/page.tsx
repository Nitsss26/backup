"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { placeholderCourses } from '@/lib/placeholder-data';
import type { Course, CartItem } from '@/lib/types';
import { X, Tag, Trash2, ShoppingBag } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';

// Mock cart state
const initialCartItems: CartItem[] = placeholderCourses.slice(0, 2).map(course => ({ course }));

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discountCode, setDiscountCode] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // In a real app, fetch cart from localStorage or API
    setCartItems(initialCartItems); 
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.course.price, 0);
  const discountAmount = discountCode === 'SAVE10' ? subtotal * 0.1 : 0; // Example discount
  const total = subtotal - discountAmount;

  const handleRemoveItem = (courseId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.course.id !== courseId));
  };
  
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Shopping Cart' },
  ];

  if (!isClient) {
    // Render a loading state or skeleton screen on the server
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container py-8 px-4 md:px-6">
          <Breadcrumbs items={breadcrumbItems} />
          <h1 className="text-3xl md:text-4xl font-bold mb-8 font-headline">Shopping Cart</h1>
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-xl text-muted-foreground">Loading your cart...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container py-8 px-4 md:px-6 bg-slate-50 dark:bg-slate-900">
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className="text-3xl md:text-4xl font-bold mb-8 font-headline">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12 bg-background rounded-lg shadow">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Looks like you haven&apos;t added any courses yet.</p>
            <Button asChild>
              <Link href="/courses">Explore Courses</Link>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map(item => (
                <Card key={item.course.id} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 shadow-sm hover:shadow-md transition-shadow">
                  <Image
                    src={item.course.imageUrl}
                    alt={item.course.title}
                    width={160}
                    height={90}
                    className="rounded-md object-cover w-full md:w-40 aspect-video"
                    data-ai-hint={`${item.course.category} course`}
                  />
                  <div className="flex-grow">
                    <Link href={`/courses/${item.course.id}`} className="hover:underline">
                      <h3 className="text-lg font-semibold line-clamp-2">{item.course.title}</h3>
                    </Link>
                    <p className="text-sm text-muted-foreground">By {item.course.instructor}</p>
                    <p className="text-sm text-muted-foreground">{item.course.category}</p>
                  </div>
                  <div className="flex flex-col items-end md:items-center gap-2 md:ml-auto mt-4 md:mt-0">
                    <p className="text-lg font-semibold">${item.course.price.toFixed(2)}</p>
                    <Button variant="ghost" size="sm" onClick={() => handleRemoveItem(item.course.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-4 w-4 mr-1" /> Remove
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-headline">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="text" 
                      placeholder="Discount code" 
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      className="flex-grow"
                    />
                    <Button variant="outline" onClick={() => {/* Apply discount logic */}}>
                       <Tag className="h-4 w-4 mr-1"/> Apply
                    </Button>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <Button size="lg" className="w-full" asChild>
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">Secure payment processing.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
