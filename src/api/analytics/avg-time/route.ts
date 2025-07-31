
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

    // Aggregate daily average durations for the chart
    const dailyDurations = await VisitEvent.aggregate([
      { $match: { timestamp: { $gte: start, $lte: end }, duration: { $gt: 0 } } },
      { $group: { _id: { date: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } }, sessionId: '$sessionId' }, pageDuration: { $sum: '$duration' } } },
      { $group: { _id: '$_id.date', avgDuration: { $avg: '$pageDuration' } } },
      { $project: { date: '$_id', avgTime: '$avgDuration', _id: 0 } },
      { $sort: { date: 1 } },
    ]);

    // Generate all dates in range to ensure chart continuity
    const datesInRange: Date[] = [];
    let currentDate = new Date(start);
    while (currentDate <= end) {
        datesInRange.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    const durationsMap = new Map(dailyDurations.map(item => [item.date, item.avgTime]));
    const chartData = datesInRange.map(date => {
      const dateStr = date.toISOString().split('T')[0];
      return {
        date: dateStr,
        avgTime: durationsMap.get(dateStr) || 0,
      };
    });

    return NextResponse.json({
      chartData: chartData.map(item => ({
        date: item.date,
        avgTime: item.avgTime,
      })),
    });
  } catch (error) {
    console.error('Error fetching avg time analytics:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
