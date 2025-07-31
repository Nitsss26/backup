
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import VisitEventModel from '@/models/VisitEvent';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    await dbConnect();

    const topPages = await VisitEventModel.aggregate([
      {
        $group: {
          _id: "$path",
          uniqueSessions: { $addToSet: "$sessionId" },
          totalDuration: { $sum: '$duration' }
        }
      },
      {
        $project: {
          path: "$_id",
          views: { $size: "$uniqueSessions" },
          avgDuration: {
            $cond: [
              { $eq: [{ $size: "$uniqueSessions" }, 0] },
              0,
              { $divide: ["$totalDuration", { $size: "$uniqueSessions" }] }
            ]
          },
          _id: 0
        }
      },
      { $sort: { views: -1 } },
      { $limit: 20 }
    ]);

    return NextResponse.json(topPages);

  } catch (error) {
    console.error('Error fetching top pages:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
