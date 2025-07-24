
"use client";

import Image from 'next/image';
import type { Book } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageSquare, MapPin } from 'lucide-react';
import { useWishlist } from '@/components/AppProviders';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { APP_NAME } from '@/lib/constants';

interface BookCardProps {
  book: Book;
  distance?: number | null;
}

export function BookCard({ book, distance }: BookCardProps) {
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const { toast } = useToast();

  const isBookInWishlist = wishlistItems.some(item => item.type === 'book' && item.item.id === book._id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isBookInWishlist) {
      removeFromWishlist(book._id, 'book');
      toast({ title: "Removed from Wishlist", description: `"${book.title}" has been removed.` });
    } else {
      addToWishlist(book, 'book');
      toast({ title: "Added to Wishlist", description: `"${book.title}" has been added.` });
    }
  };
  
  const handleContactSeller = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const sellerWhatsapp = book.whatsappNumber;
    if (!sellerWhatsapp) {
        toast({ title: "Error", description: "Seller's WhatsApp number is not available for this listing.", variant: "destructive" });
        return;
    }
    const whatsappNumber = sellerWhatsapp.replace(/\D/g, '').slice(-10);
    const sellerName = book.seller?.name || 'Seller';
    const message = encodeURIComponent(`Hi ${sellerName}, I'm interested in your book "${book.title}" listed on ${APP_NAME}. Is it still available?`);
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=91${whatsappNumber}&text=${message}&type=phone_number&app_absent=0`;
    window.open(whatsappUrl, '_blank');
  };
  
  const formatDistance = (dist: number): string => {
    if (dist < 1) {
        return `${Math.round(dist * 1000)}m away`;
    }
    return `${dist.toFixed(1)}km away`;
  }

  return (
    <Card className="flex flex-col h-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border hover:border-primary/50 bg-card group">
      <div className="relative">
        <Image
          src={book.imageUrl}
          alt={book.title}
          width={300}
          height={425}
          className="object-cover w-full h-64 sm:h-72 transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        {distance !== null && distance !== undefined && (
             <Badge variant="secondary" className="absolute top-2 left-2 flex items-center bg-black/50 text-white border-none backdrop-blur-sm">
                <MapPin className="h-3 w-3 mr-1" /> {formatDistance(distance)}
            </Badge>
        )}
       
        <Button size="icon" variant="ghost" className="absolute top-2 right-2 bg-black/30 hover:bg-black/50 h-8 w-8 rounded-full" onClick={handleWishlistToggle}>
          <Heart className={cn("h-4 w-4 text-white", isBookInWishlist && "fill-red-500 text-red-500")} />
        </Button>
      </div>
      <CardContent className="p-3 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-1">
            <p className="text-xs text-muted-foreground capitalize">{book.subcategory}</p>
             <Badge className="text-white text-[10px] px-1.5 py-0.5" style={{ backgroundColor: book.listingType === 'sell' ? 'hsl(var(--primary))' : 'hsl(var(--accent))' }}>
              {book.listingType === 'sell' ? 'FOR SALE' : 'FOR RENT'}
            </Badge>
        </div>
        <h3 className="text-base font-bold leading-tight line-clamp-2 flex-grow text-foreground">{book.title}</h3>
        {book.author && <p className="text-xs text-muted-foreground mt-1">by {book.author}</p>}
        
        <div className="mt-3 pt-3 border-t flex items-center justify-between">
            <p className="text-lg font-bold text-primary">
                {book.listingType === 'sell' ? `₹${book.price}` : `₹${book.rentPricePerMonth}/month`}
            </p>
            <Button size="sm" onClick={handleContactSeller} className="h-8 px-3 text-xs">
                <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
                Contact Seller
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
