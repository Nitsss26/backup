
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserActionEventModel, { type IUserActionEvent } from '@/models/UserActionEvent';
import UserModel from '@/models/User'; // Import User model for population

const MAX_LOGS = 15;

export async function GET() {
  await dbConnect();
  try {
    const recentActions = await UserActionEventModel.find({})
      .sort({ timestamp: -1 })
      .limit(MAX_LOGS)
      .populate({
        path: 'userId',
        model: UserModel,
        select: 'name email', // Select only name and email
      })
      .lean();

    return NextResponse.json(recentActions);
  } catch (error) {
    console.error('Failed to fetch recent user actions:', error);
    const err = error as Error;
    return NextResponse.json({ message: 'Failed to fetch recent user actions', error: err.message }, { status: 500 });
  }
}
