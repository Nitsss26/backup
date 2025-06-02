"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { DollarSign, Users, BookOpen, TrendingUp, Star, CalendarDays } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { DateRangePicker } from '@/components/ui/date-range-picker'; // Assuming this exists
import { useState } from "react";
import { Button } from "@/components/ui/button";

// Mock data
const revenueData = [
  { name: 'Jan', revenue: 4000, expenses: 2400 }, { name: 'Feb', revenue: 3000, expenses: 1398 },
  { name: 'Mar', revenue: 2000, expenses: 9800 }, { name: 'Apr', revenue: 2780, expenses: 3908 },
  { name: 'May', revenue: 1890, expenses: 4800 }, { name: 'Jun', revenue: 2390, expenses: 3800 },
  { name: 'Jul', revenue: 3490, expenses: 4300 },
];
const revenueChartConfig = { revenue: { label: "Revenue", color: "hsl(var(--primary))" }, expenses: { label: "Expenses", color: "hsl(var(--muted))" } };

const topCoursesData = [
  { name: 'React Fundamentals', students: 1200, revenue: 24000 },
  { name: 'Node.js Masterclass', students: 950, revenue: 19000 },
  { name: 'Python for Data Science', students: 800, revenue: 16000 },
  { name: 'UX Design Principles', students: 750, revenue: 15000 },
  { name: 'Digital Marketing Pro', students: 600, revenue: 12000 },
];
const topCoursesChartConfig = { students: { label: "Students", color: "hsl(var(--chart-1))" } };


const enrollmentTrendData = Array.from({ length: 30 }, (_, i) => ({
  day: `Day ${i + 1}`,
  enrollments: Math.floor(Math.random() * 20) + 5,
}));
const enrollmentTrendChartConfig = { enrollments: { label: "Enrollments", color: "hsl(var(--chart-2))" } };

const ratingDistributionData = [
  { name: '5 Stars', value: 400 }, { name: '4 Stars', value: 300 },
  { name: '3 Stars', value: 200 }, { name: '2 Stars', value: 100 },
  { name: '1 Star', value: 50 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4545'];


export default function SellerAnalyticsPage() {
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold font-headline">Course Analytics</h1>
        {/* DateRangePicker is a common component, assuming it's available or would be created */}
        {/* <DateRangePicker date={dateRange} onDateChange={setDateRange} /> */}
         <Button variant="outline" className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4"/>
          <span>Last 30 Days</span> {/* Placeholder for actual DateRangePicker */}
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Revenue", value: "$45,231.89", change: "+20.1%", icon: DollarSign, desc: "from last month" },
          { title: "New Enrollments", value: "+1,234", change: "+180.1%", icon: Users, desc: "this month" },
          { title: "Average Rating", value: "4.75", change: "+0.2", icon: Star, desc: "overall" },
          { title: "Courses Published", value: "12", change: "+2", icon: BookOpen, desc: "this quarter" },
        ].map(stat => (
          <Card key={stat.title} className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>{stat.change}</span> {stat.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="shadow-md xl:col-span-1">
          <CardHeader>
            <CardTitle className="font-headline">Revenue & Expenses Overview</CardTitle>
            <CardDescription>Monthly financial performance.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={revenueChartConfig} className="h-[350px] w-full">
              <BarChart data={revenueData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} tickMargin={10} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                <Legend />
                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
                <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card className="shadow-md xl:col-span-1">
          <CardHeader>
            <CardTitle className="font-headline">Daily Enrollment Trend</CardTitle>
            <CardDescription>Enrollments over the selected period.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={enrollmentTrendChartConfig} className="h-[350px] w-full">
              <LineChart data={enrollmentTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} tickMargin={10} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="enrollments" stroke="var(--color-enrollments)" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-md">
          <CardHeader>
            <CardTitle className="font-headline">Top Performing Courses</CardTitle>
            <CardDescription>Based on student enrollment.</CardDescription>
          </CardHeader>
          <CardContent>
             <ChartContainer config={topCoursesChartConfig} className="h-[300px] w-full">
                <BarChart data={topCoursesData} layout="vertical" margin={{ left: 20, right:20 }}>
                    <CartesianGrid horizontal={false} />
                    <XAxis type="number" tickLine={false} axisLine={false} />
                    <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} width={150} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="students" fill="var(--color-students)" radius={4} />
                </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="font-headline">Rating Distribution</CardTitle>
            <CardDescription>Overall student satisfaction.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <ChartContainer config={{}} className="h-[300px] w-full aspect-square">
                <PieChart>
                    <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                    <Pie data={ratingDistributionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                        {ratingDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
