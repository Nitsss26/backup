
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { placeholderCourses, placeholderOrders } from "@/lib/placeholder-data"; 
import type { Course } from '@/lib/types';
import { Eye, BookOpen, Info, ShoppingBag, ExternalLink } from 'lucide-react'; 
import { useAuth } from '@/components/AppProviders'; 

interface PurchasedCourse extends Course {
  purchaseDate?: string;
  orderId?: string;
}

export default function MyCoursesPage() {
  const { user } = useAuth();
  const [purchasedCourses, setPurchasedCourses] = useState<PurchasedCourse[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (user) {
      const studentOrders = placeholderOrders.filter(order => order.userId === user.id && order.status === 'completed');
      const courses: PurchasedCourse[] = studentOrders.flatMap(order => 
        order.items.map(courseItem => ({
          ...courseItem,
          purchaseDate: order.orderDate,
          orderId: order.id,
        }))
      );
      const uniqueCourses = Array.from(new Map(courses.map(c => [c.id, c])).values());
      setPurchasedCourses(uniqueCourses);
    }
  }, [user]);
  

  if (!isClient) {
    return <div className="text-center py-10">Loading your courses...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
            <h1 className="text-3xl font-bold font-headline">My Purchased Courses</h1>
            <CardDescription className="mt-1">You have purchased {purchasedCourses.length} course(s).</CardDescription>
        </div>
        <Button variant="outline" asChild className="mt-3 sm:mt-0">
          <Link href="/courses">Explore More Courses</Link>
        </Button>
      </div>
      
      <Card className="bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 p-4 shadow-sm">
        <div className="flex items-start gap-3">
            <Info className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0"/>
            <div>
                <h4 className="font-semibold text-blue-700 dark:text-blue-300">How to Access Your Courses</h4>
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                    After purchasing a course on {process.env.NEXT_PUBLIC_APP_NAME || "EdTechCart"}, the course seller is responsible for providing you with access instructions. This usually includes links to their learning platform, access keys, or enrollment details sent to your registered email.
                    Please check your email (including spam/junk folders) for communications from the seller or {process.env.NEXT_PUBLIC_APP_NAME || "EdTechCart"} on their behalf.
                </p>
            </div>
        </div>
      </Card>


      {purchasedCourses.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {purchasedCourses.map(course => (
            <Card key={course.id} className="flex flex-col shadow-sm hover:shadow-lg transition-shadow border">
              <CardHeader className="p-0 relative">
                <Image 
                  src={course.imageUrl} 
                  alt={course.title} 
                  width={400} 
                  height={225} 
                  className="rounded-t-lg object-cover w-full aspect-video"
                  data-ai-hint={`${course.category} purchased course content student dashboard`}
                />
              </CardHeader>
              <CardContent className="p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-lg line-clamp-2 mb-1 text-foreground">{course.title}</h3>
                <p className="text-xs text-muted-foreground mb-1">By {course.providerInfo?.name || course.instructor}</p>
                <p className="text-xs text-muted-foreground mb-3">Purchased on: {course.purchaseDate ? new Date(course.purchaseDate).toLocaleDateString() : 'N/A'}</p>
                
                <div className="mt-auto space-y-2 pt-3">
                    <Button className="w-full" size="sm" asChild variant="default">
                    <Link href={`/courses/${course.id}`}> 
                        <Eye className="mr-2 h-4 w-4"/> View Course Details
                    </Link>
                    </Button>
                     <Button className="w-full" size="sm" asChild variant="outline">
                      <Link href={`/dashboard/student/orders`}> 
                        <ShoppingBag className="mr-2 h-4 w-4"/> View Purchase Info
                      </Link>
                    </Button>
                    {course.providerInfo?.websiteUrl && ( // Assuming providerInfo might have a website/platform URL
                         <Button className="w-full" size="sm" asChild variant="outline">
                            <Link href={course.providerInfo.websiteUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4"/> Go to Seller's Platform
                            </Link>
                        </Button>
                    )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed border-border rounded-lg bg-card">
            <Image src="https://placehold.co/300x200/EBF4FF/3B82F6?text=No+Courses+Yet" alt="No courses illustration" width={300} height={200} className="mx-auto mb-6 rounded-md" data-ai-hint="empty state bookshelf education"/>
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2 text-foreground">No Purchased Courses Yet</h2>
            <p className="text-muted-foreground mb-6">
                Your purchased courses will appear here once you enroll.
            </p>
             <Button asChild size="lg">
                <Link href="/courses" className="text-base">Explore Courses to Purchase</Link>
            </Button>
        </div>
      )}
    </div>
  );
}
