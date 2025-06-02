
"use client";

import { useState, useEffect } from 'react';
import { placeholderOrders, placeholderUsers, placeholderCourses } from '@/lib/placeholder-data';
import type { Order } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Users, Download, Search, TrendingUp, AlertTriangle, CalendarDays, Filter, FileSpreadsheet, Settings2, Wallet, Banknote } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Input } from '@/components/ui/input';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import type { DateRange } from 'react-day-picker';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const chartConfig = { revenue: { label: "Revenue (₹)", color: "hsl(var(--primary))" } };
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
    (placeholderUsers.find(u => u.id === order.userId)?.name.toLowerCase() || order.userId.toLowerCase()).includes(searchTerm.toLowerCase()) ||
    order.transactionId?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'completed': return <Badge className="bg-green-100 text-green-700 border-green-300 hover:bg-green-200">Completed</Badge>;
      case 'pending': return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-200">Pending</Badge>;
      case 'failed': return <Badge className="bg-red-100 text-red-700 border-red-300 hover:bg-red-200">Failed</Badge>;
      case 'refunded': return <Badge className="bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200">Refunded</Badge>;
      default: return <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-slate-300">Unknown</Badge>;
    }
  };


  return (
    <div className="space-y-8">
       <Card className="shadow-lg border bg-card">
        <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <CardTitle className="text-2xl font-headline">Payments & Revenue</CardTitle>
                    <CardDescription>Monitor platform financial performance and manage transactions.</CardDescription>
                </div>
                <div className="flex gap-2 flex-wrap">
                    <DateRangePicker date={dateRange} onDateChange={setDateRange} />
                    <Button variant="outline" disabled>
                    <Download className="mr-2 h-4 w-4" /> Export Financial Report
                    </Button>
                </div>
            </div>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-md border-l-4 border-primary bg-primary/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-primary">Total Platform Revenue</CardTitle>
            <DollarSign className="h-6 w-6 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{totalPlatformRevenue.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            <p className="text-xs text-muted-foreground">All-time gross revenue from sales</p>
          </CardContent>
        </Card>
        <Card className="shadow-md border-l-4 border-green-500 bg-green-500/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-green-600">Platform Earnings (Net)</CardTitle>
            <TrendingUp className="h-6 w-6 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{totalPlatformEarnings.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            <p className="text-xs text-muted-foreground">After seller payouts ({platformCommissionRate*100}% commission)</p>
          </CardContent>
        </Card>
         <Card className="shadow-md border-l-4 border-blue-500 bg-blue-500/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">Total Seller Payouts</CardTitle>
            <Users className="h-6 w-6 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{totalSellerPayouts.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            <p className="text-xs text-muted-foreground">Paid or due to course sellers</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-lg border bg-card">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Monthly Revenue Trend</CardTitle>
          <CardDescription>Track gross revenue generated on the platform per month.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <LineChart data={monthlyRevenueData}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))"/>
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />
              <YAxis tickFormatter={(value) => `₹${value/1000}k`} tickLine={false} axisLine={false} tickMargin={10} />
              <ChartTooltip cursor={{strokeDasharray: '3 3'}} content={<ChartTooltipContent indicator="dot" formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`} />} />
              <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2.5} dot={{r: 5, strokeWidth:1}} activeDot={{r:7}} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="shadow-lg border bg-card">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Transaction History</CardTitle>
          <CardDescription>Review all platform transactions, including purchases, refunds, and fees.</CardDescription>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                    placeholder="Search by Order ID, User Name, Transaction ID..."
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
                  <TableHead>Amount (₹)</TableHead>
                  <TableHead>Platform Fee (₹)</TableHead>
                  <TableHead>Seller Earning (₹)</TableHead>
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
                  <TableRow key={order.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium text-primary hover:underline text-sm">
                        <Link href="#">{order.id.substring(0,8)}...</Link>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{user?.name || order.userId}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-sm">{order.totalAmount.toLocaleString('en-IN', {minimumFractionDigits: 2})}</TableCell>
                    <TableCell className="text-sm">{platformFee.toLocaleString('en-IN', {minimumFractionDigits: 2})}</TableCell>
                    <TableCell className="text-sm">{sellerEarning.toLocaleString('en-IN', {minimumFractionDigits: 2})}</TableCell>
                    <TableCell>
                      {getStatusBadge(order.status)}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{order.transactionId || 'N/A'}</TableCell>
                  </TableRow>
                )})}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
                <Wallet className="h-12 w-12 mx-auto mb-3 text-border"/>
                <p className="font-semibold">No transactions found matching your criteria.</p>
                <p className="text-sm">Try adjusting your search or filters.</p>
            </div>
          )}
        </CardContent>
         <CardFooter>
            <p className="text-xs text-muted-foreground">Showing {filteredOrders.length} of {orders.length} total transactions.</p>
            {/* Pagination placeholder */}
        </CardFooter>
      </Card>

       <Card className="shadow-lg border bg-card">
        <CardHeader>
            <CardTitle className="font-headline text-xl">Payout Management</CardTitle>
            <CardDescription>Initiate and track payouts to sellers. Configure payout schedules and methods.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                <Image src="https://placehold.co/800x400/EBF4FF/3B82F6?text=Payout+Workflow+Diagram" alt="Payout process illustration and workflow diagram" width={800} height={400} className="object-contain" data-ai-hint="financial payout workflow diagram admin interface"/>
            </div>
            <p className="text-sm text-muted-foreground">
                This section allows admins to view pending payouts, schedule bulk payouts (e.g., monthly, bi-weekly),
                and manage payout methods integrated with the platform (e.g., bank transfer, Stripe Connect).
                Admins can also handle payout disputes or failures from here.
            </p>
            <div className="flex flex-wrap gap-3">
                <Button disabled><CalendarDays className="mr-2 h-4 w-4"/> View Payout Calendar</Button>
                <Button variant="outline" disabled><FileSpreadsheet className="mr-2 h-4 w-4"/> Generate Payout Slips</Button>
                <Button variant="outline" disabled><AlertTriangle className="mr-2 h-4 w-4"/> View Disputed Payouts</Button>
                <Button variant="secondary" disabled><Settings2 className="mr-2 h-4 w-4"/> Configure Payout Settings</Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
