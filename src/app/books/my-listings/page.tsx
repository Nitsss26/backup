
// "use client";

// import { useState, useEffect } from 'react';
// import { useAuth } from '@/components/AppProviders';
// import { useRouter } from 'next/navigation';
// import type { Book } from '@/lib/types';
// import axios from 'axios';
// import { Loader2, BookOpen, PlusCircle, Trash2, Edit } from 'lucide-react';
// import { Header } from '@/components/layout/Header';
// import { Footer } from '@/components/layout/Footer';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import Image from 'next/image';
// import { useToast } from '@/hooks/use-toast';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import Link from 'next/link';

// export default function MyBookListingsPage() {
//   const { user, isLoading: authLoading } = useAuth();
//   const router = useRouter();
//   const [myBooks, setMyBooks] = useState<Book[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const { toast } = useToast();

//   useEffect(() => {
//     if (!authLoading && !user) {
//       router.push('/auth/login?redirect=/books/my-listings');
//       return;
//     }

//     if (user) {
//       const fetchMyBooks = async () => {
//         setIsLoading(true);
//         try {
//           const response = await axios.get(`/api/books?sellerId=${user.id}`);
//           setMyBooks(response.data.books);
//         } catch (error) {
//           console.error("Failed to fetch user's book listings", error);
//           toast({ title: "Error", description: "Could not fetch your book listings.", variant: "destructive"});
//         } finally {
//           setIsLoading(false);
//         }
//       };
//       fetchMyBooks();
//     }
//   }, [user, authLoading, router, toast]);

//   const handleDelete = async (bookId: string) => {
//     try {
//       await axios.delete(`/api/books/${bookId}`);
//       setMyBooks(prevBooks => prevBooks.filter(book => book._id !== bookId));
//       toast({ title: "Success", description: "Book listing deleted successfully."});
//     } catch (error) {
//         toast({ title: "Error", description: "Failed to delete book listing.", variant: "destructive"});
//     }
//   }

//   const getStatusBadge = (status: 'pending' | 'approved' | 'rejected') => {
//     switch (status) {
//       case 'pending': return <Badge variant="warning">Pending</Badge>;
//       case 'approved': return <Badge variant="success">Approved</Badge>;
//       case 'rejected': return <Badge variant="destructive">Rejected</Badge>;
//       default: return <Badge variant="outline">Unknown</Badge>;
//     }
//   };

//   if (authLoading || (!user && !authLoading)) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Loader2 className="h-8 w-8 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <>
//       <Header />
//       <main className="container py-8 px-4 md:px-6">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold font-headline">My Book Listings</h1>
//           <Button onClick={() => router.push('/books/sell')}>
//             <PlusCircle className="mr-2 h-4 w-4" /> List Another Book
//           </Button>
//         </div>

//         {isLoading ? (
//           <div className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin mx-auto" /></div>
//         ) : myBooks.length > 0 ? (
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
//             {myBooks.map(book => (
//               <Card key={book._id} className="overflow-hidden flex flex-col w-full">
//                 <div className="relative w-full aspect-[3/4] overflow-hidden">
//                     <Image src={book.imageUrl} alt={book.title} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw" className="object-cover" />
//                 </div>
//                 <CardContent className="p-3 flex-grow">
//                   <h3 className="font-semibold line-clamp-2 text-sm">{book.title}</h3>
//                   <p className="text-xs text-muted-foreground">{book.author}</p>
//                   <div className="flex justify-between items-center mt-2">
//                     <p className="text-base font-bold text-primary">
//                       {book.listingType === 'sell' ? `₹${book.price}` : `₹${book.rentPricePerMonth}/month`}
//                     </p>
//                     {getStatusBadge(book.approvalStatus)}
//                   </div>
//                 </CardContent>
//                 <CardFooter className="p-2 border-t flex gap-2">
//                     <Button variant="outline" size="sm" className="w-full" asChild>
//                         <Link href={`/books/edit/${book._id}`}>
//                             <Edit className="mr-2 h-3.5 w-3.5" /> Edit
//                         </Link>
//                     </Button>
//                      <AlertDialog>
//                         <AlertDialogTrigger asChild>
//                             <Button variant="destructive" size="sm" className="w-full">
//                                 <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete
//                             </Button>
//                         </AlertDialogTrigger>
//                         <AlertDialogContent>
//                             <AlertDialogHeader>
//                             <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//                             <AlertDialogDescription>
//                                 This action cannot be undone. This will permanently delete your book listing for "{book.title}".
//                             </AlertDialogDescription>
//                             </AlertDialogHeader>
//                             <AlertDialogFooter>
//                             <AlertDialogCancel>Cancel</AlertDialogCancel>
//                             <AlertDialogAction onClick={() => handleDelete(book._id)}>
//                                 Yes, delete listing
//                             </AlertDialogAction>
//                             </AlertDialogFooter>
//                         </AlertDialogContent>
//                     </AlertDialog>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-16 border-2 border-dashed rounded-lg">
//             <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
//             <h2 className="text-xl font-semibold mb-2">You haven't listed any books yet.</h2>
//             <p className="text-muted-foreground">Click the button below to start selling or renting your books.</p>
//              <Button onClick={() => router.push('/books/sell')} className="mt-4">
//                 List Your First Book
//             </Button>
//           </div>
//         )}
//       </main>
//       <Footer />
//     </>
//   );
// }

