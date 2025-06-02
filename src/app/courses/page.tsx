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
import { Filter } from 'lucide-react';

interface CoursesPageProps {
  searchParams: {
    q?: string;
    category?: string | string[];
    minPrice?: string;
    maxPrice?: string;
    rating?: string | string[];
    level?: string | string[];
    instructor?: string | string[];
    language?: string | string[];
    certification?: string;
    sort?: string;
    page?: string;
  };
}

// Simulate filtering and sorting
function applyFiltersAndSort(courses: Course[], params: CoursesPageProps['searchParams']): Course[] {
  let filtered = [...courses];

  if (params.q) {
    const query = params.q.toLowerCase();
    filtered = filtered.filter(c => 
      c.title.toLowerCase().includes(query) || 
      c.description.toLowerCase().includes(query) ||
      c.instructor.toLowerCase().includes(query)
    );
  }

  if (params.category) {
    const categories = Array.isArray(params.category) ? params.category : [params.category];
    if (categories.length > 0) {
       filtered = filtered.filter(c => categories.map(catSlug => catSlug.replace('-', ' ')).some(catName => c.category.toLowerCase().includes(catName)));
    }
  }
  
  // Add more filter logic here based on other params (price, rating, level, etc.)
  // For brevity, this example only implements search and category.

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
      // case 'newest': // Requires date field
      //   filtered.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
      //   break;
    }
  }

  return filtered;
}


export default function CoursesPage({ searchParams }: CoursesPageProps) {
  const page = parseInt(searchParams.page || '1', 10);
  
  const filteredAndSortedCourses = applyFiltersAndSort(placeholderCourses, searchParams);
  
  const totalCourses = filteredAndSortedCourses.length;
  const totalPages = Math.ceil(totalCourses / ITEMS_PER_PAGE);
  const paginatedCourses = filteredAndSortedCourses.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const currentCategory = Array.isArray(searchParams.category) ? searchParams.category[0] : searchParams.category;
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Courses', href: '/courses' },
  ];
  if (currentCategory) {
    breadcrumbItems.push({ label: currentCategory.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') });
  }


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container py-8 px-4 md:px-6">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold font-headline">
            {searchParams.q ? `Search results for "${searchParams.q}"` : 
             currentCategory ? `${currentCategory.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Courses` : 
             'All Courses'}
          </h1>
          <p className="text-muted-foreground mt-2">
            Showing {paginatedCourses.length} of {totalCourses} courses.
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
              <Select defaultValue={searchParams.sort || 'relevance'}>
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
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-2">No Courses Found</h2>
                <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
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
