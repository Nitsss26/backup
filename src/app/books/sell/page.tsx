
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
import { Loader2, BookUp, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AppProviders';
import axios from 'axios';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { getUserLocation } from '@/lib/location';
import LocationPicker from '@/components/LocationPicker';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const bookSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long."),
  author: z.string().optional(),
  category: z.string().min(1, "Please select a category."),
  subcategory: z.string().min(1, "Please select a sub-category."),
  listingType: z.enum(['sell', 'rent'], { required_error: "You must select a listing type." }),
  price: z.coerce.number().optional(),
  rentPricePerMonth: z.coerce.number().optional(),
  whatsappNumber: z.string().regex(/^\d{10}$/, "Please enter a valid 10-digit WhatsApp number."),
  coverPhoto: z.any().refine(files => files?.length > 0, "Cover photo is required."),
  location: z.object({
    coordinates: z.array(z.number()).length(2, "Location is required"),
    address: z.string().min(1, "Address is required")
  }).refine(data => data.coordinates.length === 2 && data.address, { message: "Location is required."}),
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
  const [isMapOpen, setIsMapOpen] = useState(false);

  const { control, register, handleSubmit, formState: { errors }, watch, setValue } = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: { listingType: 'sell' }
  });

  const listingType = watch('listingType');
  const locationValue = watch('location');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login?redirect=/books/sell');
    }
  }, [user, authLoading, router]);
  
  const handleUseCurrentLocation = async () => {
    try {
        const { latitude, longitude } = await getUserLocation();
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
        const data = await response.json();
        const address = data.display_name || `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
        setValue('location', { coordinates: [longitude, latitude], address }, { shouldValidate: true });
        toast({ title: "Success", description: "Location set to your current position." });
    } catch (error: any) {
        toast({ title: "Error", description: error.message || "Could not fetch current location.", variant: "destructive" });
    }
  };

  const handleLocationSelect = (latlng: { lat: number; lng: number }, address: string) => {
    setValue('location', { coordinates: [latlng.lng, latlng.lat], address }, { shouldValidate: true });
    setIsMapOpen(false);
  }

  const onSubmit = async (data: BookFormValues) => {
    setIsLoading(true);
    
    try {
        const file = data.coverPhoto[0];
        const { signature, timestamp, folder } = await axios.post('/api/upload-signature').then(res => res.data);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('signature', signature);
        formData.append('timestamp', timestamp);
        formData.append('folder', folder);
        formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);

        const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, formData);
        
        const imageUrl = cloudinaryResponse.data.secure_url;

        const payload = {
            ...data,
            whatsappNumber: `+91${data.whatsappNumber}`, // Prepend country code
            sellerId: user?.id,
            imageUrl,
            address: data.location.address,
            location: {
              type: 'Point',
              coordinates: data.location.coordinates
            }
        };

        await axios.post('/api/books', payload);
        toast({ title: "Success", description: "Your book has been submitted for approval." });
        router.push('/books/my-listings');

    } catch (error) {
      console.error("Submission error:", error);
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
              <Label>Pickup Location*</Label>
              <div className="p-3 border rounded-md min-h-[6rem] flex flex-col justify-center">
                 {locationValue?.address ? (
                    <div className="text-sm">
                      <p className="font-medium">{locationValue.address}</p>
                      <p className="text-xs text-muted-foreground">
                        Coords: [{locationValue.coordinates[1].toFixed(4)}, {locationValue.coordinates[0].toFixed(4)}]
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Please set your book's location.</p>
                  )}
              </div>
              <div className="flex gap-2 mt-2">
                <Button type="button" variant="outline" onClick={handleUseCurrentLocation}><MapPin className="mr-2 h-4 w-4" /> Use Current Location</Button>
                <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
                  <DialogTrigger asChild>
                    <Button type="button" variant="outline">Choose on Map</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl h-[80vh]">
                    <DialogHeader>
                      <DialogTitle>Select Pickup Location</DialogTitle>
                    </DialogHeader>
                    <LocationPicker onLocationSelect={handleLocationSelect}/>
                  </DialogContent>
                </Dialog>
              </div>
               {errors.location && <p className="text-sm text-destructive mt-1">{errors.location.message}</p>}
            </div>

             <div>
                <Label htmlFor="whatsappNumber">WhatsApp Number*</Label>
                <div className="flex items-center">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-sm">+91</span>
                  <Input id="whatsappNumber" type="tel" {...register('whatsappNumber')} placeholder="9876543210" className="rounded-l-none"/>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Your 10-digit number. This will be shared with potential buyers.</p>
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
