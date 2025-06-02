
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
    { title: "Total Users", value: totalUsers.toLocaleString(), icon: Users, color: "text-primary", bgColor: "bg-primary/5", href: "/admin/users", borderColor: "border-primary" },
    { title: "Total Courses", value: totalCourses.toLocaleString(), icon: BookOpen, color: "text-blue-600", bgColor: "bg-blue-50 dark:bg-blue-900/20", href: "/admin/courses", borderColor: "border-blue-600" },
    { title: "Total Revenue", value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: DollarSign, color: "text-green-600", bgColor: "bg-green-50 dark:bg-green-900/20", href: "/admin/payments", borderColor: "border-green-600" }, // Green for revenue is acceptable
    { title: "Pending Verifications", value: pendingSellerVerifications.toLocaleString(), icon: ShieldQuestion, color: "text-info-foreground", bgColor: "bg-info/10", href: "/admin/users?filter=pending_verification", borderColor: "border-info"},
  ];

  const actionItems = [
    { title: "Seller Verifications", value: pendingSellerVerifications, icon: ShieldCheck, link: "/admin/users?filter=pending_verification", description: "Review new seller applications.", imageHint: "admin verification checkmark user document", iconColor: "text-info" },
    { title: "Course Approvals", value: pendingCourseApprovals, icon: ListChecks, link: "/admin/courses?filter=pending_approval", description: "Moderate new course submissions.", imageHint: "admin course approval checklist document", iconColor: "text-info" },
    { title: "Review Moderation", value: placeholderReviews.filter(r => r.moderationStatus === 'pending').length, icon: Eye, link: "/admin/reviews?filter=pending", description: "Manage user-submitted reviews.", imageHint: "admin review moderation eye content", iconColor: "text-primary" }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-card rounded-lg shadow border-l-4 border-primary">
        <div>
            <h1 className="text-3xl font-bold font-headline text-primary">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome, {placeholderUsers.find(u=>u.role==='admin')?.name || 'Admin'}! Overview of platform activity.</p>
        </div>
        <Image src="https://placehold.co/300x150/EBF4FF/3B82F6?text=Admin+Welcome+Banner" alt="Admin Dashboard Illustration" width={300} height={150} className="rounded-md shadow-md object-cover mt-4 md:mt-0" data-ai-hint="admin dashboard charts graphs illustration"/>
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {actionItems.map(action => (
                 <Card key={action.title} className="shadow-lg hover:shadow-xl transition-shadow border bg-card flex flex-col">
                    <CardHeader className="pb-4">
                         <div className="flex items-center justify-between mb-2">
                            <action.icon className={`h-10 w-10 ${action.iconColor || 'text-primary'}`} />
                            <span className={`text-4xl font-bold ${action.iconColor || 'text-primary'}`}>{action.value}</span>
                         </div>
                         <CardTitle className="text-lg font-semibold">{action.title}</CardTitle>
                         <CardDescription className="text-xs h-8">{action.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                       <Image src={`https://placehold.co/300x150.png`} alt={action.title} width={300} height={150} className="rounded-md object-cover w-full h-32 mb-4" data-ai-hint={action.imageHint} />
                    </CardContent>
                    <CardFooter>
                        <Button variant="default" asChild className="w-full">
                            <Link href={action.link}>View Details <ArrowRight className="ml-1 h-4 w-4"/></Link>
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
              <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2.5} dot={{r: 5, strokeWidth:1, fill: "hsl(var(--background))", stroke: "hsl(var(--primary))" }} activeDot={{r:7, fill: "hsl(var(--primary))" }} />
              <Line yAxisId="right" type="monotone" dataKey="users" stroke="var(--color-users)" strokeWidth={2.5} dot={{r: 5, strokeWidth:1, fill: "hsl(var(--background))", stroke: "hsl(var(--accent))" }} activeDot={{r:7, fill: "hsl(var(--accent))"}}/>
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <section>
        <h2 className="text-2xl font-semibold mb-6 font-headline text-foreground">Quick Links</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[
                {label: "User Management", href: "/admin/users", icon: Users, description: "Manage all platform users and roles."},
                {label: "Course Catalog", href: "/admin/courses", icon: BookOpen, description: "Oversee all courses, categories, and content."},
                {label: "Review Moderation", href: "/admin/reviews", icon: MessageSquare, description: "Approve or reject user-submitted reviews."},
                {label: "Financial Reports", href: "/admin/payments", icon: DollarSign, description: "Track revenue, payouts, and transactions."},
                {label: "Site Content Editor", href: "/admin/content", icon: Edit3, description: "Update static pages, FAQs, and banners."},
                {label: "System Analytics", href: "/admin/analytics", icon: BarChartIcon, description: "View platform-wide analytics (Coming Soon).", disabled: true},
                {label: "Theme & Appearance", href: "/admin/settings?tab=theme", icon: Palette, description: "Customize platform look and feel."},
                {label: "Platform Settings", href: "/admin/settings", icon: SettingsIcon, description: "Configure core platform functionalities."},
            ].map(link => (
                 <Card key={link.href} className="shadow-md hover:shadow-lg transition-shadow bg-card">
                    <CardHeader className="flex-row items-center gap-4 pb-3">
                        <div className="p-2.5 bg-primary/10 rounded-md">
                            <link.icon className="h-6 w-6 text-primary"/>
                        </div>
                        <CardTitle className="text-md font-semibold leading-tight">{link.label}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 pb-4">
                       <p className="text-xs text-muted-foreground h-10">{link.description}</p>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" size="sm" asChild className="w-full" disabled={link.disabled}>
                            <Link href={link.disabled ? "#" : link.href}>Go to {link.label.split(' ')[0]} <ArrowRight className="ml-auto h-4 w-4"/></Link>
                        </Button>
                    </CardFooter>
                 </Card>
            ))}
        </div>
      </section>
    </div>
  );
}
