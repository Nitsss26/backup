
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CourseCard } from '@/components/CourseCard';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { featuredCourses, popularCategories, getCoursesByCategory, placeholderCourses } from '@/lib/placeholder-data';
import { CATEGORIES, APP_NAME } from '@/lib/constants';
import { SearchBar } from '@/components/SearchBar';
import { ArrowRight, BookOpen, CheckCircle, Users, Video, Store, Zap, TrendingUp, Award } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


// Helper to get top N courses from a category (mock)
const getTopCoursesInCategory = (categorySlug: string, count: number) => {
  return placeholderCourses
    .filter(course => course.category.toLowerCase().replace(/\s+/g, '-') === categorySlug && course.approvalStatus === 'approved')
    .sort((a, b) => (b.studentsEnrolled || 0) - (a.studentsEnrolled || 0)) // Sort by enrolled, then rating
    .sort((a,b) => b.rating - a.rating)
    .slice(0, count);
};


export default function HomePage() {
  const topCategoriesForShowcase = popularCategories.slice(0, 3); // Show top 3 categories with courses

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-16 md:py-24">
          <div className="container grid md:grid-cols-2 items-center gap-12">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tight">
                Discover Your Next Skill with <span className="text-primary">{APP_NAME}</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Explore thousands of online courses from top educators, institutes, and experts. Learn, grow, and achieve your goals.
              </p>
              <div className="max-w-xl">
                <SearchBar />
              </div>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <Link href="/courses">Explore All Courses <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/sell-courses">Sell Your Courses <Store className="ml-2 h-5 w-5" /></Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <Image
                src="https://placehold.co/600x500/EBF4FF/60A5FA?text=Learn+Anything%2C+Anytime"
                alt="Student joyfully learning online with a laptop and headphones in a bright, modern setting"
                width={600}
                height={500}
                className="rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
                data-ai-hint="online learning student laptop headphones"
                priority
              />
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-4 font-headline">Why Learn with {APP_NAME}?</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              We provide a seamless, enriching learning experience with features designed for your success and a marketplace trusted by sellers.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: BookOpen, title: "Vast Course Selection", description: "From IIT-JEE & NEET to Business & Arts, find courses from diverse sellers." },
                { icon: Users, title: "Expert Sellers & Institutions", description: "Learn from verified individual teachers, renowned institutions, and experienced educators." },
                { icon: Zap, title: "Flexible Learning", description: "Study at your own pace, on any device, anytime, anywhere. Fit learning into your life." },
                { icon: Award, title: "Quality & Trust", description: "Access high-quality, curated content. Many courses offer certificates upon completion." },
              ].map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-xl transition-shadow border-t-4 border-primary">
                  <CardHeader className="items-center">
                    <div className="p-3 bg-primary/10 rounded-full mb-3">
                       <feature.icon className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-semibold font-headline">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Courses Section */}
        <section className="py-16 bg-slate-50 dark:bg-slate-800/30">
          <div className="container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold font-headline">Featured Courses</h2>
              <Button variant="outline" asChild>
                <Link href="/courses">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>

        {/* Top Selling by Category Section */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12 font-headline">Top Selling by Category</h2>
            {topCategoriesForShowcase.map(category => (
              <div key={category.id} className="mb-12">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-semibold flex items-center">
                    <category.icon className="h-7 w-7 text-primary mr-3" /> {category.name}
                  </h3>
                  <Button variant="link" asChild>
                    <Link href={`/courses?category=${category.slug}`} className="text-primary">View all in {category.name} <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {getTopCoursesInCategory(category.slug, 4).map(course => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                  {getTopCoursesInCategory(category.slug, 4).length === 0 && (
                    <p className="col-span-full text-center text-muted-foreground">No top sellers in this category yet. Be the first to explore!</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* Popular Categories Section */}
        <section className="py-16 bg-primary/5">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12 font-headline">Explore All Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {CATEGORIES.map((category) => ( // Show all categories here
                <Link key={category.id} href={`/courses?category=${category.slug}`}>
                  <div className="group bg-card p-6 rounded-lg shadow-md hover:shadow-xl hover:border-primary border-transparent border-2 transition-all text-center aspect-square flex flex-col justify-center items-center transform hover:-translate-y-1">
                    {category.icon && <category.icon className="h-10 w-10 text-primary mb-3 group-hover:scale-110 transition-transform" />}
                    <h3 className="text-md font-semibold group-hover:text-primary transition-colors">{category.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section - Placeholder */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12 font-headline">What Our Community Says</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Priya S.", course: "IIT-JEE Crash Course", imageHint: "indian student testimonial", text: "The IIT-JEE course was intense but so well-structured! The mock tests were a game-changer. Thanks EdTechCart!" },
                { name: "Rohan M.", course: "Business Analytics Pro", imageHint: "male professional testimonial", text: "Upgraded my analytics skills significantly. The seller provided excellent support. Platform is very user-friendly." },
                { name: "Aisha K.", course: "Advanced Python", imageHint: "female coder testimonial", text: "Loved the Python course! The content was up-to-date, and I could learn at my own pace. Highly recommend it." }
              ].map((testimonial, i) => (
                <Card key={i} className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center">
                  <Image src={`https://placehold.co/100x100.png`} alt={testimonial.name} width={100} height={100} className="rounded-full mx-auto mb-4 border-2 border-primary p-1" data-ai-hint={testimonial.imageHint} />
                  <p className="text-muted-foreground italic mb-4">"{testimonial.text}"</p>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-primary">{testimonial.course}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
