
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
import type { CartItem } from '@/lib/types';
import { X, Tag, Trash2, ShoppingBag, Info } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { useAuth, useCart } from '@/components/AppProviders';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; 
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const [discountCode, setDiscountCode] = useState('');
  const [isClient, setIsClient] = useState(false);
  const { user, isLoading: authLoading } = useAuth();
  const { cartItems, removeFromCart, subtotal, total } = useCart();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);


  const handleRemoveItem = (itemId: string, itemType: 'course' | 'ebook') => {
    removeFromCart(itemId, itemType);
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Shopping Cart' },
  ];

  if (!isClient || authLoading) {
    return (
      <div className="flex flex-col min-h-screen w-full">
        <Header />
        <main className="flex-grow container py-8 px-4 md:px-6">
          <Breadcrumbs items={breadcrumbItems} />
          <h1 className="text-3xl md:text-4xl font-bold mb-8 font-headline">Shopping Cart</h1>
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4 animate-pulse" />
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

        {!user && cartItems.length > 0 && (
          <Alert className="mb-6 border-blue-500 bg-blue-50 dark:bg-blue-900/30">
            <Info className="h-4 w-4 !text-blue-600 dark:!text-blue-400" />
            <AlertTitle className="font-semibold text-blue-700 dark:text-blue-300">You're Browsing as a Guest</AlertTitle>
            <AlertDescription className="text-blue-600 dark:text-blue-400">
              <Link href="/auth/login?redirect=/cart" className="font-medium underline hover:text-blue-700 dark:hover:text-blue-200">Sign in</Link> or <Link href="/auth/register?redirect=/cart" className="font-medium underline hover:text-blue-700 dark:hover:text-blue-200">create an account</Link> to save your cart and proceed to checkout.
            </AlertDescription>
          </Alert>
        )}

        {cartItems.length === 0 ? (
          <div className="text-center py-12 bg-background rounded-lg shadow">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Looks like you haven&apos;t added any items yet.</p>
            <Button asChild>
              <Link href="/courses">Explore Courses</Link>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map(cartItem => {
                const item = cartItem.item;
                const linkHref = cartItem.type === 'course' ? `/courses/${item.id}` : `/ebooks/${item.id}`;
                return (
                    <Card key={`${cartItem.type}-${item.id}`} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 shadow-sm hover:shadow-md transition-shadow border">
                    <Image
                        src={item.imageUrl}
                        alt={item.title}
                        width={160}
                        height={cartItem.type === 'ebook' ? 213 : 90}
                        className="rounded-md object-cover w-full md:w-40 aspect-video"
                        data-ai-hint={`${item.category} ${cartItem.type} cart item`}
                    />
                    <div className="flex-grow">
                        <Link href={linkHref} className="hover:underline">
                        <h3 className="text-lg font-semibold line-clamp-2">{item.title}</h3>
                        </Link>
                        <p className="text-sm text-muted-foreground">By {cartItem.type === 'course' ? item.providerInfo?.name || item.instructor : item.author}</p>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                    </div>
                    <div className="flex flex-col items-end md:items-center gap-2 md:ml-auto mt-4 md:mt-0">
                        <p className="text-lg font-semibold">₹{item.price.toLocaleString('en-IN')}</p>
                        <Button variant="ghost" size="sm" onClick={() => handleRemoveItem(item.id, cartItem.type)} className="text-red-500 hover:text-red-700">
                        <Trash2 className="h-4 w-4 mr-1" /> Remove
                        </Button>
                    </div>
                    </Card>
                );
              })}
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24 shadow-lg border">
                <CardHeader>
                  <CardTitle className="text-xl font-headline">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
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
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                  <Button size="lg" className="w-full" 
                    onClick={() => {
                        if (!user) {
                           router.push('/auth/login?redirect=/checkout');
                        } else {
                           router.push('/checkout');
                        }
                    }}
                    disabled={!user && cartItems.length === 0}
                  >
                    {user ? "Proceed to Checkout" : "Login to Checkout"}
                  </Button>
                  {!user && <p className="text-xs text-muted-foreground text-center">You need to be logged in to proceed.</p>}
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
