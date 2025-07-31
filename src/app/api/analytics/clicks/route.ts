import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserActionEventModel from '@/models/UserActionEvent';
import ClickEventModel from '@/models/ClickEvent';
import UserModel from '@/models/User';

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

    console.log('Fetching ALL click events for period:', start.toISOString(), 'to', end.toISOString());

    // Get ALL click events with user information (no limit)
    const allClickEvents = await UserActionEventModel.aggregate([
      {
        $match: {
          timestamp: { $gte: start, $lte: end },
          actionType: 'click'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userInfo'
        }
      },
      {
        $project: {
          timestamp: 1,
          sessionId: 1,
          userId: 1,
          'details.path': 1,
          'details.elementType': 1,
          'details.elementText': 1,
          'details.section': 1,
          'details.href': 1,
          userName: {
            $cond: {
              if: { $gt: [{ $size: '$userInfo' }, 0] },
              then: { $arrayElemAt: ['$userInfo.name', 0] },
              else: 'Guest'
            }
          },
          userEmail: {
            $cond: {
              if: { $gt: [{ $size: '$userInfo' }, 0] },
              then: { $arrayElemAt: ['$userInfo.email', 0] },
              else: 'guest'
            }
          }
        }
      },
      { $sort: { timestamp: -1 } }
    ]);

    console.log(`Found ${allClickEvents.length} total click events`);

    return NextResponse.json({
      data: allClickEvents,
      total: allClickEvents.length,
      message: `Showing ALL ${allClickEvents.length} click events in the selected period`
    });

  } catch (error) {
    console.error('Error fetching click events:', error);
    return NextResponse.json({ 
      error: 'Internal server error', 
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}