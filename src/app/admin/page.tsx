
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { placeholderUsers, placeholderCourses, placeholderReviews, placeholderOrders } from "@/lib/placeholder-data";
import { Users, BookOpen, MessageSquare, DollarSign, CheckCircle, AlertTriangle, Hourglass, ArrowRight, Settings as SettingsIcon } from "lucide-react"; // Renamed Settings to SettingsIcon to avoid conflict
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'; // Added ChartTooltip

const chartConfig = {
  revenue: { label: "Revenue", color: "hsl(var(--primary))" },
  users: { label: "New Users", color: "hsl(var(--accent))" },
};

const monthlyData = [
  { month: 'Jan', revenue: 2400, users: 100 },
  { month: 'Feb', revenue: 1398, users: 120 },
  { month: 'Mar', revenue: 9800, users: 150 },
  { month: 'Apr', revenue: 3908, users: 130 },
  { month: 'May', revenue: 4800, users: 180 },
  { month: 'Jun', revenue: 3800, users: 200 },
];

export default function AdminDashboardPage() {
  const totalUsers = placeholderUsers.length;
  const totalCourses = placeholderCourses.length;
  const pendingSellerVerifications = placeholderUsers.filter(u => u.role === 'provider' && u.verificationStatus === 'pending').length;
  const pendingCourseApprovals = placeholderCourses.filter(c => c.approvalStatus === 'pending').length;
  const totalRevenue = placeholderOrders.filter(o => o.status === 'completed').reduce((sum, order) => sum + order.totalAmount, 0);

  const quickStats = [
    { title: "Total Users", value: totalUsers.toLocaleString(), icon: Users, color: "text-blue-500", bgColor: "bg-blue-50" },
    { title: "Total Courses", value: totalCourses.toLocaleString(), icon: BookOpen, color: "text-green-500", bgColor: "bg-green-50" },
    { title: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-purple-500", bgColor: "bg-purple-50" },
  ];

  const pendingActions = [
    { title: "Seller Verifications", value: pendingSellerVerifications, icon: AlertTriangle, link: "/admin/users", color: "text-yellow-600", bgColor: "bg-yellow-50" },
    { title: "Course Approvals", value: pendingCourseApprovals, icon: Hourglass, link: "/admin/courses", color: "text-orange-500", bgColor: "bg-orange-50" },
    { title: "Review Moderation", value: placeholderReviews.filter(r => r.moderationStatus === 'pending').length, icon: MessageSquare, link: "/admin/reviews", color: "text-indigo-500", bgColor: "bg-indigo-50" }
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickStats.map(stat => (
          <Card key={stat.title} className={`shadow-md ${stat.bgColor} dark:${stat.bgColor?.replace('-50','-900/30')}`}>
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
            {pendingActions.map(action => (
                 <Card key={action.title} className={`shadow-md ${action.bgColor} dark:${action.bgColor?.replace('-50','-900/30')}`}>
                    <CardHeader className="pb-2">
                         <CardTitle className="text-lg font-medium flex items-center justify-between">
                            <span className={action.color}>{action.title}</span>
                            <action.icon className={`h-6 w-6 ${action.color}`} />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-foreground">{action.value}</div>
                        <Button variant="link" asChild className="p-0 h-auto mt-2 text-sm text-primary">
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
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <BarChart data={monthlyData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />
              <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" tickLine={false} axisLine={false} tickMargin={10} />
              <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--accent))" tickLine={false} axisLine={false} tickMargin={10} />
              <ChartTooltip content={<ChartTooltipContent />} />
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
                {label: "Review Moderation", href: "/admin/reviews", icon: MessageSquare},
                {label: "Platform Settings", href: "/admin/settings", icon: SettingsIcon },
            ].map(link => (
                 <Button key={link.href} variant="outline" size="lg" asChild className="justify-start text-base py-6">
                    <Link href={link.href}><link.icon className="mr-3 h-5 w-5"/>{link.label}</Link>
                </Button>
            ))}
        </div>
      </section>

    </div>
  );
}
