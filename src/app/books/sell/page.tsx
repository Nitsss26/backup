
"use client";

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BOOK_CATEGORIES } from '@/lib/constants';
import { Loader2, BookUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AppProviders';
import axios from 'axios';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const bookSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long."),
  author: z.string().optional(),
  category: z.string().min(1, "Please select a category."),
  subcategory: z.string().min(1, "Please select a sub-category."),
  listingType: z.enum(['sell', 'rent'], { required_error: "You must select a listing type." }),
  price: z.coerce.number().optional(),
  rentPricePerMonth: z.coerce.number().optional(),
  address: z.string().min(10, "Please provide a more detailed address."),
  whatsappNumber: z.string().regex(/^\d{10,15}$/, "Please enter a valid WhatsApp number (10-15 digits)."),
  coverPhoto: z.any().refine(files => files?.length > 0, "Cover photo is required."),
}).refine(data => data.listingType === 'sell' ? data.price !== undefined && data.price >= 0 : true, {
  message: "Price is required for selling.",
  path: ["price"],
}).refine(data => data.listingType === 'rent' ? data.rentPricePerMonth !== undefined && data.rentPricePerMonth >= 0 : true, {
  message: "Price per month is required for renting.",
  path: ["rentPricePerMonth"],
});

type BookFormValues = z.infer<typeof bookSchema>;

export default function SellBookPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  const { control, register, handleSubmit, formState: { errors }, watch } = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: { listingType: 'sell' }
  });

  const listingType = watch('listingType');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login?redirect=/books/sell');
    }
  }, [user, authLoading, router]);

  const onSubmit = async (data: BookFormValues) => {
    setIsLoading(true);
    // Placeholder for image upload and getting location coordinates
    const imageUrl = "https://placehold.co/400x500.png"; // Replace with actual upload logic
    const coordinates = [77.5946, 12.9716]; // Placeholder for Bangalore. In real app, geocode address.

    const payload = {
      ...data,
      sellerId: user?.id,
      imageUrl,
      location: {
        type: 'Point',
        coordinates
      }
    };
    
    try {
      await axios.post('/api/books', payload);
      toast({ title: "Success", description: "Your book has been submitted for approval." });
      router.push('/books/my-listings');
    } catch (error) {
      toast({ title: "Error", description: "Failed to submit your book. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading || !user) {
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
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-headline flex items-center gap-2"><BookUp /> Sell or Rent Your Book</CardTitle>
          <CardDescription>Fill out the details below to list your book on the marketplace.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="title">Book Title*</Label>
              <Input id="title" {...register('title')} />
              {errors.title && <p className="text-sm text-destructive mt-1">{errors.title.message}</p>}
            </div>
            <div>
              <Label htmlFor="author">Author Name (Optional)</Label>
              <Input id="author" {...register('author')} />
            </div>
            <div>
              <Label htmlFor="coverPhoto">Cover Photo*</Label>
              <Input id="coverPhoto" type="file" {...register('coverPhoto')} accept="image/*" />
              {errors.coverPhoto && <p className="text-sm text-destructive mt-1">{errors.coverPhoto.message?.toString()}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category*</Label>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={(value) => { field.onChange(value); setSelectedCategory(value); }} value={field.value}>
                      <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
                      <SelectContent>
                        {Object.keys(BOOK_CATEGORIES).map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  )}
                />
                 {errors.category && <p className="text-sm text-destructive mt-1">{errors.category.message}</p>}
              </div>
              <div>
                <Label>Sub-category*</Label>
                <Controller
                  name="subcategory"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value} disabled={!selectedCategory}>
                      <SelectTrigger><SelectValue placeholder="Select Sub-category" /></SelectTrigger>
                      <SelectContent>
                        {selectedCategory && BOOK_CATEGORIES[selectedCategory as keyof typeof BOOK_CATEGORIES]?.map(sub => <SelectItem key={sub} value={sub}>{sub}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.subcategory && <p className="text-sm text-destructive mt-1">{errors.subcategory.message}</p>}
              </div>
            </div>
            <div>
              <Label>Listing Type*</Label>
              <Controller
                name="listingType"
                control={control}
                render={({ field }) => (
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4 mt-2">
                    <div className="flex items-center space-x-2"><RadioGroupItem value="sell" id="sell" /><Label htmlFor="sell">Sell</Label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="rent" id="rent" /><Label htmlFor="rent">Rent</Label></div>
                  </RadioGroup>
                )}
              />
              {errors.listingType && <p className="text-sm text-destructive mt-1">{errors.listingType.message}</p>}
            </div>
            
            {listingType === 'sell' && (
              <div>
                <Label htmlFor="price">Sale Price (₹)*</Label>
                <Input id="price" type="number" {...register('price')} />
                 {errors.price && <p className="text-sm text-destructive mt-1">{errors.price.message}</p>}
              </div>
            )}

            {listingType === 'rent' && (
              <div>
                <Label htmlFor="rentPricePerMonth">Rent Price per Month (₹)*</Label>
                <Input id="rentPricePerMonth" type="number" {...register('rentPricePerMonth')} />
                {errors.rentPricePerMonth && <p className="text-sm text-destructive mt-1">{errors.rentPricePerMonth.message}</p>}
              </div>
            )}

            <div>
              <Label htmlFor="address">Your Pickup Address*</Label>
              <Textarea id="address" {...register('address')} placeholder="Enter your full address so buyers can estimate distance." />
              {errors.address && <p className="text-sm text-destructive mt-1">{errors.address.message}</p>}
            </div>

             <div>
              <Label htmlFor="whatsappNumber">WhatsApp Number*</Label>
              <Input id="whatsappNumber" type="tel" {...register('whatsappNumber')} placeholder="e.g. 919876543210"/>
              <p className="text-xs text-muted-foreground mt-1">Include country code. This will be shared with potential buyers.</p>
              {errors.whatsappNumber && <p className="text-sm text-destructive mt-1">{errors.whatsappNumber.message}</p>}
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit for Approval
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
    <Footer />
    </>
  );
}
