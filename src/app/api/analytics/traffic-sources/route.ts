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
    
    // Only count the first visit of each session to avoid skewing data
    const firstVisits = await VisitEventModel.aggregate([
      { $sort: { timestamp: 1 } },
      { 
        $group: { 
          _id: "$sessionId",
          firstVisit: { $first: "$$ROOT" }
        }
      },
      { $replaceRoot: { newRoot: "$firstVisit" } },
      { $match: matchStage } // Apply date filter after identifying first visits
    ]);

    // Now, group these first visits by traffic source
    const trafficSources = firstVisits.reduce((acc, visit) => {
        const source = visit.trafficSource || 'Unknown';
        acc[source] = (acc[source] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const formattedData = Object.entries(trafficSources).map(([name, value]) => ({
      name,
      value,
    }));
    
    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('Error fetching traffic sources:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
