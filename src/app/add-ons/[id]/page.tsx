
// // "use client";

// // import Image from 'next/image';
// // import { Header } from '@/components/layout/Header';
// // import { Footer } from '@/components/layout/Footer';
// // import { Breadcrumbs } from '@/components/Breadcrumbs';
// // import { Button } from '@/components/ui/button';
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // import { StarRating } from '@/components/ui/StarRating';
// // import type { AddOn, Review as ReviewType } from '@/lib/types';
// // import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // import { Heart, ShoppingCart, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
// // import Link from 'next/link';
// // import { useEffect, useState } from 'react';
// // import { useParams } from 'next/navigation';
// // import { getAddOnById } from '@/lib/addons-placeholder-data';
// // import { useToast } from '@/hooks/use-toast';
// // import { useCart, useWishlist } from '@/components/AppProviders';
// // import { cn } from '@/lib/utils';
// // import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
// // import { Badge } from '@/components/ui/badge';
// // import { Label } from '@/components/ui/label';

// // function ReviewCard({ review }: { review: ReviewType }) {
// //   return (
// //     <Card className="mb-4 border shadow-sm bg-background">
// //       <CardHeader className="flex flex-row items-start gap-4 p-4">
// //         <Avatar className="h-10 w-10 border sm:h-11 sm:w-11">
// //           <AvatarImage src={review.userAvatar} alt={review.userName} data-ai-hint="user avatar review profile addon detail" />
// //           <AvatarFallback>{review.userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
// //         </Avatar>
// //         <div>
// //           <CardTitle className="text-base font-semibold text-foreground sm:text-lg">{review.userName}</CardTitle>
// //           <StarRating rating={review.rating} size={14} smSize={16} />
// //           <p className="text-xs text-muted-foreground mt-1">{new Date(review.createdAt).toLocaleDateString()}</p>
// //         </div>
// //       </CardHeader>
// //       <CardContent className="p-4 pt-0">
// //         <p className="text-sm text-foreground leading-relaxed">{review.comment}</p>
// //       </CardContent>
// //     </Card>
// //   );
// // }

// // export default function AddOnDetailPage() {
// //   const params = useParams();
// //   const addonId = params?.id as string;
// //   const { toast } = useToast();
// //   const { addToCart, cartItems } = useCart();
// //   const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();

// //   const [addon, setAddon] = useState<AddOn | null>(null);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);

// //   useEffect(() => {
// //     if (!addonId) {
// //       setError("Add-on ID is missing from URL.");
// //       setIsLoading(false);
// //       return;
// //     }
// //     const fetchedAddon = getAddOnById(addonId);
// //     if (fetchedAddon) {
// //       setAddon(fetchedAddon);
// //     } else {
// //       setError(`Add-on with ID ${addonId} not found.`);
// //     }
// //     setIsLoading(false);
// //   }, [addonId]);

// //   const isInCart = addon ? cartItems.some(item => item.item.id === addon.id) : false;
// //   const isInWishlist = addon ? wishlistItems.some(item => item.item.id === addon.id) : false;

// //   const handleAddToCart = () => {
// //     if (addon) {
// //       addToCart(addon as any, 'course');
// //       toast({
// //         title: "Added to Cart!",
// //         description: `"${addon.title}" has been added to your cart.`,
// //       });
// //     }
// //   };

// //   const handleWishlistToggle = () => {
// //     if (addon) {
// //       if (isInWishlist) {
// //         removeFromWishlist(addon.id, 'course');
// //         toast({
// //           title: "Removed from Wishlist",
// //           description: `"${addon.title}" has been removed from your wishlist.`,
// //         });
// //       } else {
// //         addToWishlist(addon as any, 'course');
// //         toast({
// //           title: "Added to Wishlist",
// //           description: `"${addon.title}" has been added to your wishlist.`,
// //         });
// //       }
// //     }
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="flex flex-col min-h-screen">
// //         <Header />
// //         <main className="container py-6 text-center flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] w-full">
// //           <Loader2 className="h-10 w-10 animate-spin text-primary mb-3 sm:h-12 sm:w-12" />
// //           <p className="text-base text-muted-foreground sm:text-lg">Loading Add-on details...</p>
// //         </main>
// //         <Footer />
// //       </div>
// //     );
// //   }

// //   if (error || !addon) {
// //     return (
// //       <div className="flex flex-col min-h-screen">
// //         <Header />
// //         <main className="container py-6 text-center w-full">
// //           <h1 className="text-xl font-bold text-destructive mb-3 sm:text-2xl">{error || "Add-on could not be loaded."}</h1>
// //           <Link href="/" className="text-primary hover:underline mt-3 inline-block text-sm sm:text-base">Back to Home</Link>
// //         </main>
// //         <Footer />
// //       </div>
// //     );
// //   }

// //   const breadcrumbItems = [
// //     { label: 'Home', href: '/' },
// //     { label: 'Add-ons', href: '#' }, // No general add-ons page yet
// //     { label: addon.title },
// //   ];

