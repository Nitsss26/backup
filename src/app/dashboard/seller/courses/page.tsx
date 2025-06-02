
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getSellerCourses, placeholderCourses } from '@/lib/placeholder-data'; // Using getSellerCourses
import type { Course } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, PlusCircle, Edit2, Trash2, Eye, BarChart2, BookOpen } from 'lucide-react'; // Added BookOpen
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
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/components/AppProviders';
import { cn } from '@/lib/utils';


export default function ManageCoursesPage() {
  const { user } = useAuth();
  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
    if (user) {
      setMyCourses(getSellerCourses(user.id)); 
    } else {
      // Fallback if user is not available, though layout should prevent this.
      setMyCourses(placeholderCourses.filter(c => c.sellerId === 'user5').slice(0, 5)); // Example for a specific seller
    }
  }, [user]);

  const handleDeleteCourse = (courseId: string) => {
    setMyCourses(prev => prev.filter(c => c.id !== courseId));
    toast({
      title: "Course Deleted",
      description: "The course has been successfully deleted (mock action).",
      variant: "destructive"
    });
  };

  const getStatusBadge = (status?: 'pending' | 'approved' | 'rejected') => {
    if (!status) return <Badge variant="outline">Unknown</Badge>;
    switch (status) {
      case 'pending': return <Badge variant="warning">Pending Review</Badge>;
      case 'approved': return <Badge variant="success">Published</Badge>;
      case 'rejected': return <Badge variant="destructive">Rejected</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (!isClient || !user) {
    return <div className="text-center py-10">Loading your courses...</div>;
  }

  return (
    <div className="space-y-8 w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold font-headline">Manage Your Courses</h1>
        <Button asChild>
          <Link href="/dashboard/seller/courses/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Course
          </Link>
        </Button>
      </div>

      {myCourses.length === 0 ? (
         <div className="text-center py-16 border-2 border-dashed border-border rounded-lg bg-card mt-8">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2 text-foreground">No Courses Yet</h2>
          <p className="text-muted-foreground mb-6">
            Ready to share your expertise? Create your first course and reach learners worldwide.
          </p>
          <Button asChild size="lg">
            <Link href="/dashboard/seller/courses/new" className="text-base">Create Your First Course</Link>
          </Button>
        </div>
      ) : (
      <Card className="shadow-md border">
        <CardHeader>
          <CardTitle>Your Listed Courses ({myCourses.length})</CardTitle>
          <CardDescription>View, edit, or delete your course listings and monitor their status.</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px] pl-6">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price (₹)</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myCourses.map(course => (
                <TableRow key={course.id} className="hover:bg-muted/10">
                  <TableCell className="pl-6">
                    <Image 
                        src={course.imageUrl} 
                        alt={course.title} 
                        width={60} 
                        height={34} 
                        className="rounded object-cover aspect-video border"
                        data-ai-hint={`${course.category} course small manage list`}
                    />
                  </TableCell>
                  <TableCell className="font-medium max-w-xs truncate text-foreground">
                    <Link href={`/courses/${course.id}`} className="hover:underline text-primary" title={course.title}>
                        {course.title}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{course.category}</TableCell>
                  <TableCell className="text-sm">₹{course.price.toLocaleString('en-IN')}</TableCell>
                  <TableCell className="text-sm">{course.studentsEnrolled?.toLocaleString() || '0'}</TableCell>
                  <TableCell>{getStatusBadge(course.approvalStatus)}</TableCell>
                  <TableCell className="text-right pr-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/courses/${course.id}`} className="flex items-center">
                            <Eye className="mr-2 h-4 w-4" /> View Public Page
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/seller/courses/${course.id}/edit`} className="flex items-center">
                            <Edit2 className="mr-2 h-4 w-4" /> Edit Course
                          </Link>
                        </DropdownMenuItem>
                         <DropdownMenuItem asChild disabled> {/* Link to be implemented later */}
                          <Link href={`#`} className="flex items-center"> 
                            <BarChart2 className="mr-2 h-4 w-4" /> View Analytics 
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem 
                                onSelect={(e) => e.preventDefault()} 
                                className={cn(
                                    "flex items-center text-destructive-foreground focus:text-destructive-foreground focus:bg-destructive/10",
                                    "hover:!bg-destructive/20" // Ensure hover styles are applied correctly for destructive
                                )}
                            >
                              <Trash2 className="mr-2 h-4 w-4 text-destructive" /> Delete Course
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the course "{course.title}" and all of its data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteCourse(course.id)} className="bg-destructive hover:bg-destructive/90">
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
