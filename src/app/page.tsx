
"use client"; // Added this directive

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
import { motion } from 'framer-motion'; // Added this import
import { heroSectionData } from '@/lib/heroSectionData';
import { Input } from '@/components/ui/input'; // Added this import
import { useEffect, useState } from 'react'; // Added for carousel state

export default function HomePage() {
  const { carouselItems, rightBanner, promoCard, bottomBanners } = heroSectionData;
  const [currentSlide, setCurrentSlide] = useState(0); // Added for carousel

  useEffect(() => { // Added for carousel
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselItems.length]);


  const platforms = [
    { name: 'Udemy', ctaLink: '/courses?platform=udemy', bgColor: 'bg-[--primary-blue]' },
    { name: 'Coursera', ctaLink: '/courses?platform=coursera', bgColor: 'bg-[--accent-teal]' },
    { name: 'Unacademy', ctaLink: '/courses?platform=unacademy', bgColor: 'bg-[--secondary-purple]' },
    { name: 'Physics Wallah', ctaLink: '/courses?platform=physics-wallah', bgColor: 'bg-[--highlight-gold]' },
    { name: 'Skillshare', ctaLink: '/courses?platform=skillshare', bgColor: 'bg-[--primary-blue]' },
    { name: 'edX', ctaLink: '/courses?platform=edx', bgColor: 'bg-[--accent-teal]' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section (Matching Driffle’s Layout) */}
        <section className="py-12 px-6 bg-gradient-to-b from-[--bg-dark] to-[--bg-medium]">
          <div className="container">
            {/* Top Row: Carousel (75%) + Right Stack (25%) */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-3/4">
                <Carousel items={carouselItems} />
              </div>
              <div className="w-full md:w-1/4 flex flex-col gap-6">
                <BannerCard
                  imageUrl={rightBanner.imageUrl}
                  title={rightBanner.title}
                  description={rightBanner.description}
                  ctaText={rightBanner.ctaText}
                  ctaLink={rightBanner.ctaLink}
                  bgColor={rightBanner.bgColor}
                />
                <PromoCard
                  imageUrl={promoCard.imageUrl}
                  title={promoCard.title}
                  ctaText={promoCard.ctaText}
                  ctaLink={promoCard.ctaLink}
                />
              </div>
            </div>
            {/* Bottom Row: 4 Banner Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
              {bottomBanners.map((banner, index) => (
                <BannerCard
                  key={index}
                  imageUrl={banner.imageUrl}
                  title={banner.title}
                  ctaText={banner.ctaText}
                  ctaLink={banner.ctaLink}
                  bgColor={banner.bgColor}
                />
              ))}
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
        <section className="py-12 px-6 bg-[--bg-medium] pattern-bg section-divider">
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
                    <Button className={`w-full py-4 rounded-lg ${platform.bgColor} text-[--text-light] font-semibold hover:bg-[--secondary-purple] transition-colors shadow-md`}>
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
              <Button className="bg-[--primary-blue] text-[--text-light] px-8 py-3 rounded-full font-semibold hover:bg-[--secondary-purple] transition-colors">
                Show All
              </Button>
            </div>
          </div>
        </section>

        {/* Get Extra Discounts */}
        <section className="py-12 px-6 bg-gradient-to-r from-[--primary-blue] to-[--secondary-purple] section-divider">
          <div className="container flex flex-col md:flex-row justify-between items-center rounded-xl p-8">
            <motion.div
              className="text-center md:text-left"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-[--text-light]">Get Extra Discounts with EdTechCart Plus</h2>
              <Button asChild className="mt-4 bg-[--highlight-gold] text-black px-6 py-2 rounded-full font-semibold hover:bg-[--text-light] hover:text-[--primary-blue] transition-colors">
                <Link href="/plus">Join Now</Link>
              </Button>
            </motion.div>
            <motion.div
              className="text-gray-200 mt-6 md:mt-0"
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
        <section className="py-12 px-6 bg-[--bg-medium] pattern-bg section-divider">
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
                  imageUrl: 'https://images.unsplash.com/photo-1700589877609-吐896f9f5b6f?auto=compress&cs=tinysrgb&w=400&h=200',
                  providerInfo: { name: 'Udemy' },
                  rating: 4.8,
                  reviewsCount: 1200,
                  category: "Computer Science"
                },
                {
                  id: 'bundle2',
                  title: 'Data Science Bundle',
                  price: 4499,
                  imageUrl: 'https://images.unsplash.com/photo-1700589877610-吐896f9f5b6f?auto=compress&cs=tinysrgb&w=400&h=200',
                  providerInfo: { name: 'Coursera' },
                  rating: 4.9,
                  reviewsCount: 1500,
                  category: "Computer Science"
                },
                {
                  id: 'bundle3',
                  title: 'Business Mastery Bundle',
                  price: 3499,
                  imageUrl: 'https://images.unsplash.com/photo-1700589877611-吐896f9f5b6f?auto=compress&cs=tinysrgb&w=400&h=200',
                  providerInfo: { name: 'Unacademy' },
                  rating: 4.7,
                  reviewsCount: 900,
                  category: "Business & Finance"
                },
                {
                  id: 'bundle4',
                  title: 'AI & ML Bundle',
                  price: 5999,
                  imageUrl: 'https://images.unsplash.com/photo-1700589877612-吐896f9f5b6f?auto=compress&cs=tinysrgb&w=400&h=200',
                  providerInfo: { name: 'Skillshare' },
                  rating: 4.8,
                  reviewsCount: 1100,
                  category: "Computer Science"
                },
                {
                  id: 'bundle5',
                  title: 'Design Mastery Bundle',
                  price: 3799,
                  imageUrl: 'https://images.unsplash.com/photo-1700589877613-吐896f9f5b6f?auto=compress&cs=tinysrgb&w=400&h=200',
                  providerInfo: { name: 'edX' },
                  rating: 4.6,
                  reviewsCount: 800,
                  category: "Design & Illustration"
                },
              ].map((bundle) => (
                <CourseCard key={bundle.id} course={bundle as any} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Button className="bg-[--primary-blue] text-[--text-light] px-8 py-3 rounded-full font-semibold hover:bg-[--secondary-purple] transition-colors">
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
        <section className="py-12 px-6 bg-[--bg-medium] pattern-bg section-divider">
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
                  imageUrl: 'https://images.unsplash.com/photo-1700589877614-吐896f9f5b6f?auto=compress&cs=tinysrgb&w=400&h=200',
                  providerInfo: { name: 'EdTechCart' },
                  rating: 4.5,
                  reviewsCount: 600,
                  category: "Add-ons"
                },
                {
                  id: 'addon2',
                  title: '1:1 Mentorship',
                  price: 1999,
                  imageUrl: 'https://images.unsplash.com/photo-1700589877615-吐896f9f5b6f?auto=compress&cs=tinysrgb&w=400&h=200',
                  providerInfo: { name: 'EdTechCart' },
                  rating: 4.7,
                  reviewsCount: 400,
                   category: "Add-ons"
                },
                {
                  id: 'addon3',
                  title: 'Project Kit',
                  price: 799,
                  imageUrl: 'https://images.unsplash.com/photo-1700589877616-吐896f9f5b6f?auto=compress&cs=tinysrgb&w=400&h=200',
                  providerInfo: { name: 'EdTechCart' },
                  rating: 4.6,
                  reviewsCount: 500,
                   category: "Add-ons"
                },
                {
                  id: 'addon4',
                  title: 'Course Ebook',
                  price: 299,
                  imageUrl: 'https://images.unsplash.com/photo-1700589877617-吐896f9f5b6f?auto=compress&cs=tinysrgb&w=400&h=200',
                  providerInfo: { name: 'EdTechCart' },
                  rating: 4.4,
                  reviewsCount: 300,
                   category: "Add-ons"
                },
                {
                  id: 'addon5',
                  title: 'Practice Tests',
                  price: 599,
                  imageUrl: 'https://images.unsplash.com/photo-1700589877618-吐896f9f5b6f?auto=compress&cs=tinysrgb&w=400&h=200',
                  providerInfo: { name: 'EdTechCart' },
                  rating: 4.5,
                  reviewsCount: 450,
                   category: "Add-ons"
                },
              ].map((addon) => (
                <CourseCard key={addon.id} course={addon as any} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Button className="bg-[--primary-blue] text-[--text-light] px-8 py-3 rounded-full font-semibold hover:bg-[--secondary-purple] transition-colors">
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
                    <Button className="w-full bg-[--bg-light] text-[--text-light] py-4 rounded-lg font-semibold hover:bg-[--secondary-purple] transition-colors shadow-md">
                      {price.label}
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="py-12 px-6 bg-[--bg-medium] pattern-bg section-divider">
          <div className="container text-center">
            <motion.h2
              className="text-3xl font-bold mb-4 text-[--text-light] fade-in-up"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Subscribe to Our Newsletter
            </motion.h2>
            <motion.p
              className="text-lg text-gray-300 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Get updates on the best courses and exclusive offers!
            </motion.p>
            <motion.form // Changed div to form
              className="flex justify-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onSubmit={(e) => e.preventDefault()} // Prevent default form submission for now
            >
              <div className="relative w-full max-w-md">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-[--bg-light] text-[--text-light] rounded-full py-3 px-6 pl-12 focus:outline-none focus:ring-2 focus:ring-[--secondary-purple]"
                />
                <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <Button type="submit" className="bg-[--primary-blue] text-[--text-light] px-6 py-3 rounded-full font-semibold hover:bg-[--secondary-purple] transition-colors">
                Subscribe
              </Button>
            </motion.form>
            <motion.p
              className="text-gray-400 mt-4 text-sm"
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
                  imageUrl: 'https://images.unsplash.com/photo-1700589877619-吐896f9f5b6f?auto=compress&cs=tinysrgb&w=400&h=200',
                  providerInfo: { name: 'Udemy' },
                  rating: 4.8,
                  reviewsCount: 1000,
                  category: "Subscription"
                },
                {
                  id: 'sub2',
                  title: 'Coursera Plus - 1 Month',
                  price: 999,
                  imageUrl: 'https://images.unsplash.com/photo-1700589877620-吐896f9f5b6f?auto=compress&cs=tinysrgb&w=400&h=200',
                  providerInfo: { name: 'Coursera' },
                  rating: 4.7,
                  reviewsCount: 800,
                  category: "Subscription"
                },
                {
                  id: 'sub3',
                  title: 'Unacademy Plus - 3 Months',
                  price: 2499,
                  imageUrl: 'https://images.unsplash.com/photo-1700589877621-吐896f9f5b6f?auto=compress&cs=tinysrgb&w=400&h=200',
                  providerInfo: { name: 'Unacademy' },
                  rating: 4.6,
                  reviewsCount: 700,
                  category: "Subscription"
                },
                {
                  id: 'sub4',
                  title: 'Skillshare - 1 Month',
                  price: 799,
                  imageUrl: 'https://images.unsplash.com/photo-1700589877622-吐896f9f5b6f?auto=compress&cs=tinysrgb&w=400&h=200',
                  providerInfo: { name: 'Skillshare' },
                  rating: 4.5,
                  reviewsCount: 600,
                  category: "Subscription"
                },
                {
                  id: 'sub5',
                  title: 'edX Verified Track',
                  price: 1999,
                  imageUrl: 'https://images.unsplash.com/photo-1700589877623-吐896f9f5b6f?auto=compress&cs=tinysrgb&w=400&h=200',
                  providerInfo: { name: 'edX' },
                  rating: 4.6,
                  reviewsCount: 650,
                  category: "Subscription"
                },
              ].map((sub) => (
                <CourseCard key={sub.id} course={sub as any} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Button className="bg-[--primary-blue] text-[--text-light] px-8 py-3 rounded-full font-semibold hover:bg-[--secondary-purple] transition-colors">
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

    