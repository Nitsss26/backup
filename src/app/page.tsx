
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CourseCard } from '@/components/CourseCard';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Carousel } from '@/components/Carousel';
import { BannerCard } from '@/components/BannerCard';
import { PromoCard } from '@/components/PromoCard';
import { CategoryCard } from '@/components/CategoryCard';
import { featuredCoursesForHomepage, topCategoryShowcaseData } from '@/lib/placeholder-data';
import { CATEGORIES, APP_NAME } from '@/lib/constants';
import { Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import Image from 'next/image'; // Added for missing Image import
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  Users,
  Zap,
  ShieldCheck,
  Store,
  UploadCloud,
  Star,
  GraduationCap,
} from 'lucide-react';


export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0); // This was for the old carousel, can be removed if new Carousel comp handles its own state
  const slides = [ // This was for the old carousel
    {
      title: "Master Python Programming",
      description: "Become a Python expert with our comprehensive course!",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      cta: "Enroll Now",
      href: "/courses/python",
    },
    {
      title: "Data Science Bootcamp",
      description: "Unlock the power of data with this hands-on course!",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
      cta: "Enroll Now",
      href: "/courses/data-science",
    },
  ];

  // This useEffect was for the old carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);


  const carouselItems = [
    {
      id: '1',
      title: 'Master IIT-JEE Physics',
      description: 'Ace your IIT-JEE with our comprehensive Physics course!',
      ctaText: 'Enroll Now',
      ctaLink: '/courses/featured-iitjee-01',
    },
    {
      id: '2',
      title: 'NEET Biology Bootcamp',
      description: 'Unlock your potential with this in-depth Biology course!',
      ctaText: 'Enroll Now',
      ctaLink: '/courses/featured-neet-01',
    },
  ];

  const platforms = [
    { name: 'Udemy', ctaLink: '/courses?platform=udemy', bgColor: 'bg-[--primary-blue]' },
    { name: 'Coursera', ctaLink: '/courses?platform=coursera', bgColor: 'bg-[--primary-blue]' },
    { name: 'Unacademy', ctaLink: '/courses?platform=unacademy', bgColor: 'bg-[--primary-blue]' },
    { name: 'Physics Wallah', ctaLink: '/courses?platform=physics-wallah', bgColor: 'bg-[--primary-blue]' },
    { name: 'Skillshare', ctaLink: '/courses?platform=skillshare', bgColor: 'bg-[--primary-blue]' },
    { name: 'edX', ctaLink: '/courses?platform=edx', bgColor: 'bg-[--primary-blue]' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-12 px-6 bg-[--bg-dark]">
          <div className="container flex flex-col md:flex-row space-x-0 md:space-x-4 gap-4">
            <div className="w-full md:w-3/4">
              <Carousel items={carouselItems} />
            </div>
            <div className="w-full md:w-1/4 flex flex-col gap-4">
              <BannerCard
                title="UPSC CSE Prep"
                description="Pre-Order Now"
                ctaText="Pre-Order"
                ctaLink="/courses/featured-gov-01"
                bgColor="bg-[--primary-blue]"
              />
              <PromoCard
                title="Special Offer: 50% Off!"
                ctaText="Claim Now"
                ctaLink="/offers/special"
              />
            </div>
          </div>
        </section>

        {/* Featured Banners */}
        <section className="py-12 px-6 bg-[--bg-medium] section-divider">
          <div className="container">
            <motion.h2
              className="text-3xl font-bold mb-8 text-center text-[--text-light]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Explore Top Categories
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <BannerCard
                title="Tech Courses"
                ctaText="Explore"
                ctaLink="/courses?category=computer-science"
                bgColor="bg-[--primary-blue]"
              />
              <BannerCard
                title="Business Courses"
                ctaText="Explore"
                ctaLink="/courses?category=business"
                bgColor="bg-[--primary-blue]"
              />
              <BannerCard
                title="Udemy"
                ctaText="Browse"
                ctaLink="/courses?platform=udemy"
                bgColor="bg-[--primary-blue]"
              />
              <BannerCard
                title="Coursera"
                ctaText="Browse"
                ctaLink="/courses?platform=coursera"
                bgColor="bg-[--primary-blue]"
              />
            </div>
          </div>
        </section>

        {/* Recommended For You */}
        <section className="py-12 px-6 bg-[--bg-dark] section-divider">
          <div className="container">
            <motion.h2
              className="text-3xl font-bold mb-8 text-center text-[--text-light] fade-in-up"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Recommended For You
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {featuredCoursesForHomepage.slice(0, 5).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>

        {/* Explore By Platforms */}
        <section className="py-12 px-6 bg-[--bg-medium] section-divider">
          <div className="container">
            <motion.h2
              className="text-3xl font-bold mb-8 text-center text-[--text-light] fade-in-up"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Explore By Platforms
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {platforms.map((platform) => (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="hover-lift"
                >
                  <Link href={platform.ctaLink}>
                    <Button className={`w-full py-4 rounded-lg ${platform.bgColor} text-[--text-light] hover:bg-[--secondary-blue] transition-colors`}>
                      {platform.name}
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Best Selling Courses */}
        <section className="py-12 px-6 bg-[--bg-dark] section-divider">
          <div className="container">
            <motion.h2
              className="text-3xl font-bold mb-8 text-center text-[--text-light] fade-in-up"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Best Selling Courses
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {topCategoryShowcaseData
                .flatMap((cat) => cat.courses)
                .slice(0, 5)
                .map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
            </div>
            <div className="text-center mt-8">
              <Button className="bg-[--primary-blue] text-[--text-light] px-8 py-3 rounded-full hover:bg-[--secondary-blue] transition-colors">
                Show All
              </Button>
            </div>
          </div>
        </section>

        {/* Get Extra Discounts */}
        <section className="py-12 px-6 bg-gradient-to-r from-[--primary-blue] to-[--bg-medium] section-divider">
          <div className="container flex flex-col md:flex-row justify-between items-center rounded-xl p-8">
            <motion.div
              className="text-center md:text-left"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-[--text-light]">Get Extra Discounts with EdTechCart Plus</h2>
              <Button asChild className="mt-4 bg-[--highlight-blue] text-white px-6 py-2 rounded-full hover:bg-[--secondary-blue] transition-colors">
                <Link href="/plus">Join Now</Link>
              </Button>
            </motion.div>
            <motion.div
              className="text-[--text-muted] mt-6 md:mt-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ul className="list-disc list-inside">
                <li>Up to 10% OFF on courses, bundles, and more</li>
                <li>Access to exclusive sale events</li>
                <li>Priority pre-order fulfillment</li>
                <li>Priority support</li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Best Selling Course Bundles */}
        <section className="py-12 px-6 bg-[--bg-medium] section-divider">
          <div className="container">
            <motion.h2
              className="text-3xl font-bold mb-8 text-center text-[--text-light] fade-in-up"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Best Selling Course Bundles
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                {
                  id: 'bundle1',
                  title: 'Full Stack Developer Bundle',
                  price: 3999,
                  providerInfo: { name: 'Udemy' },
                  rating: 4.8,
                  reviewsCount: 1200,
                },
                {
                  id: 'bundle2',
                  title: 'Data Science Bundle',
                  price: 4499,
                  providerInfo: { name: 'Coursera' },
                  rating: 4.9,
                  reviewsCount: 1500,
                },
                {
                  id: 'bundle3',
                  title: 'Business Mastery Bundle',
                  price: 3499,
                  providerInfo: { name: 'Unacademy' },
                  rating: 4.7,
                  reviewsCount: 900,
                },
                {
                  id: 'bundle4',
                  title: 'AI & ML Bundle',
                  price: 5999,
                  providerInfo: { name: 'Skillshare' },
                  rating: 4.8,
                  reviewsCount: 1100,
                },
                {
                  id: 'bundle5',
                  title: 'Design Mastery Bundle',
                  price: 3799,
                  providerInfo: { name: 'edX' },
                  rating: 4.6,
                  reviewsCount: 800,
                },
              ].map((bundle) => (
                <CourseCard key={bundle.id} course={bundle as any} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Button className="bg-[--primary-blue] text-[--text-light] px-8 py-3 rounded-full hover:bg-[--secondary-blue] transition-colors">
                Show All
              </Button>
            </div>
          </div>
        </section>

        {/* Discover Courses By Category */}
        <section className="py-12 px-6 bg-[--bg-dark] section-divider">
          <div className="container">
            <motion.h2
              className="text-3xl font-bold mb-8 text-center text-[--text-light] fade-in-up"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Discover Courses By Category
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
              {CATEGORIES.slice(0, 7).map((category) => (
                <CategoryCard
                  key={category.id}
                  name={category.name}
                  slug={category.slug}
                  bgColor="bg-[--bg-light]"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Best Selling Course Add-ons */}
        <section className="py-12 px-6 bg-[--bg-medium] section-divider">
          <div className="container">
            <motion.h2
              className="text-3xl font-bold mb-8 text-center text-[--text-light] fade-in-up"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Best Selling Course Add-ons
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                {
                  id: 'addon1',
                  title: 'Certification Add-on',
                  price: 499,
                  providerInfo: { name: 'EdTechCart' },
                  rating: 4.5,
                  reviewsCount: 600,
                },
                {
                  id: 'addon2',
                  title: '1:1 Mentorship',
                  price: 1999,
                  providerInfo: { name: 'EdTechCart' },
                  rating: 4.7,
                  reviewsCount: 400,
                },
                {
                  id: 'addon3',
                  title: 'Project Kit',
                  price: 799,
                  providerInfo: { name: 'EdTechCart' },
                  rating: 4.6,
                  reviewsCount: 500,
                },
                {
                  id: 'addon4',
                  title: 'Course Ebook',
                  price: 299,
                  providerInfo: { name: 'EdTechCart' },
                  rating: 4.4,
                  reviewsCount: 300,
                },
                {
                  id: 'addon5',
                  title: 'Practice Tests',
                  price: 599,
                  providerInfo: { name: 'EdTechCart' },
                  rating: 4.5,
                  reviewsCount: 450,
                },
              ].map((addon) => (
                <CourseCard key={addon.id} course={addon as any} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Button className="bg-[--primary-blue] text-[--text-light] px-8 py-3 rounded-full hover:bg-[--secondary-blue] transition-colors">
                Show All
              </Button>
            </div>
          </div>
        </section>

        {/* Discover By Price */}
        <section className="py-12 px-6 bg-[--bg-dark] section-divider">
          <div className="container">
            <motion.h2
              className="text-3xl font-bold mb-8 text-center text-[--text-light] fade-in-up"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Discover By Price
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {[
                { label: 'Under ₹500', href: '/courses?price=under-500' },
                { label: 'Under ₹1,000', href: '/courses?price=under-1000' },
                { label: 'Under ₹2,000', href: '/courses?price=under-2000' },
                { label: 'Under ₹5,000', href: '/courses?price=under-5000' },
                { label: 'Under ₹10,000', href: '/courses?price=under-10000' },
                { label: 'Above ₹10,000', href: '/courses?price=above-10000' },
              ].map((price) => (
                <motion.div
                  key={price.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="hover-lift"
                >
                  <Link href={price.href}>
                    <Button className="w-full bg-[--bg-light] text-[--text-light] py-4 rounded-lg hover:bg-[--secondary-blue] transition-colors">
                      {price.label}
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="py-12 px-6 bg-[--bg-medium] section-divider">
          <div className="container text-center">
            <motion.h2
              className="text-3xl font-bold mb-4 text-[--text-light] fade-in-up"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Subscribe to Our Newsletter
            </motion.h2>
            <motion.p
              className="text-lg text-[--text-muted] mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Get updates on the best courses and exclusive offers!
            </motion.p>
            <motion.div
              className="flex justify-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="relative w-full max-w-md">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-[--bg-light] text-[--text-light] rounded-full py-3 px-6 pl-12 focus:outline-none focus:ring-2 focus:ring-[--secondary-blue]"
                />
                <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[--accent-gray]" />
              </div>
              <Button className="bg-[--primary-blue] text-[--text-light] px-6 py-3 rounded-full hover:bg-[--secondary-blue] transition-colors">
                Subscribe
              </Button>
            </motion.div>
            <motion.p
              className="text-[--text-muted] mt-4 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              By subscribing, you agree to receive commercial communications from EdTechCart via email.
            </motion.p>
          </div>
        </section>

        {/* Best Selling Subscriptions */}
        <section className="py-12 px-6 bg-[--bg-dark] section-divider">
          <div className="container">
            <motion.h2
              className="text-3xl font-bold mb-8 text-center text-[--text-light] fade-in-up"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Best Selling Subscriptions
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                {
                  id: 'sub1',
                  title: 'Udemy Annual Subscription',
                  price: 3999,
                  providerInfo: { name: 'Udemy' },
                  rating: 4.8,
                  reviewsCount: 1000,
                },
                {
                  id: 'sub2',
                  title: 'Coursera Plus - 1 Month',
                  price: 999,
                  providerInfo: { name: 'Coursera' },
                  rating: 4.7,
                  reviewsCount: 800,
                },
                {
                  id: 'sub3',
                  title: 'Unacademy Plus - 3 Months',
                  price: 2499,
                  providerInfo: { name: 'Unacademy' },
                  rating: 4.6,
                  reviewsCount: 700,
                },
                {
                  id: 'sub4',
                  title: 'Skillshare - 1 Month',
                  price: 799,
                  providerInfo: { name: 'Skillshare' },
                  rating: 4.5,
                  reviewsCount: 600,
                },
                {
                  id: 'sub5',
                  title: 'edX Verified Track',
                  price: 1999,
                  providerInfo: { name: 'edX' },
                  rating: 4.6,
                  reviewsCount: 650,
                },
              ].map((sub) => (
                <CourseCard key={sub.id} course={sub as any} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Button className="bg-[--primary-blue] text-[--text-light] px-8 py-3 rounded-full hover:bg-[--secondary-blue] transition-colors">
                Show All
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
