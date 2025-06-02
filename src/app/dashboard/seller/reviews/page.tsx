
"use client";

import { useState, useEffect } from 'react';
import { placeholderReviews, placeholderCourses } from '@/lib/placeholder-data';
import type { Review, Course } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarRating } from "@/components/ui/StarRating";
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, MessageSquareReply } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function SellerReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>("all");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Mock: filter reviews for courses by this seller (assuming sellerId exists on course)
    // For now, just use all reviews.
    const sellerCourseIds = placeholderCourses.slice(0,5).map(c => c.id); // Mock seller courses
    setCourses(placeholderCourses.slice(0,5));
    setReviews(placeholderReviews.filter(r => sellerCourseIds.includes(r.courseId)));
  }, []);

  const filteredReviews = selectedCourse === "all" 
    ? reviews 
    : reviews.filter(review => review.courseId === selectedCourse);

  if (!isClient) {
    return <div className="text-center py-10">Loading reviews...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold font-headline">Student Reviews</h1>
        <div className="flex gap-2 w-full md:w-auto">
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filter by course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              {courses.map(course => (
                <SelectItem key={course.id} value={course.id}>{course.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* Could add sort by rating/date here */}
        </div>
      </div>

      {filteredReviews.length === 0 ? (
         <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <MessageSquareReply className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Reviews Yet</h2>
          <p className="text-muted-foreground mb-4">
            {selectedCourse === "all" ? "You haven't received any reviews for your courses." : "No reviews for this specific course yet."}
          </p>
        </div>
      ) : (
      <div className="space-y-6">
        {filteredReviews.map(review => (
          <Card key={review.id} className="shadow-sm">
            <CardHeader className="flex flex-row items-start gap-4 p-4 md:p-6">
              <Avatar className="h-10 w-10">
                <AvatarImage src={review.userAvatar} alt={review.userName} data-ai-hint="user avatar"/>
                <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <CardTitle className="text-base font-semibold">{review.userName}</CardTitle>
                    <StarRating rating={review.rating} size={16} />
                </div>
                <p className="text-xs text-muted-foreground">
                  Reviewed course: <span className="font-medium text-foreground">{placeholderCourses.find(c=>c.id === review.courseId)?.title || 'Unknown Course'}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0">
              <p className="text-sm text-foreground mb-3">{review.comment}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                <div>
                  <span>Helpful: {review.helpfulVotes}</span> | <span>Unhelpful: {review.unhelpfulVotes}</span>
                </div>
                {/* Placeholder for moderation actions */}
                {/* <Button variant="ghost" size="sm" className="text-xs">Moderate</Button> */}
              </div>
              
              {/* Reply Section Placeholder */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="reply">
                  <AccordionTrigger className="text-sm py-2 hover:no-underline">
                    <div className="flex items-center text-primary">
                      <MessageSquareReply className="h-4 w-4 mr-1"/> Reply to this review
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2">
                    <Textarea placeholder={`Write your public reply to ${review.userName}...`} className="mb-2 text-sm" rows={2}/>
                    <Button size="sm">Post Reply</Button>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

            </CardContent>
          </Card>
        ))}
      </div>
      )}
      {/* Add Pagination if many reviews */}
    </div>
  );
}
