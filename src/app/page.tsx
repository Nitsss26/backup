
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CourseCard } from '@/components/CourseCard';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { featuredCoursesForHomepage, topCategoryShowcaseData } from '@/lib/placeholder-data';
import { CATEGORIES, APP_NAME } from '@/lib/constants';
import { SearchBar } from '@/components/SearchBar';
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
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const categoryColors = [
    'text-blue-500', 'text-green-500', 'text-purple-500', 'text-red-500', 'text-orange-500',
    'text-pink-500', 'text-teal-500', 'text-indigo-500', 'text-yellow-500', 'text-cyan-500',
    'text-emerald-500', 'text-rose-500', 'text-violet-500', 'text-amber-500', 'text-lime-500',
    'text-sky-500', 'text-fuchsia-500', 'text-slate-500',
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="flex-grow">
        {/* Hero Section with Carousel */}
        <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-gray-900 to-gray-800 -mt-16">
          <div className="container grid md:grid-cols-2 items-center gap-12 px-4 md:px-6">
            <div className="space-y-7 text-center md:text-left">
              <Badge
                variant="outline"
                className="inline-flex items-center gap-2 border-2 border-blue-500 text-blue-500 font-semibold text-base py-2 px-4 rounded-full shadow-lg hover:shadow-xl hover:bg-blue-500/10 transition-all duration-300"
              >
                <GraduationCap className="h-5 w-5" />
                All-In-One Course Marketplace
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Elevate Your Potential with <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">{APP_NAME}</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto md:mx-0">
                Compare and enroll in the best online courses from top educators and institutions. We bring top courses from across the web to one place.
              </p>
              <div className="max-w-xl mx-auto md:mx-0">
                <SearchBar />
              </div>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Button size="lg" asChild className="text-base px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full">
                  <Link href="/courses">
                    Explore All Courses <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-base px-8 py-3 border-blue-500 text-blue-500 hover:bg-blue-500/10 rounded-full">
                  <Link href="/sell-courses">
                    Become a Seller <UploadCloud className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-2xl hidden md:block">
              <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {slides.map((slide, index) => (
                  <div key={index} className="min-w-full">
                    <div className="relative">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        width={600}
                        height={500}
                        className="w-full h-[500px] object-cover rounded-lg"
                        data-ai-hint="online education learning course"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center p-8">
                        <h2 className="text-4xl font-bold">{slide.title}</h2>
                        <p className="text-lg mt-2">{slide.description}</p>
                        <Button asChild className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">
                          <Link href={slide.href}>{slide.cta}</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                  <span
                    key={index}
                    className={`w-3 h-3 rounded-full cursor-pointer ${currentSlide === index ? 'bg-blue-500' : 'bg-gray-400'}`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 md:py-20 bg-gray-900">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Why {APP_NAME}?
            </h2>
            <p className="text-center text-gray-400 mb-12 md:mb-16 max-w-3xl mx-auto text-lg">
              Unlock a dynamic, digital learning journey with interactive tools, progress tracking, and a trusted marketplace for sellers to grow their impact globally.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: BookOpen,
                  title: "Vast Course Selection",
                  description: "From IIT-JEE & NEET to Business & Arts, find courses from diverse sellers.",
                },
                {
                  icon: Users,
                  title: "Expert Sellers & Institutions",
                  description: "Learn from verified individual teachers, renowned institutions, and experienced educators.",
                },
                {
                  icon: Zap,
                  title: "Flexible Learning Paths",
                  description: "Study at your own pace, on any device. Access materials anytime, anywhere.",
                },
                {
                  icon: ShieldCheck,
                  title: "Quality & Trust Guaranteed",
                  description: "Access high-quality, curated content. Many courses offer certificates upon completion.",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-xl transition-shadow duration-300 border-t-4 border-blue-500 bg-gray-800 text-white group"
                >
                  <CardHeader className="items-center pt-6">
                    <div className="p-4 bg-blue-500/10 rounded-full mb-4 inline-block group-hover:scale-110 transition-transform">
                      <feature.icon className="h-10 w-10 text-blue-500" />
                    </div>
                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <p className="text-sm text-gray-400 px-2">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-gray-800 to-gray-900">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              How {APP_NAME} Works
            </h2>
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <Card className="shadow-lg border-blue-500 border-2 bg-gray-800 text-white h-full">
                <CardHeader className="flex-row items-center gap-4">
                  <Users className="h-12 w-12 text-blue-500 p-2 bg-blue-500/10 rounded-lg" />
                  <div>
                    <CardTitle className="text-2xl">For Students</CardTitle>
                    <CardDescription className="text-gray-400">Find your perfect course and start learning.</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm pl-10">
                  <p className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5 shrink-0" />
                    Discover a wide range of courses across all categories.
                  </p>
                  <p className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5 shrink-0" />
                    Compare courses based on price, reviews, curriculum, and more.
                  </p>
                  <p className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5 shrink-0" />
                    Enroll securely; access instructions provided by sellers after purchase.
                  </p>
                  <p className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5 shrink-0" />
                    Track your purchases and earned certificates in your dashboard.
                  </p>
                </CardContent>
                <CardContent className="pl-10 pb-6 mt-auto">
                  <Image
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
                    alt="Illustration of a student learning journey"
                    width={400}
                    height={250}
                    className="rounded-md shadow hover:scale-105 transition-transform duration-300"
                    data-ai-hint="student journey diagram infographic discovery learning"
                  />
                </CardContent>
              </Card>
              <Card className="shadow-lg border-purple-500 border-2 bg-gray-800 text-white h-full">
                <CardHeader className="flex-row items-center gap-4">
                  <Store className="h-12 w-12 text-purple-500 p-2 bg-purple-500/10 rounded-lg" />
                  <div>
                    <CardTitle className="text-2xl">For Sellers</CardTitle>
                    <CardDescription className="text-gray-400">Share your expertise and grow your audience.</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm pl-10">
                  <p className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-2 mt-0.5 shrink-0" />
                    Register and get verified to build trust with learners.
                  </p>
                  <p className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-2 mt-0.5 shrink-0" />
                    Easily create and list your courses with our intuitive tools.
                  </p>
                  <p className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-2 mt-0.5 shrink-0" />
                    Reach a global audience and manage your sales effectively.
                  </p>
                  <p className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-2 mt-0.5 shrink-0" />
                    Access analytics to track your performance and earnings.
                  </p>
                </CardContent>
                <CardContent className="pl-10 pb-6 mt-auto">
                  <Image
                    src="https://images.unsplash.com/photo-1551288049-b1f3a0c51f91"
                    alt="Illustration of seller tools and growth charts"
                    width={400}
                    height={250}
                    className="rounded-md shadow hover:scale-105 transition-transform duration-300"
                    data-ai-hint="seller tools dashboard growth charts interface"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Courses Section */}
        <section className="py-16 md:py-20 bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 md:mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 sm:mb-0 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                Featured Courses
              </h2>
              <Button variant="outline" asChild className="border-blue-500 text-blue-500 hover:bg-blue-500/10 rounded-full">
                <Link href="/courses?sort=popularity">
                  View All Featured <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCoursesForHomepage.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>

        {/* Top Courses by Category Section */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-gray-800 to-gray-900">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Top Courses by Category
            </h2>
            {topCategoryShowcaseData.map((categoryData) => {
              const categoryDetails = CATEGORIES.find((c) => c.slug === categoryData.categorySlug);
              return (
                <div key={categoryData.categorySlug} className="mb-12 last:mb-0">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8">
                    <h3 className="text-2xl font-semibold flex items-center mb-2 sm:mb-0">
                      {categoryDetails?.icon && <categoryDetails.icon className="h-8 w-8 text-blue-500 mr-3" />}
                      {categoryData.categoryName}
                    </h3>
                    <Button
                      variant="link"
                      asChild
                      className="text-blue-500 self-start sm:self-center hover:text-blue-400"
                    >
                      <Link href={`/courses?category=${categoryData.categorySlug}`}>
                        View all in {categoryData.categoryName} <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  {categoryData.courses.length > 0 ? (
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {categoryData.courses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                      ))}
                    </div>
                  ) : (
                    <div className="col-span-full text-center text-gray-400 py-8 flex flex-col items-center bg-gray-800 rounded-lg shadow">
                      <Image
                        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                        alt="Empty category illustration"
                        width={300}
                        height={200}
                        className="rounded-md mb-4 hover:scale-105 transition-transform duration-300"
                        data-ai-hint="empty category education"
                      />
                      <p>More courses in {categoryData.categoryName} coming soon!</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Explore All Categories Section */}
        <section className="py-16 md:py-20 bg-gray-900">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Explore All Categories
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
              {CATEGORIES.map((category, index) => (
                <Link key={category.id} href={`/courses?category=${category.slug}`}>
                  <div className="group bg-gray-800 p-4 md:p-6 rounded-lg shadow-md hover:shadow-xl hover:border-blue-500 border-2 border-gray-700 transition-all text-center aspect-square flex flex-col justify-center items-center transform hover:-translate-y-1.5 duration-300">
                    {category.icon && (
                      <category.icon className={`h-10 w-10 md:h-12 md:w-12 ${categoryColors[index % categoryColors.length]} mb-3 group-hover:scale-110 transition-transform`} />
                    )}
                    <h3 className="text-sm md:text-base font-semibold group-hover:text-blue-500 transition-colors line-clamp-2">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-gray-800 to-gray-900">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              What Our Community Says
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Priya Sharma",
                  course: "IIT-JEE Crash Course",
                  image: "https://plus.unsplash.com/premium_photo-1682089810582-f7b200217b67?w=100&h=100&fit=crop&crop=face&auto=format",
                  text: "The IIT-JEE course was intense but so well-structured! The mock tests were a game-changer. EdTechCart made finding it easy.",
                },
                {
                  name: "Rohan Mehta",
                  course: "Business Analytics Pro",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                  text: "Upgraded my analytics skills significantly. The seller provided excellent support through the platform. User-friendly!",
                },
                {
                  name: "Aisha Khan",
                  course: "Advanced Python Programming",
                  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face",
                  text: "Loved the Python course! The content was up-to-date, and I could learn at my own pace. Highly recommend this marketplace.",
                },
              ].map((testimonial, i) => (
                <Card
                  key={i}
                  className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gray-800 text-white flex flex-col"
                >
                  <CardContent className="p-6 text-center flex flex-col flex-grow items-center">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={100}
                      height={100}
                      className="rounded-full mx-auto mb-5 border-4 border-blue-500/50 p-1 object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className="h-5 w-5 text-yellow-400" fill="currentColor" />
                      ))}
                    </div>
                    <blockquote className="text-gray-400 italic mb-4 text-sm leading-relaxed flex-grow">
                      "{testimonial.text}"
                    </blockquote>
                    <p className="font-semibold mt-auto text-white">{testimonial.name}</p>
                    <p className="text-xs text-blue-500">{testimonial.course}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Subscription Section */}
        <section className="py-16 md:py-20 bg-gray-800 text-center">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Get updates on the best courses and exclusive offers!
            </p>
            <div className="flex justify-center space-x-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-700 text-white border-gray-600 focus:border-blue-500 rounded-full py-2 px-4 max-w-md"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2">
                Subscribe
              </Button>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              By subscribing, you agree to receive commercial communications from {APP_NAME} via email.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
