
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { placeholderOrders } from '@/lib/placeholder-data';
import type { Order } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, FileText, ShoppingCart } from 'lucide-react';

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // In a real app, fetch orders for the logged-in student
    setOrders(placeholderOrders); 
  }, []);

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
  }


  if (!isClient) {
    return <div className="text-center py-10">Loading your order history...</div>;
  }

  return (
    <div className="space-y-8">
      {/* StudentDashboardHeaderNav is now in layout */}
      <h1 className="text-3xl font-bold font-headline">Order History</h1>
      {orders.length === 0 ? (
         <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Orders Yet</h2>
          <p className="text-muted-foreground mb-4">You haven&apos;t made any purchases yet.</p>
          <Button asChild>
            <Link href="/courses">Explore Courses</Link>
          </Button>
        </div>
      ) : (
        <div className="overflow-x-auto bg-card p-4 rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map(order => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium text-primary hover:underline">
                    {/* Link to order detail page will be created later if needed */}
                    {order.id.substring(0,8)}...
                  </TableCell>
                  <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                  <TableCell>{order.items.length} course(s)</TableCell>
                  <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(order.status)} className={getStatusColorClass(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button variant="outline" size="sm" disabled> {/* Placeholder for view order details */}
                        <Eye className="mr-1 h-3.5 w-3.5"/> View
                    </Button>
                    <Button variant="outline" size="sm" disabled={order.status !== 'completed'}>
                        <FileText className="mr-1 h-3.5 w-3.5"/> Invoice
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
