
"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CATEGORIES, DIFFICULTY_LEVELS, INSTRUCTOR_TYPES, LANGUAGES } from '@/lib/constants';
import { StarRating } from '@/components/ui/StarRating';
import { X } from 'lucide-react';

const MAX_PRICE = 15000; // Max price for slider

interface FiltersState {
  categories: string[];
  priceRange: [number, number];
  ratings: number[];
  difficultyLevels: string[];
  instructorTypes: string[];
  languages: string[];
  certification: boolean;
}

const getDefaultFilters = (searchParams: URLSearchParams): FiltersState => {
  return {
    categories: searchParams.getAll('category') || [],
    priceRange: [
      Number(searchParams.get('minPrice')) || 0,
      Number(searchParams.get('maxPrice')) || MAX_PRICE,
    ],
    ratings: searchParams.getAll('rating').map(Number) || [],
    difficultyLevels: searchParams.getAll('level') || [],
    instructorTypes: searchParams.getAll('instructor') || [],
    languages: searchParams.getAll('language') || [],
    certification: searchParams.get('certification') === 'true' || false,
  };
};


export function FilterSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const currentSearchParams = useSearchParams();

  const [filters, setFilters] = useState<FiltersState>(() => getDefaultFilters(currentSearchParams));
  const [activeAccordionItems, setActiveAccordionItems] = useState<string[]>(['categories', 'price', 'ratings']);
  const isInitialMount = useRef(true);

  // Update local filter state when URL searchParams change (e.g., browser back/forward, reset)
  useEffect(() => {
    setFilters(getDefaultFilters(currentSearchParams));
  }, [currentSearchParams]);


  // Effect to apply filters to URL when `filters` state changes (debounced)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const handler = setTimeout(() => {
      const newParams = new URLSearchParams();

      // Preserve 'q' and 'sort' from the current URL
      // Reading from window.location.search inside timeout to get the latest values if other navigations occurred
      const latestUrlParams = new URLSearchParams(window.location.search);
      const qParam = latestUrlParams.get('q');
      if (qParam) newParams.set('q', qParam);
      const sortParam = latestUrlParams.get('sort');
      if (sortParam) newParams.set('sort', sortParam);

      // Add current filter state
      filters.categories.forEach(cat => newParams.append('category', cat));
      filters.ratings.forEach(r => newParams.append('rating', String(r)));
      filters.difficultyLevels.forEach(level => newParams.append('level', level));
      filters.instructorTypes.forEach(type => newParams.append('instructor', type));
      filters.languages.forEach(lang => newParams.append('language', lang));

      if (filters.priceRange[0] > 0) newParams.set('minPrice', String(filters.priceRange[0]));
      if (filters.priceRange[1] < MAX_PRICE) newParams.set('maxPrice', String(filters.priceRange[1]));
      
      if (filters.certification) newParams.set('certification', 'true');

      newParams.set('page', '1'); // Filter changes always reset to page 1
      
      router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
    }, 500); // 500ms debounce

    return () => clearTimeout(handler);
  }, [filters, router, pathname]); // Only depends on filters state and stable router/pathname


  const handleFilterChange = useCallback((type: keyof FiltersState, value: any) => {
    isInitialMount.current = false; // Any filter interaction means it's not initial mount
    setFilters(prev => {
      let newValues;
      if (['categories', 'ratings', 'difficultyLevels', 'instructorTypes', 'languages'].includes(type)) {
        const currentValues = prev[type as Exclude<keyof FiltersState, 'priceRange' | 'certification'>];
        if (currentValues.includes(value as never)) { 
          newValues = currentValues.filter(item => item !== value);
        } else {
          newValues = [...currentValues, value as never]; 
        }
        return { ...prev, [type]: newValues };
      }
      return { ...prev, [type]: value };
    });
  }, []);
  

  const resetFilters = useCallback(() => {
    isInitialMount.current = true; // Set to true to allow URL to drive state without immediate re-filter
    const params = new URLSearchParams();
    // Preserve 'q' and 'sort' when resetting filters
    const qParam = currentSearchParams.get('q');
    if (qParam) params.set('q', qParam);
    const sortParam = currentSearchParams.get('sort');
    if (sortParam) params.set('sort', sortParam);
    
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    // The useEffect listening to currentSearchParams will reset the local `filters` state.
    // Allow a moment for state to settle before enabling auto-apply again
    setTimeout(() => { isInitialMount.current = false; }, 100);
  }, [router, pathname, currentSearchParams]);
  
  const ratingOptions = [5, 4, 3, 2, 1];

  return (
    <aside className="w-full space-y-6 p-4 border rounded-lg shadow-sm bg-card">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold font-headline">Filters</h3>
        <Button variant="ghost" size="sm" onClick={resetFilters} className="text-primary hover:text-primary/80">
          <X className="w-4 h-4 mr-1" /> Clear All
        </Button>
      </div>

      <Accordion 
        type="multiple" 
        value={activeAccordionItems}
        onValueChange={setActiveAccordionItems}
        className="w-full"
      >
        <AccordionItem value="categories">
          <AccordionTrigger className="text-base font-medium">Category</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2 max-h-60 overflow-y-auto">
            {CATEGORIES.map(category => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`cat-${category.id}`}
                  checked={filters.categories.includes(category.slug)}
                  onCheckedChange={() => handleFilterChange('categories', category.slug)}
                  aria-label={category.name}
                />
                <Label htmlFor={`cat-${category.id}`} className="font-normal text-sm cursor-pointer break-words">{category.name}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-base font-medium">Price Range (₹)</AccordionTrigger>
          <AccordionContent className="space-y-3 pt-3">
            <Slider
              min={0}
              max={MAX_PRICE}
              step={100} 
              value={filters.priceRange}
              onValueChange={(value) => handleFilterChange('priceRange', value)}
              className="my-4"
              aria-label="Price range slider"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>₹{filters.priceRange[0].toLocaleString('en-IN')}</span>
              <span>₹{filters.priceRange[1].toLocaleString('en-IN')}{filters.priceRange[1] === MAX_PRICE ? '+' : ''}</span>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="ratings">
          <AccordionTrigger className="text-base font-medium">Rating</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            {ratingOptions.map(rating => (
              <div key={`rating-${rating}`} className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={filters.ratings.includes(rating)}
                  onCheckedChange={() => handleFilterChange('ratings', rating)}
                  aria-label={`${rating} stars and up`}
                />
                <Label htmlFor={`rating-${rating}`} className="font-normal text-sm flex items-center cursor-pointer">
                  <StarRating rating={rating} size={14} /> 
                  <span className="ml-1.5">&amp; Up</span>
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="difficulty">
          <AccordionTrigger className="text-base font-medium">Difficulty Level</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            {DIFFICULTY_LEVELS.map(level => (
              <div key={level} className="flex items-center space-x-2">
                <Checkbox
                  id={`level-${level}`}
                  checked={filters.difficultyLevels.includes(level)}
                  onCheckedChange={() => handleFilterChange('difficultyLevels', level)}
                  aria-label={level}
                />
                <Label htmlFor={`level-${level}`} className="font-normal text-sm cursor-pointer break-words">{level}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="language">
          <AccordionTrigger className="text-base font-medium">Language</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2 max-h-60 overflow-y-auto">
            {LANGUAGES.map(lang => ( 
              <div key={lang} className="flex items-center space-x-2">
                <Checkbox
                  id={`lang-${lang.toLowerCase().replace(/\s+/g, '-')}`}
                  checked={filters.languages.includes(lang)}
                  onCheckedChange={() => handleFilterChange('languages', lang)}
                  aria-label={lang}
                />
                <Label htmlFor={`lang-${lang.toLowerCase().replace(/\s+/g, '-')}`} className="font-normal text-sm cursor-pointer break-words">{lang}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="instructorType">
          <AccordionTrigger className="text-base font-medium">Seller Type</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            {INSTRUCTOR_TYPES.map(type => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`instructor-${type.replace(/\s+/g, '-')}`}
                  checked={filters.instructorTypes.includes(type)}
                  onCheckedChange={() => handleFilterChange('instructorTypes', type)}
                  aria-label={type}
                />
                <Label htmlFor={`instructor-${type.replace(/\s+/g, '-')}`} className="font-normal text-sm cursor-pointer break-words">{type}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="certification">
          <AccordionTrigger className="text-base font-medium">Certification</AccordionTrigger>
          <AccordionContent className="pt-3"> 
            <div className="flex items-center space-x-2">
              <Checkbox
                id="certification"
                checked={filters.certification}
                onCheckedChange={(checked) => handleFilterChange('certification', Boolean(checked))}
                aria-label="Certificate available"
              />
              <Label htmlFor="certification" className="font-normal text-sm cursor-pointer">Certificate Available</Label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
    </aside>
  );
}