// //   return (
// //     <div className="flex flex-col min-h-screen w-full">
// //       <Header />
// //       <main className="flex-grow py-6 bg-slate-50 dark:bg-gray-900">
// //         <section className="container grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
// //           <div className="lg:col-span-2">
// //             <Breadcrumbs items={breadcrumbItems} />
// //             <h1 className="text-2xl font-bold font-headline text-foreground sm:text-3xl mt-4">{addon.title}</h1>
// //             <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground sm:text-base mt-2">
// //               <span>By {addon.provider}</span>
// //               <div className="flex items-center gap-1">
// //                 <StarRating rating={addon.rating} size={14} smSize={16} />
// //                 <span className="ml-1">({addon.reviewsCount} ratings & reviews)</span>
// //               </div>
// //             </div>

// //             {/* Mobile Image and Purchase Card */}
// //             <div className="lg:hidden mt-6">
// //                 <Card className="shadow-lg border">
// //                   <CardHeader className="p-0">
// //                     <div className="relative w-full overflow-hidden rounded-t-lg aspect-video max-h-80">
// //                       <Image src={addon.imageUrl} alt={addon.title} fill className="object-cover" data-ai-hint="product image mobile" />
// //                     </div>
// //                   </CardHeader>
// //                   <CardContent className="p-4 space-y-4">
// //                     <div className="flex items-baseline gap-2 flex-wrap">
// //                       <p className="text-2xl font-bold text-primary sm:text-3xl">₹{addon.price.toLocaleString('en-IN')}</p>
// //                       {addon.originalPrice && (
// //                         <p className="text-base text-muted-foreground line-through sm:text-lg">₹{addon.originalPrice.toLocaleString('en-IN')}</p>
// //                       )}
// //                       {addon.discount && (
// //                         <Badge variant="destructive" className="text-xs sm:text-sm">{addon.discount}</Badge>
// //                       )}
// //                     </div>
// //                     <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
// //                       <Button size="lg" className="w-full" onClick={handleAddToCart} disabled={isInCart}>
// //                         <ShoppingCart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> {isInCart ? "In Cart" : "Add to Cart"}
// //                       </Button>
// //                       <Button variant="outline" size="lg" className="w-full" onClick={handleWishlistToggle}>
// //                         <Heart className={cn("mr-2 h-4 w-4 sm:h-5 sm:w-5", isInWishlist && "fill-destructive text-destructive")} /> {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
// //                       </Button>
// //                     </div>
// //                     {addon.extraOptions && (
// //                       <div className="pt-2">
// //                         <Label className="text-sm font-medium">{addon.extraOptions.label}</Label>
// //                         <div className="flex flex-wrap gap-2 mt-2">
// //                           {addon.extraOptions.options.map(opt => <Button key={opt} variant="outline" size="sm" className="text-xs sm:text-sm">{opt}</Button>)}
// //                         </div>
// //                       </div>
// //                     )}
// //                   </CardContent>
// //                 </Card>
// //             </div>

// //             <Tabs defaultValue="description" className="w-full mt-6 sm:mt-8">
// //               <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-0">
// //                 <TabsTrigger value="description" className="text-xs sm:text-sm">Description</TabsTrigger>
// //                 {addon.benefits && <TabsTrigger value="benefits" className="text-xs sm:text-sm">Benefits</TabsTrigger>}
// //                 <TabsTrigger value="details" className="text-xs sm:text-sm">Product Details</TabsTrigger>
// //                 <TabsTrigger value="reviews" className="text-xs sm:text-sm">Reviews ({addon.reviews.length})</TabsTrigger>
// //                 <TabsTrigger value="faq" className="text-xs sm:text-sm">FAQ</TabsTrigger>
// //               </TabsList>
              
// //               <TabsContent value="description">
// //                 <Card className="shadow-md border-0 bg-transparent">
// //                   <CardHeader><CardTitle className="text-xl font-headline">About This Product</CardTitle></CardHeader>
// //                   <CardContent className="prose dark:prose-invert max-w-none text-base">
// //                     <p>{addon.description}</p>
// //                   </CardContent>
// //                 </Card>
// //               </TabsContent>

// //               {addon.benefits && (
// //                 <TabsContent value="benefits">
// //                   <Card className="shadow-md border-0 bg-transparent">
// //                     <CardHeader><CardTitle className="text-xl font-headline">What You'll Gain</CardTitle></CardHeader>
// //                     <CardContent className="grid md:grid-cols-2 gap-x-6 gap-y-4">
// //                         {addon.benefits.map((benefit, index) => (
// //                         <div key={index} className="flex items-start gap-3">
// //                             <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
// //                             <p className="text-sm leading-relaxed text-foreground">{benefit}</p>
// //                         </div>
// //                         ))}
// //                     </CardContent>
// //                   </Card>
// //                 </TabsContent>
// //               )}
              
