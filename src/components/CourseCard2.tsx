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
  isMobile?: boolean;
}

export function CourseCard2({ course, isMobile = false }: CourseCardProps) {
  const categorySlug = course.category;
  const imageHint = `${categorySlug} course content`;
  const providerNameInitial = course.providerInfo?.name ? course.providerInfo.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase() : "P";

  return (
    <Card className="flex flex-col h-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border hover:border-primary/50">
      <Link href={`/courses/${course.id}`} className="block group">
        <CardHeader className="p-0 relative">
          <Image
            src={course.imageUrl || "https://placehold.co/600x400.png"}
            alt={course.title}
            width={600}
            height={400}
            className={`object-cover w-full group-hover:opacity-90 transition-opacity ${
              isMobile ? 'h-24' : 'h-32 sm:h-40 md:h-48'
            }`}
            data-ai-hint={imageHint}
          />
        </CardHeader>
      </Link>
      
      <CardContent className={`flex-grow ${isMobile ? 'p-2' : 'p-3 sm:p-4'}`}>
        <Link href={`/courses/${course.id}`} className="block">
          <Badge variant="outline" className={`mb-2 ${isMobile ? 'text-xs' : 'text-xs'}`}>
            {course.category}
          </Badge>
          <CardTitle className={`font-semibold leading-tight mb-2 line-clamp-2 font-headline hover:text-primary transition-colors ${
            isMobile ? 'text-xs' : 'text-sm sm:text-base md:text-lg'
          }`}>
            {course.title}
          </CardTitle>
        </Link>
        
        <div className={`flex items-center gap-2 text-muted-foreground mb-2 ${isMobile ? 'text-xs' : 'text-xs'}`}>
          {course.providerInfo?.logoUrl && (
            <Avatar className={`border ${isMobile ? 'h-3 w-3' : 'h-4 w-4 sm:h-5 sm:w-5'}`}>
              <AvatarImage src={course.providerInfo.logoUrl} alt={course.providerInfo.name} data-ai-hint="seller logo small course card"/>
              <AvatarFallback className="text-xs">{providerNameInitial}</AvatarFallback>
            </Avatar>
          )}
          <span className="truncate">By {course.providerInfo?.name || course.instructor}</span>
        </div>
        
        <div className="flex items-center mb-3">
          <StarRating rating={course.rating} size={isMobile ? 12 : 14} />
          <span className={`ml-1 text-muted-foreground ${isMobile ? 'text-xs' : 'text-xs'}`}>
            ({course.reviewsCount})
          </span>
        </div>
        
        <div className={`text-muted-foreground space-y-1 ${isMobile ? 'text-xs' : 'text-xs'}`}>
          {course.duration && (
            <div className="flex items-center gap-1.5">
              <Clock className={`text-primary/80 ${isMobile ? 'h-3 w-3' : 'h-3 w-3'}`} />
              <span>{course.duration}</span>
            </div>
          )}
          {course.studentsEnrolled && (
            <div className={`flex items-center gap-1.5 ${isMobile ? 'block' : 'sm:block hidden'}`}>
              <Users className={`text-primary/80 ${isMobile ? 'h-3 w-3' : 'h-3 w-3'}`} />
              <span>{course.studentsEnrolled.toLocaleString()} students</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className={`flex items-center justify-between border-t mt-auto ${isMobile ? 'p-2' : 'p-3 sm:p-4'}`}>
        <div className="flex-1 min-w-0">
          <p className={`font-bold text-primary ${isMobile ? 'text-sm' : 'text-sm sm:text-base md:text-lg'}`}>
            ₹{course.price.toLocaleString('en-IN')}
          </p>
          {course.originalPrice && (
            <p className={`text-muted-foreground line-through ${isMobile ? 'text-xs' : 'text-xs sm:text-sm'}`}>
              ₹{course.originalPrice.toLocaleString('en-IN')}
            </p>
          )}
        </div>
        <Button size="sm" asChild className={`flex-shrink-0 ${isMobile ? 'text-xs h-7 px-2' : 'text-xs sm:text-sm'}`}>
          <Link 
            className="text-white" 
            href={`/courses/${course.id}`}
          >
            <span className={isMobile ? 'text-xs' : 'hidden sm:inline'}>
              {isMobile ? 'View' : 'View Details'}
            </span>
            <span className={isMobile ? 'hidden' : 'sm:hidden'}>View</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}