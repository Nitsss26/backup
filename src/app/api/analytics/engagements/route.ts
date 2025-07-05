import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import ClickEvent from '@/models/ClickEvent';
import UserActionEvent from '@/models/UserActionEvent';
import dbConnect from '@/lib/dbConnect';

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    if (!startDate || !endDate) {
      return NextResponse.json({ error: 'Start date and end date are required' }, { status: 400 });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Calculate the previous period for comparison
    const dateDiff = end.getTime() - start.getTime();
    const prevStart = new Date(start.getTime() - dateDiff);
    const prevEnd = new Date(end.getTime() - dateDiff);

    // Count engagements in current period (ClickEvent + UserActionEvent)
    const clickCount = await ClickEvent.countDocuments({
      timestamp: { $gte: start, $lte: end }
    });

    const actionCount = await UserActionEvent.countDocuments({
      actionType: { $in: ['click', 'add_to_cart', 'view_cart', 'start_checkout', 'scroll'] },
      timestamp: { $gte: start, $lte: end }
    });

    const currentEngagements = clickCount + actionCount;

    // Count engagements in previous period
    const prevClickCount = await ClickEvent.countDocuments({
      timestamp: { $gte: prevStart, $lte: prevEnd }
    });

    const prevActionCount = await UserActionEvent.countDocuments({
      actionType: { $in: ['click', 'add_to_cart', 'view_cart', 'start_checkout', 'scroll'] },
      timestamp: { $gte: prevStart, $lte: prevEnd }
    });

    const previousEngagements = prevClickCount + prevActionCount;

    // Calculate daily engagement counts for the chart
    const dailyClicks = await ClickEvent.aggregate([
      {
        $match: {
          timestamp: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$timestamp' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    const dailyActions = await UserActionEvent.aggregate([
      {
        $match: {
          actionType: { $in: ['click', 'add_to_cart', 'view_cart', 'start_checkout', 'scroll'] },
          timestamp: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$timestamp' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Merge daily clicks and actions
    const clicksMap = new Map(dailyClicks.map(item => [item._id, item.count]));
    const actionsMap = new Map(dailyActions.map(item => [item._id, item.count]));

    // Generate all dates in range
    function getDatesInRange(start: Date, end: Date) {
      const dates = [];
      let currentDate = new Date(start);
      while (currentDate <= end) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return dates;
    }

    const datesInRange = getDatesInRange(start, end);
    const chartData = datesInRange.map(date => {
      const dateStr = date.toISOString().split('T')[0];
      const clickCount = clicksMap.get(dateStr) || 0;
      const actionCount = actionsMap.get(dateStr) || 0;
      return {
        date: dateStr,
        engagements: clickCount + actionCount
      };
    });

    // Calculate increment percentage
    const increment = currentEngagements - previousEngagements;
    const incrementPercentage = previousEngagements > 0 
      ? ((increment / previousEngagements) * 100).toFixed(1)
      : currentEngagements > 0 ? '100' : '0';
    const trend = `${increment >= 0 ? '↑' : '↓'} ${Math.abs(Number(incrementPercentage))}% from previous period`;

    return NextResponse.json({
      totalEngagements: currentEngagements,
      increment: trend,
      chartData
    });
  } catch (error) {
    console.error('Error fetching engagements analytics:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}