
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { placeholderCourses } from "@/lib/placeholder-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Course } from '@/lib/types';
import { PlayCircle, BookOpen } from 'lucide-react';

interface EnrolledCourse extends Course {
  progress: number;
  completed?: boolean;
}

export default function MyCoursesPage() {
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Mock fetching enrolled courses
    const coursesWithProgress: EnrolledCourse[] = placeholderCourses.slice(0, 5).map((course, index) => ({
      ...course,
      progress: Math.floor(Math.random() * 100),
      completed: index < 2 // Mock some as completed
    }));
    setEnrolledCourses(coursesWithProgress);
  }, []);
  
  const activeCourses = enrolledCourses.filter(c => !c.completed);
  const completedCourses = enrolledCourses.filter(c => c.completed);

  if (!isClient) {
    return <div className="text-center py-10">Loading your courses...</div>;
  }

  return (
    <div className="space-y-8">
      {/* StudentDashboardHeaderNav is now in layout */}
      <h1 className="text-3xl font-bold font-headline">My Learning</h1>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-1/2 lg:w-1/3">
          <TabsTrigger value="active">Active ({activeCourses.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedCourses.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-6">
          {activeCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeCourses.map(course => (
                <Card key={course.id} className="flex flex-col shadow-sm hover:shadow-lg transition-shadow">
                  <CardHeader className="p-0 relative">
                    <Image 
                      src={course.imageUrl} 
                      alt={course.title} 
                      width={400} 
                      height={225} 
                      className="rounded-t-lg object-cover w-full aspect-video"
                      data-ai-hint={`${course.category} learning content`}
                    />
                  </CardHeader>
                  <CardContent className="p-4 flex flex-col flex-grow">
                    <h3 className="font-semibold text-lg line-clamp-2 mb-1">{course.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2">By {course.instructor}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1 mt-auto pt-2">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2 mb-3" />
                    <Button className="w-full" size="sm" asChild>
                      <Link href={`/courses/${course.id}/learn`}> {/* Placeholder learn link */}
                        <PlayCircle className="mr-2 h-4 w-4"/> Continue Learning
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">No Active Courses</h2>
                <p className="text-muted-foreground mb-4">
                    <Link href="/courses" className="text-primary hover:underline">Explore courses</Link> to enroll and start learning!
                </p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="completed" className="mt-6">
           {completedCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedCourses.map(course => (
                <Card key={course.id} className="flex flex-col shadow-sm hover:shadow-lg transition-shadow">
                  <CardHeader className="p-0 relative">
                    <Image 
                      src={course.imageUrl} 
                      alt={course.title} 
                      width={400} 
                      height={225} 
                      className="rounded-t-lg object-cover w-full aspect-video opacity-70"
                      data-ai-hint={`${course.category} finished course`}
                    />
                     <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">COMPLETED</span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 flex flex-col flex-grow">
                    <h3 className="font-semibold text-lg line-clamp-2 mb-1">{course.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2">By {course.instructor}</p>
                    <p className="text-xs text-muted-foreground mt-auto pt-2">Completed on: {new Date(course.lastUpdated || Date.now()).toLocaleDateString()}</p> {/* Mock completion date */}
                    <Button variant="outline" className="w-full mt-2" size="sm" asChild>
                      <Link href={`/dashboard/student/certificates`}> {/* Updated link to certificates page */}
                        View Certificate
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
             <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">No Completed Courses</h2>
                <p className="text-muted-foreground mb-4">Keep learning to earn certificates!</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
