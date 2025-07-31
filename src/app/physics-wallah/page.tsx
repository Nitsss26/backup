"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CourseCard } from '@/components/CourseCardPW';
import { SubscriptionCard } from '@/components/SubscriptionCard';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Carousel } from '@/components/Carousel';
// import C2  from '@/components/C2';
// import C3  from '@/components/C3';
import Caro from '@/components/CaroPW'
import Video2  from '@/components/Video2';
import Video  from '@/components/VideoPW';
import { BannerCard } from '@/components/BannerCard';
import { PromoCard } from '@/components/PromoCard';
import { CategoryCard } from '@/components/CategoryCard3';
import { CategoryCard2 } from '@/components/CategoryCard2';
import { featuredCoursesForHomepage, topCategoryShowcaseDataPW,topCategoryShowcaseDataPW1 } from '@/lib/placeholder-data';
import { CATEGORIES, APP_NAME, CATEGORIESPW } from '@/lib/constants';
import { Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { heroSectionDataPW } from '@/lib/heroSectionData';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HomePage() {
  const { carouselItems, rightBanner, promoCard, bottomBanners } = heroSectionDataPW;
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
    
    {/* 🔹 Mobile View (Perfect scrollable categories) */}
    <div className="md:hidden container py-6 px-12 -mb-8 overflow-x-auto">
      <div className="flex gap-3 overflow-x-auto -mx-10 px-1 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex gap-3 min-w-max">
          {CATEGORIESPW.slice(0, 5).map((category) => (
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

    {/* 🔹 Desktop View (Grid layout) */}
    <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-7 gap-4 px-6 pt-6">
      {CATEGORIESPW.slice(0, 7).map((category) => (
        <CategoryCard
          key={category.id}
          name={category.name}
          slug={category.slug}
          bgColor="bg-[--bg-light]"
        />
      ))}
    </div>

    {/* 🔸 Carousel */}
    <div className="w-full mt-6">
      <Carousel items={heroSectionDataPW.carouselItems} />
    </div>

    {/* 🔻 BOTTOM BANNERS */}
    <div className="mt-6">
      
      {/* Desktop Grid Banners */}
      <div className="hidden md:grid grid-cols-4 gap-3 px-3">
        {heroSectionDataPW.bottomBanners.map((banner, index) => (
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
      
      {/* Mobile Scrollable Banners */}
      <div className="md:hidden px-2">
        <div
          className="flex gap-2 overflow-x-scroll pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {heroSectionDataPW.bottomBanners.map((banner, index) => (
            <div key={index} className="flex-shrink-0 w-64">
              <BannerCard
                imageUrl={banner.imageUrl}
                title={banner.title}
                ctaText={banner.ctaText}
                ctaLink={banner.ctaLink}
                bgColor={banner.bgColor}
                dataAiHint={banner.dataAiHint}
                isMobile={true}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>


{/* <C2/>
<C3/> */}
<Caro/>

<section className="py-12 px-6 bg-[--bg-dark] section-divider">
  <div className="container">
    <motion.h2
      className="text-3xl md:text-3xl font-bold mb-8 text-center text-[--text-light] fade-in-up text-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      Best Selling JEE/NEET Courses
    </motion.h2>
    
    {/* Desktop Grid - unchanged */}
    <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
      {topCategoryShowcaseDataPW
        .flatMap((cat) => cat.courses)
        .slice(0, 4)
        .map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
    </div>
    
    {/* Mobile Horizontal Scroll */}
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
        
        {topCategoryShowcaseDataPW
          .flatMap((cat) => cat.courses)
          .slice(0, 4)
          .map((course) => (
            <div 
              key={course.id} 
              className="flex-shrink-0"
              style={{
                width: 'calc(48vw - 24px)', // 2 cards visible with proper spacing
                minWidth: '160px', // Minimum width for readability
                maxWidth: '180px'  // Maximum width to ensure 2.3 cards are visible
              }}
            >
              <CourseCard course={course} isMobile={true} />
            </div>
          ))}
        
        {/* Spacer to ensure last card can be fully scrolled into view */}
        <div className="w-4 flex-shrink-0"></div>
      </div>
    </div>
    
    {/* Show All Button - visible on both desktop and mobile */}
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


<Video/>


<section className="py-12 px-6 bg-[--bg-dark] section-divider">
  <div className="container">
    <motion.h2
      className="text-3xl md:text-3xl font-bold mb-8 text-center text-[--text-light] fade-in-up text-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      Featured Courses
    </motion.h2>
    
    {/* Desktop Grid - unchanged */}
    <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
      {topCategoryShowcaseDataPW1
        .flatMap((cat) => cat.courses)
        .slice(0, 4)
        .map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
    </div>
    
    {/* Mobile Horizontal Scroll */}
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
        
        {topCategoryShowcaseDataPW1
          .flatMap((cat) => cat.courses)
          .slice(0, 4)
          .map((course) => (
            <div 
              key={course.id} 
              className="flex-shrink-0"
              style={{
                width: 'calc(48vw - 24px)', // 2 cards visible with proper spacing
                minWidth: '160px', // Minimum width for readability
                maxWidth: '180px'  // Maximum width to ensure 2.3 cards are visible
              }}
            >
              <CourseCard course={course} isMobile={true} />
            </div>
          ))}
        
        {/* Spacer to ensure last card can be fully scrolled into view */}
        <div className="w-4 flex-shrink-0"></div>
      </div>
    </div>
    
    {/* Show All Button - visible on both desktop and mobile */}
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

{/* Best Selling Course Add-ons */}
<section className="py-12 px-6 bg-primary/10 section-divider">
          <div className="container">
            <motion.h2
              className="text-3xl md:text-3xl font-bold mb-8 text-center text-[--text-light] fade-in-up text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Best Selling Add-ons
            </motion.h2>
            
            {/* Desktop View - Keep as is */}
            <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
               {
                id: 'addon-011',
                title: 'SKC Physics Crush Class 11 Notes & JEE Main 7 Years PYQs Combo',
                price: 1125,
                provider: 'PW',
                imageUrl: 'https://static.pw.live/0b27cf2d-9c2d-4e8c-aad5-c51e5fc23a74.png',
                providerInfo: { name: 'Physics Wallah' },
                rating: 4.8,
                reviewsCount: 4,
                category: 'IIT JEE Books',
                dataAiHint: 'physics handwritten notes combo',
                url: 'https://store.pw.live/products/skc-physics-crush-class-11', // Placeholder URL
              },
              {
                id: 'addon-013',
                title: 'UPSC Mains Wallah 11 Years GS Solved Papers 1-4 Combo',
                price: 1189,
                provider: 'PW',
                imageUrl: 'https://d2bps9p1kiy4ka.cloudfront.net/5eb393ee95fab7468a79d189/5284f34e-5c86-4228-9ccd-7fbcef378ad8.png',
                providerInfo: { name: 'Physics Wallah' },
                rating: 4.8,
                reviewsCount: 12,
                category: 'UPSC CSE Books',
                dataAiHint: 'upsc mains pyq combo',
                url: 'https://store.pw.live/products/upsc-mains-wallah-pyq', // Placeholder URL
              },
                {
                  id: 'addon-003',
                  title: 'Project Kit',
                  price: 1480,
                  provider: 'PW',
                  imageUrl: 'https://store.pw.live/_next/image?url=https%3A%2F%2Fd2bps9p1kiy4ka.cloudfront.net%2F5eb393ee95fab7468a79d189%2F15419cc8-1c0a-4037-8062-8e54ad76b8c6.jpg&w=1920&q=75',
                  providerInfo: { name: 'Physics Wallah' },
                  rating: 4.6,
                  reviewsCount: 500,
                  category: "Add-ons",
                  dataAiHint: "project tools kit",
                  url:"https://store.pw.live/products/curios-jr-science-experiment-kit-6th-class"
                },
                {
                  id: 'addon-004',
                  title: 'Course book',
                  price: 1389,
                  provider: 'PW',
                  imageUrl: 'https://store.pw.live/_next/image?url=https%3A%2F%2Fd2bps9p1kiy4ka.cloudfront.net%2F5eb393ee95fab7468a79d189%2Fc67a4b93-2134-4e1b-862a-facc99f02768.png&w=1920&q=75',
                  providerInfo: { name: 'Physics Wallah' },
                  rating: 4.4,
                  reviewsCount: 300,
                  category: "Add-ons",
                  dataAiHint: "ebook digital book",
                  url:"https://store.pw.live/products/absolute-advanced-physics-chemistry-mathematics-set-of-3"
                },
                {
                  id: 'addon-005',
                  title: 'Practice Tests',
                  price: 407,
                  provider: 'PW',
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

            {/* Mobile View - Horizontal scrolling with 2 cards visible */}
            <div className="block sm:hidden">
              <div className="flex gap-3 -mx-12 px-1 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {[
                 {
                  id: 'addon-011',
                  title: 'SKC Physics Crush Class 11 Notes & JEE Main 7 Years PYQs Combo',
                  price: 1125,
                  provider: 'PW',
                  imageUrl: 'https://static.pw.live/0b27cf2d-9c2d-4e8c-aad5-c51e5fc23a74.png',
                  providerInfo: { name: 'Physics Wallah' },
                  rating: 4.8,
                  reviewsCount: 4,
                  category: 'IIT JEE Books',
                  dataAiHint: 'physics handwritten notes combo',
                  url: 'https://store.pw.live/products/skc-physics-crush-class-11', // Placeholder URL
                },
                {
                  id: 'addon-013',
                  title: 'UPSC Mains Wallah 11 Years GS Solved Papers 1-4 Combo',
                  price: 1189,
                  provider: 'PW',
                  imageUrl: 'https://d2bps9p1kiy4ka.cloudfront.net/5eb393ee95fab7468a79d189/5284f34e-5c86-4228-9ccd-7fbcef378ad8.png',
                  providerInfo: { name: 'Physics Wallah' },
                  rating: 4.8,
                  reviewsCount: 12,
                  category: 'UPSC CSE Books',
                  dataAiHint: 'upsc mains pyq combo',
                  url: 'https://store.pw.live/products/upsc-mains-wallah-pyq', // Placeholder URL
                },
                  {
                    id: 'addon-003',
                    title: 'Project Kit',
                    price: 1480,
                    imageUrl: 'https://store.pw.live/_next/image?url=https%3A%2F%2Fd2bps9p1kiy4ka.cloudfront.net%2F5eb393ee95fab7468a79d189%2F15419cc8-1c0a-4037-8062-8e54ad76b8c6.jpg&w=1920&q=75',
                    providerInfo: { name: 'Physics Wallah' },
                    rating: 4.6,
                    provider: 'PW',
                    reviewsCount: 500,
                    category: "Add-ons",
                    dataAiHint: "project tools kit",
                    url:"https://store.pw.live/products/curios-jr-science-experiment-kit-6th-class"
                  },
                  {
                    id: 'addon-004',
                    title: 'Course book',
                    price: 1389,
                    imageUrl: 'https://store.pw.live/_next/image?url=https%3A%2F%2Fd2bps9p1kiy4ka.cloudfront.net%2F5eb393ee95fab7468a79d189%2Fc67a4b93-2134-4e1b-862a-facc99f02768.png&w=1920&q=75',
                    providerInfo: { name: 'Physics Wallah' },
                    rating: 4.4,
                    provider: 'PW',
                    reviewsCount: 300,
                    category: "Add-ons",
                    dataAiHint: "ebook digital book",
                    url:"https://store.pw.live/products/absolute-advanced-physics-chemistry-mathematics-set-of-3"
                  },
                  {
                    id: 'addon-005',
                    title: 'Practice Tests',
                    price: 407,
                    provider: 'PW',
                    imageUrl: 'https://store.pw.live/_next/image?url=https%3A%2F%2Fd2bps9p1kiy4ka.cloudfront.net%2F5eb393ee95fab7468a79d189%2F9f72134a-ddb0-4003-80a4-d4f3e4551509.png&w=1920&q=75',
                    providerInfo: { name: 'Physics Wallah' },
                    rating: 4.5,
                    reviewsCount: 450,
                    category: "Add-ons",
                    dataAiHint: "test exam paper",
                    url:"https://store.pw.live/products/jee-main-rankers-test-series-2025-"
                  },
                ].map((addon) => (
                  <div key={addon.id} className="flex-shrink-0"   style={{
                    width: 'calc(48vw - 24px)', // 2 cards visible with proper spacing
                    minWidth: '160px', // Minimum width for readability
                    maxWidth: '180px'  // Maximum width to ensure 2.3 cards are visible
                  }}>
                    <SubscriptionCard subscription={addon} isMobile={true}/>
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


      </main>
      <Footer />
    </div>
  );
}