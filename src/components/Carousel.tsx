"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface CarouselItem {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

interface CarouselProps {
  items: CarouselItem[];
}

export function Carousel({ items }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [items.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative overflow-hidden rounded-xl">
      <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {items.map((item) => (
          <div key={item.id} className="carousel-slide min-w-full">
            <div className="relative">
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={1200}
                height={500}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-indigo-950/50 flex flex-col justify-center p-8 md:p-12">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl md:text-5xl font-bold gradient-text"
                >
                  {item.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-lg md:text-xl text-gray-200 mt-3 max-w-xl"
                >
                  {item.description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mt-6 flex flex-col md:flex-row gap-4"
                >
                  <Button asChild className="shiny-btn text-white px-6 py-2 rounded-full hover:bg-blue-700">
                    <Link href={item.ctaLink}>{item.ctaText}</Link>
                  </Button>
                  <div className="relative w-full max-w-md">
                    <Input
                      type="search"
                      placeholder="Search for courses..."
                      className="bg-gray-800/80 text-white rounded-full py-2 px-4 pl-10 border border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer ${index === currentSlide ? 'bg-cyan-400' : 'bg-gray-400'}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}