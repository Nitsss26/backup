"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface PromoCardProps {
  title: string;
  ctaText: string;
  ctaLink: string;
}

export function PromoCard({ title, ctaText, ctaLink }: PromoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative rounded-xl overflow-hidden hover-lift"
    >
      <Link href={ctaLink}>
        <div className="w-full h-96 bg-gray-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-[--primary-blue]/90 to-transparent flex flex-col justify-end p-6">
          <h3 className="text-2xl font-bold text-[--text-light]">{title}</h3>
          <Button className="mt-4 bg-[--highlight-blue] text-white px-6 py-2 rounded-full hover:bg-[--secondary-blue] transition-colors">
            {ctaText}
          </Button>
        </div>
      </Link>
    </motion.div>
  );
}
