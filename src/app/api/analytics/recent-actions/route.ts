
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserActionEventModel from '@/models/UserActionEvent';
import UserModel from '@/models/User'; 

export async function GET(request: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 20; // 20 entries per page as you requested
    const skip = (page - 1) * limit;

    // Get ALL recent actions with pagination (no date filter to show from day 1)
    const [recentActions, totalCount] = await Promise.all([
      UserActionEventModel.find({})
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(limit)
        .populate({
          path: 'userId',
          model: UserModel,
          select: 'name email', 
        })
        .lean(),
      UserActionEventModel.countDocuments({})
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      data: recentActions,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalCount,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      message: `Showing ALL ${totalCount} user actions from day 1 with pagination`
    });
  } catch (error) {
    console.error('Failed to fetch recent user actions:', error);
    const err = error as Error;
    return NextResponse.json({ message: 'Failed to fetch recent user actions', error: err.message }, { status: 500 });
  }
}
