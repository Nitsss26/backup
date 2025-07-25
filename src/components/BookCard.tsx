
// "use client";

// import Image from 'next/image';
// import type { Book } from '@/lib/types';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Heart, MessageSquare, MapPin } from 'lucide-react';
// import { useWishlist } from '@/components/AppProviders';
// import { cn } from '@/lib/utils';
// import { useToast } from '@/hooks/use-toast';
// import { APP_NAME } from '@/lib/constants';

// interface BookCardProps {
//   book: Book;
//   distance?: number | null;
// }

// export function BookCard({ book, distance }: BookCardProps) {
//   const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
//   const { toast } = useToast();

//   const isBookInWishlist = wishlistItems.some(item => item.type === 'book' && item.item.id === book._id);

//   const handleWishlistToggle = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (isBookInWishlist) {
//       removeFromWishlist(book._id, 'book');
//       toast({ title: "Removed from Wishlist", description: `"${book.title}" has been removed.` });
//     } else {
//       addToWishlist(book, 'book');
//       toast({ title: "Added to Wishlist", description: `"${book.title}" has been added.` });
//     }
//   };
  
//   const handleContactSeller = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const sellerWhatsapp = book.whatsappNumber;
//     if (!sellerWhatsapp) {
//         toast({ title: "Error", description: "Seller's WhatsApp number is not available for this listing.", variant: "destructive" });
//         return;
//     }
//     const whatsappNumber = sellerWhatsapp.replace(/\D/g, '').slice(-10);
//     const sellerName = book.seller?.name || 'Seller';
//     const message = encodeURIComponent(`Hi ${sellerName}, I'm interested in your book "${book.title}" listed on ${APP_NAME}. Is it still available?`);
//     const whatsappUrl = `https://api.whatsapp.com/send/?phone=91${whatsappNumber}&text=${message}&type=phone_number&app_absent=0`;
//     window.open(whatsappUrl, '_blank');
//   };
  
//   const formatDistance = (dist: number): string => {
//     if (dist < 1) {
//         return `${Math.round(dist * 1000)}m away`;
//     }
//     return `${dist.toFixed(1)}km away`;
//   }

//   const formatPrice = (price: number | undefined, listingType: 'sell' | 'rent'): string => {
//     if (listingType === 'sell') {
//       return `₹${price?.toLocaleString() || '0'}`;
//     }
//     return `₹${price?.toLocaleString() || '0'}/month`;
//   };

//   return (
//     <Card className="w-full overflow-hidden bg-card border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group">
//       <div className="relative w-full aspect-[3/4] overflow-hidden">
//         <Image
//           src={book.imageUrl}
//           alt={book.title}
//           fill
//           sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
//           className="object-cover transition-transform duration-300 group-hover:scale-105"
//         />
        
//         <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
//         {distance !== null && distance !== undefined && (
//           <Badge className="absolute top-2 left-2 bg-black/70 text-white border-0 backdrop-blur-sm text-xs font-medium">
//             <MapPin className="w-3 h-3 mr-1" />
//             {formatDistance(distance)}
//           </Badge>
//         )}
        
//         <Button
//           size="icon"
//           variant="ghost"
//           onClick={handleWishlistToggle}
//           className="absolute top-2 right-2 w-8 h-8 bg-black/70 hover:bg-black/80 rounded-full border-0"
//         >
//           <Heart className={cn("w-4 h-4 text-white transition-colors", isBookInWishlist && "fill-red-500 text-red-500")} />
//         </Button>
//       </div>

//       <CardContent className="p-3 flex flex-col justify-between h-auto">
//         <div className="flex items-center justify-between mb-2">
//           <span className="text-xs text-muted-foreground capitalize font-medium truncate w-1/2">
//             {book.subcategory}
//           </span>
//           <Badge 
//             className="text-white text-xs px-2 py-0.5 font-semibold flex-shrink-0"
//             style={{ 
//               backgroundColor: book.listingType === 'sell' ? '#2563eb' : '#7c3aed'
//             }}
//           >
//             {book.listingType === 'sell' ? 'SALE' : 'RENT'}
//           </Badge>
//         </div>

//         <h3 className="font-bold text-sm leading-tight line-clamp-2 text-foreground mb-2 h-10">
//           {book.title}
//         </h3>

//         {book.author && (
//           <p className="text-xs text-muted-foreground truncate mb-2">
//             by {book.author}
//           </p>
//         )}

//         <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
//           <p className="font-bold text-primary text-base">
//             {formatPrice(book.listingType === 'sell' ? book.price : book.rentPricePerMonth, book.listingType)}
//           </p>
//           <Button
//             size="sm"
//             onClick={handleContactSeller}
//             className="ml-2 h-8 px-3 text-xs font-medium flex-shrink-0"
//           >
//             <MessageSquare className="w-3 h-3 mr-1.5" />
//             <span className="hidden sm:inline">Contact</span>
//             <span className="sm:hidden">Chat</span>
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

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
  };

  // Format price to show "month" instead of "mo" for rent
  const formatPrice = (price: number | undefined, listingType: 'sell' | 'rent'): string => {
    if (listingType === 'sell') {
      return `₹${price?.toLocaleString() || '0'}`;
    }
    return `₹${price?.toLocaleString() || '0'}/month`;
  };

  return (
    <Card className="w-full overflow-hidden bg-card border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group">
      {/* Image Section with proper aspect ratio */}
      <div className="relative w-full h-40 sm:h-48 lg:h-64 overflow-hidden">
        <Image
          src={book.imageUrl}
          alt={book.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        {/* Distance badge */}
        {distance !== null && distance !== undefined && (
          <Badge className="absolute top-2 left-2 bg-black/70 text-white border-0 backdrop-blur-sm text-xs font-medium">
            <MapPin className="w-3 h-3 mr-1" />
            {formatDistance(distance)}
          </Badge>
        )}
        
        {/* Wishlist button */}
        <Button
          size="icon"
          variant="ghost"
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 w-8 h-8 bg-black/70 hover:bg-black/80 rounded-full border-0"
        >
          <Heart className={cn("w-4 h-4 text-white transition-colors", isBookInWishlist && "fill-red-500 text-red-500")} />
        </Button>
      </div>

      {/* Content Section */}
      <CardContent className="p-3 flex flex-col justify-between h-auto min-h-[180px]">
        {/* Category and Listing Type */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground capitalize font-medium truncate w-1/2">
            {book.subcategory}
          </span>
          <Badge 
            className="text-white text-xs px-2 py-0.5 font-semibold flex-shrink-0"
            style={{ 
              backgroundColor: book.listingType === 'sell' ? '#2563eb' : '#7c3aed'
            }}
          >
            {book.listingType === 'sell' ? 'SALE' : 'RENT'}
          </Badge>
        </div>

        {/* Book Title */}
        <h3 className="font-bold text-xs sm:text-sm leading-tight line-clamp-3 text-foreground mb-2">
          {book.title}
        </h3>

        {/* Author */}
        {book.author && (
          <p className="text-xs text-muted-foreground truncate mb-2">
            by {book.author}
          </p>
        )}

        {/* Price and Contact Section */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
          <p className="font-bold text-primary text-xs md:sm">
            {formatPrice(book.listingType === 'sell' ? book.price : book.rentPricePerMonth, book.listingType)}
          </p>
          <Button
            size="sm"
            onClick={handleContactSeller}
            className="ml-2 h-8 px-3 text-xs font-medium flex-shrink-0"
          >
            <MessageSquare className="w-3 h-3 mr-1.5" />
            <span className="hidden sm:inline">Contact</span>
            <span className="sm:hidden">Chat</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}