
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("mb-6", className)}>
      <ol className="flex items-center flex-wrap gap-x-1.5 gap-y-1 text-sm text-muted-foreground">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.href && index < items.length - 1 ? (
              <Link href={item.href} className="hover:text-primary transition-colors whitespace-nowrap">
                {item.label}
              </Link>
            ) : (
              <span className={cn(
                  "font-medium text-foreground truncate max-w-[200px] sm:max-w-xs md:max-w-md", // Added truncate and max-width
                  index === items.length - 1 && "text-foreground"
              )}>
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <ChevronRight className="h-4 w-4 text-muted-foreground mx-1.5 shrink-0" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
