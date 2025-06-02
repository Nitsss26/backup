
"use client";

import { useState, useEffect } from 'react';
import { placeholderCourses } from '@/lib/placeholder-data';
import type { Course, WishlistItem as WishlistItemType } from '@/lib/types';
import { CourseCard } from '@/components/CourseCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { HeartOff, ShoppingBag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';


const initialWishlistItems: WishlistItemType[] = placeholderCourses.slice(5, 8).map(course => ({ course }));

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItemType[]>([]);
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
    // In a real app, fetch wishlist from localStorage or API
    setWishlistItems(initialWishlistItems);
  }, []);

  const handleRemoveFromWishlist = (courseId: string) => {
    const removedCourse = wishlistItems.find(item => item.course.id === courseId)?.course;
    setWishlistItems(prev => prev.filter(item => item.course.id !== courseId));
    if(removedCourse){
        toast({
            title: "Removed from Wishlist",
            description: `"${removedCourse.title}" has been removed from your wishlist.`,
        });
    }
  };

  if (!isClient) {
    return <div className="text-center py-10">Loading your wishlist...</div>;
  }

  return (
    <div className="space-y-8">
      {/* StudentDashboardHeaderNav is now in layout */}
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
          {wishlistItems.map(item => (
            <div key={item.course.id} className="relative group">
              <CourseCard course={item.course} />
              <Button 
                variant="destructive" 
                size="icon" 
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                onClick={() => handleRemoveFromWishlist(item.course.id)}
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
