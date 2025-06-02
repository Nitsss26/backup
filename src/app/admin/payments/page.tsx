"use client";

import { useState, useEffect } from 'react';
import { placeholderOrders, placeholderUsers, placeholderCourses } from '@/lib/placeholder-data';
import type { Order } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Users, Download, Search, TrendingUp, AlertTriangle, CalendarDays } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Input } from '@/components/ui/input';

const chartConfig = { revenue: { label: "Revenue", color: "hsl(var(--primary))" } };
const monthlyRevenueData = [
  { month: 'Jan', revenue: 12000 }, { month: 'Feb', revenue: 18000 },
  { month: 'Mar', revenue: 15000 }, { month: 'Apr', revenue: 22000 },
  { month: 'May', revenue: 25000 }, { month: 'Jun', revenue: 30000 },
];

const platformCommissionRate = 0.15; // 15%

export default function AdminPaymentsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // In a real app, fetch orders from API
    setOrders(placeholderOrders);
  }, []);

  const completedOrders = orders.filter(o => o.status === 'completed');
  const totalPlatformRevenue = completedOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalPlatformEarnings = totalPlatformRevenue * platformCommissionRate;
  const totalSellerPayouts = totalPlatformRevenue * (1 - platformCommissionRate);

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.transactionId?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getStatusVariant = (status: Order['status']): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'completed': return 'default';
      case 'pending': return 'secondary';
      case 'failed': return 'destructive';
      case 'refunded': return 'outline';
      default: return 'secondary';
    }
  };
  const getStatusColorClass = (status: Order['status']): string => {
     switch (status) {
      case 'completed': return 'bg-green-500 hover:bg-green-600';
      case 'pending': return 'bg-yellow-500 hover:bg-yellow-600';
      default: return '';
    }
  };


  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold font-headline">Payments & Revenue</h1>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Export Financial Report
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Platform Revenue</CardTitle>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPlatformRevenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            <p className="text-xs text-muted-foreground">All-time gross revenue</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Platform Earnings (Net)</CardTitle>
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPlatformEarnings.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            <p className="text-xs text-muted-foreground">After seller payouts ({platformCommissionRate*100}%)</p>
          </CardContent>
        </Card>
         <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Seller Payouts</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSellerPayouts.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            <p className="text-xs text-muted-foreground">Paid or due to course providers</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="font-headline">Monthly Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <BarChart data={monthlyRevenueData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />
              <YAxis tickFormatter={(value) => `$${value/1000}k`} tickLine={false} axisLine={false} tickMargin={10} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
              <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="font-headline">Transaction History</CardTitle>
          <CardDescription>Review all transactions and payout statuses.</CardDescription>
            <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                placeholder="Search by Order ID, User ID, Transaction ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full md:w-1/2 lg:w-1/3"
                />
            </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Platform Fee</TableHead>
                <TableHead>Seller Earning</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Transaction ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map(order => {
                const user = placeholderUsers.find(u => u.id === order.userId);
                const platformFee = order.totalAmount * platformCommissionRate;
                const sellerEarning = order.totalAmount * (1 - platformCommissionRate);
                return (
                <TableRow key={order.id}>
                  <TableCell className="font-medium text-primary hover:underline">
                      {order.id.substring(0,8)}...
                  </TableCell>
                  <TableCell>{user?.name || order.userId}</TableCell>
                  <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                  <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>${platformFee.toFixed(2)}</TableCell>
                  <TableCell>${sellerEarning.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(order.status)} className={getStatusColorClass(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.transactionId || 'N/A'}</TableCell>
                </TableRow>
              )})}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

       <Card className="shadow-md">
        <CardHeader>
            <CardTitle className="font-headline">Payout Management</CardTitle>
            <CardDescription>Initiate and track payouts to sellers.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
                This section would allow admins to view pending payouts, schedule bulk payouts, and manage payout methods for sellers.
            </p>
            <div className="flex gap-2">
                <Button disabled><CalendarDays className="mr-2 h-4 w-4"/> Schedule Payouts (Coming Soon)</Button>
                <Button variant="outline" disabled><AlertTriangle className="mr-2 h-4 w-4"/> View Disputed Transactions (Coming Soon)</Button>
            </div>
        </CardContent>
      </Card>

    </div>
  );
}
