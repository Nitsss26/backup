import Link from 'next/link';
import { motion } from 'framer-motion';

interface CategoryCard2Props {
  id: string;
  name: string;
  bgColor?: string;
  isMobile?: boolean;
}

export function CategoryCard2({ id, name, bgColor = 'bg-[--bg-light]', isMobile = false }: CategoryCard2Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="hover-lift overflow-x-auto"
    >
      <Link href={`/${id}`}>
        <div className={`${bgColor} text-[--text-light] px-4 ${isMobile ? 'py-4' : 'md:px-1 py-2'} rounded-lg text-center font-semibold hover:bg-[#5593f7] transition-colors shadow-md`}>
          {name}
        </div>
      </Link>
    </motion.div>
  );
}