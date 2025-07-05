
// // "use client";

// // import Link from 'next/link';
// // import Image from 'next/image';
// // import { Button } from '@/components/ui/button';
// // import { motion } from 'framer-motion';

// // interface BannerCardProps {
// //   imageUrl: string;
// //   title: string;
// //   description?: string;
// //   ctaText: string;
// //   ctaLink: string;
// //   bgColor?: string;
// //   dataAiHint?: string;
// // }

// // export function BannerCard({ imageUrl, title, description, ctaText, ctaLink, bgColor = 'bg-[--primary-blue]', dataAiHint = "banner image" }: BannerCardProps) {
// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, scale: 0.95 }}
// //       animate={{ opacity: 1, scale: 1 }}
// //       transition={{ duration: 0.5 }}
// //       className="relative rounded-xl overflow-hidden hover-lift shadow-lg"
// //     >
// //       <Link href={ctaLink}>
// //         <Image
// //           src={imageUrl}
// //           alt={title}
// //           width={400}
// //           height={200}
// //           className="w-full h-32 object-cover"
// //           data-ai-hint={dataAiHint}
// //         />
// //         <div className={`absolute inset-0  flex flex-col justify-center p-4`}>
// //           <h3 className="text-lg font-bold text-[--text-light]">{title}</h3>
// //           {description && <p className="text-sm mt-1 text-gray-200">{description}</p>}
// //           {/* <Button className="mt-2 bg-[--highlight-gold] text-black px-4 py-1 rounded-full font-semibold hover:bg-[--secondary-purple] hover:text-white transition-colors">
// //             {ctaText}
// //           </Button> */}
// //         </div>
// //       </Link>
// //     </motion.div>
// //   );
// // }

// "use client";
// import Link from 'next/link';
// import Image from 'next/image';
// import { motion } from 'framer-motion';

// interface BannerCardProps {
//   imageUrl: string;
//   title: string;
//   description?: string;
//   ctaText: string;
//   ctaLink: string;
//   bgColor?: string;
//   dataAiHint?: string;
// }

// export function BannerCard({ 
//   imageUrl, 
//   title, 
//   description, 
//   ctaText, 
//   ctaLink, 
//   bgColor = 'bg-[--primary-blue]', 
//   dataAiHint = "banner image" 
// }: BannerCardProps) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.5 }}
//       className="relative rounded-xl overflow-hidden hover-lift shadow-lg h-40 md:h-32"
//     >
//       <Link href={ctaLink}>
//         <Image
//           src={imageUrl}
//           alt={title}
//           width={400}
//           height={200}
//           className="w-full h-full object-cover"
//           data-ai-hint={dataAiHint}
//         />
//         <div className="absolute inset-0 flex flex-col justify-center p-4">
//           <h3 className="text-lg font-bold text-[--text-light]">{title}</h3>
//           {description && <p className="text-sm mt-1 text-gray-200">{description}</p>}
//         </div>
//       </Link>
//     </motion.div>
//   );
// }

"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface BannerCardProps {
  imageUrl: string;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  bgColor?: string;
  dataAiHint?: string;
}

export function BannerCard({ 
  imageUrl, 
  title = '', 
  description = '', 
  ctaText = '', 
  ctaLink = '#', 
  bgColor = 'bg-[--primary-blue]', 
  dataAiHint = "banner image" 
}: BannerCardProps) {
  const hasContent = title || description || ctaText;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-xl overflow-hidden hover-lift shadow-lg h-40 md:h-32"
    >
      <Link href={ctaLink}>
        <Image
          src={imageUrl}
          alt={title || 'Banner'}
          width={400}
          height={250}
          className="w-full h-full object-cover"
          data-ai-hint={dataAiHint}
        />
        {hasContent && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        )}
        {/* {hasContent && (
          <div className="absolute inset-0 flex flex-col justify-center p-4">
            {title && <h3 className="text-lg font-bold text-white">{title}</h3>}
            {description && <p className="text-sm mt-1 text-gray-200">{description}</p>}
          </div>
        )} */}
      </Link>
    </motion.div>
  );
}
