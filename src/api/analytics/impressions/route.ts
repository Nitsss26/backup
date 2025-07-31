
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import VisitEvent from '@/models/VisitEvent';
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

    // Optimized aggregation for daily impressions
    const dailyImpressions = await VisitEvent.aggregate([
      { $match: { timestamp: { $gte: start, $lte: end } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
          count: { $sum: 1 }
        }
      },
      { $project: { date: '$_id', impressions: '$count', _id: 0 } },
      { $sort: { date: 1 } }
    ]);

    // Generate all dates in range to ensure chart continuity
    const datesInRange: Date[] = [];
    let currentDate = new Date(start);
    while (currentDate <= end) {
      datesInRange.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    const impressionsMap = new Map(dailyImpressions.map(item => [item.date, item.impressions]));
    const chartData = datesInRange.map(date => {
      const dateStr = date.toISOString().split('T')[0];
      return {
        date: dateStr,
        impressions: impressionsMap.get(dateStr) || 0,
      };
    });

    return NextResponse.json({
      chartData,
    });
  } catch (error) {
    console.error('Error fetching impressions analytics:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
