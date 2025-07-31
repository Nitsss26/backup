"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ComposedChart 
} from 'recharts';
import { 
  TrendingUp, Users, Activity, ShoppingCart, Heart, MousePointer, 
  Eye, Clock, Zap, Target, Award, Calendar 
} from 'lucide-react';

interface ComprehensiveAnalyticsProps {
  startDate?: Date;
  endDate?: Date;
}

interface MetricData {
  date: string;
  value: number;
  label?: string;
  percentage?: number;
  trend?: 'up' | 'down' | 'stable';
}

interface SummaryMetric {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: any;
  color: string;
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#EC4899', '#84CC16'];

export default function ComprehensiveAnalytics({ startDate, endDate }: ComprehensiveAnalyticsProps) {
  const [userGrowthData, setUserGrowthData] = useState<MetricData[]>([]);
  const [engagementTrendsData, setEngagementTrendsData] = useState<any[]>([]);
  const [conversionFunnelData, setConversionFunnelData] = useState<any[]>([]);
  const [summaryMetrics, setSummaryMetrics] = useState<SummaryMetric[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const formatDateRange = () => {
    if (!startDate || !endDate) {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 30);
      return { start: start.toISOString(), end: end.toISOString() };
    }
    return { start: startDate.toISOString(), end: endDate.toISOString() };
  };

  useEffect(() => {
    fetchComprehensiveData();
  }, [startDate, endDate]);

  const fetchComprehensiveData = async () => {
    setIsLoading(true);
    const { start, end } = formatDateRange();
    
    try {
      await Promise.all([
        fetchUserGrowthTrends(start, end),
        fetchEngagementTrends(start, end),
        fetchConversionFunnel(start, end),
        fetchSummaryMetrics(start, end),
      ]);
    } catch (error) {
      console.error('Error fetching comprehensive analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserGrowthTrends = async (start: string, end: string) => {
    try {
      const [usersResponse, sessionsResponse] = await Promise.all([
        fetch(`/api/analytics/registered-users?startDate=${start}&endDate=${end}`),
        fetch(`/api/analytics/sessions?startDate=${start}&endDate=${end}`)
      ]);

      if (usersResponse.ok && sessionsResponse.ok) {
        const usersData = await usersResponse.json();
        const sessionsData = await sessionsResponse.json();

        const combinedData = usersData.map((user: any, index: number) => ({
          date: new Date(user.date).toLocaleDateString(),
          newUsers: user.count,
          sessions: sessionsData[index]?.count || 0,
          ratio: sessionsData[index]?.count ? (sessionsData[index].count / Math.max(user.count, 1)).toFixed(2) : 0
        }));

        setUserGrowthData(combinedData);
      }
    } catch (error) {
      console.error('Error fetching user growth trends:', error);
    }
  };

  const fetchEngagementTrends = async (start: string, end: string) => {
    try {
      const [engagementsResponse, impressionsResponse, avgTimeResponse] = await Promise.all([
        fetch(`/api/analytics/engagements?startDate=${start}&endDate=${end}`),
        fetch(`/api/analytics/impressions?startDate=${start}&endDate=${end}`),
        fetch(`/api/analytics/avg-time?startDate=${start}&endDate=${end}`)
      ]);

      if (engagementsResponse.ok && impressionsResponse.ok && avgTimeResponse.ok) {
        const engagementsData = await engagementsResponse.json();
        const impressionsData = await impressionsResponse.json();
        const avgTimeData = await avgTimeResponse.json();

        const combinedData = engagementsData.map((engagement: any, index: number) => ({
          date: new Date(engagement.date).toLocaleDateString(),
          engagements: engagement.count,
          impressions: impressionsData[index]?.count || 0,
          avgTime: avgTimeData[index]?.avgTime || 0,
          engagementRate: impressionsData[index]?.count ? 
            ((engagement.count / impressionsData[index].count) * 100).toFixed(2) : 0
        }));

        setEngagementTrendsData(combinedData);
      }
    } catch (error) {
      console.error('Error fetching engagement trends:', error);
    }
  };

  const fetchConversionFunnel = async (start: string, end: string) => {
    try {
      // Simulated conversion funnel data - you can replace with actual API calls
      const funnelData = [
        { stage: 'Visitors', count: 10000, percentage: 100, color: '#3B82F6' },
        { stage: 'Page Views', count: 8500, percentage: 85, color: '#10B981' },
        { stage: 'Engagements', count: 6200, percentage: 62, color: '#F59E0B' },
        { stage: 'Add to Cart', count: 1800, percentage: 18, color: '#EF4444' },
        { stage: 'Purchases', count: 450, percentage: 4.5, color: '#8B5CF6' }
      ];

      setConversionFunnelData(funnelData);
    } catch (error) {
      console.error('Error fetching conversion funnel:', error);
    }
  };

  const fetchSummaryMetrics = async (start: string, end: string) => {
    try {
      // Fetch summary metrics from KPI endpoint
      const response = await fetch(`/api/analytics/kpis?startDate=${start}&endDate=${end}`);
      if (response.ok) {
        const data = await response.json();
        
        const metrics: SummaryMetric[] = [
          {
            title: 'Total Users',
            value: data.uniqueUsers?.value || '0',
            change: data.uniqueUsers?.trend || '0%',
            trend: data.uniqueUsers?.trend?.includes('↑') ? 'up' : 'down',
            icon: Users,
            color: 'text-blue-400'
          },
          {
            title: 'Active Sessions',
            value: data.totalSessions?.value || '0',
            change: data.totalSessions?.trend || '0%',
            trend: data.totalSessions?.trend?.includes('↑') ? 'up' : 'down',
            icon: Activity,
            color: 'text-green-400'
          },
          {
            title: 'Total Engagements',
            value: data.totalEngagements?.value || '0',
            change: data.totalEngagements?.trend || '0%',
            trend: data.totalEngagements?.trend?.includes('↑') ? 'up' : 'down',
            icon: MousePointer,
            color: 'text-orange-400'
          },
          {
            title: 'Avg Session Time',
            value: data.avgTime?.value || '0s',
            change: data.avgTime?.trend || '0%',
            trend: data.avgTime?.trend?.includes('↑') ? 'up' : 'down',
            icon: Clock,
            color: 'text-purple-400'
          }
        ];

        setSummaryMetrics(metrics);
      }
    } catch (error) {
      console.error('Error fetching summary metrics:', error);
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-lg">
          <p className="text-slate-200 font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="font-semibold">
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="h-20 flex items-center justify-center">
                  <div className="text-slate-400">Loading...</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">{metric.title}</p>
                    <p className="text-2xl font-bold text-white">{metric.value}</p>
                    <p className={`text-sm ${
                      metric.trend === 'up' ? 'text-green-400' : 
                      metric.trend === 'down' ? 'text-red-400' : 'text-slate-400'
                    }`}>
                      {metric.change}
                    </p>
                  </div>
                  <Icon className={`h-8 w-8 ${metric.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* User Growth & Session Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              User Growth & Session Trends
            </CardTitle>
            <p className="text-sm text-slate-400">Daily new users vs active sessions</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="newUsers" fill="#3B82F6" name="New Users" />
                <Line type="monotone" dataKey="sessions" stroke="#10B981" strokeWidth={2} name="Sessions" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-orange-400" />
              Engagement Analysis
            </CardTitle>
            <p className="text-sm text-slate-400">User interactions and engagement rates</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={engagementTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="engagements" fill="#F59E0B" name="Engagements" />
                <Line type="monotone" dataKey="engagementRate" stroke="#EF4444" strokeWidth={2} name="Engagement Rate %" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Funnel */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <Target className="h-5 w-5 text-green-400" />
            Conversion Funnel Analysis
          </CardTitle>
          <p className="text-sm text-slate-400">User journey from visitors to purchases</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={conversionFunnelData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9CA3AF" fontSize={12} />
                <YAxis dataKey="stage" type="category" stroke="#9CA3AF" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
            
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={conversionFunnelData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ stage, percentage }) => `${stage}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {conversionFunnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}