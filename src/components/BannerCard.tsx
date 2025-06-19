
// "use client";

// import Link from 'next/link';
// import Image from 'next/image';
// import { Button } from '@/components/ui/button';
// import { motion } from 'framer-motion';
// import { cn } from '@/lib/utils';

// interface BannerCardProps {
//   imageUrl: string;
//   title: string;
//   description?: string;
//   ctaText: string;
//   ctaLink: string;
//   bgColor?: string;
//   dataAiHint?: string;
//   className?: string;
// }

// export function BannerCard({ imageUrl, title, description, ctaText, ctaLink, bgColor = 'bg-[--primary-blue]', dataAiHint = "banner image", className }: BannerCardProps) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.5 }}
//       className={cn("relative rounded-xl overflow-hidden hover-lift shadow-lg w-full aspect-video sm:aspect-[16/7] md:aspect-video", className)} // Added aspect ratio
//     >
//       <Link href={ctaLink} className="block w-full h-full">
//         <Image
//           src={imageUrl}
//           alt={title}
//           fill
//           sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
//           className="object-cover"
//           data-ai-hint={dataAiHint}
//         />
//         <div className={cn(
//             "absolute inset-0 flex flex-col justify-end p-3 sm:p-4",
//             bgColor // Allows dynamic background if needed, otherwise relies on image
//         )}>
//           <h3 className="text-sm sm:text-base md:text-lg font-bold text-white drop-shadow-md line-clamp-2">{title}</h3>
//           {description && <p className="text-xs sm:text-sm mt-1 text-gray-200 drop-shadow-sm line-clamp-1 sm:line-clamp-2">{description}</p>}
//            {/* CTA Button can be added here if needed for certain banners */}
//            {/* {ctaText && (
//             <Button size="xs" className="mt-2 bg-white/80 text-black px-2 py-1 h-auto text-[10px] sm:text-xs rounded-full font-semibold hover:bg-white transition-colors self-start">
//                 {ctaText}
//             </Button>
//            )} */}
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

interface BannerCardProps {
  imageUrl: string;
  title: string;
  description?: string;
  ctaText: string;
  ctaLink: string;
  bgColor?: string;
  dataAiHint?: string;
}

export function BannerCard({ imageUrl, title, description, ctaText, ctaLink, bgColor = 'bg-[--primary-blue]', dataAiHint = "banner image" }: BannerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-xl overflow-hidden hover-lift shadow-lg"
    >
      <Link href={ctaLink}>
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={200}
          className="w-full h-20 sm:h-32 object-cover"
          data-ai-hint={dataAiHint}
        />
        <div className={`absolute inset-0 ${bgColor} flex flex-col justify-center p-2 sm:p-4`}>
          <h3 className="text-sm sm:text-lg font-bold text-[--text-light]">{title}</h3>
          {description && <p className="text-xs sm:text-sm mt-1 text-gray-200">{description}</p>}
        </div>
      </Link>
    </motion.div>
  );
}