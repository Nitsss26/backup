
import { NextResponse } from 'next/server';
import VisitEventModel from '@/models/VisitEvent';
import Order from '@/models/Order';
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

    // Limit to last 30 days to prevent timeout
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const actualStart = start > thirtyDaysAgo ? start : thirtyDaysAgo;
    
    // --- Daily Chart Data ---
    const dailyOrdersPromise = Order.aggregate([
      { $match: { orderDate: { $gte: actualStart, $lte: end }, status: 'completed' } },
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$orderDate' } }, orders: { $sum: 1 } } }
    ]);
    const dailySessionsPromise = VisitEventModel.aggregate([
      { $match: { timestamp: { $gte: actualStart, $lte: end } } },
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } }, sessions: { $addToSet: '$sessionId' } } },
      { $project: { _id: 1, sessionCount: { $size: '$sessions' } } }
    ]);

    const [dailyOrders, dailySessions] = await Promise.all([dailyOrdersPromise, dailySessionsPromise]);

    const ordersMap = new Map(dailyOrders.map(item => [item._id, item.orders]));
    const sessionsMap = new Map(dailySessions.map(item => [item._id, item.sessionCount]));
    
    const chartData: { date: string; conversion: number }[] = [];
    for (let d = new Date(actualStart); d <= end; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        const orders = ordersMap.get(dateStr) || 0;
        const sessions = sessionsMap.get(dateStr) || 0;
        chartData.push({
            date: dateStr,
            conversion: sessions > 0 ? (orders / sessions) * 100 : 0,
        });
    }
    
    return NextResponse.json({
      chartData,
    });
  } catch (error) {
    console.error('Error fetching conversion analytics:', error);
    return NextResponse.json({ error: 'Internal server error', message: (error as Error).message }, { status: 500 });
  }
}
