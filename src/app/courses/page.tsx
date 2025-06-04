
"use client"; // Add this directive

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CourseCard } from '@/components/CourseCard';
import { FilterSidebar } from '@/components/FilterSidebar';
import { PaginationControls } from '@/components/PaginationControls';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { placeholderCourses } from '@/lib/placeholder-data';
import type { Course } from '@/lib/types';
import { ITEMS_PER_PAGE, SORT_OPTIONS } from '@/lib/constants';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Filter, Search } from 'lucide-react';
import Image from 'next/image';
import { useRouter, usePathname, useSearchParams as useNextSearchParams } from 'next/navigation'; // Import hooks

interface CoursesPageProps {
  searchParams: {
    q?: string;
    category?: string | string[];
    minPrice?: string;
    maxPrice?: string;
    rating?: string | string[];
    level?: string | string[];
    instructor?: string | string[]; // This will be instructor type
    language?: string | string[];
    certification?: string;
    sort?: string;
    page?: string;
  };
}

function applyFiltersAndSort(courses: Course[], params: CoursesPageProps['searchParams']): Course[] {
  let filtered = [...courses.filter(c => c.approvalStatus === 'approved')];

  if (params.q) {
    const query = params.q.toLowerCase();
    filtered = filtered.filter(c => 
      c.title.toLowerCase().includes(query) || 
      (c.description && c.description.toLowerCase().includes(query)) ||
      (c.instructor && c.instructor.toLowerCase().includes(query)) ||
      (c.providerInfo?.name && c.providerInfo.name.toLowerCase().includes(query)) ||
      (c.category && c.category.toLowerCase().includes(query))
    );
  }

  if (params.category) {
    const categories = Array.isArray(params.category) ? params.category : [params.category];
    if (categories.length > 0) {
       filtered = filtered.filter(c => categories.includes(c.category.toLowerCase().replace(/\s+/g, '-')));
    }
  }
  
  if (params.minPrice) {
    filtered = filtered.filter(c => c.price >= parseFloat(params.minPrice!));
  }
  if (params.maxPrice) {
    filtered = filtered.filter(c => c.price <= parseFloat(params.maxPrice!));
  }

  if (params.rating) {
    const ratings = (Array.isArray(params.rating) ? params.rating : [params.rating]).map(Number);
    if (ratings.length > 0) {
      filtered = filtered.filter(c => ratings.some(r => c.rating >= r));
    }
  }
  
  if (params.level) {
    const levels = Array.isArray(params.level) ? params.level : [params.level];
    if (levels.length > 0) {
       filtered = filtered.filter(c => c.level && levels.includes(c.level));
    }
  }
  
  if (params.instructor) {
    const instructorTypes = Array.isArray(params.instructor) ? params.instructor : [params.instructor];
    if (instructorTypes.length > 0) {
      filtered = filtered.filter(c => c.providerInfo?.type && instructorTypes.includes(c.providerInfo.type));
    }
  }
  
  if (params.language) {
    const languages = Array.isArray(params.language) ? params.language : [params.language];
    if (languages.length > 0) {
       filtered = filtered.filter(c => c.language && languages.includes(c.language));
    }
  }

  if (params.certification === 'true') {
    filtered = filtered.filter(c => c.certificateAvailable);
  } else if (params.certification === 'false') {
    filtered = filtered.filter(c => !c.certificateAvailable);
  }


  if (params.sort) {
    switch (params.sort) {
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating_desc':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest': 
        filtered.sort((a, b) => new Date(b.lastUpdated || 0).getTime() - new Date(a.lastUpdated || 0).getTime());
        break;
      case 'popularity':
        filtered.sort((a,b) => (b.studentsEnrolled || 0) - (a.studentsEnrolled || 0));
        break;
    }
  }

  return filtered;
}


export default function CoursesPage({ searchParams }: CoursesPageProps) { // Remove async
  const router = useRouter(); // Use hook
  const pathname = usePathname(); // Use hook
  const currentSearchParams = useNextSearchParams(); // Use hook to get current search params for constructing new URL

  const page = parseInt(searchParams.page || '1', 10);
  
  const filteredAndSortedCourses = applyFiltersAndSort(placeholderCourses, searchParams);
  
  const totalCourses = filteredAndSortedCourses.length;
  const totalPages = Math.ceil(totalCourses / ITEMS_PER_PAGE);
  const paginatedCourses = filteredAndSortedCourses.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const currentCategoryParams = Array.isArray(searchParams.category) ? searchParams.category : (searchParams.category ? [searchParams.category] : []);
  const currentCategoryName = currentCategoryParams.length > 0 
    ? currentCategoryParams[0].split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') 
    : undefined;

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Courses', href: '/courses' },
  ];
  if (currentCategoryName) {
    breadcrumbItems.push({ label: currentCategoryName });
  }


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container py-8 px-4 md:px-6">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold font-headline">
            {searchParams.q ? `Search results for "${searchParams.q}"` : 
             currentCategoryName ? `${currentCategoryName} Courses` : 
             'All Courses'}
          </h1>
          <p className="text-muted-foreground mt-2">
            Showing {paginatedCourses.length > 0 ? ((page - 1) * ITEMS_PER_PAGE) + 1 : 0}-{Math.min(page * ITEMS_PER_PAGE, totalCourses)} of {totalCourses} courses.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile Filter Trigger */}
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
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden md:block">
            <FilterSidebar />
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-muted-foreground">
                {totalCourses} courses found
              </p>
              <Select 
                defaultValue={searchParams.sort || 'relevance'} 
                onValueChange={(value) => {
                  const params = new URLSearchParams(currentSearchParams.toString()); // Use current search params from hook
                  if (value === 'relevance') {
                    params.delete('sort');
                  } else {
                    params.set('sort', value);
                  }
                  params.set('page', '1'); // Reset to page 1 on sort change
                  router.push(`${pathname}?${params.toString()}`);
              }}>
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

            {paginatedCourses.length > 0 ? (
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
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

            <PaginationControls
              currentPage={page}
              totalPages={totalPages}
              hasNextPage={page * ITEMS_PER_PAGE < totalCourses}
              hasPrevPage={page > 1}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
