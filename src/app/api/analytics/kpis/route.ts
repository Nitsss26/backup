
import { NextResponse, type NextRequest } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import VisitEventModel from '@/models/VisitEvent';
import Order from '@/models/Order';
import UserActionEvent from '@/models/UserActionEvent';
import UserModel from '@/models/User';
import { subDays, differenceInDays } from 'date-fns';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');

    if (!startDateParam || !endDateParam) {
      return NextResponse.json({ message: "Start date and end date are required." }, { status: 400 });
    }

    const endDate = new Date(endDateParam);
    const startDate = new Date(startDateParam);
    
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return NextResponse.json({ message: "Invalid date format provided." }, { status: 400 });
    }

    const dateDiff = differenceInDays(endDate, startDate);
    const prevStartDate = subDays(startDate, dateDiff + 1);
    const prevEndDate = subDays(endDate, dateDiff + 1);

    const calculateTrend = (current: number, previous: number) => {
        if (previous === 0) return current > 0 ? '↑ 100%' : '∞';
        if (current === 0 && previous > 0) return '↓ 100%';
        const percentage = ((current - previous) / previous) * 100;
        const arrow = percentage >= 0 ? '↑' : '↓';
        return `${arrow} ${Math.abs(percentage).toFixed(1)}%`;
    };
    
    // --- Unique Users (from VisitEvent model based on uniqueUserId) ---
    const [currentUsers, prevUsers] = await Promise.all([
      VisitEventModel.distinct('uniqueUserId', { timestamp: { $gte: startDate, $lte: endDate } }).then(ids => ids.length),
      VisitEventModel.distinct('uniqueUserId', { timestamp: { $gte: prevStartDate, $lte: prevEndDate } }).then(ids => ids.length),
    ]);

    // --- Device-specific Unique Users ---
    const [currentDesktopUsers, prevDesktopUsers, currentMobileUsers, prevMobileUsers] = await Promise.all([
      VisitEventModel.distinct('uniqueUserId', { timestamp: { $gte: startDate, $lte: endDate }, device: 'Desktop' }).then(ids => ids.length),
      VisitEventModel.distinct('uniqueUserId', { timestamp: { $gte: prevStartDate, $lte: prevEndDate }, device: 'Desktop' }).then(ids => ids.length),
      VisitEventModel.distinct('uniqueUserId', { timestamp: { $gte: startDate, $lte: endDate }, device: 'Mobile' }).then(ids => ids.length),
      VisitEventModel.distinct('uniqueUserId', { timestamp: { $gte: prevStartDate, $lte: prevEndDate }, device: 'Mobile' }).then(ids => ids.length),
    ]);

    // --- Registered Users ---
    const [currentRegistered, prevRegistered] = await Promise.all([
        UserModel.countDocuments({ createdAt: { $gte: startDate, $lte: endDate } }),
        UserModel.countDocuments({ createdAt: { $gte: prevStartDate, $lte: prevEndDate } }),
    ]);

    // --- Sessions (from VisitEvent model) ---
    const [currentSessionsList, prevSessionsList] = await Promise.all([
      VisitEventModel.distinct('sessionId', { timestamp: { $gte: startDate, $lte: endDate } }),
      VisitEventModel.distinct('sessionId', { timestamp: { $gte: prevStartDate, $lte: prevEndDate } }),
    ]);
    const currentSessions = currentSessionsList.length;
    const prevSessions = prevSessionsList.length;

    // --- Sales & Enrollments (from Order model) ---
    const [currentOrders, prevOrders] = await Promise.all([
      Order.find({ orderDate: { $gte: startDate, $lte: endDate }, status: 'completed' }).lean(),
      Order.find({ orderDate: { $gte: prevStartDate, $lte: prevEndDate }, status: 'completed' }).lean(),
    ]);
    const currentSalesValue = currentOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    const prevSalesValue = prevOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    const currentEnrollments = currentOrders.length;
    const prevEnrollments = prevOrders.length;


    // --- Avg Session Duration ---
    const avgTimeAggregation = async (start: Date, end: Date) => {
        const result = await VisitEventModel.aggregate([
            { $match: { timestamp: { $gte: start, $lte: end }, duration: { $gt: 0 } } },
            { $group: { _id: "$sessionId", totalDuration: { $sum: "$duration" } } },
            { $group: { _id: null, avgDuration: { $avg: "$totalDuration" } } }
        ]);
        return result[0]?.avgDuration || 0;
    };
    const currentAvgTime = await avgTimeAggregation(startDate, endDate);
    const prevAvgTime = await avgTimeAggregation(prevStartDate, prevEndDate);

    // --- Average Sessions per User ---
    const currentAvgSessionsPerUser = currentUsers > 0 ? (currentSessions / currentUsers) : 0;
    const prevAvgSessionsPerUser = prevUsers > 0 ? (prevSessions / prevUsers) : 0;

    // --- Conversion Rate (Orders / Sessions) ---
    const currentConversion = currentSessions > 0 ? (currentEnrollments / currentSessions) * 100 : 0;
    const prevConversion = prevSessions > 0 ? (prevEnrollments / prevSessions) * 100 : 0;
    
    // --- Engagements & Impressions ---
     const [currentEngagements, prevEngagements, currentImpressions, prevImpressions, currentCartAdds, prevCartAdds] = await Promise.all([
        UserActionEvent.countDocuments({ timestamp: { $gte: startDate, $lte: endDate } }),
        UserActionEvent.countDocuments({ timestamp: { $gte: prevStartDate, $lte: prevEndDate } }),
        VisitEventModel.countDocuments({ timestamp: { $gte: startDate, $lte: endDate } }),
        VisitEventModel.countDocuments({ timestamp: { $gte: prevStartDate, $lte: prevEndDate } }),
        UserActionEvent.countDocuments({ actionType: 'add_to_cart', timestamp: { $gte: startDate, $lte: endDate } }),
        UserActionEvent.countDocuments({ actionType: 'add_to_cart', timestamp: { $gte: prevStartDate, $lte: prevEndDate } }),
    ]);

    const formatDuration = (seconds: number) => {
      if(isNaN(seconds) || seconds < 0) return "0m 0s";
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.round(seconds % 60);
      return `${minutes}m ${remainingSeconds}s`;
    };

    // Get additional metrics for new KPI cards
    const [currentClicks, prevClicks, currentAddToCart, prevAddToCart, currentAddToWishlist, prevAddToWishlist] = await Promise.all([
        UserActionEvent.countDocuments({ actionType: 'click', timestamp: { $gte: startDate, $lte: endDate } }),
        UserActionEvent.countDocuments({ actionType: 'click', timestamp: { $gte: prevStartDate, $lte: prevEndDate } }),
        UserActionEvent.countDocuments({ actionType: 'add_to_cart', timestamp: { $gte: startDate, $lte: endDate } }),
        UserActionEvent.countDocuments({ actionType: 'add_to_cart', timestamp: { $gte: prevStartDate, $lte: prevEndDate } }),
        UserActionEvent.countDocuments({ actionType: 'add_to_wishlist', timestamp: { $gte: startDate, $lte: endDate } }),
        UserActionEvent.countDocuments({ actionType: 'add_to_wishlist', timestamp: { $gte: prevStartDate, $lte: prevEndDate } }),
    ]);

    return NextResponse.json({
        uniqueUsers: { value: currentUsers.toLocaleString(), trend: calculateTrend(currentUsers, prevUsers) },
        totalSessions: { value: currentSessions.toLocaleString(), trend: calculateTrend(currentSessions, prevSessions) },
        totalRegisteredUsers: { value: currentRegistered.toLocaleString(), trend: calculateTrend(currentRegistered, prevRegistered) },
        totalSales: { value: `₹${currentSalesValue.toLocaleString('en-IN')}`, trend: calculateTrend(currentSalesValue, prevSalesValue) },
        totalEngagements: { value: currentEngagements.toLocaleString(), trend: calculateTrend(currentEngagements, prevEngagements), info: "All user interactions: clicks, scrolls, form submissions, cart actions, etc." },
        totalImpressions: { value: currentImpressions.toLocaleString(), trend: calculateTrend(currentImpressions, prevImpressions), info: "Total page views and content displays across the platform" },
        totalAddToCart: { value: currentAddToCart.toLocaleString(), trend: calculateTrend(currentAddToCart, prevAddToCart) },
        totalAddToWishlist: { value: currentAddToWishlist.toLocaleString(), trend: calculateTrend(currentAddToWishlist, prevAddToWishlist) },
        totalClicks: { value: currentClicks.toLocaleString(), trend: calculateTrend(currentClicks, prevClicks) },
        avgTime: { value: formatDuration(currentAvgTime), trend: calculateTrend(currentAvgTime, prevAvgTime) },
    });

  } catch (error: any) {
    console.error('Error fetching KPI data:', error);
    return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
  }
}
