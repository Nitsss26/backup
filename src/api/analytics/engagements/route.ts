
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import UserActionEvent from '@/models/UserActionEvent';
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

    const dailyEngagements = await UserActionEvent.aggregate([
      {
        $match: {
          timestamp: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          date: '$_id',
          engagements: '$count',
          _id: 0
        }
      },
      { $sort: { date: 1 } }
    ]);

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
    const engagementsMap = new Map(dailyEngagements.map(item => [item.date, item.engagements]));

    const chartData = datesInRange.map(date => {
      const dateStr = date.toISOString().split('T')[0];
      return {
        date: dateStr,
        engagements: engagementsMap.get(dateStr) || 0
      };
    });

    return NextResponse.json({
      chartData
    });
  } catch (error) {
    console.error('Error fetching engagements analytics:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
