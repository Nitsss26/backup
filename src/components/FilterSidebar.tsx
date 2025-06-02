
"use client";

import { useState, useEffect } from 'react';
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

export function FilterSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(searchParams.toString());
    return {
      categories: params.getAll('category') || [],
      priceRange: [
        Number(params.get('minPrice')) || 0,
        Number(params.get('maxPrice')) || MAX_PRICE,
      ],
      ratings: params.getAll('rating').map(Number) || [],
      difficultyLevels: params.getAll('level') || [],
      instructorTypes: params.getAll('instructor') || [],
      languages: params.getAll('language') || [],
      certification: params.get('certification') === 'true' || false,
    };
  });

  useEffect(() => {
    // This effect ensures that if the URL is changed directly (e.g., browser back/forward),
    // the filter UI updates to reflect the current URL parameters.
    const params = new URLSearchParams(searchParams.toString());
    setFilters({
      categories: params.getAll('category') || [],
      priceRange: [
        Number(params.get('minPrice')) || 0,
        Number(params.get('maxPrice')) || MAX_PRICE,
      ],
      ratings: params.getAll('rating').map(Number) || [],
      difficultyLevels: params.getAll('level') || [],
      instructorTypes: params.getAll('instructor') || [],
      languages: params.getAll('language') || [],
      certification: params.get('certification') === 'true' || false,
    });
  }, [searchParams]);


  const handleFilterChange = (type: keyof typeof filters, value: any) => {
    setFilters(prev => {
      let newValues;
      if (['categories', 'ratings', 'difficultyLevels', 'instructorTypes', 'languages'].includes(type)) {
        const currentValues = prev[type as keyof Omit<typeof filters, 'priceRange' | 'certification'>] as string[] | number[];
        if ((currentValues as any[]).includes(value)) {
          newValues = (currentValues as any[]).filter(item => item !== value);
        } else {
          newValues = [...currentValues, value];
        }
        return { ...prev, [type]: newValues };
      }
      return { ...prev, [type]: value };
    });
  };
  
  const applyFilters = () => {
    const params = new URLSearchParams(); // Start with fresh params
    
    // Preserve existing 'q' and 'sort' if they exist
    if (searchParams.has('q')) params.set('q', searchParams.get('q')!);
    if (searchParams.has('sort')) params.set('sort', searchParams.get('sort')!);

    filters.categories.forEach(cat => params.append('category', cat));
    filters.ratings.forEach(r => params.append('rating', String(r)));
    filters.difficultyLevels.forEach(level => params.append('level', level));
    filters.instructorTypes.forEach(type => params.append('instructor', type));
    filters.languages.forEach(lang => params.append('language', lang));

    if (filters.priceRange[0] > 0) params.set('minPrice', String(filters.priceRange[0]));
    if (filters.priceRange[1] < MAX_PRICE) params.set('maxPrice', String(filters.priceRange[1]));
    
    if (filters.certification) params.set('certification', 'true');

    // Reset page to 1 when filters change
    params.set('page', '1');
    
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const resetFilters = () => {
    const params = new URLSearchParams();
    if (searchParams.has('q')) params.set('q', searchParams.get('q')!);
    if (searchParams.has('sort')) params.set('sort', searchParams.get('sort')!);
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    // State update will be handled by useEffect listening to searchParams
  };
  
  const ratingOptions = [5, 4, 3, 2, 1];

  return (
    <aside className="w-full md:w-72 lg:w-80 space-y-6 p-4 border rounded-lg shadow-sm bg-card">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold font-headline">Filters</h3>
        <Button variant="ghost" size="sm" onClick={resetFilters} className="text-primary hover:text-primary/80">
          <X className="w-4 h-4 mr-1" /> Clear All
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={['categories', 'price', 'ratings']} className="w-full">
        <AccordionItem value="categories">
          <AccordionTrigger className="text-base font-medium">Category</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2 max-h-60 overflow-y-auto">
            {CATEGORIES.map(category => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`cat-${category.id}`}
                  checked={filters.categories.includes(category.slug)}
                  onCheckedChange={() => handleFilterChange('categories', category.slug)}
                />
                <Label htmlFor={`cat-${category.id}`} className="font-normal text-sm">{category.name}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-base font-medium">Price Range (₹)</AccordionTrigger>
          <AccordionContent className="space-y-3 pt-3">
            <Slider
              defaultValue={[0, MAX_PRICE]}
              min={0}
              max={MAX_PRICE}
              step={100} // Adjusted step for INR
              value={filters.priceRange}
              onValueChange={(value) => handleFilterChange('priceRange', value)}
              className="my-4"
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
                />
                <Label htmlFor={`rating-${rating}`} className="font-normal text-sm flex items-center">
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
                />
                <Label htmlFor={`level-${level}`} className="font-normal text-sm">{level}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="language">
          <AccordionTrigger className="text-base font-medium">Language</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2  max-h-60 overflow-y-auto">
            {LANGUAGES.map(lang => ( 
              <div key={lang} className="flex items-center space-x-2">
                <Checkbox
                  id={`lang-${lang}`}
                  checked={filters.languages.includes(lang)}
                  onCheckedChange={() => handleFilterChange('languages', lang)}
                />
                <Label htmlFor={`lang-${lang}`} className="font-normal text-sm">{lang}</Label>
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
                />
                <Label htmlFor={`instructor-${type.replace(/\s+/g, '-')}`} className="font-normal text-sm">{type}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="certification">
          <AccordionTrigger className="text-base font-medium">Certification</AccordionTrigger>
          <AccordionContent className="pt-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="certification"
                checked={filters.certification}
                onCheckedChange={(checked) => handleFilterChange('certification', Boolean(checked))}
              />
              <Label htmlFor="certification" className="font-normal text-sm">Certificate Available</Label>
            </div>
          </AccordionContent>
        </AccordionItem>

      </Accordion>

      <Button onClick={applyFilters} className="w-full">Apply Filters</Button>
    </aside>
  );
}

