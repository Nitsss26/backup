
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CourseCard } from '@/components/CourseCard';
import { SubscriptionCard } from '@/components/SubscriptionCard';
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
import { heroSectionData } from '@/lib/heroSectionData';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HomePage() {
  const { carouselItems, rightBanner, promoCard, bottomBanners } = heroSectionData;
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (carouselItems.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselItems.length]);

  const [currentIndex, setCurrentIndex] = useState(0);
const itemsPerView = 6; // This logic remains for the desktop-first carousel behavior
const platforms = [
  {
    name: 'Udemy',
    ctaLink: '/udemy',
    logo: 'https://logowik.com/content/uploads/images/udemy-new-20212512.jpg',
    bgColor: 'bg-[--primary-blue]'
  },
  {
    name: 'Unacademy',
    ctaLink: '/unacademy',
    logo: 'https://i.pinimg.com/474x/68/a0/42/68a042e75a0fe666c2ef0382ddb3f738.jpg',
    bgColor: 'bg-[#5593f7]'
  },
  {
    name: 'Physics Wallah',
    ctaLink: '/physics-wallah',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Physics_wallah_logo.jpg/800px-Physics_wallah_logo.jpg',
    bgColor: 'bg-[--accent-teal]'
  },
  {
    name: 'iNeuron',
    ctaLink: '/ineuron',
    logo: 'https://yt3.googleusercontent.com/w_SOmqeOYbkseR1IR4Sq4hTcxKRld7XgfbCDP-zuSY0SekoJruge26gzmwBsnkOx2GFERpLN2Y8=s900-c-k-c0x00ffffff-no-rj',
    bgColor: 'bg-[--highlight-gold]'
  },
  {
    name: 'Newton School',
    ctaLink: '/newton-school',
    logo: 'https://static.wixstatic.com/media/5f869d_42e6e32e5ff64c058963157601b6970d~mv2.jpg/v1/fill/w_300,h_300,al_c,q_80/Newton%20School%20Refer%20and%20Earn.jpg',
    bgColor: 'bg-[--accent-teal]'
  },
  {
    name: 'Boston Institute',
    ctaLink: '/boston-institute',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0zOURjSw8YRG53pGHP0mWOZqJoB0-QoN3sw&s',
    bgColor: 'bg-[#5593f7]'
  },
  {
    name: 'Skillshare',
    ctaLink: '/skillshare',
    logo: 'https://logowik.com/content/uploads/images/skill-share5249.jpg',
    bgColor: 'bg-[--primary-blue]'
  },
];

  const maxIndex = Math.max(0, platforms.length - itemsPerView);

const goToPrevious = () => {
  setCurrentIndex(prev => Math.max(0, prev - 1));
};

