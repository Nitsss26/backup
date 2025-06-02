import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CourseCard } from '@/components/CourseCard';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { featuredCourses, popularCategories } from '@/lib/placeholder-data';
import { CATEGORIES, APP_NAME } from '@/lib/constants';
import { SearchBar } from '@/components/SearchBar';
import { ArrowRight, BookOpen, CheckCircle, Users, Video } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 via-background to-secondary/10 py-16 md:py-24">
          <div className="container grid md:grid-cols-2 items-center gap-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tight">
                Unlock Your Potential with <span className="text-primary">{APP_NAME}</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Discover thousands of online courses from expert instructors. Learn at your own pace, anytime, anywhere.
              </p>
              <div className="max-w-xl">
                <SearchBar />
              </div>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <Link href="/courses">Explore Courses <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/teach">Become an Instructor</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <Image 
                src="https://placehold.co/600x500.png" 
                alt="Person learning online" 
                width={600} 
                height={500} 
                className="rounded-lg shadow-2xl"
                data-ai-hint="online learning student"
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
              We provide a seamless and enriching learning experience with features designed for your success.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: BookOpen, title: "Expert Instructors", description: "Learn from industry leaders and experienced educators." },
                { icon: Video, title: "Flexible Learning", description: "Study at your own pace, on any device, anytime." },
                { icon: CheckCircle, title: "Verified Courses", description: "Access high-quality, curated content you can trust." },
                { icon: Users, title: "Supportive Community", description: "Connect with peers and instructors for guidance." }
              ].map((feature, index) => (
                <div key={index} className="bg-card p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 font-headline">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Courses Section */}
        <section className="py-16 bg-secondary/30">
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

        {/* Popular Categories Section */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12 font-headline">Explore Popular Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {popularCategories.map((category) => (
                <Link key={category.id} href={`/courses?category=${category.slug}`}>
                  <div className="group bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center aspect-square flex flex-col justify-center items-center">
                    {category.icon && <category.icon className="h-10 w-10 text-primary mb-3 group-hover:scale-110 transition-transform" />}
                    <h3 className="text-md font-semibold group-hover:text-primary transition-colors">{category.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section - Placeholder */}
        <section className="py-16 bg-primary/5">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12 font-headline">What Our Students Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-background p-6 rounded-lg shadow-lg">
                  <Image src={`https://placehold.co/80x80.png`} alt={`Student ${i}`} width={80} height={80} className="rounded-full mx-auto mb-4" data-ai-hint="person portrait" />
                  <p className="text-muted-foreground italic mb-4 text-center">"This platform is amazing! I've learned so much and boosted my career. The courses are top-notch."</p>
                  <p className="font-semibold text-center">Student Name {i}</p>
                  <p className="text-sm text-muted-foreground text-center">Course Title {i}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
