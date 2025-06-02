
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { placeholderCourses } from '@/lib/placeholder-data';
import type { Course } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Search, CheckCircle, XCircle, Eye, Edit, ShieldQuestion, ShieldCheck, ShieldAlert, PlusCircle } from 'lucide-react';
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const [courseToModerate, setCourseToModerate] = useState<Course | null>(null);
  const [moderationAction, setModerationAction] = useState<'approved' | 'rejected' | null>(null);


  useEffect(() => {
    // In a real app, fetch courses from API
    setCourses(placeholderCourses);
  }, []);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (course.providerInfo?.name || course.instructor).toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getApprovalStatusBadge = (status?: 'pending' | 'approved' | 'rejected') => {
    if (!status) return <Badge variant="secondary">Unknown</Badge>;
    switch (status) {
      case 'pending': return <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-300"><ShieldQuestion className="mr-1 h-3 w-3"/>Pending</Badge>;
      case 'approved': return <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-200 border-green-300"><ShieldCheck className="mr-1 h-3 w-3"/>Approved</Badge>;
      case 'rejected': return <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-200 border-red-300"><ShieldAlert className="mr-1 h-3 w-3"/>Rejected</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const confirmCourseApprovalAction = () => {
    if (!courseToModerate || !moderationAction) return;
    
    setCourses(prevCourses => prevCourses.map(c => c.id === courseToModerate.id ? { ...c, approvalStatus: moderationAction } : c));
    toast({
        title: `Course ${moderationAction === 'approved' ? 'Approved' : 'Rejected'}`,
        description: `Course "${courseToModerate.title}" has been ${moderationAction}.`
    });
    setCourseToModerate(null);
    setModerationAction(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold font-headline">Course Management</h1>
        <Button variant="outline" disabled> {/* Placeholder: Admin might not create courses directly */}
            <PlusCircle className="mr-2 h-4 w-4"/> Add Course Manually
        </Button>
      </div>
      
      <Card className="shadow-lg border">
        <CardHeader>
          <CardTitle className="text-2xl">All Courses ({filteredCourses.length})</CardTitle>
          <CardDescription>Manage course listings and approval statuses. Approve or reject courses submitted by sellers.</CardDescription>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search courses by title, seller, category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full md:w-2/3 lg:w-1/2 bg-background"
            />
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {filteredCourses.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Seller</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.map(course => (
                  <TableRow key={course.id} className="hover:bg-muted/30">
                    <TableCell>
                      <Image 
                          src={course.imageUrl} 
                          alt={course.title} 
                          width={60} 
                          height={34} 
                          className="rounded object-cover aspect-video"
                          data-ai-hint={`${course.category} course listing admin`}
                      />
                    </TableCell>
                    <TableCell className="font-medium max-w-xs truncate">
                      <Link href={`/courses/${course.id}`} className="hover:underline" title={course.title}>
                          {course.title}
                      </Link>
                    </TableCell>
                    <TableCell>{course.providerInfo?.name || course.instructor}</TableCell>
                    <TableCell>{course.category}</TableCell>
                    <TableCell>₹{course.price.toLocaleString()}</TableCell>
                    <TableCell>{getApprovalStatusBadge(course.approvalStatus)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/courses/${course.id}`} className="flex items-center">
                              <Eye className="mr-2 h-4 w-4" /> View Course Page
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem disabled> {/* Admin might need a different edit view than seller */}
                            <Edit className="mr-2 h-4 w-4" /> Edit Course Details
                          </DropdownMenuItem>
                          {course.approvalStatus === 'pending' && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => {setCourseToModerate(course); setModerationAction('approved')}} className="text-green-600 focus:text-green-700 focus:bg-green-50">
                                <CheckCircle className="mr-2 h-4 w-4" /> Approve Course
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {setCourseToModerate(course); setModerationAction('rejected')}} className="text-red-600 focus:text-red-700 focus:bg-red-50">
                                <XCircle className="mr-2 h-4 w-4" /> Reject Course
                              </DropdownMenuItem>
                            </>
                          )}
                           <DropdownMenuSeparator />
                           <DropdownMenuItem disabled className="text-orange-600 focus:text-orange-700 focus:bg-orange-50">
                            <ShieldAlert className="mr-2 h-4 w-4" /> Unpublish Course
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-10 text-muted-foreground">
                No courses found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>

      {courseToModerate && moderationAction && (
        <AlertDialog open onOpenChange={() => {setCourseToModerate(null); setModerationAction(null)}}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Course Moderation</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to <span className={cn("font-semibold", moderationAction === 'approved' ? "text-green-600" : "text-red-600")}>{moderationAction}</span> the course "{courseToModerate.title}"?
                This will update its visibility on the marketplace.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => {setCourseToModerate(null); setModerationAction(null)}}>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmCourseApprovalAction}
                className={cn(moderationAction === 'approved' ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700")}
              >
                Yes, {moderationAction === 'approved' ? 'Approve' : 'Reject'} Course
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

    </div>
  );
}
