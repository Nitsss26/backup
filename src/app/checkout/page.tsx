
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { placeholderCourses } from '@/lib/placeholder-data';
import type { Course, CartItem } from '@/lib/types';
import { PAYMENT_OPTIONS, APP_NAME } from '@/lib/constants';
import { ChevronRight, CreditCard, Lock, ShoppingBag, UserCircleIcon } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

// Mock cart items for checkout summary
const mockCartItems: CartItem[] = placeholderCourses.slice(0, 2).map(course => ({ course }));

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_OPTIONS[0].id);
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const subtotal = mockCartItems.reduce((sum, item) => sum + item.course.price, 0);
  const total = subtotal;

  const handleNextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const handlePrevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmitOrder = async () => {
    console.log("Order submitted with payment method:", paymentMethod, "Total:", total);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Order Placed Successfully!",
      description: "Your courses are now being processed. You will receive access instructions from the sellers shortly. Check your purchased courses in your dashboard.",
      variant: "success",
      duration: 7000,
    });
    router.push('/dashboard/student/courses'); // Navigate to student's purchased courses page
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Cart', href: '/cart' },
    { label: 'Checkout' },
  ];

  if (!isClient) {
     return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container py-8 text-center">
            <ShoppingBag className="h-12 w-12 text-primary animate-pulse mx-auto mb-4" />
            Loading checkout...
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container py-8 px-4 md:px-6 bg-muted/30 dark:bg-muted/10">
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className="text-3xl md:text-4xl font-bold mb-8 font-headline">Secure Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-lg border bg-card">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-headline">
                    Step {currentStep} of 3: {currentStep === 1 ? 'Billing Information' : currentStep === 2 ? 'Payment Method' : 'Review & Confirm'}
                  </CardTitle>
                  <div className="flex space-x-1">
                    {[1,2,3].map(step => (
                        <span key={step} className={`h-2 w-6 rounded-full ${currentStep >= step ? 'bg-primary' : 'bg-muted'}`}></span>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {currentStep === 1 && (
                  <form className="space-y-4" onSubmit={(e) => {e.preventDefault(); handleNextStep();}}>
                    <h3 className="text-lg font-semibold mb-2 flex items-center"><UserCircleIcon className="mr-2 h-5 w-5 text-primary"/>Billing Details</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="Priya Sharma" required/>
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="you@example.com" required/>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" placeholder="123 Tech Park, Silicon City" required/>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="Bangalore" required/>
                      </div>
                      <div>
                        <Label htmlFor="state">State / Province</Label>
                        <Input id="state" placeholder="Karnataka" required/>
                      </div>
                      <div>
                        <Label htmlFor="zip">Zip / Postal Code</Label>
                        <Input id="zip" placeholder="560001" required/>
                      </div>
                    </div>
                    <div className="flex justify-end mt-6">
                      <Button type="submit">Next: Payment <ChevronRight className="ml-1 h-4 w-4"/></Button>
                    </div>
                  </form>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold mb-2 flex items-center"><CreditCard className="mr-2 h-5 w-5 text-primary"/>Select Payment Method</h3>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                      {PAYMENT_OPTIONS.map(option => (
                        <Label key={option.id} htmlFor={`payment-${option.id}`} className="flex items-center p-4 border rounded-md cursor-pointer hover:border-primary has-[input:checked]:border-primary has-[input:checked]:bg-primary/10 transition-all">
                          <RadioGroupItem value={option.id} id={`payment-${option.id}`} />
                          <span className="ml-3 font-medium">{option.name}</span>
                          {option.icon && <option.icon className="ml-auto h-6 w-6 text-muted-foreground"/>}
                        </Label>
                      ))}
                    </RadioGroup>
                    {paymentMethod === 'card' && (
                        <div className="p-4 border rounded-md mt-4 space-y-3 bg-muted/20">
                            <h4 className="font-medium">Enter Card Details</h4>
                            <div><Label htmlFor="cardNumber">Card Number</Label><Input id="cardNumber" placeholder="•••• •••• •••• ••••"/></div>
                            <div className="grid grid-cols-2 gap-3">
                                <div><Label htmlFor="expiryDate">Expiry Date</Label><Input id="expiryDate" placeholder="MM/YY"/></div>
                                <div><Label htmlFor="cvc">CVC</Label><Input id="cvc" placeholder="•••"/></div>
                            </div>
                        </div>
                    )}
                     {paymentMethod === 'upi' && (
                        <div className="p-4 border rounded-md mt-4 space-y-3 bg-muted/20">
                            <h4 className="font-medium">Enter UPI ID</h4>
                            <div><Label htmlFor="upiId">Your UPI ID</Label><Input id="upiId" placeholder="yourname@bank"/></div>
                        </div>
                    )}
                    <div className="flex justify-between mt-6">
                      <Button variant="outline" onClick={handlePrevStep}>Back</Button>
                      <Button onClick={handleNextStep}>Next: Review Order <ChevronRight className="ml-1 h-4 w-4"/></Button>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold mb-2">Review Your Order</h3>
                    <div className="space-y-3 border rounded-md p-4 bg-background">
                      {mockCartItems.map(item => (
                        <div key={item.course.id} className="flex justify-between items-center p-2 border-b last:border-b-0">
                           <div className="flex items-center gap-3">
                             <Image src={item.course.imageUrl} alt={item.course.title} width={80} height={45} className="rounded object-cover" data-ai-hint={`${item.course.category} checkout thumbnail`}/>
                             <div>
                                <p className="font-medium text-sm line-clamp-1">{item.course.title}</p>
                                <p className="text-xs text-muted-foreground">{item.course.category}</p>
                             </div>
                           </div>
                           <p className="font-medium text-sm">₹{item.course.price.toLocaleString('en-IN')}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 bg-muted/50 rounded-md space-y-2">
                        <div className="flex justify-between text-sm"><span>Subtotal:</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
                        <div className="flex justify-between text-sm"><span>Shipping:</span><span>Digital (Free)</span></div>
                        <div className="flex justify-between font-bold text-lg"><span>Total:</span><span>₹{total.toLocaleString('en-IN')}</span></div>
                    </div>
                    <p className="text-sm text-muted-foreground">Payment Method: {PAYMENT_OPTIONS.find(p => p.id === paymentMethod)?.name}</p>
                    <div className="flex justify-between mt-6">
                      <Button variant="outline" onClick={handlePrevStep}>Back</Button>
                      <Button onClick={handleSubmitOrder} size="lg" className="bg-success hover:bg-success/90 text-success-foreground">
                        <Lock className="mr-2 h-4 w-4" /> Place Order & Pay
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">By placing your order, you agree to our <Link href="/terms" className="underline hover:text-primary">Terms of Service</Link> and <Link href="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-lg border bg-card">
              <CardHeader>
                <CardTitle className="text-xl font-headline flex items-center"><ShoppingBag className="mr-2 h-5 w-5 text-primary"/>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockCartItems.map(item => (
                  <div key={item.course.id} className="flex items-start gap-3 pb-3 border-b last:border-b-0">
                    <Image src={item.course.imageUrl} alt={item.course.title} width={100} height={56} className="rounded-md object-cover aspect-video" data-ai-hint={`${item.course.category} checkout order summary`}/>
                    <div>
                      <p className="text-sm font-medium line-clamp-2">{item.course.title}</p>
                      <p className="text-sm font-semibold">₹{item.course.price.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
                <div className="pt-3 border-t">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
             <Card className="mt-6 shadow-md border bg-card">
                <CardHeader>
                    <CardTitle className="text-lg font-headline flex items-center"><Lock className="mr-2 h-4 w-4 text-success"/>Secure Payment</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-muted-foreground">All transactions are encrypted and processed securely. We respect your privacy.</p>
                    <Image src="https://placehold.co/300x50.png" alt="Secure payment badges" width={300} height={50} className="mt-2" data-ai-hint="payment security badges logos"/>
                </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
