import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserActionEventModel from '@/models/UserActionEvent';
import Order from '@/models/Order';

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

    console.log('Fetching cart vs purchase data for period:', start.toISOString(), 'to', end.toISOString());

    // Get daily add to cart events
    const dailyAddToCart = await UserActionEventModel.aggregate([
      { 
        $match: { 
          timestamp: { $gte: start, $lte: end },
          actionType: 'add_to_cart'
        } 
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
          addToCart: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Get daily completed orders (purchases)
    const dailyPurchases = await Order.aggregate([
      { 
        $match: { 
          orderDate: { $gte: start, $lte: end },
          status: 'completed'
        } 
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$orderDate' } },
          purchases: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Helper function to get all dates in range
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
    const addToCartMap = new Map(dailyAddToCart.map(item => [item._id, item.addToCart]));
    const purchasesMap = new Map(dailyPurchases.map(item => [item._id, item.purchases]));

    // Prepare chart data
    const chartData = datesInRange.map(date => {
      const dateStr = date.toISOString().split('T')[0];
      const addToCart = addToCartMap.get(dateStr) || 0;
      const purchases = purchasesMap.get(dateStr) || 0;
      
      return {
        date: dateStr,
        addToCart,
        purchases,
        conversionRate: addToCart > 0 ? ((purchases / addToCart) * 100).toFixed(2) : 0
      };
    });

    const totalAddToCart = dailyAddToCart.reduce((sum, item) => sum + item.addToCart, 0);
    const totalPurchases = dailyPurchases.reduce((sum, item) => sum + item.purchases, 0);

    console.log(`Total Add to Cart: ${totalAddToCart}, Total Purchases: ${totalPurchases}`);

    return NextResponse.json({
      chartData,
      totals: {
        totalAddToCart,
        totalPurchases,
        overallConversionRate: totalAddToCart > 0 ? ((totalPurchases / totalAddToCart) * 100).toFixed(2) : 0
      },
      calculation: "Add to Cart: Count of add_to_cart actions per day. Purchases: Count of completed orders per day. Shows conversion from cart addition to actual purchase."
    });

  } catch (error) {
    console.error('Error fetching cart vs purchase data:', error);
    return NextResponse.json({ 
      error: 'Internal server error', 
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}