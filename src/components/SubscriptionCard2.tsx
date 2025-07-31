import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, Users, ShieldCheck, ShoppingCart } from 'lucide-react';
import type { Subscription } from '@/lib/types';
import { useCart, useWishlist } from '@/components/AppProviders';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { StarRating } from './ui/StarRating';


interface SubscriptionCardProps {
  subscription: Subscription;
  isMobile?: boolean;
}

export function SubscriptionCard({ subscription, isMobile = false }: SubscriptionCardProps) {
  const { addToCart, cartItems } = useCart();
  const { toast } = useToast();

  const isInCart = cartItems.some(item => item.type === 'subscription' && item.item.id === subscription.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(subscription, 'subscription');
    toast({
      title: "Added to Cart!",
      description: `"${subscription.title}" has been added to your cart.`,
    });
  };

  const href = subscription.url ? subscription.url : `/subscriptions/${subscription.id}`;
  const isExternalLink = href.startsWith('http');
  
  const imageHint = `${subscription.category} subscription content`;
  const providerNameInitial = subscription.providerInfo?.name
    ? subscription.providerInfo.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : "P";

  const CardLink = ({ children }: { children: React.ReactNode }) => {
    if (isExternalLink) {
        return <a href={href} target="_blank" rel="noopener noreferrer" className="block group">{children}</a>
    }
    return <Link href={href} className="block group">{children}</Link>;
  };

  return (
    <Card className={`flex flex-col h-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border hover:border-primary/50 ${isMobile ? 'text-sm min-w-[160px] max-w-[160px] flex-shrink-0' : ''}`}>
      <CardLink>
        <CardHeader className="p-0 relative">
          <Image
            src={subscription.imageUrl || "https://placehold.co/600x600.png"}
            alt={subscription.title}
            width={600}
            height={600}
            className={`object-cover w-full group-hover:opacity-90 transition-opacity aspect-square`}
            data-ai-hint={imageHint}
          />
        </CardHeader>
      </CardLink>
      <CardContent className={`${isMobile ? 'p-2' : 'p-4'} flex-grow`}>
        <CardLink>
          <Badge variant="outline" className={`mb-2 text-xs ${isMobile ? 'mb-1' : ''}`}>{subscription.category}</Badge>
          <CardTitle className={`${isMobile ? 'text-xs' : 'text-lg'} font-semibold leading-tight mb-1 line-clamp-2 font-headline hover:text-primary transition-colors`}>
            {subscription.title}
          </CardTitle>
        </CardLink>
        <div className={`flex items-center gap-2 text-muted-foreground mb-2 ${isMobile ? 'text-xs gap-1' : 'text-xs'}`}>
          {subscription.providerInfo?.logoUrl && (
            <Avatar className={`${isMobile ? 'h-3 w-3' : 'h-5 w-5'} border`}>
              <AvatarImage src={subscription.providerInfo.logoUrl} alt={subscription.providerInfo.name} data-ai-hint="seller logo small subscription card" />
              <AvatarFallback className="text-xs">{providerNameInitial}</AvatarFallback>
            </Avatar>
          )}
          <span className={`${isMobile ? 'text-xs truncate' : ''}`}>By {subscription.providerInfo?.name || 'Unknown Provider'}</span>
        </div>
      </CardContent>
      <CardFooter className={`${isMobile ? 'p-2' : 'p-4'} flex items-center justify-between border-t mt-auto`}>
        <div>
          <p className={`${isMobile ? 'text-sm' : 'text-xl'} font-bold text-primary`}>
            ₹{subscription.price.toLocaleString('en-IN')}
          </p>
          {subscription.originalPrice && (
            <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground line-through`}>
              ₹{subscription.originalPrice.toLocaleString('en-IN')}
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