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
// }

// interface SubscriptionCardProps {
//   subscription: Subscription;
// }

// export function SubscriptionCard({ subscription }: SubscriptionCardProps) {
//   const categorySlug = subscription.category;
//   const imageHint = `${categorySlug} subscription content`;
//   const providerNameInitial = subscription.providerInfo?.name
//     ? subscription.providerInfo.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
//     : "P";

//   return (
//     <Card className="flex flex-col h-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border hover:border-primary/50">
//       <a href={subscription.url} className="block group">
//         <CardHeader className="p-0 relative">
//           <Image
//             src={subscription.imageUrl || "https://placehold.co/600x400.png"}
//             alt={subscription.title}
//             width={600}
//             height={400}
//             className="object-cover w-full h-48 group-hover:opacity-90 transition-opacity"
//             data-ai-hint={imageHint}
//           />
//           {/* {subscription.providerInfo?.verified && (
//             <Badge
//               variant="success"
//               className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 text-xs font-semibold tracking-wide text-white bg-green-600 border border-green-700 rounded-full shadow-md hover:bg-green-700 hover:shadow-lg transition-all duration-200 ease-in-out"
//               aria-label="Verified Provider"
//               title="This provider has been verified for authenticity and quality"
//             >
//               <ShieldCheck className="h-3.5 w-3.5" />
//               Verified
//             </Badge>
//           )} */}
//         </CardHeader>
//       </a>
//       <CardContent className="p-4 flex-grow">
//         <a href={subscription.url} className="block">
//           <Badge variant="outline" className="mb-2 text-xs">{subscription.category}</Badge>
//           <CardTitle className="text-lg font-semibold leading-tight mb-1 line-clamp-2 font-headline hover:text-primary transition-colors">
//             {subscription.title}
//           </CardTitle>
//         </a>
//         <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
//           {subscription.providerInfo?.logoUrl && (
//             <Avatar className="h-5 w-5 border">
//               <AvatarImage src={subscription.providerInfo.logoUrl} alt={subscription.providerInfo.name} data-ai-hint="seller logo small subscription card" />
//               <AvatarFallback className="text-xs">{providerNameInitial}</AvatarFallback>
//             </Avatar>
//           )}
//           <span>By {subscription.providerInfo?.name || 'Unknown Provider'}</span>
//         </div>
//         <div className="text-sm text-muted-foreground space-y-1.5">
//           {subscription.duration && (
//             <div className="flex items-center gap-1.5">
//               <Clock className="h-3.5 w-3.5 text-primary/80" />
//               <span>{subscription.duration}</span>
//             </div>
//           )}
//           {subscription.subscribersCount && (
//             <div className="flex items-center gap-1.5">
//               <Users className="h-3.5 w-3.5 text-primary/80" />
//               <span>{subscription.subscribersCount.toLocaleString()} subscribers</span>
//             </div>
//           )}
//         </div>
//       </CardContent>
//       <CardFooter className="p-4 flex items-center justify-between border-t mt-auto">
//         <div>
//           <p className="text-xl font-bold text-primary">
//             ₹{subscription.price.toLocaleString('en-IN')}
//           </p>
//           {subscription.originalPrice && (
//             <p className="text-sm text-muted-foreground line-through">
//               ₹{subscription.originalPrice.toLocaleString('en-IN')}
//             </p>
//           )}
//         </div>
//         <Button size="sm">
//           <a className="text-white" href={subscription.url}>View Details</a>
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }


import React from 'react';
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
  dataAiHint?: string;
}

interface SubscriptionCardProps {
  subscription: Subscription;
  isMobile?: boolean;
}

export function SubscriptionCard({ subscription, isMobile = false }: SubscriptionCardProps) {
  const categorySlug = subscription.category;
  const imageHint = `${categorySlug} subscription content`;
  const providerNameInitial = subscription.providerInfo?.name
    ? subscription.providerInfo.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : "P";

  return (
    <Card className={`flex flex-col h-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border hover:border-primary/50 ${isMobile ? 'text-sm min-w-[160px] max-w-[160px] flex-shrink-0' : ''}`}>
      <a href={subscription.url} className="block group">
        <CardHeader className="p-0 relative">
          <Image
            src={subscription.imageUrl || "https://placehold.co/600x400.png"}
            alt={subscription.title}
            width={600}
            height={400}
            className={`object-cover w-full group-hover:opacity-90 transition-opacity ${isMobile ? 'h-24' : 'h-48'}`}
            data-ai-hint={imageHint}
          />
        </CardHeader>
      </a>
      <CardContent className={`${isMobile ? 'p-2' : 'p-4'} flex-grow`}>
        <a href={subscription.url} className="block">
          <Badge variant="outline" className={`mb-2 text-xs ${isMobile ? 'mb-1' : ''}`}>{subscription.category}</Badge>
          <CardTitle className={`${isMobile ? 'text-xs' : 'text-lg'} font-semibold leading-tight mb-1 line-clamp-2 font-headline hover:text-primary transition-colors`}>
            {subscription.title}
          </CardTitle>
        </a>
        <div className={`flex items-center gap-2 text-muted-foreground mb-2 ${isMobile ? 'text-xs gap-1' : 'text-xs'}`}>
          {subscription.providerInfo?.logoUrl && (
            <Avatar className={`${isMobile ? 'h-3 w-3' : 'h-5 w-5'} border`}>
              <AvatarImage src={subscription.providerInfo.logoUrl} alt={subscription.providerInfo.name} data-ai-hint="seller logo small subscription card" />
              <AvatarFallback className="text-xs">{providerNameInitial}</AvatarFallback>
            </Avatar>
          )}
          <span className={`${isMobile ? 'text-xs truncate' : ''}`}>By {subscription.providerInfo?.name || 'Unknown Provider'}</span>
        </div>
        {!isMobile && (
          <div className="text-sm text-muted-foreground space-y-1.5">
            {subscription.duration && (
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-primary/80" />
                <span>{subscription.duration}</span>
              </div>
            )}
            {subscription.subscribersCount && (
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-primary/80" />
                <span>{subscription.subscribersCount.toLocaleString()} subscribers</span>
              </div>
            )}
          </div>
        )}
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
        <Button size="sm" className={`${isMobile ? 'text-xs px-2 py-1' : ''}`}>
          <a className="text-white" href={subscription.url}>
            {isMobile ? 'View' : 'View Details'}
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}