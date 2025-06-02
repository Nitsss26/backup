
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getSellerCourses, getSellerReviews, getSellerTotalRevenue, getSellerTotalStudents, placeholderCourses } from '@/lib/placeholder-data';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { DollarSign, Users, BookOpen, MessageSquare, ArrowRight, PlusCircle, ShieldCheck, AlertTriangle, ShieldQuestion, FileText, TrendingUp, Eye } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'; 
import { useAuth } from "@/components/AppProviders";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect, useState } from "react";
import type { Course, Review } from "@/lib/types";

const chartConfig = {
  revenue: { label: "Revenue (₹)", color: "hsl(var(--primary))" },
};

const enrollmentChartConfig = {
  enrollments: { label: "Enrollments", color: "hsl(var(--accent))" },
};

// Sample data generation for charts - replace with actual data
const generateMonthlyData = (key: 'revenue' | 'enrollments') => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    return months.map(month => ({
        month,
        [key]: Math.floor(Math.random() * (key === 'revenue' ? 50000 : 150)) + (key === 'revenue' ? 10000 : 20)
    }));
};

export default function SellerDashboardPage() {
  const { user } = useAuth();
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [sellerCourses, setSellerCourses] = useState<Course[]>([]);
  const [activeCoursesCount, setActiveCoursesCount] = useState(0);
  const [pendingCoursesCount, setPendingCoursesCount] = useState(0);
  const [sellerReviews, setSellerReviews] = useState<Review[]>([]);
  
  const [revenueData, setRevenueData] = useState(generateMonthlyData('revenue'));
  const [enrollmentData, setEnrollmentData] = useState(generateMonthlyData('enrollments'));


  useEffect(() => {
    if (user) {
      const courses = getSellerCourses(user.id);
      setSellerCourses(courses);
      setActiveCoursesCount(courses.filter(c => c.approvalStatus === 'approved').length);
      setPendingCoursesCount(courses.filter(c => c.approvalStatus === 'pending').length);
      setTotalEarnings(getSellerTotalRevenue(user.id));
      setTotalStudents(getSellerTotalStudents(user.id));
      setSellerReviews(getSellerReviews(user.id));
    }
  }, [user]);

  const sellerVerificationStatus = user?.verificationStatus || 'unverified';

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold font-headline">Seller Dashboard</h1>
        <Button asChild size="lg" className="text-base">
            <Link href="/dashboard/seller/courses/new"><PlusCircle className="mr-2 h-5 w-5"/> Create New Course</Link>
        </Button>
      </div>

      {sellerVerificationStatus === 'pending' && (
        <Alert variant="default" className="bg-blue-50 border-blue-300 text-blue-700 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-400">
          <ShieldQuestion className="h-5 w-5 !text-blue-600 dark:!text-blue-400" />
          <AlertTitle className="font-semibold">Verification Pending</AlertTitle>
          <AlertDescription>
            Your account is currently under review. You can create courses, but they will require approval before publishing. This usually takes 1-2 business days.
          </AlertDescription>
        </Alert>
      )}
      {sellerVerificationStatus === 'rejected' && (
         <Alert variant="destructive" className="bg-red-50 dark:bg-red-900/40 border-red-400 dark:border-red-600 text-red-700 dark:text-red-300">
          <AlertTriangle className="h-5 w-5 !text-red-600 dark:!text-red-400" />
          <AlertTitle className="font-semibold">Verification Rejected</AlertTitle>
          <AlertDescription>
            There was an issue with your verification. Please check your email or <Link href="/contact" className="font-semibold hover:underline">contact support</Link>. You may need to resubmit documents via <Link href="/dashboard/profile" className="font-semibold hover:underline">Profile Settings</Link>.
          </AlertDescription>
        </Alert>
      )}
       {sellerVerificationStatus === 'verified' && (
        <Alert variant="default" className="bg-green-50 border-green-400 text-green-700 dark:bg-green-900/30 dark:border-green-600 dark:text-green-300">
          <ShieldCheck className="h-5 w-5 !text-green-600 dark:!text-green-400" />
          <AlertTitle className="font-semibold">Account Verified</AlertTitle>
          <AlertDescription>
            Your seller account is verified! You can publish courses and manage your earnings.
          </AlertDescription>
        </Alert>
      )}
       {sellerVerificationStatus === 'unverified' && !user?.documentsSubmitted && (
        <Alert variant="default" className="bg-blue-50 border-blue-300 text-blue-700 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-400">
          <FileText className="h-5 w-5 !text-blue-600 dark:!text-blue-400" />
          <AlertTitle className="font-semibold">Complete Your Profile & Verification</AlertTitle>
          <AlertDescription>
            To start selling courses, please complete your seller profile and submit your documents for verification. Go to <Link href="/dashboard/profile" className="font-semibold hover:underline">Profile Settings</Link> to get started.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-md border-l-4 border-primary">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalEarnings.toLocaleString('en-IN')}</div>
            <p className="text-xs text-muted-foreground">All-time (after platform fees)</p>
          </CardContent>
        </Card>
        <Card className="shadow-md border-l-4 border-accent">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all your courses</p>
          </CardContent>
        </Card>
        <Card className="shadow-md border-l-4 border-green-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Published Courses</CardTitle>
            <BookOpen className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCoursesCount}</div>
            <p className="text-xs text-muted-foreground">{pendingCoursesCount} pending approval</p>
          </CardContent>
        </Card>
         <Card className="shadow-md border-l-4 border-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <MessageSquare className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sellerReviews.length}</div>
            <p className="text-xs text-muted-foreground">Avg. Rating: { (sellerReviews.reduce((acc,r) => acc + r.rating, 0) / (sellerReviews.length || 1)).toFixed(1) }</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-lg border">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Revenue Over Time</CardTitle>
            <CardDescription>Your earnings trend for the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <RechartsBarChart accessibilityLayer data={revenueData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis tickFormatter={(value) => `₹${value/1000}k`} tickLine={false} axisLine={false} tickMargin={10} />
                <ChartTooltip content={<ChartTooltipContent formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`} />} />
                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
              </RechartsBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="shadow-lg border">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Enrollment Trends</CardTitle>
             <CardDescription>Student enrollments in your courses over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent>
             <ChartContainer config={enrollmentChartConfig} className="h-[300px] w-full">
              <LineChart accessibilityLayer data={enrollmentData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} tickMargin={10} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="enrollments" stroke="var(--color-enrollments)" strokeWidth={3} dot={{ r: 5, strokeWidth: 2 }} activeDot={{r: 7}}/>
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <section>
         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <h2 className="text-2xl font-semibold font-headline">Quick Actions</h2>
            <Button variant="outline" asChild>
                <Link href="/dashboard/seller/analytics">View Detailed Analytics <TrendingUp className="ml-2 h-4 w-4"/></Link>
            </Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold flex items-center gap-2"><BookOpen className="text-primary"/>Manage My Courses</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">Edit existing courses, check approval status, or unpublish listings.</p>
                    <Button asChild className="w-full"><Link href="/dashboard/seller/courses">Go to Courses</Link></Button>
                </CardContent>
            </Card>
             <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold flex items-center gap-2"><DollarSign className="text-green-500"/>View Earnings & Payouts</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">Track your revenue, view payout history, and manage payout settings.</p>
                    <Button asChild className="w-full"><Link href="/dashboard/seller/earnings">Go to Earnings</Link></Button>
                </CardContent>
            </Card>
             <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold flex items-center gap-2"><MessageSquare className="text-yellow-500"/>Respond to Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">Engage with your students by responding to their feedback and reviews.</p>
                    <Button asChild className="w-full"><Link href="/dashboard/seller/reviews">Go to Reviews</Link></Button>
                </CardContent>
            </Card>
        </div>
      </section>

    </div>
  );
}
