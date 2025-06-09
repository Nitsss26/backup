
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { placeholderUsers, placeholderCourses, placeholderReviews, placeholderOrders } from "@/lib/placeholder-data";
import { Users, BookOpen, MessageSquare, DollarSign, ArrowRight, Settings as SettingsIcon, Eye, BarChart3 as BarChartIcon, Edit3, ListChecks, ShieldAlert, FileQuestion, Palette, ShieldCheck, ShieldQuestion, CalendarDays } from "lucide-react";
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
    { title: "Total Users", value: totalUsers.toLocaleString(), icon: Users, color: "text-primary", bgColor: "bg-primary/10", href: "/admin/users", borderColor: "border-primary" },
    { title: "Total Courses", value: totalCourses.toLocaleString(), icon: BookOpen, color: "text-purple-600 dark:text-purple-400", bgColor: "bg-purple-50 dark:bg-purple-900/30", href: "/admin/courses", borderColor: "border-purple-500" },
    { title: "Total Revenue", value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: DollarSign, color: "text-success", bgColor: "bg-success/10", href: "/admin/payments", borderColor: "border-success" },
    { title: "Pending Verifications", value: pendingSellerVerifications.toLocaleString(), icon: ShieldQuestion, color: "text-warning", bgColor: "bg-warning/10", href: "/admin/users?filter=pending_verification", borderColor: "border-warning"},
  ];

  const actionItems = [
    { title: "Seller Verifications", value: pendingSellerVerifications, icon: ShieldCheck, link: "/admin/users?filter=pending_verification", description: "Review new seller applications.", imageHint: "admin user verification document checkmark professional", iconColor: "text-emerald-600 dark:text-emerald-400", img: "https://img.freepik.com/premium-vector/verified-checkmark-icon-blue-verified-checkmark-badges_833685-4128.jpg" },
    { title: "Course Approvals", value: pendingCourseApprovals, icon: ListChecks, link: "/admin/courses?filter=pending_approval", description: "Moderate new course submissions.", imageHint: "admin course approval checklist content professional", iconColor: "text-indigo-600 dark:text-indigo-400",img: "https://img.freepik.com/premium-vector/quality-guarantee-stamp-quality-guarantee-label-flat-design-sign-vector-illustration_476325-329.jpg" },
    { title: "Review Moderation", value: placeholderReviews.filter(r => r.moderationStatus === 'pending').length, icon: Eye, link: "/admin/reviews?filter=pending", description: "Manage user-submitted reviews.", imageHint: "admin content moderation reviews feedback professional", iconColor: "text-rose-600 dark:text-rose-400",img:"https://img.freepik.com/premium-vector/isometric-message-bubbles-with-stars-rating-white-background-customer-feedback-concept_253256-1100.jpg" },
  ];

  return (
    <div className="space-y-8 max-w-screen-xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-card rounded-lg shadow border-l-4 border-primary">
        <div>
            <h1 className="text-3xl font-bold font-headline text-primary">Admin Dashboard</h1>
            <p className="text-lg mt-1 text-muted-foreground">Welcome Back, {placeholderUsers.find(u=>u.role==='admin')?.name || 'Admin'}! 👋 Manage your platform efficiently.</p>
        </div>
        <Image src="https://placehold.co/300x150.png" alt="Admin Dashboard Illustration" width={300} height={150} className="rounded-md shadow-md object-cover mt-4 md:mt-0" data-ai-hint="admin dashboard professional data analytics interface dark theme"/>
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
             <Card key={action.title} className={`shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] border-0 overflow-hidden ${action.iconColor === 'text-emerald-600 dark:text-emerald-400' ? 'bg-emerald-50 dark:bg-emerald-900/40' : action.iconColor === 'text-indigo-600 dark:text-indigo-400' ? 'bg-indigo-50 dark:bg-indigo-900/40' : 'bg-rose-50 dark:bg-rose-900/40'}`}>
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
                 <Button asChild className={`w-full text-white hover:opacity-95 transition-opacity ${action.iconColor === 'text-emerald-600 dark:text-emerald-400' ? 'bg-emerald-500 hover:bg-emerald-600' : action.iconColor === 'text-indigo-600 dark:text-indigo-400' ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-rose-500 hover:bg-rose-600'}`}>
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
        <ChartTooltip content={<ChartTooltipContent formatter={(value, name) => name === 'revenue' ? `₹${Number(value).toLocaleString('en-IN')}` : String(value)} />} />
        <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{r: 5, strokeWidth:1, fill: "hsl(var(--background))", stroke: "hsl(var(--primary))" }} activeDot={{r:7, fill: "hsl(var(--primary))" }} />
        <Line yAxisId="right" type="monotone" dataKey="users" stroke="hsl(var(--accent))" strokeWidth={2.5} dot={{r: 5, strokeWidth:1, fill: "hsl(var(--background))", stroke: "hsl(var(--accent))" }} activeDot={{r:7, fill: "hsl(var(--accent))"}}/>
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
      { label: "System Analytics", href: "/admin/analytics", icon: BarChartIcon, description: "View platform-wide analytics (Coming Soon).", disabled: true, iconColor: "text-teal-600 dark:text-teal-400" },
      { label: "Theme & Appearance", href: "/admin/settings?tab=theme", icon: Palette, description: "Customize platform look and feel.", iconColor: "text-pink-600 dark:text-pink-400" },
      { label: "Platform Settings", href: "/admin/settings", icon: SettingsIcon, description: "Configure core platform functionalities.", iconColor: "text-indigo-600 dark:text-indigo-400" },
    ].map(link => (
      <Card key={link.href} className="shadow-md hover:shadow-lg transition-shadow bg-card">
        <CardHeader className="flex-row items-center gap-4 pb-3">
          <div className={`p-2.5 rounded-md ${link.bgColor || 'bg-primary/10'}`}>
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
