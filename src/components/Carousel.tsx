
// "use client";

// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';
// import { motion } from 'framer-motion';

// interface CarouselItem {
//   id: string;
//   imageUrl: string;
//   title: string;
//   description: string;
//   ctaText: string;
//   ctaLink: string;
// }

// interface CarouselProps {
//   items: CarouselItem[];
// }

// export function Carousel({ items }: CarouselProps) {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     if (items.length === 0) return;

//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % items.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [items.length]);

//   const goToSlide = (index: number) => {
//     if (items.length === 0) return;
//     setCurrentSlide(index);
//   };

//   if (items.length === 0) {
//     return <div className="relative rounded-xl shadow-2xl bg-muted flex items-center justify-center h-64 sm:h-80 md:h-96 lg:h-[400px]"><p>No carousel items to display.</p></div>;
//   }

//   return (
//     <div className="relative overflow-hidden rounded-xl shadow-2xl aspect-video md:aspect-[16/7] lg:aspect-[16/6]">
//       <div className="flex transition-transform duration-700 ease-in-out h-full" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
//         {items.map((item, index) => (
//           <div key={item.id} className="min-w-full h-full">
//             <div className="relative h-full">
//               <Image
//                 src={item.imageUrl}
//                 alt={item.title}
//                 fill
//                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 1200px"
//                 className="object-cover"
//                 priority={index === 0}
//                 data-ai-hint="course promotion banner"
//               />
//               <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent flex flex-col justify-center p-4 sm:p-6 md:p-8 lg:p-12">
//                 <motion.h2
//                   className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white"
//                   initial={{ y: 20, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   transition={{ delay: 0.2 }}
//                 >
//                   {item.title}
//                 </motion.h2>
//                 <motion.p
//                   className="text-sm sm:text-base md:text-lg mt-2 sm:mt-3 text-gray-200 max-w-md lg:max-w-lg line-clamp-2 sm:line-clamp-3"
//                   initial={{ y: 20, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   transition={{ delay: 0.4 }}
//                 >
//                   {item.description}
//                 </motion.p>
//                 <motion.div
//                   initial={{ y: 20, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   transition={{ delay: 0.6 }}
//                 >
//                   <Button asChild className="mt-4 sm:mt-6 bg-[--highlight-gold] text-black px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-full font-semibold hover:bg-[--secondary-purple] hover:text-white transition-colors text-xs sm:text-sm md:text-base">
//                     <Link href={item.ctaLink}>{item.ctaText}</Link>
//                   </Button>
//                 </motion.div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2">
//         {items.map((_, index) => (
//           <button
//             key={index}
//             className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full cursor-pointer transition-all duration-300 ${index === currentSlide ? 'bg-[--highlight-gold] scale-125' : 'bg-gray-400/70 hover:bg-gray-200'}`}
//             onClick={() => goToSlide(index)}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface CarouselItem {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

interface CarouselProps {
  items: CarouselItem[];
}

export function Carousel({ items }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (items.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextSlide = (prev + 1) % items.length;
        return nextSlide;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [items.length]);

  const goToSlide = (index: number) => {
    if (items.length === 0) return;
    setCurrentSlide(index);
  };

  if (items.length === 0) {
    return <div className="relative rounded-xl shadow-2xl bg-muted flex items-center justify-center h-[400px]"><p>No carousel items to display.</p></div>;
  }

  return (
    <div className="relative overflow-hidden rounded-xl shadow-2xl">
      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {items.map((item, index) => (
          <div key={item.id} className="min-w-full">
            <div className="relative">
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={1200}
                height={400}
                className="w-full h-[400px] object-cover"
                priority={index === 0}
                data-ai-hint="course promotion banner"
              />
              <div className="absolute inset-0 flex flex-col justify-center p-4 sm:p-6">
                <motion.h2
                  className="text-2xl sm:text-4xl font-bold text-[--text-light]"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {item.title}
                </motion.h2>
                <motion.p
                  className="text-sm sm:text-lg mt-1 sm:mt-3 text-gray-200 max-w-md"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {item.description}
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button asChild className="mt-2 sm:mt-4 bg-[--highlight-gold] text-black px-3 sm:px-6 py-1 sm:py-2 rounded-full font-semibold hover:bg-[--secondary-purple] hover:text-white transition-colors">
                    <Link href={item.ctaLink}>{item.ctaText}</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
        {items.map((_, index) => (
          <span
            key={index}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-pointer ${index === currentSlide ? 'bg-[--highlight-gold]' : 'bg-gray-500'}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}