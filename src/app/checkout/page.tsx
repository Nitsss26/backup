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
import { PAYMENT_OPTIONS } from '@/lib/constants';
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
  // Assume no discount for simplicity here
  const total = subtotal;

  const handleNextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const handlePrevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmitOrder = () => {
    // Simulate order submission
    console.log("Order submitted with payment method:", paymentMethod);
    toast({
      title: "Order Placed Successfully!",
      description: "Your courses are now available in your dashboard.",
    });
    // Clear cart (mock) and redirect
    router.push('/dashboard/student/courses'); 
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Cart', href: '/cart' },
    { label: 'Checkout' },
  ];

  if (!isClient) {
     return ( // Basic loading state
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container py-8 text-center">Loading checkout...</main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container py-8 px-4 md:px-6 bg-slate-50 dark:bg-slate-900">
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className="text-3xl md:text-4xl font-bold mb-8 font-headline">Secure Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-headline">
                    Step {currentStep} of 3: {currentStep === 1 ? 'Shipping Information' : currentStep === 2 ? 'Payment Method' : 'Review & Confirm'}
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
                  <form className="space-y-4">
                    <h3 className="text-lg font-semibold mb-2 flex items-center"><UserCircleIcon className="mr-2 h-5 w-5 text-primary"/>Billing Details</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="John Doe" />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="you@example.com" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" placeholder="123 Main St" />
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="Anytown" />
                      </div>
                      <div>
                        <Label htmlFor="state">State / Province</Label>
                        <Input id="state" placeholder="CA" />
                      </div>
                      <div>
                        <Label htmlFor="zip">Zip / Postal Code</Label>
                        <Input id="zip" placeholder="90210" />
                      </div>
                    </div>
                    <div className="flex justify-end mt-6">
                      <Button onClick={handleNextStep}>Next: Payment <ChevronRight className="ml-1 h-4 w-4"/></Button>
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
                        </Label>
                      ))}
                    </RadioGroup>
                    {/* Placeholder for payment form details if needed */}
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
                    <div className="flex justify-between mt-6">
                      <Button variant="outline" onClick={handlePrevStep}>Back</Button>
                      <Button onClick={handleNextStep}>Next: Review Order <ChevronRight className="ml-1 h-4 w-4"/></Button>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold mb-2">Review Your Order</h3>
                    <div className="space-y-3">
                      {mockCartItems.map(item => (
                        <div key={item.course.id} className="flex justify-between items-center p-2 border-b">
                           <div className="flex items-center gap-3">
                             <Image src={item.course.imageUrl} alt={item.course.title} width={80} height={45} className="rounded object-cover" data-ai-hint={`${item.course.category} preview`}/>
                             <div>
                                <p className="font-medium text-sm line-clamp-1">{item.course.title}</p>
                                <p className="text-xs text-muted-foreground">{item.course.category}</p>
                             </div>
                           </div>
                           <p className="font-medium text-sm">${item.course.price.toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 bg-muted/50 rounded-md space-y-2">
                        <div className="flex justify-between text-sm"><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>
                        <div className="flex justify-between text-sm"><span>Shipping:</span><span>Digital (Free)</span></div>
                        <div className="flex justify-between font-bold text-lg"><span>Total:</span><span>${total.toFixed(2)}</span></div>
                    </div>
                    <p className="text-sm text-muted-foreground">Payment Method: {PAYMENT_OPTIONS.find(p => p.id === paymentMethod)?.name}</p>
                    <div className="flex justify-between mt-6">
                      <Button variant="outline" onClick={handlePrevStep}>Back</Button>
                      <Button onClick={handleSubmitOrder} size="lg" className="bg-green-600 hover:bg-green-700">
                        <Lock className="mr-2 h-4 w-4" /> Place Order
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">By placing your order, you agree to our Terms of Service and Privacy Policy.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-headline flex items-center"><ShoppingBag className="mr-2 h-5 w-5 text-primary"/>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockCartItems.map(item => (
                  <div key={item.course.id} className="flex items-start gap-3 pb-3 border-b last:border-b-0">
                    <Image src={item.course.imageUrl} alt={item.course.title} width={100} height={56} className="rounded-md object-cover aspect-video" data-ai-hint={`${item.course.category} thumbnail`}/>
                    <div>
                      <p className="text-sm font-medium line-clamp-2">{item.course.title}</p>
                      <p className="text-sm font-semibold">${item.course.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
                <div className="pt-3 border-t">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {/* Add discount display if applicable */}
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
