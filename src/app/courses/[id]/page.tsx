
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StarRating } from '@/components/ui/StarRating';
import { getCourseById, getReviewsByCourseId, placeholderCourses, placeholderReviews } from '@/lib/placeholder-data';
import type { Course, Review, Module as CurriculumModule, Lesson } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, BarChart2, Users, Award, Download, Tv, FileText, HelpCircle, CheckCircle, ShoppingCart, Heart, PlayCircle, ShieldCheck, Star } from 'lucide-react';
import Link from 'next/link';
import { CourseCard } from '@/components/CourseCard';
import { Badge } from '@/components/ui/badge';

interface CourseDetailPageProps {
  params: { id: string };
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-start gap-4 p-4">
        <Avatar>
          <AvatarImage src={review.userAvatar} alt={review.userName} data-ai-hint="student avatar review" />
          <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-base font-semibold">{review.userName}</CardTitle>
          <StarRating rating={review.rating} size={14} />
          <p className="text-xs text-muted-foreground mt-1">{new Date(review.createdAt).toLocaleDateString()}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-foreground">{review.comment}</p>
        <div className="mt-2 text-xs text-muted-foreground">
          Helpful: {review.helpfulVotes} | Unhelpful: {review.unhelpfulVotes}
        </div>
      </CardContent>
    </Card>
  );
}

function CurriculumItem({ item }: { item: Lesson }) {
  let IconComponent = FileText;
  if (item.type === 'video') IconComponent = PlayCircle;
  else if (item.type === 'pdf') IconComponent = Download;
  // Add more icons for quiz, assignment etc.

  return (
    <div className="flex justify-between items-center py-3 px-1">
      <div className="flex items-center gap-3">
        <IconComponent className="h-5 w-5 text-primary" />
        <span className="text-sm">{item.title}</span>
        {item.isFreePreview && <Badge variant="outline" className="text-xs border-primary text-primary">Preview</Badge>}
      </div>
      {item.duration && <span className="text-sm text-muted-foreground">{item.duration}</span>}
    </div>
  );
}


