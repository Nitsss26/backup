import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import mongoose from 'mongoose';

// UTM Event Schema
const utmEventSchema = new mongoose.Schema({
  source: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  sessionId: String,
  userId: String,
  ipAddress: String,
  userAgent: String,
  path: String,
  referrer: String
});

const UTMEvent = mongoose.models.UTMEvent || mongoose.model('UTMEvent', utmEventSchema);

export async function POST(request: Request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { utmSource, sessionId, userId, path, referrer } = body;
    
    // Get client IP and user agent
    const forwarded = request.headers.get('x-forwarded-for');
    const ipAddress = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    // Default to 'google' if no UTM source provided
    const source = utmSource || 'google';
    
    const utmEvent = new UTMEvent({
      source: source.toLowerCase(),
      sessionId,
      userId,
      ipAddress,
      userAgent,
      path: path || '/',
      referrer: referrer || ''
    });
    
    await utmEvent.save();
    
    return NextResponse.json({ success: true, source });
  } catch (error) {
    console.error('UTM tracking error:', error);
    return NextResponse.json({ error: 'Failed to track UTM' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    
    // Get UTM source distribution for pie chart
    const utmData = await UTMEvent.aggregate([
      {
        $group: {
          _id: "$source",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          source: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", "whatsapp"] }, then: "WhatsApp" },
                { case: { $eq: ["$_id", "instagram"] }, then: "Instagram" },
                { case: { $eq: ["$_id", "linkedin"] }, then: "LinkedIn" },
                { case: { $eq: ["$_id", "youtube"] }, then: "YouTube" },
                { case: { $eq: ["$_id", "googleform"] }, then: "Google Form" },
                { case: { $eq: ["$_id", "google"] }, then: "Google" },
                { case: { $eq: ["$_id", "facebook"] }, then: "Facebook" },
                { case: { $eq: ["$_id", "twitter"] }, then: "Twitter" },
                { case: { $eq: ["$_id", "reddit"] }, then: "Reddit" }
              ],
              default: {
                $concat: [
                  { $toUpper: { $substr: ["$_id", 0, 1] } },
                  { $substr: ["$_id", 1, -1] }
                ]
              }
            }
          },
          count: 1
        }
      },
      { $sort: { count: -1 } }
    ]);
    
    return NextResponse.json(utmData);
  } catch (error) {
    console.error('UTM data fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch UTM data' }, { status: 500 });
  }
}