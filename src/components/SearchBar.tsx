"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  initialQuery?: string;
}

export function SearchBar({ className, placeholder = "Search for courses...", initialQuery = "" }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/courses?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={cn("relative flex w-full items-center", className)}>
      <Input
        type="search"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pr-12 h-10 text-base md:text-sm"
        aria-label="Search courses"
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
    </form>
  );
}
