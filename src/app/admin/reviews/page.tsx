
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
import { MoreHorizontal, Search, CheckCircle, XCircle, MessageSquare, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';


export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const [reviewToModerate, setReviewToModerate] = useState<Review | null>(null);
  const [moderationAction, setModerationAction] = useState<'approved' | 'rejected' | 'deleted' | null>(null);


  useEffect(() => {
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
      case 'pending': return <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-300"><MessageSquare className="mr-1 h-3 w-3"/>Pending</Badge>;
      case 'approved': return <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-200 border-green-300"><CheckCircle className="mr-1 h-3 w-3"/>Approved</Badge>;
      case 'rejected': return <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-200 border-red-300"><XCircle className="mr-1 h-3 w-3"/>Rejected</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const confirmModerationAction = () => {
    if (!reviewToModerate || !moderationAction) return;

    if (moderationAction === 'deleted') {
        setReviews(prevReviews => prevReviews.filter(r => r.id !== reviewToModerate.id));
        toast({ title: "Review Deleted", description: `Review by ${reviewToModerate.userName} has been deleted.`});
    } else {
        setReviews(prevReviews => prevReviews.map(r => r.id === reviewToModerate.id ? { ...r, moderationStatus: moderationAction } : r));
        toast({
            title: `Review ${moderationAction === 'approved' ? 'Approved' : 'Rejected'}`,
            description: `Review by ${reviewToModerate.userName} has been ${moderationAction}.`
        });
    }
    setReviewToModerate(null);
    setModerationAction(null);
  };


  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline">Review Moderation</h1>
      
      <Card className="shadow-lg border">
        <CardHeader>
          <CardTitle className="text-2xl">All Reviews ({filteredReviews.length})</CardTitle>
          <CardDescription>Moderate student reviews for courses. Approve, reject, or delete reviews as necessary.</CardDescription>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search reviews by content, course, or user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full md:w-2/3 lg:w-1/2 bg-background"
            />
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {filteredReviews.length > 0 ? (
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
                  <TableRow key={review.id} className="hover:bg-muted/30">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={review.userAvatar} alt={review.userName} data-ai-hint="student avatar review"/>
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
                              <DropdownMenuItem onClick={() => {setReviewToModerate(review); setModerationAction('approved')}} className="text-green-600 focus:text-green-700 focus:bg-green-50">
                                <CheckCircle className="mr-2 h-4 w-4" /> Approve Review
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {setReviewToModerate(review); setModerationAction('rejected')}} className="text-red-600 focus:text-red-700 focus:bg-red-50">
                                <XCircle className="mr-2 h-4 w-4" /> Reject Review
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem onClick={() => {/* Open a modal with full review */}} disabled>
                              <MessageSquare className="mr-2 h-4 w-4" /> View Full Review
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => {setReviewToModerate(review); setModerationAction('deleted')}} className="text-red-600 focus:text-red-700 focus:bg-red-50">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete Review
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )})}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-10 text-muted-foreground">
                No reviews found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>

       {reviewToModerate && moderationAction && (
        <AlertDialog open onOpenChange={() => {setReviewToModerate(null); setModerationAction(null)}}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Review Moderation</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to <span className={cn("font-semibold", moderationAction === 'approved' ? "text-green-600" : "text-red-600")}>{moderationAction}</span> the review by "{reviewToModerate.userName}"?
                {moderationAction === 'deleted' ? " This action cannot be undone." : ""}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => {setReviewToModerate(null); setModerationAction(null)}}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmModerationAction}
                className={cn(moderationAction === 'approved' ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700")}
              >
                Yes, {moderationAction?.charAt(0).toUpperCase() + moderationAction!.slice(1)} Review
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
