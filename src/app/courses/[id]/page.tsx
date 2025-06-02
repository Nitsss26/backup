
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
import { Clock, BarChart2, Users, Award, Download, Tv, FileText, HelpCircle, CheckCircle, ShoppingCart, Heart, PlayCircle, ShieldCheck, Star, CalendarCheck, Video, BookCopy, RadioTower, Briefcase, FileSignature, Gift } from 'lucide-react';
import Link from 'next/link';
import { CourseCard } from '@/components/CourseCard';
import { Badge } from '@/components/ui/badge';

interface CourseDetailPageProps {
  params: { id: string };
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <Card className="mb-4 border shadow-sm bg-background">
      <CardHeader className="flex flex-row items-start gap-4 p-4">
        <Avatar className="h-11 w-11 border">
          <AvatarImage src={review.userAvatar} alt={review.userName} data-ai-hint="student avatar review profile course detail"/>
          <AvatarFallback>{review.userName.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-base font-semibold text-foreground">{review.userName}</CardTitle>
          <StarRating rating={review.rating} size={16} />
          <p className="text-xs text-muted-foreground mt-1">{new Date(review.createdAt).toLocaleDateString()}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-foreground leading-relaxed">{review.comment}</p>
        <div className="mt-3 text-xs text-muted-foreground">
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
  else if (item.type === 'quiz') IconComponent = HelpCircle;
  else if (item.type === 'assignment') IconComponent = FileSignature;


  return (
    <div className="flex justify-between items-center py-3.5 px-2 border-b last:border-b-0 hover:bg-muted/30 rounded-sm transition-colors">
      <div className="flex items-center gap-3">
        <IconComponent className="h-5 w-5 text-primary shrink-0" />
        <span className="text-sm font-medium text-foreground">{item.title}</span>
        {item.isFreePreview && <Badge variant="outline" className="text-xs border-primary text-primary ml-2">Preview</Badge>}
      </div>
      {item.duration && <span className="text-sm text-muted-foreground">{item.duration}</span>}
    </div>
  );
}


export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  const course = getCourseById(params.id);
  const reviews = course ? getReviewsByCourseId(params.id) : [];
  const relatedCourses = placeholderCourses.filter(c => c.category === course?.category && c.id !== course?.id && c.approvalStatus === 'approved').slice(0,3);


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
  
  const imageHint = course.category.toLowerCase().split(' ').slice(0,2).join(' ') || "education learning content";

