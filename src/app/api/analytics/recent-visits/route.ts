
// import { NextResponse } from 'next/server';
// import dbConnect from '@/lib/dbConnect';
// import VisitEventModel, { type IVisitEvent } from '@/models/VisitEvent';
// import UserModel from '@/models/User'; // Import User model for population

// const MAX_LOGS = 15;

// export async function GET() {
//   await dbConnect();
//   try {
//     const recentVisits = await VisitEventModel.find({})
//       .sort({ timestamp: -1 })
//       .limit(MAX_LOGS)
//       .populate({
//         path: 'userId',
//         model: UserModel,
//         select: 'name email', // Select only name and email for privacy/brevity
//       })
//       .lean(); // Use lean for better performance if not modifying docs

//     return NextResponse.json(recentVisits);
//   } catch (error) {
//     console.error('Failed to fetch recent visits:', error);
//     const err = error as Error;
//     return NextResponse.json({ message: 'Failed to fetch recent visits', error: err.message }, { status: 500 });
//   }
// }



import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import VisitEventModel, { IVisitEvent } from '@/models/VisitEvent';
import UserModel from '@/models/User';
import { subMinutes } from 'date-fns';

const MAX_LOGS = 15;

export async function GET() {
  await dbConnect();
  try {
    // Aggregate visits by sessionId within 30 minutes
    const recentVisits = await VisitEventModel.aggregate([
      {
        $match: {
          timestamp: { $gte: subMinutes(new Date(), 30) },
        },
      },
      {
        $group: {
          _id: '$sessionId',
          path: { $first: '$path' }, // Take the first path in the session
          userId: { $first: '$userId' },
          visitorAlias: { $first: '$visitorAlias' },
          timestamp: { $max: '$timestamp' },
          duration: { $sum: '$duration' },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userId',
        },
      },
      {
        $unwind: {
          path: '$userId',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          path: 1,
          sessionId: '$_id',
          userId: {
            _id: '$userId._id',
            name: '$userId.name',
            email: '$userId.email',
          },
          visitorAlias: 1,
          timestamp: 1,
          duration: 1,
        },
      },
      { $sort: { timestamp: -1 } },
      { $limit: MAX_LOGS },
    ]);

    return NextResponse.json(recentVisits);
  } catch (error) {
    console.error('Failed to fetch recent visits:', error);
    const err = error as Error;
    return NextResponse.json({ message: 'Failed to fetch recent visits', error: err.message }, { status: 500 });
  }
}