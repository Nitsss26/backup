import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import OrderModel from '@/models/Order';

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    
    // Set date range - default to last 30 days if not provided
    const end = endDate ? new Date(endDate) : new Date();
    const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    
    const salesData = await OrderModel.aggregate([
      {
        $match: {
          orderDate: { $gte: start, $lte: end },
          status: 'completed'
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$orderDate" }
          },
          count: { $sum: 1 },
          revenue: { $sum: "$totalAmount" }
        }
      },
      {
        $project: {
          date: "$_id",
          count: 1,
          revenue: { $round: ["$revenue", 2] }
        }
      },
      { $sort: { date: 1 } }
    ]);

    // Fill in missing dates with 0 count
    const result = [];
    const currentDate = new Date(start);
    const endDateObj = new Date(end);
    
    while (currentDate <= endDateObj) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const existingData = salesData.find(item => item.date === dateStr);
      
      result.push({
        date: dateStr,
        count: existingData ? existingData.count : 0,
        revenue: existingData ? existingData.revenue : 0
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Sales API error:', error);
    return NextResponse.json({ error: 'Failed to fetch sales data' }, { status: 500 });
  }
}