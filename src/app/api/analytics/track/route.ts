import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import VisitEventModel, { IVisitEvent } from '@/models/VisitEvent';
import ClickEventModel, { IClickEvent } from '@/models/ClickEvent';
import UserActionEventModel from '@/models/UserActionEvent';
import CourseModel from '@/models/Course';
import { subDays } from 'date-fns';
import mongoose from 'mongoose';
import logger from '@/lib/logger';

export async function POST(request: Request) {
  try {
    // Attempt to connect to MongoDB
    try {
      await dbConnect();
    } catch (dbError) {
      logger.error('[/api/analytics/track POST] Database connection failed', {
        error: (dbError as Error).message,
        stack: (dbError as Error).stack,
      });
      return NextResponse.json(
        { message: 'Database connection failed, please try again later' },
        { status: 503 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch (error) {
      logger.warn('[/api/analytics/track POST] Invalid JSON payload', { error: (error as Error).message });
      return NextResponse.json({ message: 'Invalid JSON payload' }, { status: 400 });
    }

    if (!body || typeof body !== 'object') {
      logger.warn('[/api/analytics/track POST] Empty or non-object body received');
      return NextResponse.json({ message: 'Request body is required' }, { status: 400 });
    }

    const {
      type,
      sessionId,
      path,
      elementType,
      elementText,
      href,
      duration,
      courseId,
      visitorAlias: providedVisitorAlias,
      timestamp,
      geoData,
      device,
      browser,
      trafficSource,
      details,
    } = body;

    if (!sessionId) {
      logger.warn('[/api/analytics/track POST] Missing sessionId');
      return NextResponse.json({ message: 'Session ID is required' }, { status: 400 });
    }

    let visitorAlias = providedVisitorAlias || `A${(await VisitEventModel.distinct('sessionId')).length + 1}`;
    const existingSession = await VisitEventModel.findOne({ sessionId }).sort({ timestamp: -1 });
    if (existingSession?.visitorAlias) {
      visitorAlias = existingSession.visitorAlias;
    }

    let validCourseId = courseId && mongoose.Types.ObjectId.isValid(courseId) ? new mongoose.Types.ObjectId(courseId) : undefined;

    // Sanitize geoData
    const sanitizedGeoData = {
      country: geoData?.country || 'unknown',
      city: geoData?.city || 'unknown',
      state: geoData?.state || 'unknown',
      lat: geoData?.lat || 0,
      lng: geoData?.lng || 0,
    };

    if (type === 'visit') {
      if (!path) {
        logger.warn('[/api/analytics/track POST] Missing path for visit event');
        return NextResponse.json({ message: 'Path is required for visit event' }, { status: 400 });
      }
      const existingVisit = await VisitEventModel.findOne({ sessionId, path, duration: 0 });
      if (existingVisit && duration > 0) {
        await VisitEventModel.updateOne(
          { _id: existingVisit._id },
          {
            $set: {
              duration,
              timestamp: timestamp ? new Date(timestamp) : new Date(),
              geoData: sanitizedGeoData,
              device,
              browser,
              trafficSource,
            },
          }
        );
      } else {
        await VisitEventModel.create({
          sessionId,
          path,
          visitorAlias,
          courseId: validCourseId,
          timestamp: timestamp ? new Date(timestamp) : new Date(),
          duration: duration || 0,
          geoData: sanitizedGeoData,
          device,
          browser,
          trafficSource,
          type: 'visit',
        });
      }
    } else if (type === 'click') {
      if (!elementType || !elementText) {
        logger.warn('[/api/analytics/track POST] Missing elementType or elementText for click event');
        return NextResponse.json({ message: 'Element type and text are required for click event' }, { status: 400 });
      }
      await ClickEventModel.create({
        sessionId,
        visitorAlias,
        elementType,
        elementText,
        href,
        courseId: validCourseId,
        timestamp: timestamp ? new Date(timestamp) : new Date(),
        geoData: sanitizedGeoData,
        device,
        browser,
        trafficSource,
        type: 'click',
      });
    } else if (type === 'duration') {
      if (!path || !Number.isFinite(duration) || duration < 0) {
        logger.warn('[/api/analytics/track POST] Missing or invalid path/duration for duration event');
        return NextResponse.json({ message: 'Path and valid duration are required for duration event' }, { status: 400 });
      }
      const existingVisit = await VisitEventModel.findOne({ sessionId, path });
      if (existingVisit) {
        await VisitEventModel.updateOne(
          { _id: existingVisit._id },
          {
            $set: {
              duration,
              timestamp: timestamp ? new Date(timestamp) : new Date(),
              geoData: sanitizedGeoData,
              device,
              browser,
              trafficSource,
            },
          }
        );
      } else {
        await VisitEventModel.create({
          sessionId,
          path,
          visitorAlias,
          courseId: validCourseId,
          timestamp: timestamp ? new Date(timestamp) : new Date(),
          duration,
          geoData: sanitizedGeoData,
          device,
          browser,
          trafficSource,
          type: 'duration',
        });
      }
    } else if (type === 'scroll') {
      await UserActionEventModel.create({
        sessionId,
        visitorAlias,
        actionType: 'scroll',
        details: details || { scrollDepth: 0 },
        courseId: validCourseId,
        timestamp: timestamp ? new Date(timestamp) : new Date(),
        geoData: sanitizedGeoData,
        device,
        browser,
        trafficSource,
      });
    } else {
      logger.warn('[/api/analytics/track POST] Invalid event type:', type);
      return NextResponse.json({ message: 'Invalid event type' }, { status: 400 });
    }

    logger.info('[/api/analytics/track POST] Event tracked successfully', { type, sessionId, visitorAlias });
    return NextResponse.json({ success: true, message: 'Event tracked' });
  } catch (error: any) {
    logger.error('[/api/analytics/track POST] Error:', {
      error: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { message: 'Failed to track event', error: error.message },
      { status: 500 }
    );
  }
}

// Existing GET endpoint remains unchanged
export async function GET(request: Request) {
  try {
    logger.info('[/api/analytics/track GET] Request received with params:', { url: request.url });
    try {
      await dbConnect();
    } catch (dbError) {
      logger.error('[/api/analytics/track GET] Database connection failed', {
        error: (dbError as Error).message,
        stack: (dbError as Error).stack,
      });
      return NextResponse.json(
        { message: 'Database connection failed, please try again later' },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(request.url);

    if (searchParams.get('debug') === 'true') {
      try {
        const collections = ['visitevents', 'clickevents', 'courses', 'studentprogress'];
        const stats = await Promise.all(
          collections.map(async (col) => ({
            [col]: await mongoose.connection.db.collection(col).countDocuments(),
          })),
        );
        const databaseName = mongoose.connection.db.databaseName;
        logger.info('[/api/analytics/track GET] Debug response:', {
          collections,
          ...Object.assign({}, ...stats),
          database: databaseName,
        });
        return NextResponse.json({
          collections,
          ...Object.assign({}, ...stats),
          database: databaseName,
          status: 'ok',
        });
      } catch (error: any) {
        logger.error('[/api/analytics/track GET] Debug error:', error.message);
        return NextResponse.json({ message: 'Debug failed', error: error.message }, { status: 500 });
      }
    }

    const timeRange = searchParams.get('timeRange') || '30days';
    const pagePath = searchParams.get('pagePath');
    const provider = searchParams.get('provider');
    const visitorAlias = searchParams.get('visitorAlias');
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');

    logger.info('[/api/analytics/track GET] Filters:', { timeRange, pagePath, provider, visitorAlias, startDateParam, endDateParam });

    let startDate: Date;
    let endDate: Date = new Date();

    if (startDateParam && endDateParam && timeRange === 'custom') {
      startDate = new Date(startDateParam);
      endDate = new Date(endDateParam);
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        logger.warn('[/api/analytics/track GET] Invalid startDate or endDate:', { startDateParam, endDateParam });
        return NextResponse.json({ message: 'Invalid startDate or endDate' }, { status: 400 });
      }
      if (startDate > endDate) {
        logger.warn('[/api/analytics/track GET] startDate is after endDate:', { startDateParam, endDateParam });
        return NextResponse.json({ message: 'startDate cannot be after endDate' }, { status: 400 });
      }
    } else {
      switch (timeRange) {
        case '7days':
          startDate = subDays(new Date(), 7);
          break;
        case '90days':
          startDate = subDays(new Date(), 90);
          break;
        case '30days':
        default:
          startDate = subDays(new Date(), 30);
          break;
      }
    }

    const visitFilters: any = { timestamp: { $gte: startDate, $lte: endDate } };
    const clickFilters: any = { timestamp: { $gte: startDate, $lte: endDate } };
    if (pagePath) visitFilters.path = pagePath;
    if (visitorAlias) {
      visitFilters.visitorAlias = visitorAlias;
      clickFilters.visitorAlias = visitorAlias;
    }
    if (provider) {
      logger.info('[/api/analytics/track GET] Fetching courses for provider:', { provider });
      const courses = await CourseModel.find({ 'providerInfo.name': provider }, '_id').lean();
      if (!courses.length) {
        logger.warn('[/api/analytics/track GET] No courses found for provider:', { provider });
        visitFilters.courseId = null;
        clickFilters.courseId = null;
      } else {
        const courseIds = courses.map(c => c._id);
        visitFilters.courseId = { $in: courseIds };
        clickFilters.courseId = { $in: courseIds };
      }
    }

    const [sessions, courseAnalytics, pageTypes] = await Promise.all([
      VisitEventModel.aggregate([
        { $match: visitFilters },
        {
          $group: {
            _id: '$sessionId',
            visitorAlias: { $first: '$visitorAlias' },
            totalTimeSpent: { $sum: '$duration' },
            pagesVisited: { $addToSet: '$path' },
          },
        },
        {
          $lookup: {
            from: 'clickevents',
            localField: '_id',
            foreignField: 'sessionId',
            pipeline: [{ $match: clickFilters }],
            as: 'clickEvents',
          },
        },
        {
          $project: {
            sessionId: '$_id',
            visitorAlias: 1,
            totalTimeSpent: 1,
            totalClicks: { $size: '$clickEvents' },
            pagesVisited: 1,
            clickEvents: {
              $map: {
                input: '$clickEvents',
                as: 'click',
                in: {
                  _id: '$$click._id',
                  elementType: '$$click.elementType',
                  elementText: '$$click.elementText',
                  href: '$$click.href',
                  courseId: '$$click.courseId',
                  timestamp: '$$click.timestamp',
                },
              },
            },
          },
        },
        { $sort: { totalTimeSpent: -1 } },
      ]).catch(err => {
        logger.error('[/api/analytics/track GET] Session aggregation failed:', err.message);
        return [];
      }),

      VisitEventModel.aggregate([
        { $match: { ...visitFilters, courseId: { $ne: null } } },
        {
          $lookup: {
            from: 'courses',
            localField: 'courseId',
            foreignField: '_id',
            as: 'course',
          },
        },
        {
          $unwind: {
            path: '$course',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: '$courseId',
            title: { $first: { $ifNull: ['$course.title', 'Unknown Course'] } },
            provider: { $first: { $ifNull: ['$course.providerInfo.name', 'Unknown Provider'] } },
            category: { $first: { $ifNull: ['$course.category', 'Uncategorized'] } },
            pageViews: { $sum: 1 },
            totalTimeSpent: { $sum: '$duration' },
          },
        },
        {
          $lookup: {
            from: 'clickevents',
            let: { courseId: '$_id' },
            pipeline: [
              { $match: { ...clickFilters, courseId: { $expr: { $eq: ['$courseId', '$$courseId'] } } } },
              { $match: { href: { $ne: null } } },
            ],
            as: 'clicks',
          },
        },
        {
          $project: {
            courseId: '$_id',
            title: 1,
            provider: 1,
            category: 1,
            pageViews: 1,
            totalTimeSpent: 1,
            redirectClicks: { $size: '$clicks' },
            ctr: {
              $cond: [
                { $eq: ['$pageViews', 0] },
                0,
                { $multiply: [{ $divide: [{ $size: '$clicks' }, '$pageViews'] }, 100] },
              ],
            },
          },
        },
        { $sort: { pageViews: -1 } },
        { $limit: 50 },
      ]).catch(err => {
        logger.error('[/api/analytics/track GET] Course aggregation failed:', err.message);
        return [];
      }),

      VisitEventModel.aggregate([
        { $match: visitFilters },
        {
          $group: {
            _id: {
              $cond: [
                { $eq: ['$path', '/'] },
                'Home',
                {
                  $cond: [
                    { $regexMatch: { input: '$path', regex: '^/courses($|/.*)' } },
                    'Courses',
                    {
                      $cond: [
                        { $regexMatch: { input: '$path', regex: '^/about($|/.*)' } },
                        'About',
                        'Other',
                      ],
                    },
                  ],
                },
              ],
            },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            pageType: '$_id',
            count: 1,
          },
        },
      ]).catch(err => {
        logger.error('[/api/analytics/track GET] Page type aggregation failed:', err.message);
        return [];
      }),
    ]);

    logger.info('[/api/analytics/track GET] Successfully fetched data:', {
      sessionsCount: sessions.length,
      courseAnalyticsCount: courseAnalytics.length,
      pageTypesCount: pageTypes.length,
    });

    return NextResponse.json({ sessions, courseAnalytics, pageTypes });
  } catch (error: any) {
    logger.error('[/api/analytics/track GET] Error:', {
      error: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { message: 'Failed to fetch analytics', error: error.message },
      { status: 500 }
    );
  }
}
