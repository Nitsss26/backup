
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
    
    const dailySessions = await VisitEvent.aggregate([
      {
        $match: {
          timestamp: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
          sessionIds: { $addToSet: '$sessionId' }
        }
      },
      {
        $project: {
          date: '$_id',
          sessions: { $size: '$sessionIds' },
           _id: 0
        }
      },
      {
        $sort: { date: 1 }
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
    const sessionMap = new Map(dailySessions.map(item => [item.date, item.sessions]));

    const chartData = datesInRange.map(date => {
      const dateStr = date.toISOString().split('T')[0];
      return {
        date: dateStr,
        sessions: sessionMap.get(dateStr) || 0
      };
    });

    return NextResponse.json({
      chartData
    });
  } catch (error) {
    console.error('Error fetching sessions analytics:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
