
// "use client";

// import Link from 'next/link';
// import Image from 'next/image';
// import { Button } from '@/components/ui/button';
// import { motion } from 'framer-motion';
// import { cn } from '@/lib/utils';

// interface PromoCardProps {
//   imageUrl: string;
//   title: string;
//   ctaText: string;
//   ctaLink: string;
//   dataAiHint?: string;
//   className?: string;
// }

// export function PromoCard({ imageUrl, title, ctaText, ctaLink, dataAiHint = "promo image", className }: PromoCardProps) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.5, delay: 0.2 }}
//       className={cn("relative rounded-xl overflow-hidden hover-lift shadow-lg w-full aspect-[4/3] sm:aspect-square md:aspect-[4/3]", className)} // Added aspect ratio
//     >
//       <Link href={ctaLink} className="block w-full h-full">
//         <Image
//           src={imageUrl}
//           alt={title}
//           fill
//           sizes="(max-width: 768px) 100vw, (max-width: 1024px) 25vw, 25vw"
//           className="object-cover"
//           data-ai-hint={dataAiHint}
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-3 sm:p-4">
//           <h3 className="text-base sm:text-lg md:text-xl font-bold text-white drop-shadow-md line-clamp-2">{title}</h3>
//            {/* CTA Button can be added here if needed for certain promos */}
//           {/* {ctaText && (
//             <Button size="xs" className="mt-2 bg-[--highlight-gold] text-black px-3 py-1 h-auto text-xs sm:text-sm rounded-full font-semibold hover:bg-[--secondary-purple] hover:text-white transition-colors self-start">
//                 {ctaText}
//             </Button>
//           )} */}
//         </div>
//       </Link>
//     </motion.div>
//   );
// }

"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface PromoCardProps {
  imageUrl: string;
  title: string;
  ctaText: string;
  ctaLink: string;
  dataAiHint?: string;
}

export function PromoCard({ imageUrl, title, ctaText, ctaLink, dataAiHint = "promo image" }: PromoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative rounded-xl overflow-hidden hover-lift shadow-lg w-40 sm:w-full"
    >
      <Link href={ctaLink}>
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={400}
          className="w-full h-32 sm:h-64 object-cover"
          data-ai-hint={dataAiHint}
        />
        <div className="absolute inset-0 flex flex-col justify-end p-1 sm:p-6">
          <h3 className="text-sm sm:text-xl font-bold text-[--text-light]">{title}</h3>
        </div>
      </Link>
    </motion.div>
  );
}