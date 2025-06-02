"use client";

import { useState, useEffect } from 'react';
import { placeholderReviews, placeholderCourses, placeholderUsers } from '@/lib/placeholder-data';
import type { Review, Course, User } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StarRating } from '@/components/ui/StarRating';
import { MoreHorizontal, Search, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // In a real app, fetch reviews from API
    setReviews(placeholderReviews);
  }, []);

  const filteredReviews = reviews.filter(review =>
    review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
    placeholderCourses.find(c => c.id === review.courseId)?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getModerationStatusBadge = (status?: 'pending' | 'approved' | 'rejected') => {
    if (!status) return <Badge variant="secondary">Unknown</Badge>;
    switch (status) {
      case 'pending': return <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200">Pending</Badge>;
      case 'approved': return <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-200">Approved</Badge>;
      case 'rejected': return <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-200">Rejected</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline">Review Moderation</h1>
      
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>All Reviews ({filteredReviews.length})</CardTitle>
          <CardDescription>Moderate student reviews for courses on the platform.</CardDescription>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search reviews by content, course, or user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full md:w-1/2 lg:w-1/3"
            />
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="min-w-[300px]">Comment</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.map(review => {
                const course = placeholderCourses.find(c => c.id === review.courseId);
                return (
                <TableRow key={review.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={review.userAvatar} alt={review.userName} data-ai-hint="user avatar small"/>
                        <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{review.userName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-xs truncate">{course?.title || 'Unknown Course'}</TableCell>
                  <TableCell><StarRating rating={review.rating} size={14} /></TableCell>
                  <TableCell className="text-sm text-muted-foreground line-clamp-2">{review.comment}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>{getModerationStatusBadge(review.moderationStatus)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {review.moderationStatus === 'pending' && (
                          <>
                            <DropdownMenuItem className="text-green-600 focus:text-green-700">
                              <CheckCircle className="mr-2 h-4 w-4" /> Approve Review
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600 focus:text-red-700">
                              <XCircle className="mr-2 h-4 w-4" /> Reject Review
                            </DropdownMenuItem>
                          </>
                        )}
                         {review.moderationStatus !== 'pending' && (
                             <DropdownMenuItem>
                                <MessageSquare className="mr-2 h-4 w-4" /> View Details
                            </DropdownMenuItem>
                         )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )})}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
