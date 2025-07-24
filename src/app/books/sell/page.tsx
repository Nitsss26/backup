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
import { Loader2, BookUp, MapPin, UploadCloud, CheckCircle, X } from 'lucide-react';
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
import { CldUploadButton, type CldUploadWidgetResults } from 'next-cloudinary';
import Image from 'next/image';

const bookSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long."),
  author: z.string().optional(),
  category: z.string().min(1, "Please select a category."),
  subcategory: z.string().min(1, "Please select a sub-category."),
  listingType: z.enum(['sell', 'rent'], { required_error: "You must select a listing type." }),
  price: z.coerce.number().optional(),
  rentPricePerMonth: z.coerce.number().optional(),
  whatsappNumber: z.string().regex(/^\d{10}$/, "Please enter a valid 10-digit WhatsApp number."),
  imageUrl: z.string().url("Cover photo is required."),
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
  const [isUploading, setIsUploading] = useState(false);

  const { control, register, handleSubmit, formState: { errors }, watch, setValue, trigger, reset } = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: { 
      listingType: 'sell',
      title: '',
      author: '',
      category: '',
      subcategory: '',
      whatsappNumber: '',
      imageUrl: ''
    }
  });

  const listingType = watch('listingType');
  const locationValue = watch('location');
  const imageUrlValue = watch('imageUrl');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login?redirect=/books/sell');
    }
  }, [user, authLoading, router]);

  // Reset subcategory when category changes
  useEffect(() => {
    if (selectedCategory) {
      setValue('subcategory', '');
    }
  }, [selectedCategory, setValue]);
  
  const handleUseCurrentLocation = async () => {
    try {
        const { latitude, longitude } = await getUserLocation();
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch address');
        }
        
        const data = await response.json();
        const address = data.display_name || `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
        setValue('location', { coordinates: [longitude, latitude], address }, { shouldValidate: true });
        toast({ title: "Success", description: "Location set to your current position." });
    } catch (error: any) {
        console.error('Location error:', error);
        toast({ 
          title: "Error", 
          description: error.message || "Could not fetch current location. Please try again or select location manually.", 
          variant: "destructive" 
        });
    }
  };

  const handleLocationSelect = (latlng: { lat: number; lng: number }, address: string) => {
    setValue('location', { coordinates: [latlng.lng, latlng.lat], address }, { shouldValidate: true });
    setIsMapOpen(false);
    toast({ title: "Success", description: "Location selected successfully." });
  }

  const handleUploadStart = () => {
    setIsUploading(true);
  };

  const handleUploadSuccess = (result: CldUploadWidgetResults) => {
    setIsUploading(false);
    const info = result.info as { secure_url: string };
    if (info?.secure_url) {
      setValue('imageUrl', info.secure_url, { shouldValidate: true });
      toast({ title: "Success", description: "Image uploaded successfully." });
    } else {
      toast({ title: "Upload Error", description: "Could not get image URL after upload.", variant: "destructive" });
    }
  };

  const handleUploadError = (error: any) => {
    setIsUploading(false);
    console.error('Upload error:', error);
    toast({ 
      title: "Upload Error", 
      description: "Failed to upload image. Please try again.", 
      variant: "destructive" 
    });
  };

  const removeImage = () => {
    setValue('imageUrl', '', { shouldValidate: true });
    toast({ title: "Success", description: "Image removed." });
  };

  const onSubmit = async (data: BookFormValues) => {
    setIsLoading(true);
    
    try {
        // Validate required fields based on listing type
        if (data.listingType === 'sell' && (data.price === undefined || data.price < 0)) {
          toast({ title: "Error", description: "Please enter a valid sale price.", variant: "destructive" });
          setIsLoading(false);
          return;
        }
        
        if (data.listingType === 'rent' && (data.rentPricePerMonth === undefined || data.rentPricePerMonth < 0)) {
          toast({ title: "Error", description: "Please enter a valid rent price.", variant: "destructive" });
          setIsLoading(false);
          return;
        }

        const payload = {
            ...data,
            whatsappNumber: data.whatsappNumber,
            sellerId: user?.id,
            location: {
              type: 'Point',
              coordinates: data.location.coordinates,
              address: data.location.address
            }
        };

        const response = await axios.post('/api/books', payload);
        
        if (response.status === 201) {
          toast({ title: "Success", description: "Your book has been submitted for approval." });
          reset(); // Reset form after successful submission
          router.push('/books/my-listings');
        }

    } catch (error: any) {
      console.error("Submission error:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to submit your book. Please try again.";
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  return (
    <>
    <Header />
    <main className="container py-8 px-4 md:px-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-headline flex items-center gap-2">
            <BookUp /> Sell or Rent Your Book
          </CardTitle>
          <CardDescription>
            Fill out the details below to list your book on the marketplace. All listings are reviewed before going live.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="title">Book Title*</Label>
              <Input 
                id="title" 
                placeholder="Enter the book title"
                {...register('title')} 
              />
              {errors.title && <p className="text-sm text-destructive mt-1">{errors.title.message}</p>}
            </div>
            
            <div>
              <Label htmlFor="author">Author Name (Optional)</Label>
              <Input 
                id="author" 
                placeholder="Enter author name"
                {...register('author')} 
              />
            </div>
            
            <div>
              <Label>Cover Photo*</Label>
              <div className="mt-2 flex flex-col items-center gap-4 rounded-lg border-2 border-dashed border-muted p-4">
                {imageUrlValue ? (
                  <div className="relative">
                    <Image 
                      src={imageUrlValue} 
                      alt="Cover photo preview" 
                      width={120} 
                      height={160} 
                      className="object-cover rounded-md border"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 h-6 w-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                    <CheckCircle className="absolute -top-2 -left-2 h-6 w-6 text-white bg-green-500 rounded-full p-1"/>
                  </div>
                ) : (
                  <div className="text-center">
                    <UploadCloud className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Upload a clear photo of your book cover</p>
                  </div>
                )}
                
                <CldUploadButton
                  uploadPreset="edtechcart_books" 
                  options={{
                    sources: ['local', 'url'],
                    multiple: false,
                    maxFiles: 1,
                    cropping: true,
                    croppingAspectRatio: 0.75,
                    folder: 'edtechcart_books',
                    maxFileSize: 5000000,
                    clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
                  }}
                  onSuccess={handleUploadSuccess}
                  onError={handleUploadError}
                  onUpload={handleUploadStart}
                  className="w-full"
                >
                  <div className="w-full bg-primary text-primary-foreground text-center p-2 rounded-md hover:bg-primary/90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                    {isUploading ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Uploading...
                      </div>
                    ) : (
                      imageUrlValue ? 'Change Photo' : 'Upload Cover Photo'
                    )}
                  </div>
                </CldUploadButton>
                
                <Input {...register('imageUrl')} className="hidden" />
                {errors.imageUrl && <p className="text-sm text-destructive mt-1">{errors.imageUrl.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Category*</Label>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select 
                      onValueChange={(value) => { 
                        field.onChange(value); 
                        setSelectedCategory(value); 
                      }} 
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(BOOK_CATEGORIES).map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
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
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value} 
                      disabled={!selectedCategory}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={!selectedCategory ? "Select category first" : "Select Sub-category"} />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedCategory && BOOK_CATEGORIES[selectedCategory as keyof typeof BOOK_CATEGORIES]?.map(sub => (
                          <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                        ))}
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
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-6 mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sell" id="sell" />
                      <Label htmlFor="sell">Sell</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="rent" id="rent" />
                      <Label htmlFor="rent">Rent</Label>
                    </div>
                  </RadioGroup>
                )}
              />
              {errors.listingType && <p className="text-sm text-destructive mt-1">{errors.listingType.message}</p>}
            </div>
            
            {listingType === 'sell' && (
              <div>
                <Label htmlFor="price">Sale Price (₹)*</Label>
                <Input 
                  id="price" 
                  type="number" 
                  min="0"
                  step="1"
                  placeholder="Enter sale price"
                  {...register('price')} 
                />
                 {errors.price && <p className="text-sm text-destructive mt-1">{errors.price.message}</p>}
              </div>
            )}

            {listingType === 'rent' && (
              <div>
                <Label htmlFor="rentPricePerMonth">Rent Price per Month (₹)*</Label>
                <Input 
                  id="rentPricePerMonth" 
                  type="number" 
                  min="0"
                  step="1"
                  placeholder="Enter monthly rent price"
                  {...register('rentPricePerMonth')} 
                />
                {errors.rentPricePerMonth && <p className="text-sm text-destructive mt-1">{errors.rentPricePerMonth.message}</p>}
              </div>
            )}
            
            <div>
              <Label>Pickup Location*</Label>
              <div className="p-3 border rounded-md min-h-[6rem] flex flex-col justify-center bg-muted/30">
                 {locationValue?.address ? (
                    <div className="text-sm">
                      <p className="font-medium">{locationValue.address}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Coordinates: {locationValue.coordinates[1].toFixed(4)}, {locationValue.coordinates[0].toFixed(4)}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Please set your book's pickup location.</p>
                  )}
              </div>
              <div className="flex flex-col sm:flex-row gap-2 mt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleUseCurrentLocation}
                  className="flex items-center gap-2"
                >
                  <MapPin className="h-4 w-4" /> 
                  Use Current Location
                </Button>
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
               {errors.location && <p className="text-sm text-destructive mt-1">{errors.location?.message || errors.location?.address?.message}</p>}
            </div>

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
                <p className="text-xs text-muted-foreground mt-1">
                  Your 10-digit number. This will be shared with potential buyers for communication.
                </p>
                {errors.whatsappNumber && <p className="text-sm text-destructive mt-1">{errors.whatsappNumber.message}</p>}
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading || isUploading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit for Approval'
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
