import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import VisitEventModel from '@/models/VisitEvent';
import UserActionEvent from '@/models/UserActionEvent';
import Order from '@/models/Order';
import User from '@/models/User';
import Course from '@/models/Course';
import ClickEvent from '@/models/ClickEvent';
import mongoose from 'mongoose';

interface AnalyticsResponse {
  events: { time: string; type: string; count: number }[];
  enrollments: { time: string; count: number }[];
  cartCount: { time: string; count: number; courseId?: mongoose.Types.ObjectId }[];
  rating: number;
  totalReviews: number;
  averageDuration?: number;
}

export async function GET() {
  await dbConnect();
  const sellerId = '6845b4ad188aa67dd4093431';

  try {
    if (!mongoose.Types.ObjectId.isValid(sellerId)) {
      return NextResponse.json({ error: 'Invalid seller ID format' }, { status: 400 });
    }

    const seller = await User.findById(sellerId);
    if (!seller) {
      return NextResponse.json({ error: 'Seller not found' }, { status: 404 });
    }

    const courses = await Course.find({ seller: new mongoose.Types.ObjectId(sellerId) }).select('_id reviewsCount');
    const sellerCourseIds = courses.map(c => c._id);
    if (sellerCourseIds.length === 0) {
      return NextResponse.json({ error: 'No courses found for this seller' }, { status: 404 });
    }

    const start = new Date('2025-06-01T00:00:00Z');
    const end = new Date('2025-06-27T14:22:00Z');
    const diffHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    const dateFormat = diffHours <= 24 ? '%Y-%m-%d %H:00' : '%Y-%m-%d';

    // 1. Visit Events
    const visitEvents = await VisitEventModel.aggregate([
      { $match: { courseId: { $in: sellerCourseIds }, timestamp: { $gte: start, $lte: end } } },
      {
        $group: {
          _id: {
            time: { $dateToString: { format: dateFormat, date: '$timestamp' } },
            type: 'Page View'
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.time': 1 } }
    ]);

    // 2. User Action Events (add_to_cart, remove_from_cart, etc.)
    const actionEvents = await UserActionEvent.aggregate([
      { $match: { courseId: { $in: sellerCourseIds }, timestamp: { $gte: start, $lte: end } } },
      {
        $group: {
          _id: {
            time: { $dateToString: { format: dateFormat, date: '$timestamp' } },
            type: '$actionType'
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.time': 1 } }
    ]);

    // 3. ClickEvent Engagements (e.g., Description, FAQ, etc.)
    const engagementClicks = await ClickEvent.aggregate([
      {
        $match: {
          courseId: { $in: sellerCourseIds },
          timestamp: { $gte: start, $lte: end },
          elementText: { $nin: ['Add to Cart', 'Remove', 'Courses', 'View Details'] }
        }
      },
      {
        $group: {
          _id: {
            time: { $dateToString: { format: dateFormat, date: '$timestamp' } },
            type: '$elementText'
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.time': 1 } }
    ]);

    const events = [...visitEvents, ...actionEvents, ...engagementClicks].map(e => ({
      time: e._id.time,
      type: e._id.type,
      count: e.count
    }));

    // 4. Enrollments
    const enrollments = await Order.aggregate([
      {
        $match: {
          'items.course': { $in: sellerCourseIds },
          orderDate: { $gte: start, $lte: end },
          status: 'completed'
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: dateFormat, date: '$orderDate' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // 5. Cart Click Events
    const clickCartEvents = await ClickEvent.aggregate([
      {
        $match: {
          courseId: { $in: sellerCourseIds },
          timestamp: { $gte: start, $lte: end }
        }
      },
      { $sort: { timestamp: -1 } },
      {
        $group: {
          _id: {
            time: { $dateToString: { format: dateFormat, date: '$timestamp' } },
            courseId: '$courseId'
          },
          addCount: {
            $sum: {
              $cond: {
                if: { $in: ['$elementText', ['Courses', 'View Details', 'Add to Cart']] },
                then: 1,
                'else': 0
              }
            }
          },
          removeCount: {
            $sum: {
              $cond: {
                if: { $eq: ['$elementText', 'Remove'] },
                then: 1,
                'else': 0
              }
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          time: '$_id.time',
          courseId: '$_id.courseId',
          count: { $subtract: ['$addCount', '$removeCount'] }
        }
      },
      { $match: { count: { $ne: 0 } } },
      { $sort: { time: 1 } }
    ]);

    // 6. Cart UserAction Events
    const actionCartEvents = await UserActionEvent.aggregate([
      {
        $match: {
          courseId: { $in: sellerCourseIds },
          timestamp: { $gte: start, $lte: end },
          actionType: { $in: ['add_to_cart', 'remove_from_cart'] }
        }
      },
      {
        $group: {
          _id: {
            time: { $dateToString: { format: dateFormat, date: '$timestamp' } },
            courseId: '$courseId'
          },
          addCount: {
            $sum: {
              $cond: {
                if: { $eq: ['$actionType', 'add_to_cart'] },
                then: 1,
                'else': 0
              }
            }
          },
          removeCount: {
            $sum: {
              $cond: {
                if: { $eq: ['$actionType', 'remove_from_cart'] },
                then: 1,
                'else': 0
              }
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          time: '$_id.time',
          courseId: '$_id.courseId',
          count: { $subtract: ['$addCount', '$removeCount'] }
        }
      },
      { $match: { count: { $ne: 0 } } },
      { $sort: { time: 1 } }
    ]);

    const cartEvents = [...clickCartEvents, ...actionCartEvents].reduce((acc, curr) => {
      const existing = acc.find(e => e.time === curr.time && e.courseId?.equals(curr.courseId));
      if (existing) existing.count += curr.count;
      else acc.push(curr);
      return acc;
    }, []).map(e => ({ time: e.time, count: e.count, courseId: e.courseId }));

    // 7. Live Cart Snapshot
    const latestSessionClicks = await ClickEvent.find({
      sessionId: {
        $in: ['0020990d-93a4-40fd-8c97-b7d1bb0472ed', '876469be-218c-4495-879b-fa52cd7e9350']
      },
      courseId: { $in: sellerCourseIds }
    }).sort({ timestamp: -1 }).lean();

    const currentCartActions = latestSessionClicks.reduce((acc, click) => {
      const courseId = click.courseId as mongoose.Types.ObjectId;
      if (!acc[courseId]) acc[courseId] = { add: 0, remove: 0 };
      if (['Courses', 'View Details', 'Add to Cart'].includes(click.elementText) && !acc[courseId].add)
        acc[courseId].add += 1;
      if (click.elementText === 'Remove') acc[courseId].remove += 1;
      return acc;
    }, {} as Record<string, { add: number; remove: number }>);

    const currentCartCount = Object.values(currentCartActions).reduce(
      (sum, a) => sum + (a.add - a.remove),
      0
    );

    const cartDetails = Object.entries(currentCartActions)
      .map(([cid, action]) => ({
        courseId: new mongoose.Types.ObjectId(cid),
        netCount: action.add - action.remove,
        sellerId
      }))
      .filter(e => e.netCount > 0);

    // 8. Ratings & Review Count
    const totalReviews = courses.reduce((sum, c) => sum + (c.reviewsCount || 0), 0);

    const ratings = await Course.aggregate([
      { $match: { seller: new mongoose.Types.ObjectId(sellerId) } },
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'courseId',
          as: 'courseReviews'
        }
      },
      { $unwind: { path: '$courseReviews', preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$courseReviews.rating' }
        }
      }
    ]);

    const averageRating = ratings[0]?.avgRating || 0;

    const response: AnalyticsResponse = {
      events,
      enrollments: enrollments.map(e => ({ time: e._id, count: e.count })),
      cartCount: cartEvents,
      rating: averageRating,
      totalReviews
    };

    return NextResponse.json({ ...response, currentCartCount, cartDetails });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: (error as Error).message }, { status: 500 });
  }
}
