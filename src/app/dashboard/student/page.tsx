
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { placeholderCourses, recentlyViewedCourses, placeholderCertificates, placeholderOrders } from "@/lib/placeholder-data";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { BookOpen, CheckCircle, ShoppingCart, RefreshCw, ArrowRight, LayoutGrid, FileCheck2, Heart, Settings, PlayCircle, Info } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { APP_NAME } from "@/lib/constants";

export default function StudentDashboardPage() {
  const enrolledCourses = placeholderCourses.filter(c => c.id.includes('course1') || c.id.includes('course3') || c.id.includes('course5') && c.approvalStatus === 'approved').slice(0, 3).map(course => ({
    ...course,
    progress: Math.floor(Math.random() * 100), // mock progress
  }));
  const completedCertificatesCount = placeholderCertificates.length; 
  const ordersCount = placeholderOrders.filter(o => o.userId === 'user1').length; 
  const wishlistCount = placeholderCourses.filter(c => c.id.includes('course2') || c.id.includes('course4')).length; 


  const overviewCards = [
    { title: "Purchased Courses", value: enrolledCourses.length.toString(), icon: BookOpen, href: "/dashboard/student/courses", description: "Access your purchased courses." },
    { title: "Completed Certificates", value: completedCertificatesCount.toString(), icon: FileCheck2, href: "/dashboard/student/certificates", description: "Showcase your achievements." },
    { title: "Order History", value: ordersCount.toString(), icon: ShoppingCart, href: "/dashboard/student/orders", description: "Review your purchases." },
    { title: "My Wishlist", value: wishlistCount.toString(), icon: Heart, href: "/dashboard/student/wishlist", description: "Courses you're interested in." },
  ];


  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline">Welcome to Your Learning Hub!</h1>
      <p className="text-muted-foreground">Here's a quick overview of your learning activities and progress.</p>

      <Alert variant="info" className="bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300">
        <Info className="h-5 w-5 !text-blue-600 dark:!text-blue-400" />
        <AlertTitle className="font-semibold">How to Access Your Courses</AlertTitle>
        <AlertDescription className="text-sm text-blue-600 dark:text-blue-400">
          After purchasing a course on {APP_NAME}, the course seller is responsible for providing you with access instructions.
          This usually includes links to their learning platform, access keys, or enrollment details sent to your registered email.
          Please check your email (including spam/junk folders) for communications from the seller or {APP_NAME} on their behalf.
        </AlertDescription>
      </Alert>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewCards.map(card => (
            <Card key={card.title} className="shadow-md hover:shadow-lg transition-shadow border-l-4 border-primary">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-base font-semibold">{card.title}</CardTitle>
                    <card.icon className="h-6 w-6 text-primary" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold mb-1">{card.value}</div>
                    <p className="text-xs text-muted-foreground mb-3 h-8">{card.description}</p> 
                    <Button variant="outline" size="sm" asChild className="w-full hover:bg-primary/10 hover:text-primary">
                        <Link href={card.href}>View {card.title.split(' ')[0]} <ArrowRight className="ml-1 h-3 w-3"/></Link>
                    </Button>
                </CardContent>
            </Card>
        ))}
      </div>

      <section>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold font-headline">My Purchased Courses</h2>
            <Button variant="link" size="sm" asChild className="text-primary hover:text-primary/80">
                <Link href="/dashboard/student/courses">View All Purchased Courses <ArrowRight className="ml-1 h-4 w-4"/></Link>
            </Button>
        </div>
        {enrolledCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map(course => (
                <Card key={course.id} className="shadow-sm hover:shadow-lg transition-shadow border flex flex-col">
                <CardHeader className="p-0">
                    <Image src={course.imageUrl} alt={course.title} width={400} height={225} className="rounded-t-lg object-cover w-full aspect-video" data-ai-hint={`${course.category} online student learning`}/>
                </CardHeader>
                <CardContent className="p-4 flex flex-col flex-grow">
                    <h3 className="font-semibold text-lg line-clamp-2 mb-1">{course.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2">By {course.providerInfo?.name || course.instructor}</p>
                    <div className="mt-auto">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                            <span>Progress (Example)</span>
                            <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2 mb-3" />
                        <Button className="w-full" size="sm" asChild>
                        <Link href={`/courses/${course.id}`}><PlayCircle className="mr-2 h-4 w-4"/>View Course Details</Link>
                        </Button>
                    </div>
                </CardContent>
                </Card>
            ))}
            </div>
        ): (
             <Card className="text-center py-10 border-2 border-dashed rounded-lg">
                <CardContent className="flex flex-col items-center">
                    <Image src="https://placehold.co/300x200.png" alt="No courses purchased" width={300} height={200} className="mb-4 rounded-md" data-ai-hint="empty bookshelf books education"/>
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <CardTitle className="text-xl mb-2">No Purchased Courses Yet</CardTitle>
                    <CardDescription className="mb-4">Start your learning journey by exploring our courses.</CardDescription>
                    <Button variant="default" asChild>
                        <Link href="/courses">Explore Courses</Link>
                    </Button>
                </CardContent>
            </Card>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 font-headline">Recently Viewed Courses</h2>
        {recentlyViewedCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentlyViewedCourses.map(course => (
                <Card key={course.id} className="shadow-sm hover:shadow-md transition-shadow border">
                <CardHeader className="p-0">
                    <Image src={course.imageUrl} alt={course.title} width={300} height={168} className="rounded-t-md object-cover w-full aspect-video" data-ai-hint={`${course.category} course interest`}/>
                </CardHeader>
                <CardContent className="p-3">
                    <h3 className="font-medium text-sm line-clamp-2 mb-1">{course.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{course.category}</p>
                    <Button variant="outline" size="xs" className="w-full" asChild>
                        <Link href={`/courses/${course.id}`}>View Course</Link>
                    </Button>
                </CardContent>
                </Card>
            ))}
            </div>
        ) : (
            <Card className="text-center py-10 border-2 border-dashed rounded-lg">
                 <CardContent className="flex flex-col items-center">
                    <RefreshCw className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <CardTitle className="text-xl mb-2">No Recently Viewed Courses</CardTitle>
                    <CardDescription>Start browsing our extensive catalog!</CardDescription>
                     <Image src="https://placehold.co/300x180.png" alt="Illustration of empty browsing history" width={300} height={180} className="mt-4 rounded-md" data-ai-hint="empty state browsing history explore"/>
                </CardContent>
            </Card>
        )}
      </section>
    </div>
  );
}
