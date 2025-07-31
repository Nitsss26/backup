import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import VisitEventModel from '@/models/VisitEvent';
import UserActionEventModel from '@/models/UserActionEvent';
import ClickEventModel from '@/models/ClickEvent';

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 10; // Fixed 10 entries per page as requested

    if (!startDate || !endDate) {
      return NextResponse.json({ error: 'Start date and end date are required' }, { status: 400 });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    console.log('Fetching route analytics for period:', start.toISOString(), 'to', end.toISOString());

    // Get route analytics from visit events
    const routeAnalyticsPromise = VisitEventModel.aggregate([
      {
        $match: {
          timestamp: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: '$path',
          totalViews: { $sum: 1 },
          totalDuration: { $sum: '$duration' },
          uniqueUsers: { $addToSet: '$uniqueUserId' },
          sessions: { $addToSet: '$sessionId' }
        }
      },
      {
        $project: {
          route: '$_id',
          viewsCount: '$totalViews',
          totalDuration: 1,
          uniqueUsersCount: { $size: '$uniqueUsers' },
          sessionsCount: { $size: '$sessions' },
          averageDuration: {
            $cond: {
              if: { $gt: [{ $size: '$uniqueUsers' }, 0] },
              then: { $divide: ['$totalDuration', { $size: '$uniqueUsers' }] },
              else: 0
            }
          }
        }
      },
      {
        $sort: { viewsCount: -1 }
      }
    ]);

    // Get click data from multiple sources
    const clickDataPromises = [
      // From UserActionEvent (using details.path field)
      UserActionEventModel.aggregate([
        {
          $match: {
            timestamp: { $gte: start, $lte: end },
            actionType: 'click'
          }
        },
        {
          $group: {
            _id: '$details.path',
            totalClicks: { $sum: 1 }
          }
        }
      ]),
      
      // From ClickEvent (using page field)
      ClickEventModel.aggregate([
        {
          $match: {
            timestamp: { $gte: start, $lte: end }
          }
        },
        {
          $group: {
            _id: '$page',
            totalClicks: { $sum: 1 }
          }
        }
      ]).catch(() => []) // Ignore if ClickEvent model doesn't exist
    ];

    // Execute all queries with timeout
    const [routeAnalytics, userActionClicks, clickEventClicks] = await Promise.all([
      routeAnalyticsPromise,
      ...clickDataPromises
    ]);

    console.log('Route analytics results:', routeAnalytics.length, 'routes found');
    console.log('User action clicks:', userActionClicks.length, 'routes with clicks');
    console.log('Click event clicks:', clickEventClicks.length, 'routes with clicks');

    // Combine click data from both sources
    const clickMap = new Map();
    
    // Add clicks from UserActionEvent
    userActionClicks.forEach(item => {
      if (item._id) {
        clickMap.set(item._id, (clickMap.get(item._id) || 0) + item.totalClicks);
      }
    });
    
    // Add clicks from ClickEvent
    clickEventClicks.forEach(item => {
      if (item._id) {
        clickMap.set(item._id, (clickMap.get(item._id) || 0) + item.totalClicks);
      }
    });

    // Combine route analytics with click data
    const combinedData = routeAnalytics.map(route => {
      const clicks = clickMap.get(route.route) || 0;
      return {
        route: route.route,
        viewsCount: route.viewsCount,
        averageDuration: formatDuration(route.averageDuration),
        averageDurationSeconds: Math.round(route.averageDuration * 100) / 100, // Round to 2 decimal places
        clicks: clicks,
        uniqueUsers: route.uniqueUsersCount,
        sessions: route.sessionsCount,
        totalDuration: route.totalDuration
      };
    });

    // Sort by views count (most popular routes first)
    combinedData.sort((a, b) => b.viewsCount - a.viewsCount);

    // Apply pagination (10 entries per page as requested)
    const skip = (page - 1) * limit;
    const paginatedData = combinedData.slice(skip, skip + limit);
    const totalPages = Math.ceil(combinedData.length / limit);

    console.log('Combined data sample:', paginatedData.slice(0, 3));

    return NextResponse.json({
      data: paginatedData,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: combinedData.length,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      summary: {
        totalRoutes: combinedData.length,
        totalViews: combinedData.reduce((sum, route) => sum + route.viewsCount, 0),
        totalClicks: combinedData.reduce((sum, route) => sum + route.clicks, 0),
        totalUniqueUsers: routeAnalytics.reduce((sum, route) => sum + route.uniqueUsersCount, 0)
      }
    });

  } catch (error) {
    console.error('Error fetching route analytics:', error);
    
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