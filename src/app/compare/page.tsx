
"use client";

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { placeholderCourses } from '@/lib/placeholder-data';
import type { Course } from '@/lib/types';
import { X, PlusCircle, BarChartHorizontalBig, CheckCircle, XCircle, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { StarRating } from '@/components/ui/StarRating';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const MAX_COMPARE_ITEMS = 4;

// Helper function to safely access nested properties
function getNestedValue(obj: any, path: string): any {
  if (!path) return undefined;
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

interface ComparisonFeature {
  key: string;
  label: string;
  render?: (course: Course) => React.ReactNode | string | number;
  className?: string; 
}

const comparisonFeatures: ComparisonFeature[] = [
  {
    key: 'imageUrl',
    label: 'Thumbnail',
    render: (course: Course) => (
      <Image
        src={course.imageUrl || `https://placehold.co/120x67.png`}
        alt={course.title}
        width={120}
        height={67}
        className="rounded-md object-cover aspect-video mx-auto shadow-sm"
        data-ai-hint={`${course.category} thumbnail compare`}
      />
    ),
    className: "p-2",
  },
  {
    key: 'title',
    label: 'Title',
    render: (course: Course) => (
      <Link href={`/courses/${course.id}`} className="font-semibold text-primary hover:underline line-clamp-3">
        {course.title}
      </Link>
    ),
    className: "text-sm leading-snug hover:text-primary/80",
  },
  {
    key: 'shortDescription',
    label: 'Summary',
    render: (course: Course) => <p className="text-xs text-muted-foreground line-clamp-4 leading-relaxed">{course.shortDescription}</p>,
    className: "min-w-[180px]",
  },
  {
    key: 'price',
    label: 'Price',
    render: (course: Course) => (
      <div className="text-base font-bold text-foreground">
        ₹{course.price.toLocaleString('en-IN')}
        {course.originalPrice && (
          <span className="ml-1.5 text-xs text-muted-foreground line-through">
            ₹{course.originalPrice.toLocaleString('en-IN')}
          </span>
        )}
      </div>
    ),
  },
  {
    key: 'rating',
    label: 'Rating',
    render: (course: Course) => (
      <div className="flex flex-col items-center space-y-1">
        <StarRating rating={course.rating} size={16} />
        <span className="text-xs text-muted-foreground">({course.reviewsCount} reviews)</span>
      </div>
    ),
  },
  { key: 'level', label: 'Level', className: "text-sm capitalize" },
  { key: 'duration', label: 'Duration', className: "text-sm" },
  {
    key: 'modulesCount',
    label: 'Modules',
    render: (course: Course) => course.curriculum?.length || 0,
    className: "text-sm",
  },
  {
    key: 'lessonsCount',
    label: 'Lessons',
    render: (course: Course) => course.curriculum?.reduce((acc, mod) => acc + (mod.lessons?.length || 0), 0) || 0,
    className: "text-sm",
  },
  {
    key: 'providerInfo.name',
    label: 'Provider',
    render: (course: Course) => (
      <div className="flex flex-col items-center text-center">
        {course.providerInfo?.logoUrl && (
          <Avatar className="h-8 w-8 mb-1 border">
            <AvatarImage src={course.providerInfo.logoUrl} alt={course.providerInfo.name} />
            <AvatarFallback className="text-xs">{course.providerInfo.name?.substring(0, 1)}</AvatarFallback>
          </Avatar>
        )}
        <span className="text-xs line-clamp-2">{course.providerInfo?.name || course.instructor}</span>
        {course.providerInfo?.verified && <Badge variant="success" className="mt-1 text-xs px-1.5 py-0.5">Verified</Badge>}
      </div>
    ),
    className: "min-w-[120px]",
  },
  { key: 'category', label: 'Category', className: "text-sm" },
  { key: 'language', label: 'Language', className: "text-sm" },
  {
    key: 'certificateAvailable',
    label: 'Certificate',
    render: (course: Course) => course.certificateAvailable ? <CheckCircle className="h-5 w-5 text-green-500 mx-auto" /> : <XCircle className="h-5 w-5 text-red-500 mx-auto" />,
  },
  {
    key: 'studentsEnrolledCount',
    label: 'Students',
    render: (course: Course) => course.studentsEnrolledCount?.toLocaleString() || 'N/A',
    className: "text-sm",
  },
  {
    key: 'lastUpdated',
    label: 'Last Updated',
    render: (course: Course) => course.lastUpdated ? new Date(course.lastUpdated).toLocaleDateString() : 'N/A',
    className: "text-xs",
  },
  {
    key: 'moneyBackGuaranteeDays',
    label: 'Guarantee',
    render: (course: Course) => course.moneyBackGuaranteeDays ? `${course.moneyBackGuaranteeDays} days` : <XCircle className="h-5 w-5 text-red-500 mx-auto" />,
  },
  {
    key: 'freeTrialAvailable',
    label: 'Free Trial',
    render: (course: Course) => course.freeTrialAvailable ? <CheckCircle className="h-5 w-5 text-green-500 mx-auto" /> : <XCircle className="h-5 w-5 text-red-500 mx-auto" />,
  },
];

export default function CompareCoursesPage() {
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
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
  
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Courses', href: '/courses' },
    { label: 'Compare Courses' },
  ];

  if (!isClient) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container py-8 text-center"><BarChartHorizontalBig className="h-12 w-12 text-primary animate-pulse mx-auto my-10" />Loading comparison tool...</main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container py-8 px-4 md:px-6 bg-slate-50 dark:bg-slate-900">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold font-headline flex items-center text-foreground">
            <BarChartHorizontalBig className="mr-3 h-8 w-8 text-primary" /> Course Comparison
          </h1>
          {selectedCourses.length > 0 && (
            <Button variant="outline" onClick={() => setSelectedCourses([])}>
              <X className="mr-2 h-4 w-4" /> Clear All Selections
            </Button>
          )}
        </div>

        <Card className="mb-8 shadow-lg border bg-card">
          <CardHeader>
            <CardTitle className="text-xl font-headline text-foreground">Select Courses to Compare</CardTitle>
            <CardDescription>Choose up to {MAX_COMPARE_ITEMS} courses from the dropdowns below.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: MAX_COMPARE_ITEMS }).map((_, index) => (
              <div key={`slot-${index}`}>
                {selectedCourses[index] ? (
                  <Card className="min-h-[200px] flex flex-col p-3 shadow-sm border border-primary/40 bg-primary/5">
                    <Image src={selectedCourses[index].imageUrl || `https://placehold.co/160x90.png`} alt={selectedCourses[index].title} width={160} height={90} className="rounded-md object-cover aspect-video mx-auto mb-2 shadow-sm w-full"/>
                    <p className="text-xs font-semibold line-clamp-2 text-center text-foreground flex-grow mb-2 h-8">{selectedCourses[index].title}</p>
                    <Button variant="destructive" size="sm" onClick={() => handleRemoveCourse(selectedCourses[index].id)} className="w-full text-destructive-foreground text-xs py-1 h-auto">
                      <X className="h-3.5 w-3.5 mr-1" /> Remove
                    </Button>
                  </Card>
                ) : (
                  <Card className="border-2 border-dashed border-muted-foreground/30 hover:border-primary/70 transition-all duration-200 ease-in-out min-h-[200px] flex flex-col items-center justify-center p-4 text-center bg-card hover:bg-muted/5 group">
                    <PlusCircle className="h-10 w-10 text-muted-foreground/50 mb-2 group-hover:text-primary/70 transition-colors" />
                    <p className="text-xs font-medium text-muted-foreground mb-2 group-hover:text-primary/90">Add Course {index + 1}</p>
                    <Select onValueChange={handleAddCourse} disabled={selectedCourses.length >= MAX_COMPARE_ITEMS}>
                      <SelectTrigger className="w-full h-9 text-xs">
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel className="text-xs">Available Courses</SelectLabel>
                          {availableCourses
                            .filter(ac => !selectedCourses.find(sc => sc.id === ac.id))
                            .map(course => (
                            <SelectItem key={course.id} value={course.id} className="text-xs">
                              {course.title}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Card>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {selectedCourses.length > 0 ? (
          <div className="overflow-x-auto mt-10 shadow-xl rounded-lg border bg-card">
            <table className="min-w-[calc(200px+250px*${selectedCourses.length})] w-full border-collapse">
              <thead>
                <tr className="bg-muted/50">
                  <th className="sticky left-0 z-20 bg-muted/50 p-3 text-left text-sm font-semibold text-foreground border-b border-r">Feature</th>
                  {selectedCourses.map((course) => (
                    <th key={course.id} className="p-3 text-center border-b min-w-[220px] md:min-w-[250px]">
                      <Link href={`/courses/${course.id}`} className="block group">
                        <Image src={course.imageUrl || `https://placehold.co/120x67.png`} alt={course.title} width={120} height={67} className="rounded-md object-cover aspect-video mx-auto mb-1.5 shadow-sm group-hover:opacity-80 transition-opacity"/>
                        <p className="text-xs font-semibold text-primary group-hover:underline line-clamp-2 h-8">{course.title}</p>
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature) => (
                  <tr key={feature.key} className="hover:bg-muted/20 [&:nth-child(even)]:bg-muted/10 transition-colors duration-150 ease-in-out group">
                    <td className="sticky left-0 z-10 bg-card group-hover:bg-muted/20 p-3 text-sm font-medium text-foreground border-b border-r align-middle">
                      {feature.label}
                    </td>
                    {selectedCourses.map((course) => (
                      <td key={`${course.id}-${feature.key}`} className={`p-3 text-center text-sm align-middle border-b ${feature.className || ''}`}>
                        {feature.render ? feature.render(course) : (getNestedValue(course, feature.key) ?? 'N/A')}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="hover:bg-muted/20 [&:nth-child(even)]:bg-muted/10">
                  <td className="sticky left-0 z-10 bg-card group-hover:bg-muted/20 p-3 text-sm font-medium text-foreground border-r align-middle">Actions</td>
                  {selectedCourses.map((course) => (
                      <td key={`action-${course.id}`} className="p-3 text-center align-middle">
                           <Button size="sm" asChild className="text-xs">
                              <Link href={`/courses/${course.id}`} target="_blank" rel="noopener noreferrer">View Details</Link>
                          </Button>
                          <Button variant="outline" size="sm" className="text-xs ml-2" onClick={() => console.log("Add to cart:", course.id)} aria-label={`Add ${course.title} to cart`}>
                            <ShoppingCart className="h-3.5 w-3.5 mr-1"/> Add to Cart
                          </Button>
                      </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <Card className="text-center py-16 bg-card rounded-lg shadow-lg border">
            <CardHeader>
                <BarChartHorizontalBig className="h-16 w-16 text-primary mx-auto mb-4" />
                <CardTitle className="text-2xl font-semibold mb-2 text-foreground">Ready to Compare?</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">Select at least one course using the slots above to start your side-by-side comparison and find the perfect fit for your learning goals.</p>
                <Image src="https://placehold.co/400x200/EBF4FF/3B82F6?text=Select+Courses+to+Compare" alt="Illustration for selecting courses to compare" width={400} height={200} className="mx-auto rounded-md shadow-sm" data-ai-hint="comparison chart analytics education" />
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
}
