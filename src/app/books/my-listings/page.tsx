
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AppProviders';
import { useRouter } from 'next/navigation';
import type { Book } from '@/lib/types';
import axios from 'axios';
import { Loader2, BookOpen, PlusCircle } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

export default function MyBookListingsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [myBooks, setMyBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
        } finally {
          setIsLoading(false);
        }
      };
      fetchMyBooks();
    }
  }, [user, authLoading, router]);

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
          <Button onClick={() => router.push('/books/sell')}>
            <PlusCircle className="mr-2 h-4 w-4" /> List Another Book
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin mx-auto" /></div>
        ) : myBooks.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {myBooks.map(book => (
              <Card key={book.id} className="overflow-hidden">
                <Image src={book.imageUrl} alt={book.title} width={400} height={500} className="object-cover w-full h-48" />
                <CardContent className="p-4">
                  <h3 className="font-semibold line-clamp-2">{book.title}</h3>
                  <p className="text-sm text-muted-foreground">{book.author}</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-lg font-bold text-primary">
                      {book.listingType === 'sell' ? `₹${book.price}` : `₹${book.rentPricePerMonth}/mo`}
                    </p>
                    {getStatusBadge(book.approvalStatus)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">You haven't listed any books yet.</h2>
            <p className="text-muted-foreground">Click the button below to start selling or renting your books.</p>
             <Button onClick={() => router.push('/books/sell')} className="mt-4">
                List Your First Book
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
