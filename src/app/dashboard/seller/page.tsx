"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { placeholderCourses, placeholderReviews } from "@/lib/placeholder-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { DollarSign, Users, BookOpen, MessageSquare, ArrowRight, PlusCircle, ShieldCheck, AlertTriangle } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'; 
import { useAuth } from "@/components/AppProviders";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


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
  const { user } = useAuth();
  // Mock data - replace with actual data fetching
  const totalEarnings = 12345.67;
  const totalStudents = 1234;
  // Filter courses based on the logged-in provider's ID if available
  const activeCourses = user ? placeholderCourses.filter(c => c.sellerId === user.id).length : 5; 
  const totalReviews = user ? placeholderReviews.filter(r => placeholderCourses.find(c => c.id === r.courseId && c.sellerId === user.id)).length : 88;

  const sellerVerificationStatus = user?.verificationStatus || 'unknown';

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-headline">Seller Dashboard</h1>
        <Button asChild>
            <Link href="/dashboard/seller/courses/new"><PlusCircle className="mr-2 h-4 w-4"/> Create New Course</Link>
        </Button>
      </div>

      {sellerVerificationStatus === 'pending' && (
        <Alert variant="default" className="bg-yellow-50 border-yellow-300 text-yellow-700 dark:bg-yellow-900/30 dark:border-yellow-700 dark:text-yellow-300">
          <AlertTriangle className="h-4 w-4 !text-yellow-700 dark:!text-yellow-300" />
          <AlertTitle className="font-semibold">Verification Pending</AlertTitle>
          <AlertDescription>
            Your account is currently under review by our admin team. You can create courses, but they will require approval before publishing.
          </AlertDescription>
        </Alert>
      )}
      {sellerVerificationStatus === 'rejected' && (
         <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Verification Rejected</AlertTitle>
          <AlertDescription>
            There was an issue with your verification. Please check your email or contact support for more information.
          </AlertDescription>
        </Alert>
      )}
       {sellerVerificationStatus === 'verified' && (
        <Alert variant="default" className="bg-green-50 border-green-300 text-green-700 dark:bg-green-900/30 dark:border-green-700 dark:text-green-300">
          <ShieldCheck className="h-4 w-4 !text-green-700 dark:!text-green-300" />
          <AlertTitle className="font-semibold">Account Verified</AlertTitle>
          <AlertDescription>
            Your account is verified. You can publish courses and manage your earnings.
          </AlertDescription>
        </Alert>
      )}


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
