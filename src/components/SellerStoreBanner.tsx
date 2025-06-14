
"use client"; // Added client directive

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion'; // Added motion import

interface SellerStoreBannerProps {
  image: string;
  title: string;
  ctaText: string;
  ctaLink: string;
}

export function SellerStoreBanner({ image, title, ctaText, ctaLink }: SellerStoreBannerProps) {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-md bg-[--bg-medium]">
      <Image src={image} alt={title} width={1200} height={300} className="w-full h-[200px] object-cover opacity-70" />
      <div className="absolute inset-0 flex items-center justify-between p-6">
        <motion.h3
          className="text-2xl font-bold text-[--text-light]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h3>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button asChild className="bg-[--highlight-gold] text-black px-6 py-2 rounded-full font-semibold hover:bg-[--secondary-purple] hover:text-white transition-colors">
            <Link href={ctaLink}>{ctaText}</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
