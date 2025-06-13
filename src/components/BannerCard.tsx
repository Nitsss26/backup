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
}

export function BannerCard({ imageUrl, title, description, ctaText, ctaLink, bgColor = 'bg-gradient-to-r from-gray-900 to-indigo-950' }: BannerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="block relative rounded-xl overflow-hidden hover-scale glow-on-hover"
    >
      <Link href={ctaLink}>
        <Image src={imageUrl} alt={title} width={400} height={200} className="w-full h-40 object-cover" />
        <div className={`absolute inset-0 ${bgColor} bg-opacity-70 flex flex-col justify-center p-4`}>
          <h3 className="text-lg font-bold gradient-text">{title}</h3>
          {description && <p className="text-sm mt-2 text-gray-200">{description}</p>}
          <Button className="mt-3 shiny-btn text-white px-4 py-1 rounded-full">
            {ctaText}
          </Button>
        </div>
      </Link>
    </motion.div>
  );
}