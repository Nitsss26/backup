
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { placeholderCourses, recentlyViewedCourses, placeholderCertificates, placeholderOrders } from "@/lib/placeholder-data";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { BookOpen, CheckCircle, ShoppingCart, RefreshCw, ArrowRight, LayoutGrid, FileCheck2, Heart, Settings } from "lucide-react";

export default function StudentDashboardPage() {
  const enrolledCourses = placeholderCourses.slice(0, 3).map(course => ({
    ...course,
    progress: Math.floor(Math.random() * 100), // mock progress
  }));
  const completedCertificatesCount = placeholderCertificates.slice(0,2).length;
  const ordersCount = placeholderOrders.length;
  const wishlistCount = placeholderCourses.slice(5,8).length; // from wishlist page mock data


  const overviewCards = [
    { title: "Enrolled Courses", value: enrolledCourses.length.toString(), icon: BookOpen, href: "/dashboard/student/courses", description: "Continue your learning journey." },
    { title: "Completed Certificates", value: completedCertificatesCount.toString(), icon: FileCheck2, href: "/dashboard/student/certificates", description: "Showcase your achievements." },
    { title: "Order History", value: ordersCount.toString(), icon: ShoppingCart, href: "/dashboard/student/orders", description: "Review your purchases." },
    { title: "My Wishlist", value: wishlistCount.toString(), icon: Heart, href: "/dashboard/student/wishlist", description: "Courses you're interested in." },
  ];


  return (
    <div className="space-y-8">
      {/* Header Nav is now part of layout for student */}
      <h1 className="text-3xl font-bold font-headline">Dashboard Overview</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewCards.map(card => (
            <Card key={card.title} className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                    <card.icon className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{card.value}</div>
                    <p className="text-xs text-muted-foreground mb-3">{card.description}</p>
                    <Button variant="outline" size="xs" asChild className="w-full">
                        <Link href={card.href}>View {card.title.split(' ')[0]} <ArrowRight className="ml-1 h-3 w-3"/></Link>
                    </Button>
                </CardContent>
            </Card>
        ))}
      </div>

      <section>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold font-headline">My Active Courses</h2>
            <Button variant="link" size="sm" asChild className="text-primary hover:text-primary/80">
                <Link href="/dashboard/student/courses">View All Active Courses <ArrowRight className="ml-1 h-4 w-4"/></Link>
            </Button>
        </div>
        {enrolledCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map(course => (
                <Card key={course.id} className="shadow-sm hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                    <Image src={course.imageUrl} alt={course.title} width={400} height={225} className="rounded-t-lg object-cover w-full aspect-video" data-ai-hint={`${course.category} online study`}/>
                </CardHeader>
                <CardContent className="p-4">
                    <h3 className="font-semibold text-lg line-clamp-2 mb-1">{course.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2">By {course.instructor}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2 mb-3" />
                    <Button className="w-full" size="sm" asChild>
                    <Link href={`/courses/${course.id}/learn`}>Continue Learning</Link>
                    </Button>
                </CardContent>
                </Card>
            ))}
            </div>
        ): (
             <div className="text-center py-10 border-2 border-dashed rounded-lg">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">You have no active courses.</p>
                <Button variant="link" asChild className="mt-2">
                    <Link href="/courses">Explore Courses to Get Started</Link>
                </Button>
            </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 font-headline">Recently Viewed</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentlyViewedCourses.map(course => (
            <Card key={course.id} className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="p-0">
                 <Image src={course.imageUrl} alt={course.title} width={300} height={168} className="rounded-t-md object-cover w-full aspect-video" data-ai-hint={`${course.category} course preview`}/>
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
        {recentlyViewedCourses.length === 0 && (
             <div className="text-center py-10 border-2 border-dashed rounded-lg">
                <RefreshCw className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No recently viewed courses.</p>
            </div>
        )}
      </section>
    </div>
  );
}
