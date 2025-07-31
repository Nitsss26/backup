
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CourseCard } from '@/components/CourseCard';
import { SubscriptionCard } from '@/components/SubscriptionCard';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Carousel } from '@/components/Carousel';
// import C2  from '@/components/C2';
// import C3  from '@/components/C3';
import Caro from '@/components/Caro'
import Video2  from '@/components/Video2';
import Video3  from '@/components/Video3';
import Video  from '@/components/Video';
import { BannerCard } from '@/components/BannerCard';
import { PromoCard } from '@/components/PromoCard';
import { CategoryCard } from '@/components/CategoryCard';
import { CategoryCard2 } from '@/components/CategoryCard2';
import { featuredCoursesForHomepage, topCategoryShowcaseData } from '@/lib/placeholder-data';
import { placeholderAddons } from '@/lib/addons-placeholder-data';
import { placeholderSubscriptions } from '@/lib/subscriptions-placeholder-data';
import { CATEGORIES, APP_NAME, CATEGORIES2 } from '@/lib/constants';
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
  const itemsPerView = 6;
  const platforms = [
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
      name: 'Unacademy',
      ctaLink: '/unacademy',
      logo: 'https://i.pinimg.com/474x/68/a0/42/68a042e75a0fe666c2ef0382ddb3f738.jpg',
      bgColor: 'bg-[#5593f7]'
    },
    {
      name: 'Udemy',
      ctaLink: '/udemy',
      logo: 'https://logowik.com/content/uploads/images/udemy-new-20212512.jpg',
      bgColor: 'bg-[--primary-blue]'
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

  const subscriptions = [
    {
      id: 'unacademy-plus-3-months',
      title: 'Unacademy Plus - 3 Months',
      price: 6399,
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
      id: 'udemy-annual-subscription',
      title: 'Udemy Annual Subscription',
      price: 2000,
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
      id: 'coursera-plus-1-month',
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
      id: 'skillshare-1-month-subscription',
      title: 'Skillshare - 1 Month Subscription',
      price: 1165,
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
      id: 'edx-verified-track-subscription',
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
        {/* Hero Section (Matching Driffle’s Layout) */}

<section className="py-0 px-0 bg-primary/10 pb-2">
  <div className="container-fluid px-0">
    {/* Full Width Carousel */}
    <div className="w-full">
    <div data-analytics-section="Homepage Category Pills" className="container py-6 px-12 -mb-8 overflow-x-auto md:flex md:justify-center md:items-center">
  <div className="flex gap-3 overflow-x-auto -mx-10 px-1 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] md:flex-wrap md:max-w-4xl md:overflow-x-visible">
    <div className="flex gap-3 min-w-max md:min-w-0">
      {CATEGORIES2.slice(0, 5).map((category) => (
        <CategoryCard2
          key={category.id}
          id={category.id}
          name={category.name}
          bgColor="bg-[--bg-light]"
          isMobile={true}
        />
      ))}
    </div>
  </div>
</div>
      <Carousel items={heroSectionData.carouselItems} />
    </div>

    {/* Bottom Row: Desktop Grid, Mobile Horizontal Scroll */}
    <div className="mt-6" data-analytics-section="Homepage Sub-Banners">
      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-4 gap-3 px-3">
        {heroSectionData.bottomBanners.map((banner, index) => (
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
      
      {/* Mobile Horizontal Scroll */}
      <div className="md:hidden px-2">
  <div className="flex gap-2 overflow-x-scroll pb-4" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
    {heroSectionData.bottomBanners.map((banner, index) => (
      <div key={index} className="flex-shrink-0 w-64">
        <BannerCard
          imageUrl={banner.imageUrl}
          title={banner.title}
          ctaText={banner.ctaText}
          ctaLink={banner.ctaLink}
          bgColor={banner.bgColor}
          dataAiHint={banner.dataAiHint}
          isMobile={true} // Added isMobile prop
        />
      </div>
    ))}
  </div>
</div>
    </div>
  </div>
</section>

<Caro/>


{/* Recommended For You */}
<section className="py-12 px-6 bg-[--bg-dark] section-divider" data-analytics-section="Recommended Courses">
  <div className="container">
    <motion.h2
      className="text-3xl md:text-3xl font-bold mb-8 text-center text-[--text-light] fade-in-up text-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      Recommended Courses
    </motion.h2>
    
    <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {featuredCoursesForHomepage.slice(0, 5).map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
    
    <div className="md:hidden">
      <div 
        className="flex -mx-12 gap-3 overflow-x-auto pb-4 px-1"
        style={{
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        {featuredCoursesForHomepage.slice(0, 8).map((course, index) => (
          <div 
            key={course.id} 
            className="flex-shrink-0"
            style={{
              width: 'calc(50vw - 24px)', 
              minWidth: '160px',
              maxWidth: '180px' 
            }}
          >
            <CourseCard course={course} isMobile={true} />
          </div>
        ))}
        
        <div className="w-4 flex-shrink-0"></div>
      </div>
    </div>
  </div>
</section>

<section className="py-12 px-6 bg-primary/10 section-divider" data-analytics-section="Explore by Platform">
  <div className="container">
    <motion.h2
      className="text-3xl md:text-3xl font-bold mb-8 text-center text-[--text-light] fade-in-up text-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      Explore By Edtech Platforms
    </motion.h2>
    
    <div className="hidden md:block relative px-4">
      <button
        onClick={goToPrevious}
        disabled={currentIndex === 0}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[--bg-dark] border-2 border-[--border-color] transition-all duration-300 ${
          currentIndex === 0
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-[--bg-medium] hover:border-[#5593f7] hover:shadow-lg hover:shadow-[#5593f7]/20'
        }`}
      >
        <ChevronLeft className="w-6 h-6 text-[--text-light]" />
      </button>

      <div className="mx-16 overflow-hidden relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ 
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            gap: '1rem',
            paddingRight: '1rem'
          }}
        >
          {platforms.map((platform, index) => (
            <div
              key={platform.name}
              className="flex-shrink-0"
              style={{ 
                width: `calc(${100 / itemsPerView}% - 1rem)`,
                marginRight: index === platforms.length - 1 ? '0' : '1rem'
              }}
            >
              <Link href={platform.ctaLink}>
                <div className="bg-[--bg-dark] rounded-xl p-6 border-2 border-[--border-color] transition-all duration-300 cursor-pointer h-36 flex flex-col items-center justify-center group relative overflow-visible hover:border-[#5593f7] hover:shadow-xl hover:shadow-[#5593f7]/20 hover:scale-[1.02] hover:z-10">
                  <div className="w-16 h-16 mb-3 flex items-center justify-center overflow-visible">
                    <img
                      src={platform.logo}
                      alt={`${platform.name} logo`}
                      className="w-full h-full object-contain transition-all duration-300 group-hover:scale-110"
                    />
                  </div>
                  <span className="text-[--text-light] text-sm font-medium text-center group-hover:text-[#5593f7] transition-colors duration-300 leading-tight">
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
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[--bg-dark] border-2 border-[--border-color] transition-all duration-300 ${
          currentIndex >= maxIndex
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-[--bg-medium] hover:border-[#5593f7] hover:shadow-lg hover:shadow-[#5593f7]/20'
        }`}
      >
        <ChevronRight className="w-6 h-6 text-[--text-light]" />
      </button>

      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-[#5593f7] w-8'
                : 'bg-[--border-color] w-2 hover:bg-[--text-muted]'
            }`}
          />
        ))}
      </div>
    </div>
    
    <div className="md:hidden">
      <div 
        className="flex gap-3 -mx-12 px-1 overflow-x-auto pb-4"
        style={{
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        {platforms.map((platform, index) => (
          <div 
            key={platform.name} 
            className="flex-shrink-0"
            style={{
              width: 'calc(50vw - 24px)',
              minWidth: '140px',
              maxWidth: '160px'
            }}
          >
            <Link href={platform.ctaLink}>
              <div className="bg-[--bg-dark] rounded-xl p-4 border-2 border-[--border-color] transition-all duration-300 cursor-pointer h-28 flex flex-col items-center justify-center group relative overflow-visible hover:border-[#5593f7] hover:shadow-xl hover:shadow-[#5593f7]/20 hover:scale-[1.02] hover:z-10">
                <div className="w-12 h-12 mb-2 flex items-center justify-center overflow-visible">
                  <img
                    src={platform.logo}
                    alt={`${platform.name} logo`}
                    className="w-full h-full object-contain transition-all duration-300 group-hover:scale-110"
                  />
                </div>
                <span className="text-[--text-light] text-xs font-medium text-center group-hover:text-[#5593f7] transition-colors duration-300 leading-tight">
                  {platform.name}
                </span>
              </div>
            </Link>
          </div>
        ))}
        
        <div className="w-4 flex-shrink-0"></div>
      </div>
    </div>
  </div>
</section>

<Video3/>

<section className="py-12 px-6 bg-[--bg-dark] section-divider" data-analytics-section="Best Selling JEE/NEET Courses">
  <div className="container">
    <motion.h2
      className="text-3xl md:text-3xl font-bold mb-8 text-center text-[--text-light] fade-in-up text-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      Best Selling JEE/NEET Courses
    </motion.h2>
    
    <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {topCategoryShowcaseData
        .flatMap((cat) => cat.courses)
        .slice(0, 5)
        .map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
    </div>
    
    <div className="md:hidden px-2">
      <div 
        className="flex -mx-14 px-1 gap-3 overflow-x-auto pb-4" 
        style={{
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        {topCategoryShowcaseData
          .flatMap((cat) => cat.courses)
          .slice(0, 5)
          .map((course) => (
            <div 
              key={course.id} 
              className="flex-shrink-0"
              style={{
                width: 'calc(48vw - 24px)', 
                minWidth: '160px',
                maxWidth: '180px'
              }}
            >
              <CourseCard course={course} isMobile={true} />
            </div>
          ))}
        
        <div className="w-4 flex-shrink-0"></div>
      </div>
    </div>
    
    <div className="text-center mt-8">
      <Link href="/courses?category=iit-jee&category=neet&page=1" passHref>
        <Button
          asChild
          className="bg-[--primary-blue] text-[--text-light] px-8 py-3 rounded-full font-semibold hover:bg-[#5593f7] transition-colors"
        >
          <span>Show All</span>
        </Button>
      </Link>
    </div>
  </div>
</section>

<section className="py-12 px-6 bg-gradient-to-r from-[--primary-blue] to-[#5593f7] section-divider" data-analytics-section="Plus Subscription CTA">
  <div className="container flex flex-col md:flex-row justify-between items-center rounded-xl p-4 md:p-8">
    <motion.div
      className="text-center md:text-left"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl md:text-4xl font-bold text-[--text-light] leading-tight">
        Get Extra Discounts with EdTechCart Plus
      </h2>
      <Button 
        asChild 
        className="mt-3 md:mt-4 bg-[--highlight-gold] text-black px-4 py-2 md:px-6 md:py-2 rounded-full font-semibold hover:bg-[--text-light] hover:text-[--primary-blue] transition-colors text-sm md:text-base"
      >
        <Link className="text-white" href="/plus">
          Coming Soon!
        </Link>
      </Button>
    </motion.div>
    
    <motion.div
      className="text-gray-200 mt-4 md:mt-6 md:mt-0"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ul className="list-disc list-inside text-sm md:text-xl space-y-1 md:space-y-0">
        <li>Up to 10% OFF on courses and more.</li>
        <li>Access to exclusive sale events</li>
        <li>Priority pre-order fulfillment</li>
        <li>Priority support</li>
      </ul>
    </motion.div>
  </div>
</section>


<Video/>


<section className="py-12 px-6 bg-primary/10 section-divider" data-analytics-section="Best Selling Bundles">
  <div className="container">
    <motion.h2
      className="text-3xl md:text-3xl font-bold mb-8 text-center text-[--text-light] fade-in-up text-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      Best Selling Course Bundles
    </motion.h2>
    
    <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {[
        {
          id: '6845b4b9188aa67dd4093856',
          title: 'Algorithmic Toolbox Bundle',
          price: 2500,
          imageUrl: 'https://plus.unsplash.com/premium_photo-1682124651258-410b25fa9dc0?q=80&w=1921&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          providerInfo: { name: 'CodeMasters Institute', logoUrl: "https://placehold.co/100x100/EBF4FF/3B82F6?text=CM" },
          rating: 4.8,
          reviewsCount: 2000,
          category: "Computer Science",
          dataAiHint: "web development code",
          studentsEnrolledCount: 3400
        },
        {
          id: '6845b4b9188aa67dd409384b',
          title: 'Deep Learning Specialization Bundle',
          price: 3500,
          imageUrl: 'https://plus.unsplash.com/premium_photo-1681810994162-43dbe0919d3f?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          providerInfo: { name: 'AI Learning Co.', logoUrl: "https://placehold.co/100x100/EBF4FF/3B82F6?text=CM" },
          rating: 4.6,
          reviewsCount: 2600,
          category: "Computer Science",
          dataAiHint: "data science charts",
          studentsEnrolledCount: 2800
        },
        {
          id: 'bundle3',
          title: 'Business Mastery Bundle',
          price: 3499,
          imageUrl: 'https://plus.unsplash.com/premium_photo-1695449439526-9cebdbfa1a2c?q=80&w=2009&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          providerInfo: { name: 'Bizgurukul', logoUrl: "https://placehold.co/100x100/EBF4FF/3B82F6?text=CM" },
          rating: 4.7,
          reviewsCount: 900,
          category: "Business & Finance",
          dataAiHint: "business meeting",
          studentsEnrolledCount: 2500
        },
        {
          id: '6845b4b9188aa67dd4093840',
          title: 'Data Structures & Algorithms Bundle',
          price: 2800,
          imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          providerInfo: { name: 'Skillshare', logoUrl: "https://placehold.co/100x100/EBF4FF/3B82F6?text=CM" },
          rating: 4.8,
          reviewsCount: 2800,
          category: "Computer Science",
          dataAiHint: "artificial intelligence",
          studentsEnrolledCount: 5000
        },
        {
          id: 'bundle5',
          title: 'Design & Mastery Course Bundle',
          price: 3799,
          imageUrl: 'https://images.unsplash.com/photo-1601987177651-8edfe6c20009?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          providerInfo: { name: 'edX', logoUrl: "https://placehold.co/100x100/EBF4FF/3B82F6?text=CM" },
          rating: 4.6,
          reviewsCount: 800,
          category: "Design & Illustration",
          dataAiHint: "graphic design tools",
          studentsEnrolledCount: 2200
        },
      ].map((bundle) => (
        <CourseCard key={bundle.id} course={bundle as any} />
      ))}
    </div>
    
    <div className="md:hidden px-2">
      <div 
        className="flex -mx-14 px-1 gap-3 overflow-x-auto pb-4" 
        style={{
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        {[
          {
            id: '6845b4b9188aa67dd4093856',
            title: 'Algorithmic Toolbox Bundle',
            price: 2500,
            imageUrl: 'https://plus.unsplash.com/premium_photo-1682124651258-410b25fa9dc0?q=80&w=1921&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            providerInfo: { name: 'CodeMasters Institute', logoUrl: "https://placehold.co/100x100/EBF4FF/3B82F6?text=CM" },
            rating: 4.8,
            reviewsCount: 2000,
            category: "Computer Science",
            dataAiHint: "web development code",
            studentsEnrolledCount: 3400
          },
          {
            id: '6845b4b9188aa67dd409384b',
            title: 'Deep Learning Specialization Bundle',
            price: 3500,
            imageUrl: 'https://plus.unsplash.com/premium_photo-1681810994162-43dbe0919d3f?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            providerInfo: { name: 'AI Learning Co.', logoUrl: "https://placehold.co/100x100/EBF4FF/3B82F6?text=CM" },
            rating: 4.6,
            reviewsCount: 2600,
            category: "Computer Science",
            dataAiHint: "data science charts",
            studentsEnrolledCount: 2800
          },
          {
            id: 'bundle3',
            title: 'Business Mastery Bundle',
            price: 3499,
            imageUrl: 'https://plus.unsplash.com/premium_photo-1695449439526-9cebdbfa1a2c?q=80&w=2009&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            providerInfo: { name: 'Bizgurukul', logoUrl: "https://placehold.co/100x100/EBF4FF/3B82F6?text=CM" },
            rating: 4.7,
            reviewsCount: 900,
            category: "Business & Finance",
            dataAiHint: "business meeting",
            studentsEnrolledCount: 2500
          },
          {
            id: '6845b4b9188aa67dd4093840',
            title: 'Data Structures & Algorithms Bundle',
            price: 2800,
            imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            providerInfo: { name: 'Skillshare', logoUrl: "https://placehold.co/100x100/EBF4FF/3B82F6?text=CM" },
            rating: 4.8,
            reviewsCount: 2800,
            category: "Computer Science",
            dataAiHint: "artificial intelligence",
            studentsEnrolledCount: 5000
          },
          {
            id: 'bundle5',
            title: 'Design & Mastery Course Bundle',
            price: 3799,
            imageUrl: 'https://images.unsplash.com/photo-1601987177651-8edfe6c20009?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            providerInfo: { name: 'edX', logoUrl: "https://placehold.co/100x100/EBF4FF/3B82F6?text=CM" },
            rating: 4.6,
            reviewsCount: 800,
            category: "Design & Illustration",
            dataAiHint: "graphic design tools",
            studentsEnrolledCount: 2200
          },
        ].map((bundle) => (
          <div 
            key={bundle.id} 
            className="flex-shrink-0"
            style={{
              width: 'calc(48vw - 24px)', 
              minWidth: '160px', 
              maxWidth: '180px'
            }}
          >
            <CourseCard course={bundle as any} isMobile={true} />
          </div>
        ))}
        
        <div className="w-4 flex-shrink-0"></div>
      </div>
    </div>
    
    <div className="text-center mt-8">
      <Link href="/courses" passHref>
        <Button
          asChild
          className="bg-[--primary-blue] text-[--text-light] px-8 py-3 rounded-full font-semibold hover:bg-[#5593f7] transition-colors"
        >
          <span>Show All</span>
        </Button>
      </Link>
    </div>
  </div>
</section>

<Video2/>


<section className="py-12 px-6 bg-primary/10 section-divider" data-analytics-section="Best Selling Add-ons">
  <div className="container">
    <motion.h2
      className="text-3xl md:text-3xl font-bold mb-8 text-center text-[--text-light] fade-in-up text-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      Best Selling Add-ons
    </motion.h2>
    
    <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {placeholderAddons.slice(0, 5).map((addon) => (
        <SubscriptionCard key={addon.id} subscription={addon} />
      ))}
    </div>

    <div className="block sm:hidden">
      <div className="flex gap-3 -mx-12 px-1 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {placeholderAddons.map((addon) => (
          <div key={addon.id} className="flex-shrink-0" style={{
            width: 'calc(48vw - 24px)', 
            minWidth: '160px', 
            maxWidth: '180px'
          }}>
            <SubscriptionCard subscription={addon} isMobile={true} />
          </div>
        ))}
      </div>
    </div>

    <div className="text-center mt-8">
      <Button className="bg-[--primary-blue] text-[--text-light] px-8 py-3 rounded-full font-semibold hover:bg-[#5593f7] transition-colors">
        Show All
      </Button>
    </div>
  </div>
</section>


        {/* Discover By Price */}
        <section className="py-12 px-6 bg-[--bg-dark] section-divider">
          <div className="container">
            <motion.h2
              className="text-3xl md:text-3xl font-bold mb-8 text-center text-[--text-light] fade-in-up text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Discover By Price
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
                    <Button className="w-full bg-[--bg-light] text-[--text-light] py-4 rounded-lg font-semibold hover:bg-[#5593f7] transition-colors shadow-md">
                      {price.label}
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="py-12 px-6 bg-primary/10 section-divider">
          <div className="container text-center">
            <motion.h2
              className="text-3xl md:text-3xl font-bold mb-8 text-center text-[--text-light] fade-in-up text-xl"
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
            <motion.form
              className="flex justify-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="relative w-full max-w-md">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-[--bg-light] text-[--text-light] rounded-full py-3 px-6 pl-12 focus:outline-none focus:ring-2 focus:ring-[#5593f7]"
                />
                <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <Button type="submit" className="bg-[--primary-blue] text-[--text-light] px-6 py-3 rounded-full font-semibold hover:bg-[#5593f7] transition-colors">
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


<section className="py-12 px-6 bg-[--bg-dark] section-divider" data-analytics-section="Best Selling Subscriptions">
  <div className="container">
    <motion.h2
      className="text-3xl md:text-3xl font-bold mb-8 text-center text-[--text-light] fade-in-up text-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      Best Selling Subscriptions
    </motion.h2>
    
    <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {subscriptions.map((sub) => (
        <SubscriptionCard key={sub.id} subscription={sub} />
      ))}
    </div>

    <div className="block sm:hidden">
      <div className="flex gap-3 -mx-12 px-1 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {subscriptions.map((sub) => (
          <div key={sub.id} className="flex-shrink-0"   style={{
            width: 'calc(48vw - 24px)', 
            minWidth: '160px', 
            maxWidth: '180px'
          }}>
            <SubscriptionCard subscription={sub} isMobile={true} />
          </div>
        ))}
      </div>
    </div>

    <div className="text-center mt-8">
      <Button className="bg-[--primary-blue] text-[--text-light] px-8 py-3 rounded-full font-semibold hover:bg-[#5593f7] hover:text-black-300 transition-colors">
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
