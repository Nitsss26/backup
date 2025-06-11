// "use client";

// import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { placeholderUsers, placeholderCourses, placeholderReviews, placeholderOrders } from "@/lib/placeholder-data";
// import { Users, BookOpen, MessageSquare, DollarSign, CheckCircle, AlertTriangle, Hourglass, ArrowRight, Settings as SettingsIcon, Eye, BarChart3 as BarChartIcon, Edit3, ListChecks, ShieldAlert, FileQuestion, Palette, ShieldCheck, ShieldQuestion, CalendarDays } from "lucide-react";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
// import Image from "next/image";

// const chartConfig = {
//   revenue: { label: "Revenue (₹)", color: "hsl(var(--primary))" },
//   users: { label: "New Users", color: "hsl(var(--accent))" },
// };

// const monthlyData = [
//   { month: 'Jan', revenue: 240000, users: 100 },
//   { month: 'Feb', revenue: 139800, users: 120 },
//   { month: 'Mar', revenue: 980000, users: 150 },
//   { month: 'Apr', revenue: 390800, users: 130 },
//   { month: 'May', revenue: 480000, users: 180 },
//   { month: 'Jun', revenue: 380000, users: 200 },
// ];

// export default function AdminDashboardPage() {
//   const totalUsers = placeholderUsers.length;
//   const totalSellers = placeholderUsers.filter(u => u.role === 'provider').length;
//   const totalStudents = placeholderUsers.filter(u => u.role === 'student').length;
//   const totalCourses = placeholderCourses.length;
//   const pendingSellerVerifications = placeholderUsers.filter(u => u.role === 'provider' && u.verificationStatus === 'pending').length;
//   const pendingCourseApprovals = placeholderCourses.filter(c => c.approvalStatus === 'pending').length;
//   const totalRevenue = placeholderOrders.filter(o => o.status === 'completed').reduce((sum, order) => sum + order.totalAmount, 0);
//   const reportedContentCount = placeholderReviews.filter(r => r.moderationStatus === 'pending').length; 

//   const quickStats = [
//     { title: "Total Users", value: totalUsers.toLocaleString(), icon: Users, color: "text-blue-600", bgColor: "bg-blue-50 dark:bg-blue-900/20", href: "/admin/users", borderColor: "border-primary" },
//     { title: "Total Courses", value: totalCourses.toLocaleString(), icon: BookOpen, color: "text-yellow-500", bgColor: "bg-yellow/5 ", href: "/admin/courses", borderColor: "border-yellow-600" },
//     { title: "Total Revenue", value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: DollarSign, color: "text-green-600", bgColor: "bg-green-50 dark:bg-green-900/20", href: "/admin/payments", borderColor: "border-green-600" }, // Green for revenue is acceptable
//     { title: "Pending Verifications", value: pendingSellerVerifications.toLocaleString(), icon: ShieldQuestion, color: "text-orange-600", bgColor: "bg-info/10", href: "/admin/users?filter=pending_verification", borderColor: "border-red-600"},
//   ];

//   const actionItems = [
//     { title: "Seller Verifications", value: pendingSellerVerifications, icon: ShieldCheck, link: "/admin/users?filter=pending_verification", description: "Review new seller applications.", imageHint: "admin verification checkmark user document", iconColor: "text-indigo-300", img: "https://img.freepik.com/premium-vector/set-green-shield-with-white-checkmark-symbolizing-security-protection-verification_100456-19840.jpg" },
   
//     { title: "Review Moderation", value: placeholderReviews.filter(r => r.moderationStatus === 'pending').length, icon: Eye, link: "/admin/reviews?filter=pending", description: "Manage user-submitted reviews.", imageHint: "admin review moderation eye content", iconColor: "text-indigo-300",img:"https://img.freepik.com/premium-vector/rating-bubble-with-five-gold-stars-3d-icon-red-vote-satisfied-customers_92753-6770.jpg" },
//     { title: "Course Approvals", value: pendingCourseApprovals, icon: ListChecks, link: "/admin/courses?filter=pending_approval", description: "Moderate new course submissions.", imageHint: "admin course approval checklist document", iconColor: "text-indigo-300",img: "https://img.freepik.com/premium-vector/yellow-sign-that-says-check-your-finger-center_1305575-6742.jpg" },
//   ];

