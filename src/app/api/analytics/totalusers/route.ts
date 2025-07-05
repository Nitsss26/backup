import { NextResponse } from 'next/server';
import  UserModel  from '@/models/User'; // Adjust import as per your setup
import dbConnect from '@/lib/dbConnect'; // Adjust import as per your setup

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
    
    // Calculate previous period
    const dateDiff = end.getTime() - start.getTime();
    const prevStart = new Date(start.getTime() - dateDiff);
    const prevEnd = new Date(end.getTime() - dateDiff);

    // Cumulative users up to end date
    const currentUsers = await UserModel.countDocuments({
      createdAt: { $lte: end }
    });

    // Cumulative users up to previous period's end
    const previousUsers = await UserModel.countDocuments({
      createdAt: { $lte: prevEnd }
    });

    // Daily new users within the selected range
    const dailyNewUsers = await UserModel.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Users before start date for cumulative baseline
    const usersBeforeStart = await UserModel.countDocuments({
      createdAt: { $lt: start }
    });

    // Generate all dates in range
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
    const newUserMap = new Map(dailyNewUsers.map(item => [item._id, item.count]));

    // Cumulative chart data
    let cumulative = usersBeforeStart;
    const chartData = datesInRange.map(date => {
      const dateStr = date.toISOString().split('T')[0];
      const dailyNew = newUserMap.get(dateStr) || 0;
      cumulative += dailyNew;
      return { date: dateStr, users: cumulative };
    });

    // Calculate increment
    const increment = currentUsers - previousUsers;
    const incrementPercentage = previousUsers > 0 
      ? ((increment / previousUsers) * 100).toFixed(1)
      : currentUsers > 0 ? '100' : '0';
    const trend = `${increment >= 0 ? '↑' : '↓'} ${Math.abs(Number(incrementPercentage))}% from previous period`;

    return NextResponse.json({
      totalUsers: currentUsers,
      increment: trend,
      chartData
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}