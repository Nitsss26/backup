import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import VisitEvent from '@/models/VisitEvent';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Get top pages by visit count with average duration
    const topPages = await VisitEvent.aggregate([
      {
        $match: {
          timestamp: {
            $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
          }
        }
      },
      {
        $group: {
          _id: '$path',
          views: { $sum: 1 },
          totalDuration: { $sum: '$duration' },
          avgDuration: { $avg: '$duration' }
        }
      },
      {
        $project: {
          path: '$_id',
          views: 1,
          avgDuration: { $ifNull: ['$avgDuration', 0] },
          _id: 0
        }
      },
      {
        $sort: { views: -1 }
      },
      {
        $limit: 20
      }
    ]);

    return NextResponse.json(topPages);
  } catch (error) {
    console.error('Error fetching top pages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch top pages data' },
      { status: 500 }
    );
  }
}