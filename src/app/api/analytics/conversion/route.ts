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

    // Aggregate conversions (VisitEvent with path: "/checkout") for the current period
    const currentConversions = await VisitEvent.countDocuments({
      path: '/checkout',
      timestamp: { $gte: start, $lte: end },
    });

    // Aggregate total sessions (unique sessionId from VisitEvent) for the current period
    const currentSessions = await VisitEvent.distinct('sessionId', {
      timestamp: { $gte: start, $lte: end },
    }).then(sessions => sessions.length);

    // Calculate conversion rate
    const currentConversionRate = currentSessions > 0 ? (currentConversions / currentSessions) * 100 : 0;

    // Aggregate conversions for the previous period
    const previousConversions = await VisitEvent.countDocuments({
      path: '/checkout',
      timestamp: { $gte: prevStart, $lte: prevEnd },
    });

    // Aggregate total sessions for the previous period
    const previousSessions = await VisitEvent.distinct('sessionId', {
      timestamp: { $gte: prevStart, $lte: prevEnd },
    }).then(sessions => sessions.length);

    // Calculate previous conversion rate
    const previousConversionRate = previousSessions > 0 ? (previousConversions / previousSessions) * 100 : 0;

    // Aggregate daily conversion rates for the chart
    const dailyData = await Promise.all([
      VisitEvent.aggregate([
        {
          $match: {
            path: '/checkout',
            timestamp: { $gte: start, $lte: end },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
            conversions: { $sum: 1 },
          },
        },
      ]),
      VisitEvent.aggregate([
        {
          $match: {
            timestamp: { $gte: start, $lte: end },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
            sessions: { $addToSet: '$sessionId' },
          },
        },
        {
          $project: {
            _id: 1,
            sessionCount: { $size: '$sessions' },
          },
        },
      ]),
    ]);

    const [dailyConversions, dailySessions] = dailyData;
    const conversionsMap = new Map(dailyConversions.map(item => [item._id, item.conversions]));
    const sessionsMap = new Map(dailySessions.map(item => [item._id, item.sessionCount]));

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
    const chartData = datesInRange.map((date, index) => {
      const dateStr = date.toISOString().split('T')[0];
      const conversions = conversionsMap.get(dateStr) || 0;
      const sessions = sessionsMap.get(dateStr) || 0;
      const conversionRate = sessions > 0 ? (conversions / sessions) * 100 : 0;

      // Calculate daily increment/decrement (compare to previous day)
      let dailyIncrement = 'No data';
      if (index > 0) {
        const prevDateStr = datesInRange[index - 1].toISOString().split('T')[0];
        const prevConversions = conversionsMap.get(prevDateStr) || 0;
        const prevSessions = sessionsMap.get(prevDateStr) || 0;
        const prevConversionRate = prevSessions > 0 ? (prevConversions / prevSessions) * 100 : 0;
        const increment = conversionRate - prevConversionRate;
        const incrementPercentage = prevConversionRate > 0
          ? ((increment / prevConversionRate) * 100).toFixed(1)
          : conversionRate > 0 ? '100' : '0';
        dailyIncrement = `${increment >= 0 ? '↑' : '↓'} ${Math.abs(Number(incrementPercentage))}%`;
      }

      return {
        date: dateStr,
        conversion: conversionRate,
        dailyIncrement,
      };
    });

    // Calculate period increment percentage
    const increment = currentConversionRate - previousConversionRate;
    const incrementPercentage = previousConversionRate > 0
      ? ((increment / previousConversionRate) * 100).toFixed(1)
      : currentConversionRate > 0 ? '100' : '0';
    const trend = `${increment >= 0 ? '↑' : '↓'} ${Math.abs(Number(incrementPercentage))}% from previous period`;

    return NextResponse.json({
      conversion: currentConversionRate.toFixed(2),
      increment: trend,
      chartData,
    });
  } catch (error) {
    console.error('Error fetching conversion analytics:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}