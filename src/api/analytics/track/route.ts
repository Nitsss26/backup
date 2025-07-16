
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import VisitEventModel, { IVisitEvent } from '@/models/VisitEvent';
import ClickEventModel, { IClickEvent } from '@/models/ClickEvent';
import UserActionEventModel from '@/models/UserActionEvent';
import CourseModel from '@/models/Course';
import { subDays } from 'date-fns';
import mongoose from 'mongoose';
import logger from '@/lib/logger';

// Helper function to categorize the referrer
const getTrafficSource = (referrer: string, utmSource?: string | null): string => {
  if (utmSource) {
    return utmSource; // UTM source takes highest priority
  }

  if (!referrer) {
    return 'Direct';
  }
  
  try {
    const referrerUrl = new URL(referrer);
    // Use NEXT_PUBLIC_APP_URL for the app's hostname, default to localhost for dev
    const appHostname = new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9003').hostname;

    if (referrerUrl.hostname.includes(appHostname)) {
        return 'Direct'; // Internal navigation
    }
    
    const hostname = referrerUrl.hostname.toLowerCase();

    if (hostname.includes('google.')) return 'google';
    if (hostname.includes('linkedin.com')) return 'linkedin';
    if (hostname.includes('instagram.com')) return 'instagram';
    if (hostname.includes('t.co') || hostname.includes('x.com') || hostname.includes('twitter.com')) return 'x';
    if (hostname.includes('youtube.com')) return 'youtube';
    if (hostname.includes('facebook.com')) return 'facebook';
    if (hostname.includes('whatsapp.com') || hostname.includes('wa.me')) return 'whatsapp';
    
    return 'Other Referral';
  } catch(e) {
      console.warn("Could not parse referrer URL on backend:", referrer, e);
      return 'Unknown';
  }
};

export async function POST(request: Request) {
  try {
    await dbConnect();

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
      referrer, // We'll get the referrer from the client
      trafficSource: providedTrafficSource, // This will now come from the client, with UTM source prioritized
      details,
    } = body;
    
    // The client-side tracker will now determine the traffic source, including UTM parameters.
    // The backend just records what it's given.
    const trafficSource = providedTrafficSource || getTrafficSource(referrer);

    if (!sessionId) {
      logger.warn('[/api/analytics/track POST] Missing sessionId');
      return NextResponse.json({ message: 'Session ID is required' }, { status: 400 });
    }

    let validCourseId = courseId && mongoose.Types.ObjectId.isValid(courseId) ? new mongoose.Types.ObjectId(courseId) : undefined;

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
      await VisitEventModel.create({
        sessionId,
        path,
        courseId: validCourseId,
        timestamp: timestamp ? new Date(timestamp) : new Date(),
        duration: 0, // Initial visit event
        geoData: sanitizedGeoData,
        device,
        browser,
        trafficSource,
        type: 'visit',
      });
    } else if (type === 'click') {
       if (!elementType || !elementText) {
        logger.warn('[/api/analytics/track POST] Missing elementType or elementText for click event');
        return NextResponse.json({ message: 'Element type and text are required for click event' }, { status: 400 });
      }
      await ClickEventModel.create({
        sessionId,
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
      // Instead of creating a new event, we update the existing visit event with duration.
      await VisitEventModel.updateOne(
        { sessionId, path, duration: 0 }, // Find the initial visit event
        { $set: { duration } },
        { sort: { timestamp: -1 } } // Update the most recent one if duplicates exist
      );
    } else if (type === 'scroll') {
      await UserActionEventModel.create({
        sessionId,
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

    logger.info('[/api/analytics/track POST] Event tracked successfully', { type, sessionId, trafficSource });
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
