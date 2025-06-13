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
      className="hover-lift"
    >
      <Link href={`/courses?category=${slug}`}>
        <div className={`w-full ${bgColor} text-[--text-light] py-4 rounded-lg text-center font-semibold hover:bg-[--secondary-blue] transition-colors`}>
          {name}
        </div>
      </Link>
    </motion.div>
  );
}