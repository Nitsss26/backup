
"use client";

import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { StarRating } from '@/components/ui/StarRating';
import type { Subscription, Review as ReviewType } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Heart, Loader2, ShoppingCart, HelpCircle, Star, Award } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getEducationalSubscriptionById } from '@/lib/educational-subscriptions-placeholder-data';
import { useToast } from '@/hooks/use-toast';
import { useCart, useWishlist } from '@/components/AppProviders';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

function ReviewCard({ review }: { review: ReviewType }) {
  return (
    <Card className="mb-4 border shadow-sm bg-background">
      <CardHeader className="flex flex-row items-start gap-4 p-4">
        <Avatar className="h-11 w-11 border">
          <AvatarImage src={review.userAvatar} alt={review.userName} data-ai-hint="user avatar review profile subscription detail"/>
          <AvatarFallback>{review.userName.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-base font-semibold text-foreground">{review.userName}</CardTitle>
          <StarRating rating={review.rating} size={16} />
          <p className="text-xs text-muted-foreground mt-1">{new Date(review.createdAt).toLocaleDateString()}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-foreground leading-relaxed">{review.comment}</p>
      </CardContent>
    </Card>
  );
}

export default function EduSubscriptionDetailPage() {
  const params = useParams();
  const subscriptionId = params?.id as string;
  const { toast } = useToast();
  const { addToCart, cartItems } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();

  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!subscriptionId) {
      setError("Subscription ID is missing from URL.");
      setIsLoading(false);
      return;
    }
    const fetchedSubscription = getEducationalSubscriptionById(subscriptionId);
    if (fetchedSubscription) {
      setSubscription(fetchedSubscription);
    } else {
      setError(`Subscription with ID ${subscriptionId} not found.`);
    }
    setIsLoading(false);
  }, [subscriptionId]);

  const isInCart = subscription ? cartItems.some(item => item.type === 'subscription' && item.item.id === subscription.id) : false;
  const isInWishlist = subscription ? wishlistItems.some(item => item.type === 'subscription' && item.item.id === subscription.id) : false;

  const handleAddToCart = () => {
    if (subscription) {
      addToCart(subscription, 'subscription');
      toast({
        title: "Added to Cart!",
        description: `"${subscription.title}" has been added to your cart.`,
      });
    }
  };
  
  const handleWishlistToggle = () => {
    if (subscription) {
      if (isInWishlist) {
        removeFromWishlist(subscription.id, 'subscription');
        toast({
          title: "Removed from Wishlist",
          description: `"${subscription.title}" has been removed from your wishlist.`,
        });
      } else {
        addToWishlist(subscription, 'subscription');
        toast({
          title: "Added to Wishlist",
          description: `"${subscription.title}" has been added to your wishlist.`,
        });
      }
    }
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="container py-8 text-center flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] w-full">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-lg text-muted-foreground">Loading Subscription details...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !subscription) {
    return (
      <>
        <Header />
        <main className="container py-8 text-center w-full">
          <h1 className="text-2xl font-bold text-destructive mb-4">{error || "Subscription could not be loaded."}</h1>
          <Link href="/subscriptions" className="text-primary hover:underline mt-4 inline-block">
            Back to All Subscriptions
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Subscriptions', href: '/edusubscriptions' },
    { label: subscription.title, isCurrent: true, truncate: true },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <main className="flex-grow py-8 bg-slate-50 dark:bg-slate-900">
        <section className="container">
           <Breadcrumbs items={breadcrumbItems} />
            <div className="grid lg:grid-cols-3 gap-8 md:gap-12 items-start">
                <div className="lg:col-span-2">
                    <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
                        <div className="w-full md:w-1/3">
                            <Image src={subscription.imageUrl} alt={subscription.title} width={400} height={400} className="w-full object-cover rounded-xl shadow-lg border"/>
                        </div>
                        <div className="w-full md:w-2/3">
                            <h1 className="text-2xl md:text-3xl font-bold font-headline">{subscription.title}</h1>
                            <p className="text-muted-foreground mt-2">{subscription.shortDescription}</p>
                            <div className="flex items-center gap-2 mt-3">
                                <StarRating rating={subscription.rating} size={18}/>
                                <span className="text-sm text-muted-foreground">({subscription.reviewsCount} ratings)</span>
                            </div>
                        </div>
                    </div>
                    
                    <Tabs defaultValue="features" className="w-full">
                         <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6 sticky top-16 bg-card/80 backdrop-blur-sm z-30 py-2 rounded-md shadow-sm border">
                            <TabsTrigger value="features">Features</TabsTrigger>
                            <TabsTrigger value="description">Description</TabsTrigger>
                            <TabsTrigger value="reviews">Reviews</TabsTrigger>
                            <TabsTrigger value="faq">FAQ</TabsTrigger>
                        </TabsList>

                        <TabsContent value="features">
                            <Card className="shadow-md border bg-card">
                            <CardHeader><CardTitle className="text-xl font-headline">What You Get</CardTitle></CardHeader>
                            <CardContent className="grid md:grid-cols-2 gap-x-6 gap-y-4">
                                {subscription.features?.map((feature, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                                    <p className="text-sm leading-relaxed text-foreground" dangerouslySetInnerHTML={{ __html: feature }}/>
                                </div>
                                ))}
                            </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="description">
                            <Card className="shadow-md border bg-card">
                            <CardHeader><CardTitle className="text-xl font-headline">About This Subscription</CardTitle></CardHeader>
                            <CardContent className="prose dark:prose-invert max-w-none text-base">
                                <p className="whitespace-pre-line">{subscription.description}</p>
                            </CardContent>
                            </Card>
                        </TabsContent>
                        
                        <TabsContent value="reviews">
                            <Card className="shadow-md border bg-card">
                            <CardHeader><CardTitle className="text-xl font-headline">User Reviews</CardTitle></CardHeader>
                            <CardContent>
                                {subscription.reviews && subscription.reviews.length > 0 ? (
                                subscription.reviews.map(review => <ReviewCard key={review.id} review={review} />)
                                ) : (
                                <p className="text-muted-foreground py-6 text-center">No reviews yet for this subscription.</p>
                                )}
                            </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="faq">
                            <Card className="shadow-md border bg-card">
                            <CardHeader><CardTitle className="text-xl font-headline">FAQs</CardTitle></CardHeader>
                            <CardContent>
                                {subscription.faqs && subscription.faqs.length > 0 ? (
                                <Accordion type="multiple" className="w-full">
                                    {subscription.faqs.map((faq, index) => (
                                    <AccordionItem value={`faq-${index}`} key={index}>
                                        <AccordionTrigger className="text-base text-left hover:no-underline">{faq.q}</AccordionTrigger>
                                        <AccordionContent className="text-sm pb-4">{faq.a}</AccordionContent>
                                    </AccordionItem>
                                    ))}
                                </Accordion>
                                ) : (
                                <p className="text-muted-foreground py-6 text-center">No FAQs available.</p>
                                )}
                            </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                <div className="lg:col-span-1">
                    <Card className="shadow-xl sticky top-24 border bg-card p-6 space-y-4">
                        <CardTitle className="text-lg font-headline">Choose Your Plan</CardTitle>
                        {subscription.validityOptions.map(plan => (
                            <Card key={plan.duration} className="border-2 data-[selected=true]:border-primary transition-all" data-selected={plan.price === subscription.price}>
                                <CardHeader className="p-4">
                                    <h3 className="font-semibold">{plan.duration}</h3>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-bold text-primary">₹{plan.price.toLocaleString('en-IN')}</span>
                                        {subscription.priceSuffix && <span className="text-sm text-muted-foreground">{subscription.priceSuffix}</span>}
                                        {plan.originalPrice && <span className="text-sm text-muted-foreground line-through">₹{plan.originalPrice.toLocaleString('en-IN')}</span>}
                                    </div>
                                    <CardDescription>{plan.description || ''}</CardDescription>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <Button className="w-full" asChild>
                                        <a href={subscription.url} target="_blank" rel="noopener noreferrer">
                                            <ShoppingCart className="mr-2 h-4 w-4"/> Choose Plan
                                        </a>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                         <Button variant="outline" size="lg" className="w-full" onClick={handleWishlistToggle}>
                            <Heart className={cn("mr-2 h-5 w-5", isInWishlist && "fill-destructive text-destructive")} /> {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
                        </Button>
                    </Card>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
