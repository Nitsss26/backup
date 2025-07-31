import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import VisitEvent from '@/models/VisitEvent';

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    
    // Set date range - default to last 30 days if not provided
    const end = endDate ? new Date(endDate) : new Date();
    const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    
    const engagementsData = await VisitEvent.aggregate([
      {
        $match: {
          timestamp: { $gte: start, $lte: end },
          $or: [
            { duration: { $gt: 30000 } }, // Sessions longer than 30 seconds
            { path: { $regex: /courses|subscriptions|contact|about/i } }, // Engagement pages
            { path: { $ne: "/" } } // Any page other than home
          ]
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$timestamp" }
          },
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
      const existingData = engagementsData.find(item => item.date === dateStr);
      
      result.push({
        date: dateStr,
        count: existingData ? existingData.count : 0
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Engagements API error:', error);
    return NextResponse.json({ error: 'Failed to fetch engagements data' }, { status: 500 });
  }
}