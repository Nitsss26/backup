import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import VisitEventModel from '@/models/VisitEvent';
import UserModel from '@/models/User';
import Order from '@/models/Order';
import { subDays, differenceInDays } from 'date-fns';

// Helper function to safely execute database operations
async function safeDbOperation<T>(operation: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    console.warn('Database operation failed, using fallback:', error);
    return fallback;
  }
}

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
    
    // Validate dates
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
    }
    
    // Calculate previous period for trends
    const dateDiff = differenceInDays(end, start);
    const prevStart = subDays(start, dateDiff + 1);
    const prevEnd = subDays(end, dateDiff + 1);

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

    // 1. UNIQUE USERS ANALYTICS (with error handling)
    const uniqueUsersData = await Promise.all([
      safeDbOperation(() => VisitEventModel.distinct('uniqueUserId', { timestamp: { $gte: start, $lte: end } }), []),
      safeDbOperation(() => VisitEventModel.distinct('uniqueUserId', { timestamp: { $gte: prevStart, $lte: prevEnd } }), []),
      safeDbOperation(() => VisitEventModel.distinct('uniqueUserId', { timestamp: { $gte: start, $lte: end }, device: 'Desktop' }), []),
      safeDbOperation(() => VisitEventModel.distinct('uniqueUserId', { timestamp: { $gte: start, $lte: end }, device: 'Mobile' }), []),
      safeDbOperation(() => VisitEventModel.distinct('uniqueUserId', { timestamp: { $gte: prevStart, $lte: prevEnd }, device: 'Desktop' }), []),
      safeDbOperation(() => VisitEventModel.distinct('uniqueUserId', { timestamp: { $gte: prevStart, $lte: prevEnd }, device: 'Mobile' }), []),
    ]);

    const [currentUniqueUsers, prevUniqueUsers, currentDesktop, currentMobile, prevDesktop, prevMobile] = uniqueUsersData.map(arr => arr.length);

    // 2. SESSIONS ANALYTICS (with error handling)
    const sessionsData = await Promise.all([
      safeDbOperation(() => VisitEventModel.distinct('sessionId', { timestamp: { $gte: start, $lte: end } }), []),
      safeDbOperation(() => VisitEventModel.distinct('sessionId', { timestamp: { $gte: prevStart, $lte: prevEnd } }), []),
    ]);

    const [currentSessions, prevSessions] = sessionsData.map(arr => arr.length);

    // 3. REGISTERED USERS ANALYTICS (with error handling)
    const registeredUsersData = await Promise.all([
      safeDbOperation(() => UserModel.countDocuments({ createdAt: { $gte: start, $lte: end } }), 0),
      safeDbOperation(() => UserModel.countDocuments({ createdAt: { $gte: prevStart, $lte: prevEnd } }), 0),
    ]);

    const [currentRegistered, prevRegistered] = registeredUsersData;

    // 4. DAILY UNIQUE USERS BY DEVICE (with error handling)
    const dailyUniqueUsers = await safeDbOperation(() => VisitEventModel.aggregate([
      { $match: { timestamp: { $gte: start, $lte: end } } },
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
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: '$_id.date',
          devices: {
            $push: {
              k: '$_id.device',
              v: '$count'
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
    ]), []);

    // 5. DAILY SESSIONS (with error handling)
    const dailySessions = await safeDbOperation(() => VisitEventModel.aggregate([
      { $match: { timestamp: { $gte: start, $lte: end } } },
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
          sessions: { $sum: 1 }
        }
      },
      {
        $project: {
          date: '$_id',
          sessions: 1,
          _id: 0
        }
      },
      { $sort: { date: 1 } }
    ]), []);

    // 6. DAILY REGISTERED USERS (with error handling)
    const dailyRegistrations = await safeDbOperation(() => UserModel.aggregate([
      { $match: { createdAt: { $gte: start, $lte: end } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          registrations: { $sum: 1 }
        }
      },
      {
        $project: {
          date: '$_id',
          registrations: 1,
          _id: 0
        }
      },
      { $sort: { date: 1 } }
    ]), []);

    // 7. AVERAGE SESSION DURATION (with error handling)
    const avgDurationData = await safeDbOperation(() => VisitEventModel.aggregate([
      { $match: { timestamp: { $gte: start, $lte: end }, duration: { $gt: 0 } } },
      { $group: { _id: "$sessionId", totalDuration: { $sum: "$duration" } } },
      { $group: { _id: null, avgDuration: { $avg: "$totalDuration" } } }
    ]), []);

    const prevAvgDurationData = await safeDbOperation(() => VisitEventModel.aggregate([
      { $match: { timestamp: { $gte: prevStart, $lte: prevEnd }, duration: { $gt: 0 } } },
      { $group: { _id: "$sessionId", totalDuration: { $sum: "$duration" } } },
      { $group: { _id: null, avgDuration: { $avg: "$totalDuration" } } }
    ]), []);

    const currentAvgDuration = avgDurationData[0]?.avgDuration || 0;
    const prevAvgDuration = prevAvgDurationData[0]?.avgDuration || 0;

    // Helper function to calculate trends
    const calculateTrend = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? '↑ 100%' : '0%';
      if (current === 0 && previous > 0) return '↓ 100%';
      const percentage = ((current - previous) / previous) * 100;
      const arrow = percentage >= 0 ? '↑' : '↓';
      return `${arrow} ${Math.abs(percentage).toFixed(1)}%`;
    };

    // Helper function to format duration
    const formatDuration = (seconds: number) => {
      if (isNaN(seconds) || seconds < 0) return "0m 0s";
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.round(seconds % 60);
      return `${minutes}m ${remainingSeconds}s`;
    };

    // Prepare chart data with all dates
    const datesInRange = getDatesInRange(start, end);
    const usersMap = new Map(dailyUniqueUsers.map(item => [item.date, item.deviceCounts]));
    const sessionsMap = new Map(dailySessions.map(item => [item.date, item.sessions]));
    const registrationsMap = new Map(dailyRegistrations.map(item => [item.date, item.registrations]));

    const uniqueUsersChart = datesInRange.map(date => {
      const dateStr = date.toISOString().split('T')[0];
      const counts = usersMap.get(dateStr) || {};
      return {
        date: dateStr,
        desktop: counts['Desktop'] || 0,
        mobile: counts['Mobile'] || 0,
        total: (counts['Desktop'] || 0) + (counts['Mobile'] || 0)
      };
    });

    const sessionsChart = datesInRange.map(date => {
      const dateStr = date.toISOString().split('T')[0];
      return {
        date: dateStr,
        sessions: sessionsMap.get(dateStr) || 0
      };
    });

    const registrationsChart = datesInRange.map(date => {
      const dateStr = date.toISOString().split('T')[0];
      return {
        date: dateStr,
        registrations: registrationsMap.get(dateStr) || 0
      };
    });

    // Calculate additional metrics
    const avgSessionsPerUser = currentUniqueUsers > 0 ? (currentSessions / currentUniqueUsers) : 0;
    const prevAvgSessionsPerUser = prevUniqueUsers > 0 ? (prevSessions / prevUniqueUsers) : 0;

    return NextResponse.json({
      // KPI Summary
      kpis: {
        uniqueUsers: { 
          value: currentUniqueUsers.toLocaleString(), 
          trend: calculateTrend(currentUniqueUsers, prevUniqueUsers) 
        },
        totalSessions: { 
          value: currentSessions.toLocaleString(), 
          trend: calculateTrend(currentSessions, prevSessions) 
        },
        desktopUsers: { 
          value: currentDesktop.toLocaleString(), 
          trend: calculateTrend(currentDesktop, prevDesktop) 
        },
        mobileUsers: { 
          value: currentMobile.toLocaleString(), 
          trend: calculateTrend(currentMobile, prevMobile) 
        },
        avgSessionsPerUser: { 
          value: avgSessionsPerUser.toFixed(1), 
          trend: calculateTrend(avgSessionsPerUser, prevAvgSessionsPerUser) 
        },
        registeredUsers: { 
          value: currentRegistered.toLocaleString(), 
          trend: calculateTrend(currentRegistered, prevRegistered) 
        },
        avgSessionDuration: { 
          value: formatDuration(currentAvgDuration), 
          trend: calculateTrend(currentAvgDuration, prevAvgDuration) 
        }
      },
      
      // Chart Data
      charts: {
        uniqueUsersChart,
        sessionsChart,
        registrationsChart
      },
      
      // Device Breakdown
      deviceBreakdown: {
        desktop: currentDesktop,
        mobile: currentMobile,
        desktopPercentage: currentUniqueUsers > 0 ? ((currentDesktop / currentUniqueUsers) * 100).toFixed(1) : '0',
        mobilePercentage: currentUniqueUsers > 0 ? ((currentMobile / currentUniqueUsers) * 100).toFixed(1) : '0'
      },
      
      // Summary Stats
      summary: {
        totalUniqueUsers: currentUniqueUsers,
        totalSessions: currentSessions,
        totalRegistrations: currentRegistered,
        avgSessionsPerUser: avgSessionsPerUser.toFixed(1)
      }
    });

  } catch (error) {
    console.error('Error fetching analytics dashboard data:', error);
    return NextResponse.json({ 
      error: 'Internal server error', 
      message: (error as Error).message 
    }, { status: 500 });
  }
}