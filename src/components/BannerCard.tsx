
"use client"; // Ensure this is at the very top

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion'; // Ensure this import is present

interface BannerCardProps {
  imageUrl: string;
  title: string;
  description?: string;
  ctaText: string;
  ctaLink: string;
  bgColor?: string;
}

export function BannerCard({ imageUrl, title, description, ctaText, ctaLink, bgColor = 'bg-[--primary-blue]' }: BannerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-xl overflow-hidden hover-lift shadow-lg"
    >
      <Link href={ctaLink}>
        <Image src={imageUrl} alt={title} width={400} height={200} className="w-full h-32 object-cover" />
        <div className={`absolute inset-0 ${bgColor} bg-opacity-80 flex flex-col justify-center p-4`}>
          <h3 className="text-lg font-bold text-[--text-light]">{title}</h3>
          {description && <p className="text-sm mt-1 text-gray-200">{description}</p>}
          <Button className="mt-2 bg-[--highlight-gold] text-black px-4 py-1 rounded-full font-semibold hover:bg-[--secondary-purple] hover:text-white transition-colors">
            {ctaText}
          </Button>
        </div>
      </Link>
    </motion.div>
  );
}
