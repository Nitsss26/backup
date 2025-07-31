import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserActionEvent from '@/models/UserActionEvent';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    if (!startDate || !endDate) {
      return NextResponse.json({ error: 'Start date and end date are required' }, { status: 400 });
    }

    await dbConnect();

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    // Get clicks by location (state and city) from UserActionEvent
    const geoData = await UserActionEvent.aggregate([
      {
        $match: {
          timestamp: { $gte: start, $lte: end },
          actionType: 'click'
        }
      },
      {
        $addFields: {
          state: {
            $cond: {
              if: { $ne: ["$geoData.state", null] },
              then: "$geoData.state",
              else: "Punjab"
            }
          },
          city: {
            $cond: {
              if: { $ne: ["$geoData.city", null] },
              then: "$geoData.city",
              else: "Amritsar"
            }
          }
        }
      },
      {
        $group: {
          _id: {
            state: "$state",
            city: "$city"
          },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          state: "$_id.state",
          city: "$_id.city",
          count: 1
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    return NextResponse.json(geoData);
  } catch (error) {
    console.error('Error fetching clicks geo data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}