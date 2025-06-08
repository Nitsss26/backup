
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, MessageSquare, DollarSign, CheckCircle, AlertTriangle, Hourglass, ArrowRight, Settings as SettingsIcon, Eye, BarChart3 as BarChartIcon, Edit3, ListChecks, ShieldAlert, FileQuestion, Palette, ShieldCheck, ShieldQuestion, CalendarDays, LogOut, Sun, Moon, Menu, X } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// Mock data
const placeholderUsers = [
  { id: 1, name: 'Admin User', role: 'admin' },
  { id: 2, name: 'John Seller', role: 'provider', verificationStatus: 'pending' },
  { id: 3, name: 'Jane Student', role: 'student' },
  { id: 4, name: 'Bob Provider', role: 'provider', verificationStatus: 'verified' },
  { id: 5, name: 'Alice Learner', role: 'student' },
];

const placeholderCourses = [
  { id: 1, title: 'React Basics', approvalStatus: 'approved' },
  { id: 2, title: 'Advanced JavaScript', approvalStatus: 'pending' },
  { id: 3, title: 'Node.js Fundamentals', approvalStatus: 'approved' },
];

const placeholderOrders = [
  { id: 1, totalAmount: 50000, status: 'completed' },
  { id: 2, totalAmount: 75000, status: 'completed' },
  { id: 3, totalAmount: 30000, status: 'pending' },
];

const placeholderReviews = [
  { id: 1, moderationStatus: 'pending' },
  { id: 2, moderationStatus: 'approved' },
  { id: 3, moderationStatus: 'pending' },
];

const monthlyData = [
  { month: 'Jan', revenue: 240000, users: 100, profit: 48000 },
  { month: 'Feb', revenue: 139800, users: 120, profit: -20000 },
  { month: 'Mar', revenue: 980000, users: 150, profit: 196000 },
  { month: 'Apr', revenue: 390800, users: 130, profit: 78160 },
  { month: 'May', revenue: 480000, users: 180, profit: 96000 },
  { month: 'Jun', revenue: 380000, users: 200, profit: 76000 },
];

