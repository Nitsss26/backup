
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import VisitEventModel from '@/models/VisitEvent';

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
    
    const dateDiff = end.getTime() - start.getTime();
    const prevStart = new Date(start.getTime() - dateDiff);
    const prevEnd = new Date(end.getTime() - dateDiff);

    // Get unique visitor counts for current and previous periods
    const [currentVisitors, previousVisitors] = await Promise.all([
      VisitEventModel.distinct('uniqueUserId', { timestamp: { $gte: start, $lte: end } }).then(ids => ids.length),
      VisitEventModel.distinct('uniqueUserId', { timestamp: { $gte: prevStart, $lte: prevEnd } }).then(ids => ids.length)
    ]);

    // Aggregate daily unique visitors by device
    const dailyDeviceVisitors = await VisitEventModel.aggregate([
      {
        $match: {
          timestamp: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: { 
            date: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
            device: '$device' 
          },
          uniqueVisitors: { $addToSet: '$uniqueUserId' }
        }
      },
      {
        $group: {
          _id: '$_id.date',
          devices: {
            $push: {
              k: '$_id.device',
              v: { $size: '$uniqueVisitors' }
            }
          }
        }
      },
      {
        $project: {
          date: '$_id',
          deviceCounts: { $arrayToObject: '$devices' },
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
    const visitorsMap = new Map(dailyDeviceVisitors.map(item => [item.date, item.deviceCounts]));

    const chartData = datesInRange.map(date => {
      const dateStr = date.toISOString().split('T')[0];
      const counts = visitorsMap.get(dateStr) || {};
      return {
        date: dateStr,
        desktop: counts['Desktop'] || 0,
        mobile: counts['Mobile'] || 0,
      };
    });

    const increment = currentVisitors - previousVisitors;
    const incrementPercentage = previousVisitors > 0 
      ? ((increment / previousVisitors) * 100).toFixed(1)
      : currentVisitors > 0 ? '100' : '0';
    const trend = `${increment >= 0 ? '↑' : '↓'} ${Math.abs(Number(incrementPercentage))}% from previous period`;

    return NextResponse.json({
      totalUsers: currentVisitors,
      increment: trend,
      chartData
    });
  } catch (error) {
    console.error('Error fetching unique users analytics:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
