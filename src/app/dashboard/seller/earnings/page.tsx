
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, Download, TrendingUp, CalendarDays, Banknote, Settings2 } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import type { DateRange } from 'react-day-picker';
import Image from 'next/image';


// Mock Data
const earningsSummary = {
  totalRevenue: 1234567.89,
  pendingPayout: 150000.00,
  lastPayout: 250050.50,
  nextPayoutDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 15).toLocaleDateString(),
};

const monthlyEarningsData = [
  { month: 'Jan', earnings: 120000 }, { month: 'Feb', earnings: 180000 },
  { month: 'Mar', earnings: 150000 }, { month: 'Apr', earnings: 220000 },
  { month: 'May', earnings: 250000 }, { month: 'Jun', earnings: 300000 },
];
const chartConfig = { earnings: { label: "Earnings (₹)", color: "hsl(var(--primary))" } };

const payoutHistoryData = [
  { id: 'payout1', date: '2023-06-15', amount: 250050.50, status: 'Completed', method: 'Bank Transfer (NEFT)' },
  { id: 'payout2', date: '2023-05-15', amount: 220000.00, status: 'Completed', method: 'Bank Transfer (IMPS)' },
  { id: 'payout3', date: '2023-04-15', amount: 180075.75, status: 'Completed', method: 'Bank Transfer (NEFT)' },
  { id: 'payout4', date: '2023-03-15', amount: 150020.20, status: 'Processing', method: 'Bank Transfer (NEFT)' },
  { id: 'payout5', date: '2023-02-15', amount: 120000.00, status: 'Failed', method: 'Bank Transfer (NEFT)', reason: 'Invalid account details' },
];

export default function SellerEarningsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("last_6_months");
  const [isClient, setIsClient] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="text-center py-10">Loading earnings data...</div>;
  }
  
  const getStatusBadgeVariant = (status: string) => {
    if (status === 'Completed') return 'default';
    if (status === 'Processing') return 'secondary';
    if (status === 'Failed') return 'destructive';
    return 'outline';
  };
   const getStatusBadgeColor = (status: string) => {
    if (status === 'Completed') return 'bg-green-100 text-green-700 border-green-300';
    if (status === 'Processing') return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    if (status === 'Failed') return 'bg-red-100 text-red-700 border-red-300';
    return '';
  };


  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold font-headline">Earnings & Payouts</h1>
        <div className="flex gap-2">
            <DateRangePicker date={dateRange} onDateChange={setDateRange} />
            <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export Report
            </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-md border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{earningsSummary.totalRevenue.toLocaleString('en-IN')}</div>
            <p className="text-xs text-muted-foreground">All-time earnings (gross)</p>
          </CardContent>
        </Card>
        <Card className="shadow-md border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Payout</CardTitle>
            <Banknote className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{earningsSummary.pendingPayout.toLocaleString('en-IN')}</div>
            <p className="text-xs text-muted-foreground">Available for next payout cycle</p>
          </CardContent>
        </Card>
        <Card className="shadow-md border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Last Payout Amount</CardTitle>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{earningsSummary.lastPayout.toLocaleString('en-IN')}</div>
            <p className="text-xs text-muted-foreground">On {new Date(new Date().setDate(new Date().getDate() - 15)).toLocaleDateString()}</p>
          </CardContent>
        </Card>
        <Card className="shadow-md border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Next Payout Date</CardTitle>
            <CalendarDays className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{earningsSummary.nextPayoutDate}</div>
            <p className="text-xs text-muted-foreground">Estimated date (monthly)</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-lg border">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <CardTitle className="font-headline text-xl">Monthly Earnings Trend</CardTitle>
              <CardDescription>Visualize your earnings (after platform fees) over time.</CardDescription>
            </div>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last_30_days">Last 30 Days</SelectItem>
                <SelectItem value="last_3_months">Last 3 Months</SelectItem>
                <SelectItem value="last_6_months">Last 6 Months</SelectItem>
                <SelectItem value="last_year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <BarChart data={monthlyEarningsData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
              <YAxis tickFormatter={(value) => `₹${value/1000}k`} tickLine={false} axisLine={false} tickMargin={10} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`} />} />
              <Legend />
              <Bar dataKey="earnings" fill="var(--color-earnings)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="shadow-lg border">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Payout History</CardTitle>
          <CardDescription>Review your past payouts and their status.</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payout ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payoutHistoryData.map(payout => (
                <TableRow key={payout.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium text-primary hover:underline">
                    <Link href="#">{payout.id}</Link> {/* Placeholder link */}
                  </TableCell>
                  <TableCell>{payout.date}</TableCell>
                  <TableCell>₹{payout.amount.toLocaleString('en-IN', {minimumFractionDigits: 2})}</TableCell>
                  <TableCell>{payout.method}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(payout.status)} className={getStatusBadgeColor(payout.status)}>
                      {payout.status}
                    </Badge>
                    {payout.status === 'Failed' && payout.reason && (
                        <p className="text-xs text-destructive mt-1">{payout.reason}</p>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="shadow-lg border">
        <CardHeader>
            <CardTitle className="font-headline text-xl">Payout Settings</CardTitle>
            <CardDescription>Manage your bank account or preferred payout method for receiving earnings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
             <Image src="https://placehold.co/700x250.png?text=Secure+Payout+Setup" alt="Payout settings interface illustration" className="rounded-md mb-4 w-full object-cover" data-ai-hint="bank transfer payout setup"/>
            <p className="text-sm text-muted-foreground">Current Payout Method: Bank Transfer to A/C ending ****1234 (State Bank of India)</p>
            <div className="flex flex-wrap gap-2">
                <Button variant="default"><Settings2 className="mr-2 h-4 w-4" /> Update Payout Method</Button>
                <Button variant="outline" disabled>View Tax Information</Button>
            </div>
            <p className="text-xs text-muted-foreground">Ensure your payout details are accurate to avoid delays. Payouts are processed according to the platform's schedule (typically monthly).</p>
        </CardContent>
      </Card>
    </div>
  );
}
