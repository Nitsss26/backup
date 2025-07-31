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
    
    // Get daily unique users by device
    const dailyUniqueUsers = await VisitEventModel.aggregate([
      {
        $match: {
          timestamp: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: { 
            date: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
            device: '$device',
            uniqueUserId: '$uniqueUserId'
          }
        }
      },
      {
        $group: {
          _id: { 
            date: '$_id.date',
            device: '$_id.device'
          },
          uniqueUsers: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: '$_id.date',
          devices: {
            $push: {
              k: '$_id.device',
              v: '$uniqueUsers'
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

    // Get daily session counts
    const dailySessions = await VisitEventModel.aggregate([
      {
        $match: {
          timestamp: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: { 
            date: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
            sessionId: '$sessionId'
          }
        }
      },
      {
        $group: {
          _id: '$_id.date',
          totalSessions: { $sum: 1 }
        }
      },
      {
        $project: {
          date: '$_id',
          sessions: '$totalSessions',
          _id: 0
        }
      },
      { $sort: { date: 1 } }
    ]);

    // Get overall stats
    const [totalUniqueUsers, totalSessions, desktopUsers, mobileUsers] = await Promise.all([
      VisitEventModel.distinct('uniqueUserId', { timestamp: { $gte: start, $lte: end } }).then(ids => ids.length),
      VisitEventModel.distinct('sessionId', { timestamp: { $gte: start, $lte: end } }).then(ids => ids.length),
      VisitEventModel.distinct('uniqueUserId', { timestamp: { $gte: start, $lte: end }, device: 'Desktop' }).then(ids => ids.length),
      VisitEventModel.distinct('uniqueUserId', { timestamp: { $gte: start, $lte: end }, device: 'Mobile' }).then(ids => ids.length),
    ]);

    // Helper function to get all dates in range
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
    const usersMap = new Map(dailyUniqueUsers.map(item => [item.date, item.deviceCounts]));
    const sessionsMap = new Map(dailySessions.map(item => [item.date, item.sessions]));

    // Prepare chart data
    const uniqueUsersChartData = datesInRange.map(date => {
      const dateStr = date.toISOString().split('T')[0];
      const counts = usersMap.get(dateStr) || {};
      return {
        date: dateStr,
        desktop: counts['Desktop'] || 0,
        mobile: counts['Mobile'] || 0,
        total: (counts['Desktop'] || 0) + (counts['Mobile'] || 0)
      };
    });

    const sessionsChartData = datesInRange.map(date => {
      const dateStr = date.toISOString().split('T')[0];
      return {
        date: dateStr,
        sessions: sessionsMap.get(dateStr) || 0
      };
    });

    return NextResponse.json({
      summary: {
        totalUniqueUsers,
        totalSessions,
        desktopUsers,
        mobileUsers,
        avgSessionsPerUser: totalUniqueUsers > 0 ? (totalSessions / totalUniqueUsers).toFixed(1) : '0'
      },
      uniqueUsersChart: uniqueUsersChartData,
      sessionsChart: sessionsChartData,
      deviceBreakdown: {
        desktop: desktopUsers,
        mobile: mobileUsers,
        desktopPercentage: totalUniqueUsers > 0 ? ((desktopUsers / totalUniqueUsers) * 100).toFixed(1) : '0',
        mobilePercentage: totalUniqueUsers > 0 ? ((mobileUsers / totalUniqueUsers) * 100).toFixed(1) : '0'
      }
    });
  } catch (error) {
    console.error('Error fetching unique users analytics:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}