export default function AdminDashboardPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalUsers = placeholderUsers.length;
  const totalSellers = placeholderUsers.filter(u => u.role === 'provider').length;
  const totalStudents = placeholderUsers.filter(u => u.role === 'student').length;
  const totalCourses = placeholderCourses.length;
  const pendingSellerVerifications = placeholderUsers.filter(u => u.role === 'provider' && u.verificationStatus === 'pending').length;
  const pendingCourseApprovals = placeholderCourses.filter(c => c.approvalStatus === 'pending').length;
  const totalRevenue = placeholderOrders.filter(o => o.status === 'completed').reduce((sum, order) => sum + order.totalAmount, 0);
  const reportedContentCount = placeholderReviews.filter(r => r.moderationStatus === 'pending').length;

  const quickStats = [
    { 
      title: "Total Users", 
      value: totalUsers.toLocaleString(), 
      icon: Users, 
      color: "text-blue-600 dark:text-blue-400", 
      bgColor: "bg-blue-50 dark:bg-blue-900/20", 
      borderColor: "border-l-blue-500",
      change: "+12%"
    },
    { 
      title: "Total Courses", 
      value: totalCourses.toLocaleString(), 
      icon: BookOpen, 
      color: "text-purple-600 dark:text-purple-400", 
      bgColor: "bg-purple-50 dark:bg-purple-900/20", 
      borderColor: "border-l-purple-500",
      change: "+8%"
    },
    { 
      title: "Total Revenue", 
      value: `₹${totalRevenue.toLocaleString('en-IN')}`, 
      icon: DollarSign, 
      color: "text-green-600 dark:text-green-400", 
      bgColor: "bg-green-50 dark:bg-green-900/20", 
      borderColor: "border-l-green-500",
      change: "+15%"
    },
    { 
      title: "Pending Reviews", 
      value: pendingSellerVerifications.toLocaleString(), 
      icon: ShieldQuestion, 
      color: "text-orange-600 dark:text-orange-400", 
      bgColor: "bg-orange-50 dark:bg-orange-900/20", 
      borderColor: "border-l-orange-500",
      change: "-5%"
    },
  ];

  const actionItems = [
    { 
      title: "Seller Verifications", 
      value: pendingSellerVerifications, 
      icon: ShieldCheck, 
      description: "Review new seller applications and credentials.", 
      iconColor: "text-emerald-600 dark:text-emerald-400",
      bgGradient: "bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=200&fit=crop&crop=center"
    },
    { 
      title: "Course Approvals", 
      value: pendingCourseApprovals, 
      icon: ListChecks, 
      description: "Review and approve new course submissions.", 
      iconColor: "text-indigo-600 dark:text-indigo-400",
      bgGradient: "bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop&crop=center"
    },
    { 
      title: "Review Moderation", 
      value: reportedContentCount, 
      icon: Eye, 
      description: "Moderate user reviews and reported content.", 
      iconColor: "text-cyan-600 dark:text-cyan-400",
      bgGradient: "bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop&crop=center"
    }
  ];

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    alert('Logout functionality would be implemented here');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <BarChartIcon className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              
              <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {placeholderUsers.find(u => u.role === 'admin')?.name || 'Admin'}
                </span>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl shadow-2xl">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 px-8 py-12 sm:px-12 sm:py-16">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
                  Welcome Back, Admin! 👋
                </h1>
                <p className="text-xl text-blue-100 mb-6 leading-relaxed">
                  Manage your platform with powerful tools and real-time insights. 
                  Monitor users, courses, and revenue all in one place.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30">
                    <div className="text-2xl font-bold">
                      {totalUsers}
                    </div>
                    <div className="text-sm text-blue-100">Active Users</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30">
                    <div className="text-2xl font-bold">
                      ₹{(totalRevenue/1000).toFixed(0)}K
                    </div>
                    <div className="text-sm text-blue-100">Revenue</div>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center" 
                  alt="Dashboard Analytics" 
                  className="rounded-xl shadow-2xl w-full h-80 object-cover border-4 border-white/20"
                />
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl"></div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <Card key={stat.title} className={`${stat.bgColor} ${stat.borderColor} border-l-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className={`text-sm font-medium ${stat.color}`}>{stat.title}</CardTitle>
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                <div className={`text-sm font-medium ${stat.change?.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last month
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Action Items */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white flex items-center">
            <AlertTriangle className="w-8 h-8 text-orange-500 mr-3" />
            Action Required
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {actionItems.map((action, index) => (
              <Card key={action.title} className={`${action.bgGradient} shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 overflow-hidden`}>
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={action.image} 
                    alt={action.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-3">
                    <action.icon className={`h-8 w-8 ${action.iconColor}`} />
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-4xl font-bold">{action.value}</div>
                    <div className="text-sm opacity-90">Pending</div>
                  </div>
                </div>
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">{action.title}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {action.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button className={`w-full ${action.iconColor.replace('text-', 'bg-').replace('dark:text-', 'dark:bg-')} hover:opacity-90 text-white font-semibold`}>
                    Review Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Analytics Chart */}
        <Card className="shadow-xl border-0 bg-white dark:bg-gray-800 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-b dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                  <BarChartIcon className="w-7 h-7 text-blue-500 mr-3" />
                  Platform Analytics
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300 mt-1">
                  Revenue trends and user growth over the past 6 months
                </CardDescription>
              </div>
              <div className="flex space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-300">Profit</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-300">Revenue</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-300">Users</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  dataKey="month" 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: isDarkMode ? '#9ca3af' : '#6b7280' }}
                />
                <YAxis 
                  yAxisId="left" 
                  orientation="left" 
                  tickFormatter={(value) => `₹${value/1000}k`}
                  tick={{ fill: isDarkMode ? '#9ca3af' : '#6b7280' }}
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  tick={{ fill: isDarkMode ? '#9ca3af' : '#6b7280' }}
                  tickLine={false} 
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDarkMode ? '#374151' : '#ffffff',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    color: isDarkMode ? '#ffffff' : '#000000'
                  }}
                  formatter={(value, name) => [
                    name === 'revenue' || name === 'profit' ? `₹${Number(value).toLocaleString('en-IN')}` : value,
                    name === 'revenue' ? 'Revenue' : name === 'profit' ? 'Profit' : 'New Users'
                  ]}
                />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 6 }} 
                  activeDot={{ r: 8, fill: '#3b82f6' }}
                />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 6 }} 
                  activeDot={{ r: 8, fill: '#10b981' }}
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', r: 6 }} 
                  activeDot={{ r: 8, fill: '#8b5cf6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white flex items-center">
            <SettingsIcon className="w-8 h-8 text-blue-500 mr-3" />
            Quick Access
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              {label: "User Management", icon: Users, description: "Manage all platform users and roles.", color: "blue", disabled: false},
              {label: "Course Catalog", icon: BookOpen, description: "Oversee courses and content.", color: "purple", disabled: false},
              {label: "Review Moderation", icon: MessageSquare, description: "Moderate user reviews.", color: "green", disabled: false},
              {label: "Financial Reports", icon: DollarSign, description: "Track revenue and transactions.", color: "emerald", disabled: false},
              {label: "Content Editor", icon: Edit3, description: "Update pages and content.", color: "orange", disabled: false},
              {label: "Analytics", icon: BarChartIcon, description: "View detailed analytics.", color: "pink", disabled: true},
              {label: "Theme Settings", icon: Palette, description: "Customize appearance.", color: "indigo", disabled: false},
              {label: "System Settings", icon: SettingsIcon, description: "Configure platform.", color: "gray", disabled: false},
            ].map((link, index) => (
              <Card key={index} className={`shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${link.disabled ? 'opacity-60' : ''} bg-white dark:bg-gray-800 border-0`}>
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto p-4 rounded-full bg-${link.color}-100 dark:bg-${link.color}-900/30 mb-4 w-fit`}>
                    <link.icon className={`h-8 w-8 text-${link.color}-600 dark:text-${link.color}-400`}/>
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">{link.label}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{link.description}</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant={link.disabled ? "outline" : "default"} 
                    size="sm" 
                    className={`w-full ${!link.disabled ? `bg-${link.color}-600 hover:bg-${link.color}-700 text-white` : ''}`}
                    disabled={link.disabled}
                  >
                    {link.disabled ? 'Coming Soon' : `Open ${link.label.split(' ')[0]}`}
                    {!link.disabled && <ArrowRight className="ml-2 h-4 w-4"/>}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

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
//     { title: "Seller Verifications", value: pendingSellerVerifications, icon: ShieldCheck, link: "/admin/users?filter=pending_verification", description: "Review new seller applications.", imageHint: "admin verification checkmark user document", iconColor: "text-blue-600" },
//     { title: "Course Approvals", value: pendingCourseApprovals, icon: ListChecks, link: "/admin/courses?filter=pending_approval", description: "Moderate new course submissions.", imageHint: "admin course approval checklist document", iconColor: "text-blue-600" },
//     { title: "Review Moderation", value: placeholderReviews.filter(r => r.moderationStatus === 'pending').length, icon: Eye, link: "/admin/reviews?filter=pending", description: "Manage user-submitted reviews.", imageHint: "admin review moderation eye content", iconColor: "text-blue-600" }
//   ];

