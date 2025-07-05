import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Order from '@/models/Order';
import dbConnect from '@/lib/dbConnect';

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    if (!startDate || !endDate) {
      return NextResponse.json({ error: 'Start date and end date are required' }, { status: 400 });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Calculate the previous period for comparison
    const dateDiff = end.getTime() - start.getTime();
    const prevStart = new Date(start.getTime() - dateDiff);
    const prevEnd = new Date(end.getTime() - dateDiff);

    // Sum totalAmount for completed orders in current period
    const currentSales = await Order.aggregate([
      {
        $match: {
          status: 'completed',
          orderDate: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$totalAmount' }
        }
      }
    ]);

    const currentTotal = currentSales.length > 0 ? currentSales[0].total : 0;

    // Sum totalAmount for completed orders in previous period
    const previousSales = await Order.aggregate([
      {
        $match: {
          status: 'completed',
          orderDate: { $gte: prevStart, $lte: prevEnd }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$totalAmount' }
        }
      }
    ]);

    const previousTotal = previousSales.length > 0 ? previousSales[0].total : 0;

    // Calculate daily sales totals for the chart
    const dailySales = await Order.aggregate([
      {
        $match: {
          status: 'completed',
          orderDate: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$orderDate' }
          },
          total: { $sum: '$totalAmount' }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Generate all dates in range to ensure continuous data
    function getDatesInRange(start: Date, end: Date) {
      const dates = [];
      let currentDate = new Date(start);
      while (currentDate <= end) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return dates;
    }

    const datesInRange = getDatesInRange(start, end);
    const salesMap = new Map(dailySales.map(item => [item._id, item.total]));

    const chartData = datesInRange.map(date => {
      const dateStr = date.toISOString().split('T')[0];
      return {
        date: dateStr,
        sales: salesMap.get(dateStr) || 0
      };
    });

    // Calculate increment percentage
    const increment = currentTotal - previousTotal;
    const incrementPercentage = previousTotal > 0 
      ? ((increment / previousTotal) * 100).toFixed(1)
      : currentTotal > 0 ? '100' : '0';
    const trend = `${increment >= 0 ? '↑' : '↓'} ${Math.abs(Number(incrementPercentage))}% from previous period`;

    return NextResponse.json({
      totalSales: currentTotal,
      increment: trend,
      chartData
    });
  } catch (error) {
    console.error('Error fetching sales analytics:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}