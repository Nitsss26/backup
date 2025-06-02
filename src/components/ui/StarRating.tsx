"use client";

import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  size?: number;
  className?: string;
  showText?: boolean;
  reviewsCount?: number;
}

export function StarRating({
  rating,
  totalStars = 5,
  size = 16,
  className,
  showText = false,
  reviewsCount,
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.4 && rating % 1 < 0.9; // Show half star for .4 to .89
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} fill="currentColor" className="text-yellow-400" style={{ width: size, height: size }} />
      ))}
      {halfStar && <StarHalf key="half" fill="currentColor" className="text-yellow-400" style={{ width: size, height: size }} />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="text-yellow-400/50" style={{ width: size, height: size }} />
      ))}
      {showText && (
        <span className="ml-1 text-sm text-muted-foreground">
          {rating.toFixed(1)}
          {reviewsCount !== undefined && ` (${reviewsCount})`}
        </span>
      )}
    </div>
  );
}
