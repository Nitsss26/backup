
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CourseCard } from '@/components/CourseCard';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Carousel } from '@/components/Carousel';
import { BannerCard } from '@/components/BannerCard';
import { featuredCoursesForHomepage, topCategoryShowcaseData } from '@/lib/placeholder-data';
import { CATEGORIES, APP_NAME } from '@/lib/constants';
import { ArrowRight, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input'; // Added this import

export default function HomePage() {
  const carouselItems = [
    {
      id: '1',
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      title: "Master IIT-JEE Physics",
      description: "Ace your IIT-JEE with our comprehensive Physics course!",
      ctaText: "Enroll Now",
      ctaLink: "/courses/featured-iitjee-01",
    },
    {
      id: '2',
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
      title: "NEET Biology Bootcamp",
      description: "Unlock your potential with this in-depth Biology course!",
      ctaText: "Enroll Now",
      ctaLink: "/courses/featured-neet-01",
    },
  ];

  const platforms = [
    { name: 'Udemy', imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop", ctaLink: '/courses?platform=udemy', bgColor: 'bg-gradient-to-r from-blue-600 to-indigo-700' },
    { name: 'Coursera', imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop", ctaLink: '/courses?platform=coursera', bgColor: 'bg-gradient-to-r from-green-600 to-teal-700' },
    { name: 'Unacademy', imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop", ctaLink: '/courses?platform=unacademy', bgColor: 'bg-gradient-to-r from-blue-800 to-purple-800' },
    { name: 'Physics Wallah', imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop", ctaLink: '/courses?platform=physics-wallah', bgColor: 'bg-gradient-to-r from-red-600 to-pink-700' },
    { name: 'Skillshare', imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop", ctaLink: '/courses?platform=skillshare', bgColor: 'bg-gradient-to-r from-purple-600 to-indigo-700' },
    { name: 'edX', imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop", ctaLink: '/courses?platform=edx', bgColor: 'bg-gradient-to-r from-teal-600 to-cyan-700' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-12 px-6">
          <div className="container">
            <Carousel items={carouselItems} />
          </div>
        </section>

        {/* Featured Banners */}
        <section className="py-12 px-6 bg-gradient-to-r from-gray-900/90 to-indigo-950/90">
          <div className="container">
            <motion.h2
              className="text-3xl md:text-4xl font-bold gradient-text mb-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Explore Top Categories
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <BannerCard
                imageUrl="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop"
                title="Tech Courses"
                ctaText="Explore"
                ctaLink="/courses?category=computer-science"
              />
              <BannerCard
                imageUrl="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop"
                title="Business Courses"
                ctaText="Explore"
                ctaLink="/courses?category=business"
              />
              <BannerCard
                imageUrl="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop"
                title="Udemy"
                ctaText="Browse"
                ctaLink="/courses?platform=udemy"
              />
              <BannerCard
                imageUrl="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop"
                title="Coursera"
                ctaText="Browse"
                ctaLink="/courses?platform=coursera"
              />
            </div>
          </div>
        </section>

        {/* Recommended For You */}
        <section className="py-12 px-6">
          <div className="container">
            <motion.h2
              className="text-3xl md:text-4xl font-bold gradient-text mb-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
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
        <section className="py-12 px-6 bg-gradient-to-r from-gray-900/90 to-indigo-950/90">
          <div className="container">
            <motion.h2
              className="text-3xl md:text-4xl font-bold gradient-text mb-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Explore By Platforms
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
              {platforms.map((platform) => (
                <Link key={platform.name} href={platform.ctaLink}>
                  <Button className={`w-full py-4 rounded-xl ${platform.bgColor} text-white shiny-btn`}>
                    {platform.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Best Selling Courses */}
        <section className="py-12 px-6">
          <div className="container">
            <motion.h2
              className="text-3xl md:text-4xl font-bold gradient-text mb-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
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
              <Button className="shiny-btn text-white px-6 py-3 rounded-full">
                Show All
              </Button>
            </div>
          </div>
        </section>

        {/* Get Extra Discounts */}
        <section className="py-12 px-6 bg-gradient-to-r from-gray-900/90 to-indigo-950/90">
          <div className="container flex flex-col md:flex-row justify-between items-center bg-gray-800/50 rounded-xl p-8 glow-on-hover">
            <div>
              <motion.h2
                className="text-3xl md:text-4xl font-bold gradient-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                Get Extra Discounts with EdTechCart Plus
              </motion.h2>
              <Button asChild className="mt-4 shiny-btn text-white px-6 py-3 rounded-full">
                <Link href="/plus">Join Now</Link>
              </Button>
            </div>
            <motion.div
              className="text-gray-200 mt-6 md:mt-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
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
        <section className="py-12 px-6">
          <div className="container">
            <motion.h2
              className="text-3xl md:text-4xl font-bold gradient-text mb-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Best Selling Course Bundles
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                {
                  id: 'bundle1',
                  title: 'Full Stack Developer Bundle',
                  price: 3999,
                  imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop",
                  providerInfo: { name: 'Innovate Skill Hub', logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=50&auto=format&fit=crop" },
                  rating: 4.8,
                  reviewsCount: 1200,
                },
                {
                  id: 'bundle2',
                  title: 'Data Science Bundle',
                  price: 4499,
                  imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop",
                  providerInfo: { name: 'Kaushik Learning Solutions', logo: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=50&auto=format&fit=crop" },
                  rating: 4.9,
                  reviewsCount: 1500,
                },
                {
                  id: 'bundle3',
                  title: 'Business Mastery Bundle',
                  price: 3499,
                  imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop",
                  providerInfo: { name: 'Vidya Mandir Online', logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=50&auto=format&fit=crop" },
                  rating: 4.7,
                  reviewsCount: 900,
                },
                {
                  id: 'bundle4',
                  title: 'AI & ML Bundle',
                  price: 5999,
                  imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop",
                  providerInfo: { name: 'Expert Tutors Academy', logo: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=50&auto=format&fit=crop" },
                  rating: 4.8,
                  reviewsCount: 1100,
                },
                {
                  id: 'bundle5',
                  title: 'Design Mastery Bundle',
                  price: 3799,
                  imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop",
                  providerInfo: { name: 'Innovate Skill Hub', logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=50&auto=format&fit=crop" },
                  rating: 4.6,
                  reviewsCount: 800,
                },
              ].map((bundle) => (
                <CourseCard key={bundle.id} course={bundle as any} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Button className="shiny-btn text-white px-6 py-3 rounded-full">
                Show All
              </Button>
            </div>
          </div>
        </section>

        {/* Discover Courses By Category */}
        <section className="py-12 px-6 bg-gradient-to-r from-gray-900/90 to-indigo-950/90">
          <div className="container">
            <motion.h2
              className="text-3xl md:text-4xl font-bold gradient-text mb-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Discover Courses By Category
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-7 gap-6">
              {CATEGORIES.slice(0, 7).map((category) => (
                <Link key={category.id} href={`/courses?category=${category.slug}`}>
                  <Button className="w-full bg-gradient-to-r from-gray-800 to-gray-700 text-white py-4 rounded-xl shiny-btn">
                    {category.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Best Selling Course Add-ons */}
        <section className="py-12 px-6">
          <div className="container">
            <motion.h2
              className="text-3xl md:text-4xl font-bold gradient-text mb-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Best Selling Course Add-ons
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                {
                  id: 'addon1',
                  title: 'Certification Add-on',
                  price: 499,
                  imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop",
                  providerInfo: { name: 'EdTechCart', logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=50&auto=format&fit=crop" },
                  rating: 4.5,
                  reviewsCount: 600,
                },
                {
                  id: 'addon2',
                  title: '1:1 Mentorship',
                  price: 1999,
                  imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop",
                  providerInfo: { name: 'EdTechCart', logo: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=50&auto=format&fit=crop" },
                  rating: 4.7,
                  reviewsCount: 400,
                },
                {
                  id: 'addon3',
                  title: 'Project Kit',
                  price: 799,
                  imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop",
                  providerInfo: { name: 'EdTechCart', logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=50&auto=format&fit=crop" },
                  rating: 4.6,
                  reviewsCount: 500,
                },
                {
                  id: 'addon4',
                  title: 'Course Ebook',
                  price: 299,
                  imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop",
                  providerInfo: { name: 'EdTechCart', logo: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=50&auto=format&fit=crop" },
                  rating: 4.4,
                  reviewsCount: 300,
                },
                {
                  id: 'addon5',
                  title: 'Practice Tests',
                  price: 599,
                  imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop",
                  providerInfo: { name: 'EdTechCart', logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=50&auto=format&fit=crop" },
                  rating: 4.5,
                  reviewsCount: 450,
                },
              ].map((addon) => (
                <CourseCard key={addon.id} course={addon as any} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Button className="shiny-btn text-white px-6 py-3 rounded-full">
                Show All
              </Button>
            </div>
          </div>
        </section>

        {/* Discover By Price */}
        <section className="py-12 px-6 bg-gradient-to-r from-gray-900/90 to-indigo-950/90">
          <div className="container">
            <motion.h2
              className="text-3xl md:text-4xl font-bold gradient-text mb-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Discover By Price
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
              {[
                { label: 'Under ₹500', href: '/courses?price=under-500' },
                { label: 'Under ₹1,000', href: '/courses?price=under-1000' },
                { label: 'Under ₹2,000', href: '/courses?price=under-2000' },
                { label: 'Under ₹5,000', href: '/courses?price=under-5000' },
                { label: 'Under ₹10,000', href: '/courses?price=under-10000' },
                { label: 'Above ₹10,000', href: '/courses?price=above-10000' },
              ].map((price) => (
                <Link key={price.label} href={price.href}>
                  <Button className="w-full bg-gradient-to-r from-gray-800 to-gray-700 text-white py-4 rounded-xl shiny-btn">
                    {price.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="py-12 px-6 text-center">
          <div className="container">
            <motion.h2
              className="text-3xl md:text-4xl font-bold gradient-text mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Subscribe to Our Newsletter
            </motion.h2>
            <motion.p
              className="text-lg text-gray-200 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Get updates on the best courses and exclusive offers!
            </motion.p>
            <motion.div
              className="flex justify-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative w-full max-w-md">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800/80 text-white rounded-full py-3 px-4 pl-12 border border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <Mail className="w-6 h-6 absolute left-4 top-3 text-gray-400" />
              </div>
              <Button className="shiny-btn text-white px-6 py-3 rounded-full">
                Subscribe
              </Button>
            </motion.div>
            <motion.p
              className="text-gray-400 mt-4 text-sm max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              By subscribing, you agree to receive commercial communications from EdTechCart via email, including personalized updates about courses and services offered on the EdTechCart Marketplace.
            </motion.p>
          </div>
        </section>

        {/* Best Selling Subscriptions */}
        <section className="py-12 px-6 bg-gradient-to-r from-gray-900/90 to-indigo-950/90">
          <div className="container">
            <motion.h2
              className="text-3xl md:text-4xl font-bold gradient-text mb-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Best Selling Subscriptions
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                {
                  id: 'sub1',
                  title: 'Udemy Annual Subscription',
                  price: 3999,
                  imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop",
                  providerInfo: { name: 'Udemy', logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=50&auto=format&fit=crop" },
                  rating: 4.8,
                  reviewsCount: 1000,
                },
                {
                  id: 'sub2',
                  title: 'Coursera Plus - 1 Month',
                  price: 999,
                  imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop",
                  providerInfo: { name: 'Coursera', logo: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=50&auto=format&fit=crop" },
                  rating: 4.7,
                  reviewsCount: 800,
                },
                {
                  id: 'sub3',
                  title: 'Unacademy Plus - 3 Months',
                  price: 2499,
                  imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop",
                  providerInfo: { name: 'Unacademy', logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=50&auto=format&fit=crop" },
                  rating: 4.6,
                  reviewsCount: 700,
                },
                {
                  id: 'sub4',
                  title: 'Skillshare - 1 Month',
                  price: 799,
                  imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop",
                  providerInfo: { name: 'Skillshare', logo: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=50&auto=format&fit=crop" },
                  rating: 4.5,
                  reviewsCount: 600,
                },
                {
                  id: 'sub5',
                  title: 'edX Verified Track',
                  price: 1999,
                  imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop",
                  providerInfo: { name: 'edX', logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=50&auto=format&fit=crop" },
                  rating: 4.6,
                  reviewsCount: 650,
                },
              ].map((sub) => (
                <CourseCard key={sub.id} course={sub as any} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Button className="shiny-btn text-white px-6 py-3 rounded-full">
                Show All
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );

    