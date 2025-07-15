
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import VisitEventModel from '@/models/VisitEvent';

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const matchStage: any = {};

    if (startDate && endDate) {
      matchStage.timestamp = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }
    
    // This pipeline correctly finds the first visit for each session within the date range
    // and then groups those unique sessions by traffic source.
    const trafficSourcesAggregation = await VisitEventModel.aggregate([
      // First, filter all visits by the selected date range
      { $match: matchStage },
      // Sort by timestamp to reliably find the first event per session
      { $sort: { timestamp: 1 } },
      // Group by sessionId to find the first document for each session
      { 
        $group: { 
          _id: "$sessionId",
          firstVisit: { $first: "$$ROOT" }
        }
      },
      // Now, group these unique first visits by their traffic source and count them
      { 
        $group: {
            _id: "$firstVisit.trafficSource",
            value: { $sum: 1 }
        }
      },
      // Format the output to be { name, value }
      {
        $project: {
          _id: 0,
          name: { $ifNull: ["$_id", "Unknown"] }, // Handle cases where trafficSource might be null
          value: "$value"
        }
      }
    ]);

    return NextResponse.json(trafficSourcesAggregation);

  } catch (error) {
    console.error('Error fetching traffic sources:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
