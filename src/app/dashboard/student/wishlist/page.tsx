
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { HeartOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CourseCard } from '@/components/CourseCard';
import { useWishlist } from '@/components/AppProviders';
import { Course, EBook } from '@/lib/types';
import { SubscriptionCard } from '@/components/SubscriptionCard'; // Assuming a SubscriptionCard exists

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleRemove = (item: Course | EBook, type: 'course' | 'ebook') => {
    removeFromWishlist(item.id, type);
    toast({
      title: "Removed from Wishlist",
      description: `"${item.title}" has been removed from your wishlist.`,
    });
  };

  if (!isClient) {
    return <div className="text-center py-10">Loading your wishlist...</div>;
  }

  return (
    <div className="space-y-8 w-full">
      <h1 className="text-3xl font-bold font-headline">My Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <HeartOff className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your Wishlist is Empty</h2>
          <p className="text-muted-foreground mb-4">Add courses you're interested in to your wishlist.</p>
          <Button asChild>
            <Link href="/courses">Explore Courses</Link>
          </Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map(({ item, type }) => (
            <div key={`${type}-${item.id}`} className="relative group">
              {type === 'course' ? (
                <CourseCard course={item as Course} />
              ) : (
                // Assuming you have an EbookCard or similar component
                <SubscriptionCard subscription={item as EBook & { url: string }} />
              )}
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                onClick={() => handleRemove(item, type)}
                title="Remove from Wishlist"
              >
                <HeartOff className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
