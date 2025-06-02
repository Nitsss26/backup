
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
import { MoreHorizontal, Search, CheckCircle, XCircle, Eye, Edit, ShieldQuestion, ShieldCheck, ShieldAlert } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, fetch courses from API
    setCourses(placeholderCourses);
  }, []);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getApprovalStatusBadge = (status?: 'pending' | 'approved' | 'rejected') => {
    if (!status) return <Badge variant="secondary">Unknown</Badge>;
    switch (status) {
      case 'pending': return <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200"><ShieldQuestion className="mr-1 h-3 w-3"/>Pending</Badge>;
      case 'approved': return <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-200"><ShieldCheck className="mr-1 h-3 w-3"/>Approved</Badge>;
      case 'rejected': return <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-200"><ShieldAlert className="mr-1 h-3 w-3"/>Rejected</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const handleCourseApprovalAction = (courseId: string, newStatus: 'approved' | 'rejected') => {
    setCourses(prevCourses => prevCourses.map(c => c.id === courseId ? { ...c, approvalStatus: newStatus } : c));
    toast({
        title: `Course ${newStatus === 'approved' ? 'Approved' : 'Rejected'}`,
        description: `Course ${courseId} has been ${newStatus}.`
    });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline">Course Management</h1>
      
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>All Courses ({filteredCourses.length})</CardTitle>
          <CardDescription>Manage course listings and approval statuses.</CardDescription>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search courses by title, instructor, category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full md:w-1/2 lg:w-1/3"
            />
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map(course => (
                <TableRow key={course.id}>
                  <TableCell>
                    <Image 
                        src={course.imageUrl} 
                        alt={course.title} 
                        width={60} 
                        height={34} 
                        className="rounded object-cover aspect-video"
                        data-ai-hint={`${course.category} course thumbnail`}
                    />
                  </TableCell>
                  <TableCell className="font-medium max-w-xs truncate">
                    <Link href={`/courses/${course.id}`} className="hover:underline" title={course.title}>
                        {course.title}
                    </Link>
                  </TableCell>
                  <TableCell>{course.instructor}</TableCell>
                  <TableCell>{course.category}</TableCell>
                  <TableCell>${course.price.toFixed(2)}</TableCell>
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
                            <DropdownMenuItem onClick={() => handleCourseApprovalAction(course.id, 'approved')} className="text-green-600 focus:text-green-700 focus:bg-green-50">
                              <CheckCircle className="mr-2 h-4 w-4" /> Approve Course
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleCourseApprovalAction(course.id, 'rejected')} className="text-red-600 focus:text-red-700 focus:bg-red-50">
                              <XCircle className="mr-2 h-4 w-4" /> Reject Course
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
        </CardContent>
      </Card>
    </div>
  );
}
