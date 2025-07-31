
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserActionEventModel from '@/models/UserActionEvent';
import UserModel from '@/models/User'; 

const MAX_LOGS = 20;

export async function GET() {
  await dbConnect();
  try {
    const recentActions = await UserActionEventModel.find({})
      .sort({ timestamp: -1 })
      .limit(MAX_LOGS)
      .populate({
        path: 'userId',
        model: UserModel,
        select: 'name', 
      })
      .lean();

    return NextResponse.json(recentActions);
  } catch (error) {
    console.error('Failed to fetch recent user actions:', error);
    const err = error as Error;
    return NextResponse.json({ message: 'Failed to fetch recent user actions', error: err.message }, { status: 500 });
  }
}
