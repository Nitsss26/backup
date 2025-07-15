
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
        logger.warn('[/api/analytics/geo/india GET] Invalid timeframe:', timeframe);
        return NextResponse.json({ message: 'Invalid timeframe' }, { status: 400 });
    }

    logger.info('[/api/analytics/geo/india GET] Fetching geo data for India cities with filters:', { timeframe, startDate, endDate });

    const cityData = await VisitEventModel.aggregate([
      {
        $match: {
          'geoData.country': 'India',
          timestamp: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: '$geoData.city',
          activeUsersCount: { $addToSet: '$sessionId' },
        },
      },
      {
        $project: {
          city: '$_id',
          activeUsersCount: { $size: '$activeUsersCount' },
          _id: 0,
        },
      },
      { $sort: { activeUsersCount: -1 } },
      { $limit: 20 },
    ]);

    logger.info('[/api/analytics/geo/india GET] Successfully fetched data:', {
      cityCount: cityData.length,
      cities: cityData.map(d => d.city),
    });

    return NextResponse.json(cityData);
  } catch (error: any) {
    logger.error('[/api/analytics/geo/india GET] Error:', {
      error: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { message: 'Failed to fetch city geo analytics', error: error.message },
      { status: 500 }
    );
  }
}
