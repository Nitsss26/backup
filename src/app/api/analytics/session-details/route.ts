import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import VisitEventModel from '@/models/VisitEvent';
import UserModel from '@/models/User';

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');

    if (!startDate || !endDate) {
      return NextResponse.json({ error: 'Start date and end date are required' }, { status: 400 });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const skip = (page - 1) * limit;

    console.log('Fetching session details for period:', start.toISOString(), 'to', end.toISOString());

    // Get session details with user information
    const sessionDetailsPromise = VisitEventModel.aggregate([
      {
        $match: {
          timestamp: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: {
            sessionId: '$sessionId',
            path: '$path',
            userId: '$userId'
          },
          totalDuration: { $sum: '$duration' },
          firstVisit: { $min: '$timestamp' },
          lastVisit: { $max: '$timestamp' },
          visitCount: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id.userId',
          foreignField: '_id',
          as: 'userInfo'
        }
      },
      {
        $project: {
          sessionId: '$_id.sessionId',
          path: '$_id.path',
          userId: '$_id.userId',
          totalDuration: 1,
          firstVisit: 1,
          lastVisit: 1,
          visitCount: 1,
          userName: {
            $cond: {
              if: { $gt: [{ $size: '$userInfo' }, 0] },
              then: { $arrayElemAt: ['$userInfo.name', 0] },
              else: 'Guest'
            }
          },
          userEmail: {
            $cond: {
              if: { $gt: [{ $size: '$userInfo' }, 0] },
              then: { $arrayElemAt: ['$userInfo.email', 0] },
              else: 'guest'
            }
          }
        }
      },
      {
        $sort: { firstVisit: -1 }
      },
      {
        $skip: skip
      },
      {
        $limit: 10
      }
    ]);

    // Get total count for pagination
    const totalCountPromise = VisitEventModel.aggregate([
      {
        $match: {
          timestamp: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: {
            sessionId: '$sessionId',
            path: '$path'
          }
        }
      },
      {
        $count: 'total'
      }
    ]);

    // Execute both queries with timeout
    const [sessionDetails, totalCount] = await Promise.all([
      sessionDetailsPromise,
      totalCountPromise
    ]);

    console.log('Session details results:', sessionDetails.length, 'sessions found');

    const total = totalCount[0]?.total || 0;
    const totalPages = Math.ceil(total / 10);

    // Format the data for the table
    const formattedData = sessionDetails.map(item => ({
      sessionId: item.sessionId,
      name: item.userName || 'Guest',
      email: item.userEmail || 'guest',
      route: item.path,
      timeSpend: formatDuration(item.totalDuration),
      timeSpendSeconds: Math.round(item.totalDuration * 100) / 100, // Round to 2 decimal places
      visitCount: item.visitCount,
      firstVisit: item.firstVisit,
      lastVisit: item.lastVisit
    }));

    console.log('Formatted data sample:', formattedData.slice(0, 3));

    return NextResponse.json({
      data: formattedData,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
        itemsPerPage: 10,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });

  } catch (error) {
    console.error('Error fetching session details:', error);
    
    // Handle specific MongoDB timeout errors
    if (error && typeof error === 'object' && 'name' in error && error.name === 'MongoServerError' && 'code' in error && error.code === 50) {
      return NextResponse.json({ 
        error: 'Query timeout - please try a smaller date range', 
        message: 'The query took too long to execute. Try selecting a shorter time period.' 
      }, { status: 408 });
    }
    
    return NextResponse.json({ 
      error: 'Internal server error', 
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}

function formatDuration(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "0s";
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.round(seconds % 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  } else {
    return `${remainingSeconds}s`;
  }
}