
// import Image from 'next/image';
// import Link from 'next/link';
// import type { Course } from '@/lib/types';
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { StarRating } from '@/components/ui/StarRating';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Clock, Users, BarChart2, ShieldCheck, Eye } from 'lucide-react'; // Removed ShoppingCart
// // Removed useCart and useToast as they are no longer needed here

// interface CourseCardProps {
//   course: Course;
// }

// export function CourseCard({ course }: CourseCardProps) {
//   const categorySlug = course.category.toLowerCase().replace(/\s+/g, '-');
//   const imageHint = `${categorySlug} course content`;
//   const providerNameInitial = course.providerInfo?.name ? course.providerInfo.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase() : "P";
  
//   // Removed addToCart, cartItems, toast, handleAddToCart, isInCart

//   return (
//     <Card className="flex flex-col h-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border hover:border-primary/50">
//       <Link href={`/courses/${course.id}`} className="block group">
//         <CardHeader className="p-0 relative">
//           <Image
//             src={course.imageUrl}
//             alt={course.title}
//             width={600}
//             height={400}
//             className="object-cover w-full h-48 group-hover:opacity-90 transition-opacity"
//             data-ai-hint={imageHint}
//           />
//           {course.providerInfo?.verified && (
//             <Badge
//             variant="success"
//             className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 text-xs font-semibold tracking-wide text-white bg-green-600 border border-green-700 rounded-full shadow-md hover:bg-green-700 hover:shadow-lg transition-all duration-200 ease-in-out"
//             aria-label="Verified Provider"
//             title="This provider has been verified for authenticity and quality"
//           >
//             <ShieldCheck className="h-3.5 w-3.5" />
//             Verified
//           </Badge>
//           )}
//         </CardHeader>
//       </Link>
//       <CardContent className="p-4 flex-grow">
//         <Link href={`/courses/${course.id}`} className="block">
//           <Badge variant="outline" className="mb-2 text-xs">{course.category}</Badge>
//           <CardTitle className="text-lg font-semibold leading-tight mb-1 line-clamp-2 font-headline hover:text-primary transition-colors">
//             {course.title}
//           </CardTitle>
//         </Link>
//         <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
//           {course.providerInfo?.logoUrl && (
//             <Avatar className="h-5 w-5 border">
//               <AvatarImage src={course.providerInfo.logoUrl} alt={course.providerInfo.name} data-ai-hint="seller logo small course card"/>
//               <AvatarFallback className="text-xs">{providerNameInitial}</AvatarFallback>
//             </Avatar>
//           )}
//           <span>By {course.providerInfo?.name || course.instructor}</span>
//         </div>
//         <div className="flex items-center mb-3">
//           <StarRating rating={course.rating} size={16} />
//           <span className="ml-2 text-xs text-muted-foreground">({course.reviewsCount} reviews)</span>
//         </div>
//         <div className="text-sm text-muted-foreground space-y-1.5">
//           {course.duration && (
//             <div className="flex items-center gap-1.5">
//               <Clock className="h-3.5 w-3.5 text-primary/80" />
//               <span>{course.duration}</span>
//             </div>
//           )}
//            {course.studentsEnrolled && (
//             <div className="flex items-center gap-1.5">
//               <Users className="h-3.5 w-3.5 text-primary/80" />
//               <span>{course.studentsEnrolled.toLocaleString()} students</span>
//             </div>
//           )}
//         </div>
//       </CardContent>
//       <CardFooter className="p-4 flex items-center justify-between border-t mt-auto">
//         <div>
//           <p className="text-xl font-bold text-primary">
//             ₹{course.price.toLocaleString('en-IN')}
//           </p>
//           {course.originalPrice && (
//             <p className="text-sm text-muted-foreground line-through">
//               ₹{course.originalPrice.toLocaleString('en-IN')}
//             </p>
//           )}
//         </div>
//         <div className="flex items-center gap-2">
//             <Button variant="outline" size="sm" asChild>
//                 <Link href={`/courses/${course.id}`}><Eye className="mr-1.5 h-4 w-4" />Details</Link>
//             </Button>
//             {/* Removed Add to Cart button from here */}
//         </div>
//       </CardFooter>
//     </Card>
//   );
// }


"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Course } from '@/lib/types';
import { motion } from 'framer-motion';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const sellerLogos: { [key: string]: string } = {
    Udemy: 'https://images.unsplash.com/photo-1700589877598-吐896f9f5b6f?auto=compress&cs=tinysrgb&h=30',
    Coursera: 'https://images.unsplash.com/photo-1700589877599-吐896f9f5b6f?auto=compress&cs=tinysrgb&h=30',
    Unacademy: 'https://images.unsplash.com/photo-1700589877600-吐896f9f5b6f?auto=compress&cs=tinysrgb&h=30',
    'Physics Wallah': 'https://images.unsplash.com/photo-1700589877601-吐896f9f5b6f?auto=compress&cs=tinysrgb&h=30',
    Skillshare: 'https://images.unsplash.com/photo-1700589877602-吐896f9f5b6f?auto=compress&cs=tinysrgb&h=30',
    edX: 'https://images.unsplash.com/photo-1700589877603-吐896f9f5b6f?auto=compress&cs=tinysrgb&h=30',
  };

  const providerName = course.providerInfo?.name || course.instructor;
  const logoSrc = sellerLogos[providerName] || 'https://images.unsplash.com/photo-1700589877598-吐896f9f5b6f?auto=compress&cs=tinysrgb&h=30';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-[--bg-medium] rounded-xl p-5 hover-lift shadow-lg"
    >
      <Link href={`/courses/${course.id}`}>
        <div className="relative">
          <Image
            src={course.imageUrl}
            alt={course.title}
            width={400}
            height={200}
            className="w-full h-48 object-cover rounded-lg"
          />
          {course.originalPrice && (
            <span className="absolute -top-2 -left-2 bg-[--highlight-gold] text-black text-xs font-bold px-3 py-1 rounded-full shadow-md">
              {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
            </span>
          )}
        </div>
        <div className="flex items-center mt-4">
          <Image
            src={logoSrc}
            alt={`${providerName} logo`}
            width={24}
            height={24}
            className="rounded-full mr-2"
          />
          <p className="text-sm text-gray-400">{providerName}</p>
        </div>
        <h3 className="text-lg font-semibold mt-2 line-clamp-2 text-[--text-light]">{course.title}</h3>
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < Math.floor(course.rating) ? 'text-[--highlight-gold] fill-current' : 'text-gray-600'}`}
            />
          ))}
          <span className="text-sm text-gray-400 ml-2">({course.reviewsCount})</span>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <p className="text-xl font-bold text-[--primary-blue]">₹{course.price}</p>
          {course.originalPrice && (
            <p className="text-sm text-gray-500 line-through">₹{course.originalPrice}</p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}