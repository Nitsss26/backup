
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { placeholderUsers, placeholderCourses, placeholderReviews, placeholderOrders } from "@/lib/placeholder-data";
import { Users, BookOpen, MessageSquare, DollarSign, ArrowRight, Settings as SettingsIcon, Eye, BarChart3 as BarChartIcon, Edit3, ListChecks, ShieldAlert, FileQuestion, Palette, ShieldCheck, ShieldQuestion, CalendarDays, LayoutGrid, TrendingUp } from "lucide-react";
import { BarChart as RechartsBarChart, LineChart as RechartsLineChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { APP_NAME } from "@/lib/constants";

// Updated chartConfig for better theme consistency
const chartConfig = {
  revenue: { label: "Revenue (₹)", color: "hsl(var(--primary))" }, // Blue
  profit: { label: "Profit (₹)", color: "hsl(var(--success))" }, // Green
  users: { label: "New Users", color: "hsl(var(--accent))" }, // Accent color
  // If you had a loss metric, it would be:
  // loss: { label: "Loss (₹)", color: "hsl(var(--destructive))" }, // Red
};

const monthlyData = [
  { month: 'Jan', revenue: 240000, users: 100, profit: 48000 },
  { month: 'Feb', revenue: 139800, users: 120, profit: -20000 }, // Example loss
  { month: 'Mar', revenue: 980000, users: 150, profit: 196000 },
  { month: 'Apr', revenue: 390800, users: 130, profit: 78160 },
  { month: 'May', revenue: 480000, users: 180, profit: 96000 },
  { month: 'Jun', revenue: 380000, users: 200, profit: 76000 },
];

export default function AdminDashboardPage() {
  const totalUsers = placeholderUsers.length;
  const totalCourses = placeholderCourses.length;
  const totalRevenue = placeholderOrders.filter(o => o.status === 'completed').reduce((sum, order) => sum + order.totalAmount, 0);
  const pendingSellerVerifications = placeholderUsers.filter(u => u.role === 'provider' && u.verificationStatus === 'pending').length;
  const pendingCourseApprovals = placeholderCourses.filter(c => c.approvalStatus === 'pending').length;
  const pendingReviewsModeration = placeholderReviews.filter(r => r.moderationStatus === 'pending').length;

  const quickStats = [
    { title: "Total Users", value: totalUsers.toLocaleString(), icon: Users, color: "text-primary", bgColor: "bg-primary/10", href: "/admin/users", borderColor: "border-primary" },
    { title: "Total Courses", value: totalCourses.toLocaleString(), icon: BookOpen, color: "text-accent", bgColor: "bg-accent/10", href: "/admin/courses", borderColor: "border-accent" },
    { title: "Total Revenue", value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: DollarSign, color: "text-success", bgColor: "bg-success/10", href: "/admin/payments", borderColor: "border-success" },
    { title: "Pending Actions", value: (pendingSellerVerifications + pendingCourseApprovals + pendingReviewsModeration).toLocaleString(), icon: ShieldAlert, color: "text-warning", bgColor: "bg-warning/10", href: "#action-items", borderColor: "border-warning"},
  ];

  const actionItems = [
    { title: "Seller Verifications", value: pendingSellerVerifications, icon: ShieldCheck, link: "/admin/users?filter=pending_verification", description: "Review new seller applications.", imageHint: "admin user verification document checkmark professional", iconColor: "text-primary" },
    { title: "Course Approvals", value: pendingCourseApprovals, icon: ListChecks, link: "/admin/courses?filter=pending", description: "Moderate new course submissions.", imageHint: "admin course approval checklist content professional", iconColor: "text-primary" },
    { title: "Review Moderation", value: pendingReviewsModeration, icon: Eye, link: "/admin/reviews?filter=pending", description: "Manage user-submitted reviews.", imageHint: "admin content moderation reviews feedback professional", iconColor: "text-primary" }
  ];
  
  const adminUser = placeholderUsers.find(u => u.role === 'admin');

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card className="shadow-xl border-l-4 border-primary overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background">
        <CardContent className="p-6 md:p-8 grid md:grid-cols-2 items-center gap-6">
          <div className="space-y-3">
            <h1 className="text-3xl lg:text-4xl font-bold font-headline text-primary">Admin Dashboard</h1>
            <p className="text-lg text-muted-foreground">
              Welcome back, {adminUser?.name || 'Admin'}! Oversee and manage all platform activities.
            </p>
            <p className="text-sm text-muted-foreground">
              Quickly access user management, course approvals, content moderation, and financial reports.
            </p>
            <Button asChild size="lg" className="mt-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/admin/settings">Platform Settings <SettingsIcon className="ml-2 h-5 w-5"/></Link>
            </Button>
          </div>
          <div className="hidden md:flex justify-center">
            <Image 
                src="https://placehold.co/500x350.png" 
                alt="Admin dashboard interface with charts and user icons" 
                width={500} height={350} 
                className="rounded-lg shadow-xl object-cover"
                data-ai-hint="admin dashboard professional data analytics interface dark theme"
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map(stat => (
          <Card key={stat.title} className={`shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 ${stat.borderColor} ${stat.bgColor}`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className={`text-sm font-medium ${stat.color}`}>{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold text-foreground`}>{stat.value}</div>
            </CardContent>
            <CardFooter className="pt-1 pb-3">
                <Button variant="link" size="sm" asChild className={`p-0 h-auto text-xs ${stat.color} hover:underline`}>
                    <Link href={stat.href || "#"}>View Details <ArrowRight className="ml-1 h-3 w-3"/></Link>
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* Action Items */}
      <section id="action-items">
        <h2 className="text-2xl font-semibold mb-6 font-headline text-foreground flex items-center">
            <AlertTriangle className="mr-3 h-7 w-7 text-warning"/>Key Action Items
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {actionItems.map(action => (
                 <Card key={action.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300 border bg-card flex flex-col">
                    <CardHeader className="pb-4">
                         <div className="flex items-start justify-between mb-2">
                            <div className={`p-3 rounded-md bg-primary/10 w-fit`}>
                                <action.icon className={`h-8 w-8 ${action.iconColor || 'text-primary'}`} />
                            </div>
                            <span className={`text-4xl font-bold ${action.iconColor || 'text-primary'}`}>{action.value}</span>
                         </div>
                         <CardTitle className="text-lg font-semibold text-foreground">{action.title}</CardTitle>
                         <CardDescription className="text-xs text-muted-foreground h-8 line-clamp-2">{action.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                       <Image src={`https://placehold.co/350x200.png`} alt={action.title} width={350} height={200} className="rounded-md object-cover w-full h-40 mb-4 shadow-sm" data-ai-hint={action.imageHint} />
                    </CardContent>
                    <CardFooter>
                        <Button variant="default" asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                            <Link href={action.link}>Review Now <ArrowRight className="ml-auto h-4 w-4"/></Link>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
      </section>

      {/* Analytics Chart */}
      <Card className="shadow-xl border bg-card">
        <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                    <CardTitle className="font-headline text-2xl text-foreground flex items-center">
                        <BarChartIcon className="mr-3 h-7 w-7 text-primary" />
                        Platform Analytics Overview
                    </CardTitle>
                    <CardDescription className="mt-1 text-muted-foreground">
                        Key metrics trend over the past 6 months.
                    </CardDescription>
                </div>
                 <div className="mt-3 sm:mt-0 flex space-x-3 text-xs">
                    <div className="flex items-center"><div className="w-2.5 h-2.5 rounded-full mr-1.5" style={{backgroundColor: chartConfig.revenue.color}}></div>Revenue</div>
                    <div className="flex items-center"><div className="w-2.5 h-2.5 rounded-full mr-1.5" style={{backgroundColor: chartConfig.profit.color}}></div>Profit</div>
                    <div className="flex items-center"><div className="w-2.5 h-2.5 rounded-full mr-1.5" style={{backgroundColor: chartConfig.users.color}}></div>New Users</div>
                </div>
            </div>
        </CardHeader>
        <CardContent className="pt-2 pb-6">
          <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <RechartsLineChart data={monthlyData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))"/>
              <XAxis dataKey="month" tickLine={false} axisLine={{stroke: "hsl(var(--border))"}} tickMargin={10} stroke="hsl(var(--muted-foreground))" />
              <YAxis yAxisId="left" orientation="left" tickFormatter={(value) => `₹${value/1000}k`} tickLine={false} axisLine={{stroke: "hsl(var(--border))"}} tickMargin={10} stroke="hsl(var(--muted-foreground))"/>
              <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={{stroke: "hsl(var(--border))"}} tickMargin={10} stroke="hsl(var(--muted-foreground))"/>
              <Tooltip
                content={<ChartTooltipContent 
                    formatter={(value, name) => {
                        if (name === 'revenue' || name === 'profit') return `₹${Number(value).toLocaleString('en-IN')}`;
                        return value;
                    }} 
                    indicator="dot"
                    labelClassName="font-medium"
                    wrapperClassName="rounded-lg border bg-background/95 shadow-lg backdrop-blur-sm"
                />}
              />
              <Line yAxisId="left" type="monotone" dataKey="revenue" strokeWidth={2.5} stroke="var(--color-revenue)" dot={{ r: 4, fill: "var(--color-revenue)", strokeWidth:0 }} activeDot={{ r: 6, strokeWidth: 2, fill: "hsl(var(--background))", stroke: "var(--color-revenue)" }} />
              <Line yAxisId="left" type="monotone" dataKey="profit" strokeWidth={2.5} stroke="var(--color-profit)" dot={{ r: 4, fill: "var(--color-profit)", strokeWidth:0 }} activeDot={{ r: 6, strokeWidth: 2, fill: "hsl(var(--background))", stroke: "var(--color-profit)" }} />
              <Line yAxisId="right" type="monotone" dataKey="users" strokeWidth={2.5} stroke="var(--color-users)" dot={{ r: 4, fill: "var(--color-users)", strokeWidth:0 }} activeDot={{ r: 6, strokeWidth: 2, fill: "hsl(var(--background))", stroke: "var(--color-users)" }}/>
            </RechartsLineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 font-headline text-foreground flex items-center">
            <LayoutGrid className="mr-3 h-7 w-7 text-primary" />
            Management Sections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
                {label: "User Management", href: "/admin/users", icon: Users, description: "Manage all platform users and roles.", color: "primary"},
                {label: "Course Management", href: "/admin/courses", icon: BookOpen, description: "Oversee all courses, categories, and content.", color: "primary"},
                {label: "Review Moderation", href: "/admin/reviews", icon: MessageSquare, description: "Approve or reject user-submitted reviews.", color: "primary"},
                {label: "Financials", href: "/admin/payments", icon: DollarSign, description: "Track revenue, payouts, and transactions.", color: "success"},
                {label: "Content Editor", href: "/admin/content", icon: Edit3, description: "Update static pages, FAQs, and banners.", color: "accent"},
                {label: "System Analytics", href: "/admin/analytics", icon: TrendingUp, description: "View platform-wide analytics (Coming Soon).", disabled: true, color: "accent"},
                {label: "Theme Settings", href: "/admin/settings?tab=theme", icon: Palette, description: "Customize platform look and feel.", color: "accent"},
                {label: "Platform Settings", href: "/admin/settings", icon: SettingsIcon, description: "Configure core platform functionalities.", color: "muted"},
            ].map(link => (
                 <Card key={link.href} className={`shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card border-l-4 border-${link.color} hover:border-${link.color}/70`}>
                    <CardHeader className="flex-row items-center gap-4 pb-3">
                        <div className={`p-2.5 bg-${link.color}/10 rounded-md`}>
                            <link.icon className={`h-6 w-6 text-${link.color}`}/>
                        </div>
                        <CardTitle className="text-md font-semibold leading-tight text-foreground">{link.label}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 pb-4">
                       <p className="text-xs text-muted-foreground h-10 line-clamp-2">{link.description}</p>
                    </CardContent>
                    <CardFooter>
                        <Button 
                            variant={link.disabled ? "outline" : "default"} 
                            size="sm" 
                            asChild 
                            className={`w-full ${!link.disabled ? `bg-${link.color} hover:bg-${link.color}/90 text-${link.color}-foreground` : 'text-muted-foreground'}`} 
                            disabled={link.disabled}
                        >
                            <Link href={link.disabled ? "#" : link.href}>
                                {link.disabled ? 'Coming Soon' : `Go to ${link.label.split(' ')[0]}`}
                                {!link.disabled && <ArrowRight className="ml-auto h-4 w-4"/>}
                            </Link>
                        </Button>
                    </CardFooter>
                 </Card>
            ))}
        </div>
      </section>
    </div>
  );
}
