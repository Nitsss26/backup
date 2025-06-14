
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
//     return <div className="relative rounded-xl shadow-2xl bg-muted flex items-center justify-center h-[400px]"><p>No carousel items to display.</p></div>;
//   }

//   return (
//     <div className="relative overflow-hidden rounded-xl shadow-2xl">
//       <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
//         {items.map((item, index) => (
//           <motion.div
//             key={item.id}
//             className="min-w-full"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: currentSlide === index ? 1 : 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <div className="relative">
//               <Image
//                 src="https://static.uacdn.net/thumbnail/banner/185479d724064c5ba55d03a5c8ecbb0f.png?q=75&auto=format%2Ccompress&w=1200" // Use item.imageUrl here
//                 alt={item.title}
//                 width={1200}
//                 height={400}
//                 className="w-full h-[400px] object-cover"
//                 priority={index === 0} // Add priority for the first image
//                 data-ai-hint="course promotion banner"
//               />
//               <div className="absolute inset-0 bg-gradient-to-r from-[--primary-blue]/90 to-transparent flex flex-col justify-center p-8">
//                 <motion.h2
//                   className="text-4xl font-bold text-[--text-light]"
//                   initial={{ y: 20, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   transition={{ delay: 0.2 }}
//                 >
//                   {item.title}
//                 </motion.h2>
//                 <motion.p
//                   className="text-lg mt-3 text-gray-200 max-w-md"
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
//                   <Button asChild className="mt-6 bg-[--highlight-gold] text-black px-8 py-3 rounded-full font-semibold hover:bg-[--secondary-purple] hover:text-white transition-colors">
//                     <Link href={item.ctaLink}>{item.ctaText}</Link>
//                   </Button>
//                 </motion.div>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//         {items.map((_, index) => (
//           <span
//             key={index}
//             className={`w-3 h-3 rounded-full cursor-pointer ${index === currentSlide ? 'bg-[--highlight-gold]' : 'bg-gray-500'}`}
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
    console.log('Carousel items:', items);
    if (items.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextSlide = (prev + 1) % items.length;
        console.log('Current slide:', nextSlide);
        return nextSlide;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [items.length]);

  const goToSlide = (index: number) => {
    if (items.length === 0) return;
    setCurrentSlide(index);
    console.log('Go to slide:', index);
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
              <div className="absolute flex flex-col justify-center p-8">
                <motion.h2
                  className="text-4xl font-bold text-[--text-light]"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {item.title}
                </motion.h2>
                <motion.p
                  className="text-lg mt-3 text-gray-200 max-w-md"
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
                  <Button asChild className="mt-6 bg-[--highlight-gold] text-black px-8 py-3 rounded-full font-semibold hover:bg-[--secondary-purple] hover:text-white transition-colors">
                    <Link href={item.ctaLink}>{item.ctaText}</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer ${index === currentSlide ? 'bg-[--highlight-gold]' : 'bg-gray-500'}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}