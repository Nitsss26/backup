
import { NextResponse, type NextRequest } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import CourseModel from '@/models/Course';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json([]); // Return empty array if no query
    }

    // Find courses where the title matches the query (case-insensitive)
    // Limit to 5 results and select only title and id for a lightweight response.
    const suggestions = await CourseModel.find(
      { 
        title: { $regex: query, $options: 'i' },
        approvalStatus: 'approved'
      },
      'title' // Select only the title and _id fields (id is virtual)
    )
    .limit(5)
    .lean();

    return NextResponse.json(suggestions.map(s => ({...s, id: s._id.toString()})));

  } catch (error: any) {
    console.error('🔴 Failed to fetch course suggestions:', error);
    return NextResponse.json(
      { message: 'Failed to fetch suggestions: ' + error.message },
      { status: 500 }
    );
  }
}
