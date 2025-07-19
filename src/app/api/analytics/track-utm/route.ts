
import { NextResponse, type NextRequest } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UtmEventModel from '@/models/UtmEvent';
import logger from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { source } = body;

    if (!source || typeof source !== 'string') {
      logger.warn('[/api/analytics/track-utm POST] Invalid source payload', { body });
      return NextResponse.json({ message: 'Invalid source payload' }, { status: 400 });
    }
    
    await UtmEventModel.create({
        source,
        timestamp: new Date(),
    });

    logger.info('[/api/analytics/track-utm POST] UTM event tracked successfully', { source });
    return NextResponse.json({ success: true, message: 'UTM Event tracked' });

  } catch (error: any) {
    logger.error('[/api/analytics/track-utm POST] Error:', {
      error: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { message: 'Failed to track UTM event', error: error.message },
      { status: 500 }
    );
  }
}
