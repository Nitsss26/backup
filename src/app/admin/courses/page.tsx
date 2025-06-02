
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
import { MoreHorizontal, Search, CheckCircle, XCircle, Eye, Edit, ShieldQuestion, ShieldCheck, ShieldAlert, PlusCircle, Filter, Download, BookOpen } from 'lucide-react';
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
    if (!status) return <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-slate-300">Unknown</Badge>;
    switch (status) {
      case 'pending': return <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-200"><ShieldQuestion className="mr-1 h-3.5 w-3.5"/>Pending</Badge>;
      case 'approved': return <Badge variant="default" className="bg-green-100 text-green-700 border-green-300 hover:bg-green-200"><ShieldCheck className="mr-1 h-3.5 w-3.5"/>Approved</Badge>;
      case 'rejected': return <Badge variant="destructive" className="bg-red-100 text-red-700 border-red-300 hover:bg-red-200"><ShieldAlert className="mr-1 h-3.5 w-3.5"/>Rejected</Badge>;
      default: return <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-slate-300">Unknown</Badge>;
    }
  };

  const confirmCourseApprovalAction = () => {
    if (!courseToModerate || !moderationAction) return;
    
    setCourses(prevCourses => prevCourses.map(c => c.id === courseToModerate.id ? { ...c, approvalStatus: moderationAction } : c));
    toast({
        title: `Course ${moderationAction === 'approved' ? 'Approved' : 'Rejected'}`,
        description: `Course "${courseToModerate.title}" has been ${moderationAction}.`,
        variant: moderationAction === 'rejected' ? 'destructive' : 'default',
    });
    setCourseToModerate(null);
    setModerationAction(null);
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg border bg-card">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-headline">Course Management</CardTitle>
              <CardDescription>Manage course listings, approval statuses, and platform content.</CardDescription>
            </div>
            <div className="flex gap-2 flex-wrap">
                 <Button variant="outline" disabled> 
                    <PlusCircle className="mr-2 h-4 w-4"/> Add Course Manually
                </Button>
                <Button variant="outline" disabled>
                    <Download className="mr-2 h-4 w-4"/> Export Courses
                </Button>
            </div>
          </div>
           <div className="mt-6 flex flex-col md:flex-row gap-4">
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
                  <TableRow key={course.id} className="hover:bg-muted/50">
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
                    <TableCell className="font-medium max-w-xs truncate">
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
                              <DropdownMenuItem onClick={() => {setCourseToModerate(course); setModerationAction('approved')}} className="text-green-600 focus:text-green-700 focus:bg-green-50">
                                <CheckCircle className="mr-2 h-4 w-4" /> Approve Course
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {setCourseToModerate(course); setModerationAction('rejected')}} className="text-red-600 focus:text-red-700 focus:bg-red-50">
                                <XCircle className="mr-2 h-4 w-4" /> Reject Course
                              </DropdownMenuItem>
                            </>
                          )}
                           {course.approvalStatus === 'approved' && (
                            <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem disabled className="text-orange-600 focus:text-orange-700 focus:bg-orange-50"> {/* Example destructive style */}
                                    <ShieldAlert className="mr-2 h-4 w-4" /> Unpublish Course
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
          ) : (
            <div className="text-center py-16 text-muted-foreground">
                <BookOpen className="h-12 w-12 mx-auto mb-3 text-border"/>
                <p className="font-semibold">No courses found matching your criteria.</p>
                <p className="text-sm">Try adjusting your search or filters.</p>
            </div>
          )}
        </CardContent>
         <CardFooter>
            <p className="text-xs text-muted-foreground">Showing {filteredCourses.length} of {courses.length} total courses.</p>
            {/* Pagination placeholder */}
        </CardFooter>
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
