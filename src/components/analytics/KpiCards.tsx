
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, Activity, ShoppingCart, Clock, MousePointerClick, Eye, UserPlus, Heart, Info 
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface KpiCardsProps {
  startDate?: string;
  endDate?: string;
}

const kpiConfig = [
    { key: 'uniqueUsers', title: 'Unique Users', icon: Users, color: 'text-blue-400' },
    { key: 'totalSessions', title: 'Total Sessions', icon: Activity, color: 'text-green-400' },
    { key: 'totalRegisteredUsers', title: 'Registered', icon: UserPlus, color: 'text-teal-400' },
    { key: 'totalSales', title: 'Sales', icon: ShoppingCart, color: 'text-orange-400' },
    { key: 'totalEngagements', title: 'Engagements', icon: MousePointerClick, color: 'text-purple-400' },
    { key: 'totalImpressions', title: 'Impressions', icon: Eye, color: 'text-cyan-400' },
    { key: 'totalAddToCart', title: 'Add to Cart', icon: ShoppingCart, color: 'text-pink-400' },
    { key: 'totalAddToWishlist', title: 'Wishlist', icon: Heart, color: 'text-red-400' },
    { key: 'totalClicks', title: 'Total Clicks', icon: MousePointerClick, color: 'text-yellow-400' },
    { key: 'avgTime', title: 'Avg Session', icon: Clock, color: 'text-indigo-400' },
];

const LoadingSkeleton = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-10 gap-4 mb-6">
        {kpiConfig.map(kpi => (
            <Card key={kpi.key} className="bg-[#1E293B] border-slate-700 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between pb-2 p-3">
                    <CardTitle className="text-xs font-medium text-gray-400">{kpi.title}</CardTitle>
                    <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
                </CardHeader>
                <CardContent className="p-3 pt-0">
                    <Skeleton className="h-7 w-3/4 mb-1" />
                    <Skeleton className="h-3 w-1/2" />
                </CardContent>
            </Card>
        ))}
    </div>
);

export default function KpiCards({ startDate, endDate }: KpiCardsProps) {
  const [kpiData, setKpiData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [showInfo, setShowInfo] = useState<string | null>(null);

  useEffect(() => {
    if (!startDate || !endDate) return;

    const fetchAllKpis = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/analytics/kpis?startDate=${startDate}&endDate=${endDate}`);
            if (!response.ok) throw new Error('Failed to fetch KPI data');
            const data = await response.json();
            setKpiData(data);
        } catch (error) {
            console.error("Error fetching all KPIs:", error);
            setKpiData({});
        } finally {
            setIsLoading(false);
        }
    };
    
    fetchAllKpis();
  }, [startDate, endDate]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-10 gap-4 mb-6">
      {kpiConfig.map((kpi) => {
        const data = kpiData[kpi.key] || { value: 'N/A', trend: '-' };
        return (
            <Card key={kpi.key} className="bg-[#1E293B] border-slate-700 shadow-lg hover:border-blue-500 transition-colors relative">
            <CardHeader className="flex flex-row items-center justify-between pb-2 p-3">
                <CardTitle className="text-xs font-medium text-gray-400">{kpi.title}</CardTitle>
                <div className="flex items-center gap-1">
                    <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
                    {(kpi.key === 'totalEngagements' || kpi.key === 'totalImpressions') && (
                        <button
                            onClick={() => setShowInfo(showInfo === kpi.key ? null : kpi.key)}
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                            <Info className="h-3 w-3" />
                        </button>
                    )}
                </div>
            </CardHeader>
            <CardContent className="p-3 pt-0">
                <div className="text-2xl font-bold text-white">{data.value}</div>
                <p className={`text-xs mt-1 ${data.trend?.includes('↑') ? 'text-green-400' : data.trend?.includes('↓') ? 'text-red-400' : 'text-gray-500'}`}>
                {data.trend}
                </p>
                {showInfo === kpi.key && (
                    <div className="absolute top-full left-0 right-0 mt-1 p-2 bg-slate-800 border border-slate-600 rounded-lg text-xs text-blue-400 z-10">
                        {kpi.key === 'totalEngagements' && "All user interactions: clicks, scrolls, form submissions, cart actions, etc."}
                        {kpi.key === 'totalImpressions' && "Total page views and content displays across the platform"}
                    </div>
                )}
            </CardContent>
            </Card>
        );
      })}
    </div>
  );
}
