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
    
    const bounceRateData = await VisitEventModel.aggregate([
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
          },
          pageViews: { $sum: 1 },
          paths: { $addToSet: "$path" }
        }
      },
      {
        $group: {
          _id: "$_id.date",
          totalSessions: { $sum: 1 },
          bouncedSessions: {
            $sum: {
              $cond: [
                { $eq: [{ $size: "$paths" }, 1] }, // Only visited one page (bounce)
                1,
                0
              ]
            }
          }
        }
      },
      {
        $project: {
          date: "$_id",
          bounceRate: {
            $cond: [
              { $eq: ["$totalSessions", 0] },
              0,
              {
                $multiply: [
                  { $divide: ["$bouncedSessions", "$totalSessions"] },
                  100
                ]
              }
            ]
          }
        }
      },
      { $sort: { date: 1 } }
    ]);

    // Fill in missing dates with 0 bounce rate
    const result = [];
    const currentDate = new Date(start);
    const endDateObj = new Date(end);
    
    while (currentDate <= endDateObj) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const existingData = bounceRateData.find(item => item.date === dateStr);
      
      result.push({
        date: dateStr,
        bounceRate: existingData ? Math.round(existingData.bounceRate * 100) / 100 : 0
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Bounce rate API error:', error);
    return NextResponse.json({ error: 'Failed to fetch bounce rate data' }, { status: 500 });
  }
}