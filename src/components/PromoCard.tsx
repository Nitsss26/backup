
"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface PromoCardProps {
  imageUrl: string;
  title?: string;
  ctaText?: string;
  ctaLink?: string;
  dataAiHint?: string;
}

export function PromoCard({ 
  imageUrl, 
  title = '', 
  ctaText = '', 
  ctaLink = '#', 
  dataAiHint = "promo image" 
}: PromoCardProps) {
  const hasContent = title || ctaText;
  const isExternal = ctaLink.startsWith('http');
  
  const CardContent = () => (
    <>
      <Image
        src={imageUrl}
        alt={title || 'Promo'}
        width={400}
        height={400}
        className="w-full h-full object-cover"
        data-ai-hint={dataAiHint}
      />
      {hasContent && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
      )}
      {hasContent && (
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          {title && <h3 className="text-xl font-bold text-white">{title}</h3>}
        </div>
      )}
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative rounded-xl overflow-hidden hover-lift shadow-lg h-40 md:h-64"
    >
      {isExternal ? (
        <a href={ctaLink} target="_blank" rel="noopener noreferrer">
          <CardContent />
        </a>
      ) : (
        <Link href={ctaLink}>
          <CardContent />
        </Link>
      )}
    </motion.div>
  );
}
