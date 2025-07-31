import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import VisitEvent from '@/models/VisitEvent';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { 
      sessionId, 
      uniqueUserId, 
      path, 
      url, 
      duration = 0,
      device,
      browser,
      userAgent,
      userId = null 
    } = body;

    // Parse UTM parameters from URL
    let utmSource = 'google'; // Default to google
    let utmMedium = null;
    let utmCampaign = null;
    let trafficSource = 'google'; // Default to google

    if (url) {
      const urlObj = new URL(url, 'http://localhost'); // Base URL for parsing
      const searchParams = urlObj.searchParams;
      
      // Extract UTM parameters
      const urlUtmSource = searchParams.get('utm_source') || searchParams.get('utmsource');
      if (urlUtmSource) {
        utmSource = urlUtmSource.toLowerCase();
        trafficSource = urlUtmSource.toLowerCase();
      }
      
      utmMedium = searchParams.get('utm_medium') || searchParams.get('utmmedium');
      utmCampaign = searchParams.get('utm_campaign') || searchParams.get('utmcampaign');
    }

    // Create visit event
    const visitEvent = new VisitEvent({
      userId,
      sessionId,
      uniqueUserId,
      path,
      url,
      timestamp: new Date(),
      duration,
      device,
      browser,
      userAgent,
      trafficSource,
      utmSource,
      utmMedium,
      utmCampaign,
      geoData: {
        country: 'India',
        city: 'Mumbai', // Default city
        state: 'Maharashtra', // Default state
        lat: 19.0760,
        lng: 72.8777
      }
    });

    await visitEvent.save();

    return NextResponse.json({ 
      success: true, 
      message: 'Visit tracked successfully',
      utmSource,
      trafficSource 
    });

  } catch (error) {
    console.error('Error tracking visit:', error);
    return NextResponse.json(
      { error: 'Failed to track visit' },
      { status: 500 }
    );
  }
}