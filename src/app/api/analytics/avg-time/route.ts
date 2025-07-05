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

    // Calculate the previous period for comparison
    const dateDiff = end.getTime() - start.getTime();
    const prevStart = new Date(start.getTime() - dateDiff);
    const prevEnd = new Date(end.getTime() - dateDiff);

    // Aggregate average session duration for the current period
    const currentPeriod = await VisitEvent.aggregate([
      {
        $match: {
          timestamp: { $gte: start, $lte: end },
          duration: { $gte: 0 }, // Ensure valid durations
        },
      },
      {
        $group: {
          _id: '$sessionId',
          totalDuration: { $sum: '$duration' },
        },
      },
      {
        $group: {
          _id: null,
          avgSessionDuration: { $avg: '$totalDuration' },
          sessionCount: { $sum: 1 },
        },
      },
    ]);

    const currentAvgDuration = currentPeriod[0]?.avgSessionDuration || 0;

    // Aggregate average session duration for the previous period
    const previousPeriod = await VisitEvent.aggregate([
      {
        $match: {
          timestamp: { $gte: prevStart, $lte: prevEnd },
          duration: { $gte: 0 },
        },
      },
      {
        $group: {
          _id: '$sessionId',
          totalDuration: { $sum: '$duration' },
        },
      },
      {
        $group: {
          _id: null,
          avgSessionDuration: { $avg: '$totalDuration' },
        },
      },
    ]);

    const previousAvgDuration = previousPeriod[0]?.avgSessionDuration || 0;

    // Aggregate daily average durations for the chart
    const dailyDurations = await VisitEvent.aggregate([
      {
        $match: {
          timestamp: { $gte: start, $lte: end },
          duration: { $gte: 0 },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$timestamp' },
          },
          totalDuration: { $sum: '$duration' },
          sessionCount: { $addToSet: '$sessionId' },
        },
      },
      {
        $project: {
          date: '$_id',
          avgDuration: {
            $cond: [
              { $eq: [{ $size: '$sessionCount' }, 0] },
              0,
              { $divide: ['$totalDuration', { $size: '$sessionCount' }] },
            ],
          },
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);

    // Generate all dates in range to ensure chart continuity
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
    const durationsMap = new Map(dailyDurations.map(item => [item.date, item.avgDuration]));
    const chartData = datesInRange.map(date => {
      const dateStr = date.toISOString().split('T')[0];
      return {
        date: dateStr,
        avgTime: durationsMap.get(dateStr) || 0,
      };
    });

    // Calculate increment percentage
    const increment = currentAvgDuration - previousAvgDuration;
    const incrementPercentage = previousAvgDuration > 0
      ? ((increment / previousAvgDuration) * 100).toFixed(1)
      : currentAvgDuration > 0 ? '100' : '0';
    const trend = `${increment >= 0 ? '↑' : '↓'} ${Math.abs(Number(incrementPercentage))}% from previous period`;

    // Format average duration as MM:SS
    const formatDuration = (seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.round(seconds % 60).toString().padStart(2, '0');
      return `${minutes}:${remainingSeconds}`;
    };

    return NextResponse.json({
      avgTime: formatDuration(currentAvgDuration),
      increment: trend,
      chartData: chartData.map(item => ({
        date: item.date,
        avgTime: item.avgTime, // Keep as seconds for chart rendering
      })),
    });
  } catch (error) {
    console.error('Error fetching avg time analytics:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}