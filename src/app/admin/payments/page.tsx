
"use client";

import { useState, useEffect } from 'react';
import { placeholderOrders, placeholderUsers, placeholderCourses } from '@/lib/placeholder-data';
import type { Order } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Users, Download, Search, TrendingUp, AlertTriangle, CalendarDays, Filter, FileSpreadsheet, Settings2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Input } from '@/components/ui/input';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import type { DateRange } from 'react-day-picker';

const chartConfig = { revenue: { label: "Revenue", color: "hsl(var(--primary))" } };
const monthlyRevenueData = [
  { month: 'Jan', revenue: 1200000 }, { month: 'Feb', revenue: 1800000 },
  { month: 'Mar', revenue: 1500000 }, { month: 'Apr', revenue: 2200000 },
  { month: 'May', revenue: 2500000 }, { month: 'Jun', revenue: 3000000 },
];

const platformCommissionRate = 0.15; // 15%

export default function AdminPaymentsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth() -1, new Date().getDate()),
    to: new Date(),
  });


  useEffect(() => {
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
      case 'completed': return 'bg-green-100 text-green-700 border-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'failed': return 'bg-red-100 text-red-700 border-red-300';
      case 'refunded': return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };


  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold font-headline">Payments & Revenue</h1>
        <div className="flex gap-2">
            <DateRangePicker date={dateRange} onDateChange={setDateRange} />
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export Financial Report
            </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-md border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Platform Revenue</CardTitle>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalPlatformRevenue.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            <p className="text-xs text-muted-foreground">All-time gross revenue from sales</p>
          </CardContent>
        </Card>
        <Card className="shadow-md border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Platform Earnings (Net)</CardTitle>
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalPlatformEarnings.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            <p className="text-xs text-muted-foreground">After seller payouts ({platformCommissionRate*100}% commission)</p>
          </CardContent>
        </Card>
         <Card className="shadow-md border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Seller Payouts</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalSellerPayouts.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            <p className="text-xs text-muted-foreground">Paid or due to course sellers</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-lg border">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Monthly Revenue Trend</CardTitle>
          <CardDescription>Track gross revenue generated on the platform per month.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <BarChart data={monthlyRevenueData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />
              <YAxis tickFormatter={(value) => `₹${value/1000}k`} tickLine={false} axisLine={false} tickMargin={10} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`} />} />
              <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="shadow-lg border">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Transaction History</CardTitle>
          <CardDescription>Review all platform transactions, including purchases, refunds, and fees.</CardDescription>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                    placeholder="Search by Order ID, User ID, Transaction ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full bg-background"
                    />
                </div>
                <Button variant="outline" disabled><Filter className="mr-2 h-4 w-4"/> Filter Transactions</Button>
            </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {filteredOrders.length > 0 ? (
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
                  <TableRow key={order.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium text-primary hover:underline">
                        {/* Link to detailed order view if available */}
                        {order.id.substring(0,8)}...
                    </TableCell>
                    <TableCell>{user?.name || order.userId}</TableCell>
                    <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                    <TableCell>₹{order.totalAmount.toLocaleString('en-IN', {minimumFractionDigits: 2})}</TableCell>
                    <TableCell>₹{platformFee.toLocaleString('en-IN', {minimumFractionDigits: 2})}</TableCell>
                    <TableCell>₹{sellerEarning.toLocaleString('en-IN', {minimumFractionDigits: 2})}</TableCell>
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
          ) : (
            <div className="text-center py-10 text-muted-foreground">
                No transactions found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>

       <Card className="shadow-lg border">
        <CardHeader>
            <CardTitle className="font-headline text-2xl">Payout Management</CardTitle>
            <CardDescription>Initiate and track payouts to sellers. Configure payout schedules and methods.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <img src="https://placehold.co/800x200.png" alt="Payout process illustration" className="rounded-md w-full object-cover" data-ai-hint="financial payout workflow"/>
            <p className="text-sm text-muted-foreground">
                This section allows admins to view pending payouts, schedule bulk payouts (e.g., monthly, bi-weekly),
                and manage payout methods integrated with the platform (e.g., bank transfer, PayPal).
                Admins can also handle payout disputes or failures from here.
            </p>
            <div className="flex flex-wrap gap-2">
                <Button disabled><CalendarDays className="mr-2 h-4 w-4"/> View Payout Calendar</Button>
                <Button variant="outline" disabled><FileSpreadsheet className="mr-2 h-4 w-4"/> Generate Payout Slips</Button>
                <Button variant="outline" disabled><AlertTriangle className="mr-2 h-4 w-4"/> View Disputed Transactions</Button>
                <Button variant="secondary" disabled><Settings2 className="mr-2 h-4 w-4"/> Configure Payout Settings</Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
