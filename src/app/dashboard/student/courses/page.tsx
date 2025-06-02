
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress"; // Progress removed
import { placeholderCourses, placeholderOrders } from "@/lib/placeholder-data"; // Added placeholderOrders
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Course } from '@/lib/types';
import { Eye, BookOpen, Info, ShoppingBag } from 'lucide-react'; // Replaced PlayCircle with Info or Eye
import { useAuth } from '@/components/AppProviders'; // Import useAuth

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
      // Mock fetching purchased courses for the logged-in student
      const studentOrders = placeholderOrders.filter(order => order.userId === user.id && order.status === 'completed');
      const courses: PurchasedCourse[] = studentOrders.flatMap(order => 
        order.items.map(courseItem => ({
          ...courseItem,
          purchaseDate: order.orderDate,
          orderId: order.id,
        }))
      );
      // Remove duplicates if a course was bought multiple times (though unlikely in this model)
      const uniqueCourses = Array.from(new Map(courses.map(c => [c.id, c])).values());
      setPurchasedCourses(uniqueCourses);
    }
  }, [user]);
  

  if (!isClient) {
    return <div className="text-center py-10">Loading your courses...</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline">My Purchased Courses</h1>
      <CardDescription>You have purchased {purchasedCourses.length} course(s). Access instructions are typically provided by the seller via email upon purchase.</CardDescription>

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
                  data-ai-hint={`${course.category} purchased course content`}
                />
              </CardHeader>
              <CardContent className="p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-lg line-clamp-2 mb-1">{course.title}</h3>
                <p className="text-xs text-muted-foreground mb-1">By {course.providerInfo?.name || course.instructor}</p>
                <p className="text-xs text-muted-foreground mb-3">Purchased on: {course.purchaseDate ? new Date(course.purchaseDate).toLocaleDateString() : 'N/A'}</p>
                
                {/* Removed Progress Bar */}
                {/* <div className="flex items-center justify-between text-xs text-muted-foreground mb-1 mt-auto pt-2">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2 mb-3" /> */}
                
                <div className="mt-auto space-y-2">
                    <Button className="w-full" size="sm" asChild variant="default">
                    <Link href={`/courses/${course.id}`}> 
                        <Eye className="mr-2 h-4 w-4"/> View Course Details
                    </Link>
                    </Button>
                     <Button className="w-full" size="sm" asChild variant="outline">
                      <Link href={`/dashboard/student/orders`}> {/* Link to order history for specific order could be added */}
                        <ShoppingBag className="mr-2 h-4 w-4"/> View Purchase
                      </Link>
                    </Button>
                    <p className="text-xs text-muted-foreground text-center pt-1">Access course content via seller's instructions.</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg bg-card">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Purchased Courses Yet</h2>
            <p className="text-muted-foreground mb-6">
                Your purchased courses will appear here.
            </p>
             <Button asChild size="lg">
                <Link href="/courses" className="text-base">Explore Courses to Purchase</Link>
            </Button>
        </div>
      )}
    </div>
  );
}
