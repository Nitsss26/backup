
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface PromoCardProps {
  imageUrl: string;
  title: string;
  ctaText: string;
  ctaLink: string;
  dataAiHint?: string;
}

export function PromoCard({ imageUrl, title, ctaText, ctaLink, dataAiHint = "promo image" }: PromoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative rounded-xl overflow-hidden hover-lift shadow-lg"
    >
      <Link href={ctaLink}>
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={400}
          className="w-full h-64 object-cover"
          data-ai-hint={dataAiHint}
        />
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <h3 className="text-xl font-bold text-[--text-light]">{title}</h3>
          {/* <Button className="mt-4 bg-[--highlight-gold] text-black px-6 py-2 rounded-full font-semibold hover:bg-[--secondary-purple] hover:text-white transition-colors">
            {ctaText}
          </Button> */}
        </div>
      </Link>
    </motion.div>
  );
}
