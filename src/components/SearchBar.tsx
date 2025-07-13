
"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import axios from 'axios';
import type { Course } from '@/lib/types';
import Link from 'next/link';
import { debounce } from 'lodash';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
}

export function SearchBar({ className, placeholder = "Search for courses..." }: SearchBarProps) {
  const router = useRouter();
  const currentSearchParams = useSearchParams();
  const pathname = usePathname();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Partial<Course>[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchContainerRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Sync the search bar with the URL's query parameter on initial load
    const currentQuery = currentSearchParams.get('q') || '';
    setQuery(currentQuery);
  }, [currentSearchParams]);

  // When path changes (e.g., navigation), close suggestions.
  useEffect(() => {
    setSuggestions([]);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/courses?q=${encodeURIComponent(query.trim())}`);
      setSuggestions([]); // Close suggestions on submit
      setIsFocused(false);
    } else {
      router.push('/courses');
    }
  };

  const fetchSuggestions = async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await axios.get(`/api/courses/suggestions?q=${encodeURIComponent(searchQuery)}`);
      setSuggestions(data);
    } catch (error) {
      console.error("Failed to fetch search suggestions", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Use lodash's debounce to prevent API calls on every keystroke
  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 300), []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedFetchSuggestions(newQuery);
  };
  
  // Handle clicks outside the search component to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  const showSuggestions = isFocused && (suggestions.length > 0 || isLoading);

  return (
    <form onSubmit={handleSearch} className={cn("relative flex w-full items-center", className)} ref={searchContainerRef}>
      <Input
        type="search"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        className="pr-12 h-10 text-base md:text-sm"
        aria-label="Search courses"
        autoComplete="off"
      />
      <Button
        type="submit"
        size="icon"
        variant="ghost"
        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
        aria-label="Submit search"
      >
        <SearchIcon className="h-4 w-4 text-muted-foreground" />
      </Button>

      {showSuggestions && (
        <div className="absolute top-full mt-2 w-full bg-card border rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
          {isLoading ? (
             <div className="flex items-center justify-center p-4">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
             </div>
          ) : (
            <ul className="divide-y">
              {suggestions.map((course) => (
                <li key={course._id || course.id}>
                  <Link 
                    href={`/courses/${course._id || course.id}`} 
                    className="block p-3 hover:bg-muted transition-colors text-sm text-foreground"
                    onClick={() => {
                        setIsFocused(false);
                        setSuggestions([]);
                        setQuery(course.title || '');
                    }}
                   >
                    {course.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </form>
  );
}
