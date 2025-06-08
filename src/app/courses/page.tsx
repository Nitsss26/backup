
"use client"; 

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CourseCard } from '@/components/CourseCard';
import { FilterSidebar } from '@/components/FilterSidebar';
import { PaginationControls } from '@/components/PaginationControls';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import type { Course } from '@/lib/types';
import { ITEMS_PER_PAGE, SORT_OPTIONS, CATEGORIES as STATIC_CATEGORIES } from '@/lib/constants';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Filter, Search, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter, usePathname, useSearchParams as useNextSearchParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

interface ApiResponse {
  courses: Course[];
  totalPages: number;
  currentPage: number;
  totalCourses: number;
}

export default function CoursesPage() {
  const router = useRouter(); 
  const pathname = usePathname(); 
  const currentSearchParams = useNextSearchParams(); 

  const [courses, setCourses] = useState<Course[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = useCallback(async (params: URLSearchParams) => {
    setIsLoading(true);
    setError(null);
    console.log(`[CoursesPage] Fetching courses with params: ${params.toString()}`);
    try {
      const response = await axios.get<ApiResponse>(`/api/courses?${params.toString()}`);
      console.log("[CoursesPage] API Response Data:", response.data);
      setCourses(response.data.courses);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
      setTotalCourses(response.data.totalCourses);
    } catch (err: any) {
      console.error("[CoursesPage] Failed to fetch courses:", err);
      setError(err.response?.data?.message || err.message || "Failed to load courses. Please try again later.");
      setCourses([]); 
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(currentSearchParams.toString());
    if (!params.has('page')) {
      params.set('page', '1');
    }
    if (!params.has('limit')) {
      params.set('limit', String(ITEMS_PER_PAGE));
    }
    fetchCourses(params);
  }, [currentSearchParams, fetchCourses]);

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(currentSearchParams.toString()); 
    if (value === 'relevance') {
      params.delete('sort');
    } else {
      params.set('sort', value);
    }
    params.set('page', '1'); 
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  
  const currentCategorySlug = currentSearchParams.get('category');
  const currentCategoryName = currentCategorySlug 
    ? STATIC_CATEGORIES.find(c => c.slug === currentCategorySlug)?.name 
    : undefined;
  const searchQuery = currentSearchParams.get('q');

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Courses', href: '/courses' },
  ];
  if (currentCategoryName) {
    breadcrumbItems.push({ label: currentCategoryName });
  } else if (searchQuery) {
    breadcrumbItems.push({ label: `Search: "${searchQuery}"` });
  }


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container py-8 px-4 md:px-6">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold font-headline">
            {searchQuery ? `Search results for "${searchQuery}"` : 
             currentCategoryName ? `${currentCategoryName} Courses` : 
             'All Courses'}
          </h1>
          {!isLoading && !error && (
            <p className="text-muted-foreground mt-2">
              Showing {courses.length > 0 ? ((currentPage - 1) * ITEMS_PER_PAGE) + 1 : 0}-{Math.min(currentPage * ITEMS_PER_PAGE, totalCourses)} of {totalCourses} courses.
            </p>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:hidden mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Filter className="mr-2 h-4 w-4" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[360px] p-0">
                 <FilterSidebar />
              </SheetContent>
            </Sheet>
          </div>
          
          <div className="hidden md:block w-72 lg:w-80 shrink-0">
            <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2"> {/* Header h-16 (4rem) + 2rem margin = 6rem */}
                <FilterSidebar />
            </div>
          </div>

          <div className="flex-1 min-w-0"> {/* Added min-w-0 for flex child overflow fix */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-muted-foreground">
                {!isLoading && !error ? `${totalCourses} courses found` : isLoading ? 'Loading...' : ''}
              </p>
              <Select 
                value={currentSearchParams.get('sort') || 'relevance'} 
                onValueChange={handleSortChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-16">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="text-center py-16 text-destructive-foreground bg-destructive/10 rounded-lg shadow-sm p-6">
                <Search className="h-16 w-16 mx-auto mb-4 text-destructive"/>
                <h2 className="text-2xl font-semibold mb-2">Error Loading Courses</h2>
                <p className="text-sm mb-6">{error}</p>
                <Button onClick={() => fetchCourses(new URLSearchParams(currentSearchParams.toString()))}>Try Again</Button>
              </div>
            ) : courses.length > 0 ? (
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <CourseCard key={course._id || course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-muted-foreground bg-card rounded-lg shadow-sm">
                <Search className="h-16 w-16 mx-auto mb-4 text-border"/>
                <h2 className="text-2xl font-semibold mb-2 text-foreground">No Courses Found</h2>
                <p className="text-sm mb-6">Try adjusting your filters or search terms.</p>
                <Image src="https://placehold.co/400x250/EBF4FF/64748B?text=No+Results+Illustration" alt="No courses found illustration" width={400} height={250} className="mx-auto rounded-md" data-ai-hint="empty state no data search results illustration"/>
              </div>
            )}

            {!isLoading && !error && totalCourses > 0 && (
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                hasNextPage={currentPage * ITEMS_PER_PAGE < totalCourses}
                hasPrevPage={currentPage > 1}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
    