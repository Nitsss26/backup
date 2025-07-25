
// "use client";

// import React, { useState, useEffect, useCallback } from 'react';
// import { Header } from '@/components/layout/Header';
// import { Footer } from '@/components/layout/Footer';
// import { Button } from '@/components/ui/button';
// import { Book, MapPin, Loader2, X, Filter, AlertTriangle } from 'lucide-react';
// import type { Book as BookType } from '@/lib/types';
// import axios from 'axios';
// import { useAuth } from '@/components/AppProviders';
// import { useRouter } from 'next/navigation';
// import { calculateDistance, getUserLocation } from '@/lib/location';
// import { BookCard } from '@/components/BookCard';
// import { BOOK_CATEGORIES } from '@/lib/constants';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { useToast } from '@/hooks/use-toast';
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// export default function BooksPage() {
//   const { user } = useAuth();
//   const router = useRouter();
//   const [books, setBooks] = useState<BookType[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
//   const [locationError, setLocationError] = useState<string | null>(null);
//   const [filters, setFilters] = useState({ category: 'all', subcategory: 'all' });
//   const { toast } = useToast();

//   const fetchBooks = useCallback(async (location: { latitude: number; longitude: number } | null) => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get('/api/books');
//       let fetchedBooks = response.data.books as BookType[];
      
//       if (location) {
//         fetchedBooks = fetchedBooks.map(book => ({
//           ...book,
//           distance: calculateDistance(
//             location.latitude,
//             location.longitude,
//             book.location.coordinates[1],
//             book.location.coordinates[0]
//           ),
//         })).sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
//       } else {
//         fetchedBooks = fetchedBooks.sort((a, b) => 
//           new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
//         );
//       }
//       setBooks(fetchedBooks);
//     } catch (error) {
//       console.error("Failed to fetch books", error);
//       toast({ title: "Error", description: "Could not fetch books.", variant: 'destructive' });
//     } finally {
//       setIsLoading(false);
//     }
//   }, [toast]);

//   const handleGetLocation = useCallback(async () => {
//     setLocationError(null);
//     try {
//       const location = await getUserLocation();
//       setUserLocation(location);
//       fetchBooks(location);
//       toast({ title: 'Location Enabled!', description: 'Showing books closest to you first.' });
//     } catch (error: any) {
//       setLocationError(error.message);
//       toast({ title: 'Location Error', description: "Could not get your location. Showing all books.", variant: 'destructive' });
//       fetchBooks(null);
//     }
//   }, [toast, fetchBooks]);

//   useEffect(() => {
//     handleGetLocation();
//   }, [handleGetLocation]);
  
//   const handleFilterChange = (type: 'category' | 'subcategory', value: string) => {
//     if (type === 'category') {
//       setFilters({ category: value, subcategory: 'all' });
//     } else {
//       setFilters(prev => ({ ...prev, [type]: value }));
//     }
//   };

//   const filteredBooks = books.filter(book => {
//     const categoryMatch = filters.category === 'all' || book.category === filters.category;
//     const subcategoryMatch = filters.subcategory === 'all' || book.subcategory === filters.subcategory;
//     return categoryMatch && subcategoryMatch;
//   });

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
//       <main className="flex-grow bg-slate-50 dark:bg-slate-900 py-4 md:py-8 px-2 md:px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-8">
//             <h1 className="text-4xl font-bold font-headline">Book Marketplace</h1>
//             <p className="text-muted-foreground mt-2">Buy or rent used books from sellers near you.</p>
//           </div>
          
//           {locationError && (
//             <Alert variant="warning" className="mb-6">
//               <AlertTriangle className="h-4 w-4" />
//               <AlertTitle>Location Disabled</AlertTitle>
//               <AlertDescription>
//                 {locationError} Distances to book listings cannot be calculated.
//               </AlertDescription>
//             </Alert>
//           )}

//           <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center bg-card p-4 rounded-lg shadow-sm border">
//             <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
//               <Button onClick={() => router.push(user ? '/books/sell' : '/auth/login?redirect=/books/sell')} className="w-full sm:w-auto">
//                 Sell Your Book
//               </Button>
//               {user && (
//                 <Button onClick={() => router.push('/books/my-listings')} variant="outline" className="w-full sm:w-auto">
//                   My Book Listings
//                 </Button>
//               )}
//             </div>

//             <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
//               <Select value={filters.category} onValueChange={(v) => handleFilterChange('category', v)}>
//                 <SelectTrigger className="w-full sm:w-[200px]"><SelectValue placeholder="Category" /></SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Categories</SelectItem>
//                   {Object.keys(BOOK_CATEGORIES).map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
//                 </SelectContent>
//               </Select>
//               <Select value={filters.subcategory} onValueChange={(v) => handleFilterChange('subcategory', v)} disabled={filters.category === 'all'}>
//                 <SelectTrigger className="w-full sm:w-[200px]"><SelectValue placeholder="Sub-category" /></SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Sub-categories</SelectItem>
//                   {filters.category !== 'all' && BOOK_CATEGORIES[filters.category as keyof typeof BOOK_CATEGORIES].map(sub => <SelectItem key={sub} value={sub}>{sub}</SelectItem>)}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           {userLocation && (
//             <div className="flex items-center justify-center gap-2 mb-4 text-sm text-muted-foreground">
//               <MapPin className="h-4 w-4" />
//               <span>Showing books sorted by distance from your location</span>
//             </div>
//           )}

