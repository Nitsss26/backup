
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
    // Ensure whatsappNumber exists and is a valid string of digits
    const whatsappNumber = book.seller?.whatsappNumber?.replace(/\D/g, '');
    if (!whatsappNumber) {
        toast({ title: "Error", description: "Seller's WhatsApp number is not available.", variant: "destructive" });
        return;
    }
    const message = encodeURIComponent(`Hi ${book.seller.name}, I'm interested in your book "${book.title}" listed on EdTechCart. Is it still available?`);
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=${whatsappNumber}&text=${message}&type=phone_number&app_absent=0`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border hover:border-primary/50 bg-card group">
      <div className="relative">
        <Image
          src={book.imageUrl}
          alt={book.title}
          width={400}
          height={500}
          className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {distance !== null && distance !== undefined && (
             <Badge variant="secondary" className="absolute top-2 left-2 flex items-center bg-black/50 text-white border-none">
                <MapPin className="h-3 w-3 mr-1" /> {distance.toFixed(1)} km
            </Badge>
        )}
       
        <Button size="icon" variant="ghost" className="absolute top-2 right-2 bg-black/30 hover:bg-black/50 h-8 w-8 rounded-full" onClick={handleWishlistToggle}>
          <Heart className={cn("h-4 w-4 text-white", isBookInWishlist && "fill-red-500 text-red-500")} />
        </Button>
      </div>
      <CardContent className="p-4 flex-grow flex flex-col">
        <Badge className="mb-2 w-fit text-white" variant={book.listingType === 'sell' ? 'default' : 'secondary'}>
          {book.listingType === 'sell' ? 'For Sale' : 'For Rent'}
        </Badge>
        <h3 className="text-md font-bold leading-tight line-clamp-2 flex-grow text-foreground">{book.title}</h3>
        {book.author && <p className="text-sm text-muted-foreground mt-1">by {book.author}</p>}
         <p className="text-xs text-muted-foreground mt-1 capitalize">{book.subcategory}</p>
        
        <div className="mt-3 pt-3 border-t flex items-center justify-between">
            <p className="text-xl font-bold text-primary">
                {book.listingType === 'sell' ? `₹${book.price}` : `₹${book.rentPricePerMonth}/mo`}
            </p>
            <Button size="sm" onClick={handleContactSeller} className="h-9 px-3 text-xs">
                <MessageSquare className="mr-1.5 h-4 w-4" />
                Contact Seller
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
