import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import mongoose from 'mongoose';

// Use the UTM Event model
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

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    
    // Set date range - default to last 30 days if not provided
    const end = endDate ? new Date(endDate) : new Date();
    const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    
    const trafficData = await UTMEvent.aggregate([
      {
        $match: {
          timestamp: { $gte: start, $lte: end }
        }
      },
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

    return NextResponse.json(trafficData);
  } catch (error) {
    console.error('Traffic sources API error:', error);
    return NextResponse.json({ error: 'Failed to fetch traffic sources data' }, { status: 500 });
  }
}