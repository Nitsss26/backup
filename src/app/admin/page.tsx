"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { placeholderUsers, placeholderCourses, placeholderReviews, placeholderOrders } from "@/lib/placeholder-data";
import { Users, BookOpen, MessageSquare, DollarSign, CheckCircle, AlertTriangle, Hourglass, ArrowRight, Settings as SettingsIcon, Eye, BarChart3 as BarChartIcon, Edit3, ListChecks, ShieldAlert, FileQuestion, Palette, ShieldCheck, ShieldQuestion, CalendarDays } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import Image from "next/image";

const chartConfig = {
  revenue: { label: "Revenue (₹)", color: "hsl(var(--primary))" },
  users: { label: "New Users", color: "hsl(var(--accent))" },
};

const monthlyData = [
  { month: 'Jan', revenue: 240000, users: 100 },
  { month: 'Feb', revenue: 139800, users: 120 },
  { month: 'Mar', revenue: 980000, users: 150 },
  { month: 'Apr', revenue: 390800, users: 130 },
  { month: 'May', revenue: 480000, users: 180 },
  { month: 'Jun', revenue: 380000, users: 200 },
];

export default function AdminDashboardPage() {
  const totalUsers = placeholderUsers.length;
  const totalSellers = placeholderUsers.filter(u => u.role === 'provider').length;
  const totalStudents = placeholderUsers.filter(u => u.role === 'student').length;
  const totalCourses = placeholderCourses.length;
  const pendingSellerVerifications = placeholderUsers.filter(u => u.role === 'provider' && u.verificationStatus === 'pending').length;
  const pendingCourseApprovals = placeholderCourses.filter(c => c.approvalStatus === 'pending').length;
  const totalRevenue = placeholderOrders.filter(o => o.status === 'completed').reduce((sum, order) => sum + order.totalAmount, 0);
  const reportedContentCount = placeholderReviews.filter(r => r.moderationStatus === 'pending').length; 

  const quickStats = [
    { title: "Total Users", value: totalUsers.toLocaleString(), icon: Users, color: "text-blue-600", bgColor: "bg-blue-50 dark:bg-blue-900/20", href: "/admin/users", borderColor: "border-primary" },
    { title: "Total Courses", value: totalCourses.toLocaleString(), icon: BookOpen, color: "text-yellow-500", bgColor: "bg-yellow/5 ", href: "/admin/courses", borderColor: "border-yellow-600" },
    { title: "Total Revenue", value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: DollarSign, color: "text-green-600", bgColor: "bg-green-50 dark:bg-green-900/20", href: "/admin/payments", borderColor: "border-green-600" },
    { title: "Pending Verifications", value: pendingSellerVerifications.toLocaleString(), icon: ShieldQuestion, color: "text-orange-600", bgColor: "bg-info/10", href: "/admin/users?filter=pending_verification", borderColor: "border-red-600"},
  ];

  const actionItems = [
    { title: "Seller Verifications", value: pendingSellerVerifications, icon: ShieldCheck, link: "/admin/users?filter=pending_verification", description: "Review new seller applications.", imageHint: "admin verification checkmark user document", iconColor: "text-indigo-300", img: "https://img.freepik.com/premium-vector/set-green-shield-with-white-checkmark-symbolizing-security-protection-verification_100456-19840.jpg" },
    { title: "Review Moderation", value: placeholderReviews.filter(r => r.moderationStatus === 'pending').length, icon: Eye, link: "/admin/reviews?filter=pending", description: "Manage user-submitted reviews.", imageHint: "admin review moderation eye content", iconColor: "text-indigo-300", img:"https://img.freepik.com/premium-vector/feedback-giving-rating-customer-satisfaction_7087-1594.jpg?uid=R120730963&ga=GA1.1.1385959138.1748893744&semt=ais_hybrid&w=740" },
    { title: "Course Approvals", value: pendingCourseApprovals, icon: ListChecks, link: "/admin/courses?filter=pending_approval", description: "Moderate new course submissions.", imageHint: "admin course approval checklist document", iconColor: "text-indigo-300", img: "https://img.freepik.com/premium-vector/yellow-sign-that-says-check-your-finger-center_1305575-6742.jpg" },
  ];

  return (
    <div className="space-y-8 p-16 -mt-8">
      {/* Top-right buttons (Logout and Theme Color Change) */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/">
            Logout
          </Link>
        </Button>
        <Button variant="outline" size="sm" disabled>
          <Palette className="h-4 w-4 mr-2" />
          Change Theme
        </Button>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-card rounded-lg shadow border-l-4 border-primary">
        <div>
          <h1 className="text-3xl font-bold font-headline text-primary">Admin Dashboard</h1>
          <p className="text-lg mt-4">Welcome Back, {placeholderUsers.find(u => u.role === 'admin')?.name || 'Admin'}! 👋 Manage your learning platform with powerful insights and intuitive controls.</p>
        </div>
        <Image src="https://img.freepik.com/premium-vector/person-seated-workstation-with-laptop-ai-generated_520881-7744.jpg" alt="Admin Dashboard Illustration" width={300} height={150} className="rounded-md shadow-md object-cover mt-4 md:mt-0" data-ai-hint="admin dashboard charts graphs illustration"/>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map(stat => (
          <Card key={stat.title} className={`shadow-lg hover:shadow-xl transition-shadow border-l-4 ${stat.borderColor} ${stat.bgColor}`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className={`text-sm font-medium ${stat.color}`}>{stat.title}</CardTitle>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold text-foreground`}>{stat.value}</div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="link" size="sm" asChild className={`p-0 h-auto text-xs ${stat.color} hover:underline`}>
                <Link href={stat.href || "#"}>View Details <ArrowRight className="ml-1 h-3 w-3"/></Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <section>
        <h2 className="text-2xl font-semibold mb-6 font-headline text-foreground">Key Action Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {actionItems.map((action) => (
            <Card key={action.title} className={`${action.bgGradient} shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] border-0 overflow-hidden`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="bg-white/80 dark:bg-slate-800/60 p-2.5 rounded-full shadow-md">
                    <action.icon className={`h-8 w-8 ${action.iconColor}`} />
                  </div>
                  <div className="text-right">
                    <span className={`text-3xl font-bold ${action.iconColor}`}>{action.value}</span>
                    <p className="text-xs text-muted-foreground">pending</p>
                  </div>
                </div>
                <CardTitle className="text-lg font-bold text-foreground">{action.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                <Image 
                  src={action.img} 
                  alt={action.title} 
                  width={400} 
                  height={200} 
                  className="w-full h-36 object-cover rounded-md shadow-sm"
                  data-ai-hint={action.imageHint}
                />
                <CardDescription className="text-sm text-muted-foreground h-10">{action.description}</CardDescription>
              </CardContent>
              <CardFooter className="pt-2">
                <Button variant="default" asChild className="w-full bg-indigo-300">
                  <Link href={action.link}>Take Action <ArrowRight className="ml-1.5 h-4 w-4"/></Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <Card className="shadow-lg border bg-card">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Platform Overview (Monthly)</CardTitle>
          <CardDescription>Track key metrics like revenue and new user registration over time.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <LineChart data={monthlyData}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))"/>
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />
              <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" tickFormatter={(value) => `₹${value/1000}k`} tickLine={false} axisLine={false} tickMargin={10} />
              <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--accent))" tickLine={false} axisLine={false} tickMargin={10} />
              <ChartTooltip content={<ChartTooltipContent formatter={(value, name) => name === 'revenue' ? `₹${Number(value).toLocaleString('en-IN')}` : value} />} />
              <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2.5} dot={{r: 5, strokeWidth:1, fill: "hsl(var(--background))", stroke: "#22c55e" }} activeDot={{r:7, fill: "#22c55e" }} />
              <Line yAxisId="right" type="monotone" dataKey="users" stroke="#eab308" strokeWidth={2.5} dot={{r: 5, strokeWidth:1, fill: "hsl(var(--background))", stroke: "#eab308" }} activeDot={{r:7, fill: "#eab308"}}/>
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <section>
        <h2 className="text-2xl font-semibold mb-6 font-headline text-foreground">Quick Links</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[
            { label: "User Management", href: "/admin/users", icon: Users, description: "Manage all platform users and roles.", iconColor: "text-blue-600 dark:text-blue-400" },
            { label: "Course Catalog", href: "/admin/courses", icon: BookOpen, description: "Oversee all courses, categories, and content.", iconColor: "text-yellow-600 dark:text-yellow-400" },
            { label: "Review Moderation", href: "/admin/reviews", icon: MessageSquare, description: "Approve or reject user-submitted reviews.", iconColor: "text-purple-600 dark:text-purple-400" },
            { label: "Financial Reports", href: "/admin/payments", icon: DollarSign, description: "Track revenue, payouts, and transactions.", iconColor: "text-green-600 dark:text-green-400" },
            { label: "Site Content Editor", href: "/admin/content", icon: Edit3, description: "Update static pages, FAQs, and banners.", iconColor: "text-red-600 dark:text-red-400" },
            { label: "System Analytics", href: "/admin/analytics", icon: BarChartIcon, description: "View platform-wide analytics.", iconColor: "text-teal-600 dark:text-teal-400" },
            { label: "Theme & Appearance", href: "/admin/settings?tab=theme", icon: Palette, description: "Customize platform look and feel.", iconColor: "text-pink-600 dark:text-pink-400" },
            { label: "Platform Settings", href: "/admin/settings", icon: SettingsIcon, description: "Configure core platform functionalities.", iconColor: "text-indigo-600 dark:text-indigo-400" },
          ].map(link => (
            <Card key={link.href} className="shadow-md hover:shadow-lg transition-shadow bg-card">
              <CardHeader className="flex-row items-center gap-4 pb-3">
                <div className="p-2.5 bg-primary/10 rounded-md">
                  <link.icon className={`h-6 w-6 ${link.iconColor}`} />
                </div>
                <CardTitle className="text-md font-semibold leading-tight">{link.label}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 pb-4">
                <p className="text-xs text-muted-foreground h-10">{link.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild className="w-full" disabled={link.disabled}>
                  <Link href={link.disabled ? "#" : link.href}>Go to {link.label.split(' ')[0]} <ArrowRight className="ml-auto h-4 w-4" /></Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
