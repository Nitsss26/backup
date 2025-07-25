
"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, BookUp, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/components/AppProviders';
import axios from 'axios';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import type { Book } from '@/lib/types';
import Link from 'next/link';

const editBookSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long."),
  price: z.coerce.number().optional(),
  rentPricePerMonth: z.coerce.number().optional(),
  whatsappNumber: z.string().regex(/^\d{10}$/, "Please enter a valid 10-digit WhatsApp number."),
}).refine(data => {
  // This validation logic is complex because price/rentPrice can be optional
  // We only require a price if the book's listing type matches
  // Since we don't have the listingType in the form, this validation is tricky.
  // We will handle it in the onSubmit handler instead.
  return true;
});


type EditBookFormValues = z.infer<typeof editBookSchema>;

export default function EditBookPage() {
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const bookId = params.id as string;
  const { user, isLoading: authLoading } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [book, setBook] = useState<Book | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<EditBookFormValues>({
    resolver: zodResolver(editBookSchema),
  });

  const listingType = book?.listingType;

  useEffect(() => {
    if (!authLoading && !user) {
      router.push(`/auth/login?redirect=/books/edit/${bookId}`);
    }
  }, [user, authLoading, router, bookId]);

  useEffect(() => {
    if (bookId && user) {
      const fetchBook = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`/api/books/${bookId}`);
          const fetchedBook: Book = response.data;
          
          if (fetchedBook.seller._id !== user.id) {
             toast({ title: "Unauthorized", description: "You are not authorized to edit this book.", variant: "destructive"});
             router.push('/books/my-listings');
             return;
          }

          setBook(fetchedBook);
          reset({
            title: fetchedBook.title,
            price: fetchedBook.price,
            rentPricePerMonth: fetchedBook.rentPricePerMonth,
            whatsappNumber: fetchedBook.whatsappNumber.replace('+91', ''),
          });
        } catch (error) {
          toast({ title: "Error", description: "Could not fetch book details.", variant: "destructive" });
          router.push('/books/my-listings');
        } finally {
          setIsLoading(false);
        }
      };
      fetchBook();
    }
  }, [bookId, reset, toast, router, user]);
  
  const onSubmit = async (data: EditBookFormValues) => {
    setIsLoading(true);
    try {
        const payload = {
            ...data,
            whatsappNumber: `+91${data.whatsappNumber}`,
        };
        const response = await axios.put(`/api/books/${bookId}`, payload);
        if (response.status === 200) {
            toast({ title: "Success", description: "Your book listing has been updated." });
            router.push('/books/my-listings');
        }
    } catch (error: any) {
        toast({ title: "Error", description: error.response?.data?.message || "Failed to update book.", variant: "destructive" });
    } finally {
        setIsLoading(false);
    }
  };

  if (authLoading || isLoading || !book) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="container py-8 px-4 md:px-6">
        <Button variant="ghost" asChild className="mb-4">
            <Link href="/books/my-listings"><ArrowLeft className="h-4 w-4 mr-2"/> Back to My Listings</Link>
        </Button>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-headline flex items-center gap-2">
              <BookUp /> Edit Your Book Listing
            </CardTitle>
            <CardDescription>
              Update the title, price, and contact number for your book. Other details cannot be changed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="title">Book Title*</Label>
                <Input id="title" {...register('title')} />
                {errors.title && <p className="text-sm text-destructive mt-1">{errors.title.message}</p>}
              </div>

              {listingType === 'sell' && (
                <div>
                  <Label htmlFor="price">Sale Price (₹)*</Label>
                  <Input id="price" type="number" min="0" step="1" {...register('price')} />
                  {errors.price && <p className="text-sm text-destructive mt-1">{errors.price.message}</p>}
                </div>
              )}

              {listingType === 'rent' && (
                <div>
                  <Label htmlFor="rentPricePerMonth">Rent Price per Month (₹)*</Label>
                  <Input id="rentPricePerMonth" type="number" min="0" step="1" {...register('rentPricePerMonth')} />
                  {errors.rentPricePerMonth && <p className="text-sm text-destructive mt-1">{errors.rentPricePerMonth.message}</p>}
                </div>
              )}
              
              <div>
                  <Label htmlFor="whatsappNumber">WhatsApp Number*</Label>
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-sm">+91</span>
                    <Input 
                      id="whatsappNumber" 
                      type="tel" 
                      maxLength={10}
                      placeholder="9876543210"
                      {...register('whatsappNumber')} 
                      className="rounded-l-none"
                    />
                  </div>
                  {errors.whatsappNumber && <p className="text-sm text-destructive mt-1">{errors.whatsappNumber.message}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...</>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  );
}