"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AppProviders';
import { useRouter } from 'next/navigation';
import type { Book } from '@/lib/types';
import axios from 'axios';
import { Loader2, BookOpen, PlusCircle, Trash2, Edit } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from 'next/link';

export default function MyBookListingsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [myBooks, setMyBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login?redirect=/books/my-listings');
      return;
    }

    if (user) {
      const fetchMyBooks = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`/api/books?sellerId=${user.id}`);
          setMyBooks(response.data.books);
        } catch (error) {
          console.error("Failed to fetch user's book listings", error);
          toast({ title: "Error", description: "Could not fetch your book listings.", variant: "destructive"});
        } finally {
          setIsLoading(false);
        }
      };
      fetchMyBooks();
    }
  }, [user, authLoading, router, toast]);

  const handleDelete = async (bookId: string) => {
    try {
      await axios.delete(`/api/books/${bookId}`);
      setMyBooks(prevBooks => prevBooks.filter(book => book._id !== bookId));
      toast({ title: "Success", description: "Book listing deleted successfully."});
    } catch (error) {
        toast({ title: "Error", description: "Failed to delete book listing.", variant: "destructive"});
    }
  }

  const getStatusBadge = (status: 'pending' | 'approved' | 'rejected') => {
    switch (status) {
      case 'pending': return <Badge variant="warning">Pending</Badge>;
      case 'approved': return <Badge variant="success">Approved</Badge>;
      case 'rejected': return <Badge variant="destructive">Rejected</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  if (authLoading || (!user && !authLoading)) {
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold font-headline">My Book Listings</h1>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => router.push('/books/sell')}>
            <PlusCircle className="mr-2 h-4 w-4" /> List Another Book
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin mx-auto" /></div>
        ) : myBooks.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {myBooks.map(book => (
              <Card key={book._id} className="overflow-hidden flex flex-col w-full h-full">
                <div className="relative w-full aspect-[3/4] overflow-hidden">
                  <Image src={book.imageUrl} alt={book.title} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover" />
                </div>
                <CardContent className="p-4 flex-grow">
                  <h3 className="font-semibold line-clamp-2 text-sm">{book.title}</h3>
                  <p className="text-xs text-muted-foreground">{book.author}</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-base font-bold text-primary">
                      {book.listingType === 'sell' ? `₹${book.price}` : `₹${book.rentPricePerMonth}/month`}
                    </p>
                    {getStatusBadge(book.approvalStatus)}
                  </div>
                </CardContent>
                <CardFooter className="p-2 border-t flex gap-2">
                  <Button variant="outline" size="xc" className="w-full hover:bg-secondary text-foreground" asChild>
                    <Link href={`/books/edit/${book._id}`}>
                      <Edit className="mr-2 h-3.5 w-3.5" /> Edit
                    </Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="xs" className="w-full bg-red-500 hover:bg-red-600 text-white">
                        <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your book listing for "{book.title}".
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(book._id)}>
                          Yes, delete listing
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">You haven't listed any books yet.</h2>
            <p className="text-muted-foreground">Click the button below to start selling or renting your books.</p>
            <Button className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => router.push('/books/sell')}>
              List Your First Book
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
