"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Route, Eye, Clock, MousePointerClick, TrendingUp, BarChart3, Users, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface RouteAnalyticsTableProps {
  startDate?: Date;
  endDate?: Date;
}

interface RouteAnalytic {
  route: string;
  viewsCount: number;
  averageDuration: string;
  averageDurationSeconds: number;
  clicks: number;
  uniqueUsers: number;
  sessions: number;
  totalDuration: number;
}

interface RouteAnalyticsData {
  data: RouteAnalytic[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  summary: {
    totalRoutes: number;
    totalViews: number;
    totalClicks: number;
    totalUniqueUsers: number;
  };
}

const LoadingSkeleton = () => (
  <div className="space-y-4">
    {[...Array(10)].map((_, i) => (
      <div key={i} className="flex items-center space-x-4 p-4 border-b border-slate-700">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>
    ))}
  </div>
);

export default function RouteAnalyticsTable({ startDate, endDate }: RouteAnalyticsTableProps) {
  const [data, setData] = useState<RouteAnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'views' | 'duration' | 'clicks'>('views');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    if (!startDate || !endDate) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `/api/analytics/route-analytics?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}&page=${currentPage}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.error) {
          throw new Error(result.message || result.error);
        }
        
        setData(result);
      } catch (error) {
        console.error("Error fetching route analytics:", error);
        setError(error instanceof Error ? error.message : 'Failed to load route analytics');
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [startDate, endDate, currentPage]);

  const sortedData = data?.data.sort((a, b) => {
    let aValue: number, bValue: number;
    
    switch (sortBy) {
      case 'views':
        aValue = a.viewsCount;
        bValue = b.viewsCount;
        break;
      case 'duration':
        aValue = a.averageDurationSeconds;
        bValue = b.averageDurationSeconds;
        break;
      case 'clicks':
        aValue = a.clicks;
        bValue = b.clicks;
        break;
      default:
        aValue = a.viewsCount;
        bValue = b.viewsCount;
    }
    
    return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
  }) || [];

  const handleSort = (column: 'views' | 'duration' | 'clicks') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-[#1E293B] border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-green-400" />
            Route Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LoadingSkeleton />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-[#1E293B] border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-green-400" />
            Route Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-red-400 mb-2">Error loading route analytics</div>
            <div className="text-gray-400 text-sm">{error}</div>
            {error.includes('timeout') && (
              <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="text-yellow-400 text-sm">
                  💡 Try selecting a smaller date range to improve query performance
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="bg-[#1E293B] border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-green-400" />
            Route Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-400">
            No route analytics available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[#1E293B] border-slate-700">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-green-400" />
            Route Analytics
            <span className="text-sm text-gray-400 font-normal">
              ({data.summary.totalRoutes} routes)
            </span>
          </CardTitle>
          
          {/* Summary Stats */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-blue-400">
              <Eye className="h-4 w-4" />
              {data.summary.totalViews.toLocaleString()} views
            </div>
            <div className="flex items-center gap-1 text-purple-400">
              <MousePointerClick className="h-4 w-4" />
              {data.summary.totalClicks.toLocaleString()} clicks
            </div>
            <div className="flex items-center gap-1 text-green-400">
              <Users className="h-4 w-4" />
              {data.summary.totalUniqueUsers.toLocaleString()} users
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  <div className="flex items-center gap-2">
                    <Route className="h-4 w-4" />
                    Route
                  </div>
                </th>
                <th 
                  className="text-left py-3 px-4 text-gray-400 font-medium cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('views')}
                >
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Views Count
                    {sortBy === 'views' && (
                      <TrendingUp className={`h-3 w-3 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                </th>
                <th 
                  className="text-left py-3 px-4 text-gray-400 font-medium cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('duration')}
                >
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Avg Duration
                    {sortBy === 'duration' && (
                      <TrendingUp className={`h-3 w-3 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                </th>
                <th 
                  className="text-left py-3 px-4 text-gray-400 font-medium cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('clicks')}
                >
                  <div className="flex items-center gap-2">
                    <MousePointerClick className="h-4 w-4" />
                    Clicks
                    {sortBy === 'clicks' && (
                      <TrendingUp className={`h-3 w-3 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((route, index) => (
                <tr key={route.route} className="border-b border-slate-700/50 hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="text-blue-400 font-mono text-sm font-medium">
                      {route.route}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {route.uniqueUsers} unique users • {route.sessions} sessions
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-white font-medium">
                      {route.viewsCount.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400">
                      #{index + 1} most viewed
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-white font-medium">
                      {route.averageDuration}
                    </div>
                    <div className="text-xs text-gray-400">
                      per unique user
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-white font-medium">
                      {route.clicks.toLocaleString()}
                    </div>
                    {route.clicks > 0 && (
                      <div className="text-xs text-green-400">
                        {((route.clicks / route.viewsCount) * 100).toFixed(1)}% click rate
                      </div>
                    )}
                    {route.clicks === 0 && (
                      <div className="text-xs text-gray-400">
                        No clicks recorded
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedData.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No route data available for the selected period
          </div>
        )}

        {/* Pagination Controls */}
        {data.pagination && data.pagination.totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-700">
            <div className="text-sm text-gray-400">
              Page {data.pagination.currentPage} of {data.pagination.totalPages} 
              ({data.pagination.totalItems} total routes)
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={!data.pagination.hasPrevPage}
                className="bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={!data.pagination.hasNextPage}
                className="bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}