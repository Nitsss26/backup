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
      className="hover-lift overflow-x-auto"
    >
      <Link href={`/courses/${slug}`}>
        <div className={`${bgColor} text-[--text-light] px-4 md:px-1 py-4 rounded-lg text-center font-semibold hover:bg-[#5593f7] transition-colors shadow-md`}>
          {name}
        </div>
      </Link>
    </motion.div>
  );
}