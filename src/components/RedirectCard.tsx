
import Image from 'next/image';
import Link from 'next/link';
import type { Course } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/ui/StarRating';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, Users } from 'lucide-react';

interface RedirectCardProps {
  course: Course & { cta: string };
  isMobile?: boolean;
}

export function RedirectCard({ course, isMobile = false }: RedirectCardProps) {
  const categorySlug = course.category;
  const imageHint = `${categorySlug} course content`;
  const providerNameInitial = course.providerInfo?.name
    ? course.providerInfo.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : "P";

  const CardLink = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <a href={course.cta} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );

  return (
    <Card className={`flex flex-col h-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border hover:border-primary/50 ${
      isMobile ? 'min-h-[260px] max-h-[280px]' : ''
    }`}>
        <CardLink className="block group">
            <CardHeader className="p-0 relative">
                <Image
                src={course.imageUrl || "https://placehold.co/600x400.png"}
                alt={course.title}
                width={600}
                height={400}
                className={`object-cover w-full ${isMobile ? 'h-20' : 'h-48'} transition-opacity`}
                data-ai-hint={imageHint}
                />
            </CardHeader>
        </CardLink>
      <CardContent className={`flex-grow ${isMobile ? 'p-2 pb-1' : 'p-4'}`}>
        <CardLink>
          <Badge variant="outline" className={`mb-1 ${isMobile ? 'text-xs px-1 py-0.5' : 'text-xs'}`}>
            {course.category}
          </Badge>
          <CardTitle className={`font-semibold leading-tight mb-1 line-clamp-2 font-headline transition-colors ${
            isMobile ? 'text-xs leading-tight' : 'text-lg'
          }`}>
            {course.title}
          </CardTitle>
        </CardLink>
        <div className={`flex items-center gap-2 text-xs text-muted-foreground mb-2 ${
          isMobile ? 'text-xs' : 'text-xs'
        }`}>
          {course.providerInfo?.logoUrl && (
            <Avatar className={`h-5 w-5 border ${isMobile ? 'h-3 w-3' : 'h-5 w-5'}`}>
              <AvatarImage src={course.providerInfo.logoUrl} alt={course.providerInfo.name} data-ai-hint="seller logo small course card" />
              <AvatarFallback className="text-xs">{providerNameInitial}</AvatarFallback>
            </Avatar>
          )}
          <span>By {course.providerInfo?.name || course.instructor}</span>
        </div>
        <div className="flex items-center mb-3">
          <StarRating rating={course.rating} size={isMobile ? 8 : 16} />
          <span className={`ml-2 text-xs text-muted-foreground ${
            isMobile ? 'text-xs' : 'text-xs'
          }`}>({course.reviewsCount} reviews)</span>
        </div>
        {isMobile ? (
          <div className="text-xs text-muted-foreground mb-1">
            {course.duration && (
              <div className="flex items-center gap-1">
                <Clock className="h-2.5 w-2.5 text-primary/80" />
                <span className="text-xs">{course.duration}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground space-y-1.5">
            {course.duration && (
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-primary/80" />
                <span>{course.duration}</span>
              </div>
            )}
            {course.studentsEnrolled && (
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-primary/80" />
                <span>{course.studentsEnrolled.toLocaleString()} students</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className={`p-4 flex items-center justify-between border-t mt-auto ${
        isMobile ? 'p-2 pt-1' : 'p-4'
      }`}>
        <div>
          <p className={`text-xl font-bold text-primary ${
            isMobile ? 'text-sm' : 'text-xl'
          }`}>
            ₹{course.price.toLocaleString('en-IN')}
          </p>
          {course.originalPrice && (
            <p className={`text-sm text-muted-foreground line-through ${
              isMobile ? 'text-xs' : 'text-sm'
            }`}>
              ₹{course.originalPrice.toLocaleString('en-IN')}
            </p>
          )}
        </div>
        <Button size={isMobile ? 'sm' : 'sm'}>
          <CardLink className="text-white">
            {isMobile ? 'View' : 'View Details'}
          </CardLink>
        </Button>
      </CardFooter>
    </Card>
  );
}
