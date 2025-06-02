import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { placeholderCourses, recentlyViewedCourses, placeholderCertificates, placeholderOrders } from "@/lib/placeholder-data";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { BookOpen, CheckCircle, ShoppingCart, RefreshCw, ArrowRight } from "lucide-react";

export default function StudentDashboardPage() {
  const enrolledCourses = placeholderCourses.slice(0, 3).map(course => ({
    ...course,
    progress: Math.floor(Math.random() * 100), // mock progress
  }));
  const completedCertificates = placeholderCertificates.slice(0,2);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline">Student Dashboard</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
            <BookOpen className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enrolledCourses.length}</div>
            <p className="text-xs text-muted-foreground">Keep learning and growing!</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed Certificates</CardTitle>
            <CheckCircle className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCertificates.length}</div>
            <p className="text-xs text-muted-foreground">Showcase your achievements.</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{placeholderOrders.length}</div>
            <p className="text-xs text-muted-foreground">Your learning investments.</p>
          </CardContent>
        </Card>
      </div>

      <section>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold font-headline">My Active Courses</h2>
            <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/student/courses">View All <ArrowRight className="ml-1 h-4 w-4"/></Link>
            </Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map(course => (
            <Card key={course.id} className="shadow-sm hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <Image src={course.imageUrl} alt={course.title} width={400} height={225} className="rounded-t-lg object-cover w-full aspect-video" data-ai-hint={`${course.category} education`}/>
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
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 font-headline">Recently Viewed</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentlyViewedCourses.map(course => (
            <Card key={course.id} className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="p-0">
                 <Image src={course.imageUrl} alt={course.title} width={300} height={168} className="rounded-t-md object-cover w-full aspect-video" data-ai-hint={`${course.category} technology`}/>
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
      </section>
    </div>
  );
}