// //               <TabsContent value="details">
// //                 <Card className="shadow-md border-0 bg-transparent">
// //                   <CardHeader><CardTitle className="text-xl font-headline">Product Details</CardTitle></CardHeader>
// //                   <CardContent>
// //                     <ul className="list-disc list-inside space-y-1 text-muted-foreground">
// //                       {addon.details.map((detail, i) => <li key={i}><strong>{detail.label}:</strong> {detail.value}</li>)}
// //                     </ul>
// //                   </CardContent>
// //                 </Card>
// //               </TabsContent>
              
// //               <TabsContent value="reviews">
// //                 <Card className="shadow-md border-0 bg-transparent">
// //                   <CardHeader><CardTitle className="text-xl font-headline">All Reviews</CardTitle></CardHeader>
// //                   <CardContent>
// //                     {addon.reviews.map(review => <ReviewCard key={review.id} review={review} />)}
// //                   </CardContent>
// //                 </Card>
// //               </TabsContent>
              
// //               <TabsContent value="faq">
// //                 <Card className="shadow-md border-0 bg-transparent">
// //                   <CardHeader><CardTitle className="text-xl font-headline">Policies & FAQs</CardTitle></CardHeader>
// //                   <CardContent>
// //                     <Accordion type="single" collapsible className="w-full">
// //                       {addon.faqs?.map((faq, index) => (
// //                         <AccordionItem value={`faq-${index}`} key={index}>
// //                           <AccordionTrigger className="text-sm sm:text-base">{faq.q}</AccordionTrigger>
// //                           <AccordionContent className="text-sm sm:text-base">{faq.a}</AccordionContent>
// //                         </AccordionItem>
// //                       )) || <p className="text-muted-foreground">No FAQs available.</p>}
// //                     </Accordion>
// //                   </CardContent>
// //                 </Card>
// //               </TabsContent>
// //             </Tabs>
// //           </div>

// //           <div className="hidden lg:block lg:col-span-1 sticky top-24">
// //             <Card className="shadow-lg border">
// //               <CardHeader className="p-0">
// //                 <div className="relative w-full overflow-hidden rounded-t-lg aspect-[3/4]">
// //                   <Image src={addon.imageUrl} alt={addon.title} fill className="object-cover" data-ai-hint="product image desktop" />
// //                 </div>
// //               </CardHeader>
// //               <CardContent className="p-4 space-y-4">
// //                 <div className="flex items-baseline gap-2 flex-wrap">
// //                   <p className="text-3xl font-bold text-primary">₹{addon.price.toLocaleString('en-IN')}</p>
// //                   {addon.originalPrice && (
// //                     <p className="text-lg text-muted-foreground line-through">₹{addon.originalPrice.toLocaleString('en-IN')}</p>
// //                   )}
// //                   {addon.discount && (
// //                     <Badge variant="destructive">{addon.discount}</Badge>
// //                   )}
// //                 </div>
// //                  {addon.extraOptions && (
// //                     <div className="pt-2">
// //                         <Label className="text-sm font-medium">{addon.extraOptions.label}</Label>
// //                         <div className="flex flex-wrap gap-2 mt-2">
// //                             {addon.extraOptions.options.map(opt => <Button key={opt} variant="outline" size="sm">{opt}</Button>)}
// //                         </div>
// //                     </div>
// //                 )}
// //                 <div className="grid grid-cols-2 gap-2">
// //                   <Button size="lg" className="w-full" onClick={handleAddToCart} disabled={isInCart}>
// //                     <ShoppingCart className="mr-2 h-5 w-5" /> {isInCart ? "In Cart" : "Add to Cart"}
// //                   </Button>
// //                   <Button variant="outline" size="lg" className="w-full" onClick={handleWishlistToggle}>
// //                     <Heart className={cn("mr-2 h-5 w-5", isInWishlist && "fill-destructive text-destructive")} /> {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
// //                   </Button>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </div>
// //         </section>
// //       </main>
// //       <Footer />
// //     </div>
// //   );
// // }


// "use client";

// import Image from 'next/image';
// import { Header } from '@/components/layout/Header';
// import { Footer } from '@/components/layout/Footer';
// import { Breadcrumbs } from '@/components/Breadcrumbs';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { StarRating } from '@/components/ui/StarRating';
// import type { AddOn, Review as ReviewType } from '@/lib/types';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Heart, ShoppingCart, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import { getAddOnById } from '@/lib/addons-placeholder-data';
// import { useToast } from '@/hooks/use-toast';
// import { useCart, useWishlist } from '@/components/AppProviders';
// import { cn } from '@/lib/utils';
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
// import { Badge } from '@/components/ui/badge';
// import { Label } from '@/components/ui/label';

