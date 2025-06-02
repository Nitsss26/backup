
import Image from 'next/image';
import Link from 'next/link';
import type { Course } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/ui/StarRating';
import { Clock, Users, BarChart2, ShieldCheck } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const categorySlug = course.category.toLowerCase().replace(/\s+/g, '-');
  const imageHint = `${categorySlug} course content`;

  return (
    <Card className="flex flex-col h-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border hover:border-primary/50">
      <Link href={`/courses/${course.id}`} className="block">
        <CardHeader className="p-0 relative">
          <Image
            src={course.imageUrl}
            alt={course.title}
            width={600}
            height={400}
            className="object-cover w-full h-48 group-hover:opacity-90 transition-opacity" // Added group-hover for image
            data-ai-hint={imageHint}
          />
          {course.providerInfo?.verified && (
            <Badge variant="default" className="absolute top-2 right-2 bg-green-500 hover:bg-green-600 text-white text-xs px-1.5 py-0.5 border-none">
              <ShieldCheck className="h-3 w-3 mr-1" /> Verified
            </Badge>
          )}
           {course.level && <Badge variant="secondary" className="absolute top-2 left-2 bg-background/80 text-foreground text-xs">{course.level}</Badge>}
        </CardHeader>
      </Link>
      <CardContent className="p-4 flex-grow">
        <Link href={`/courses/${course.id}`} className="block">
          <Badge variant="outline" className="mb-2 text-xs">{course.category}</Badge>
          <CardTitle className="text-lg font-semibold leading-tight mb-1 line-clamp-2 font-headline hover:text-primary transition-colors">
            {course.title}
          </CardTitle>
          <p className="text-xs text-muted-foreground mb-2">By {course.providerInfo?.name || course.instructor}</p>
        </Link>
        <div className="flex items-center mb-3">
          <StarRating rating={course.rating} size={16} />
          <span className="ml-2 text-xs text-muted-foreground">({course.reviewsCount} reviews)</span>
        </div>
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
      </CardContent>
      <CardFooter className="p-4 flex items-center justify-between border-t mt-auto">
        <div>
          <p className="text-xl font-bold text-primary">
            ₹{course.price.toLocaleString('en-IN')}
          </p>
          {course.originalPrice && (
            <p className="text-sm text-muted-foreground line-through">
              ₹{course.originalPrice.toLocaleString('en-IN')}
            </p>
          )}
        </div>
        <Button size="sm" asChild>
          <Link href={`/courses/${course.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
