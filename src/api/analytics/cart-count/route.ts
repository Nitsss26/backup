
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserActionEventModel from '@/models/UserActionEvent';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');

    if (!startDateParam || !endDateParam) {
      return NextResponse.json({ error: 'startDate and endDate are required' }, { status: 400 });
    }

    const end = new Date(endDateParam);
    const start = new Date(startDateParam);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
    }
    
    // Count "add_to_cart" events in the specified date range
    const currentCount = await UserActionEventModel.countDocuments({
      actionType: 'add_to_cart',
      timestamp: { $gte: start, $lte: end },
    });

    // Calculate previous period for comparison
    const duration = end.getTime() - start.getTime();
    const prevEnd = new Date(start.getTime() - 1);
    const prevStart = new Date(prevEnd.getTime() - duration);

    const previousCount = await UserActionEventModel.countDocuments({
      actionType: 'add_to_cart',
      timestamp: { $gte: prevStart, $lte: prevEnd },
    });

    // Calculate percentage change
    const increment = currentCount - previousCount;
    const incrementPercentage = previousCount > 0 
      ? ((increment / previousCount) * 100).toFixed(1)
      : currentCount > 0 ? '100' : '0';
      
    const trend = `${increment >= 0 ? '↑' : '↓'} ${Math.abs(Number(incrementPercentage))}% from previous period`;

    return NextResponse.json({
      cartCount: currentCount,
      increment: trend,
    });
  } catch (error) {
    console.error('Error fetching cart count:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
