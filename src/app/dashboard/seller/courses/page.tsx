"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { placeholderCourses } from '@/lib/placeholder-data';
import type { Course } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, PlusCircle, Edit2, Trash2, Eye, BarChart2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';


export default function ManageCoursesPage() {
  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
    // Mock fetching courses for the logged-in provider (e.g., user2)
    setMyCourses(placeholderCourses.slice(0, 5)); // Show a subset for this provider
  }, []);

  const handleDeleteCourse = (courseId: string) => {
    // Simulate API call
    setMyCourses(prev => prev.filter(c => c.id !== courseId));
    toast({
      title: "Course Deleted",
      description: "The course has been successfully deleted.",
    });
  };

  if (!isClient) {
    return <div className="text-center py-10">Loading your courses...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-headline">Manage Courses</h1>
        <Button asChild>
          <Link href="/dashboard/seller/courses/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Course
          </Link>
        </Button>
      </div>

      {myCourses.length === 0 ? (
         <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Courses Yet</h2>
          <p className="text-muted-foreground mb-4">Start creating courses to share your knowledge and earn.</p>
          <Button asChild>
            <Link href="/dashboard/seller/courses/new">Create Your First Course</Link>
          </Button>
        </div>
      ) : (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Your Courses ({myCourses.length})</CardTitle>
          <CardDescription>View, edit, or delete your course listings.</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myCourses.map(course => (
                <TableRow key={course.id}>
                  <TableCell>
                    <Image 
                        src={course.imageUrl} 
                        alt={course.title} 
                        width={60} 
                        height={34} 
                        className="rounded object-cover aspect-video"
                        data-ai-hint={`${course.category} course small`}
                    />
                  </TableCell>
                  <TableCell className="font-medium max-w-xs truncate">
                    <Link href={`/courses/${course.id}`} className="hover:underline" title={course.title}>
                        {course.title}
                    </Link>
                  </TableCell>
                  <TableCell>{course.category}</TableCell>
                  <TableCell>${course.price.toFixed(2)}</TableCell>
                  <TableCell>{course.studentsEnrolled?.toLocaleString() || 'N/A'}</TableCell>
                  <TableCell>{course.rating.toFixed(1)}</TableCell>
                  <TableCell>
                    <Badge variant={course.id.includes('1') ? "default" : "secondary"} className={course.id.includes('1') ? "bg-green-500 hover:bg-green-600" : ""}>
                        {course.id.includes('1') ? 'Published' : 'Draft'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/courses/${course.id}`} className="flex items-center">
                            <Eye className="mr-2 h-4 w-4" /> View Course
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/seller/courses/${course.id}/edit`} className="flex items-center">
                            <Edit2 className="mr-2 h-4 w-4" /> Edit Course
                          </Link>
                        </DropdownMenuItem>
                         <DropdownMenuItem asChild>
                          <Link href={`/dashboard/seller/analytics/${course.id}`} className="flex items-center"> {/* Placeholder */}
                            <BarChart2 className="mr-2 h-4 w-4" /> View Analytics 
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600 focus:bg-red-50 focus:text-red-700 flex items-center">
                              <Trash2 className="mr-2 h-4 w-4" /> Delete Course
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the course "{course.title}".
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteCourse(course.id)} className="bg-red-600 hover:bg-red-700">
                                Yes, delete course
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      )}
    </div>
  );
}
