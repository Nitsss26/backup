
"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface BannerCardProps {
  imageUrl: string;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  bgColor?: string;
  dataAiHint?: string;
  isMobile?: boolean; // Added isMobile prop
}

export function BannerCard({ 
  imageUrl, 
  title = '', 
  description = '', 
  ctaText = '', 
  ctaLink = '#', 
  bgColor = 'bg-[--primary-blue]', 
  dataAiHint = "banner image",
  isMobile = false, // Default to false
}: BannerCardProps) {
  const hasContent = title || description || ctaText;
  const isExternal = ctaLink.startsWith('http');

  const CardContent = () => (
    <>
      <Image
          src={imageUrl}
          alt={title || 'Banner'}
          width={isMobile ? 400 : 400} // Adjusted width for mobile
          height={isMobile ? 150 : 250} // Adjusted height for mobile
          className="w-full h-full object-cover"
          data-ai-hint={dataAiHint}
      />
      {hasContent && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
      )}
    </>
  )

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden hover-lift shadow-lg rounded-xl ${isMobile ? 'h-32 w-64' : 'h-40 md:h-48'}`} // Adjusted height and width for mobile
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
