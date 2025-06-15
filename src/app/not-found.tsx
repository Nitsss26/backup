"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

export default function ComingSoon() {
  return (
    <div className="min-h-screen flex flex-col bg-[--bg-dark] text-[--text-light]">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="container flex flex-col items-center justify-center text-center">
          {/* Coming Soon Vector Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Image
              src="https://img.freepik.com/free-vector/students-concept-illustration_114360-8497.jpg?uid=R120730963&ga=GA1.1.1385959138.1748893744&semt=ais_hybrid&w=740"
              alt="Coming Soon"
              width={300}
              height={100}
              className="object-contain max-w-full h-auto rounded-lg shadow-lg"
              data-ai-hint="coming soon blue vector"
            />
          </motion.div>

          {/* Heading */}
          <motion.h1
  className="z-[100000] text-4xl md:text-5xl font-bold font-headline mb-5 bg-clip-text text-transparent bg-gradient-to-r from-[--primary-blue] to-[#5593f7] leading-relaxed py-2"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.4 }}
>
  Coming Soon!
</motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            We’re working on something exciting for you. Stay tuned for updates on new courses, subscriptions, and more!
          </motion.p>

          {/* Go Home Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button asChild className="bg-[--primary-blue] text-[--text-light] px-8 py-3 rounded-full font-semibold hover:bg-[--secondary-purple] transition-colors shadow-lg hover:shadow-xl">
              <Link href="/">Go Home</Link>
            </Button>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}