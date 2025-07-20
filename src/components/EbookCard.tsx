
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/ui/StarRating';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Eye, ShoppingCart } from 'lucide-react';
import type { EBook } from '@/lib/types';
import { useCart, useWishlist } from '@/components/AppProviders';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface EbookCardProps {
  ebook: EBook;
  isMobile?: boolean;
}

export function EbookCard({ ebook, isMobile = false }: EbookCardProps) {
  const { addToCart, cartItems } = useCart();
  const { toast } = useToast();

  const isInCart = cartItems.some(item => item.type === 'ebook' && item.item.id === ebook.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(ebook, 'ebook');
    toast({
      title: "Added to Cart!",
      description: `"${ebook.title}" has been added to your cart.`,
    });
  };

  const href = `/ebooks/${ebook.id}`;
  const imageHint = `${ebook.category} ebook content`;
  const providerNameInitial = ebook.providerInfo?.name
    ? ebook.providerInfo.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : "A";

  return (
    <Card className={`flex flex-col h-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border hover:border-primary/50 ${isMobile ? 'text-sm min-w-[160px] max-w-[160px] flex-shrink-0' : ''}`}>
      <Link href={href} className="block group">
        <CardHeader className="p-0 relative">
          <Image
            src={ebook.imageUrl || "https://placehold.co/600x800.png"}
            alt={ebook.title}
            width={600}
            height={800}
            className={`object-cover w-full bg-white group-hover:opacity-90 transition-opacity ${isMobile ? 'h-40' : 'h-72'} aspect-[3/4]`}
            data-ai-hint={imageHint}
          />
        </CardHeader>
      </Link>
      <CardContent className={`${isMobile ? 'p-2' : 'p-4'} flex-grow`}>
        <Link href={href} className="block">
          <Badge variant="outline" className={`mb-2 text-xs ${isMobile ? 'mb-1' : ''}`}>{ebook.category}</Badge>
          <CardTitle className={`${isMobile ? 'text-xs' : 'text-lg'} font-semibold leading-tight mb-1 line-clamp-2 font-headline hover:text-primary transition-colors`}>
            {ebook.title}
          </CardTitle>
        </Link>
        <div className={`flex items-center gap-2 text-muted-foreground mb-2 ${isMobile ? 'text-xs gap-1' : 'text-xs'}`}>
          <span>By {ebook.author}</span>
        </div>
        <div className="flex items-center mb-1">
          <StarRating rating={ebook.rating} size={isMobile ? 10 : 16} />
          <span className={`ml-1 text-muted-foreground ${isMobile ? 'text-xs' : 'text-xs'}`}>
            ({ebook.reviewsCount})
          </span>
        </div>
      </CardContent>
      <CardFooter className={`${isMobile ? 'p-2' : 'p-4'} flex items-center justify-between border-t mt-auto`}>
        <div>
          <p className={`${isMobile ? 'text-sm' : 'text-xl'} font-bold text-primary`}>
            ₹{ebook.price.toLocaleString('en-IN')}
          </p>
          {ebook.originalPrice && (
            <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground line-through`}>
              ₹{ebook.originalPrice.toLocaleString('en-IN')}
            </p>
          )}
        </div>
        <Button 
            size="sm" 
            onClick={handleAddToCart}
            disabled={isInCart}
            className={cn(isMobile ? 'text-xs px-2 py-1' : '', isInCart ? 'bg-green-600 hover:bg-green-700' : '')}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isInCart ? 'Added' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
}
