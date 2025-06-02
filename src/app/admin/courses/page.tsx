
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
import { MoreHorizontal, Search, CheckCircle, XCircle, Eye, Edit, ShieldQuestion, ShieldCheck, ShieldAlert, PlusCircle, Filter, Download, BookOpen as BookOpenIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel
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

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const [courseToModerate, setCourseToModerate] = useState<Course | null>(null);
  const [moderationAction, setModerationAction] = useState<'approved' | 'rejected' | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all'); // 'all', 'pending', 'approved', 'rejected'

  useEffect(() => {
    setCourses(placeholderCourses);
  }, []);

  const filteredCourses = courses.filter(course =>
    (course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (course.providerInfo?.name || course.instructor).toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterStatus === 'all' || course.approvalStatus === filterStatus)
  );

  const getApprovalStatusBadge = (status?: 'pending' | 'approved' | 'rejected') => {
    if (!status) return <Badge variant="info">Unknown</Badge>;
    switch (status) {
      case 'pending': return <Badge variant="warning"><ShieldQuestion/>Pending</Badge>;
      case 'approved': return <Badge variant="success"><ShieldCheck/>Approved</Badge>;
      case 'rejected': return <Badge variant="destructive"><ShieldAlert/>Rejected</Badge>;
      default: return <Badge variant="info">Unknown</Badge>;
    }
  };

  const confirmCourseApprovalAction = () => {
    if (!courseToModerate || !moderationAction) return;
    
    setCourses(prevCourses => prevCourses.map(c => c.id === courseToModerate.id ? { ...c, approvalStatus: moderationAction } : c));
    toast({
        title: `Course ${moderationAction === 'approved' ? 'Approved' : 'Rejected'}`,
        description: `Course "${courseToModerate.title}" has been ${moderationAction}.`,
        variant: moderationAction === 'rejected' ? 'destructive' : 'success',
    });
    setCourseToModerate(null);
    setModerationAction(null);
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-xl border-l-4 border-primary">
        <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-md">
                 <BookOpenIcon className="h-8 w-8 text-primary"/>
            </div>
            <div>
              <CardTitle className="text-2xl font-headline text-primary">Course Management</CardTitle>
              <CardDescription>Manage course listings, approval statuses, and platform content. Total Courses: {courses.length}</CardDescription>
            </div>
        </CardHeader>
        <CardContent className="pt-0">
           <div className="mt-4 flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                    placeholder="Search by title, seller, category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full bg-background"
                    />
                </div>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="flex h-10 w-full md:w-auto rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending Approval</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
                 <Button variant="outline" disabled className="flex-shrink-0"> 
                    <PlusCircle className="mr-2 h-4 w-4"/> Add Course Manually
                </Button>
            </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardContent className="p-0">
          {filteredCourses.length > 0 ? (
            <div className="overflow-x-auto">
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
                          data-ai-hint={`${course.category} course admin list thumbnail`}
                      />
                    </TableCell>
                    <TableCell className="font-medium max-w-xs truncate text-foreground">
                      <Link href={`/courses/${course.id}`} className="hover:underline text-primary" title={course.title}>
                          {course.title}
                      </Link>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{course.providerInfo?.name || course.instructor}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{course.category}</TableCell>
                    <TableCell className="text-sm">₹{course.price.toLocaleString('en-IN')}</TableCell>
                    <TableCell>{getApprovalStatusBadge(course.approvalStatus)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                           <DropdownMenuLabel>Actions for Course</DropdownMenuLabel>
                           <DropdownMenuSeparator/>
                          <DropdownMenuItem asChild>
                            <Link href={`/courses/${course.id}`} className="flex items-center">
                              <Eye className="mr-2 h-4 w-4" /> View Course Page
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem disabled> 
                            <Edit className="mr-2 h-4 w-4" /> Edit Course Details (Admin)
                          </DropdownMenuItem>
                          {course.approvalStatus === 'pending' && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => {setCourseToModerate(course); setModerationAction('approved')}} className="text-success-foreground focus:text-success-foreground focus:bg-success/20">
                                <CheckCircle className="mr-2 h-4 w-4 text-success" /> Approve Course
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {setCourseToModerate(course); setModerationAction('rejected')}} className="text-destructive-foreground focus:text-destructive-foreground focus:bg-destructive/20">
                                <XCircle className="mr-2 h-4 w-4 text-destructive" /> Reject Course
                              </DropdownMenuItem>
                            </>
                          )}
                           {course.approvalStatus === 'approved' && (
                            <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem disabled className="text-warning-foreground focus:text-warning-foreground focus:bg-warning/20">
                                    <ShieldAlert className="mr-2 h-4 w-4 text-warning" /> Unpublish Course
                                </DropdownMenuItem>
                            </>
                           )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
                <BookOpenIcon className="h-16 w-16 mx-auto mb-4 text-border"/>
                <p className="font-semibold text-lg">No courses found matching your criteria.</p>
                <p className="text-sm">Try adjusting your search or filters.</p>
                <Image src="https://placehold.co/400x250/EBF4FF/3B82F6?text=No+Courses+Illustration" alt="Illustration for no courses found" width={400} height={250} className="mt-6 mx-auto rounded-md" data-ai-hint="empty state no data courses list"/>
            </div>
          )}
        </CardContent>
         <CardFooter className="border-t pt-4">
            <p className="text-xs text-muted-foreground">Showing {filteredCourses.length} of {courses.length} total courses.</p>
            <Button variant="outline" disabled className="ml-auto"><Download className="mr-2 h-4 w-4"/> Export Courses</Button>
        </CardFooter>
      </Card>

      {courseToModerate && moderationAction && (
        <AlertDialog open onOpenChange={() => {setCourseToModerate(null); setModerationAction(null)}}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Course Moderation</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to <span className={cn("font-semibold", moderationAction === 'approved' ? "text-success" : "text-destructive")}>{moderationAction}</span> the course "{courseToModerate.title}"?
                This will update its visibility on the marketplace.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => {setCourseToModerate(null); setModerationAction(null)}}>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmCourseApprovalAction}
                className={cn(moderationAction === 'approved' ? "bg-success hover:bg-success/90" : "bg-destructive hover:bg-destructive/90")}
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
