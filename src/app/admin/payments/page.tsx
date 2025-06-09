
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link'; // Added this import
import { placeholderOrders, placeholderUsers, placeholderCourses } from '@/lib/placeholder-data';
import type { Order } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Users, Download, Search, TrendingUp, AlertTriangle, CalendarDays, Filter, FileSpreadsheet, Settings2, Wallet, Banknote } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
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
      case 'completed': return <Badge variant="success">Completed</Badge>;
      case 'pending': return <Badge variant="warning">Pending</Badge>;
      case 'failed': return <Badge variant="destructive">Failed</Badge>;
      case 'refunded': return <Badge variant="info">Refunded</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };


  return (
    <div className="space-y-8 p-16 max-w-screen-xl mx-auto">
       <Card className="shadow-xl border-l-4 border-primary">
        <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-md">
                 <DollarSign className="h-8 w-8 text-primary"/>
            </div>
            <div>
                <CardTitle className="text-2xl font-headline text-primary">Payments & Revenue</CardTitle>
                <CardDescription>Monitor platform financial performance and manage transactions.</CardDescription>
            </div>
            <div className="ml-auto flex gap-2 flex-wrap">
                <DateRangePicker date={dateRange} onDateChange={setDateRange} />
                <Button variant="outline" disabled>
                <Download className="mr-2 h-4 w-4" /> Export Financial Report
                </Button>
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
            <div className="text-3xl font-bold text-foreground">₹{totalPlatformRevenue.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            <p className="text-xs text-muted-foreground">All-time gross revenue from sales</p>
          </CardContent>
        </Card>
        <Card className="shadow-md border-l-4 border-success bg-success/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-success-foreground">Platform Earnings (Net)</CardTitle>
            <TrendingUp className="h-6 w-6 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">₹{totalPlatformEarnings.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            <p className="text-xs text-muted-foreground">After seller payouts ({platformCommissionRate*100}% commission)</p>
          </CardContent>
        </Card>
         <Card className="shadow-md border-l-4 border-info bg-info/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-info-foreground">Total Seller Payouts</CardTitle>
            <Users className="h-6 w-6 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">₹{totalSellerPayouts.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
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
              <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2.5} dot={{r: 5, strokeWidth:1, fill: "hsl(var(--background))", stroke: "hsl(var(--primary))"}} activeDot={{r:7, fill: "hsl(var(--primary))"}} />
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
        <CardContent className="p-0">
          {filteredOrders.length > 0 ? (
            <div className="overflow-x-auto">
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
                  <TableRow key={order.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium text-primary hover:underline text-sm">
                        <Link href="#">{order.id.substring(0,8)}...</Link>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{user?.name || order.userId}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-sm text-foreground">{order.totalAmount.toLocaleString('en-IN', {minimumFractionDigits: 2})}</TableCell>
                    <TableCell className="text-sm text-foreground">{platformFee.toLocaleString('en-IN', {minimumFractionDigits: 2})}</TableCell>
                    <TableCell className="text-sm text-foreground">{sellerEarning.toLocaleString('en-IN', {minimumFractionDigits: 2})}</TableCell>
                    <TableCell>
                      {getStatusBadge(order.status)}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{order.transactionId || 'N/A'}</TableCell>
                  </TableRow>
                )})}
              </TableBody>
            </Table>
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
                <Wallet className="h-16 w-16 mx-auto mb-4 text-border"/>
                <p className="font-semibold text-lg">No transactions found matching your criteria.</p>
                <p className="text-sm">Try adjusting your search or filters.</p>
                 <Image src="https://placehold.co/400x250/EBF4FF/3B82F6?text=No+Transactions+Illustration" alt="Illustration for no transactions" width={400} height={250} className="mt-6 mx-auto rounded-md" data-ai-hint="empty state no data transactions list"/>
            </div>
          )}
        </CardContent>
         <CardFooter className="border-t pt-4">
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
            <div className="aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center border">
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
