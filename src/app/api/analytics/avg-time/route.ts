import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import VisitEventModel from '@/models/VisitEvent';

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    
    // Set date range - default to last 30 days if not provided
    const end = endDate ? new Date(endDate) : new Date();
    const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    
    const avgTimeData = await VisitEventModel.aggregate([
      {
        $match: {
          timestamp: { $gte: start, $lte: end },
          duration: { $gt: 0, $exists: true },
          sessionId: { $exists: true, $ne: null }
        }
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
            sessionId: "$sessionId"
          },
          totalDuration: { $sum: "$duration" }
        }
      },
      {
        $group: {
          _id: "$_id.date",
          avgDuration: { $avg: "$totalDuration" }
        }
      },
      {
        $project: {
          date: "$_id",
          avgTime: { 
            $round: [
              { $divide: ["$avgDuration", 1000] }, // Convert to seconds
              2
            ]
          }
        }
      },
      { $sort: { date: 1 } }
    ]);

    // Fill in missing dates with 0 average time
    const result = [];
    const currentDate = new Date(start);
    const endDateObj = new Date(end);
    
    while (currentDate <= endDateObj) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const existingData = avgTimeData.find(item => item.date === dateStr);
      
      result.push({
        date: dateStr,
        avgTime: existingData ? existingData.avgTime : 0
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Average time API error:', error);
    return NextResponse.json({ error: 'Failed to fetch average time data' }, { status: 500 });
  }
}