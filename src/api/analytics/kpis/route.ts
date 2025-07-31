
import { NextResponse, type NextRequest } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import VisitEvent from '@/models/VisitEvent';
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

    // Correctly calculate the previous period's start and end dates
    const duration = endDate.getTime() - startDate.getTime();
    const prevEndDate = new Date(startDate.getTime() - 1); // Day before the start date
    const prevStartDate = new Date(prevEndDate.getTime() - duration);
    
    const calculateTrend = (current: number, previous: number) => {
        if (previous === 0) return current > 0 ? '↑ 100%' : '∞';
        if (current === 0 && previous > 0) return '↓ 100%';
        const percentage = ((current - previous) / previous) * 100;
        const arrow = percentage >= 0 ? '↑' : '↓';
        return `${arrow} ${Math.abs(percentage).toFixed(1)}%`;
    };
    
    // --- Unique Visitors (from VisitEvent model based on uniqueUserId) ---
    const [currentUsers, prevUsers] = await Promise.all([
      VisitEvent.distinct('uniqueUserId', { timestamp: { $gte: startDate, $lte: endDate } }).then(ids => ids.length),
      VisitEvent.distinct('uniqueUserId', { timestamp: { $gte: prevStartDate, $lte: prevEndDate } }).then(ids => ids.length),
    ]);

    // --- Registered Users ---
    const [currentRegistered, prevRegistered] = await Promise.all([
        UserModel.countDocuments({ createdAt: { $gte: startDate, $lte: endDate } }),
        UserModel.countDocuments({ createdAt: { $gte: prevStartDate, $lte: prevEndDate } }),
    ]);

    // --- Sessions (from VisitEvent model) ---
    const [currentSessionsList, prevSessionsList] = await Promise.all([
      VisitEvent.distinct('sessionId', { timestamp: { $gte: startDate, $lte: endDate } }),
      VisitEvent.distinct('sessionId', { timestamp: { $gte: prevStartDate, $lte: prevEndDate } }),
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
        const result = await VisitEvent.aggregate([
            { $match: { timestamp: { $gte: start, $lte: end }, duration: { $gt: 0 } } },
            { $group: { _id: "$sessionId", totalDuration: { $sum: "$duration" } } },
            { $group: { _id: null, avgDuration: { $avg: "$totalDuration" } } }
        ]);
        return result[0]?.avgDuration || 0;
    };
    const currentAvgTime = await avgTimeAggregation(startDate, endDate);
    const prevAvgTime = await avgTimeAggregation(prevStartDate, prevEndDate);

    // --- Conversion Rate (Orders / Sessions) ---
    const currentConversion = currentSessions > 0 ? (currentEnrollments / currentSessions) * 100 : 0;
    const prevConversion = prevSessions > 0 ? (prevEnrollments / prevSessions) * 100 : 0;
    
    // --- Engagements & Impressions ---
     const [currentEngagements, prevEngagements, currentImpressions, prevImpressions, currentCartAdds, prevCartAdds] = await Promise.all([
        UserActionEvent.countDocuments({ timestamp: { $gte: startDate, $lte: endDate } }),
        UserActionEvent.countDocuments({ timestamp: { $gte: prevStartDate, $lte: prevEndDate } }),
        VisitEvent.countDocuments({ timestamp: { $gte: startDate, $lte: endDate } }),
        VisitEvent.countDocuments({ timestamp: { $gte: prevStartDate, $lte: prevEndDate } }),
        UserActionEvent.countDocuments({ actionType: 'add_to_cart', timestamp: { $gte: startDate, $lte: endDate } }),
        UserActionEvent.countDocuments({ actionType: 'add_to_cart', timestamp: { $gte: prevStartDate, $lte: prevEndDate } }),
    ]);

    const formatDuration = (seconds: number) => {
      if(isNaN(seconds) || seconds < 0) return "0m 0s";
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.round(seconds % 60);
      return `${minutes}m ${remainingSeconds}s`;
    };

    return NextResponse.json({
        totalUsers: { value: currentUsers.toLocaleString(), trend: calculateTrend(currentUsers, prevUsers) },
        totalRegisteredUsers: { value: currentRegistered.toLocaleString(), trend: calculateTrend(currentRegistered, prevRegistered) },
        totalSessions: { value: currentSessions.toLocaleString(), trend: calculateTrend(currentSessions, prevSessions) },
        totalSales: { value: `₹${currentSalesValue.toLocaleString('en-IN')}`, trend: calculateTrend(currentSalesValue, prevSalesValue) },
        totalEnrollments: { value: currentEnrollments.toLocaleString(), trend: calculateTrend(currentEnrollments, prevEnrollments) },
        conversionRate: { value: `${currentConversion.toFixed(2)}%`, trend: calculateTrend(currentConversion, prevConversion) },
        avgTime: { value: formatDuration(currentAvgTime), trend: calculateTrend(currentAvgTime, prevAvgTime) },
        engagements: { value: currentEngagements.toLocaleString(), trend: calculateTrend(currentEngagements, prevEngagements) },
        impressions: { value: currentImpressions.toLocaleString(), trend: calculateTrend(currentImpressions, prevImpressions) },
        cartAdds: { value: currentCartAdds.toLocaleString(), trend: calculateTrend(currentCartAdds, prevCartAdds) },
    });

  } catch (error: any) {
    console.error('Error fetching KPI data:', error);
    return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
  }
}
