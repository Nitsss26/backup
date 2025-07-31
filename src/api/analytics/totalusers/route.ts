
import { NextResponse } from 'next/server';
import  UserModel  from '@/models/User';
import dbConnect from '@/lib/dbConnect';

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');

    if (!startDateParam || !endDateParam) {
      return NextResponse.json({ error: 'Start date and end date are required' }, { status: 400 });
    }

    const end = new Date(endDateParam);
    const start = new Date(startDateParam);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
    }
    
    const duration = end.getTime() - start.getTime();
    const prevEnd = new Date(start.getTime() - 1);
    const prevStart = new Date(prevEnd.getTime() - duration);

    // Count new registered users in the current period
    const currentRegisteredUsers = await UserModel.countDocuments({
      createdAt: { $gte: start, $lte: end }
    });

    // Count new registered users in the previous period
    const previousRegisteredUsers = await UserModel.countDocuments({
      createdAt: { $gte: prevStart, $lte: prevEnd }
    });

    // Aggregate daily new users within the selected range
    const dailyNewUsers = await UserModel.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          users: { $sum: 1 }
        }
      },
      {
        $project: {
          date: '$_id',
          users: '$users',
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
    const newUserMap = new Map(dailyNewUsers.map(item => [item.date, item.users]));
    
    const chartData = datesInRange.map(date => {
      const dateStr = date.toISOString().split('T')[0];
      return {
        date: dateStr,
        users: newUserMap.get(dateStr) || 0
      };
    });

    const increment = currentRegisteredUsers - previousRegisteredUsers;
    const incrementPercentage = previousRegisteredUsers > 0 
      ? ((increment / previousRegisteredUsers) * 100).toFixed(1)
      : currentRegisteredUsers > 0 ? '100' : '0';
    const trend = `${increment >= 0 ? '↑' : '↓'} ${Math.abs(Number(incrementPercentage))}% from previous period`;

    return NextResponse.json({
      totalUsers: currentRegisteredUsers,
      increment: trend,
      chartData
    });
  } catch (error) {
    console.error('Error fetching registered users analytics:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
