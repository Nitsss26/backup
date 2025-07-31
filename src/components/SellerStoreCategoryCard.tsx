// // "use client";

// // import Image from 'next/image';
// // import Link from 'next/link';
// // import { motion } from 'framer-motion';

// // interface SellerStoreCategoryCardProps {
// //   name: string;
// //   slug: string;
// //   image: string;
// //   cta: string;
// // }

// // export function SellerStoreCategoryCard({ name, slug, image,cta }: SellerStoreCategoryCardProps) {
// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, scale: 0.95 }}
// //       animate={{ opacity: 1, scale: 1 }}
// //       transition={{ duration: 0.5 }}
// //       className="hover-lift"
// //     >
// //       <Link href={'cta'}>
// //         <div className="relative rounded-lg overflow-hidden shadow-md bg-[--bg-medium]">
// //           <Image src={image} alt={name} width={400} height={200} className="w-full h-[150px] object-cover" />
// //           <div className="absolute inset-0 bg-gradient-to-t from-[--primary-blue]/50 to-transparent flex items-end p-4">
// //             <h3 className="text-lg font-semibold text-[--text-light]">{name}</h3>
// //           </div>
// //         </div>
// //       </Link>
// //     </motion.div>
// //   );
// // }

// "use client";

// import Image from 'next/image';
// import Link from 'next/link';
// import { motion } from 'framer-motion';

// interface SellerStoreCategoryCardProps {
//   name: string;
//   slug: string;
//   image: string;
//   cta: string;
// }

// export function SellerStoreCategoryCard({ name, slug, image, cta }: SellerStoreCategoryCardProps) {
//   const redirectUrl = cta || 'https://ineuron.ai';

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.5 }}
//       className="hover-lift"
//     >
//       <Link
//         href={redirectUrl}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="block"
//       >
//         <div className="relative rounded-lg overflow-hidden shadow-md bg-[--bg-medium]">
//           <Image src={image} alt={name} width={400} height={200} className="w-full h-[150px] object-cover" />
//           <div className="absolute inset-0 bg-gradient-to-t from-[--primary-blue]/50 to-transparent flex items-end p-4">
//             <h3 className="text-lg font-semibold text-[--text-light]">{name}</h3>
//           </div>
//         </div>
//       </Link>
//     </motion.div>
//   );
// }

"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface SellerStoreCategoryCardProps {
  name: string;
  slug: string;
  image: string;
  cta: string;
}

export function SellerStoreCategoryCard({ name, slug, image, cta }: SellerStoreCategoryCardProps) {
  const redirectUrl = cta || 'https://ineuron.ai';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="hover-lift"
    >
      <Link
        href={redirectUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="relative rounded-lg overflow-hidden shadow-md bg-[--bg-medium]">
          <Image src={image} alt={name} width={400} height={200} className="w-full h-[150px] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[--primary-blue]/50 to-transparent flex items-end p-2 md:p-4">
            <h3 className="text-lg font-semibold text-[--text-light] md:text-lg text-sm">{name}</h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}