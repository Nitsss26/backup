
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface BannerCardProps {
  title: string;
  description?: string;
  ctaText: string;
  ctaLink: string;
  bgColor?: string;
}

export function BannerCard({ title, description, ctaText, ctaLink, bgColor = 'bg-[--primary-blue]' }: BannerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-xl overflow-hidden hover-lift"
    >
      <Link href={ctaLink} aria-label={`Navigate to ${title}`}>
        <div className="w-full h-32 bg-gray-700" />
        <div className={`absolute inset-0 ${bgColor} bg-opacity-70 flex flex-col justify-center p-4`}>
          <h3 className="text-lg font-bold text-[--text-light]">{title}</h3>
          {description && <p className="text-sm mt-2 text-[--text-muted]">{description}</p>}
          <Button className="mt-2 bg-[--secondary-blue] text-white px-4 py-1 rounded-full hover:bg-[--primary-blue] transition-colors">
            {ctaText}
          </Button>
        </div>
      </Link>
    </motion.div>
  );
}
