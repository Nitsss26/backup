
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { cn } from '@/lib/utils';

// interface CategoryCardProps {
//   name: string;
//   slug: string;
//   bgColor?: string;
// }

// export function CategoryCard({ name, slug, bgColor = 'bg-[--bg-light]' }: CategoryCardProps) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.5 }}
//       className="hover-lift h-full"
//     >
//       <Link href={`/courses?category=${slug}`} className="block h-full">
//         <div className={cn(
//           "w-full h-full flex items-center justify-center text-center text-[--text-light] p-2 sm:p-3 rounded-lg font-semibold hover:bg-[#5593f7] transition-colors shadow-md text-xs sm:text-sm",
//           bgColor
//         )}>
//           {name}
//         </div>
//       </Link>
//     </motion.div>
//   );
// }
import Link from 'next/link';
import { motion } from 'framer-motion';

interface CategoryCardProps {
  name: string;
  slug: string;
  bgColor?: string;
}

export function CategoryCard({ name, slug, bgColor = 'bg-[--bg-light]' }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="hover-lift w-32 sm:w-40"
    >
      <Link href={`/courses?category=${slug}`}>
        <div className={`w-full ${bgColor} text-[--text-light] py-2 sm:py-4 rounded-lg text-center font-semibold hover:bg-[#5593f7] transition-colors shadow-md text-xs sm:text-sm`}>
          {name}
        </div>
      </Link>
    </motion.div>
  );
}