// function ReviewCard({ review }: { review: ReviewType }) {
//   return (
//     <Card className="mb-4 border shadow-sm bg-background">
//       <CardHeader className="flex flex-row items-start gap-4 p-4">
//         <Avatar className="h-10 w-10 border sm:h-11 sm:w-11">
//           <AvatarImage src={review.userAvatar} alt={review.userName} data-ai-hint="user avatar review profile addon detail" />
//           <AvatarFallback>{review.userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
//         </Avatar>
//         <div>
//           <CardTitle className="text-base font-semibold text-foreground sm:text-lg">{review.userName}</CardTitle>
//           <StarRating rating={review.rating} size={14} smSize={16} />
//           <p className="text-xs text-muted-foreground mt-1">{new Date(review.createdAt).toLocaleDateString()}</p>
//         </div>
//       </CardHeader>
//       <CardContent className="p-4 pt-0">
//         <p className="text-sm text-foreground leading-relaxed">{review.comment}</p>
//       </CardContent>
//     </Card>
//   );
// }

// export default function AddOnDetailPage() {
//   const params = useParams();
//   const addonId = params?.id as string;
//   const { toast } = useToast();
//   const { addToCart, cartItems } = useCart();
//   const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();

//   const [addon, setAddon] = useState<AddOn | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!addonId) {
//       setError("Add-on ID is missing from URL.");
//       setIsLoading(false);
//       return;
//     }
//     const fetchedAddon = getAddOnById(addonId);
//     if (fetchedAddon) {
//       setAddon(fetchedAddon);
//     } else {
//       setError(`Add-on with ID ${addonId} not found.`);
//     }
//     setIsLoading(false);
//   }, [addonId]);

//   const isInCart = addon ? cartItems.some(item => item.item.id === addon.id) : false;
//   const isInWishlist = addon ? wishlistItems.some(item => item.item.id === addon.id) : false;

//   const handleAddToCart = () => {
//     if (addon) {
//       addToCart(addon as any, 'course');
//       toast({
//         title: "Added to Cart!",
//         description: `"${addon.title}" has been added to your cart.`,
//       });
//     }
//   };

//   const handleWishlistToggle = () => {
//     if (addon) {
//       if (isInWishlist) {
//         removeFromWishlist(addon.id, 'course');
//         toast({
//           title: "Removed from Wishlist",
//           description: `"${addon.title}" has been removed from your wishlist.`,
//         });
//       } else {
//         addToWishlist(addon as any, 'course');
//         toast({
//           title: "Added to Wishlist",
//           description: `"${addon.title}" has been added to your wishlist.`,
//         });
//       }
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex flex-col min-h-screen">
//         <Header />
//         <main className="container py-6 text-center flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] w-full">
//           <Loader2 className="h-10 w-10 animate-spin text-primary mb-3 sm:h-12 sm:w-12" />
//           <p className="text-base text-muted-foreground sm:text-lg">Loading Add-on details...</p>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   if (error || !addon) {
//     return (
//       <div className="flex flex-col min-h-screen">
//         <Header />
//         <main className="container py-6 text-center w-full">
//           <h1 className="text-xl font-bold text-destructive mb-3 sm:text-2xl">{error || "Add-on could not be loaded."}</h1>
//           <Link href="/" className="text-primary hover:underline mt-3 inline-block text-sm sm:text-base">Back to Home</Link>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   const breadcrumbItems = [
//     { label: 'Home', href: '/' },
//     { label: 'Add-ons', href: '#' }, // No general add-ons page yet
//     { label: addon.title },
//   ];

//   return (
//     <div className="flex flex-col min-h-screen w-full">
//       <Header />
//       <main className="flex-grow py-6 bg-slate-50 dark:bg-gray-900">
//         <section className="container grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
//           {/* Mobile View Structure (Unchanged) */}
//           <div className="lg:hidden">
//             <Breadcrumbs items={breadcrumbItems} />
//             <h1 className="text-2xl font-bold font-headline text-foreground sm:text-3xl mt-4">{addon.title}</h1>
//             <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground sm:text-base mt-2">
//               <span>By {addon.provider}</span>
//               <div className="flex items-center gap-1">
//                 <StarRating rating={addon.rating} size={14} smSize={16} />
//                 <span className="ml-1">({addon.reviewsCount} ratings & reviews)</span>
//               </div>
//             </div>
//             <Card className="shadow-lg border mt-6">
//               <CardHeader className="p-0">
//                 <div className="relative w-full overflow-hidden rounded-t-lg aspect-video max-h-80">
//                   <Image src={addon.imageUrl} alt={addon.title} fill className="object-cover" data-ai-hint="product image mobile" />
//                 </div>
//               </CardHeader>
//               <CardContent className="p-4 space-y-4">
//                 <div className="flex items-baseline gap-2 flex-wrap">
//                   <p className="text-2xl font-bold text-primary sm:text-3xl">₹{addon.price.toLocaleString('en-IN')}</p>
//                   {addon.originalPrice && (
//                     <p className="text-base text-muted-foreground line-through sm:text-lg">₹{addon.originalPrice.toLocaleString('en-IN')}</p>
//                   )}
//                   {addon.discount && (
//                     <Badge variant="destructive" className="text-xs sm:text-sm">{addon.discount}</Badge>
//                   )}
//                 </div>
//                 <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
//                   <Button size="lg" className="w-full" onClick={handleAddToCart} disabled={isInCart}>
//                     <ShoppingCart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> {isInCart ? "In Cart" : "Add to Cart"}
//                   </Button>
//                   <Button variant="outline" size="lg" className="w-full" onClick={handleWishlistToggle}>
//                     <Heart className={cn("mr-2 h-4 w-4 sm:h-5 sm:w-5", isInWishlist && "fill-destructive text-destructive")} /> {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
//                   </Button>
//                 </div>
//                 {addon.extraOptions && (
//                   <div className="pt-2">
//                     <Label className="text-sm font-medium">{addon.extraOptions.label}</Label>
//                     <div className="flex flex-wrap gap-2 mt-2">
//                       {addon.extraOptions.options.map(opt => <Button key={opt} variant="outline" size="sm" className="text-xs sm:text-sm">{opt}</Button>)}
//                     </div>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>

