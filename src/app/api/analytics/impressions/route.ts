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

    // Aggregate total impressions for the current period
    const currentPeriod = await VisitEvent.aggregate([
      {
        $match: {
          timestamp: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: null,
          totalImpressions: { $sum: 1 },
        },
      },
    ]);

    const currentImpressions = currentPeriod[0]?.totalImpressions || 0;

    // Aggregate total impressions for the previous period
    const previousPeriod = await VisitEvent.aggregate([
      {
        $match: {
          timestamp: { $gte: prevStart, $lte: prevEnd },
        },
      },
      {
        $group: {
          _id: null,
          totalImpressions: { $sum: 1 },
        },
      },
    ]);

    const previousImpressions = previousPeriod[0]?.totalImpressions || 0;

    // Aggregate daily impressions for the chart
    const dailyImpressions = await VisitEvent.aggregate([
      {
        $match: {
          timestamp: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$timestamp' },
          },
          impressions: { $sum: 1 },
        },
      },
      {
        $project: {
          date: '$_id',
          impressions: 1,
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
    const impressionsMap = new Map(dailyImpressions.map(item => [item.date, item.impressions]));
    const chartData = datesInRange.map(date => {
      const dateStr = date.toISOString().split('T')[0];
      return {
        date: dateStr,
        impressions: impressionsMap.get(dateStr) || 0,
      };
    });

    // Calculate increment percentage
    const increment = currentImpressions - previousImpressions;
    const incrementPercentage = previousImpressions > 0
      ? ((increment / previousImpressions) * 100).toFixed(1)
      : currentImpressions > 0 ? '100' : '0';
    const trend = `${increment >= 0 ? '↑' : '↓'} ${Math.abs(Number(incrementPercentage))}% from previous period`;

    return NextResponse.json({
      totalImpressions: currentImpressions,
      increment: trend,
      chartData,
    });
  } catch (error) {
    console.error('Error fetching impressions analytics:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}