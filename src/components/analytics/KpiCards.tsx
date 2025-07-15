
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Activity, 
  Clock, 
  ShoppingCart, 
  TrendingUp, 
  Percent, 
  MousePointerClick, 
  Eye, 
  ShoppingBag,
  Globe 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface KpiCardsProps {
  startDate: string;
  endDate: string;
}

export default function KpiCards({ startDate, endDate }: KpiCardsProps) {
  const [totalUsersData, setTotalUsersData] = useState({
    value: '0',
    trend: 'No data'
  });
  const [totalSessionsData, setTotalSessionsData] = useState({
    value: '0',
    trend: 'No data'
  });
  const [totalSalesData, setTotalSalesData] = useState({
    value: '$0',
    trend: 'No data'
  });
  const [totalEnrollmentsData, setTotalEnrollmentsData] = useState({
    value: '0',
    trend: 'No data'
  });
  const [totalEngagementsData, setTotalEngagementsData] = useState({
    value: '0',
    trend: 'No data'
  });
  const [avgTimeData, setAvgTimeData] = useState({
    value: '0:00',
    trend: 'No data'
  });
  const [impressionsData, setImpressionsData] = useState({
    value: '0',
    trend: 'No data'
  });
  const [conversionData, setConversionData] = useState({
    value: '0.00%',
    trend: 'No data'
  });
  const [cartCountData, setCartCountData] = useState({
    value: '0',
    trend: 'No data'
  });

  useEffect(() => {
    // Fetch Total Users
    const fetchTotalUsers = async () => {
      try {
        const response = await fetch(
          `/api/analytics/totalusers?startDate=${startDate}&endDate=${endDate}`
        );
        if (!response.ok) throw new Error('Failed to fetch total users');
        const data = await response.json();
        if (data && (data.totalUsers || data.totalUsers === 0)) {
          setTotalUsersData({
            value: data.totalUsers.toLocaleString(),
            trend: data.increment || 'No data'
          });
        }
      } catch (error) {
        console.error('Error fetching total users:', error);
        setTotalUsersData({ value: '0', trend: 'Error' });
      }
    };

    // Fetch Total Sessions
    const fetchTotalSessions = async () => {
      try {
        const response = await fetch(
          `/api/analytics/sessions?startDate=${startDate}&endDate=${endDate}`
        );
        if (!response.ok) throw new Error('Failed to fetch total sessions');
        const data = await response.json();
        if (data && (data.totalSessions || data.totalSessions === 0)) {
          setTotalSessionsData({
            value: data.totalSessions.toLocaleString(),
            trend: data.increment || 'No data'
          });
        }
      } catch (error) {
        console.error('Error fetching total sessions:', error);
        setTotalSessionsData({ value: '0', trend: 'Error' });
      }
    };

    // Fetch Total Sales
    const fetchTotalSales = async () => {
      try {
        const response = await fetch(
          `/api/analytics/sales?startDate=${startDate}&endDate=${endDate}`
        );
        if (!response.ok) throw new Error('Failed to fetch total sales');
        const data = await response.json();
        if (data && (data.totalSales || data.totalSales === 0)) {
          setTotalSalesData({
            value: `₹${data.totalSales.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            trend: data.increment || 'No data'
          });
        }
      } catch (error) {
        console.error('Error fetching total sales:', error);
        setTotalSalesData({ value: '$0', trend: 'Error' });
      }
    };

    // Fetch Total Enrollments
    const fetchTotalEnrollments = async () => {
      try {
        const response = await fetch(
          `/api/analytics/enrollments?startDate=${startDate}&endDate=${endDate}`
        );
        if (!response.ok) throw new Error('Failed to fetch total enrollments');
        const data = await response.json();
        if (data && (data.totalEnrollments || data.totalEnrollments === 0)) {
          setTotalEnrollmentsData({
            value: data.totalEnrollments.toLocaleString(),
            trend: data.increment || 'No data'
          });
        }
      } catch (error) {
        console.error('Error fetching total enrollments:', error);
        setTotalEnrollmentsData({ value: '0', trend: 'Error' });
      }
    };

    // Fetch Total Engagements
    const fetchTotalEngagements = async () => {
      try {
        const response = await fetch(
          `/api/analytics/engagements?startDate=${startDate}&endDate=${endDate}`
        );
        if (!response.ok) throw new Error('Failed to fetch total engagements');
        const data = await response.json();
        if (data && (data.totalEngagements || data.totalEngagements === 0)) {
          setTotalEngagementsData({
            value: data.totalEngagements.toLocaleString(),
            trend: data.increment || 'No data'
          });
        }
      } catch (error) {
        console.error('Error fetching total engagements:', error);
        setTotalEngagementsData({ value: '0', trend: 'Error' });
      }
    };

    // Fetch Avg Time
    const fetchAvgTime = async () => {
      try {
        const response = await fetch(
          `/api/analytics/avg-time?startDate=${startDate}&endDate=${endDate}`
        );
        if (!response.ok) throw new Error('Failed to fetch avg time');
        const data = await response.json();
        if (data && data.avgTime) {
          setAvgTimeData({
            value: data.avgTime,
            trend: data.increment || 'No data'
          });
        }
      } catch (error) {
        console.error('Error fetching avg time:', error);
        setAvgTimeData({ value: '0:00', trend: 'Error' });
      }
    };

    // Fetch Impressions
    const fetchImpressions = async () => {
      try {
        const response = await fetch(
          `/api/analytics/impressions?startDate=${startDate}&endDate=${endDate}`
        );
        if (!response.ok) throw new Error('Failed to fetch impressions');
        const data = await response.json();
        if (data && (data.totalImpressions || data.totalImpressions === 0)) {
          setImpressionsData({
            value: data.totalImpressions.toLocaleString(),
            trend: data.increment || 'No data'
          });
        }
      } catch (error) {
        console.error('Error fetching impressions:', error);
        setImpressionsData({ value: '0', trend: 'Error' });
      }
    };

    // Fetch Conversion %
    const fetchConversion = async () => {
      try {
        const response = await fetch(
          `/api/analytics/conversion?startDate=${startDate}&endDate=${endDate}`
        );
        if (!response.ok) throw new Error('Failed to fetch conversion');
        const data = await response.json();
        if (data && (data.conversion || data.conversion === 0)) {
          setConversionData({
            value: `${Number(data.conversion).toFixed(2)}%`,
            trend: data.increment || 'No data'
          });
        }
      } catch (error) {
        console.error('Error fetching conversion:', error);
        setConversionData({ value: '0.00%', trend: 'Error' });
      }
    };

    // Fetch Cart Count
    const fetchCartCount = async () => {
      try {
        const response = await fetch(
          `/api/analytics/cart-count?startDate=${startDate}&endDate=${endDate}`
        );
        if (!response.ok) throw new Error('Failed to fetch cart count');
        const data = await response.json();
        if (data && (data.cartCount || data.cartCount === 0)) {
          setCartCountData({
            value: data.cartCount.toLocaleString(),
            trend: data.percentageChange !== null 
              ? `${data.trend === 'up' ? '↑' : data.trend === 'down' ? '↓' : '→'} ${Math.abs(data.percentageChange)}%`
              : 'No data'
          });
        }
      } catch (error) {
        console.error('Error fetching cart count:', error);
        setCartCountData({ value: '0', trend: 'Error' });
      }
    };

    fetchTotalUsers();
    fetchTotalSessions();
    fetchTotalSales();
    fetchTotalEnrollments();
    fetchTotalEngagements();
    fetchAvgTime();
    fetchImpressions();
    fetchConversion();
    fetchCartCount();
  }, [startDate, endDate]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
      {[
        { 
          title: 'Total Users', 
          value: totalUsersData.value, 
          icon: Users, 
          color: 'text-blue-500',
          trend: totalUsersData.trend
        },
        { 
          title: 'Sessions', 
          value: totalSessionsData.value, 
          icon: Activity, 
          color: 'text-green-500',
          trend: totalSessionsData.trend
        },
        { 
          title: 'Sales', 
          value: totalSalesData.value, 
          icon: ShoppingCart, 
          color: 'text-purple-500',
          trend: totalSalesData.trend
        },
        { 
          title: 'Enrollments', 
          value: totalEnrollmentsData.value, 
          icon: TrendingUp, 
          color: 'text-cyan-500',
          trend: totalEnrollmentsData.trend
        },
        { 
          title: 'Conversion %', 
          value: conversionData.value, 
          icon: Percent, 
          color: 'text-pink-500',
          trend: conversionData.trend
        },
        { 
          title: 'Avg Time', 
          value: avgTimeData.value, 
          icon: Clock, 
          color: 'text-yellow-500',
          trend: avgTimeData.trend
        },
        { 
          title: 'Engagements', 
          value: totalEngagementsData.value, 
          icon: MousePointerClick, 
          color: 'text-red-500',
          trend: totalEngagementsData.trend
        },
        { 
          title: 'Impressions', 
          value: impressionsData.value, 
          icon: Eye, 
          color: 'text-indigo-500',
          trend: impressionsData.trend
        },
        { 
          title: 'Cart Count', 
          value: cartCountData.value, 
          icon: ShoppingBag, 
          color: 'text-orange-500',
          trend: cartCountData.trend
        },
        { 
          title: 'Geo Analytics', 
          value: '', 
          icon: Globe, 
          color: 'text-gray-500',
          trend: 'View Map',
          link: '/admin/analytics/geo'
        }
      ].map((kpi, index) => (
        <Card key={index} className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">{kpi.title}</CardTitle>
            {kpi.link ? (
              <Button asChild variant="ghost" size="icon" className="h-5 w-5">
                <Link href={kpi.link}>
                  <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                </Link>
              </Button>
            ) : (
              <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{kpi.value || '...'}</div>
            <p className={`text-xs ${kpi.trend.includes('↑') ? 'text-green-500' : kpi.trend.includes('↓') ? 'text-red-500' : 'text-gray-400'} mt-1`}>
              {kpi.trend}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
