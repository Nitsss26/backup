
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import VisitEventModel, { type IVisitEvent } from '@/models/VisitEvent';
import UserModel from '@/models/User'; // Import User model for population

const MAX_LOGS = 15;

export async function GET() {
  await dbConnect();
  try {
    const recentVisits = await VisitEventModel.find({})
      .sort({ timestamp: -1 })
      .limit(MAX_LOGS)
      .populate({
        path: 'userId',
        model: UserModel,
        select: 'name email', // Select only name and email for privacy/brevity
      })
      .lean(); // Use lean for better performance if not modifying docs

    return NextResponse.json(recentVisits);
  } catch (error) {
    console.error('Failed to fetch recent visits:', error);
    const err = error as Error;
    return NextResponse.json({ message: 'Failed to fetch recent visits', error: err.message }, { status: 500 });
  }
}
