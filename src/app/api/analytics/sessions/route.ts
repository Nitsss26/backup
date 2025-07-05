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

    // Count unique sessions for current period
    const currentSessions = await VisitEvent.distinct('sessionId', {
      timestamp: { $gte: start, $lte: end }
    }).then(sessions => sessions.length);

    // Count unique sessions for previous period
    const previousSessions = await VisitEvent.distinct('sessionId', {
      timestamp: { $gte: prevStart, $lte: prevEnd }
    }).then(sessions => sessions.length);

    // Calculate daily unique session counts for the chart
    const dailySessions = await VisitEvent.aggregate([
      {
        $match: {
          timestamp: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$timestamp' }
          },
          sessionIds: { $addToSet: '$sessionId' }
        }
      },
      {
        $project: {
          _id: 1,
          count: { $size: '$sessionIds' }
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
    const sessionMap = new Map(dailySessions.map(item => [item._id, item.count]));

    const chartData = datesInRange.map(date => {
      const dateStr = date.toISOString().split('T')[0];
      return {
        date: dateStr,
        sessions: sessionMap.get(dateStr) || 0
      };
    });

    // Calculate increment percentage
    const increment = currentSessions - previousSessions;
    const incrementPercentage = previousSessions > 0 
      ? ((increment / previousSessions) * 100).toFixed(1)
      : currentSessions > 0 ? '100' : '0';
    const trend = `${increment >= 0 ? '↑' : '↓'} ${Math.abs(Number(incrementPercentage))}% from previous period`;

    return NextResponse.json({
      totalSessions: currentSessions,
      increment: trend,
      chartData
    });
  } catch (error) {
    console.error('Error fetching sessions analytics:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}