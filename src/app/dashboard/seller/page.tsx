import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { placeholderCourses, placeholderReviews } from "@/lib/placeholder-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { DollarSign, Users, BookOpen, MessageSquare, ArrowRight, PlusCircle } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'; // Assuming shadcn chart components

const totalRevenueData = [
  { month: 'Jan', revenue: 1200 }, { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 1500 }, { month: 'Apr', revenue: 2200 },
  { month: 'May', revenue: 2500 }, { month: 'Jun', revenue: 3000 },
];
const chartConfig = {
  revenue: { label: "Revenue", color: "hsl(var(--primary))" },
};

const enrollmentData = [
  { month: 'Jan', enrollments: 50 }, { month: 'Feb', enrollments: 75 },
  { month: 'Mar', enrollments: 60 }, { month: 'Apr', enrollments: 90 },
  { month: 'May', enrollments: 110 }, { month: 'Jun', enrollments: 130 },
];
const enrollmentChartConfig = {
  enrollments: { label: "Enrollments", color: "hsl(var(--accent))" },
};


export default function SellerDashboardPage() {
  // Mock data - replace with actual data fetching
  const totalEarnings = 12345.67;
  const totalStudents = 1234;
  const activeCourses = placeholderCourses.filter(c => c.sellerId === 'user2').length || 5; // Assuming user2 is a provider
  const totalReviews = placeholderReviews.filter(r => placeholderCourses.find(c => c.id === r.courseId && c.sellerId === 'user2')).length || 88;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-headline">Seller Dashboard</h1>
        <Button asChild>
            <Link href="/dashboard/seller/courses/new"><PlusCircle className="mr-2 h-4 w-4"/> Create New Course</Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalEarnings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+15.2% from last month</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+50 new this month</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCourses}</div>
            <p className="text-xs text-muted-foreground">Manage your offerings.</p>
          </CardContent>
        </Card>
         <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <MessageSquare className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReviews}</div>
            <p className="text-xs text-muted-foreground">Avg. Rating: 4.6</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="font-headline">Revenue Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart accessibilityLayer data={totalRevenueData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} tickMargin={10} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="font-headline">Enrollment Trends</CardTitle>
          </CardHeader>
          <CardContent>
             <ChartContainer config={enrollmentChartConfig} className="h-[300px] w-full">
              <LineChart accessibilityLayer data={enrollmentData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} tickMargin={10} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="enrollments" stroke="var(--color-enrollments)" strokeWidth={2} dot={true} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <section>
         <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold font-headline">Recent Activity</h2>
            {/* <Button variant="outline" size="sm">View All Activity</Button> */}
        </div>
        <Card className="shadow-sm">
            <CardContent className="p-0">
                 {/* Placeholder for recent activity list */}
                 <ul className="divide-y">
                    <li className="p-4 flex justify-between items-center text-sm"><span>New enrollment in "Advanced React"</span><span className="text-muted-foreground">2 min ago</span></li>
                    <li className="p-4 flex justify-between items-center text-sm"><span>5-star review on "Python for Beginners"</span><span className="text-muted-foreground">1 hour ago</span></li>
                    <li className="p-4 flex justify-between items-center text-sm"><span>"Data Science Bootcamp" published</span><span className="text-muted-foreground">Yesterday</span></li>
                 </ul>
            </CardContent>
        </Card>
      </section>

    </div>
  );
}