export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  const course = getCourseById(params.id);
  const reviews = getReviewsByCourseId(params.id);
  const relatedCourses = placeholderCourses.filter(c => c.category === course?.category && c.id !== course?.id).slice(0,3);


  if (!course) {
    return (
      <>
        <Header />
        <main className="container py-8 text-center">
          <h1 className="text-2xl font-bold">Course not found</h1>
          <Link href="/courses" className="text-primary hover:underline mt-4 inline-block">
            Back to courses
          </Link>
        </main>
        <Footer />
      </>
    );
  }
  
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Courses', href: '/courses' },
    { label: course.category, href: `/courses?category=${course.category.toLowerCase().replace(/\s+/g, '-')}` },
    { label: course.title },
  ];
  
  const imageHint = course.category.toLowerCase().split(' ').slice(0,2).join(' ') || "education content";

  // Placeholder FAQs
  const faqs = [
    { q: "Is this course suitable for beginners?", a: "Yes, this course starts from the fundamentals and is designed to be accessible for beginners." },
    { q: "Are there any prerequisites?", a: course.level === "Beginner" ? "No prior knowledge is required." : "Basic understanding of [relevant topic] is recommended." },
    { q: "Is there a certificate upon completion?", a: course.certificateAvailable ? "Yes, a certificate of completion is provided." : "No, this course does not offer a certificate at this time." },
    { q: "How long do I have access to the course?", a: "You get lifetime access to all course materials once enrolled." }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 bg-slate-50 dark:bg-slate-900">
        {/* Course Hero Section */}
        <section className="bg-primary/90 text-primary-foreground py-12 md:py-16">
            <div className="container grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2 space-y-4">
                    <Breadcrumbs items={breadcrumbItems.slice(0, -1)} className="mb-2 [&_a]:text-primary-foreground/80 [&_a:hover]:text-primary-foreground [&_span]:text-primary-foreground/80 [&_svg]:text-primary-foreground/80"/>
                    <h1 className="text-3xl md:text-4xl font-bold font-headline">{course.title}</h1>
                    <p className="text-lg text-primary-foreground/90">{course.shortDescription || "An engaging online learning experience."}</p>
                    <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                           <StarRating rating={course.rating} size={18} /> <span className="ml-1">({course.reviewsCount} ratings)</span>
                        </div>
                        <span>{course.studentsEnrolled?.toLocaleString()} students</span>
                    </div>
                    <p className="text-sm">Sold by <span className="font-semibold">{course.providerInfo?.name || course.instructor}</span></p>
                    {course.providerInfo?.verified && (
                        <div className="flex items-center gap-1 text-sm bg-green-500/20 text-green-100 px-2 py-1 rounded-md w-fit">
                            <ShieldCheck className="h-4 w-4"/> Verified Seller
                        </div>
                    )}
                    <p className="text-xs">Last updated: {new Date(course.lastUpdated || Date.now()).toLocaleDateString()}</p>
                </div>
                {/* Floating Card for Price & Actions - Desktop Only for this layout part */}
                <div className="hidden md:block md:col-span-1 row-start-1 md:row-start-auto">
                     <Card className="shadow-xl sticky top-24">
                        <CardHeader className="p-0">
                            <Image src={course.imageUrl} alt={course.title} width={600} height={338} className="rounded-t-lg object-cover w-full aspect-video" data-ai-hint={`${imageHint} course cover`} />
                        </CardHeader>
                        <CardContent className="p-4 space-y-3">
                            <div className="text-3xl font-bold">${course.price.toFixed(2)}
                                {course.originalPrice && <span className="ml-2 text-lg text-muted-foreground line-through">${course.originalPrice.toFixed(2)}</span>}
                            </div>
                            <Button size="lg" className="w-full">
                                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                            </Button>
                            <Button variant="outline" size="lg" className="w-full">
                                <Heart className="mr-2 h-5 w-5" /> Add to Wishlist
                            </Button>
                            <p className="text-xs text-center text-muted-foreground">30-Day Money-Back Guarantee</p>
                        </CardContent>
                        <CardContent className="p-4 border-t text-sm space-y-1">
                            <h4 className="font-semibold mb-1">This course includes:</h4>
                            {course.highlights?.slice(0,4).map((highlight, i) => (
                                <div key={i} className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500"/>{highlight}</div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>


        <div className="container mt-8 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {course.highlights && course.highlights.length > 0 && (
            <Card className="mb-8 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-headline">What you&apos;ll learn</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-x-6 gap-y-3">
                {course.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <p className="text-sm">{highlight}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            )}

            <Tabs defaultValue="curriculum" className="w-full">
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 mb-6">
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="instructor">Seller</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>

              <TabsContent value="curriculum">
                <Card className="shadow-sm">
                  <CardHeader className="flex flex-row justify-between items-center">
                    <CardTitle className="text-2xl font-headline">Course Content</CardTitle>
                    <span className="text-sm text-muted-foreground">
                        {course.curriculum?.length} modules &bull; {course.curriculum?.reduce((acc, mod) => acc + mod.lessons.length, 0)} lessons &bull; {course.duration} total
                    </span>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="multiple" defaultValue={course.curriculum?.[0]?.id ? [course.curriculum[0].id] : []} className="w-full">
                      {course.curriculum?.sort((a,b) => a.order - b.order).map((module, index) => (
                        <AccordionItem value={module.id} key={module.id}>
                          <AccordionTrigger className="hover:no-underline bg-slate-100 dark:bg-slate-800 px-4 rounded-md text-base">
                            <div className="flex justify-between w-full items-center">
                                <span>Module {index + 1}: {module.title}</span>
                                <span className="text-xs text-muted-foreground font-normal">{module.lessons.length} lessons</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pt-2 px-2">
                            {module.lessons.sort((a,b) => a.order - b.order).map(lesson => (
                              <CurriculumItem key={lesson.id} item={lesson} />
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="description">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl font-headline">Course Description</CardTitle>
                  </CardHeader>
                  <CardContent className="prose dark:prose-invert max-w-none">
                    <p>{course.description}</p>
                    {/* Additional description sections could go here */}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="instructor">
                 <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl font-headline">About the Seller</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col md:flex-row items-start gap-6">
                        <Avatar className="h-24 w-24 md:h-32 md:w-32">
                            <AvatarImage src={course.providerInfo?.logoUrl || 'https://placehold.co/150x150.png'} alt={course.providerInfo?.name || course.instructor} data-ai-hint="seller logo instructor"/>
                            <AvatarFallback>{(course.providerInfo?.name || course.instructor).charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="text-xl font-semibold">{course.providerInfo?.name || course.instructor}</h3>
                            <p className="text-sm text-primary">{course.providerInfo?.verified ? 'Verified Seller' : 'Seller'}</p>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {course.providerInfo?.description || `Experienced professional in ${course.category}. Passionate about sharing knowledge and helping students succeed.`}
                            </p>
                            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm">
                                <div className="flex items-center gap-1"><Star className="h-4 w-4 text-yellow-400" /> {course.rating} Seller Rating</div>
                                <div className="flex items-center gap-1"><Award className="h-4 w-4 text-primary" /> {course.reviewsCount} Reviews</div>
                                <div className="flex items-center gap-1"><Users className="h-4 w-4 text-primary" /> {course.studentsEnrolled?.toLocaleString()} Students on platform</div>
                                <div className="flex items-center gap-1"><Tv className="h-4 w-4 text-primary" /> {placeholderCourses.filter(c => c.sellerId === course.sellerId).length} Courses</div>
                            </div>
                             {/* <Button variant="outline" size="sm" className="mt-4">View Seller Store</Button> */}
                        </div>
                    </CardContent>
                 </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl font-headline">Student Reviews</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <StarRating rating={course.rating} size={24} />
                      <span className="text-2xl font-bold">{course.rating.toFixed(1)}</span>
                      <span className="text-muted-foreground">({course.reviewsCount} ratings)</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {reviews.length > 0 ? (
                      reviews.slice(0, 5).map(review => <ReviewCard key={review.id} review={review} />)
                    ) : (
                      <p>No reviews yet for this course.</p>
                    )}
                    {reviews.length > 5 && <Button variant="outline" className="w-full mt-4">Show all reviews</Button>}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="faq">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl font-headline flex items-center"><HelpCircle className="mr-2 h-6 w-6 text-primary"/>Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {faqs.length > 0 ? (
                      <Accordion type="multiple" className="w-full">
                        {faqs.map((faq, index) => (
                          <AccordionItem value={`faq-${index}`} key={index}>
                            <AccordionTrigger className="text-base text-left hover:no-underline">{faq.q}</AccordionTrigger>
                            <AccordionContent className="text-sm">{faq.a}</AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    ) : (
                      <p>No FAQs available for this course yet.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            {relatedCourses.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-6 font-headline">Related Courses</h2>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {relatedCourses.map((relCourse) => (
                  <CourseCard key={relCourse.id} course={relCourse} />
                ))}
              </div>
            </section>
            )}

          </div>

          <div className="lg:col-span-1 md:hidden"> 
             <Card className="shadow-xl sticky top-24">
                <CardHeader className="p-0 md:hidden">
                     <Image src={course.imageUrl} alt={course.title} width={600} height={338} className="rounded-t-lg object-cover w-full aspect-video" data-ai-hint={`${imageHint} course mobile`} />
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                    <div className="text-3xl font-bold">${course.price.toFixed(2)}
                        {course.originalPrice && <span className="ml-2 text-lg text-muted-foreground line-through">${course.originalPrice.toFixed(2)}</span>}
                    </div>
                    <Button size="lg" className="w-full">
                        <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                    </Button>
                    <Button variant="outline" size="lg" className="w-full">
                        <Heart className="mr-2 h-5 w-5" /> Add to Wishlist
                    </Button>
                     <p className="text-xs text-center text-muted-foreground">30-Day Money-Back Guarantee</p>
                </CardContent>
                 <CardContent className="p-4 border-t text-sm space-y-1">
                    <h4 className="font-semibold mb-1">This course includes:</h4>
                    {course.highlights?.slice(0,4).map((highlight, i) => (
                        <div key={i} className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500"/>{highlight}</div>
                    ))}
                </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
