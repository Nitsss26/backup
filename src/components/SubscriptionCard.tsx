
// import Image from 'next/image';
// import Link from 'next/link';
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Clock, Users, ShieldCheck } from 'lucide-react';

// interface Subscription {
//   id: string;
//   title: string;
//   imageUrl?: string;
//   providerInfo?: {
//     name: string;
//     logoUrl?: string;
//     verified?: boolean;
//   };
//   category: string;
//   price: number;
//   originalPrice?: number;
//   duration?: string;
//   subscribersCount?: number;
//   url: string;
//   dataAiHint?: string;
// }

// interface SubscriptionCardProps {
//   subscription: Subscription;
// }

// export function SubscriptionCard({ subscription }: SubscriptionCardProps) {
//   const imageHint = subscription.dataAiHint || `${subscription.category} subscription content`;
//   const providerNameInitial = subscription.providerInfo?.name
//     ? subscription.providerInfo.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
//     : "P";

//   return (
//     <Card className="flex flex-col h-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border hover:border-primary/50 bg-card">
//       <a href={subscription.url} target="_blank" rel="noopener noreferrer" className="block group">
//         <CardHeader className="p-0 relative aspect-video">
//           <Image
//             src={subscription.imageUrl || "https://placehold.co/600x400.png"}
//             alt={subscription.title}
//             fill
//             sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
//             className="object-cover group-hover:opacity-90 transition-opacity"
//             data-ai-hint={imageHint}
//           />
//         </CardHeader>
//       </a>
//       <CardContent className="p-3 sm:p-4 flex-grow flex flex-col">
//         <a href={subscription.url} target="_blank" rel="noopener noreferrer" className="block mb-auto">
//           <Badge variant="outline" className="mb-1 text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2">{subscription.category}</Badge>
//           <CardTitle className="text-sm sm:text-base font-semibold leading-snug mb-1 line-clamp-2 font-headline hover:text-primary transition-colors">
//             {subscription.title}
//           </CardTitle>
//         </a>
//         <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-muted-foreground mb-1.5">
//           {subscription.providerInfo?.logoUrl && (
//             <Avatar className="h-4 w-4 border">
//               <AvatarImage src={subscription.providerInfo.logoUrl} alt={subscription.providerInfo.name} data-ai-hint="seller logo small subscription card"/>
//               <AvatarFallback className="text-[8px]">{providerNameInitial}</AvatarFallback>
//             </Avatar>
//           )}
//           <span>By {subscription.providerInfo?.name || 'Unknown Provider'}</span>
//         </div>
//         <div className="text-[10px] sm:text-xs text-muted-foreground space-y-0.5 mt-auto">
//           {subscription.duration && (
//             <div className="flex items-center gap-1">
//               <Clock className="h-3 w-3 text-primary/80" />
//               <span>{subscription.duration}</span>
//             </div>
//           )}
//           {subscription.subscribersCount && (
//             <div className="flex items-center gap-1">
//               <Users className="h-3 w-3 text-primary/80" />
//               <span>{subscription.subscribersCount.toLocaleString()} subscribers</span>
//             </div>
//           )}
//         </div>
//       </CardContent>
//       <CardFooter className="p-2.5 sm:p-3 flex items-center justify-between border-t">
//         <div>
//           <p className="text-base sm:text-lg font-bold text-primary">
//             ₹{subscription.price.toLocaleString('en-IN')}
//           </p>
//           {subscription.originalPrice && (
//             <p className="text-[10px] sm:text-xs text-muted-foreground line-through">
//               ₹{subscription.originalPrice.toLocaleString('en-IN')}
//             </p>
//           )}
//         </div>
//         <Button size="xs" asChild className="text-[10px] sm:text-xs px-2 py-1 h-auto sm:px-3 sm:py-1.5">
//           <a className="text-white" href={subscription.url} target="_blank" rel="noopener noreferrer">View Details</a>
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }

"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, Users, ShieldCheck } from 'lucide-react';

interface Subscription {
  id: string;
  title: string;
  imageUrl?: string;
  providerInfo?: {
    name: string;
    logoUrl?: string;
    verified?: boolean;
  };
  category: string;
  price: number;
  originalPrice?: number;
  duration?: string;
  subscribersCount?: number;
  url: string;
}

interface SubscriptionCardProps {
  subscription: Subscription;
}

export function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  const categorySlug = subscription.category;
  const imageHint = `${categorySlug} subscription content`;
  const providerNameInitial = subscription.providerInfo?.name
    ? subscription.providerInfo.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : "P";

  return (
    <Card className="flex flex-col h-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border hover:border-primary/50 w-48 sm:w-56 md:w-64">
      <a href={subscription.url} className="block group">
        <CardHeader className="p-0 relative">
          <Image
            src={subscription.imageUrl || "https://placehold.co/600x400.png"}
            alt={subscription.title}
            width={600}
            height={400}
            className="object-cover w-full h-24 sm:h-32 md:h-48 group-hover:opacity-90 transition-opacity"
            data-ai-hint={imageHint}
          />
        </CardHeader>
      </a>
      <CardContent className="p-2 sm:p-4 flex-grow">
        <a href={subscription.url} className="block">
          <Badge variant="outline" className="mb-1 sm:mb-2 text-xs">{subscription.category}</Badge>
          <CardTitle className="text-sm sm:text-lg font-semibold leading-tight mb-1 sm:mb-1 line-clamp-2 font-headline hover:text-primary transition-colors">
            {subscription.title}
          </CardTitle>
        </a>
        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-xs text-muted-foreground mb-1 sm:mb-2">
          {subscription.providerInfo?.logoUrl && (
            <Avatar className="h-4 sm:h-5 w-4 sm:w-5 border">
              <AvatarImage src={subscription.providerInfo.logoUrl} alt={subscription.providerInfo.name} data-ai-hint="seller logo small subscription card" />
              <AvatarFallback className="text-xs">{providerNameInitial}</AvatarFallback>
            </Avatar>
          )}
          <span>By {subscription.providerInfo?.name || 'Unknown Provider'}</span>
        </div>
        <div className="text-xs sm:text-sm text-muted-foreground space-y-0.5 sm:space-y-1.5">
          {subscription.duration && (
            <div className="flex items-center gap-1 sm:gap-1.5">
              <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary/80" />
              <span>{subscription.duration}</span>
            </div>
          )}
          {subscription.subscribersCount && (
            <div className="flex items-center gap-1 sm:gap-1.5">
              <Users className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary/80" />
              <span>{subscription.subscribersCount.toLocaleString()} subscribers</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-2 sm:p-4 flex items-center justify-between border-t mt-auto">
        <div>
          <p className="text-base sm:text-xl font-bold text-primary">
            ₹{subscription.price.toLocaleString('en-IN')}
          </p>
          {subscription.originalPrice && (
            <p className="text-xs sm:text-sm text-muted-foreground line-through">
              ₹{subscription.originalPrice.toLocaleString('en-IN')}
            </p>
          )}
        </div>
        <Button size="sm">
          <a className="text-white" href={subscription.url}>View Details</a>
        </Button>
      </CardFooter>
    </Card>
  );
}