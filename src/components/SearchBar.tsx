"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon, Loader2, X as XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import axios from 'axios';
import type { Course } from '@/lib/types';
import Link from 'next/link';
import { debounce } from 'lodash';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
}

export function SearchBar({ className, placeholder = "Search..." }: SearchBarProps) {
  const router = useRouter();
  const currentSearchParams = useSearchParams();
  const pathname = usePathname();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Partial<Course>[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentQuery = currentSearchParams.get('q') || '';
    setQuery(currentQuery);
  }, [currentSearchParams]);

  useEffect(() => {
    setSuggestions([]);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      router.push(`/courses?q=${encodeURIComponent(trimmedQuery)}`);
      setSuggestions([]);
      setIsFocused(false);
    } else {
      router.push('/courses');
    }
  };

  const fetchSuggestions = async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setSuggestions([]);
      setIsLoading(false);
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
  
  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 300), []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery.length >= 2) {
      setIsLoading(true);
      debouncedFetchSuggestions(newQuery);
    } else {
      setSuggestions([]);
      debouncedFetchSuggestions.cancel();
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    // Removed router.push('/courses') to avoid search navigation on clear
  };

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
    <div className={cn("relative w-full", className)} ref={searchContainerRef}>
      <form onSubmit={handleSearch} className="relative w-full">
        <Input
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          className="w-full h-8 pl-10 pr-10 text-sm bg-white md:border md:border-blue-400 md:bg-[#15243f] md:text-white md:placeholder:text-gray-300 rounded-md border-0 text-black placeholder:text-gray-500"
          aria-label="Search courses"
          autoComplete="off"
        />
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        {query && (
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="absolute right-10 top-1/2 -translate-y-1/2 h-6 w-6"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <XIcon className="h-6 w-6 text-white z-10 -mr-2" />
          </Button>
        )}
        <Button
          type="submit"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-8 bg-[#5593f7] hover:bg-primary rounded-sm"
          aria-label="Submit search"
        >
          <SearchIcon className="h-3 w-3 text-white" />
        </Button>
      </form>

      {showSuggestions && (
        <div className="absolute top-full mt-2 w-full bg-white border rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
          {isLoading && suggestions.length === 0 ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
            </div>
          ) : (
            <ul className="divide-y">
              {suggestions.map((course) => (
                <li key={course._id || course.id}>
                  <Link
                    href={`/courses/${course._id || course.id}`}
                    className="block p-3 hover:bg-gray-100 transition-colors text-sm text-black"
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
    </div>
  );
}


// "use client";

// import { useState, useEffect, useCallback, useRef } from 'react';
// import { useRouter, useSearchParams, usePathname } from 'next/navigation';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Search as SearchIcon, Loader2 } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import axios from 'axios';
// import type { Course } from '@/lib/types';
// import Link from 'next/link';
// import { debounce } from 'lodash';

// interface SearchBarProps {
//   className?: string;
//   placeholder?: string;
// }

// export function SearchBar({ className, placeholder = "Search for courses..." }: SearchBarProps) {
//   const router = useRouter();
//   const currentSearchParams = useSearchParams();
//   const pathname = usePathname();
//   const [query, setQuery] = useState('');
//   const [suggestions, setSuggestions] = useState<Partial<Course>[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isFocused, setIsFocused] = useState(false);
//   const searchContainerRef = useRef<HTMLFormElement>(null);

//   useEffect(() => {
//     const currentQuery = currentSearchParams.get('q') || '';
//     setQuery(currentQuery);
//   }, [currentSearchParams]);

//   useEffect(() => {
//     setSuggestions([]);
//   }, [pathname]);

//   const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const trimmedQuery = query.trim();
//     if (trimmedQuery) {
//       router.push(`/courses?q=${encodeURIComponent(trimmedQuery)}`);
//       setSuggestions([]);
//       setIsFocused(false);
//     } else {
//       router.push('/courses');
//     }
//   };

//   const fetchSuggestions = async (searchQuery: string) => {
//     if (searchQuery.length < 2) {
//       setSuggestions([]);
//       setIsLoading(false);
//       return;
//     }
//     setIsLoading(true);
//     try {
//       const { data } = await axios.get(`/api/courses/suggestions?q=${encodeURIComponent(searchQuery)}`);
//       setSuggestions(data);
//     } catch (error) {
//       console.error("Failed to fetch search suggestions", error);
//       setSuggestions([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 300), []);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newQuery = e.target.value;
//     setQuery(newQuery);
//     if (newQuery.length >= 2) {
//       setIsLoading(true); // Show loader immediately
//       debouncedFetchSuggestions(newQuery);
//     } else {
//       setSuggestions([]);
//       debouncedFetchSuggestions.cancel();
//       setIsLoading(false);
//     }
//   };
  
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
//         setIsFocused(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);
  
//   const showSuggestions = isFocused && (suggestions.length > 0 || isLoading);

//   return (
//     <form onSubmit={handleSearch} className={cn("relative flex w-full items-center", className)} ref={searchContainerRef}>
//       <Input
//         type="search"
//         placeholder={placeholder}
//         value={query}
//         onChange={handleInputChange}
//         onFocus={() => setIsFocused(true)}
//         className="pr-12 h-10 text-base md:text-sm"
//         aria-label="Search courses"
//         autoComplete="off"
//       />
//       <Button
//         type="submit"
//         size="icon"
//         variant="ghost"
//         className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
//         aria-label="Submit search"
//       >
//         <SearchIcon className="h-4 w-4 text-muted-foreground" />
//       </Button>

//       {showSuggestions && (
//         <div className="absolute top-full mt-2 w-full bg-card border rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
//           {isLoading && suggestions.length === 0 ? (
//              <div className="flex items-center justify-center p-4">
//                 <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
//              </div>
//           ) : (
//             <ul className="divide-y">
//               {suggestions.map((course) => (
//                 <li key={course._id || course.id}>
//                   <Link 
//                     href={`/courses/${course._id || course.id}`} 
//                     className="block p-3 hover:bg-muted transition-colors text-sm text-foreground"
//                     onClick={() => {
//                         setIsFocused(false);
//                         setSuggestions([]);
//                         setQuery(course.title || '');
//                     }}
//                    >
//                     {course.title}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       )}
//     </form>
//   );
// }
