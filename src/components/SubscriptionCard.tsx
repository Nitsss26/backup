
// "use client";

// import React from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// import { Clock, Users, ShieldCheck, ShoppingCart } from 'lucide-react';
// import type { Subscription, AddOn } from '@/lib/types';
// import { useCart } from '@/components/AppProviders';
// import { useToast } from '@/hooks/use-toast';
// import { cn } from '@/lib/utils';
// import { StarRating } from './ui/StarRating';

// interface SubscriptionCardProps {
//   subscription: Subscription | AddOn;
//   isMobile?: boolean;
// }

// export function SubscriptionCard({ subscription, isMobile = false }: SubscriptionCardProps) {
//   const { addToCart, cartItems } = useCart();
//   const { toast } = useToast();

//   const isAddon = 'provider' in subscription;
//   const itemType = isAddon ? 'course' : 'subscription';

//   // Correctly determine the internal href for both types
//   const href = isAddon ? `/add-ons/${subscription.id}` : `/edusubscriptions/${subscription.id}`;

//   const isInCart = cartItems.some(item => item.type === itemType && item.item.id === subscription.id);

//   const handleAddToCart = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     addToCart(subscription as any, itemType);
//     toast({
//       title: "Added to Cart!",
//       description: `"${subscription.title}" has been added to your cart.`,
//     });
//   };

//   const imageHint = `${subscription.category} subscription content`;
//   const providerName = isAddon ? subscription.provider : subscription.providerInfo?.name;
//   const providerLogo = isAddon ? '' : subscription.providerInfo?.logoUrl;
//   const providerInitial = providerName ? providerName.charAt(0).toUpperCase() : '?';

//   return (
//     <Card className={`flex flex-col h-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border hover:border-primary/50 ${isMobile ? 'text-sm min-w-[160px] max-w-[160px] flex-shrink-0' : ''}`}>
//       <Link href={href} className="block group">
//         <CardHeader className="p-0 relative">
//           <Image
//             src={subscription.imageUrl || "https://placehold.co/600x600.png"}
//             alt={subscription.title}
//             width={600}
//             height={600}
//             className={cn(
//               "object-cover w-full bg-gray-700 group-hover:opacity-90 transition-opacity",
//               isMobile ? "aspect-square h-32" : "aspect-video h-48"
//             )}
//             data-ai-hint={imageHint}
//           />
//         </CardHeader>
//       </Link>
//       <CardContent className={`${isMobile ? 'p-2' : 'p-4'} flex-grow flex flex-col`}>
//         <Link href={href} className="block">
//           <Badge variant="outline" className={`mb-2 text-xs ${isMobile ? 'mb-1' : ''}`}>{subscription.category}</Badge>
//           <CardTitle className={`${isMobile ? 'text-xs' : 'text-lg'} font-semibold leading-tight mb-1 line-clamp-2 font-headline hover:text-primary transition-colors`}>
//             {subscription.title}
//           </CardTitle>
//         </Link>
//         <div className={`flex items-center gap-2 text-muted-foreground mt-auto pt-2 ${isMobile ? 'text-xs gap-1' : 'text-xs'}`}>
//           {providerLogo && (
//             <Avatar className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} border`}>
//               <AvatarImage src={providerLogo} alt={providerName} />
//               <AvatarFallback className="text-xs bg-gray-700 text-white">{providerInitial}</AvatarFallback>
//             </Avatar>
//           )}
//           <span>By {providerName}</span>
//         </div>
//       </CardContent>
//       <CardFooter className={`${isMobile ? 'p-2' : 'p-4'} flex items-center justify-between border-t`}>
//         <p className={`${isMobile ? 'text-sm' : 'text-xl'} font-bold text-primary`}>
//             ₹{subscription.price.toLocaleString('en-IN')}
//         </p>
//         <Button 
//             size="sm" 
//             onClick={handleAddToCart}
//             disabled={isInCart}
//             variant="outline"
//             className={cn(
//               isMobile ? 'text-xs px-2 py-1' : '',
//               "bg-gray-700 border-gray-600 hover:bg-gray-600",
//               isInCart ? 'bg-green-600 hover:bg-green-700 border-green-500' : ''
//             )}
//         >
//           <ShoppingCart className="mr-1.5 h-4 w-4" />
//           {isInCart ? 'Added' : (isMobile ? 'Add' : 'Add to Cart')}
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }



