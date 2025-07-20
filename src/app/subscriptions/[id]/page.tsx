
"use client";

import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StarRating } from '@/components/ui/StarRating';
import type { Subscription, Review as ReviewType } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Heart, ShieldCheck, Loader2, BookCopy, AlertTriangle, ShoppingCart, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getSubscriptionById, placeholderSubscriptions } from '@/lib/subscriptions-placeholder-data';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { APP_NAME } from '@/lib/constants';
import { useCart, useWishlist } from '@/components/AppProviders';
import { cn } from '@/lib/utils';
import { SubscriptionCard } from '@/components/SubscriptionCard';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';

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

export default function SubscriptionDetailPage() {
  const params = useParams();
  const subscriptionId = params?.id as string;
  const { toast } = useToast();
  const { addToCart, cartItems } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();

  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [relatedSubscriptions, setRelatedSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedValidity, setSelectedValidity] = useState<Subscription['validityOptions'][0] | null>(null);

  useEffect(() => {
    if (!subscriptionId) {
      setError("Subscription ID is missing from URL.");
      setIsLoading(false);
      return;
    }
    const fetchedSubscription = getSubscriptionById(subscriptionId);
    if (fetchedSubscription) {
      setSubscription(fetchedSubscription);
      setSelectedValidity(fetchedSubscription.validityOptions[0]);
      const related = placeholderSubscriptions
        .filter(b => b.id !== fetchedSubscription.id)
        .slice(0, 4);
      setRelatedSubscriptions(related);
    } else {
      setError(`Subscription with ID ${subscriptionId} not found.`);
    }
    setIsLoading(false);
  }, [subscriptionId]);

  const currentPrice = selectedValidity ? selectedValidity.price : subscription?.price || 0;
  const currentOriginalPrice = selectedValidity ? selectedValidity.originalPrice : subscription?.originalPrice;

  const itemInCart = {
    ...subscription,
    id: `${subscription?.id}-${selectedValidity?.duration}`,
    title: `${subscription?.title} (${selectedValidity?.duration})`,
    price: currentPrice
  };
  
  const isInCart = cartItems.some(item => item.type === 'subscription' && item.item.id === itemInCart.id);
  const isInWishlist = wishlistItems.some(item => item.type === 'subscription' && item.item.id === subscription?.id);

  const handleAddToCart = () => {
    if (subscription) {
      addToCart(itemInCart as Subscription, 'subscription');
      toast({
        title: "Added to Cart!",
        description: `"${itemInCart.title}" has been added to your cart.`,
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
          <p className="text-lg text-muted-foreground">Loading subscription details...</p>
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
    { label: 'Subscriptions', href: '/subscriptions' },
    { label: subscription.title },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <main className="flex-grow py-8 bg-slate-50 dark:bg-slate-900">
        <section className="bg-gradient-to-br from-primary/80 via-blue-600 to-indigo-700 text-primary-foreground py-12 md:py-16">
            <div className="container grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2 space-y-4">
                    <Breadcrumbs items={breadcrumbItems} className="mb-2 [&_a]:text-blue-100 [&_a:hover]:text-white [&_span]:text-blue-100 [&_svg]:text-blue-100"/>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline text-white">{subscription.title}</h1>
                    <p className="text-lg text-blue-100/90">{subscription.shortDescription}</p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-blue-50">
                        <div className="flex items-center gap-1">
                           <StarRating rating={subscription.rating} size={18} /> <span className="ml-1">({subscription.reviewsCount} ratings)</span>
                        </div>
                    </div>
                    <p className="text-sm text-blue-100">Provider: <span className="font-semibold text-white">{subscription.providerInfo.name}</span></p>
                </div>
                <div className="hidden md:block md:col-span-1 row-start-1 md:row-start-auto">
                     <Card className="shadow-xl sticky top-24 border-2 border-primary/30 bg-card">
                        <CardHeader className="p-0">
                            <Image src={subscription.imageUrl} alt={subscription.title} width={600} height={800} className="rounded-t-lg object-contain w-full bg-white" data-ai-hint="subscription service logo"/>
                        </CardHeader>
                        <CardContent className="p-5 space-y-3">
                            <div className="space-y-2">
                                <Label>Choose Validity</Label>
                                <div className="flex flex-wrap gap-2">
                                    {subscription.validityOptions.map(option => (
                                        <Button key={option.duration} variant={selectedValidity?.duration === option.duration ? "default" : "outline"} onClick={() => setSelectedValidity(option)}>
                                            {option.duration}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-primary">₹{currentPrice.toLocaleString('en-IN')}
                                {currentOriginalPrice && <span className="ml-2 text-lg text-muted-foreground line-through">₹{currentOriginalPrice.toLocaleString('en-IN')}</span>}
                            </div>
                            <Button size="lg" className="w-full text-base py-3" onClick={handleAddToCart} disabled={isInCart}>
                                <ShoppingCart className="mr-2 h-5 w-5" /> {isInCart ? "In Cart" : "Add to Cart"}
                            </Button>
                            <Button variant="outline" size="lg" className="w-full text-base py-3" onClick={handleWishlistToggle}>
                                <Heart className={cn("mr-2 h-5 w-5", isInWishlist && "fill-destructive text-destructive")} /> {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

        <div className="container mt-8 md:mt-12 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="description" className="w-full mb-8">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6 mx-auto max-w-2xl sticky top-16 bg-card/80 backdrop-blur-sm z-30 py-2 rounded-md shadow-sm border">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({subscription.reviews?.length || 0})</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>

              <TabsContent value="description">
                <Card className="shadow-md border bg-card">
                  <CardHeader><CardTitle className="text-2xl font-headline text-foreground">About This Subscription</CardTitle></CardHeader>
                  <CardContent className="prose dark:prose-invert max-w-none text-base leading-relaxed text-foreground whitespace-pre-line">
                    {subscription.description}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="features">
                <Card className="shadow-md border bg-card">
                  <CardHeader><CardTitle className="text-2xl font-headline text-foreground">Key Features</CardTitle></CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-x-6 gap-y-4">
                    {subscription.features?.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <p className="text-sm leading-relaxed text-foreground" dangerouslySetInnerHTML={{ __html: feature }} />
                      </div>
                    ))}
                     {subscription.usageLimitations && subscription.usageLimitations.length > 0 && (
                        <>
                            <h3 className="font-semibold mt-6 mb-2 text-lg text-foreground col-span-full">Usage Limitations</h3>
                             {subscription.usageLimitations.map((limit, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <AlertTriangle className="h-5 w-5 text-warning mt-0.5 shrink-0" />
                                    <p className="text-sm leading-relaxed text-foreground">{limit}</p>
                                </div>
                            ))}
                        </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="faq">
                <Card className="shadow-md border bg-card">
                  <CardHeader><CardTitle className="text-2xl font-headline flex items-center text-foreground"><HelpCircle className="mr-2 h-6 w-6 text-primary"/>Frequently Asked Questions</CardTitle></CardHeader>
                  <CardContent>
                    {subscription.faqs && subscription.faqs.length > 0 ? (
                      <Accordion type="multiple" className="w-full">
                        {subscription.faqs.map((faq, index) => (
                          <AccordionItem value={`faq-${index}`} key={index}>
                            <AccordionTrigger className="text-base text-left hover:no-underline py-3.5 font-medium text-foreground">{faq.q}</AccordionTrigger>
                            <AccordionContent className="text-sm pb-3.5 leading-relaxed text-muted-foreground">{faq.a}</AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    ) : (
                      <p className="text-muted-foreground py-6 text-center">No FAQs available for this subscription yet.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card className="shadow-md border bg-card">
                  <CardHeader><CardTitle className="text-2xl font-headline text-foreground">Customer Reviews</CardTitle></CardHeader>
                  <CardContent>
                    {subscription.reviews && subscription.reviews.length > 0 ? (
                      subscription.reviews.map(review => <ReviewCard key={review.id} review={review} />)
                    ) : (
                      <p className="text-muted-foreground py-6 text-center">No reviews yet for this subscription.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <div className="lg:hidden mt-8 md:mt-0"> 
                 <Card className="shadow-xl sticky top-24 border-2 border-primary/30 bg-card">
                    <CardHeader className="p-0 md:hidden">
                        <Image src={subscription.imageUrl} alt={subscription.title} width={600} height={800} className="rounded-t-lg object-contain w-full bg-white" data-ai-hint="ebook cover mobile"/>
                    </CardHeader>
                    <CardContent className="p-5 space-y-3">
                        <div className="space-y-2">
                            <Label>Choose Validity</Label>
                            <div className="flex flex-wrap gap-2">
                                {subscription.validityOptions.map(option => (
                                    <Button key={option.duration} variant={selectedValidity?.duration === option.duration ? "default" : "outline"} onClick={() => setSelectedValidity(option)}>
                                        {option.duration}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-primary">₹{currentPrice.toLocaleString('en-IN')}
                            {currentOriginalPrice && <span className="ml-2 text-lg text-muted-foreground line-through">₹{currentOriginalPrice.toLocaleString('en-IN')}</span>}
                        </div>
                        <Button size="lg" className="w-full text-base py-3" onClick={handleAddToCart} disabled={isInCart}>
                            <ShoppingCart className="mr-2 h-5 w-5" /> {isInCart ? "In Cart" : "Add to Cart"}
                        </Button>
                        <Button variant="outline" size="lg" className="w-full text-base py-3" onClick={handleWishlistToggle}>
                            <Heart className={cn("mr-2 h-5 w-5", isInWishlist && "fill-destructive text-destructive")} /> {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
                        </Button>
                    </CardContent>
                </Card>
            </div>
             {relatedSubscriptions.length > 0 && (
                <section className="mt-12 lg:mt-0">
                <h2 className="text-2xl font-bold mb-6 font-headline text-foreground">You Might Also Like</h2>
                <div className="grid grid-cols-1 gap-6">
                    {relatedSubscriptions.map((relatedSub) => (
                        <SubscriptionCard key={relatedSub.id} subscription={relatedSub} />
                    ))}
                </div>
                </section>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
