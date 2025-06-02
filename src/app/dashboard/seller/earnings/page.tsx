"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, Download, TrendingUp, CalendarDays } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

// Mock Data
const earningsSummary = {
  totalRevenue: 12345.67,
  pendingPayout: 1500.00,
  lastPayout: 2500.50,
  nextPayoutDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 15).toLocaleDateString(),
};

const monthlyEarningsData = [
  { month: 'Jan', earnings: 1200 }, { month: 'Feb', earnings: 1800 },
  { month: 'Mar', earnings: 1500 }, { month: 'Apr', earnings: 2200 },
  { month: 'May', earnings: 2500 }, { month: 'Jun', earnings: 3000 },
];
const chartConfig = { earnings: { label: "Earnings", color: "hsl(var(--primary))" } };

const payoutHistoryData = [
  { id: 'payout1', date: '2023-06-15', amount: 2500.50, status: 'Completed', method: 'Bank Transfer' },
  { id: 'payout2', date: '2023-05-15', amount: 2200.00, status: 'Completed', method: 'Bank Transfer' },
  { id: 'payout3', date: '2023-04-15', amount: 1800.75, status: 'Completed', method: 'Bank Transfer' },
  { id: 'payout4', date: '2023-03-15', amount: 1500.20, status: 'Completed', method: 'Bank Transfer' },
];

export default function SellerEarningsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("last_6_months");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="text-center py-10">Loading earnings data...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold font-headline">Earnings & Payouts</h1>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Export Report
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${earningsSummary.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All-time earnings</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Payout</CardTitle>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${earningsSummary.pendingPayout.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Available for next payout</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Last Payout</CardTitle>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${earningsSummary.lastPayout.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">On {new Date(new Date().setDate(new Date().getDate() - 15)).toLocaleDateString()}</p> {/* Mock date */}
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Next Payout Date</CardTitle>
            <CalendarDays className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{earningsSummary.nextPayoutDate}</div>
            <p className="text-xs text-muted-foreground">Estimated date</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-md">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <CardTitle className="font-headline">Monthly Earnings Trend</CardTitle>
              <CardDescription>Visualize your earnings over time.</CardDescription>
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
              <YAxis tickFormatter={(value) => `$${value/1000}k`} tickLine={false} axisLine={false} tickMargin={10} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
              <Legend />
              <Bar dataKey="earnings" fill="var(--color-earnings)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="font-headline">Payout History</CardTitle>
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
                <TableRow key={payout.id}>
                  <TableCell className="font-medium">{payout.id}</TableCell>
                  <TableCell>{payout.date}</TableCell>
                  <TableCell>${payout.amount.toFixed(2)}</TableCell>
                  <TableCell>{payout.method}</TableCell>
                  <TableCell>
                    <Badge variant={payout.status === 'Completed' ? 'default' : 'secondary'} className={payout.status === 'Completed' ? 'bg-green-500 hover:bg-green-600' : ''}>
                      {payout.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
            <CardTitle className="font-headline">Payout Settings</CardTitle>
            <CardDescription>Manage your bank account or preferred payout method.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {/* Placeholder for payout settings form */}
            <p className="text-sm text-muted-foreground">Current Payout Method: Bank Transfer to **** **** **** 1234</p>
            <Button variant="outline">Update Payout Method</Button>
        </CardContent>
      </Card>

    </div>
  );
}