//   return (
//     <div className="space-y-8 p-16">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-card rounded-lg shadow border-l-4 border-primary">
//         <div>
//             <h1 className="text-3xl font-bold font-headline text-primary">  Admin Dashboard</h1>
//             <p className="text-lg mt-4">Welcome Back, {placeholderUsers.find(u=>u.role==='admin')?.name || 'Admin'}! 👋 Manage your learning platform with powerful insights and intuitive controls.</p>
//         </div>
//         <Image src="https://img.freepik.com/premium-vector/person-seated-workstation-with-laptop-ai-generated_520881-7744.jpg" alt="Admin Dashboard Illustration" width={300} height={150} className="rounded-md shadow-md object-cover mt-4 md:mt-0" data-ai-hint="admin dashboard charts graphs illustration"/>
//       </div>
      
//       <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {quickStats.map(stat => (
//           <Card key={stat.title} className={`shadow-lg hover:shadow-xl transition-shadow border-l-4 ${stat.borderColor} ${stat.bgColor}`}>
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//               <CardTitle className={`text-sm font-medium ${stat.color}`}>{stat.title}</CardTitle>
//               <stat.icon className={`h-6 w-6 ${stat.color}`} />
//             </CardHeader>
//             <CardContent>
//               <div className={`text-3xl font-bold text-foreground`}>{stat.value}</div>
//             </CardContent>
//             <CardFooter className="pt-0">
//                 <Button variant="link" size="sm" asChild className={`p-0 h-auto text-xs ${stat.color} hover:underline`}>
//                     <Link href={stat.href || "#"}>View Details <ArrowRight className="ml-1 h-3 w-3"/></Link>
//                 </Button>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>
      
//        <section>
//        <h2 className="text-2xl font-semibold mb-6 font-headline text-foreground">Key Action Items</h2>
//          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//            {actionItems.map((action) => (
//              <Card key={action.title} className={`${action.bgGradient} shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] border-0 overflow-hidden`}>
//                <CardHeader className="pb-3">
//                  <div className="flex items-center justify-between mb-3">
//                    <div className="bg-white/80 dark:bg-slate-800/60 p-2.5 rounded-full shadow-md">
//                      <action.icon className={`h-8 w-8 ${action.iconColor}`} />
//                    </div>
//                    <div className="text-right">
//                      <span className={`text-3xl font-bold ${action.iconColor}`}>{action.value}</span>
//                      <p className="text-xs text-muted-foreground">pending</p>
//                    </div>
//                  </div>
//                  <CardTitle className="text-lg font-bold text-foreground">{action.title}</CardTitle>
//                </CardHeader>
//                <CardContent className="space-y-3 pt-0">
//                  <Image 
//                    src={action.img} 
//                    alt={action.title} 
//                    width={400} 
//                    height={200} 
//                    className="w-full h-36 object-cover rounded-md shadow-sm"
//                    data-ai-hint={action.imageHint}
//                  />
//                  <CardDescription className="text-sm text-muted-foreground h-10">{action.description}</CardDescription>
//                </CardContent>
//                <CardFooter className="pt-2">
//                  <Button variant="default" asChild className="w-full bg-indigo-300">
//                    <Link href={action.link}>Take Action <ArrowRight className="ml-1.5 h-4 w-4"/></Link>
//                  </Button>
//                </CardFooter>
//              </Card>
//            ))}
//          </div>
//        </section>