//           {/* Desktop View Structure */}
//           <div className="hidden lg:block lg:col-span-2">
//             <Breadcrumbs items={breadcrumbItems} />
//             <h1 className="text-2xl font-bold font-headline text-foreground sm:text-3xl mt-4">{addon.title}</h1>
//             <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground sm:text-base mt-2">
//               <span>By {addon.provider}</span>
//               <div className="flex items-center gap-1">
//                 <StarRating rating={addon.rating} size={14} smSize={16} />
//                 <span className="ml-1">({addon.reviewsCount} ratings & reviews)</span>
//               </div>
//             </div>

//             <Tabs defaultValue="description" className="w-full mt-6 sm:mt-8">
//               <TabsList className="flex flex-row space-x-2 sm:space-x-4 w-full overflow-x-auto">
//                 <TabsTrigger value="description" className="text-xs sm:text-sm flex-1">Description</TabsTrigger>
//                 {addon.benefits && <TabsTrigger value="benefits" className="text-xs sm:text-sm flex-1">Benefits</TabsTrigger>}
//                 <TabsTrigger value="details" className="text-xs sm:text-sm flex-1">Product Details</TabsTrigger>
//                 <TabsTrigger value="reviews" className="text-xs sm:text-sm flex-1">Reviews ({addon.reviews.length})</TabsTrigger>
//                 <TabsTrigger value="faq" className="text-xs sm:text-sm flex-1">FAQ</TabsTrigger>
//               </TabsList>

//               <TabsContent value="description">
//                 <Card className="shadow-md border-0 bg-transparent">
//                   <CardHeader><CardTitle className="text-xl font-headline">About This Product</CardTitle></CardHeader>
//                   <CardContent className="prose dark:prose-invert max-w-none text-base">
//                     <p>{addon.description}</p>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {addon.benefits && (
//                 <TabsContent value="benefits">
//                   <Card className="shadow-md border-0 bg-transparent">
//                     <CardHeader><CardTitle className="text-xl font-headline">What You'll Gain</CardTitle></CardHeader>
//                     <CardContent className="grid md:grid-cols-2 gap-x-6 gap-y-4">
//                       {addon.benefits.map((benefit, index) => (
//                         <div key={index} className="flex items-start gap-3">
//                           <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
//                           <p className="text-sm leading-relaxed text-foreground">{benefit}</p>
//                         </div>
//                       ))}
//                     </CardContent>
//                   </Card>
//                 </TabsContent>
//               )}

//               <TabsContent value="details">
//                 <Card className="shadow-md border-0 bg-transparent">
//                   <CardHeader><CardTitle className="text-xl font-headline">Product Details</CardTitle></CardHeader>
//                   <CardContent>
//                     <ul className="list-disc list-inside space-y-1 text-muted-foreground">
//                       {addon.details.map((detail, i) => <li key={i}><strong>{detail.label}:</strong> {detail.value}</li>)}
//                     </ul>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               <TabsContent value="reviews">
//                 <Card className="shadow-md border-0 bg-transparent">
//                   <CardHeader><CardTitle className="text-xl font-headline">All Reviews</CardTitle></CardHeader>
//                   <CardContent>
//                     {addon.reviews.map(review => <ReviewCard key={review.id} review={review} />)}
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               <TabsContent value="faq">
//                 <Card className="shadow-md border-0 bg-transparent">
//                   <CardHeader><CardTitle className="text-xl font-headline">Policies & FAQs</CardTitle></CardHeader>
//                   <CardContent>
//                     <Accordion type="single" collapsible className="w-full">
//                       {addon.faqs?.map((faq, index) => (
//                         <AccordionItem value={`faq-${index}`} key={index}>
//                           <AccordionTrigger className="text-sm sm:text-base">{faq.q}</AccordionTrigger>
//                           <AccordionContent className="text-sm sm:text-base">{faq.a}</AccordionContent>
//                         </AccordionItem>
//                       )) || <p className="text-muted-foreground">No FAQs available.</p>}
//                     </Accordion>
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//             </Tabs>
//           </div>

