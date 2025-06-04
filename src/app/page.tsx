
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CourseCard } from '@/components/CourseCard';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { featuredCoursesForHomepage, topCategoryShowcaseData } from '@/lib/placeholder-data'; // Updated import
import { CATEGORIES, APP_NAME } from '@/lib/constants';
import { SearchBar } from '@/components/SearchBar';
import { ArrowRight, BookOpen, CheckCircle, Users, Zap, ShieldCheck, TrendingUp, Award, Lightbulb, BarChart3, Store, UploadCloud, SearchIcon, Star, GraduationCap } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';


export default function HomePage() {

  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <main className="flex-grow"> {/* Removed -mt-7 */}
        {/* Hero Section */}
        <section className=" py-16 md:py-24 lg:py-32 bg-secondary/30">
          <div className="container grid md:grid-cols-2 items-center gap-12">
            <div className="space-y-7 text-center md:text-left"> {/* Removed mb-20 */}
              <Badge
                variant="outline"
                className="inline-flex items-center gap-2 border-2 border-primary text-primary font-headline font-semibold text-base py-2 px-4 rounded-full shadow-md hover:shadow-lg hover:bg-primary/30 transition-all duration-300"
              >
                <GraduationCap className="h-5 w-5 text-primary" />
                All-In-One Course Marketplace
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tight text-foreground">
              Elevate Your Potential with <span className="text-primary">{APP_NAME}</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto md:mx-0">
                Compare and enroll in the best online courses from top educators and institutions. We bring top courses from across the web to one place.
              </p>
              <div className="max-w-xl mx-auto md:mx-0">
                <SearchBar />
              </div>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Button size="lg" asChild className="text-base px-8 py-3">
                  <Link href="/courses">Explore All Courses <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-base px-8 py-3 border-primary text-primary hover:bg-primary/5">
                  <Link href="/sell-courses">Become a Seller <UploadCloud className="ml-2 h-5 w-5" /></Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <Image
                src="https://placehold.co/600x500.png"
                alt="Diverse group of students learning online, engaging with digital content on various devices, with graphs and icons overlaying."
                width={600}
                height={500}
                className="rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
                data-ai-hint="online education diverse students learning digital content interactive graphs"
                priority
              />
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-headline">Why {APP_NAME}?</h2>
            <p className="text-center text-muted-foreground mb-12 md:mb-16 max-w-3xl mx-auto text-lg">
              We provide a seamless, enriching learning experience with features designed for your success and a marketplace trusted by sellers for its reach and tools.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: BookOpen, title: "Vast Course Selection", description: "From IIT-JEE & NEET to Business & Arts, find courses from diverse sellers." },
                { icon: Users, title: "Expert Sellers & Institutions", description: "Learn from verified individual teachers, renowned institutions, and experienced educators." },
                { icon: Zap, title: "Flexible Learning Paths", description: "Study at your own pace, on any device. Access materials anytime, anywhere." },
                { icon: ShieldCheck, title: "Quality & Trust Guaranteed", description: "Access high-quality, curated content. Many courses offer certificates upon completion." },
              ].map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-xl transition-shadow duration-300 border-t-4 border-primary bg-card">
                  <CardHeader className="items-center pt-6">
                    <div className="p-4 bg-primary/10 rounded-full mb-4 inline-block">
                       <feature.icon className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-semibold font-headline">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <p className="text-sm text-muted-foreground px-2">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-16 md:py-20 bg-secondary/30">
            <div className="container">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 font-headline">How {APP_NAME} Works</h2>
                <div className="grid md:grid-cols-2 gap-10 items-start">
                    <Card className="shadow-lg border-primary border-2 h-full">
                        <CardHeader className="flex-row items-center gap-4">
                            <Users className="h-12 w-12 text-primary p-2 bg-primary/10 rounded-lg"/>
                            <div>
                                <CardTitle className="text-2xl font-headline">For Students</CardTitle>
                                <CardDescription>Find your perfect course and start learning.</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm pl-10">
                            <p className="flex items-start"><CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0"/>Discover a wide range of courses across all categories.</p>
                            <p className="flex items-start"><CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0"/>Compare courses based on price, reviews, curriculum, and more.</p>
                            <p className="flex items-start"><CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0"/>Enroll securely; access instructions provided by sellers after purchase.</p>
                            <p className="flex items-start"><CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0"/>Track your purchases and earned certificates in your dashboard.</p>
                        </CardContent>
                        <CardContent className="pl-10 pb-6 mt-auto">
                             <Image src="https://placehold.co/400x250.png" alt="Illustration of a student learning journey, with icons for discovery, comparison, enrollment, and achievement" width={400} height={250} className="rounded-md shadow" data-ai-hint="student journey diagram infographic discovery learning"/>
                        </CardContent>
                    </Card>
                     <Card className="shadow-lg border-accent border-2 h-full">
                        <CardHeader className="flex-row items-center gap-4">
                            <Store className="h-12 w-12 text-accent p-2 bg-accent/10 rounded-lg"/>
                            <div>
                                <CardTitle className="text-2xl font-headline">For Sellers</CardTitle>
                                <CardDescription>Share your expertise and grow your audience.</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm pl-10">
                            <p className="flex items-start"><CheckCircle className="h-5 w-5 text-accent mr-2 mt-0.5 shrink-0"/>Register and get verified to build trust with learners.</p>
                            <p className="flex items-start"><CheckCircle className="h-5 w-5 text-accent mr-2 mt-0.5 shrink-0"/>Easily create and list your courses with our intuitive tools.</p>
                            <p className="flex items-start"><CheckCircle className="h-5 w-5 text-accent mr-2 mt-0.5 shrink-0"/>Reach a global audience and manage your sales effectively.</p>
                            <p className="flex items-start"><CheckCircle className="h-5 w-5 text-accent mr-2 mt-0.5 shrink-0"/>Access analytics to track your performance and earnings.</p>
                        </CardContent>
                         <CardContent className="pl-10 pb-6 mt-auto">
                             <Image src="https://placehold.co/400x250.png" alt="Illustration of seller tools, course creation interface, and growth charts" width={400} height={250} className="rounded-md shadow" data-ai-hint="seller tools dashboard growth charts interface"/>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

        {/* Featured Courses Section */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 md:mb-10">
              <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4 sm:mb-0">Featured Courses</h2>
              <Button variant="outline" asChild className="border-primary text-primary hover:bg-primary/5">
                <Link href="/courses?sort=popularity">View All Featured <ArrowRight className="ml-2 h-4 w-4" /></Link>
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
        <section className="py-16 md:py-20 bg-secondary/30">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 font-headline">Top Courses by Category</h2>
            {topCategoryShowcaseData.map(categoryData => {
              const categoryDetails = CATEGORIES.find(c => c.slug === categoryData.categorySlug);
              return (
              <div key={categoryData.categorySlug} className="mb-12 last:mb-0">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8">
                  <h3 className="text-2xl font-semibold flex items-center mb-2 sm:mb-0">
                    {categoryDetails?.icon && <categoryDetails.icon className="h-8 w-8 text-primary mr-3" />} {categoryData.categoryName}
                  </h3>
                  <Button variant="link" asChild className="text-primary self-start sm:self-center hover:text-primary/80">
                    <Link href={`/courses?category=${categoryData.categorySlug}`}>View all in {categoryData.categoryName} <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                </div>
                {categoryData.courses.length > 0 ? (
                  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categoryData.courses.map(course => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                ) : (
                    <div className="col-span-full text-center text-muted-foreground py-8 flex flex-col items-center bg-card rounded-lg shadow">
                        <Image src="https://placehold.co/300x200.png" alt="Empty category illustration" width={300} height={200} className="rounded-md mb-4" data-ai-hint="empty category education"/>
                        <p>More courses in {categoryData.categoryName} coming soon!</p>
                    </div>
                )}
              </div>
            )})}
          </div>
        </section>

        {/* Explore All Categories Section */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 font-headline">Explore All Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
              {CATEGORIES.map((category) => (
                <Link key={category.id} href={`/courses?category=${category.slug}`}>
                  <div className="group bg-card p-4 md:p-6 rounded-lg shadow-md hover:shadow-xl hover:border-primary border-2 border-sky-200 transition-all text-center aspect-square flex flex-col justify-center items-center transform hover:-translate-y-1.5 duration-300">
                    {category.icon && <category.icon className="h-10 w-10 md:h-12 md:w-12 text-primary mb-3 group-hover:scale-110 transition-transform" />}
                    <h3 className="text-sm md:text-base font-semibold group-hover:text-primary transition-colors line-clamp-2">{category.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-20 bg-secondary/30">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 font-headline">What Our Community Says</h2>
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"> 
  {[ 
    { name: "Priya Sharma", course: "IIT-JEE Crash Course", imageHint: "indian student female happy", text: "The IIT-JEE course was intense but so well-structured! The mock tests were a game-changer. EdTechCart made finding it easy." }, 
    { name: "Rohan Mehta", course: "Business Analytics Pro", imageHint: "indian student male professional", text: "Upgraded my analytics skills significantly. The seller provided excellent support through the platform. User-friendly!" }, 
    { name: "Aisha Khan", course: "Advanced Python Programming", imageHint: "indian student female coder", text: "Loved the Python course! The content was up-to-date, and I could learn at my own pace. Highly recommend this marketplace." } 
  ].map((testimonial, i) => ( 
    <Card key={i} className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card flex flex-col"> 
      <CardContent className="p-6 text-center flex flex-col flex-grow items-center"> 
      <Image src={`https://placehold.co/100x100.png`} alt={testimonial.name} width={100} height={100} className="rounded-full mx-auto mb-5 border-4 border-primary/50 p-1 object-cover" data-ai-hint={testimonial.imageHint}/> 
      <div className="flex mb-3"> 
        {[...Array(5)].map((_, idx) => <Star key={idx} className="h-5 w-5 text-yellow-400" fill="currentColor"/>)} 
      </div> 
      <blockquote className="text-muted-foreground italic mb-4 text-sm leading-relaxed flex-grow">"{testimonial.text}"</blockquote> 
      <p className="font-semibold mt-auto text-foreground">{testimonial.name}</p> 
      <p className="text-xs text-primary">{testimonial.course}</p> 
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