//   return (
//     <div className="space-y-8">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-card rounded-lg shadow border-l-4 border-primary">
//         <div>
//             <h1 className="text-3xl font-bold font-headline text-primary">Admin Dashboard</h1>
//             <p className="text-muted-foreground mt-1">Welcome, {placeholderUsers.find(u=>u.role==='admin')?.name || 'Admin'}! Overview of platform activity.</p>
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
      
//       <section>
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
//       </section>

//       <Card className="shadow-lg border bg-card">
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
//       </Card>

//       <section>
//         <h2 className="text-2xl font-semibold mb-6 font-headline text-foreground">Quick Links</h2>
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//             {[
//                 {label: "User Management", href: "/admin/users", icon: Users, description: "Manage all platform users and roles."},
//                 {label: "Course Catalog", href: "/admin/courses", icon: BookOpen, description: "Oversee all courses, categories, and content."},
//                 {label: "Review Moderation", href: "/admin/reviews", icon: MessageSquare, description: "Approve or reject user-submitted reviews."},
//                 {label: "Financial Reports", href: "/admin/payments", icon: DollarSign, description: "Track revenue, payouts, and transactions."},
//                 {label: "Site Content Editor", href: "/admin/content", icon: Edit3, description: "Update static pages, FAQs, and banners."},
//                 {label: "System Analytics", href: "/admin/analytics", icon: BarChartIcon, description: "View platform-wide analytics (Coming Soon).", disabled: true},
//                 {label: "Theme & Appearance", href: "/admin/settings?tab=theme", icon: Palette, description: "Customize platform look and feel."},
//                 {label: "Platform Settings", href: "/admin/settings", icon: SettingsIcon, description: "Configure core platform functionalities."},
//             ].map(link => (
//                  <Card key={link.href} className="shadow-md hover:shadow-lg transition-shadow bg-card">
//                     <CardHeader className="flex-row items-center gap-4 pb-3">
//                         <div className="p-2.5 bg-primary/10 rounded-md">
//                             <link.icon className="h-6 w-6 text-primary"/>
//                         </div>
//                         <CardTitle className="text-md font-semibold leading-tight">{link.label}</CardTitle>
//                     </CardHeader>
//                     <CardContent className="pt-0 pb-4">
//                        <p className="text-xs text-muted-foreground h-10">{link.description}</p>
//                     </CardContent>
//                     <CardFooter>
//                         <Button variant="outline" size="sm" asChild className="w-full" disabled={link.disabled}>
//                             <Link href={link.disabled ? "#" : link.href}>Go to {link.label.split(' ')[0]} <ArrowRight className="ml-auto h-4 w-4"/></Link>
//                         </Button>
//                     </CardFooter>
//                  </Card>
//             ))}
//         </div>
//       </section>
//     </div>
//   );
// }
