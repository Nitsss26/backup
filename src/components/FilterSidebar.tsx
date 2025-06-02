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

export function FilterSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    categories: searchParams.getAll('category') || [],
    priceRange: [
      Number(searchParams.get('minPrice')) || 0,
      Number(searchParams.get('maxPrice')) || 500,
    ],
    ratings: searchParams.getAll('rating').map(Number) || [],
    difficultyLevels: searchParams.getAll('level') || [],
    instructorTypes: searchParams.getAll('instructor') || [],
    languages: searchParams.getAll('language') || [],
    certification: searchParams.get('certification') === 'true' || false,
  });

  useEffect(() => {
    // Sync state with URL params on initial load or when URL changes externally
    setFilters({
      categories: searchParams.getAll('category') || [],
      priceRange: [ Number(searchParams.get('minPrice')) || 0, Number(searchParams.get('maxPrice')) || 500 ],
      ratings: searchParams.getAll('rating').map(Number) || [],
      difficultyLevels: searchParams.getAll('level') || [],
      instructorTypes: searchParams.getAll('instructor') || [],
      languages: searchParams.getAll('language') || [],
      certification: searchParams.get('certification') === 'true' || false,
    });
  }, [searchParams]);


  const handleFilterChange = (type: keyof typeof filters, value: any) => {
    setFilters(prev => {
      let newValues;
      if (['categories', 'ratings', 'difficultyLevels', 'instructorTypes', 'languages'].includes(type)) {
        const currentValues = prev[type as keyof Omit<typeof filters, 'priceRange' | 'certification'>] as string[] | number[];
        if (currentValues.includes(value as never)) {
          newValues = currentValues.filter(item => item !== value);
        } else {
          newValues = [...currentValues, value];
        }
        return { ...prev, [type]: newValues };
      }
      return { ...prev, [type]: value };
    });
  };
  
  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Clear existing multi-value params before setting new ones
    ['category', 'rating', 'level', 'instructor', 'language'].forEach(p => params.delete(p));

    filters.categories.forEach(cat => params.append('category', cat));
    filters.ratings.forEach(r => params.append('rating', String(r)));
    filters.difficultyLevels.forEach(level => params.append('level', level));
    filters.instructorTypes.forEach(type => params.append('instructor', type));
    filters.languages.forEach(lang => params.append('language', lang));

    if (filters.priceRange[0] > 0) params.set('minPrice', String(filters.priceRange[0]));
    else params.delete('minPrice');
    if (filters.priceRange[1] < 500) params.set('maxPrice', String(filters.priceRange[1]));
    else params.delete('maxPrice');
    
    if (filters.certification) params.set('certification', 'true');
    else params.delete('certification');

    router.push(`${pathname}?${params.toString()}`);
  };

  const resetFilters = () => {
    const clearedParams = new URLSearchParams();
    const q = searchParams.get('q');
    if (q) clearedParams.set('q', q); // Preserve search query
    
    router.push(`${pathname}?${clearedParams.toString()}`);
    // State will be updated by useEffect listening to searchParams
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
          <AccordionContent className="space-y-2 pt-2">
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
          <AccordionTrigger className="text-base font-medium">Price Range</AccordionTrigger>
          <AccordionContent className="space-y-3 pt-3">
            <Slider
              defaultValue={[0, 500]}
              min={0}
              max={500}
              step={10}
              value={filters.priceRange}
              onValueChange={(value) => handleFilterChange('priceRange', value)}
              className="my-4"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}{filters.priceRange[1] === 500 ? '+' : ''}</span>
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
                  <span className="ml-1">&amp; Up</span>
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
          <AccordionContent className="space-y-2 pt-2">
            {LANGUAGES.slice(0, 5).map(lang => ( // Show a subset for brevity
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
          <AccordionTrigger className="text-base font-medium">Instructor Type</AccordionTrigger>
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
                onCheckedChange={(checked) => handleFilterChange('certification', checked)}
              />
              <Label htmlFor="certification" className="font-normal text-sm">Certification Available</Label>
            </div>
          </AccordionContent>
        </AccordionItem>

      </Accordion>

      <Button onClick={applyFilters} className="w-full">Apply Filters</Button>
    </aside>
  );
}
