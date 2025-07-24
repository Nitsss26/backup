
"use client";

import { useState, useEffect } from 'react';
import type { Book } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import Image from 'next/image';
import { CheckCircle, XCircle, Clock, BookOpen } from 'lucide-react';

export function AdminBookListings() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('/api/books?status=all');
        setBooks(response.data.books);
      } catch (error) {
        toast({ title: "Error", description: "Failed to fetch book listings.", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, [toast]);

  const handleApproval = async (bookId: string, status: 'approved' | 'rejected') => {
    try {
      await axios.put(`/api/books/${bookId}/approve`, { status });
      setBooks(prevBooks => prevBooks.map(book => 
        book._id === bookId ? { ...book, approvalStatus: status } : book
      ));
      toast({ title: "Success", description: `Book status updated to ${status}.` });
    } catch (error) {
      toast({ title: "Error", description: "Failed to update book status.", variant: "destructive" });
    }
  };

  const getStatusBadge = (status: 'pending' | 'approved' | 'rejected') => {
    switch (status) {
      case 'pending': return <Badge variant="warning"><Clock className="mr-1 h-3 w-3"/>Pending</Badge>;
      case 'approved': return <Badge variant="success"><CheckCircle className="mr-1 h-3 w-3"/>Approved</Badge>;
      case 'rejected': return <Badge variant="destructive"><XCircle className="mr-1 h-3 w-3"/>Rejected</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book Listing Approval</CardTitle>
        <CardDescription>Review and approve user-submitted book listings.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? <p>Loading book listings...</p> : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book</TableHead>
                <TableHead>Seller</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book._id}>
                  <TableCell className="flex items-center gap-2">
                    <Image src={book.imageUrl} alt={book.title} width={40} height={50} className="rounded object-cover" />
                    <div>
                      <p className="font-medium">{book.title}</p>
                      <p className="text-xs text-muted-foreground">{book.author}</p>
                    </div>
                  </TableCell>
                  <TableCell>{book.seller.name}</TableCell>
                  <TableCell>{book.listingType === 'sell' ? 'For Sale' : 'For Rent'}</TableCell>
                  <TableCell>
                    {book.listingType === 'sell' ? `₹${book.price}` : `₹${book.rentPricePerMonth}/mo`}
                  </TableCell>
                  <TableCell>{getStatusBadge(book.approvalStatus)}</TableCell>
                  <TableCell className="space-x-2">
                    {book.approvalStatus === 'pending' && (
                      <>
                        <Button size="sm" variant="success" onClick={() => handleApproval(book._id, 'approved')}>Approve</Button>
                        <Button size="sm" variant="destructive" onClick={() => handleApproval(book._id, 'rejected')}>Reject</Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
