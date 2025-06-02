
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
import { MoreHorizontal, Search, CheckCircle, XCircle, MessageSquare as MessageSquareIcon, Trash2, Filter, Download, Eye } from 'lucide-react'; // Renamed MessageSquare to MessageSquareIcon
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const [reviewToModerate, setReviewToModerate] = useState<Review | null>(null);
  const [moderationAction, setModerationAction] = useState<'approved' | 'rejected' | 'deleted' | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all'); // 'all', 'pending', 'approved', 'rejected'


  useEffect(() => {
    setReviews(placeholderReviews);
  }, []);

  const filteredReviews = reviews.filter(review =>
    (review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
    placeholderCourses.find(c => c.id === review.courseId)?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.userName.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterStatus === 'all' || review.moderationStatus === filterStatus)
  );

  const getModerationStatusBadge = (status?: 'pending' | 'approved' | 'rejected') => {
    if (!status) return <Badge variant="info">Unknown</Badge>;
    switch (status) {
      case 'pending': return <Badge variant="warning"><MessageSquareIcon />Pending</Badge>;
      case 'approved': return <Badge variant="success"><CheckCircle />Approved</Badge>;
      case 'rejected': return <Badge variant="destructive"><XCircle />Rejected</Badge>;
      default: return <Badge variant="info">Unknown</Badge>;
    }
  };

  const confirmModerationAction = () => {
    if (!reviewToModerate || !moderationAction) return;

    if (moderationAction === 'deleted') {
        setReviews(prevReviews => prevReviews.filter(r => r.id !== reviewToModerate.id));
        toast({ title: "Review Deleted", description: `Review by ${reviewToModerate.userName} has been deleted.`, variant: 'destructive'});
    } else {
        setReviews(prevReviews => prevReviews.map(r => r.id === reviewToModerate.id ? { ...r, moderationStatus: moderationAction } : r));
        toast({
            title: `Review ${moderationAction === 'approved' ? 'Approved' : 'Rejected'}`,
            description: `Review by ${reviewToModerate.userName} has been ${moderationAction}.`,
            variant: moderationAction === 'rejected' ? 'destructive' : 'success',
        });
    }
    setReviewToModerate(null);
    setModerationAction(null);
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-xl border-l-4 border-primary">
        <CardHeader className="flex flex-row items-center gap-4">
             <div className="p-3 bg-primary/10 rounded-md">
                 <MessageSquareIcon className="h-8 w-8 text-primary"/>
            </div>
            <div>
                <CardTitle className="text-2xl font-headline text-primary">Review Moderation</CardTitle>
                <CardDescription>Moderate student reviews for courses. Approve, reject, or delete reviews. Total Reviews: {reviews.length}</CardDescription>
            </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="mt-4 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                placeholder="Search by content, course, or user..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full bg-background"
                />
            </div>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="flex h-10 w-full md:w-auto rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardContent className="p-0">
          {filteredReviews.length > 0 ? (
            <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">User</TableHead>
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
                        <Avatar className="h-9 w-9 border">
                          <AvatarImage src={review.userAvatar} alt={review.userName} data-ai-hint="student avatar admin review list"/>
                          <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-foreground">{review.userName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate" title={course?.title}>
                        {course?.title || 'Unknown Course'}
                    </TableCell>
                    <TableCell><StarRating rating={review.rating} size={16} /></TableCell>
                    <TableCell className="text-sm text-muted-foreground line-clamp-2" title={review.comment}>{review.comment}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{getModerationStatusBadge(review.moderationStatus)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Review Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator/>
                          {review.moderationStatus !== 'approved' && (
                            <DropdownMenuItem onClick={() => {setReviewToModerate(review); setModerationAction('approved')}} className="text-success-foreground focus:text-success-foreground focus:bg-success/20">
                                <CheckCircle className="mr-2 h-4 w-4 text-success" /> Approve Review
                            </DropdownMenuItem>
                          )}
                           {review.moderationStatus !== 'rejected' && (
                            <DropdownMenuItem onClick={() => {setReviewToModerate(review); setModerationAction('rejected')}} className="text-destructive-foreground focus:text-destructive-foreground focus:bg-destructive/20">
                                <XCircle className="mr-2 h-4 w-4 text-destructive" /> Reject Review
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem disabled> 
                              <Eye className="mr-2 h-4 w-4" /> View Full Review
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => {setReviewToModerate(review); setModerationAction('deleted')}} className="text-destructive-foreground focus:text-destructive-foreground focus:bg-destructive/20">
                            <Trash2 className="mr-2 h-4 w-4 text-destructive" /> Delete Review
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )})}
              </TableBody>
            </Table>
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
                <MessageSquareIcon className="h-16 w-16 mx-auto mb-4 text-border"/>
                <p className="font-semibold text-lg">No reviews found matching your criteria.</p>
                <p className="text-sm">Try adjusting your search or filters.</p>
                 <Image src="https://placehold.co/400x250/EBF4FF/3B82F6?text=No+Reviews+Illustration" alt="Illustration for no reviews found" width={400} height={250} className="mt-6 mx-auto rounded-md" data-ai-hint="empty state no data reviews list"/>
            </div>
          )}
        </CardContent>
        <CardFooter className="border-t pt-4">
            <p className="text-xs text-muted-foreground">Showing {filteredReviews.length} of {reviews.length} total reviews.</p>
            <Button variant="outline" disabled className="ml-auto"><Download className="mr-2 h-4 w-4"/> Export Reviews</Button>
        </CardFooter>
      </Card>

       {reviewToModerate && moderationAction && (
        <AlertDialog open onOpenChange={() => {setReviewToModerate(null); setModerationAction(null)}}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Review Moderation</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to <span className={cn("font-semibold", moderationAction === 'approved' ? "text-success" : moderationAction === 'rejected' ? "text-warning" : "text-destructive" )}>{moderationAction}</span> the review by "{reviewToModerate.userName}"?
                {moderationAction === 'deleted' ? " This action cannot be undone." : ""}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => {setReviewToModerate(null); setModerationAction(null)}}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmModerationAction}
                className={cn(moderationAction === 'approved' ? "bg-success hover:bg-success/90" : moderationAction === 'rejected' ? "bg-warning hover:bg-warning/90 text-warning-foreground" : "bg-destructive hover:bg-destructive/90")}
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
