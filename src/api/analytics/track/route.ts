
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import VisitEventModel from '@/models/VisitEvent';
import ClickEventModel from '@/models/ClickEvent';
import UserActionEventModel from '@/models/UserActionEvent';
import TrafficSourceEventModel from '@/models/TrafficSourceEvent'; // Import the new model
import mongoose from 'mongoose';
import logger from '@/lib/logger';

// Helper function to categorize the referrer
const getTrafficSource = (referrer: string): string => {
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
    
    // Exact or "contains" matching for hostnames. More robust.
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
      timestamp,
      geoData,
      device,
      browser,
      referrer,
      trafficSource: providedTrafficSource, // This is the source determined on the client (e.g., from utm_source)
      details,
    } = body;
    
    // CRITICAL FIX: Prioritize the traffic source sent from the frontend.
    // Only fall back to deriving from referrer if the frontend couldn't determine it.
    const trafficSource = providedTrafficSource || getTrafficSource(referrer);
    console.log(`[BACKEND /api/analytics/track] Received trafficSource: ${trafficSource}`);


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
      
      // Atomically create the TrafficSourceEvent if it doesn't exist for this session
      // This ensures we only record the *first* source for a session
      await TrafficSourceEventModel.findOneAndUpdate(
        { sessionId: sessionId },
        { $setOnInsert: { sessionId: sessionId, trafficSource: trafficSource, timestamp: new Date(timestamp) } },
        { upsert: true, new: true }
      );

      // Create the visit event itself
      await VisitEventModel.create({
        type: 'visit', // Fix: Add the required 'type' field
        sessionId,
        path,
        courseId: validCourseId,
        timestamp: timestamp ? new Date(timestamp) : new Date(),
        duration: 0, // Duration is updated later
        geoData: sanitizedGeoData,
        device,
        browser,
        trafficSource, // Also store it on the visit event for direct analysis
      });

    } else if (type === 'click') {
       if (!elementType || !elementText) {
        logger.warn('[/api/analytics/track POST] Missing elementType or elementText for click event');
        return NextResponse.json({ message: 'Element type and text are required for click event' }, { status: 400 });
      }
      await ClickEventModel.create({
        type: 'click', // Add type for consistency
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
      });
    } else if (type === 'duration') {
       if (!path || !Number.isFinite(duration) || duration < 0) {
        logger.warn('[/api/analytics/track POST] Missing or invalid path/duration for duration event');
        return NextResponse.json({ message: 'Path and valid duration are required for duration event' }, { status: 400 });
      }
      
      // Update the visit event to set its duration.
      await VisitEventModel.updateOne(
        { sessionId, path, duration: 0 }, // Find the initial visit event for this path
        { 
            $set: { 
                type: 'visit', // Fix: Add the required 'type' field
                duration,
                timestamp: timestamp ? new Date(timestamp) : new Date(),
                geoData: sanitizedGeoData,
                device,
                browser,
            } 
        },
        { sort: { timestamp: -1 } } // Update the most recent one if multiple exist
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
