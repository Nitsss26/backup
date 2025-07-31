
"use client";

import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { StarRating } from '@/components/ui/StarRating';
import type { EBook, Review as ReviewType, Course } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Users, Award, CheckCircle, Heart, ShieldCheck, Star, CalendarCheck, Gift, Loader2, BookCopy, Mail, Send, AlertTriangle, Instagram, ShoppingCart, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getEBookById, placeholderEBooks } from '@/lib/ebook-placeholder-data';
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
          <AvatarImage src={review.userAvatar} alt={review.userName} data-ai-hint="user avatar review profile ebook detail"/>
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

export default function EBookDetailPage() {
  const params = useParams();
  const ebookId = params?.id as string;
  const { toast } = useToast();
  const { addToCart, cartItems } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();

  const [ebook, setEBook] = useState<EBook | null>(null);
  const [relatedEbooks, setRelatedEbooks] = useState<EBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ebookId) {
      setError("E-Book ID is missing from URL.");
      setIsLoading(false);
      return;
    }
    const fetchedEBook = getEBookById(ebookId);
    if (fetchedEBook) {
      setEBook(fetchedEBook);
      const related = placeholderEBooks
        .filter(b => b.category === fetchedEBook.category && b.id !== fetchedEBook.id)
        .slice(0, 4);
      setRelatedEbooks(related);
    } else {
      setError(`E-Book with ID ${ebookId} not found.`);
    }
    setIsLoading(false);
  }, [ebookId]);

  const isInCart = ebook ? cartItems.some(item => item.type === 'ebook' && item.item.id === ebook.id) : false;
  const isInWishlist = ebook ? wishlistItems.some(item => item.type === 'ebook' && item.item.id === ebook.id) : false;

  const handleAddToCart = () => {
    if (ebook) {
      addToCart(ebook, 'ebook');
      toast({
        title: "Added to Cart!",
        description: `"${ebook.title}" has been added to your cart.`,
      });
    }
  };

  const handleWishlistToggle = () => {
    if (ebook) {
      if (isInWishlist) {
        removeFromWishlist(ebook.id, 'ebook');
        toast({
          title: "Removed from Wishlist",
          description: `"${ebook.title}" has been removed from your wishlist.`,
        });
      } else {
        addToWishlist(ebook, 'ebook');
        toast({
          title: "Added to Wishlist",
          description: `"${ebook.title}" has been added to your wishlist.`,
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
          <p className="text-lg text-muted-foreground">Loading E-Book details...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !ebook) {
    return (
      <>
        <Header />
        <main className="container py-8 text-center w-full">
          <h1 className="text-2xl font-bold text-destructive mb-4">{error || "E-Book could not be loaded."}</h1>
          <p className="text-muted-foreground mb-6">
            The E-Book you are looking for might not exist or there was an issue retrieving its details.
          </p>
          <Link href="/" className="text-primary hover:underline mt-4 inline-block">
            Back to Home
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'E-Books', href: '/ebooks' },
    { label: ebook.title },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <main className="flex-grow py-8 bg-slate-50 dark:bg-slate-900">
        <section className="bg-gradient-to-br from-primary/80 via-blue-600 to-indigo-700 text-primary-foreground py-12 md:py-16">
            <div className="container grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2 space-y-4">
                    <Breadcrumbs items={breadcrumbItems} className="mb-2 [&_a]:text-blue-100 [&_a:hover]:text-white [&_span]:text-blue-100 [&_svg]:text-blue-100"/>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline text-white">{ebook.title}</h1>
                    <p className="text-lg text-blue-100/90">{ebook.shortDescription}</p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-blue-50">
                        <div className="flex items-center gap-1">
                           <StarRating rating={ebook.rating} size={18} /> <span className="ml-1">({ebook.reviewsCount} ratings)</span>
                        </div>
                    </div>
                    <p className="text-sm text-blue-100">By <span className="font-semibold text-white">{ebook.author}</span></p>
                </div>
                <div className="hidden md:block md:col-span-1 row-start-1 md:row-start-auto">
                     <Card className="shadow-xl sticky top-24 border-2 border-primary/30 bg-card">
                        <CardHeader className="p-0">
                            <Image src={ebook.imageUrl} alt={ebook.title} width={600} height={800} className="rounded-t-lg object-cover w-full aspect-[3/4]" data-ai-hint="ebook cover design"/>
                        </CardHeader>
                        <CardContent className="p-5 space-y-3">
                            <div className="text-3xl font-bold text-primary">₹{ebook.price.toLocaleString('en-IN')}
                                {ebook.originalPrice && <span className="ml-2 text-lg text-muted-foreground line-through">₹{ebook.originalPrice.toLocaleString('en-IN')}</span>}
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
            {/* Mobile-First Layout: Image Card + Tabs */}
            <div className="lg:hidden">
                 <Card className="shadow-xl mb-8 border-2 border-primary/30 bg-card">
                    <CardHeader className="p-0">
                        <Image src={ebook.imageUrl} alt={ebook.title} width={600} height={800} className="rounded-t-lg object-cover w-full aspect-[3/4]" data-ai-hint="ebook cover mobile"/>
                    </CardHeader>
                    <CardContent className="p-5 space-y-3">
                        <div className="text-3xl font-bold text-primary">₹{ebook.price.toLocaleString('en-IN')}
                            {ebook.originalPrice && <span className="ml-2 text-lg text-muted-foreground line-through">₹{ebook.originalPrice.toLocaleString('en-IN')}</span>}
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
            
            <div className="lg:col-span-2">
                <Tabs defaultValue="description" className="w-full mb-8">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 mb-6 mx-auto max-w-2xl sticky top-16 bg-card/80 backdrop-blur-sm z-30 py-2 rounded-md shadow-sm border">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="benefits">Benefits</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews ({ebook.reviews?.length || 0})</TabsTrigger>
                    <TabsTrigger value="faq">FAQ</TabsTrigger>
                    {ebook.purchaseInstructions && <TabsTrigger value="purchase" id="purchase-instructions">How to Buy</TabsTrigger>}
                </TabsList>

                <TabsContent value="description">
                    <Card className="shadow-md border bg-card">
                    <CardHeader><CardTitle className="text-2xl font-headline text-foreground">About This E-Book</CardTitle></CardHeader>
                    <CardContent className="prose dark:prose-invert max-w-none text-base leading-relaxed text-foreground whitespace-pre-line">
                        {ebook.description}
                    </CardContent>
                    </Card>
                </TabsContent>
                
                <TabsContent value="benefits">
                    <Card className="shadow-md border bg-card">
                    <CardHeader><CardTitle className="text-2xl font-headline text-foreground">What You&apos;ll Gain</CardTitle></CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-x-6 gap-y-4">
                        {ebook.benefits?.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                            <p className="text-sm leading-relaxed text-foreground">{benefit}</p>
                        </div>
                        ))}
                    </CardContent>
                    </Card>
                </TabsContent>
                
                <TabsContent value="faq">
                    <Card className="shadow-md border bg-card">
                    <CardHeader><CardTitle className="text-2xl font-headline flex items-center text-foreground"><HelpCircle className="mr-2 h-6 w-6 text-primary"/>Frequently Asked Questions</CardTitle></CardHeader>
                    <CardContent>
                        {ebook.faqs && ebook.faqs.length > 0 ? (
                        <Accordion type="multiple" className="w-full">
                            {ebook.faqs.map((faq, index) => (
                            <AccordionItem value={`faq-${index}`} key={index}>
                                <AccordionTrigger className="text-base text-left hover:no-underline py-3.5 font-medium text-foreground">{faq.q}</AccordionTrigger>
                                <AccordionContent className="text-sm pb-3.5 leading-relaxed text-muted-foreground">
                                {faq.a}
                                </AccordionContent>
                            </AccordionItem>
                            ))}
                        </Accordion>
                        ) : (
                        <p className="text-muted-foreground py-6 text-center">No FAQs available for this E-Book yet.</p>
                        )}
                    </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="reviews">
                    <Card className="shadow-md border bg-card">
                    <CardHeader><CardTitle className="text-2xl font-headline text-foreground">Reader Reviews</CardTitle></CardHeader>
                    <CardContent>
                        {ebook.reviews && ebook.reviews.length > 0 ? (
                        ebook.reviews.map(review => <ReviewCard key={review.id} review={review} />)
                        ) : (
                        <p className="text-muted-foreground py-6 text-center">No reviews yet for this E-Book. Be the first to share your experience!</p>
                        )}
                    </CardContent>
                    </Card>
                </TabsContent>

                {ebook.purchaseInstructions && (
                <TabsContent value="purchase">
                    <Card className="shadow-md border bg-card">
                    <CardHeader>
                        <CardTitle className="text-2xl font-headline text-foreground">Purchase & Delivery Instructions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {ebook.importantNotice && (
                            <Alert variant="warning">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Important Notice!</AlertTitle>
                                <AlertDescription>{ebook.importantNotice}</AlertDescription>
                            </Alert>
                        )}
                        <ol className="list-decimal space-y-3 pl-5 text-base text-foreground">
                            {ebook.purchaseInstructions.map((instruction, index) => (
                                <li key={index} dangerouslySetInnerHTML={{ __html: instruction }} />
                            ))}
                        </ol>
                        <div className="text-sm text-muted-foreground">
                            <strong>Please Note:</strong> This E-Book is sold directly by the author. Follow the steps above carefully to ensure you receive your copy. {APP_NAME} facilitates the listing, but the transaction is directly with the seller. For any issues, please contact the author at <a href={`mailto:${ebook.providerInfo.email}`} className="text-primary hover:underline">{ebook.providerInfo.email}</a>.
                        </div>
                    </CardContent>
                    </Card>
                </TabsContent>
                )}
                </Tabs>
            </div>

            <div className="lg:col-span-1">
                {relatedEbooks.length > 0 && (
                    <section className="lg:mt-0">
                    <h2 className="text-2xl font-bold mb-6 font-headline text-foreground">You Might Also Like</h2>
                    <div className="grid grid-cols-1 gap-6">
                        {relatedEbooks.map((relatedEbook) => (
                            <SubscriptionCard key={relatedEbook.id} subscription={{...relatedEbook, url: `/ebooks/${relatedEbook.id}`}} />
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
