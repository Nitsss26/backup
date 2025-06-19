
"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Course } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/ui/StarRating';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, Users, BarChart2, ShieldCheck } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const categorySlug = course.category;
  const imageHint = `${categorySlug} course content`;
  const providerNameInitial = course.providerInfo?.name ? course.providerInfo.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase() : "P";

  return (
    <Card className="flex flex-col h-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border hover:border-primary/50">
      <Link href={`/courses/${course.id}`} className="block group">
        <CardHeader className="p-0 relative aspect-video">
          <Image
            src={course.imageUrl || "https://placehold.co/600x400.png"}
            alt={course.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover group-hover:opacity-90 transition-opacity"
            data-ai-hint={imageHint}
          />
        </CardHeader>
      </Link>
      <CardContent className="p-3 sm:p-4 flex-grow flex flex-col">
        <Link href={`/courses/${course.id}`} className="block mb-auto">
          <Badge variant="outline" className="mb-1 text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2">{course.category}</Badge>
          <CardTitle className="text-sm sm:text-base font-semibold leading-snug mb-1 line-clamp-2 font-headline hover:text-primary transition-colors">
            {course.title}
          </CardTitle>
        </Link>
        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-muted-foreground mb-1.5">
          {course.providerInfo?.logoUrl && (
            <Avatar className="h-4 w-4 border">
              <AvatarImage src={course.providerInfo.logoUrl} alt={course.providerInfo.name || "Provider"} data-ai-hint="seller logo small course card"/>
              <AvatarFallback className="text-[8px]">{providerNameInitial}</AvatarFallback>
            </Avatar>
          )}
          <span>By {course.providerInfo?.name || course.instructor}</span>
          {course.providerInfo?.verified && <ShieldCheck className="h-3 w-3 text-green-500" />}
        </div>
        <div className="flex items-center mb-1 sm:mb-3">
          <StarRating rating={course.rating} size={16} />
          <span className="ml-1 sm:ml-2 text-xs text-muted-foreground">({course.reviewsCount} reviews)</span>
        </div>
        <div className="text-xs sm:text-sm text-muted-foreground space-y-1 sm:space-y-1.5">
          {course.duration && (
            <div className="flex items-center gap-1 sm:gap-1.5">
              <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary/80" />
              <span>{course.duration}</span>
            </div>
          )}
          {course.studentsEnrolled && (
            <div className="flex items-center gap-1 sm:gap-1.5">
              <Users className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary/80" />
              <span>{course.studentsEnrolled.toLocaleString()} students</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-2 sm:p-4 flex items-center justify-between border-t mt-auto">
        <div>
          <p className="text-base sm:text-xl font-bold text-primary">
            ₹{course.price.toLocaleString('en-IN')}
          </p>
          {course.originalPrice && (
            <p className="text-xs sm:text-sm text-muted-foreground line-through">
              ₹{course.originalPrice.toLocaleString('en-IN')}
            </p>
          )}
        </div>
        <Button size="sm" asChild className="text-xs sm:text-sm">
          <Link className="text-white" href={`/courses/${course.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
