
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import VisitEventModel from '@/models/VisitEvent';
import { subMinutes, subHours } from 'date-fns';
import logger from '@/lib/logger';

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get('timeframe') || '30m';

    let startDate: Date;
    const endDate = new Date();

    switch (timeframe) {
      case '30m':
        startDate = subMinutes(endDate, 30);
        break;
      case '1h':
        startDate = subHours(endDate, 1);
        break;
      case '6h':
        startDate = subHours(endDate, 6);
        break;
      case '24h':
        startDate = subHours(endDate, 24);
        break;
      default:
        logger.warn('[/api/analytics/geo/india/states GET] Invalid timeframe:', timeframe);
        return NextResponse.json({ message: 'Invalid timeframe' }, { status: 400 });
    }

    logger.info('[/api/analytics/geo/india/states GET] Fetching geo data for India states with filters:', { timeframe, startDate, endDate });

    const stateData = await VisitEventModel.aggregate([
      {
        $match: {
          'geoData.country': 'India',
          timestamp: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: '$geoData.state',
          activeUsersCount: { $addToSet: '$sessionId' },
        },
      },
      {
        $project: {
          state: '$_id',
          activeUsersCount: { $size: '$activeUsersCount' },
          _id: 0,
        },
      },
      { $sort: { activeUsersCount: -1 } },
      { $limit: 20 },
    ]);

    logger.info('[/api/analytics/geo/india/states GET] Successfully fetched data:', {
      stateCount: stateData.length,
      states: stateData.map(d => d.state),
    });

    return NextResponse.json(stateData);
  } catch (error: any) {
    logger.error('[/api/analytics/geo/india/states GET] Error:', {
      error: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { message: 'Failed to fetch state geo analytics', error: error.message },
      { status: 500 }
    );
  }
}
