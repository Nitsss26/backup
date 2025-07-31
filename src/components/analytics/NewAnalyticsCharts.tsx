"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { 
  Users, Activity, Clock, TrendingUp, MousePointer, Eye, 
  UserPlus, BarChart3, Calendar, Zap 
} from 'lucide-react';

interface NewAnalyticsChartsProps {
  startDate?: Date;
  endDate?: Date;
}

interface ChartData {
  date: string;
  value: number;
  label?: string;
  percentage?: number;
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

export default function NewAnalyticsCharts({ startDate, endDate }: NewAnalyticsChartsProps) {
  const [registeredUsersData, setRegisteredUsersData] = useState<ChartData[]>([]);
  const [sessionsData, setSessionsData] = useState<ChartData[]>([]);
  const [bounceRateData, setBounceRateData] = useState<ChartData[]>([]);
  const [avgSessionData, setAvgSessionData] = useState<ChartData[]>([]);
  const [engagementsData, setEngagementsData] = useState<ChartData[]>([]);
  const [impressionsData, setImpressionsData] = useState<ChartData[]>([]);
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
    fetchAllData();
  }, [startDate, endDate]);

  const fetchAllData = async () => {
    setIsLoading(true);
    const { start, end } = formatDateRange();
    
    try {
      await Promise.all([
        fetchRegisteredUsers(start, end),
        fetchSessions(start, end),
        fetchBounceRate(start, end),
        fetchAvgSessionDuration(start, end),
        fetchEngagements(start, end),
        fetchImpressions(start, end),
      ]);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRegisteredUsers = async (start: string, end: string) => {
    try {
      const response = await fetch(`/api/analytics/registered-users?startDate=${start}&endDate=${end}`);
      if (response.ok) {
        const data = await response.json();
        setRegisteredUsersData(data.map((item: any) => ({
          date: new Date(item.date).toLocaleDateString(),
          value: item.count,
          label: `${item.count} users`
        })));
      }
    } catch (error) {
      console.error('Error fetching registered users:', error);
      setRegisteredUsersData([]);
    }
  };

  const fetchSessions = async (start: string, end: string) => {
    try {
      const response = await fetch(`/api/analytics/sessions?startDate=${start}&endDate=${end}`);
      if (response.ok) {
        const data = await response.json();
        setSessionsData(data.map((item: any) => ({
          date: new Date(item.date).toLocaleDateString(),
          value: item.count,
          label: `${item.count} sessions`
        })));
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
      setSessionsData([]);
    }
  };

  const fetchBounceRate = async (start: string, end: string) => {
    try {
      const response = await fetch(`/api/analytics/bounce-rate?startDate=${start}&endDate=${end}`);
      if (response.ok) {
        const data = await response.json();
        setBounceRateData(data.map((item: any) => ({
          date: new Date(item.date).toLocaleDateString(),
          value: parseFloat(item.bounceRate),
          percentage: parseFloat(item.bounceRate),
          label: `${item.bounceRate}%`
        })));
      }
    } catch (error) {
      console.error('Error fetching bounce rate:', error);
      setBounceRateData([]);
    }
  };

  const fetchAvgSessionDuration = async (start: string, end: string) => {
    try {
      const response = await fetch(`/api/analytics/avg-time?startDate=${start}&endDate=${end}`);
      if (response.ok) {
        const data = await response.json();
        setAvgSessionData(data.map((item: any) => ({
          date: new Date(item.date).toLocaleDateString(),
          value: item.avgTime,
          label: `${Math.round(item.avgTime)}s`
        })));
      }
    } catch (error) {
      console.error('Error fetching avg session duration:', error);
      setAvgSessionData([]);
    }
  };

  const fetchEngagements = async (start: string, end: string) => {
    try {
      const response = await fetch(`/api/analytics/engagements?startDate=${start}&endDate=${end}`);
      if (response.ok) {
        const data = await response.json();
        setEngagementsData(data.map((item: any) => ({
          date: new Date(item.date).toLocaleDateString(),
          value: item.count,
          label: `${item.count} engagements`
        })));
      }
    } catch (error) {
      console.error('Error fetching engagements:', error);
      setEngagementsData([]);
    }
  };

  const fetchImpressions = async (start: string, end: string) => {
    try {
      const response = await fetch(`/api/analytics/impressions?startDate=${start}&endDate=${end}`);
      if (response.ok) {
        const data = await response.json();
        setImpressionsData(data.map((item: any) => ({
          date: new Date(item.date).toLocaleDateString(),
          value: item.count,
          label: `${item.count} impressions`
        })));
      }
    } catch (error) {
      console.error('Error fetching impressions:', error);
      setImpressionsData([]);
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-lg">
          <p className="text-slate-200 font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="font-semibold">
              {entry.payload.label || `${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const LoadingCard = ({ title, icon: Icon }: { title: string; icon: any }) => (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
          <Icon className="h-5 w-5 text-blue-400" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-center justify-center">
          <div className="text-slate-400">Loading...</div>
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LoadingCard title="Registered Users Growth" icon={UserPlus} />
          <LoadingCard title="Sessions Overview" icon={Activity} />
          <LoadingCard title="Bounce Rate Analysis" icon={TrendingUp} />
          <LoadingCard title="Average Session Duration" icon={Clock} />
          <LoadingCard title="User Engagements" icon={MousePointer} />
          <LoadingCard title="Page Impressions" icon={Eye} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Row 1: Registered Users & Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-green-400" />
              Registered Users Growth
            </CardTitle>
            <p className="text-sm text-slate-400">Daily new user registrations</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={registeredUsersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10B981" 
                  fill="#10B981" 
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-400" />
              Sessions Overview
            </CardTitle>
            <p className="text-sm text-slate-400">Daily user sessions</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sessionsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Bounce Rate & Average Session Duration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-red-400" />
              Bounce Rate Analysis
            </CardTitle>
            <p className="text-sm text-slate-400">Percentage of single-page sessions</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bounceRateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="value" 
                  fill="#EF4444" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-400" />
              Average Session Duration
            </CardTitle>
            <p className="text-sm text-slate-400">Time spent per session (seconds)</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={avgSessionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#8B5CF6" 
                  fill="#8B5CF6" 
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Row 3: Engagements & Impressions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
              <MousePointer className="h-5 w-5 text-orange-400" />
              User Engagements
            </CardTitle>
            <p className="text-sm text-slate-400">Daily user interactions and actions</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={engagementsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="value" 
                  fill="#F59E0B" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
              <Eye className="h-5 w-5 text-cyan-400" />
              Page Impressions
            </CardTitle>
            <p className="text-sm text-slate-400">Daily page views and content displays</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={impressionsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#06B6D4" 
                  strokeWidth={3}
                  dot={{ fill: '#06B6D4', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}