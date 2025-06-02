
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { placeholderUsers, placeholderCourses, placeholderReviews, placeholderOrders } from "@/lib/placeholder-data";
import { Users, BookOpen, MessageSquare, DollarSign, CheckCircle, AlertTriangle, Hourglass, ArrowRight, Settings as SettingsIcon, Eye, BarChart3, Edit3, ListChecks } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const chartConfig = {
  revenue: { label: "Revenue", color: "hsl(var(--primary))" },
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
  const totalCourses = placeholderCourses.length;
  const pendingSellerVerifications = placeholderUsers.filter(u => u.role === 'provider' && u.verificationStatus === 'pending').length;
  const pendingCourseApprovals = placeholderCourses.filter(c => c.approvalStatus === 'pending').length;
  const totalRevenue = placeholderOrders.filter(o => o.status === 'completed').reduce((sum, order) => sum + order.totalAmount, 0);
  const reportedContentCount = placeholderReviews.filter(r => r.moderationStatus === 'pending').length; // Example for reported content

  const quickStats = [
    { title: "Total Users", value: totalUsers.toLocaleString(), icon: Users, color: "text-blue-500", bgColor: "bg-blue-50 dark:bg-blue-900/30" },
    { title: "Total Courses", value: totalCourses.toLocaleString(), icon: BookOpen, color: "text-green-500", bgColor: "bg-green-50 dark:bg-green-900/30" },
    { title: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-purple-500", bgColor: "bg-purple-50 dark:bg-purple-900/30" },
    { title: "Reported Content", value: reportedContentCount.toLocaleString(), icon: AlertTriangle, color: "text-red-500", bgColor: "bg-red-50 dark:bg-red-900/30"},
  ];

  const actionItems = [
    { title: "Seller Verifications", value: pendingSellerVerifications, icon: CheckCircle, link: "/admin/users", description: "Review new seller applications." },
    { title: "Course Approvals", value: pendingCourseApprovals, icon: ListChecks, link: "/admin/courses", description: "Moderate new course submissions." },
    { title: "Review Moderation", value: placeholderReviews.filter(r => r.moderationStatus === 'pending').length, icon: Eye, link: "/admin/reviews", description: "Manage user-submitted reviews." }
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map(stat => (
          <Card key={stat.title} className={`shadow-md ${stat.bgColor}`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className={`text-sm font-medium ${stat.color}`}>{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4 font-headline">Pending Actions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {actionItems.map(action => (
                 <Card key={action.title} className="shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                         <div className="flex items-center justify-between">
                            <action.icon className={`h-8 w-8 text-primary mb-2`} />
                            <span className="text-3xl font-bold text-primary">{action.value}</span>
                         </div>
                         <CardTitle className="text-lg font-medium">{action.title}</CardTitle>
                         <CardDescription className="text-xs">{action.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="default" asChild className="w-full">
                            <Link href={action.link}>View Details <ArrowRight className="ml-1 h-4 w-4"/></Link>
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
      </section>


      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="font-headline">Platform Overview (Monthly)</CardTitle>
          <CardDescription>Track key metrics like revenue and new user registration over time.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <BarChart data={monthlyData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />
              <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" tickFormatter={(value) => `₹${value/1000}k`} tickLine={false} axisLine={false} tickMargin={10} />
              <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--accent))" tickLine={false} axisLine={false} tickMargin={10} />
              <ChartTooltip content={<ChartTooltipContent formatter={(value, name) => name === 'revenue' ? `₹${Number(value).toLocaleString()}` : value} />} />
              <Bar yAxisId="left" dataKey="revenue" fill="var(--color-revenue)" radius={4} />
              <Bar yAxisId="right" dataKey="users" fill="var(--color-users)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <section>
        <h2 className="text-2xl font-semibold mb-4 font-headline">Quick Links</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
                {label: "User Management", href: "/admin/users", icon: Users},
                {label: "Course Management", href: "/admin/courses", icon: BookOpen},
                {label: "Content Moderation", href: "/admin/reviews", icon: MessageSquare},
                {label: "Financial Reports", href: "/admin/payments", icon: DollarSign},
                {label: "Site Content Editor", href: "/admin/content", icon: Edit3},
                {label: "Analytics Dashboard", href: "/admin/analytics", icon: BarChart3, disabled: true}, // Example disabled
                {label: "Platform Settings", href: "/admin/settings", icon: SettingsIcon },
            ].map(link => (
                 <Button key={link.href} variant="outline" size="lg" asChild className="justify-start text-base py-6 hover:bg-primary/5 hover:border-primary" disabled={link.disabled}>
                    <Link href={link.href}><link.icon className="mr-3 h-5 w-5 text-primary"/>{link.label}</Link>
                </Button>
            ))}
        </div>
      </section>
    </div>
  );
}