//           {isLoading ? (
//             <div className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin mx-auto" /></div>
//           ) : filteredBooks.length > 0 ? (
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
//               {filteredBooks.map(book => (
//                 <BookCard 
//                   key={book._id} 
//                   book={book} 
//                   distance={book.distance}
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-16 border-2 border-dashed rounded-lg">
//               <Book className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
//               <h2 className="text-xl font-semibold mb-2">No Books Found</h2>
//               <p className="text-muted-foreground">No books match your current filters. Try a different category.</p>
//             </div>
//           )}
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }


"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Book, MapPin, Loader2, X, Filter } from 'lucide-react';
import type { Book as BookType } from '@/lib/types';
import axios from 'axios';
import { useAuth } from '@/components/AppProviders';
import { useRouter } from 'next/navigation';
import { calculateDistance, getUserLocation } from '@/lib/location';
import { BookCard } from '@/components/BookCard';
import { BOOK_CATEGORIES } from '@/lib/constants';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export default function BooksPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [books, setBooks] = useState<BookType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [filters, setFilters] = useState({ category: 'all', subcategory: 'all' });
  const { toast } = useToast();

  const fetchBooks = async (location: { latitude: number; longitude: number } | null) => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/books');
      let fetchedBooks = response.data.books as BookType[];
      
      if (location) {
        fetchedBooks = fetchedBooks.map(book => ({
          ...book,
          distance: calculateDistance(
            location.latitude,
            location.longitude,
            book.location.coordinates[1],
            book.location.coordinates[0]
          ),
        })).sort((a, b) => (a.distance || 0) - (b.distance || 0));
      } else {
        fetchedBooks = fetchedBooks.sort((a, b) => 
          new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        );
      }
      setBooks(fetchedBooks);
    } catch (error) {
      console.error("Failed to fetch books", error);
      toast({ title: "Error", description: "Could not fetch books.", variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetLocation = useCallback(async () => {
    setLocationError(null);
    try {
      const location = await getUserLocation();
      setUserLocation(location);
      fetchBooks(location);
      toast({ title: 'Location Enabled!', description: 'Showing books closest to you first.' });
    } catch (error: any) {
      setLocationError(error.message);
      toast({ title: 'Location Error', description: "Could not get your location. Showing all books.", variant: 'destructive' });
      fetchBooks(null);
    }
  }, [toast]);

  useEffect(() => {
    handleGetLocation();
  }, [handleGetLocation]);
  
  const handleFilterChange = (type: 'category' | 'subcategory', value: string) => {
    if (type === 'category') {
      setFilters({ category: value, subcategory: 'all' });
    } else {
      setFilters(prev => ({ ...prev, [type]: value }));
    }
  };

  const filteredBooks = books.filter(book => {
    const categoryMatch = filters.category === 'all' || book.category === filters.category;
    const subcategoryMatch = filters.subcategory === 'all' || book.subcategory === filters.subcategory;
    return categoryMatch && subcategoryMatch;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-slate-50 dark:bg-slate-900 py-4 md:py-8 px-2 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold font-headline">Book Marketplace</h1>
            <p className="text-muted-foreground mt-2">Buy or rent used books from sellers near you.</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center bg-card p-4 rounded-lg shadow-sm border">
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Button onClick={() => router.push(user ? '/books/sell' : '/auth/login?redirect=/books/sell')} className="w-full sm:w-auto">
                Sell Your Book
              </Button>
              {user && (
                <Button onClick={() => router.push('/books/my-listings')} variant="outline" className="w-full sm:w-auto">
                  My Book Listings
                </Button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <Select value={filters.category} onValueChange={(v) => handleFilterChange('category', v)}>
                <SelectTrigger className="w-full sm:w-[200px]"><SelectValue placeholder="Category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {Object.keys(BOOK_CATEGORIES).map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={filters.subcategory} onValueChange={(v) => handleFilterChange('subcategory', v)} disabled={filters.category === 'all'}>
                <SelectTrigger className="w-full sm:w-[200px]"><SelectValue placeholder="Sub-category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sub-categories</SelectItem>
                  {filters.category !== 'all' && BOOK_CATEGORIES[filters.category as keyof typeof BOOK_CATEGORIES].map(sub => <SelectItem key={sub} value={sub}>{sub}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Show location status */}
          {/* {userLocation && (
            <div className="flex items-center justify-center gap-2 mb-4 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Showing books sorted by distance from your location</span>
            </div>
          )} */}
          {userLocation ? (
  <div className="flex items-center justify-center gap-2 mb-4 text-sm text-muted-foreground">
    <MapPin className="h-4 w-4" />
    <span>Showing books sorted by distance from your location</span>
  </div>
) : (
  <div className="flex items-center justify-center gap-2 mb-4 text-sm text-yellow-700 bg-yellow-100 border border-yellow-300 p-2 rounded-md">
    <MapPin className="h-4 w-4" />
    <span>
      <strong>Location not enabled:</strong> You won’t see how far books are from you unless you allow location access.
    </span>
  </div>
)}


          {isLoading ? (
            <div className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin mx-auto" /></div>
          ) : filteredBooks.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
              {filteredBooks.map(book => (
                <BookCard 
                  key={book._id} 
                  book={book} 
                  distance={book.distance}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
              <Book className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">No Books Found</h2>
              <p className="text-muted-foreground">No books match your current filters. Try a different category.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}