  const faqs = [
    { q: "Is this course suitable for beginners?", a: `Yes, this course is designed for ${course.level} level learners and starts from the fundamentals.` },
    { q: `Are there any prerequisites for "${course.title}"?`, a: course.level === "Beginner" ? "No prior knowledge is required. Just bring your curiosity and enthusiasm!" : "A basic understanding of related introductory topics is recommended to get the most out of this course. Check the course description for specifics." },
    { q: "Is a certificate provided upon completion?", a: course.certificateAvailable ? `Yes, upon successful completion of all modules and assignments, you will receive a shareable certificate for "${course.title}".` : "Currently, this course does not offer a certificate. However, the skills and knowledge gained are highly valuable." },
    { q: "How long will I have access to the course materials?", a: "Access to course materials (videos, PDFs, etc.) is determined by the seller. Typically, sellers grant lifetime access, but please check the specific seller's terms or contact them. EdTechCart is a marketplace and does not host the course content directly." },
    { q: "How do I access the course after purchase?", a: `After you purchase the course on ${APP_NAME}, the seller will provide you with access instructions. This is usually via email and may include links to their learning platform, access codes, or other methods. Please check your email (including spam/junk folders) from the seller.` },
    { q: "What if I'm not satisfied with the course?", a: course.moneyBackGuaranteeDays ? `This course offers a ${course.moneyBackGuaranteeDays}-day money-back guarantee from the seller. If you're not satisfied, you can request a refund within ${course.moneyBackGuaranteeDays} days of purchase by contacting the seller or through our platform support, subject to our <a href="/terms#refunds" class="text-primary hover:underline">Refund Policy</a>.` : "Refund policies may vary by seller. Please check the seller's specific terms or contact them for details. We encourage sellers to offer fair refund options."}
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 bg-slate-50 dark:bg-slate-900">
        <section className="bg-gradient-to-r from-primary/80 via-blue-600 to-blue-700 text-primary-foreground py-12 md:py-16">
            <div className="container grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2 space-y-4">
                    <Breadcrumbs items={breadcrumbItems.slice(0, -1)} className="mb-2 [&_a]:text-blue-100 [&_a:hover]:text-white [&_span]:text-blue-100 [&_svg]:text-blue-100"/>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline text-white">{course.title}</h1>
                    <p className="text-lg text-blue-100/90">{course.shortDescription || "An engaging online learning experience designed to elevate your skills."}</p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-blue-50">
                        <div className="flex items-center gap-1">
                           <StarRating rating={course.rating} size={18} /> <span className="ml-1">({course.reviewsCount} ratings)</span>
                        </div>
                        <span>{course.studentsEnrolled?.toLocaleString()} students</span>
                        <Badge variant="secondary" className="bg-yellow-400 text-slate-900 font-medium">{course.level}</Badge>
                    </div>
                    <p className="text-sm text-blue-100">Sold by <Link href="#seller-section" className="font-semibold hover:underline text-white">{course.providerInfo?.name || course.instructor}</Link></p>
                    {course.providerInfo?.verified && (
                        <Badge variant="success" className="text-xs px-2 py-1 border-none">
                            <ShieldCheck className="h-4 w-4 mr-1.5" /> Verified Seller
                        </Badge>
                    )}
                    <p className="text-xs text-blue-200">Last updated: {new Date(course.lastUpdated || Date.now()).toLocaleDateString()}</p>
                </div>
                <div className="hidden md:block md:col-span-1 row-start-1 md:row-start-auto">
                     <Card className="shadow-xl sticky top-24 border-2 border-primary/30 bg-card">
                        <CardHeader className="p-0">
                            <Image src={course.imageUrl} alt={course.title} width={600} height={338} className="rounded-t-lg object-cover w-full aspect-video" data-ai-hint={`${imageHint} course promotional cover art detail page`}/>
                        </CardHeader>
                        <CardContent className="p-5 space-y-3">
                            <div className="text-3xl font-bold text-primary">₹{course.price.toLocaleString('en-IN')}
                                {course.originalPrice && <span className="ml-2 text-lg text-muted-foreground line-through">₹{course.originalPrice.toLocaleString('en-IN')}</span>}
                            </div>
                            <Button size="lg" className="w-full text-base py-3">
                                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                            </Button>
                            <Button variant="outline" size="lg" className="w-full text-base py-3">
                                <Heart className="mr-2 h-5 w-5" /> Add to Wishlist
                            </Button>
                            {course.moneyBackGuaranteeDays && course.moneyBackGuaranteeDays > 0 && (
                                <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1 pt-1">
                                    <CalendarCheck className="h-3.5 w-3.5 text-success"/> {course.moneyBackGuaranteeDays}-Day Money-Back Guarantee
                                </p>
                            )}
                            {course.freeTrialAvailable && (
                                <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1 pt-1">
                                    <Gift className="h-3.5 w-3.5 text-primary"/> Free Trial Available
                                </p>
                            )}
                        </CardContent>
                        <CardContent className="p-5 border-t text-sm space-y-1.5">
                            <h4 className="font-semibold mb-1.5 text-base text-foreground">This course includes:</h4>
                            {course.highlights?.slice(0,3).map((highlight, i) => (
                                <div key={i} className="flex items-center gap-2 text-muted-foreground"><CheckCircle className="h-4 w-4 text-primary"/>{highlight}</div>
                            ))}
                            {course.demoVideoUrl && <div className="flex items-center gap-2 text-muted-foreground"><Video className="h-4 w-4 text-primary"/>Demo Video Available</div>}
                            {course.downloadableMaterialsDescription && <div className="flex items-center gap-2 text-muted-foreground"><BookCopy className="h-4 w-4 text-primary"/>Downloadable Materials</div>}
                             {course.certificateAvailable && <div className="flex items-center gap-2 text-muted-foreground"><Award className="h-4 w-4 text-primary"/>Certificate of Completion</div>}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

        <div className="container mt-8 md:mt-12 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {course.highlights && course.highlights.length > 0 && (
            <Card className="mb-8 shadow-md border bg-card">
              <CardHeader>
                <CardTitle className="text-2xl font-headline text-foreground">What you&apos;ll learn</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-x-6 gap-y-3">
                {course.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-2.5">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <p className="text-sm leading-relaxed text-foreground">{highlight}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            )}
            
            {course.demoVideoUrl && (
                <Card className="mb-8 shadow-md border bg-card">
                    <CardHeader>
                        <CardTitle className="text-2xl font-headline flex items-center text-foreground"><PlayCircle className="mr-2 h-6 w-6 text-primary"/>Course Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="aspect-video bg-muted rounded-lg overflow-hidden border">
                             <Image src={`https://placehold.co/800x450/EBF4FF/3B82F6?text=Demo+Video+Player+Mockup`} alt="Course Demo Video" width={800} height={450} className="w-full h-full object-cover" data-ai-hint="course demo video player online tutorial"/>
                        </div>
                    </CardContent>
                </Card>
            )}


            <Tabs defaultValue="curriculum" className="w-full mb-8">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mb-6 mx-auto max-w-3xl sticky top-16 bg-card/80 backdrop-blur-sm z-30 py-2 rounded-md shadow-sm border">
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="seller" id="seller-section">Seller</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>

              <TabsContent value="curriculum">
                <Card className="shadow-md border bg-card">
                  <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    <div>
                        <CardTitle className="text-2xl font-headline text-foreground">Course Content</CardTitle>
                        <CardDescription className="mt-1">Explore the modules and lessons in this course.</CardDescription>
                    </div>
                    <span className="text-sm text-muted-foreground whitespace-nowrap mt-2 md:mt-0">
                        {course.curriculum?.length || 0} modules &bull; {course.curriculum?.reduce((acc, mod) => acc + mod.lessons.length, 0) || 0} lessons &bull; {course.duration} total
                    </span>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="multiple" defaultValue={course.curriculum?.[0]?.id ? [course.curriculum[0].id] : []} className="w-full">
                      {course.curriculum?.sort((a,b) => a.order - b.order).map((module, index) => (
                        <AccordionItem value={module.id} key={module.id} className="border-b last:border-b-0">
                          <AccordionTrigger className="hover:no-underline bg-muted/50 dark:bg-muted/20 px-4 py-3.5 rounded-md text-base my-1.5 transition-colors hover:bg-primary/10 text-foreground">
                            <div className="flex justify-between w-full items-center">
                                <span className="text-left font-semibold">Module {index + 1}: {module.title}</span>
                                <span className="text-xs text-muted-foreground font-normal ml-2 shrink-0">{module.lessons.length} lessons</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pt-1 pb-1 px-2">
                            {module.lessons.sort((a,b) => a.order - b.order).map(lesson => (
                              <CurriculumItem key={lesson.id} item={lesson} />
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                     {(!course.curriculum || course.curriculum.length === 0) && <p className="text-muted-foreground text-center py-6">Curriculum details are not yet available for this course.</p>}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="description">
                <Card className="shadow-md border bg-card">
                  <CardHeader>
                    <CardTitle className="text-2xl font-headline text-foreground">Course Description</CardTitle>
                  </CardHeader>
                  <CardContent className="prose dark:prose-invert max-w-none text-base leading-relaxed text-foreground">
                    <p>{course.description}</p>
                    {course.downloadableMaterialsDescription && (
                        <>
                            <h3 className="font-semibold mt-6 mb-2 text-lg text-foreground">Downloadable Materials</h3>
                            <p>{course.downloadableMaterialsDescription}</p>
                        </>
                    )}
                    {course.detailedScheduleDescription && (
                         <>
                            <h3 className="font-semibold mt-6 mb-2 text-lg text-foreground">Course Schedule/Timeline</h3>
                            <p className="whitespace-pre-line">{course.detailedScheduleDescription}</p>
                        </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="seller">
                 <Card className="shadow-md border bg-card">
                    <CardHeader>
                        <CardTitle className="text-2xl font-headline text-foreground">About the Seller</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col md:flex-row items-start gap-6">
                        <Avatar className="h-28 w-28 md:h-36 md:w-36 border-2 border-primary p-1">
                            <AvatarImage src={course.providerInfo?.logoUrl || `https://placehold.co/150x150/EBF4FF/3B82F6?text=${(course.providerInfo?.name || course.instructor).split(' ').map(n=>n[0]).join('')}`} alt={course.providerInfo?.name || course.instructor} data-ai-hint="seller logo instructor profile picture school university"/>
                            <AvatarFallback>{(course.providerInfo?.name || course.instructor).split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-primary">{course.providerInfo?.name || course.instructor}</h3>
                            {course.providerInfo?.verified && (
                                <Badge variant="success" className="mt-1 mb-2 text-xs px-2 py-0.5 border-none">
                                    <ShieldCheck className="h-3.5 w-3.5 mr-1" /> Verified Seller
                                </Badge>
                            )}
                            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                                {course.providerInfo?.description || `Experienced professional in ${course.category}. Passionate about sharing knowledge and helping students succeed.`}
                            </p>
                            <div className="flex flex-wrap gap-x-6 gap-y-3 mt-4 text-sm border-t pt-4">
                                <div className="flex items-center gap-1.5 text-muted-foreground"><Star className="h-4 w-4 text-yellow-400 fill-yellow-400" /> {course.rating} Seller Rating</div>
                                <div className="flex items-center gap-1.5 text-muted-foreground"><Award className="h-4 w-4 text-primary" /> {course.reviewsCount} Course Reviews on Platform</div>
                                <div className="flex items-center gap-1.5 text-muted-foreground"><Users className="h-4 w-4 text-primary" /> {course.studentsEnrolled?.toLocaleString()} Students on Platform</div>
                                <div className="flex items-center gap-1.5 text-muted-foreground"><Briefcase className="h-4 w-4 text-primary" /> {placeholderCourses.filter(c => c.sellerId === course.sellerId).length} Courses Listed</div>
                            </div>
                             <Button variant="outline" size="sm" className="mt-6" disabled>View Seller Store (Coming Soon)</Button>
                        </div>
                    </CardContent>
                 </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card className="shadow-md border bg-card">
                  <CardHeader>
                    <CardTitle className="text-2xl font-headline text-foreground">Student Reviews</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <StarRating rating={course.rating} size={24} />
                      <span className="text-2xl font-bold text-foreground">{course.rating.toFixed(1)}</span>
                      <span className="text-muted-foreground">({course.reviewsCount} ratings)</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {reviews.length > 0 ? (
                      reviews.slice(0, 5).map(review => <ReviewCard key={review.id} review={review} />)
                    ) : (
                      <p className="text-muted-foreground py-6 text-center">No reviews yet for this course. Be the first to share your experience!</p>
                    )}
                    {reviews.length > 5 && <Button variant="outline" className="w-full mt-4">Show all {reviews.length} reviews</Button>}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="faq">
                <Card className="shadow-md border bg-card">
                  <CardHeader>
                    <CardTitle className="text-2xl font-headline flex items-center text-foreground"><HelpCircle className="mr-2 h-6 w-6 text-primary"/>Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {faqs.length > 0 ? (
                      <Accordion type="multiple" className="w-full">
                        {faqs.map((faq, index) => (
                          <AccordionItem value={`faq-${index}`} key={index}>
                            <AccordionTrigger className="text-base text-left hover:no-underline py-3.5 font-medium text-foreground">{faq.q}</AccordionTrigger>
                            <AccordionContent className="text-sm pb-3.5 leading-relaxed text-muted-foreground" dangerouslySetInnerHTML={{ __html: faq.a }} />
                          </AccordionItem>
                        ))}
                      </Accordion>
                    ) : (
                      <p className="text-muted-foreground py-6 text-center">No FAQs available for this course yet.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
          </div>

          <div className="lg:col-span-1">
            {/* Sticky Price Card for Desktop - already present if md:block is effective for the main card */}
            {/* This one is specifically for mobile or when the main one isn't sticky */}
            <div className="lg:hidden mt-8 md:mt-0"> 
                 <Card className="shadow-xl sticky top-24 border-2 border-primary/30 bg-card">
                    <CardHeader className="p-0 md:hidden">
                         <Image src={course.imageUrl} alt={course.title} width={600} height={338} className="rounded-t-lg object-cover w-full aspect-video" data-ai-hint={`${imageHint} course mobile cover art detail page`}/>
                    </CardHeader>
                    <CardContent className="p-5 space-y-3">
                        <div className="text-3xl font-bold text-primary">₹{course.price.toLocaleString('en-IN')}
                            {course.originalPrice && <span className="ml-2 text-lg text-muted-foreground line-through">₹{course.originalPrice.toLocaleString('en-IN')}</span>}
                        </div>
                        <Button size="lg" className="w-full text-base py-3">
                            <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                        </Button>
                        <Button variant="outline" size="lg" className="w-full text-base py-3">
                            <Heart className="mr-2 h-5 w-5" /> Add to Wishlist
                        </Button>
                         {course.moneyBackGuaranteeDays && course.moneyBackGuaranteeDays > 0 &&(
                            <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1 pt-1">
                                <CalendarCheck className="h-3.5 w-3.5 text-success"/> {course.moneyBackGuaranteeDays}-Day Money-Back Guarantee
                            </p>
                        )}
                         {course.freeTrialAvailable && (
                                <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1 pt-1">
                                    <Gift className="h-3.5 w-3.5 text-primary"/> Free Trial Available
                                </p>
                            )}
                    </CardContent>
                     <CardContent className="p-5 border-t text-sm space-y-1.5">
                        <h4 className="font-semibold mb-1.5 text-base text-foreground">This course includes:</h4>
                         {course.highlights?.slice(0,3).map((highlight, i) => (
                            <div key={i} className="flex items-center gap-2 text-muted-foreground"><CheckCircle className="h-4 w-4 text-primary"/>{highlight}</div>
                        ))}
                        {course.demoVideoUrl && <div className="flex items-center gap-2 text-muted-foreground"><Video className="h-4 w-4 text-primary"/>Demo Video Available</div>}
                        {course.downloadableMaterialsDescription && <div className="flex items-center gap-2 text-muted-foreground"><BookCopy className="h-4 w-4 text-primary"/>Downloadable Materials</div>}
                        {course.certificateAvailable && <div className="flex items-center gap-2 text-muted-foreground"><Award className="h-4 w-4 text-primary"/>Certificate of Completion</div>}
                    </CardContent>
                </Card>
              </div>
            {relatedCourses.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-6 font-headline text-foreground">Related Courses</h2>
              <div className="grid grid-cols-1 gap-6">
                {relatedCourses.map((relCourse) => (
                  <CourseCard key={relCourse.id} course={relCourse} />
                ))}
              </div>
            </section>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
