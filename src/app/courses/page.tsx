
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

// Define banner images for different categories
const bannerImages: Record<string, string> = {
  default: 'https://i.ibb.co/QnS8rTj/jee-main-2025-results-banner.png',
  'iit-jee': 'https://i.ibb.co/XZ47W02/iit-jee-banner-alt.png',
  'neet': 'https://i.ibb.co/yYXg8xG/neet-banner-alt.png',
  'gov-exams': 'https://i.ibb.co/SN20B0j/gov-exams-banner-alt.png',
  'computer-science': 'https://i.ibb.co/mR5jJcv/cs-banner-alt.png',
  'business-finance': 'https://images.unsplash.com/photo-1554260570-e9689a3418b8?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200', // Example for business
  'arts-humanities': 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200', // Example for arts
  // Add more specific banners as needed
};

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
  const [currentBannerUrl, setCurrentBannerUrl] = useState<string>(bannerImages.default);

  const fetchCourses = useCallback(async (params: URLSearchParams) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<ApiResponse>(`/api/courses?${params.toString()}`);
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

    const categorySlug = params.get('category');
    if (categorySlug && bannerImages[categorySlug]) {
      setCurrentBannerUrl(bannerImages[categorySlug]);
    } else if (categorySlug) { // Fallback for unmapped categories if any
      const availableBannerKeys = Object.keys(bannerImages).filter(k => k !== 'default');
      const randomBannerKey = availableBannerKeys[Math.floor(Math.random() * availableBannerKeys.length)];
      setCurrentBannerUrl(bannerImages[randomBannerKey] || bannerImages.default);
    } else {
      setCurrentBannerUrl(bannerImages.default);
    }
  }, [currentSearchParams, fetchCourses]);

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(currentSearchParams.toString()); 
    if (value === 'relevance' && params.has('sort')) { // Only remove if 'relevance' is selected and sort exists
      params.delete('sort');
    } else if (value !== 'relevance') {
      params.set('sort', value);
    }
    params.set('page', '1'); 
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  
  const currentCategorySlug = currentSearchParams.get('category');
  const currentCategoryObject = currentCategorySlug 
    ? STATIC_CATEGORIES.find(c => c.slug === currentCategorySlug)
    : undefined;
  const currentCategoryName = currentCategoryObject?.name;
  const searchQuery = currentSearchParams.get('q');

  const pageTitle = searchQuery 
    ? `Search results for "${searchQuery}"` 
    : currentCategoryName 
      ? `${currentCategoryName} Courses` 
      : 'All Courses';

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Courses', href: '/courses' },
  ];
  if (currentCategoryName) {
    breadcrumbItems.push({ label: currentCategoryName });
  } else if (searchQuery) {
    breadcrumbItems.push({ label: `Search: "${searchQuery}"` });
  }

  const startItem = totalCourses > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0;
  const endItem = totalCourses > 0 ? Math.min(currentPage * ITEMS_PER_PAGE, totalCourses) : 0;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container py-8 px-4 md:px-6">
        <Breadcrumbs items={breadcrumbItems} />
        
        <div className="flex flex-col md:flex-row gap-8 mt-6">
          {/* Mobile Filter Button */}
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
          
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-72 lg:w-80 shrink-0">
            <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto no-scrollbar">
              <FilterSidebar />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Mobile Page Title */}
            <div className="md:hidden mb-6">
              <h1 className="text-3xl font-bold font-headline">
                {pageTitle}
              </h1>
               {!isLoading && !error && totalCourses > 0 && (
                <p className="text-sm text-muted-foreground mt-1">
                  Showing {startItem}-{endItem} of {totalCourses} courses.
                </p>
              )}
            </div>

            {/* Desktop Page Title */}
            <div className="hidden md:block mb-4 md:mb-6">
              <h1 className="text-3xl md:text-4xl font-bold font-headline">
                {pageTitle}
              </h1>
              {!isLoading && !error && totalCourses > 0 && (
                <p className="text-sm text-muted-foreground mt-1">
                  Showing {startItem}-{endItem} of {totalCourses} courses.
                </p>
              )}
            </div>
            
            {/* Promotional Banner */}
            {currentBannerUrl && (
              <div className="mb-6 md:mb-8">
                <Image
                  key={currentBannerUrl} // Added key to help React re-render if URL changes
                  src={currentBannerUrl}
                  alt="Promotional Banner for Courses"
                  width={1200} 
                  height={250} // Adjusted height for better aspect ratio
                  className="rounded-lg shadow-lg object-cover w-full h-auto max-h-[200px] md:max-h-[250px]" 
                  priority // Consider adding if this is above the fold for LCP
                  data-ai-hint="promotional course banner advertisement education offers"
                />
              </div>
            )}
            
            {/* Course Count (redundant due to above text, kept for structure) and Sort Options */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <p className="text-sm text-muted-foreground">
                {/* This specific "X courses found" can be removed if the "Showing X-Y of Z" is preferred */}
                {!isLoading && !error && totalCourses > 0 && (
                  `${totalCourses} courses found`
                )}
                {isLoading && "Loading courses..."}
              </p>
              
              <Select 
                value={currentSearchParams.get('sort') || 'relevance'} 
                onValueChange={handleSortChange}
              >
                <SelectTrigger className="w-full md:w-[180px]">
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

            {/* Course Grid or Loading/Error States */}
            {isLoading ? (
              <div className="flex justify-center items-center py-16">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="text-center py-16 text-destructive-foreground bg-destructive/10 rounded-lg shadow-sm p-6">
                <Search className="h-16 w-16 mx-auto mb-4 text-destructive"/>
                <h2 className="text-2xl font-semibold mb-2">Error Loading Courses</h2>
                <p className="text-sm mb-6">{error}</p>
                <Button onClick={() => fetchCourses(new URLSearchParams(currentSearchParams.toString()))}>
                  Try Again
                </Button>
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
                <Image 
                  src="https://placehold.co/400x250/EBF4FF/64748B?text=No+Results+Illustration" 
                  alt="No courses found illustration" 
                  width={400} 
                  height={250} 
                  className="mx-auto rounded-md" 
                  data-ai-hint="empty state no data search results illustration"
                />
              </div>
            )}

            {/* Pagination */}
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
