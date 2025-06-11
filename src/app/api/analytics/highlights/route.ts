
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import VisitEventModel from '@/models/VisitEvent';
import CourseViewEventModel from '@/models/CourseViewEvent';
import UserActionEventModel from '@/models/UserActionEvent';
import OrderModel from '@/models/Order';
import { subDays } from 'date-fns';

export const dynamic = 'force-dynamic'; // Ensure dynamic rendering

export async function GET() {
  await dbConnect();
  try {
    const totalSiteVisits = await VisitEventModel.countDocuments();
    // For unique visitors, counting distinct sessionIds is a basic approach.
    // A more robust solution might involve distinct userIds for logged-in users and sessionIds for anonymous.
    const uniqueVisitorsResults = await VisitEventModel.distinct('sessionId');
    const uniqueVisitors = uniqueVisitorsResults.length;

    const totalCourseViews = await CourseViewEventModel.countDocuments();
    const successfulCheckouts = await OrderModel.countDocuments({ status: 'completed' });
    const newSignups = await UserActionEventModel.countDocuments({ actionType: 'signup' });

    const thirtyDaysAgo = subDays(new Date(), 30);
    // Counting distinct userIds that performed any action in the last 30 days
    const activeUsersResults = await UserActionEventModel.distinct('userId', { 
      timestamp: { $gte: thirtyDaysAgo } 
    });
    const activeUsers = activeUsersResults.length;


    return NextResponse.json({
      totalSiteVisits,
      uniqueVisitors,
      totalCourseViews,
      successfulCheckouts,
      newSignups,
      activeUsers,
    });
  } catch (error) {
    console.error('Failed to fetch analytics highlights:', error);
    const err = error as Error;
    return NextResponse.json({ message: 'Failed to fetch analytics highlights', error: err.message }, { status: 500 });
  }
}
