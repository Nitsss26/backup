"use client";

import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { Suspense, useEffect } from 'react';

function OrderPlacedContent() {
    const searchParams = useSearchParams();
    const amount = searchParams.get('amount');
    const orderId = searchParams.get('orderId');
    const courseId = searchParams.get('courseId');

    // Record the sale when the page loads
    useEffect(() => {
        const recordSale = async () => {
            if (amount && orderId) {
                try {
                    await fetch('/api/analytics/record-sale', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            orderId,
                            amount: Number(amount),
                            courseId,
                            timestamp: new Date().toISOString()
                        }),
                    });
                } catch (error) {
                    console.error('Failed to record sale:', error);
                }
            }
        };

        recordSale();
    }, [amount, orderId, courseId]);

    return (
        <div className="flex flex-col items-center justify-center text-center p-6 bg-background rounded-lg shadow-xl border border-border max-w-lg mx-auto">
            <CheckCircle className="h-20 w-20 text-success mb-6" />
            <h1 className="text-3xl font-bold font-headline mb-4 text-foreground">Thank You for Your Order!</h1>
            <p className="text-muted-foreground mb-2">Your order has been placed successfully.</p>
            {amount && (
                <p className="text-lg font-semibold text-primary mb-6">Total Amount: ₹{Number(amount).toLocaleString('en-IN')}</p>
            )}
            <p className="text-sm text-muted-foreground mb-8 max-w-sm">
                Soon we will start taking payments. Hold on! You will receive an email confirmation shortly with access instructions from the seller.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                    <Link href="/dashboard/student/orders">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        View My Orders
                    </Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/courses">Continue Shopping</Link>
                </Button>
            </div>
        </div>
    );
}


export default function OrderPlacedPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container py-12 px-4 md:px-6 flex items-center justify-center">
                <Suspense fallback={<div>Loading confirmation...</div>}>
                    <OrderPlacedContent />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}