"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Clock, Users, ShieldCheck, ShoppingCart } from 'lucide-react';
import type { Subscription, AddOn } from '@/lib/types';
import { useCart } from '@/components/AppProviders';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { StarRating } from './ui/StarRating';

interface SubscriptionCardProps {
  subscription:  AddOn | Subscription;
  isMobile?: boolean;
}

export function SubscriptionCard({ subscription, isMobile = false }: SubscriptionCardProps) {
  const { addToCart, cartItems } = useCart();
  const { toast } = useToast();

  const isAddon = 'provider' in subscription;
  const itemType = isAddon ? 'course' : 'subscription';

  // Correctly determine the internal href for both types
  const href = isAddon ? `/add-ons/${subscription.id}` : `/edusubscriptions/${subscription.id}`;

  const isInCart = cartItems.some(item => item.type === itemType && item.item.id === subscription.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(subscription as any, itemType);
    toast({
      title: "Added to Cart!",
      description: `"${subscription.title}" has been added to your cart.`,
    });
  };

  const imageHint = `${subscription.category} subscription content`;
  const providerName = isAddon ? subscription.provider : subscription.providerInfo?.name;
  const providerLogo = isAddon ? '' : subscription.providerInfo?.logoUrl;
  const providerInitial = providerName ? providerName.charAt(0).toUpperCase() : '?';

  return (
    <Card className={`flex flex-col h-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border hover:border-primary/50 ${isMobile ? 'text-sm min-w-[160px] max-w-[160px] flex-shrink-0' : ''}`}>
      <Link href={href} className="block group">
        <CardHeader className="p-0 relative">
          <Image
            src={subscription.imageUrl || "https://placehold.co/600x600.png"}
            alt={subscription.title}
            width={600}
            height={600}
            className={cn(
              "object-cover w-full bg-gray-700 group-hover:opacity-90 transition-opacity",
              isMobile ? "aspect-square h-32" : "aspect-video h-48"
            )}
            data-ai-hint={imageHint}
          />
        </CardHeader>
      </Link>
      <CardContent className={`${isMobile ? 'p-2' : 'p-4'} flex-grow flex flex-col`}>
        <Link href={href} className="block">
          <Badge variant="outline" className={`mb-2 text-xs ${isMobile ? 'mb-1' : ''}`}>{subscription.category}</Badge>
          <CardTitle className={`${isMobile ? 'text-xs' : 'text-lg'} font-semibold leading-tight mb-1 line-clamp-2 font-headline hover:text-primary transition-colors`}>
            {subscription.title}
          </CardTitle>
        </Link>
        <div className={`flex items-center gap-2 text-muted-foreground mt-auto pt-2 ${isMobile ? 'text-xs gap-1' : 'text-xs'}`}>
          {providerLogo && (
            <Avatar className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} border`}>
              <AvatarImage src={providerLogo} alt={providerName} />
              <AvatarFallback className="text-xs bg-gray-700 text-white">{providerInitial}</AvatarFallback>
            </Avatar>
          )}
          <span>By {providerName}</span>
        </div>
      </CardContent>
      <CardFooter className={`${isMobile ? 'p-2' : 'p-4'} flex items-center justify-between border-t`}>
        <p className={`${isMobile ? 'text-sm' : 'text-xl'} font-bold text-primary`}>
          ₹{subscription.price.toLocaleString('en-IN')}
        </p>
        <Button
          size="sm"
          onClick={handleAddToCart}
          disabled={isInCart}
          variant="outline"
          className={cn(
            isMobile ? 'text-xs px-2 py-1' : '',
            "bg-primary border-gray-600 hover:bg-gray-600",
            isInCart ? 'bg-green-600 hover:bg-green-700 border-green-500' : ''
          )}
        >
          <ShoppingCart className="mr-1.5 h-4 w-4" />
          {isInCart ? 'Added' : (isMobile ? 'Add' : 'Add to Cart')}
        </Button>
      </CardFooter>
    </Card>
  );
}