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
    
    const sessionsData = await VisitEventModel.aggregate([
      {
        $match: {
          timestamp: { $gte: start, $lte: end },
          sessionId: { $exists: true, $ne: null }
        }
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
            sessionId: "$sessionId"
          }
        }
      },
      {
        $group: {
          _id: "$_id.date",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          date: "$_id",
          count: 1
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
      const existingData = sessionsData.find(item => item.date === dateStr);
      
      result.push({
        date: dateStr,
        count: existingData ? existingData.count : 0
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Sessions API error:', error);
    return NextResponse.json({ error: 'Failed to fetch sessions data' }, { status: 500 });
  }
}