//           <div className="hidden lg:block lg:col-span-1 sticky top-24">
//             <Card className="shadow-lg border">
//               <CardHeader className="p-0">
//                 <div className="relative w-full overflow-hidden rounded-t-lg aspect-[4/3]">
//                   <Image src={addon.imageUrl} alt={addon.title} fill className="object-cover" data-ai-hint="product image desktop" />
//                 </div>
//               </CardHeader>
//               <CardContent className="p-4 space-y-4">
//                 <div className="flex items-baseline gap-2 flex-wrap">
//                   <p className="text-3xl font-bold text-primary">₹{addon.price.toLocaleString('en-IN')}</p>
//                   {addon.originalPrice && (
//                     <p className="text-lg text-muted-foreground line-through">₹{addon.originalPrice.toLocaleString('en-IN')}</p>
//                   )}
//                   {addon.discount && (
//                     <Badge variant="destructive">{addon.discount}</Badge>
//                   )}
//                 </div>
//                 {addon.extraOptions && (
//                   <div className="pt-2">
//                     <Label className="text-sm font-medium">{addon.extraOptions.label}</Label>
//                     <div className="flex flex-wrap gap-2 mt-2">
//                       {addon.extraOptions.options.map(opt => <Button key={opt} variant="outline" size="sm">{opt}</Button>)}
//                     </div>
//                   </div>
//                 )}
//                 <div className="grid grid-cols-2 gap-2">
//                   <Button size="lg" className="w-full" onClick={handleAddToCart} disabled={isInCart}>
//                     <ShoppingCart className="mr-2 h-5 w-5" /> {isInCart ? "In Cart" : "Add to Cart"}
//                   </Button>
//                   <Button variant="outline" size="lg" className="w-full" onClick={handleWishlistToggle}>
//                     <Heart className={cn("mr-2 h-5 w-5", isInWishlist && "fill-destructive text-destructive")} /> {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </div>
//   );
// }

"use client";

import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StarRating } from '@/components/ui/StarRating';
import type { AddOn, Review as ReviewType } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, ShoppingCart, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getAddOnById } from '@/lib/addons-placeholder-data';
import { useToast } from '@/hooks/use-toast';
import { useCart, useWishlist } from '@/components/AppProviders';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';

