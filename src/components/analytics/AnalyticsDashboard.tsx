"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, Activity, Monitor, Smartphone, TrendingUp, UserPlus, Clock 
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface AnalyticsDashboardProps {
  startDate?: Date;
  endDate?: Date;
}

interface AnalyticsData {
  kpis: {
    uniqueUsers: { value: string; trend: string };
    totalSessions: { value: string; trend: string };
    desktopUsers: { value: string; trend: string };
    mobileUsers: { value: string; trend: string };
    avgSessionsPerUser: { value: string; trend: string };
    registeredUsers: { value: string; trend: string };
    avgSessionDuration: { value: string; trend: string };
  };
  charts: {
    uniqueUsersChart: Array<{
      date: string;
      desktop: number;
      mobile: number;
      total: number;
    }>;
    sessionsChart: Array<{
      date: string;
      sessions: number;
    }>;
    registrationsChart: Array<{
      date: string;
      registrations: number;
    }>;
  };
  deviceBreakdown: {
    desktop: number;
    mobile: number;
    desktopPercentage: string;
    mobilePercentage: string;
  };
  summary: {
    totalUniqueUsers: number;
    totalSessions: number;
    totalRegistrations: number;
    avgSessionsPerUser: string;
  };
}

const LoadingSkeleton = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {[...Array(7)].map((_, i) => (
        <Card key={i} className="bg-[#1E293B] border-slate-700">
          <CardHeader className="pb-2">
            <Skeleton className="h-4 w-20" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-16 mb-2" />
            <Skeleton className="h-3 w-12" />
          </CardContent>
        </Card>
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="bg-[#1E293B] border-slate-700">
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default function AnalyticsDashboard({ startDate, endDate }: AnalyticsDashboardProps) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!startDate || !endDate) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `/api/analytics/dashboard?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
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
        console.error("Error fetching analytics data:", error);
        setError(error instanceof Error ? error.message : 'Failed to load analytics data');
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [startDate, endDate]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-400 mb-2">Error loading analytics data</div>
        <div className="text-gray-400 text-sm">{error}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-8 text-gray-400">
        No analytics data available
      </div>
    );
  }

  const pieData = [
    { name: 'Desktop', value: data.deviceBreakdown.desktop, color: '#3B82F6' },
    { name: 'Mobile', value: data.deviceBreakdown.mobile, color: '#EC4899' }
  ];

  const kpiCards = [
    { 
      key: 'uniqueUsers', 
      title: 'Unique Users', 
      icon: Users, 
      color: 'text-blue-400',
      data: data.kpis.uniqueUsers 
    },
    { 
      key: 'totalSessions', 
      title: 'Total Sessions', 
      icon: Activity, 
      color: 'text-green-400',
      data: data.kpis.totalSessions 
    },
    { 
      key: 'desktopUsers', 
      title: 'Desktop Users', 
      icon: Monitor, 
      color: 'text-purple-400',
      data: data.kpis.desktopUsers 
    },
    { 
      key: 'mobileUsers', 
      title: 'Mobile Users', 
      icon: Smartphone, 
      color: 'text-cyan-400',
      data: data.kpis.mobileUsers 
    },
    { 
      key: 'avgSessionsPerUser', 
      title: 'Sessions/User', 
      icon: TrendingUp, 
      color: 'text-pink-400',
      data: data.kpis.avgSessionsPerUser 
    },
    { 
      key: 'registeredUsers', 
      title: 'New Registrations', 
      icon: UserPlus, 
      color: 'text-teal-400',
      data: data.kpis.registeredUsers 
    },
    { 
      key: 'avgSessionDuration', 
      title: 'Avg Duration', 
      icon: Clock, 
      color: 'text-yellow-400',
      data: data.kpis.avgSessionDuration 
    },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {kpiCards.map((kpi) => (
          <Card key={kpi.key} className="bg-[#1E293B] border-slate-700 hover:border-blue-500 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2 p-3">
              <CardTitle className="text-xs font-medium text-gray-400">{kpi.title}</CardTitle>
              <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="text-2xl font-bold text-white">{kpi.data.value}</div>
              <p className={`text-xs mt-1 ${
                kpi.data.trend.includes('↑') ? 'text-green-400' : 
                kpi.data.trend.includes('↓') ? 'text-red-400' : 'text-gray-500'
              }`}>
                {kpi.data.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Unique Users by Device Chart */}
        <Card className="bg-[#1E293B] border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-400" />
              Unique Users by Device
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.charts.uniqueUsersChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#E2E8F0'
                  }}
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="desktop" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="Desktop"
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="mobile" 
                  stroke="#EC4899" 
                  strokeWidth={2}
                  name="Mobile"
                  dot={{ fill: '#EC4899', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Device Breakdown Pie Chart */}
        <Card className="bg-[#1E293B] border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Monitor className="h-5 w-5 text-green-400" />
              Device Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(1)}%)`}
                  outerRadius={80}
                  fill="transparent"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#E2E8F0'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sessions Chart */}
        <Card className="bg-[#1E293B] border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-400" />
              Total Sessions Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.charts.sessionsChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#E2E8F0'
                  }}
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <Bar 
                  dataKey="sessions" 
                  name="Sessions"
                  radius={[4, 4, 0, 0]}
                >
                  {data.charts.sessionsChart.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#3B82F6', '#EC4899', '#F59E0B', '#14B8A6', '#8B5CF6', '#10B981', '#EF4444', '#F97316'][index % 8]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Registered Users Chart */}
        <Card className="bg-[#1E293B] border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-teal-400" />
              New Registrations Over Time
            </CardTitle>
            <p className="text-sm text-gray-400 mt-1">
              {data.summary.totalRegistrations} new registrations in period
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.charts.registrationsChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#E2E8F0'
                  }}
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <Bar 
                  dataKey="registrations" 
                  name="New Registrations"
                  radius={[4, 4, 0, 0]}
                >
                  {data.charts.registrationsChart.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#3B82F6', '#EC4899', '#F59E0B', '#14B8A6', '#8B5CF6', '#10B981', '#EF4444', '#F97316'][index % 8]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}