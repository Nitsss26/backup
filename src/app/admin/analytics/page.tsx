
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart3, Users, Eye, ShoppingCart, UserCheck, UserPlus } from "lucide-react";
import Image from "next/image";

// This is a placeholder page for Admin Analytics.
// Actual data fetching and chart implementations will be done in subsequent steps.

export default function AdminAnalyticsPage() {
  const analyticsHighlights = [
    { title: "Total Site Visits (Last 30d)", value: "12,345", icon: BarChart3, trend: "+15%", color: "text-primary", bgColor: "bg-primary/10" },
    { title: "Unique Visitors (Last 30d)", value: "8,765", icon: Users, trend: "+12%", color: "text-accent", bgColor: "bg-accent/10" },
    { title: "Total Course Views (Last 30d)", value: "45,678", icon: Eye, trend: "+20%", color: "text-green-600", bgColor: "bg-green-600/10" },
    { title: "Successful Checkouts (Last 30d)", value: "1,234", icon: ShoppingCart, trend: "+8%", color: "text-orange-600", bgColor: "bg-orange-600/10" },
    { title: "New Signups (Last 30d)", value: "567", icon: UserPlus, trend: "+10%", color: "text-purple-600", bgColor: "bg-purple-600/10" },
    { title: "Active Users (Last 30d)", value: "3,456", icon: UserCheck, trend: "+5%", color: "text-teal-600", bgColor: "bg-teal-600/10" },
  ];

  return (
    <div className="space-y-8 p-2 md:p-0 max-w-screen-xl mx-auto"> {/* Added max-w and mx-auto */}
      <Card className="shadow-xl border-l-4 border-primary">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-md">
            <BarChart3 className="h-8 w-8 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl font-headline text-primary">Platform Analytics Overview</CardTitle>
            <CardDescription>Track website traffic, user engagement, course interactions, and sales metrics.</CardDescription>
          </div>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {analyticsHighlights.map(stat => (
          <Card key={stat.title} className={`shadow-md border-l-4 border-[${stat.color.replace('text-', '')}] ${stat.bgColor.replace('bg-', 'bg-')}`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className={`text-sm font-medium ${stat.color}`}>{stat.title}</CardTitle>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold text-foreground`}>{stat.value}</div>
              <p className={`text-xs text-muted-foreground`}>{stat.trend} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-lg border bg-card">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Detailed Reports (Coming Soon)</CardTitle>
          <CardDescription>
            This section will feature detailed reports and visualizations for visitor trends, course popularity,
            user activity funnels (signup, login, checkout), and more.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          <Image 
            src="https://placehold.co/600x350/EBF4FF/3B82F6?text=Analytics+Charts+Placeholder" 
            alt="Analytics charts placeholder" 
            width={600} 
            height={350}
            className="mx-auto rounded-lg shadow-md"
            data-ai-hint="data charts graphs analytics dashboard interface"
          />
          <p className="mt-6 text-muted-foreground">
            Detailed charts and data tables are under development.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