function ReviewCard({ review }: { review: ReviewType }) {
  return (
    <Card className="mb-4 border shadow-sm bg-background">
      <CardHeader className="flex flex-row items-start gap-4 p-4">
        <Avatar className="h-10 w-10 border sm:h-11 sm:w-11">
          <AvatarImage src={review.userAvatar} alt={review.userName} data-ai-hint="user avatar review profile addon detail" />
          <AvatarFallback>{review.userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-base font-semibold text-foreground sm:text-lg">{review.userName}</CardTitle>
          <StarRating rating={review.rating} size={14} smSize={16} />
          <p className="text-xs text-muted-foreground mt-1">{new Date(review.createdAt).toLocaleDateString()}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-foreground leading-relaxed">{review.comment}</p>
      </CardContent>
    </Card>
  );
}

export default function AddOnDetailPage() {
  const params = useParams();
  const addonId = params?.id as string;
  const { toast } = useToast();
  const { addToCart, cartItems } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();

  const [addon, setAddon] = useState<AddOn | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!addonId) {
      setError("Add-on ID is missing from URL.");
      setIsLoading(false);
      return;
    }
    const fetchedAddon = getAddOnById(addonId);
    if (fetchedAddon) {
      setAddon(fetchedAddon);
    } else {
      setError(`Add-on with ID ${addonId} not found.`);
    }
    setIsLoading(false);
  }, [addonId]);

  const isInCart = addon ? cartItems.some(item => item.item.id === addon.id) : false;
  const isInWishlist = addon ? wishlistItems.some(item => item.item.id === addon.id) : false;

  const handleAddToCart = () => {
    if (addon) {
      addToCart(addon as any, 'course');
      toast({
        title: "Added to Cart!",
        description: `"${addon.title}" has been added to your cart.`,
      });
    }
  };

  const handleWishlistToggle = () => {
    if (addon) {
      if (isInWishlist) {
        removeFromWishlist(addon.id, 'course');
        toast({
          title: "Removed from Wishlist",
          description: `"${addon.title}" has been removed from your wishlist.`,
        });
      } else {
        addToWishlist(addon as any, 'course');
        toast({
          title: "Added to Wishlist",
          description: `"${addon.title}" has been added to your wishlist.`,
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="container py-6 text-center flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] w-full">
          <Loader2 className="h-10 w-10 animate-spin text-primary mb-3 sm:h-12 sm:w-12" />
          <p className="text-base text-muted-foreground sm:text-lg">Loading Add-on details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !addon) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="container py-6 text-center w-full">
          <h1 className="text-xl font-bold text-destructive mb-3 sm:text-2xl">{error || "Add-on could not be loaded."}</h1>
          <Link href="/" className="text-primary hover:underline mt-3 inline-block text-sm sm:text-base">Back to Home</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Add-ons', href: '#' }, // No general add-ons page yet
    { label: addon.title },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <main className="flex-grow py-6 bg-slate-50 dark:bg-gray-900">
        <section className="container grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Mobile View Structure */}
          <div className="lg:hidden">
            <Breadcrumbs items={breadcrumbItems} />
            <h1 className="text-2xl font-bold font-headline text-foreground sm:text-3xl mt-4">{addon.title}</h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground sm:text-base mt-2">
              <span>By {addon.provider}</span>
              <div className="flex items-center gap-1">
                <StarRating rating={addon.rating} size={14} smSize={16} />
                <span className="ml-1">({addon.reviewsCount} ratings & reviews)</span>
              </div>
            </div>
            <Card className="shadow-lg border mt-6">
              <CardHeader className="p-0">
                <div className="relative w-full overflow-hidden rounded-t-lg aspect-video max-h-80">
                  <Image src={addon.imageUrl} alt={addon.title} fill className="object-cover" data-ai-hint="product image mobile" />
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <p className="text-2xl font-bold text-primary sm:text-3xl">₹{addon.price.toLocaleString('en-IN')}</p>
                  {addon.originalPrice && (
                    <p className="text-base text-muted-foreground line-through sm:text-lg">₹{addon.originalPrice.toLocaleString('en-IN')}</p>
                  )}
                  {addon.discount && (
                    <Badge variant="destructive" className="text-xs sm:text-sm">{addon.discount}</Badge>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <Button size="lg" className="w-full" onClick={handleAddToCart} disabled={isInCart}>
                    <ShoppingCart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> {isInCart ? "In Cart" : "Add to Cart"}
                  </Button>
                  <Button variant="outline" size="lg" className="w-full" onClick={handleWishlistToggle}>
                    <Heart className={cn("mr-2 h-4 w-4 sm:h-5 sm:w-5", isInWishlist && "fill-destructive text-destructive")} /> {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
                  </Button>
                </div>
                {addon.extraOptions && (
                  <div className="pt-2">
                    <Label className="text-sm font-medium">{addon.extraOptions.label}</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {addon.extraOptions.options.map(opt => <Button key={opt} variant="outline" size="sm" className="text-xs sm:text-sm">{opt}</Button>)}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            <Tabs defaultValue="description" className="w-full mt-6 sm:mt-8">
              <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-0">
                <TabsTrigger value="description" className="text-xs sm:text-sm">Description</TabsTrigger>
                {addon.benefits && <TabsTrigger value="benefits" className="text-xs sm:text-sm">Benefits</TabsTrigger>}
                <TabsTrigger value="details" className="text-xs sm:text-sm">Product Details</TabsTrigger>
                <TabsTrigger value="reviews" className="text-xs sm:text-sm">Reviews ({addon.reviews.length})</TabsTrigger>
                <TabsTrigger value="faq" className="text-xs sm:text-sm">FAQ</TabsTrigger>
              </TabsList>
              <TabsContent value="description">
                <Card className="shadow-md border-0 bg-transparent">
                  <CardHeader><CardTitle className="text-xl font-headline">About This Product</CardTitle></CardHeader>
                  <CardContent className="prose dark:prose-invert max-w-none text-base">
                    <p>{addon.description}</p>
                  </CardContent>
                </Card>
              </TabsContent>
              {addon.benefits && (
                <TabsContent value="benefits">
                  <Card className="shadow-md border-0 bg-transparent">
                    <CardHeader><CardTitle className="text-xl font-headline">What You'll Gain</CardTitle></CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-x-6 gap-y-4">
                      {addon.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <p className="text-sm leading-relaxed text-foreground">{benefit}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
              <TabsContent value="details">
                <Card className="shadow-md border-0 bg-transparent">
                  <CardHeader><CardTitle className="text-xl font-headline">Product Details</CardTitle></CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {addon.details.map((detail, i) => <li key={i}><strong>{detail.label}:</strong> {detail.value}</li>)}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reviews">
                <Card className="shadow-md border-0 bg-transparent">
                  <CardHeader><CardTitle className="text-xl font-headline">All Reviews</CardTitle></CardHeader>
                  <CardContent>
                    {addon.reviews.map(review => <ReviewCard key={review.id} review={review} />)}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="faq">
                <Card className="shadow-md border-0 bg-transparent">
                  <CardHeader><CardTitle className="text-xl font-headline">Policies & FAQs</CardTitle></CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {addon.faqs?.map((faq, index) => (
                        <AccordionItem value={`faq-${index}`} key={index}>
                          <AccordionTrigger className="text-sm sm:text-base">{faq.q}</AccordionTrigger>
                          <AccordionContent className="text-sm sm:text-base">{faq.a}</AccordionContent>
                        </AccordionItem>
                      )) || <p className="text-muted-foreground">No FAQs available.</p>}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Desktop View Structure */}
          <div className="hidden lg:block lg:col-span-2">
            <Breadcrumbs items={breadcrumbItems} />
            <h1 className="text-2xl font-bold font-headline text-foreground sm:text-3xl mt-4">{addon.title}</h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground sm:text-base mt-2">
              <span>By {addon.provider}</span>
              <div className="flex items-center gap-1">
                <StarRating rating={addon.rating} size={14} smSize={16} />
                <span className="ml-1">({addon.reviewsCount} ratings & reviews)</span>
              </div>
            </div>

            <Tabs defaultValue="description" className="w-full mt-6 sm:mt-8">
              <TabsList className="flex flex-row space-x-2 sm:space-x-4 w-full overflow-x-auto">
                <TabsTrigger value="description" className="text-xs sm:text-sm flex-1">Description</TabsTrigger>
                {addon.benefits && <TabsTrigger value="benefits" className="text-xs sm:text-sm flex-1">Benefits</TabsTrigger>}
                <TabsTrigger value="details" className="text-xs sm:text-sm flex-1">Product Details</TabsTrigger>
                <TabsTrigger value="reviews" className="text-xs sm:text-sm flex-1">Reviews ({addon.reviews.length})</TabsTrigger>
                <TabsTrigger value="faq" className="text-xs sm:text-sm flex-1">FAQ</TabsTrigger>
              </TabsList>

              <TabsContent value="description">
                <Card className="shadow-md border-0 bg-transparent">
                  <CardHeader><CardTitle className="text-xl font-headline">About This Product</CardTitle></CardHeader>
                  <CardContent className="prose dark:prose-invert max-w-none text-base">
                    <p>{addon.description}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              {addon.benefits && (
                <TabsContent value="benefits">
                  <Card className="shadow-md border-0 bg-transparent">
                    <CardHeader><CardTitle className="text-xl font-headline">What You'll Gain</CardTitle></CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-x-6 gap-y-4">
                      {addon.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <p className="text-sm leading-relaxed text-foreground">{benefit}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              <TabsContent value="details">
                <Card className="shadow-md border-0 bg-transparent">
                  <CardHeader><CardTitle className="text-xl font-headline">Product Details</CardTitle></CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {addon.details.map((detail, i) => <li key={i}><strong>{detail.label}:</strong> {detail.value}</li>)}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card className="shadow-md border-0 bg-transparent">
                  <CardHeader><CardTitle className="text-xl font-headline">All Reviews</CardTitle></CardHeader>
                  <CardContent>
                    {addon.reviews.map(review => <ReviewCard key={review.id} review={review} />)}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="faq">
                <Card className="shadow-md border-0 bg-transparent">
                  <CardHeader><CardTitle className="text-xl font-headline">Policies & FAQs</CardTitle></CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {addon.faqs?.map((faq, index) => (
                        <AccordionItem value={`faq-${index}`} key={index}>
                          <AccordionTrigger className="text-sm sm:text-base">{faq.q}</AccordionTrigger>
                          <AccordionContent className="text-sm sm:text-base">{faq.a}</AccordionContent>
                        </AccordionItem>
                      )) || <p className="text-muted-foreground">No FAQs available.</p>}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="hidden lg:block lg:col-span-1 sticky top-24">
            <Card className="shadow-lg border">
              <CardHeader className="p-0">
                <div className="relative w-full overflow-hidden rounded-t-lg aspect-[4/3]">
                  <Image src={addon.imageUrl} alt={addon.title} fill className="object-cover" data-ai-hint="product image desktop" />
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <p className="text-3xl font-bold text-primary">₹{addon.price.toLocaleString('en-IN')}</p>
                  {addon.originalPrice && (
                    <p className="text-lg text-muted-foreground line-through">₹{addon.originalPrice.toLocaleString('en-IN')}</p>
                  )}
                  {addon.discount && (
                    <Badge variant="destructive">{addon.discount}</Badge>
                  )}
                </div>
                {addon.extraOptions && (
                  <div className="pt-2">
                    <Label className="text-sm font-medium">{addon.extraOptions.label}</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {addon.extraOptions.options.map(opt => <Button key={opt} variant="outline" size="sm">{opt}</Button>)}
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-2">
                  <Button size="lg" className="w-full" onClick={handleAddToCart} disabled={isInCart}>
                    <ShoppingCart className="mr-2 h-5 w-5" /> {isInCart ? "In Cart" : "Add to Cart"}
                  </Button>
                  <Button variant="outline" size="lg" className="w-full" onClick={handleWishlistToggle}>
                    <Heart className={cn("mr-2 h-5 w-5", isInWishlist && "fill-destructive text-destructive")} /> {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}