//       {/* <section>
//         <h2 className="text-2xl font-semibold mb-6 font-headline text-foreground">Key Action Items</h2>
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {actionItems.map(action => (
//                  <Card key={action.title} className="shadow-lg hover:shadow-xl transition-shadow border bg-card flex flex-col">
//                     <CardHeader className="pb-4">
//                          <div className="flex items-center justify-between mb-2">
//                             <action.icon className={`h-10 w-10 ${action.iconColor || 'text-primary'}`} />
//                             <span className={`text-4xl font-bold ${action.iconColor || 'text-primary'}`}>{action.value}</span>
//                          </div>
//                          <CardTitle className="text-lg font-semibold">{action.title}</CardTitle>
//                          <CardDescription className="text-xs h-8">{action.description}</CardDescription>
//                     </CardHeader>
//                     <CardContent className="flex-grow">
//                        <Image src={`https://img.freepik.com/premium-vector/security-icon-with-3d-composition-profile-page-with-shield-magnifying-glass_348818-63.jpg`} alt={action.title} width={300} height={150} className="rounded-md object-cover w-full h-32 mb-4" data-ai-hint={action.imageHint} />
//                     </CardContent>
//                     <CardFooter>
//                         <Button variant="default" asChild className="w-full">
//                             <Link href={action.link}>View Details <ArrowRight className="ml-1 h-4 w-4"/></Link>
//                         </Button>
//                     </CardFooter>
//                 </Card>
//             ))}
//         </div>
//       </section> */}

// <Card className="shadow-lg border bg-card">
//   <CardHeader>
//     <CardTitle className="font-headline text-xl">Platform Overview (Monthly)</CardTitle>
//     <CardDescription>Track key metrics like revenue and new user registration over time.</CardDescription>
//   </CardHeader>
//   <CardContent>
//     <ChartContainer config={chartConfig} className="h-[350px] w-full">
//       <LineChart data={monthlyData}>
//         <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))"/>
//         <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />
//         <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" tickFormatter={(value) => `₹${value/1000}k`} tickLine={false} axisLine={false} tickMargin={10} />
//         <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--accent))" tickLine={false} axisLine={false} tickMargin={10} />
//         <ChartTooltip content={<ChartTooltipContent formatter={(value, name) => name === 'revenue' ? `₹${Number(value).toLocaleString('en-IN')}` : value} />} />
//         <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2.5} dot={{r: 5, strokeWidth:1, fill: "hsl(var(--background))", stroke: "#22c55e" }} activeDot={{r:7, fill: "#22c55e" }} />
//         <Line yAxisId="right" type="monotone" dataKey="users" stroke="#eab308" strokeWidth={2.5} dot={{r: 5, strokeWidth:1, fill: "hsl(var(--background))", stroke: "#eab308" }} activeDot={{r:7, fill: "#eab308"}}/>
//       </LineChart>
//     </ChartContainer>
//   </CardContent>
// </Card>
//       {/* <Card className="shadow-lg border bg-card">
//         <CardHeader>
//           <CardTitle className="font-headline text-xl">Platform Overview (Monthly)</CardTitle>
//           <CardDescription>Track key metrics like revenue and new user registration over time.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <ChartContainer config={chartConfig} className="h-[350px] w-full">
//             <LineChart data={monthlyData}>
//               <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))"/>
//               <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />
//               <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" tickFormatter={(value) => `₹${value/1000}k`} tickLine={false} axisLine={false} tickMargin={10} />
//               <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--accent))" tickLine={false} axisLine={false} tickMargin={10} />
//               <ChartTooltip content={<ChartTooltipContent formatter={(value, name) => name === 'revenue' ? `₹${Number(value).toLocaleString('en-IN')}` : value} />} />
//               <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2.5} dot={{r: 5, strokeWidth:1, fill: "hsl(var(--background))", stroke: "hsl(var(--primary))" }} activeDot={{r:7, fill: "hsl(var(--primary))" }} />
//               <Line yAxisId="right" type="monotone" dataKey="users" stroke="var(--color-users)" strokeWidth={2.5} dot={{r: 5, strokeWidth:1, fill: "hsl(var(--background))", stroke: "hsl(var(--accent))" }} activeDot={{r:7, fill: "hsl(var(--accent))"}}/>
//             </LineChart>
//           </ChartContainer>
//         </CardContent>
//       </Card> */}

// <section>
//   <h2 className="text-2xl font-semibold mb-6 font-headline text-foreground">Quick Links</h2>
//   <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//     {[
//       { label: "User Management", href: "/admin/users", icon: Users, description: "Manage all platform users and roles.", iconColor: "text-blue-600 dark:text-blue-400" },
//       { label: "Course Catalog", href: "/admin/courses", icon: BookOpen, description: "Oversee all courses, categories, and content.", iconColor: "text-yellow-600 dark:text-yellow-400" },
//       { label: "Review Moderation", href: "/admin/reviews", icon: MessageSquare, description: "Approve or reject user-submitted reviews.", iconColor: "text-purple-600 dark:text-purple-400" },
//       { label: "Financial Reports", href: "/admin/payments", icon: DollarSign, description: "Track revenue, payouts, and transactions.", iconColor: "text-green-600 dark:text-green-400" },
//       { label: "Site Content Editor", href: "/admin/content", icon: Edit3, description: "Update static pages, FAQs, and banners.", iconColor: "text-red-600 dark:text-red-400" },
//       { label: "System Analytics", href: "/admin/analytics", icon: BarChartIcon, description: "View platform-wide analytics (Coming Soon).", disabled: true, iconColor: "text-teal-600 dark:text-teal-400" },
//       { label: "Theme & Appearance", href: "/admin/settings?tab=theme", icon: Palette, description: "Customize platform look and feel.", iconColor: "text-pink-600 dark:text-pink-400" },
//       { label: "Platform Settings", href: "/admin/settings", icon: SettingsIcon, description: "Configure core platform functionalities.", iconColor: "text-indigo-600 dark:text-indigo-400" },
//     ].map(link => (
//       <Card key={link.href} className="shadow-md hover:shadow-lg transition-shadow bg-card">
//         <CardHeader className="flex-row items-center gap-4 pb-3">
//           <div className="p-2.5 bg-primary/10 rounded-md">
//             <link.icon className={`h-6 w-6 ${link.iconColor}`} />
//           </div>
//           <CardTitle className="text-md font-semibold leading-tight">{link.label}</CardTitle>
//         </CardHeader>
//         <CardContent className="pt-0 pb-4">
//           <p className="text-xs text-muted-foreground h-10">{link.description}</p>
//         </CardContent>
//         <CardFooter>
//           <Button variant="outline" size="sm" asChild className="w-full" disabled={link.disabled}>
//             <Link href={link.disabled ? "#" : link.href}>Go to {link.label.split(' ')[0]} <ArrowRight className="ml-auto h-4 w-4" /></Link>
//           </Button>
//         </CardFooter>
//       </Card>
//     ))}
//   </div>
// </section>
//     </div>
//   );
// }





// // "use client";

// // import React, { useState, useEffect } from 'react';
// // import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import Link from "next/link";
// // import { placeholderUsers, placeholderCourses, placeholderReviews, placeholderOrders } from "@/lib/placeholder-data";
// // import { Users, BookOpen, MessageSquare, DollarSign, ArrowRight, Settings as SettingsIcon, Eye, BarChart3 as BarChartIcon, Edit3, ListChecks, ShieldAlert, FileQuestion, Palette, ShieldCheck, ShieldQuestion, CalendarDays, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
// // import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
// // import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
// // import Image from "next/image";
// // import { useTheme } from 'next-themes';

// // const chartConfig = {
// //   revenue: { label: "Revenue (₹)", color: "hsl(var(--primary))" },
// //   profit: { label: "Profit (₹)", color: "hsl(var(--success))" },
// //   users: { label: "New Users", color: "hsl(var(--accent))" },
// // };

// // const monthlyData = [
// //   { month: 'Jan', revenue: 240000, users: 100, profit: 80000 },
// //   { month: 'Feb', revenue: 139800, users: 120, profit: 40000 },
// //   { month: 'Mar', revenue: 980000, users: 150, profit: 300000 },
// //   { month: 'Apr', revenue: 390800, users: 130, profit: 120000 },
// //   { month: 'May', revenue: 480000, users: 180, profit: 150000 },
// //   { month: 'Jun', revenue: 380000, users: 200, profit: 100000 },
// // ];

// // export default function AdminDashboardPage() {
// //   const { theme } = useTheme(); // For potential theme-specific image hints, though not directly used in this logic yet
// //   const [isClient, setIsClient] = useState(false);

// //   useEffect(() => {
// //     setIsClient(true);
// //   }, []);


// //   const totalUsers = placeholderUsers.length;
// //   const totalCourses = placeholderCourses.length;
// //   const pendingSellerVerifications = placeholderUsers.filter(u => u.role === 'provider' && u.verificationStatus === 'pending').length;
// //   const pendingCourseApprovals = placeholderCourses.filter(c => c.approvalStatus === 'pending').length;
// //   const totalRevenue = placeholderOrders.filter(o => o.status === 'completed').reduce((sum, order) => sum + order.totalAmount, 0);

// //   const quickStats = [
// //     { 
// //       title: "Total Users", 
// //       value: totalUsers.toLocaleString(), 
// //       icon: Users, 
// //       color: "text-primary", 
// //       bgColor: "bg-primary/10", 
// //       href: "/admin/users", 
// //       borderColor: "border-primary",
// //       trend: "+12%",
// //       trendIcon: TrendingUp,
// //       trendColor: "text-success"
// //     },
// //     { 
// //       title: "Total Courses", 
// //       value: totalCourses.toLocaleString(), 
// //       icon: BookOpen, 
// //       color: "text-purple-600 dark:text-purple-400", 
// //       bgColor: "bg-purple-50 dark:bg-purple-900/30", 
// //       href: "/admin/courses", 
// //       borderColor: "border-purple-500",
// //       trend: "+8%",
// //       trendIcon: TrendingUp,
// //       trendColor: "text-success"
// //     },
// //     { 
// //       title: "Total Revenue", 
// //       value: `₹${totalRevenue.toLocaleString('en-IN')}`, 
// //       icon: DollarSign, 
// //       color: "text-success", 
// //       bgColor: "bg-success/10", 
// //       href: "/admin/payments", 
// //       borderColor: "border-success",
// //       trend: "+25%",
// //       trendIcon: TrendingUp,
// //       trendColor: "text-success"
// //     },
// //     { 
// //       title: "Pending Verifications", 
// //       value: pendingSellerVerifications.toLocaleString(), 
// //       icon: ShieldQuestion, 
// //       color: "text-warning", 
// //       bgColor: "bg-warning/10", 
// //       href: "/admin/users?filter=pending_verification", 
// //       borderColor: "border-warning",
// //       trend: "-5%",
// //       trendIcon: TrendingDown,
// //       trendColor: "text-destructive"
// //     },
// //   ];

// //   const actionItems = [
// //     { 
// //       title: "Seller Verifications", 
// //       value: pendingSellerVerifications, 
// //       icon: ShieldCheck, 
// //       link: "/admin/users?filter=pending_verification", 
// //       description: "Review new seller applications and verify their credentials.", 
// //       iconColor: "text-emerald-600 dark:text-emerald-400",
// //       bgGradient: "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/40 dark:to-teal-900/40",
// //       imageHint: "admin user verification document checkmark professional"
// //     },
// //     { 
// //       title: "Course Approvals", 
// //       value: pendingCourseApprovals, 
// //       icon: ListChecks, 
// //       link: "/admin/courses?filter=pending_approval", 
// //       description: "Moderate and approve new course submissions from educators.", 
// //       iconColor: "text-indigo-600 dark:text-indigo-400",
// //       bgGradient: "bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/40 dark:to-blue-900/40",
// //       imageHint: "admin course approval checklist content professional"
// //     },
// //     { 
// //       title: "Review Moderation", 
// //       value: placeholderReviews.filter(r => r.moderationStatus === 'pending').length, 
// //       icon: Eye, 
// //       link: "/admin/reviews?filter=pending", 
// //       description: "Monitor and manage user-submitted reviews and feedback.", 
// //       iconColor: "text-rose-600 dark:text-rose-400",
// //       bgGradient: "bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/40 dark:to-pink-900/40",
// //       imageHint: "admin content moderation reviews feedback professional"
// //     }
// //   ];
  
// //   const managementTools = [
// //     {label: "User Management", href: "/admin/users", icon: Users, description: "Manage all platform users and roles.", color: "blue", iconColor: "text-blue-600 dark:text-blue-400", bgColor: "bg-blue-50 dark:bg-blue-900/40"},
// //     {label: "Course Catalog", href: "/admin/courses", icon: BookOpen, description: "Oversee all courses and content.", color: "purple", iconColor: "text-purple-600 dark:text-purple-400", bgColor: "bg-purple-50 dark:bg-purple-900/40"},
// //     {label: "Review Moderation", href: "/admin/reviews", icon: MessageSquare, description: "Approve or reject user reviews.", color: "rose", iconColor: "text-rose-600 dark:text-rose-400", bgColor: "bg-rose-50 dark:bg-rose-900/40"},
// //     {label: "Financial Reports", href: "/admin/payments", icon: DollarSign, description: "Track revenue and transactions.", color: "green", iconColor: "text-green-600 dark:text-green-400", bgColor: "bg-green-50 dark:bg-green-900/40"},
// //     {label: "Content Editor", href: "/admin/content", icon: Edit3, description: "Update pages and banners.", color: "amber", iconColor: "text-amber-600 dark:text-amber-400", bgColor: "bg-amber-50 dark:bg-amber-900/40"},
// //     {label: "System Analytics", href: "/admin/analytics", icon: BarChartIcon, description: "Platform-wide analytics.", color: "indigo", iconColor: "text-indigo-600 dark:text-indigo-400", bgColor: "bg-indigo-50 dark:bg-indigo-900/40", disabled: true},
// //     {label: "Theme Settings", href: "/admin/settings?tab=theme", icon: Palette, description: "Customize appearance.", color: "pink", iconColor: "text-pink-600 dark:text-pink-400", bgColor: "bg-pink-50 dark:bg-pink-900/40"},
// //     {label: "Platform Settings", href: "/admin/settings", icon: SettingsIcon, description: "Core configurations.", color: "gray", iconColor: "text-slate-600 dark:text-slate-400", bgColor: "bg-slate-50 dark:bg-slate-800/40"},
// //   ];

// //   if (!isClient) {
// //     return (
// //       <div className="flex items-center justify-center min-h-screen">
// //         <SettingsIcon className="h-12 w-12 animate-spin text-primary" />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="space-y-8">
// //       {/* Hero Section */}
// //       <div className="relative overflow-hidden bg-gradient-to-r from-primary via-blue-600 to-indigo-700 dark:from-primary/70 dark:via-blue-700/70 dark:to-indigo-800/70 rounded-xl shadow-xl">
// //         <div className="absolute inset-0 bg-black/10 dark:bg-black/20"></div>
// //         <div className="relative flex flex-col lg:flex-row items-center justify-between p-8 lg:p-10">
// //           <div className="text-white space-y-3 flex-1">
// //             <h1 className="text-3xl lg:text-4xl font-bold font-headline">
// //               Welcome Back, Admin! 👋
// //             </h1>
// //             <p className="text-lg lg:text-xl text-blue-100/90 max-w-2xl">
// //               Manage your learning platform with powerful insights and intuitive controls.
// //             </p>
// //             <div className="flex flex-wrap gap-3 mt-5">
// //               <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex items-center space-x-2.5">
// //                 <Users className="h-7 w-7 text-white" />
// //                 <div>
// //                   <p className="text-white font-semibold text-md">{totalUsers}</p>
// //                   <p className="text-blue-100 text-xs">Active Users</p>
// //                 </div>
// //               </div>
// //               <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex items-center space-x-2.5">
// //                 <BookOpen className="h-7 w-7 text-white" />
// //                 <div>
// //                   <p className="text-white font-semibold text-md">{totalCourses}</p>
// //                   <p className="text-blue-100 text-xs">Total Courses</p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //           <div className="flex-shrink-0 mt-6 lg:mt-0">
// //             <Image 
// //               src="https://placehold.co/500x300.png"
// //               alt="Admin Dashboard Analytics Illustration" 
// //               width={500}
// //               height={300}
// //               className="rounded-lg shadow-lg object-cover"
// //               data-ai-hint="admin dashboard professional data analytics interface dark theme"
// //             />
// //           </div>
// //         </div>
// //       </div>
      
// //       {/* Quick Stats Grid */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //         {quickStats.map(stat => (
// //           <Card key={stat.title} className={`border-l-4 ${stat.borderColor} shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${stat.bgColor}`}>
// //             <CardHeader className="flex flex-row items-center justify-between pb-2">
// //               <div className="space-y-0.5">
// //                 <CardTitle className={`text-sm font-medium ${stat.color}`}>{stat.title}</CardTitle>
// //                 <span className="text-3xl font-bold text-foreground">{stat.value}</span>
// //               </div>
// //               <div className={`p-2.5 rounded-full ${stat.bgColor}`}>
// //                 <stat.icon className={`h-7 w-7 ${stat.color}`} />
// //               </div>
// //             </CardHeader>
// //             <CardContent className="pt-1 pb-3">
// //               <div className="flex items-center space-x-1">
// //                 <stat.trendIcon className={`h-3.5 w-3.5 ${stat.trendColor}`} />
// //                 <span className={`text-xs font-medium ${stat.trendColor}`}>{stat.trend}</span>
// //                 <span className="text-xs text-muted-foreground">vs last month</span>
// //               </div>
// //             </CardContent>
// //             <CardFooter className="pt-0">
// //                 <Button variant="link" size="sm" asChild className={`p-0 h-auto text-xs ${stat.color} hover:underline`}>
// //                     <Link href={stat.href || "#"}>View Details <ArrowRight className="ml-1 h-3 w-3"/></Link>
// //                 </Button>
// //             </CardFooter>
// //           </Card>
// //         ))}
// //       </div>
      
// //       {/* Action Items */}
// //       <section>
// //         <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center">
// //           <AlertTriangle className="h-7 w-7 mr-2.5 text-orange-500 dark:text-orange-400" />
// //           Priority Actions
// //         </h2>
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {actionItems.map((action) => (
// //             <Card key={action.title} className={`${action.bgGradient} shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] border-0 overflow-hidden`}>
// //               <CardHeader className="pb-3">
// //                 <div className="flex items-center justify-between mb-3">
// //                   <div className="bg-white/80 dark:bg-slate-800/60 p-2.5 rounded-full shadow-md">
// //                     <action.icon className={`h-8 w-8 ${action.iconColor}`} />
// //                   </div>
// //                   <div className="text-right">
// //                     <span className={`text-3xl font-bold ${action.iconColor}`}>{action.value}</span>
// //                     <p className="text-xs text-muted-foreground">pending</p>
// //                   </div>
// //                 </div>
// //                 <CardTitle className="text-lg font-bold text-foreground">{action.title}</CardTitle>
// //               </CardHeader>
// //               <CardContent className="space-y-3 pt-0">
// //                 <Image 
// //                   src={`https://placehold.co/400x200.png`} 
// //                   alt={action.title} 
// //                   width={400} 
// //                   height={200} 
// //                   className="w-full h-36 object-cover rounded-md shadow-sm"
// //                   data-ai-hint={action.imageHint}
// //                 />
// //                 <CardDescription className="text-sm text-muted-foreground h-10">{action.description}</CardDescription>
// //               </CardContent>
// //               <CardFooter className="pt-2">
// //                 <Button asChild className={`w-full bg-gradient-to-r ${action.iconColor === 'text-emerald-600 dark:text-emerald-400' ? 'from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600' : action.iconColor === 'text-indigo-600 dark:text-indigo-400' ? 'from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600' : 'from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600'} text-white hover:opacity-95 transition-opacity`}>
// //                   <Link href={action.link}>Take Action <ArrowRight className="ml-1.5 h-4 w-4"/></Link>
// //                 </Button>
// //               </CardFooter>
// //             </Card>
// //           ))}
// //         </div>
// //       </section>

// //       {/* Analytics Chart */}
// //       <Card className="shadow-xl border-0 bg-card">
// //         <CardHeader className="pb-4">
// //           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
// //             <div>
// //               <CardTitle className="text-xl font-bold text-foreground flex items-center">
// //                 <BarChartIcon className="h-6 w-6 mr-2.5 text-primary" />
// //                 Platform Analytics
// //               </CardTitle>
// //               <CardDescription className="text-sm text-muted-foreground mt-1">
// //                 Key metrics over the last 6 months
// //               </CardDescription>
// //             </div>
// //             <div className="flex space-x-3 mt-3 sm:mt-0 text-xs">
// //               <div className="flex items-center space-x-1.5">
// //                 <div className="w-2.5 h-2.5 bg-[hsl(var(--primary))] rounded-full"></div>
// //                 <span className="text-muted-foreground">Revenue</span>
// //               </div>
// //               <div className="flex items-center space-x-1.5">
// //                 <div className="w-2.5 h-2.5 bg-[hsl(var(--success))] rounded-full"></div>
// //                 <span className="text-muted-foreground">Profit</span>
// //               </div>
// //               <div className="flex items-center space-x-1.5">
// //                 <div className="w-2.5 h-2.5 bg-[hsl(var(--accent))] rounded-full"></div>
// //                 <span className="text-muted-foreground">Users</span>
// //               </div>
// //             </div>
// //           </div>
// //         </CardHeader>
// //         <CardContent>
// //           <ChartContainer config={chartConfig} className="h-[350px] w-full">
// //             <LineChart data={monthlyData}>
// //               <CartesianGrid vertical={false} stroke="hsl(var(--border))" strokeDasharray="3 3"/>
// //               <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
// //               <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" tickFormatter={(value) => `₹${Number(value/1000).toFixed(0)}k`} tickLine={false} axisLine={false} tickMargin={8} fontSize={12}/>
// //               <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--accent))" tickLine={false} axisLine={false} tickMargin={8} fontSize={12}/>
// //               <ChartTooltip 
// //                 content={<ChartTooltipContent 
// //                   formatter={(value, name) => (name === 'revenue' || name === 'profit') ? `₹${Number(value).toLocaleString('en-IN')}` : String(value)} 
// //                 />} 
// //               />
// //               <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2.5} dot={{r: 5, strokeWidth:1, fill: "hsl(var(--background))", stroke: "hsl(var(--primary))" }} activeDot={{r:7, fill: "hsl(var(--primary))" }} name="Revenue"/>
// //               <Line yAxisId="left" type="monotone" dataKey="profit" stroke="var(--color-profit)" strokeWidth={2.5} dot={{r: 5, strokeWidth:1, fill: "hsl(var(--background))", stroke: "hsl(var(--success))" }} activeDot={{r:7, fill: "hsl(var(--success))"}} name="Profit"/>
// //               <Line yAxisId="right" type="monotone" dataKey="users" stroke="var(--color-users)" strokeWidth={2.5} dot={{r: 5, strokeWidth:1, fill: "hsl(var(--background))", stroke: "hsl(var(--accent))" }} activeDot={{r:7, fill: "hsl(var(--accent))"}} name="New Users"/>
// //             </LineChart>
// //           </ChartContainer>
// //         </CardContent>
// //       </Card>

// //       {/* Quick Links */}
// //       <section>
// //         <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center">
// //           <SettingsIcon className="h-7 w-7 mr-2.5 text-muted-foreground" />
// //           Management Tools
// //         </h2>
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
// //           {managementTools.map(link => (
// //             <Card key={link.href} className={`${link.bgColor} shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.03] ${link.disabled ? 'opacity-60 cursor-not-allowed' : ''} border-0 flex flex-col`}>
// //               <CardHeader className="flex-row items-center gap-3 pb-2">
// //                 <div className={`p-2.5 rounded-lg ${link.bgColor === 'bg-slate-50 dark:bg-slate-800/40' ? 'bg-slate-100 dark:bg-slate-700/50' : `${link.color}-100 dark:${link.color}-800/30`}`}>
// //                   <link.icon className={`h-5 w-5 ${link.iconColor}`}/>
// //                 </div>
// //                 <CardTitle className="text-md font-semibold text-foreground leading-tight">{link.label}</CardTitle>
// //               </CardHeader>
// //               <CardContent className="pt-1 pb-3 flex-grow">
// //                 <p className="text-xs text-muted-foreground h-10">{link.description}</p>
// //               </CardContent>
// //               <CardFooter className="pt-2">
// //                 <Button 
// //                   variant="outline" 
// //                   size="sm" 
// //                   asChild={!link.disabled}
// //                   className={`w-full ${link.iconColor} border-${link.color}-300 dark:border-${link.color}-700 hover:bg-${link.color}-100/50 dark:hover:bg-${link.color}-800/50 ${link.disabled ? 'pointer-events-none' : ''}`} 
// //                   disabled={link.disabled}
// //                 >
// //                   {link.disabled ? 
// //                     <span>Coming Soon</span> : 
// //                     <Link href={link.href}>
// //                       Open {link.label.split(' ')[0]} <ArrowRight className="ml-auto h-3.5 w-3.5"/>
// //                     </Link>
// //                   }
// //                 </Button>
// //               </CardFooter>
// //             </Card>
// //           ))}
// //         </div>
// //       </section>
// //     </div>
// //   );
// // }



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
    { title: "Review Moderation", value: placeholderReviews.filter(r => r.moderationStatus === 'pending').length, icon: Eye, link: "/admin/reviews?filter=pending", description: "Manage user-submitted reviews.", imageHint: "admin review moderation eye content", iconColor: "text-indigo-300", img:"https://img.freepik.com/premium-vector/rating-bubble-with-five-gold-stars-3d-icon-red-vote-satisfied-customers_92753-6770.jpg" },
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
            { label: "System Analytics", href: "/admin/analytics", icon: BarChartIcon, description: "View platform-wide analytics (Coming Soon).", disabled: true, iconColor: "text-teal-600 dark:text-teal-400" },
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