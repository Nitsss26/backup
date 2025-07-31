
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import VisitEventModel from '@/models/VisitEvent';
import UserActionEventModel from '@/models/UserActionEvent';
import TrafficSourceEventModel from '@/models/TrafficSourceEvent';
import mongoose from 'mongoose';
import logger from '@/lib/logger';
import UserModel from '@/models/User'; // Import user model for unique user logic

// Fallback function to determine traffic source from referrer
const getTrafficSourceFromReferrer = (referrer: string): string => {
  if (!referrer) return 'Direct';
  
  try {
    const referrerUrl = new URL(referrer);
    const appHostname = new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://www.edtechcart.com').hostname;

    if (referrerUrl.hostname.includes(appHostname)) return 'Direct';
    
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
      logger.warn("Could not parse referrer URL on backend:", { referrer, error: (e as Error).message });
      return 'Unknown';
  }
};

// Main POST handler for all analytics events
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { type: eventType, sessionId, uniqueUserId, ...eventData } = body;

    if (!sessionId) {
      logger.warn('[/api/analytics/track POST] Missing sessionId');
      return NextResponse.json({ message: 'Session ID is required' }, { status: 400 });
    }
    
    let userRecord = null;
    if (eventData.userId) { // Check for authenticated user ID from payload
        const isValidId = mongoose.Types.ObjectId.isValid(eventData.userId);
        if(isValidId) {
            userRecord = await UserModel.findById(eventData.userId);
        }
    }
    
    // Determine traffic source: prioritize frontend-provided source, then fallback to referrer
    const trafficSource = eventData.trafficSource || getTrafficSourceFromReferrer(eventData.referrer || '');
    
    const commonData = {
      sessionId,
      uniqueUserId, // Store the persistent client-side ID
      userId: userRecord?._id, // Store the DB user ID if found
      timestamp: eventData.timestamp ? new Date(eventData.timestamp) : new Date(),
      geoData: {
        country: eventData.geoData?.country || 'unknown',
        city: eventData.geoData?.city || 'unknown',
        state: eventData.geoData?.state || 'unknown',
        lat: eventData.geoData?.lat || 0,
        lng: eventData.geoData?.lng || 0,
      },
      device: eventData.device,
      browser: eventData.browser,
      trafficSource,
      courseId: eventData.courseId && mongoose.Types.ObjectId.isValid(eventData.courseId) ? new mongoose.Types.ObjectId(eventData.courseId) : undefined,
    };
    
    switch (eventType) {
      case 'page_view':
        // Record the first traffic source for a session
        await TrafficSourceEventModel.findOneAndUpdate(
          { sessionId },
          { $setOnInsert: { sessionId, trafficSource, timestamp: commonData.timestamp } },
          { upsert: true, new: true }
        );
        
        await VisitEventModel.create({
          ...commonData,
          path: eventData.path,
          duration: 0,
        });
        break;

      case 'duration':
        await VisitEventModel.updateOne(
          { sessionId: sessionId, path: eventData.path },
          { $set: { duration: eventData.details.duration } },
          { sort: { timestamp: -1 } }
        );
        break;

      case 'click':
      case 'scroll':
      case 'add_to_cart':
      case 'add_to_wishlist':
        await UserActionEventModel.create({
          ...commonData,
          actionType: eventType,
          details: { 
            path: eventData.details.path,
            elementType: eventData.details.elementType, 
            elementText: eventData.details.elementText, 
            href: eventData.details.href,
            section: eventData.details.section,
            scrollDepth: eventData.details?.scrollDepth,
            itemId: eventData.details?.itemId,
            itemType: eventData.details?.itemType,
            itemTitle: eventData.details?.itemTitle,
          },
        });
        break;
        
      default:
        logger.warn('[/api/analytics/track POST] Invalid event type:', eventType);
        return NextResponse.json({ message: 'Invalid event type' }, { status: 400 });
    }

    logger.info('[/api/analytics/track POST] Event tracked successfully', { eventType, sessionId, trafficSource });
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
