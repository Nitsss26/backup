"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ComposedChart,
  ScatterChart, Scatter
} from 'recharts';
import { 
  Users, Activity, Clock, TrendingUp, MousePointer, Eye, 
  UserPlus, BarChart3, Calendar, Zap, ShoppingCart, Heart,
  DollarSign, Target, Award, Settings, RotateCcw
} from 'lucide-react';

interface UltimateAnalyticsDashboardProps {
  startDate?: Date;
  endDate?: Date;
}

interface ChartData {
  date: string;
  value: number;
  label?: string;
  percentage?: number;
}

type ChartType = 'line' | 'bar' | 'area' | 'scatter';

const CHART_TYPES = [
  { id: 'line', name: 'Line Chart', icon: '📈' },
  { id: 'bar', name: 'Bar Chart', icon: '📊' },
  { id: 'area', name: 'Area Chart', icon: '📉' },
  { id: 'scatter', name: 'Scatter Plot', icon: '⚪' }
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#EC4899', '#84CC16'];

export default function UltimateAnalyticsDashboard({ startDate, endDate }: UltimateAnalyticsDashboardProps) {
  // Data states
  const [registeredUsersData, setRegisteredUsersData] = useState<ChartData[]>([]);
  const [sessionsData, setSessionsData] = useState<ChartData[]>([]);
  const [bounceRateData, setBounceRateData] = useState<ChartData[]>([]);
  const [avgSessionData, setAvgSessionData] = useState<ChartData[]>([]);
  const [engagementsData, setEngagementsData] = useState<ChartData[]>([]);
  const [impressionsData, setImpressionsData] = useState<ChartData[]>([]);
  const [clicksData, setClicksData] = useState<ChartData[]>([]);
  const [addToCartData, setAddToCartData] = useState<ChartData[]>([]);
  const [addToWishlistData, setAddToWishlistData] = useState<ChartData[]>([]);
  const [salesData, setSalesData] = useState<ChartData[]>([]);
  const [uniqueUsersData, setUniqueUsersData] = useState<ChartData[]>([]);
  const [conversionData, setConversionData] = useState<ChartData[]>([]);

  // Chart type states
  const [chartTypes, setChartTypes] = useState<Record<string, ChartType>>({
    registeredUsers: 'area',
    sessions: 'line',
    bounceRate: 'bar',
    avgSession: 'area',
    engagements: 'bar',
    impressions: 'line',
    clicks: 'bar',
    addToCart: 'area',
    addToWishlist: 'line',
    sales: 'bar',
    uniqueUsers: 'area',
    conversion: 'line'
  });

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
    fetchAllAnalyticsData();
  }, [startDate, endDate]);

  const fetchAllAnalyticsData = async () => {
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
        fetchClicks(start, end),
        fetchAddToCart(start, end),
        fetchAddToWishlist(start, end),
        fetchSales(start, end),
        fetchUniqueUsers(start, end),
        fetchConversion(start, end),
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
    }
  };

  const fetchClicks = async (start: string, end: string) => {
    try {
      const response = await fetch(`/api/analytics/clicks?startDate=${start}&endDate=${end}`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setClicksData(data.map((item: any) => ({
            date: new Date(item.date).toLocaleDateString(),
            value: item.count,
            label: `${item.count} clicks`
          })));
        } else {
          console.error('Clicks API did not return an array:', data);
          setClicksData([]);
        }
      }
    } catch (error) {
      console.error('Error fetching clicks:', error);
      setClicksData([]);
    }
  };

  const fetchAddToCart = async (start: string, end: string) => {
    try {
      const response = await fetch(`/api/analytics/add-to-cart?startDate=${start}&endDate=${end}`);
      if (response.ok) {
        const data = await response.json();
        setAddToCartData(data.map((item: any) => ({
          date: new Date(item.date).toLocaleDateString(),
          value: item.count,
          label: `${item.count} cart adds`
        })));
      }
    } catch (error) {
      console.error('Error fetching add to cart:', error);
    }
  };

  const fetchAddToWishlist = async (start: string, end: string) => {
    try {
      const response = await fetch(`/api/analytics/add-to-wishlist?startDate=${start}&endDate=${end}`);
      if (response.ok) {
        const data = await response.json();
        setAddToWishlistData(data.map((item: any) => ({
          date: new Date(item.date).toLocaleDateString(),
          value: item.count,
          label: `${item.count} wishlist adds`
        })));
      }
    } catch (error) {
      console.error('Error fetching add to wishlist:', error);
    }
  };

  const fetchSales = async (start: string, end: string) => {
    try {
      const response = await fetch(`/api/analytics/sales?startDate=${start}&endDate=${end}`);
      if (response.ok) {
        const data = await response.json();
        setSalesData(data.map((item: any) => ({
          date: new Date(item.date).toLocaleDateString(),
          value: item.count || item.revenue || 0,
          label: `${item.count || item.revenue || 0} sales`
        })));
      }
    } catch (error) {
      console.error('Error fetching sales:', error);
    }
  };

  const fetchUniqueUsers = async (start: string, end: string) => {
    try {
      const response = await fetch(`/api/analytics/users?startDate=${start}&endDate=${end}`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setUniqueUsersData(data.map((item: any) => ({
            date: new Date(item.date).toLocaleDateString(),
            value: (item.desktop || 0) + (item.mobile || 0) || item.count || 0,
            label: `${(item.desktop || 0) + (item.mobile || 0) || item.count || 0} users`
          })));
        } else {
          console.error('Users API did not return an array:', data);
          setUniqueUsersData([]);
        }
      }
    } catch (error) {
      console.error('Error fetching unique users:', error);
      setUniqueUsersData([]);
    }
  };

  const fetchConversion = async (start: string, end: string) => {
    try {
      const response = await fetch(`/api/analytics/conversion?startDate=${start}&endDate=${end}`);
      if (response.ok) {
        const data = await response.json();
        setConversionData(data.map((item: any) => ({
          date: new Date(item.date).toLocaleDateString(),
          value: parseFloat(item.conversionRate || 0),
          label: `${item.conversionRate || 0}%`
        })));
      }
    } catch (error) {
      console.error('Error fetching conversion:', error);
    }
  };

  const changeChartType = (chartKey: string, newType: ChartType) => {
    setChartTypes(prev => ({
      ...prev,
      [chartKey]: newType
    }));
  };

  const renderChart = (data: ChartData[], chartType: ChartType, color: string, strokeWidth = 2) => {
    const commonProps = {
      data,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    switch (chartType) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
            <YAxis stroke="#9CA3AF" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              strokeWidth={strokeWidth}
              dot={{ fill: color, strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        );
      
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
            <YAxis stroke="#9CA3AF" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
            <YAxis stroke="#9CA3AF" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              fill={color} 
              fillOpacity={0.3}
              strokeWidth={strokeWidth}
            />
          </AreaChart>
        );
      
      case 'scatter':
        return (
          <ScatterChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
            <YAxis stroke="#9CA3AF" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Scatter dataKey="value" fill={color} />
          </ScatterChart>
        );
      
      default:
        return null;
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

  const ChartTypeSelector = ({ chartKey, currentType }: { chartKey: string; currentType: ChartType }) => (
    <div className="flex gap-1">
      {CHART_TYPES.map((type) => (
        <Button
          key={type.id}
          variant={currentType === type.id ? "default" : "outline"}
          size="sm"
          onClick={() => changeChartType(chartKey, type.id as ChartType)}
          className={`text-xs px-2 py-1 ${
            currentType === type.id 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-slate-700 hover:bg-slate-600 text-slate-300 border-slate-600'
          }`}
          title={type.name}
        >
          {type.icon}
        </Button>
      ))}
    </div>
  );

  const ChartCard = ({ 
    title, 
    data, 
    chartKey, 
    color, 
    icon: Icon, 
    description 
  }: { 
    title: string; 
    data: ChartData[]; 
    chartKey: string; 
    color: string; 
    icon: any; 
    description: string;
  }) => (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className={`h-5 w-5`} style={{ color }} />
            <div>
              <CardTitle className="text-lg font-semibold text-white">{title}</CardTitle>
              <p className="text-sm text-slate-400">{description}</p>
            </div>
          </div>
          <ChartTypeSelector chartKey={chartKey} currentType={chartTypes[chartKey]} />
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          {renderChart(data, chartTypes[chartKey], color)}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="h-64 flex items-center justify-center">
                  <div className="text-slate-400">Loading chart {i}...</div>
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
      {/* Row 1: User Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Registered Users Growth"
          data={registeredUsersData}
          chartKey="registeredUsers"
          color="#10B981"
          icon={UserPlus}
          description="Daily new user registrations"
        />
        <ChartCard
          title="Unique Users"
          data={uniqueUsersData}
          chartKey="uniqueUsers"
          color="#3B82F6"
          icon={Users}
          description="Daily unique visitors (desktop + mobile)"
        />
      </div>

      {/* Row 2: Session Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Sessions Overview"
          data={sessionsData}
          chartKey="sessions"
          color="#06B6D4"
          icon={Activity}
          description="Daily user sessions"
        />
        <ChartCard
          title="Average Session Duration"
          data={avgSessionData}
          chartKey="avgSession"
          color="#8B5CF6"
          icon={Clock}
          description="Time spent per session (seconds)"
        />
      </div>

      {/* Row 3: Engagement Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="User Engagements"
          data={engagementsData}
          chartKey="engagements"
          color="#F59E0B"
          icon={MousePointer}
          description="Daily user interactions and actions"
        />
        <ChartCard
          title="Page Impressions"
          data={impressionsData}
          chartKey="impressions"
          color="#EC4899"
          icon={Eye}
          description="Daily page views and content displays"
        />
      </div>

      {/* Row 4: Interaction Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Total Clicks"
          data={clicksData}
          chartKey="clicks"
          color="#EF4444"
          icon={MousePointer}
          description="Daily click events"
        />
        <ChartCard
          title="Bounce Rate Analysis"
          data={bounceRateData}
          chartKey="bounceRate"
          color="#F59E0B"
          icon={TrendingUp}
          description="Percentage of single-page sessions"
        />
      </div>

      {/* Row 5: Commerce Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Add to Cart"
          data={addToCartData}
          chartKey="addToCart"
          color="#10B981"
          icon={ShoppingCart}
          description="Daily cart additions"
        />
        <ChartCard
          title="Add to Wishlist"
          data={addToWishlistData}
          chartKey="addToWishlist"
          color="#EC4899"
          icon={Heart}
          description="Daily wishlist additions"
        />
      </div>

      {/* Row 6: Sales & Conversion */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Sales Performance"
          data={salesData}
          chartKey="sales"
          color="#8B5CF6"
          icon={DollarSign}
          description="Daily sales and revenue"
        />
        <ChartCard
          title="Conversion Rate"
          data={conversionData}
          chartKey="conversion"
          color="#06B6D4"
          icon={Target}
          description="Daily conversion percentage"
        />
      </div>
    </div>
  );
}