const goToNext = () => {
  setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
};

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-8 md:py-12 px-4 sm:px-6 bg-primary/10">
          <div className="container mx-auto">
            {/* Top Row: Carousel + Right Stack */}
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
                  dataAiHint={rightBanner.dataAiHint}
                />
                <PromoCard
                  imageUrl={promoCard.imageUrl}
                  title={promoCard.title}
                  ctaText={promoCard.ctaText}
                  ctaLink={promoCard.ctaLink}
                  dataAiHint={promoCard.dataAiHint}
                />
              </div>
            </div>
            {/* Bottom Row: 4 Banner Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-6">
              {bottomBanners.map((banner, index) => (
                <BannerCard
                  key={index}
                  imageUrl={banner.imageUrl}
                  title={banner.title}
                  ctaText={banner.ctaText}
                  ctaLink={banner.ctaLink}
                  bgColor={banner.bgColor}
                  dataAiHint={banner.dataAiHint}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Recommended For You */}
        <section className="py-8 md:py-12 px-4 sm:px-6 bg-[--bg-dark] section-divider">
          <div className="container mx-auto">
            <motion.h2
              className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-center text-[--text-light] fade-in-up"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Recommended For You
            </motion.h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {featuredCoursesForHomepage.slice(0, 5).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>

        {/* Explore By Platforms */}
        <section className="py-8 md:py-12 px-4 sm:px-6 bg-primary/10 section-divider">
          <div className="container mx-auto">
            <motion.h2
              className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-center text-[--text-light] fade-in-up"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Explore By Platforms
            </motion.h2>
            
            <div className="relative px-0 md:px-4">
              <button
                onClick={goToPrevious}
                disabled={currentIndex === 0}
                className={`absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 rounded-full bg-[--bg-dark] border-2 border-[--border-color] transition-all duration-300 ${
                  currentIndex === 0
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-[--bg-medium] hover:border-[#5593f7] hover:shadow-lg hover:shadow-[#5593f7]/20'
                }`}
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-[--text-light]" />
              </button>

              <div className="mx-8 md:mx-10 lg:mx-12 overflow-hidden relative">
                <div
                  className="flex transition-transform duration-500 ease-in-out gap-3 sm:gap-4"
                  style={{ 
                    transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                  }}
                >
                  {platforms.map((platform) => (
                    <div
                      key={platform.name}
                      className="flex-shrink-0 w-2/5 min-w-[120px] sm:w-[30%] md:w-1/4 lg:w-1/6" // Responsive widths
                    >
                      <Link href={platform.ctaLink}>
                        <div className="bg-[--bg-dark] rounded-xl p-3 sm:p-4 md:p-6 border-2 border-[--border-color] transition-all duration-300 cursor-pointer h-32 sm:h-36 flex flex-col items-center justify-center group relative overflow-visible hover:border-[#5593f7] hover:shadow-xl hover:shadow-[#5593f7]/20 hover:scale-[1.02] hover:z-10">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 mb-2 sm:mb-3 flex items-center justify-center overflow-visible">
                            <img
                              src={platform.logo}
                              alt={`${platform.name} logo`}
                              className="w-full h-full object-contain transition-all duration-300 group-hover:scale-110"
                            />
                          </div>
                          <span className="text-[--text-light] text-xs sm:text-sm font-medium text-center group-hover:text-[#5593f7] transition-colors duration-300 leading-tight">
                            {platform.name}
                          </span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={goToNext}
                disabled={currentIndex >= maxIndex}
                className={`absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 rounded-full bg-[--bg-dark] border-2 border-[--border-color] transition-all duration-300 ${
                  currentIndex >= maxIndex
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-[--bg-medium] hover:border-[#5593f7] hover:shadow-lg hover:shadow-[#5593f7]/20'
                }`}
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-[--text-light]" />
              </button>
            </div>

            <div className="flex justify-center mt-6 md:mt-8 space-x-2">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-[#5593f7] w-6 sm:w-8'
                      : 'bg-[--border-color] w-2 hover:bg-[--text-muted]'
                  }`}
                  aria-label={`Go to platform slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Best Selling JEE/NEET Courses */}
        <section className="py-8 md:py-12 px-4 sm:px-6 bg-[--bg-dark] section-divider">
          <div className="container mx-auto">
            <motion.h2
              className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-center text-[--text-light] fade-in-up"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Best Selling JEE/NEET Courses
            </motion.h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {topCategoryShowcaseData
                .flatMap((cat) => cat.courses)
                .slice(0, 5)
                .map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
            </div>
            <div className="text-center mt-6 md:mt-8">
            <Link href="/courses?category=iit-jee&category=neet&page=1" passHref>
              <Button
                className="bg-[--primary-blue] text-[--text-light] px-6 py-2 sm:px-8 sm:py-3 rounded-full font-semibold hover:bg-[#5593f7] transition-colors"
              >
                Show All
              </Button>
            </Link>
            </div>
          </div>
        </section>

        {/* Get Extra Discounts */}
        <section className="py-8 md:py-12 px-4 sm:px-6 bg-gradient-to-r from-[--primary-blue] to-[#5593f7] section-divider">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center rounded-xl p-6 md:p-8">
            <motion.div
              className="text-center md:text-left mb-6 md:mb-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-[--text-light]">Get Extra Discounts with EdTechCart Plus</h2>
              <Button asChild className="mt-4 bg-[--highlight-gold] text-black px-6 py-2 sm:px-8 sm:py-3 rounded-full font-semibold hover:bg-[--text-light] hover:text-[--primary-blue] transition-colors">
                <Link className="text-white" href="/plus">Coming Soon!</Link>
              </Button>
            </motion.div>
            <motion.div
              className="text-gray-200"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ul className="list-disc list-inside text-base sm:text-lg md:text-xl space-y-1">
                <li>Up to 10% OFF on courses, bundles, and more</li>
                <li>Access to exclusive sale events</li>
                <li>Priority pre-order fulfillment</li>
                <li>Priority support</li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Best Selling Course Bundles */}
        <section className="py-8 md:py-12 px-4 sm:px-6 bg-primary/10 section-divider">
          <div className="container mx-auto">
            <motion.h2
              className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-center text-[--text-light] fade-in-up"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Best Selling Course Bundles
            </motion.h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {[
                {
                  id: '6845b4b9188aa67dd4093856',
                  title: 'Algorithmic Toolbox Bundle',
                  price: 2500,
                  imageUrl: 'https://plus.unsplash.com/premium_photo-1682124651258-410b25fa9dc0?q=80&w=1921&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  providerInfo: { name: 'CodeMasters Institute' },
                  rating: 4.8,
                  reviewsCount: 2000,
                  category: "Computer Science",
                  dataAiHint: "web development code"
                },
                {
                  id: '6845b4b9188aa67dd409384b',
                  title: 'Deep Learning Specialization Bundle',
                  price: 3500,
                  imageUrl: 'https://plus.unsplash.com/premium_photo-1681810994162-43dbe0919d3f?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  providerInfo: { name: 'AI Learning Co.' },
                  rating: 4.6,
                  reviewsCount: 2600,
                  category: "Computer Science",
                  dataAiHint: "data science charts"
                },
                {
                  id: 'bundle3',
                  title: 'Business Mastery Bundle',
                  price: 3499,
                  imageUrl: 'https://plus.unsplash.com/premium_photo-1695449439526-9cebdbfa1a2c?q=80&w=2009&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  providerInfo: { name: 'Bizgurukul' },
                  rating: 4.7,
                  reviewsCount: 900,
                  category: "Business & Finance",
                  dataAiHint: "business meeting"
                },
                {
                  id: '6845b4b9188aa67dd4093840',
                  title: 'Data Structures & Algorithms Bundle',
                  price: 2800,
                  imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  providerInfo: { name: 'Skillshare' },
                  rating: 4.8,
                  reviewsCount: 2800,
                  category: "Computer Science",
                  dataAiHint: "artificial intelligence"
                },
                {
                  id: 'bundle5',
                  title: 'Design Mastery Bundle',
                  price: 3799,
                  imageUrl: 'https://images.unsplash.com/photo-1601987177651-8edfe6c20009?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  providerInfo: { name: 'edX' },
                  rating: 4.6,
                  reviewsCount: 800,
                  category: "Design & Illustration",
                  dataAiHint: "graphic design tools"
                },
              ].map((bundle) => (
                <CourseCard key={bundle.id} course={bundle as any} />
              ))}
            </div>
            <div className="text-center mt-6 md:mt-8">
            <Link href="/courses" passHref>
              <Button
                className="bg-[--primary-blue] text-[--text-light] px-6 py-2 sm:px-8 sm:py-3 rounded-full font-semibold hover:bg-[#5593f7] transition-colors"
              >
                Show All
              </Button>
            </Link>
            </div>
          </div>
        </section>

        {/* Discover Courses By Category */}
        <section className="py-8 md:py-12 px-4 sm:px-6 bg-[--bg-dark] section-divider">
          <div className="container mx-auto">
            <motion.h2
              className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-center text-[--text-light] fade-in-up"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Discover Courses By Category
            </motion.h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
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
        <section className="py-8 md:py-12 px-4 sm:px-6 bg-primary/10 section-divider">
          <div className="container mx-auto">
            <motion.h2
              className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-center text-[--text-light] fade-in-up"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Best Selling Course Add-ons
            </motion.h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {[
                {
                  id: 'addon1',
                  title: 'Certification Add-on',
                  price: 0,
                  imageUrl: 'https://images.geekster.in/ds-coursepage-images/certificate.png',
                  providerInfo: { name: 'Geekster' },
                  rating: 4.5,
                  reviewsCount: 600,
                  category: "Add-ons",
                  dataAiHint: "certificate document",
                   url:"https://www.geekster.in/courses/full-stack-web-developer/?nextStep=/job-ready-program"
                },
                {
                  id: 'addon2',
                  title: '1:1 Mentorship',
                  price: 19999,
                  imageUrl: 'https://d18qz45wk4tdlr.cloudfront.net/institute/upscprep/product_images/198/0453f2eb7f774b61b1b819ea25f8b9d7.png',
                  providerInfo: { name: 'UPSC Prep' },
                  rating: 4.7,
                  reviewsCount: 400,
                  category: "Add-ons",
                  dataAiHint: "mentor teaching student",
                   url:"https://courses.upscprep.com/products/upsc-essential-2026-mentorship/"
                },
                {
                  id: 'addon3',
                  title: 'Project Kit',
                  price: 1480,
                  imageUrl: 'https://store.pw.live/_next/image?url=https%3A%2F%2Fd2bps9p1kiy4ka.cloudfront.net%2F5eb393ee95fab7468a79d189%2F15419cc8-1c0a-4037-8062-8e54ad76b8c6.jpg&w=1920&q=75',
                  providerInfo: { name: 'Physics Wallah' },
                  rating: 4.6,
                  reviewsCount: 500,
                  category: "Add-ons",
                  dataAiHint: "project tools kit",
                   url:"https://store.pw.live/products/curios-jr-science-experiment-kit-6th-class"
                },
                {
                  id: 'addon4',
                  title: 'Course book',
                  price: 1389,
                  imageUrl: 'https://store.pw.live/_next/image?url=https%3A%2F%2Fd2bps9p1kiy4ka.cloudfront.net%2F5eb393ee95fab7468a79d189%2Fc67a4b93-2134-4e1b-862a-facc99f02768.png&w=1920&q=75',
                  providerInfo: { name: 'Physics Wallah' },
                  rating: 4.4,
                  reviewsCount: 300,
                  category: "Add-ons",
                  dataAiHint: "ebook digital book",
                   url:"https://store.pw.live/products/absolute-advanced-physics-chemistry-mathematics-set-of-3"
                },
                {
                  id: 'addon5',
                  title: 'Practice Tests',
                  price: 407,
                  imageUrl: 'https://store.pw.live/_next/image?url=https%3A%2F%2Fd2bps9p1kiy4ka.cloudfront.net%2F5eb393ee95fab7468a79d189%2F9f72134a-ddb0-4003-80a4-d4f3e4551509.png&w=1920&q=75',
                  providerInfo: { name: 'Physics Wallah' },
                  rating: 4.5,
                  reviewsCount: 450,
                  category: "Add-ons",
                  dataAiHint: "test exam paper",
                  url:"https://store.pw.live/products/jee-main-rankers-test-series-2025-"
                },
              ].map((addon) => (
                 <SubscriptionCard key={addon.id} subscription={addon} />
              ))}
            </div>
            <div className="text-center mt-6 md:mt-8">
              <Button className="bg-[--primary-blue] text-[--text-light] px-6 py-2 sm:px-8 sm:py-3 rounded-full font-semibold hover:bg-[#5593f7] transition-colors">
                Show All
              </Button>
            </div>
          </div>
        </section>

        {/* Discover By Price */}
        <section className="py-8 md:py-12 px-4 sm:px-6 bg-[--bg-dark] section-divider">
          <div className="container mx-auto">
            <motion.h2
              className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-center text-[--text-light] fade-in-up"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Discover By Price
            </motion.h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
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
                    <Button className="w-full bg-[--bg-light] text-[--text-light] py-3 sm:py-4 rounded-lg font-semibold hover:bg-[#5593f7] transition-colors shadow-md text-xs sm:text-sm">
                      {price.label}
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="py-8 md:py-12 px-4 sm:px-6 bg-primary/10 section-divider">
          <div className="container mx-auto text-center">
            <motion.h2
              className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-[--text-light] fade-in-up"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Subscribe to Our Newsletter
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Get updates on the best courses and exclusive offers!
            </motion.p>
            <motion.form
              className="flex flex-col sm:flex-row justify-center items-center sm:space-x-3 space-y-3 sm:space-y-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="relative w-full max-w-sm sm:max-w-md">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-[--bg-light] text-[--text-light] rounded-full py-2.5 sm:py-3 px-4 sm:px-6 pl-10 sm:pl-12 focus:outline-none focus:ring-2 focus:ring-[#5593f7]"
                />
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <Button type="submit" className="w-full sm:w-auto bg-[--primary-blue] text-[--text-light] px-5 py-2.5 sm:px-6 sm:py-3 rounded-full font-semibold hover:bg-[#5593f7] transition-colors">
                Subscribe
              </Button>
            </motion.form>
            <motion.p
              className="text-gray-400 mt-3 sm:mt-4 text-xs sm:text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              By subscribing, you agree to receive commercial communications from EdTechCart via email.
            </motion.p>
          </div>
        </section>

        {/* Best Selling Subscriptions */}
        <section className="py-8 md:py-12 px-4 sm:px-6 bg-[--bg-dark] section-divider">
          <div className="container mx-auto">
            <motion.h2
              className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-center text-[--text-light] fade-in-up"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Best Selling Subscriptions
            </motion.h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {[ {
                  id: 'sub3',
                  title: 'Unacademy Plus - 3 Months',
                  price: 6250,
                  imageUrl: '/un.jpeg',
                  providerInfo: {
                    name: 'Unacademy',
                    logoUrl: 'https://i.pinimg.com/474x/68/a0/42/68a042e75a0fe666c2ef0382ddb3f738.jpg',
                    verified: true,
                  },
                  category: "Subscription",
                  duration: "3 Months",
                  subscribersCount: 700,
                  url: "https://unacademy.com/goal/upsc-civil-services-examination-ias-preparation/KSCGY/subscribe",
                  dataAiHint: "education subscription offer",
                },
                {
                  id: 'sub1',
                  title: 'Udemy Annual Subscription',
                  price: 8999,
                  imageUrl: '/ud.png',
                  providerInfo: {
                    name: 'Udemy',
                    logoUrl: 'https://logowik.com/content/uploads/images/udemy-new-20212512.jpg',
                    verified: true,
                  },
                  category: "Subscription",
                  duration: "12 Months",
                  subscribersCount: 1000,
                  url: "https://www.udemy.com/pricing/",
                  dataAiHint: "subscription access pass",
                },
                {
                  id: 'sub2',
                  title: 'Coursera Plus - 1 Month Subscription',
                  price: 4975,
                  imageUrl: '/c.png',
                  providerInfo: {
                    name: 'Coursera',
                    logoUrl: '/coursera.png',
                    verified: true,
                  },
                  category: "Subscription",
                  duration: "1 Month",
                  subscribersCount: 800,
                  url: "https://www.coursera.org/courseraplus",
                  dataAiHint: "monthly pass learning",
                },
              
                {
                  id: 'sub4',
                  title: 'Skillshare - 1 Month Subscription',
                  price: 7999,
                  imageUrl: '/s.png',
                  providerInfo: {
                    name: 'Skillshare',
                    logoUrl: 'https://logowik.com/content/uploads/images/skill-share5249.jpg',
                    verified: true,
                  },
                  category: "Subscription",
                  duration: "1 Month",
                  subscribersCount: 600,
                  url: "https://www.skillshare.com/en/membership",
                  dataAiHint: "creative skills subscription",
                },
                 {
                  id: 'sub5',
                  title: 'edX Verified Track Subscription',
                  price: 29999,
                  imageUrl: 'https://img.freepik.com/premium-psd/pricing-plans-web-elements-website_206192-14.jpg',
                  providerInfo: {
                    name: 'edX',
                    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/EdX_newer_logo.svg/330px-EdX_newer_logo.svg.png',
                    verified: true,
                  },
                  category: "Subscription",
                  duration: "6 Months",
                  subscribersCount: 650,
                  url: "https://campus.edx.org/subscriptions",
                  dataAiHint: "verified certificate access",
                },
              ].map((sub) => (
                <SubscriptionCard key={sub.id} subscription={sub} />
              ))}
            </div>
            <div className="text-center mt-6 md:mt-8">
              <Button className="bg-[--primary-blue] text-[--text-light] px-6 py-2 sm:px-8 sm:py-3 rounded-full font-semibold hover:bg-[#5593f7] hover:text-black-300 transition-colors">
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

