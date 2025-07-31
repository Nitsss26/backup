
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserActionEventModel from '@/models/UserActionEvent';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 20; // 20 entries per page as you requested
    const skip = (page - 1) * limit;

    // Build query - if no date range provided, show ALL from day 1
    const query: any = { actionType: 'add_to_cart' };

    if (startDate && endDate) {
        query.timestamp = {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
        };
    }
    // If no date range, show ALL entries from day 1 (no date filter)

    console.log('Fetching add_to_cart events:', query);

    // Get ALL add to cart events with pagination and complete user details
    const [addToCartEvents, totalCount] = await Promise.all([
      UserActionEventModel.aggregate([
        { $match: query },
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
            actionType: 1,
            details: 1,
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
        { $sort: { timestamp: -1 } },
        { $skip: skip },
        { $limit: limit }
      ]),
      UserActionEventModel.countDocuments(query)
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    console.log(`Found ${totalCount} total add_to_cart events, showing page ${page}`);

    return NextResponse.json({
      data: addToCartEvents,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalCount,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      message: `Showing ALL ${totalCount} add to cart events with user details and session IDs`
    });

  } catch (error) {
    console.error('Error fetching add_to_cart events:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
