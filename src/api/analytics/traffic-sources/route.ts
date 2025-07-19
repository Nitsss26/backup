
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import VisitEventModel from '@/models/VisitEvent';
import mongoose from 'mongoose';

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');

    if (!startDateParam || !endDateParam) {
      return NextResponse.json({ error: 'Start date and end date are required' }, { status: 400 });
    }

    const startDate = new Date(startDateParam);
    const endDate = new Date(endDateParam);
    
    // This is the definitive, correct aggregation pipeline.
    const trafficSourcesAggregation = await VisitEventModel.aggregate([
      // 1. Filter all visit events by the selected date range. This is the crucial first step.
      { 
        $match: { 
          timestamp: { 
            $gte: startDate, 
            $lte: endDate 
          } 
        } 
      },
      // 2. Sort by timestamp to reliably find the first event for each session.
      { 
        $sort: { 
          timestamp: 1 
        } 
      },
      // 3. Group by sessionId to find the first document (which contains the original traffic source).
      { 
        $group: { 
          _id: "$sessionId",
          firstVisit: { $first: "$$ROOT" }
        }
      },
      // 4. Now, group these unique first visits by their traffic source and count them.
      { 
        $group: {
            _id: "$firstVisit.trafficSource",
            value: { $sum: 1 }
        }
      },
      // 5. Format the output to be { name, value } for the pie chart.
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
