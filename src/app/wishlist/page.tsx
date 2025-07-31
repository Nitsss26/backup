
"use client";

import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useWishlist, useCart } from '@/components/AppProviders';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import type { CartItem, WishlistItem } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function WishlistPage() {
    const { wishlistItems, removeFromWishlist } = useWishlist();
    const { addToCart, cartItems } = useCart();
    const { toast } = useToast();

    const handleMoveToCart = (item: WishlistItem['item'], type: WishlistItem['type']) => {
        const uniqueItemId = item.id || item._id;
        if (!uniqueItemId) return;
        addToCart(item as any, type as any); // Cast as any to satisfy addToCart
        removeFromWishlist(uniqueItemId, type);
        toast({
            title: "Moved to Cart!",
            description: `"${item.title}" has been moved from your wishlist to your cart.`,
        });
    };
    
    const breadcrumbItems = [
      { label: 'Home', href: '/' },
      { label: 'Wishlist' },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container py-8 px-4 md:px-6 bg-slate-50 dark:bg-slate-900">
                <Breadcrumbs items={breadcrumbItems} />
                <h1 className="text-3xl md:text-4xl font-bold mb-8 font-headline">My Wishlist</h1>
                {wishlistItems.length === 0 ? (
                    <div className="text-center py-16 border-2 border-dashed rounded-lg bg-card">
                        <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty.</h2>
                        <p className="text-muted-foreground mb-6">Explore courses and add your favorites to see them here.</p>
                        <Button asChild>
                            <Link href="/courses">Discover Courses</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {wishlistItems.map(({ item, type }) => {
                           const uniqueItemId = item.id || item._id;
                           if (!uniqueItemId) return null; // Skip rendering if no ID
                           const isInCart = cartItems.some(cartItem => (cartItem.item.id || cartItem.item._id) === uniqueItemId && cartItem.type === type);
                            
                           const linkHref = `/${type}s/${uniqueItemId}`; 
                            return (
                                <div key={`${type}-${uniqueItemId}`} className="flex flex-col md:flex-row items-start gap-4 p-4 border rounded-lg bg-card shadow-sm">
                                    <Image
                                        src={item.imageUrl || 'https://placehold.co/128x72.png'}
                                        alt={item.title}
                                        width={128}
                                        height={72}
                                        className="rounded-md object-cover w-full md:w-32 aspect-video"
                                    />
                                    <div className="flex-grow">
                                        <Link href={linkHref}>
                                            <h3 className="text-lg font-semibold hover:underline">{item.title}</h3>
                                        </Link>
                                        <p className="text-sm text-muted-foreground capitalize">{type}</p>
                                        <p className="text-lg font-bold text-primary mt-2">
                                            ₹{item.price?.toLocaleString('en-IN') || 'N/A'}
                                        </p>
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto mt-4 md:mt-0">
                                        <Button className="w-full md:w-auto" onClick={() => handleMoveToCart(item, type)} disabled={isInCart}>
                                            <ShoppingCart className="mr-2 h-4 w-4" /> 
                                            {isInCart ? 'In Cart' : 'Move to Cart'}
                                        </Button>
                                        <Button variant="outline" className="w-full md:w-auto" onClick={() => removeFromWishlist(uniqueItemId, type)}>
                                            <Trash2 className="mr-2 h-4 w-4" /> Remove
                                        </Button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}

