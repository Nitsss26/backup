
"use client";

import Image from 'next/image';
import type { Book } from '@/lib/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageSquare, MapPin } from 'lucide-react';
import { useWishlist } from '@/components/AppProviders';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface BookCardProps {
  book: Book;
  distance?: number | null;
}

export function BookCard({ book, distance }: BookCardProps) {
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const { toast } = useToast();

  const isBookInWishlist = wishlistItems.some(item => item.type === 'book' && item.item.id === book.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isBookInWishlist) {
      removeFromWishlist(book.id, 'book');
      toast({ title: "Removed from Wishlist", description: `"${book.title}" has been removed.` });
    } else {
      addToWishlist(book, 'book');
      toast({ title: "Added to Wishlist", description: `"${book.title}" has been added.` });
    }
  };
  
  const handleContactSeller = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const message = encodeURIComponent(`Hi ${book.seller.name}, I'm interested in your book "${book.title}" listed on EdTechCart. Is it still available?`);
    window.open(`https://wa.me/${book.seller.whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border hover:border-primary/50 bg-card">
      <div className="relative">
        <Image
          src={book.imageUrl}
          alt={book.title}
          width={400}
          height={500}
          className="object-cover w-full h-60"
        />
        <Badge className="absolute top-2 left-2" variant={book.listingType === 'sell' ? 'default' : 'secondary'}>
          {book.listingType === 'sell' ? 'For Sale' : 'For Rent'}
        </Badge>
        <Button size="icon" variant="ghost" className="absolute top-2 right-2 bg-black/30 hover:bg-black/50 h-8 w-8 rounded-full" onClick={handleWishlistToggle}>
          <Heart className={cn("h-4 w-4 text-white", isBookInWishlist && "fill-red-500 text-red-500")} />
        </Button>
      </div>
      <CardContent className="p-3 flex-grow">
        <p className="text-xs text-muted-foreground">{book.category} &gt; {book.subcategory}</p>
        <h3 className="text-sm font-semibold leading-tight line-clamp-2 mt-1">{book.title}</h3>
        {book.author && <p className="text-xs text-muted-foreground mt-1">by {book.author}</p>}
        {distance !== null && distance !== undefined && (
            <div className="flex items-center text-xs text-muted-foreground mt-2">
                <MapPin className="h-3 w-3 mr-1" />
                <span>Approx. {distance.toFixed(1)} km away</span>
            </div>
        )}
      </CardContent>
      <CardFooter className="p-3 border-t flex items-center justify-between">
        <div>
          <p className="text-base font-bold text-primary">
            {book.listingType === 'sell' ? `₹${book.price}` : `₹${book.rentPricePerMonth}/mo`}
          </p>
        </div>
        <Button size="sm" onClick={handleContactSeller}>
          <MessageSquare className="mr-2 h-4 w-4" />
          Contact Seller
        </Button>
      </CardFooter>
    </Card>
  );
}
