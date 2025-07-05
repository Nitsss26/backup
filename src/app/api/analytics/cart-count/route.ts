import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import ClickEvent, { IClickEvent } from '@/models/ClickEvent';

export async function GET(request: NextRequest) {
  try {
    // Extract date range from query parameters
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    if (!startDate || !endDate) {
      return NextResponse.json({ error: 'startDate and endDate are required' }, { status: 400 });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
    }

    // Ensure MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!, {
        dbName: 'EdTechCart',
      });
    }

    // Count "Added to Cart" events in the specified date range
    const currentCount = await ClickEvent.countDocuments({
      elementText: 'Added to Cart',
      timestamp: { $gte: start, $lte: end },
    });

    // Calculate previous period for comparison
    const duration = end.getTime() - start.getTime();
    const prevStart = new Date(start.getTime() - duration);
    const prevEnd = new Date(end.getTime() - duration);

    const previousCount = await ClickEvent.countDocuments({
      elementText: 'Added to Cart',
      timestamp: { $gte: prevStart, $lte: prevEnd },
    });

    // Calculate percentage change
    let percentageChange: number | null = null;
    let trend: 'up' | 'down' | 'no change' = 'no change';

    if (previousCount > 0) {
      percentageChange = ((currentCount - previousCount) / previousCount) * 100;
      percentageChange = Math.round(percentageChange * 100) / 100; // Round to 2 decimals
      trend = percentageChange > 0 ? 'up' : percentageChange < 0 ? 'down' : 'no change';
    } else if (currentCount > 0) {
      percentageChange = 100; // If previous count is 0 but current is > 0, assume 100% increase
      trend = 'up';
    }

    return NextResponse.json({
      cartCount: currentCount,
      percentageChange: percentageChange !== null ? percentageChange : 0,
      trend,
      period: { startDate, endDate },
    });
  } catch (error) {
    console.error('Error fetching cart count:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}