
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UtmEventModel from '@/models/UtmEvent'; // Using the new, dedicated model

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
    
    // The new, definitive, and simple aggregation pipeline using the dedicated collection.
    const trafficSourcesAggregation = await UtmEventModel.aggregate([
      // 1. Filter the UTM events by the selected date range.
      { 
        $match: { 
          timestamp: { 
            $gte: startDate, 
            $lte: endDate 
          } 
        } 
      },
      // 2. Group by the source field and count the number of documents in each group.
      { 
        $group: {
            _id: "$source",
            value: { $sum: 1 }
        }
      },
      // 3. Format the output to be { name, value } for the pie chart.
      {
        $project: {
          _id: 0,
          name: { $ifNull: ["$_id", "Unknown"] }, // Handle cases where source might be null
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
