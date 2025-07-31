
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserActionEventModel from '@/models/UserActionEvent';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    await dbConnect();

    // Fetch the latest click events
    const clicks = await UserActionEventModel.find({ actionType: 'click' })
      .sort({ timestamp: -1 })
      .limit(50)
      .populate({
        path: 'userId',
        select: 'name', 
      })
      .lean();

    return NextResponse.json(clicks);

  } catch (error) {
    console.error('Error fetching click events:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
