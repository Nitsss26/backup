"use client";

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { placeholderCourses } from '@/lib/placeholder-data';
import type { Course } from '@/lib/types';
import { X, PlusCircle, BarChartHorizontalBig } from 'lucide-react';
import Image from 'next/image';
import { StarRating } from '@/components/ui/StarRating';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const MAX_COMPARE_ITEMS = 4; // Adjusted from 10 to 4 for better UI on typical screens

export default function CompareCoursesPage() {
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // In a real app, courses might be fetched or passed via query params
    setAvailableCourses(placeholderCourses);
  }, []);

  const handleAddCourse = (courseId: string) => {
    if (selectedCourses.length < MAX_COMPARE_ITEMS) {
      const courseToAdd = availableCourses.find(c => c.id === courseId);
      if (courseToAdd && !selectedCourses.find(c => c.id === courseId)) {
        setSelectedCourses(prev => [...prev, courseToAdd]);
      }
    }
  };

  const handleRemoveCourse = (courseId: string) => {
    setSelectedCourses(prev => prev.filter(c => c.id !== courseId));
  };

  const comparisonFeatures = [
    { key: 'imageUrl', label: 'Thumbnail', render: (course: Course) => <Image src={course.imageUrl} alt={course.title} width={120} height={67} className="rounded-md object-cover aspect-video" data-ai-hint={`${course.category} thumbnail`}/> },
    { key: 'title', label: 'Title' },
    { key: 'price', label: 'Price', render: (course: Course) => `$${course.price.toFixed(2)}` },
    { key: 'rating', label: 'Rating', render: (course: Course) => <StarRating rating={course.rating} reviewsCount={course.reviewsCount} showText /> },
    { key: 'duration', label: 'Duration' },
    { key: 'level', label: 'Level' },
    { key: 'instructor', label: 'Instructor' },
    { key: 'category', label: 'Category' },
    { key: 'certificateAvailable', label: 'Certificate', render: (course: Course) => course.certificateAvailable ? 'Yes' : 'No' },
    { key: 'studentsEnrolled', label: 'Students', render: (course: Course) => course.studentsEnrolled?.toLocaleString() },
  ];
  
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Courses', href: '/courses' },
    { label: 'Compare Courses' },
  ];

  if (!isClient) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container py-8 text-center">Loading comparison tool...</main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container py-8 px-4 md:px-6 bg-slate-50 dark:bg-slate-900">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-headline flex items-center">
            <BarChartHorizontalBig className="mr-3 h-8 w-8 text-primary" /> Course Comparison
          </h1>
        </div>

        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle>Select Courses to Compare (up to {MAX_COMPARE_ITEMS})</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: MAX_COMPARE_ITEMS }).map((_, index) => (
              <div key={index} className="border border-dashed border-muted-foreground/50 rounded-md p-4 h-32 flex items-center justify-center">
                {selectedCourses[index] ? (
                  <div className="text-center w-full">
                    <p className="text-sm font-medium line-clamp-2">{selectedCourses[index].title}</p>
                    <Button variant="ghost" size="sm" onClick={() => handleRemoveCourse(selectedCourses[index].id)} className="mt-2 text-red-500 hover:text-red-700">
                      <X className="h-4 w-4 mr-1" /> Remove
                    </Button>
                  </div>
                ) : (
                  <Select onValueChange={handleAddCourse} disabled={selectedCourses.length >= MAX_COMPARE_ITEMS && !selectedCourses[index]}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Add a course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Available Courses</SelectLabel>
                        {availableCourses
                          .filter(ac => !selectedCourses.find(sc => sc.id === ac.id))
                          .map(course => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {selectedCourses.length > 0 ? (
          <div className="overflow-x-auto">
            <Table className="min-w-full bg-background rounded-lg shadow-lg">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px] font-semibold text-base">Feature</TableHead>
                  {selectedCourses.map(course => (
                    <TableHead key={course.id} className="text-center font-medium">
                      {course.title.length > 30 ? course.title.substring(0,27) + "..." : course.title}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonFeatures.map(feature => (
                  <TableRow key={feature.key}>
                    <TableCell className="font-medium text-sm">{feature.label}</TableCell>
                    {selectedCourses.map(course => (
                      <TableCell key={course.id} className="text-center text-sm align-top">
                        {feature.render ? feature.render(course) : (course[feature.key as keyof Course] as string || 'N/A')}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
                <TableRow>
                    <TableCell></TableCell>
                    {selectedCourses.map(course => (
                        <TableCell key={`action-${course.id}`} className="text-center">
                             <Button size="sm" asChild>
                                <a href={`/courses/${course.id}`} target="_blank" rel="noopener noreferrer">View Course</a>
                            </Button>
                        </TableCell>
                    ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12 bg-card rounded-lg shadow">
            <PlusCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Start Comparing</h2>
            <p className="text-muted-foreground">Add courses using the selectors above to see a side-by-side comparison.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
