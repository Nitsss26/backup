
"use client";

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  BarChart3, Filter as FunnelIcon, PieChart, BarChart, LineChart, AreaChart, 
  Table, ChevronDown, ChevronUp, Download, Users, ShoppingCart, Clock, TrendingUp, DollarSign, MousePointer,
  Radar as RadarIcon, Activity, Gauge, Calendar
} from "lucide-react";
import { 
  BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, Pie, 
  LineChart as RechartsLineChart, Line, AreaChart as RechartsAreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, ScatterChart, Scatter, ZAxis,
  FunnelChart, Funnel, LabelList, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

// Enhanced dummy data with platform breakdown
const analyticsData = {
  metrics: {
    totalUsers: { value: "4.4K", change: "+12.5%", icon: <Users className="text-blue-500" />, bgColor: "bg-blue-50" },
    sessions: { value: "5.4K", change: "+8.3%", icon: <MousePointer className="text-green-500" />, bgColor: "bg-green-50" },
    purchases: { value: "813", change: "+18.2%", icon: <ShoppingCart className="text-purple-500" />, bgColor: "bg-purple-50" },
    sales: { value: "₹2.8K", change: "+15.7%", icon: <DollarSign className="text-yellow-500" />, bgColor: "bg-yellow-50" },
    roas: { value: "185.38%", change: "+22.4%", icon: <TrendingUp className="text-teal-500" />, bgColor: "bg-teal-50" },
    ctr: { value: "1.22%", change: "+3.1%", icon: <MousePointer className="text-pink-500" />, bgColor: "bg-pink-50" },
    cpm: { value: "₹3.30", change: "-1.5%", icon: <DollarSign className="text-red-500" />, bgColor: "bg-red-50" },
    avgTime: { value: "0:44", change: "+0.8%", icon: <Clock className="text-orange-500" />, bgColor: "bg-orange-50" }
  },
  
  trafficByChannel: [
    { name: 'Google Ads', value: 7.76, color: '#4285F4' },
    { name: 'Facebook', value: 14.96, color: '#4267B2' },
    { name: 'Instagram', value: 12.34, color: '#E1306C' },
    { name: 'LinkedIn', value: 8.91, color: '#0077B5' },
    { name: 'Snapchat', value: 5.43, color: '#FFFC00' },
    { name: 'TikTok', value: 9.87, color: '#000000' },
  ],
  
  weeklyAdSpend: [
    { 
      week: 'Week 1', 
      'Google Ads': 400, 
      'Meta Ads': 600, 
      'LinkedIn': 200, 
      'Snapchat': 150, 
      'TikTok': 300 
    },
    { 
      week: 'Week 2', 
      'Google Ads': 450, 
      'Meta Ads': 650, 
      'LinkedIn': 220, 
      'Snapchat': 180, 
      'TikTok': 350 
    },
    { 
      week: 'Week 3', 
      'Google Ads': 380, 
      'Meta Ads': 700, 
      'LinkedIn': 250, 
      'Snapchat': 200, 
      'TikTok': 400 
    },
    { 
      week: 'Week 4', 
      'Google Ads': 420, 
      'Meta Ads': 750, 
      'LinkedIn': 280, 
      'Snapchat': 220, 
      'TikTok': 450 
    },
  ],
  
  weeklyCPC: [
    { 
      week: 'Week 1', 
      'Google Ads': 0.25, 
      'Meta Ads': 0.31, 
      'LinkedIn': 0.35, 
      'Snapchat': 0.29, 
      'TikTok': 0.25 
    },
    { 
      week: 'Week 2', 
      'Google Ads': 0.27, 
      'Meta Ads': 0.33, 
      'LinkedIn': 0.37, 
      'Snapchat': 0.31, 
      'TikTok': 0.27 
    },
    { 
      week: 'Week 3', 
      'Google Ads': 0.26, 
      'Meta Ads': 0.35, 
      'LinkedIn': 0.38, 
      'Snapchat': 0.32, 
      'TikTok': 0.26 
    },
    { 
      week: 'Week 4', 
      'Google Ads': 0.28, 
      'Meta Ads': 0.36, 
      'LinkedIn': 0.40, 
      'Snapchat': 0.33, 
      'TikTok': 0.28 
    },
  ],
  
  sessionSources: [
    { source: 'Google Ads', users: 703, sessions: 870, engaged: 419, purchases: 429, rate: '18.21%', trend: 'up' },
    { source: 'Instagram', users: 654, sessions: 727, engaged: 431, purchases: 410, rate: '19.11%', trend: 'up' },
    { source: 'LinkedIn', users: 432, sessions: 454, engaged: 339, purchases: 231, rate: '19.47%', trend: 'up' },
    { source: 'Facebook', users: 587, sessions: 654, engaged: 498, purchases: 378, rate: '17.84%', trend: 'down' },
    { source: 'Bing Ads', users: 321, sessions: 339, engaged: 210, purchases: 125, rate: '16.92%', trend: 'down' },
    { source: 'TikTok', users: 456, sessions: 512, engaged: 345, purchases: 289, rate: '20.12%', trend: 'up' },
  ],
  
  adSources: [
    { source: 'Google Ads', spend: 1200, impressions: 45380, clicks: 651, cpc: 0.27, cpm: 3.3, ctr: '1.22%', roas: '185%' },
    { source: 'Meta Ads', spend: 1800, impressions: 62450, clicks: 892, cpc: 0.31, cpm: 3.45, ctr: '1.35%', roas: '160%' },
    { source: 'LinkedIn', spend: 900, impressions: 19870, clicks: 287, cpc: 0.35, cpm: 4.1, ctr: '1.45%', roas: '210%' },
    { source: 'Snapchat', spend: 750, impressions: 15780, clicks: 213, cpc: 0.29, cpm: 3.8, ctr: '1.38%', roas: '195%' },
    { source: 'TikTok', spend: 1100, impressions: 38760, clicks: 521, cpc: 0.25, cpm: 3.2, ctr: '1.18%', roas: '225%' },
    { source: 'Twitter', spend: 850, impressions: 24560, clicks: 345, cpc: 0.33, cpm: 3.65, ctr: '1.28%', roas: '175%' },
  ],
  
  conversionFunnel: [
    { stage: 'Impressions', value: 10000, fill: '#8884d8' },
    { stage: 'Clicks', value: 4000, fill: '#83a6ed' },
    { stage: 'Leads', value: 1000, fill: '#8dd1e1' },
    { stage: 'Customers', value: 200, fill: '#82ca9d' }
  ],
  
  platformPerformance: [
    { 
      metric: 'ROAS', 
      'Google Ads': 185, 
      'Meta Ads': 160, 
      'TikTok': 225, 
      'LinkedIn': 210, 
      'Snapchat': 195 
    },
    { 
      metric: 'CTR', 
      'Google Ads': 1.22, 
      'Meta Ads': 1.35, 
      'TikTok': 1.18, 
      'LinkedIn': 1.45, 
      'Snapchat': 1.38 
    },
    { 
      metric: 'CPC', 
      'Google Ads': 0.27, 
      'Meta Ads': 0.31, 
      'TikTok': 0.25, 
      'LinkedIn': 0.35, 
      'Snapchat': 0.29 
    },
    { 
      metric: 'Conv. Rate', 
      'Google Ads': 18.21, 
      'Meta Ads': 17.84, 
      'TikTok': 20.12, 
      'LinkedIn': 19.47, 
      'Snapchat': 18.5 
    },
    { 
      metric: 'Avg. Time', 
      'Google Ads': 44, 
      'Meta Ads': 38, 
      'TikTok': 48, 
      'LinkedIn': 52, 
      'Snapchat': 41 
    }
  ],
  
  activityHeatmap: [
    { day: 'Mon', hour: '8-10', value: 45 },
    { day: 'Mon', hour: '10-12', value: 78 },
    { day: 'Mon', hour: '12-14', value: 65 },
    { day: 'Mon', hour: '14-16', value: 82 },
    { day: 'Mon', hour: '16-18', value: 93 },
    { day: 'Tue', hour: '8-10', value: 32 },
    { day: 'Tue', hour: '10-12', value: 67 },
    { day: 'Tue', hour: '12-14', value: 71 },
    { day: 'Tue', hour: '14-16', value: 88 },
    { day: 'Tue', hour: '16-18', value: 95 },
    { day: 'Wed', hour: '8-10', value: 28 },
    { day: 'Wed', hour: '10-12', value: 63 },
    { day: 'Wed', hour: '12-14', value: 59 },
    { day: 'Wed', hour: '14-16', value: 76 },
    { day: 'Wed', hour: '16-18', value: 89 },
    { day: 'Thu', hour: '8-10', value: 51 },
    { day: 'Thu', hour: '10-12', value: 72 },
    { day: 'Thu', hour: '12-14', value: 68 },
    { day: 'Thu', hour: '14-16', value: 85 },
    { day: 'Thu', hour: '16-18', value: 97 },
    { day: 'Fri', hour: '8-10', value: 37 },
    { day: 'Fri', hour: '10-12', value: 69 },
    { day: 'Fri', hour: '12-14', value: 62 },
    { day: 'Fri', hour: '14-16', value: 79 },
    { day: 'Fri', hour: '16-18', value: 91 }
  ]
};

// Platform colors for consistent theming
const platformColors = {
  'Google Ads': '#4285F4',
  'Meta Ads': '#4267B2',
  'LinkedIn': '#0077B5',
  'Snapchat': '#FFFC00',
  'TikTok': '#000000',
  'Instagram': '#E1306C',
  'Facebook': '#4267B2',
  'Bing Ads': '#F25022',
  'Twitter': '#1DA1F2'
};

// Chart type options
const CHART_TYPES = [
  { value: 'pie', label: 'Pie Chart', icon: <PieChart size={16} /> },
  { value: 'bar', label: 'Bar Chart', icon: <BarChart size={16} /> },
  { value: 'stacked', label: 'Stacked Bar', icon: <BarChart size={16} /> },
  { value: 'line', label: 'Line Chart', icon: <LineChart size={16} /> },
  { value: 'area', label: 'Area Chart', icon: <AreaChart size={16} /> }
];

const SellerAnalyticsPage = () => {
  const [dateRange, setDateRange] = useState({ start: '2025-07-01', end: '2025-07-31' });
  const [trafficChartType, setTrafficChartType] = useState('pie');
  const [spendChartType, setSpendChartType] = useState('stacked');
  const [cpcChartType, setCpcChartType] = useState('line');
  const [expandedTables, setExpandedTables] = useState({
    sessions: true,
    ads: true
  });

  const toggleTable = (table: 'sessions' | 'ads') => {
    setExpandedTables(prev => ({ ...prev, [table]: !prev[table] }));
  };

  const renderChart = (data: any[], chartType: string, title: string) => {
    switch (chartType) {
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsBarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Google Ads" fill={platformColors['Google Ads']} />
              <Bar dataKey="Meta Ads" fill={platformColors['Meta Ads']} />
              <Bar dataKey="LinkedIn" fill={platformColors['LinkedIn']} />
              <Bar dataKey="Snapchat" fill={platformColors['Snapchat']} />
              <Bar dataKey="TikTok" fill={platformColors['TikTok']} />
            </RechartsBarChart>
          </ResponsiveContainer>
        );
      
      case 'stacked':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsBarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Google Ads" stackId="a" fill={platformColors['Google Ads']} />
              <Bar dataKey="Meta Ads" stackId="a" fill={platformColors['Meta Ads']} />
              <Bar dataKey="LinkedIn" stackId="a" fill={platformColors['LinkedIn']} />
              <Bar dataKey="Snapchat" stackId="a" fill={platformColors['Snapchat']} />
              <Bar dataKey="TikTok" stackId="a" fill={platformColors['TikTok']} />
            </RechartsBarChart>
          </ResponsiveContainer>
        );
      
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsLineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="Google Ads" 
                stroke={platformColors['Google Ads']} 
                strokeWidth={2}
                activeDot={{ r: 8 }} 
              />
              <Line 
                type="monotone" 
                dataKey="Meta Ads" 
                stroke={platformColors['Meta Ads']} 
                strokeWidth={2}
                activeDot={{ r: 8 }} 
              />
              <Line 
                type="monotone" 
                dataKey="LinkedIn" 
                stroke={platformColors['LinkedIn']} 
                strokeWidth={2}
                activeDot={{ r: 8 }} 
              />
              <Line 
                type="monotone" 
                dataKey="Snapchat" 
                stroke={platformColors['Snapchat']} 
                strokeWidth={2}
                activeDot={{ r: 8 }} 
              />
              <Line 
                type="monotone" 
                dataKey="TikTok" 
                stroke={platformColors['TikTok']} 
                strokeWidth={2}
                activeDot={{ r: 8 }} 
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        );
      
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsAreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="Google Ads" 
                stackId="1" 
                stroke={platformColors['Google Ads']} 
                fill={platformColors['Google Ads']} 
                fillOpacity={0.5}
              />
              <Area 
                type="monotone" 
                dataKey="Meta Ads" 
                stackId="1" 
                stroke={platformColors['Meta Ads']} 
                fill={platformColors['Meta Ads']} 
                fillOpacity={0.5}
              />
              <Area 
                type="monotone" 
                dataKey="LinkedIn" 
                stackId="1" 
                stroke={platformColors['LinkedIn']} 
                fill={platformColors['LinkedIn']} 
                fillOpacity={0.5}
              />
              <Area 
                type="monotone" 
                dataKey="Snapchat" 
                stackId="1" 
                stroke={platformColors['Snapchat']} 
                fill={platformColors['Snapchat']} 
                fillOpacity={0.5}
              />
              <Area 
                type="monotone" 
                dataKey="TikTok" 
                stackId="1" 
                stroke={platformColors['TikTok']} 
                fill={platformColors['TikTok']} 
                fillOpacity={0.5}
              />
            </RechartsAreaChart>
          </ResponsiveContainer>
        );
      
      default:
        return <div className="text-center py-12 text-gray-900">Select a chart type</div>;
    }
  };

  // Custom tooltip for heatmap
  const HeatmapTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-md shadow-lg border border-gray-200">
          <p className="font-bold text-gray-900">{data.day}, {data.hour}</p>
          <p className="text-gray-700">Engagement: <span className="font-semibold">{data.value}%</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 w-full bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      {/* Header Card */}
      <Card className="shadow-xl border-l-4 border-primary bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-md">
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">Seller Course Analytics</CardTitle>
              <CardDescription className="text-gray-800">Track performance of your courses, student engagement, and revenue details</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white border px-3 py-1 rounded-md shadow-sm">
              <FunnelIcon size={16} className="text-gray-700" />
              <span className="text-sm font-medium text-gray-900">Date Range:</span>
              <input 
                type="date" 
                value={dateRange.start} 
                onChange={e => setDateRange({...dateRange, start: e.target.value})}
                className="bg-transparent text-sm border-none focus:ring-0 text-gray-900"
              />
              <span className="mx-1 text-gray-700">to</span>
              <input 
                type="date" 
                value={dateRange.end} 
                onChange={e => setDateRange({...dateRange, end: e.target.value})}
                className="bg-transparent text-sm border-none focus:ring-0 text-gray-900"
              />
            </div>
            <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-md hover:opacity-90 transition shadow-md">
              <Download size={16} />
              <span>Export Report</span>
            </button>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {Object.entries(analyticsData.metrics).map(([key, metric]) => (
          <Card 
            key={key} 
            className={`shadow-sm hover:shadow-md transition border-0 ${metric.bgColor} transform hover:scale-[1.02] transition-transform duration-200`}
          >
            <CardHeader className="p-3 pb-0 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-medium text-gray-700 uppercase">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </CardTitle>
              <div className="text-gray-400">
                {metric.icon}
              </div>
            </CardHeader>
            <CardContent className="p-3 pt-1">
              <div className="text-xl font-bold text-gray-900">{metric.value}</div>
              <div className="text-xs font-medium mt-1 text-green-600 flex items-center">
                <span>{metric.change}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row (Traffic by Channel, Weekly Ad Spend, Weekly CPC) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Traffic by Channel */}
        <Card className="shadow-sm bg-white border-0">
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="text-lg font-bold text-gray-900">Traffic by Channel</CardTitle>
            <div className="flex gap-2">
              <select 
                value={trafficChartType}
                onChange={e => setTrafficChartType(e.target.value)}
                className="text-sm border rounded px-2 py-1 bg-white text-gray-900"
              >
                {CHART_TYPES.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0 h-80">
            {renderChart(
              analyticsData.trafficByChannel, 
              trafficChartType,
              "Traffic by Channel"
            )}
          </CardContent>
        </Card>

        {/* Weekly Ad Spend */}
        <Card className="shadow-sm bg-white border-0">
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="text-lg font-bold text-gray-900">Weekly Ad Spend</CardTitle>
            <div className="flex gap-2">
              <select 
                value={spendChartType}
                onChange={e => setSpendChartType(e.target.value)}
                className="text-sm border rounded px-2 py-1 bg-white text-gray-900"
              >
                {CHART_TYPES.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0 h-80">
            {renderChart(analyticsData.weeklyAdSpend, spendChartType, "Weekly Ad Spend")}
          </CardContent>
        </Card>

        {/* Weekly CPC */}
        <Card className="shadow-sm bg-white border-0">
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="text-lg font-bold text-gray-900">Weekly CPC</CardTitle>
            <div className="flex gap-2">
              <select 
                value={cpcChartType}
                onChange={e => setCpcChartType(e.target.value)}
                className="text-sm border rounded px-2 py-1 bg-white text-gray-900"
              >
                {CHART_TYPES.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0 h-80">
            {renderChart(analyticsData.weeklyCPC, cpcChartType, "Weekly CPC")}
          </CardContent>
        </Card>
      </div>

      {/* Advanced Charts Row (Conversion Funnel, Platform Performance, Engagement Heatmap in one row) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Conversion Funnel */}
        <Card className="shadow-sm bg-white border-0">
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="text-lg font-bold text-gray-900">Conversion Funnel</CardTitle>
            <FunnelIcon className="text-purple-500" />
          </CardHeader>
          <CardContent className="p-4 pt-0 h-96">
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <Tooltip />
                <Funnel
                  dataKey="value"
                  data={analyticsData.conversionFunnel}
                  isAnimationActive
                >
                  <LabelList position="right" fill="#000" stroke="none" dataKey="stage" />
                  <LabelList position="center" fill="#fff" stroke="none" dataKey="value" />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Platform Performance Radar */}
        <Card className="shadow-sm bg-white border-0">
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="text-lg font-bold text-gray-900">Platform Performance</CardTitle>
            <RadarIcon className="text-blue-500" />
          </CardHeader>
          <CardContent className="p-4 pt-0 h-96">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={analyticsData.platformPerformance}>
                <PolarGrid stroke="#f0f0f0" />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis angle={30} domain={[0, 250]} />
                <Radar name="Google Ads" dataKey="Google Ads" stroke={platformColors['Google Ads']} fill={platformColors['Google Ads']} fillOpacity={0.6} />
                <Radar name="Meta Ads" dataKey="Meta Ads" stroke={platformColors['Meta Ads']} fill={platformColors['Meta Ads']} fillOpacity={0.6} />
                <Radar name="TikTok" dataKey="TikTok" stroke={platformColors['TikTok']} fill={platformColors['TikTok']} fillOpacity={0.6} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Engagement Heatmap */}
        <Card className="shadow-sm bg-white border-0">
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="text-lg font-bold text-gray-900">Engagement Heatmap</CardTitle>
            <Calendar className="text-orange-500" />
          </CardHeader>
          <CardContent className="p-4 pt-0 h-96">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="hour" type="category" />
                <YAxis dataKey="day" type="category" />
                <ZAxis dataKey="value" range={[50, 500]} />
                <Tooltip content={<HeatmapTooltip />} />
                <Scatter data={analyticsData.activityHeatmap} fill="#8884d8">
                  {analyticsData.activityHeatmap.map((entry, index) => {
                    const intensity = Math.min(100, Math.max(0, entry.value)) / 100;
                    const r = Math.floor(255 * intensity);
                    const g = Math.floor(255 * (1 - intensity));
                    const b = 0;
                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={`rgb(${r}, ${g}, ${b})`}
                        rx={3}
                        ry={3}
                      />
                    );
                  })}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tables Row (Session Source Table and Ad Source Table in one row) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Session Source Table */}
        <Card className="shadow-sm bg-white border-0">
          <CardHeader 
            className="flex flex-row items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => toggleTable('sessions')}
          >
            <CardTitle className="text-lg font-bold text-gray-900">Session Source Performance</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Details</span>
              {expandedTables.sessions ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </CardHeader>
          
          {expandedTables.sessions && (
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="py-3 px-4 text-left text-xs font-bold text-gray-900 uppercase">Source</th>
                      <th className="py-3 px-4 text-left text-xs font-bold text-gray-900 uppercase">Users</th>
                      <th className="py-3 px-4 text-left text-xs font-bold text-gray-900 uppercase">Sessions</th>
                      <th className="py-3 px-4 text-left text-xs font-bold text-gray-900 uppercase">Engaged</th>
                      <th className="py-3 px-4 text-left text-xs font-bold text-gray-900 uppercase">Purchases</th>
                      <th className="py-3 px-4 text-left text-xs font-bold text-gray-900 uppercase">Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {analyticsData.sessionSources.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium flex items-center text-gray-900">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: platformColors[row.source] || '#999' }}
                          ></div>
                          {row.source}
                        </td>
                        <td className="py-3 px-4 text-gray-900">{row.users}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center text-gray-900">
                            {row.sessions}
                            {row.trend === 'up' ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-900">{row.engaged}</td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-purple-700">{row.purchases}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                            {row.rate}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Ad Source Table */}
        <Card className="shadow-sm bg-white border-0">
          <CardHeader 
            className="flex flex-row items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => toggleTable('ads')}
          >
            <CardTitle className="text-lg font-bold text-gray-900">Ad Source Performance</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Details</span>
              {expandedTables.ads ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </CardHeader>
          
          {expandedTables.ads && (
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="py-3 px-4 text-left text-xs font-bold text-gray-900 uppercase">Source</th>
                      <th className="py-3 px-4 text-left text-xs font-bold text-gray-900 uppercase">Spend</th>
                      <th className="py-3 px-4 text-left text-xs font-bold text-gray-900 uppercase">Impressions</th>
                      <th className="py-3 px-4 text-left text-xs font-bold text-gray-900 uppercase">Clicks</th>
                      <th className="py-3 px-4 text-left text-xs font-bold text-gray-900 uppercase">CPC</th>
                      <th className="py-3 px-4 text-left text-xs font-bold text-gray-900 uppercase">ROAS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {analyticsData.adSources.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium flex items-center text-gray-900">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: platformColors[row.source] || '#999' }}
                          ></div>
                          {row.source}
                        </td>
                        <td className="py-3 px-4 font-semibold text-gray-900">${row.spend}</td>
                        <td className="py-3 px-4 text-gray-900">{row.impressions.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-blue-700">{row.clicks}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                            ${row.cpc.toFixed(2)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold">
                            {row.roas}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          )}
        </Card>
      </div>

      {/* ROI Visualization */}
      <Card className="shadow-sm bg-white border-0">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg font-bold text-gray-900">ROI by Channel</CardTitle>
          <CardDescription className="text-gray-800">Visualizing return on investment across advertising channels</CardDescription>
        </CardHeader>
        <CardContent className="p-4 h-96">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                type="number" 
                dataKey="spend" 
                name="Ad Spend ($)" 
                unit="$" 
                domain={[0, 2000]} 
              />
              <YAxis 
                type="number" 
                dataKey="roas" 
                name="ROAS" 
                unit="%" 
                domain={[100, 250]} 
                tickFormatter={(value) => `${value}%`}
              />
              <ZAxis type="number" dataKey="clicks" range={[50, 500]} name="Clicks" />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }} 
                formatter={(value, name) => {
                  if (name === 'roas') return [`${value}%`, 'ROAS'];
                  if (name === 'spend') return [`$${value}`, 'Spend'];
                  return [value, 'Clicks'];
                }}
              />
              <Legend />
              {analyticsData.adSources.map((entry, index) => {
                const numericEntry = {
                  ...entry,
                  roas: parseFloat(entry.roas.replace('%', '')),
                };
                return (
                  <Scatter 
                    key={index} 
                    name={entry.source} 
                    data={[numericEntry]} 
                    fill={platformColors[entry.source] || '#8884d8'} 
                  />
                );
              })}
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Support Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-sm bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <Table size={24} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Dashboard Setup Guide</h3>
            <p className="text-gray-800 mb-4">Learn how to customize and optimize your analytics dashboard</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              View Guide
            </button>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm bg-gradient-to-r from-green-50 to-green-100 border border-green-200">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-green-100 p-3 rounded-full mb-4">
              <BarChart3 size={24} className="text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Book a Demo</h3>
            <p className="text-gray-800 mb-4">See advanced features and analytics capabilities</p>
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
              Schedule Now
            </button>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-purple-100 p-3 rounded-full mb-4">
              <FunnelIcon size={24} className="text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Contact Support</h3>
            <p className="text-gray-800 mb-4">Get help quickly from our dedicated support team</p>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition">
              Contact Us
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SellerAnalyticsPage;

// "use client";

// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { BarChart3 } from "lucide-react";
// import Image from "next/image";

// export default function SellerAnalyticsPage() {
//   return (
//     <div className="space-y-8 w-full">
//       <Card className="shadow-xl border-l-4 border-primary">
//         <CardHeader className="flex flex-row items-center gap-4">
//           <div className="p-3 bg-primary/10 rounded-md">
//             <BarChart3 className="h-8 w-8 text-primary" />
//           </div>
//           <div>
//             <CardTitle className="text-2xl font-headline text-primary">Seller Course Analytics</CardTitle>
//             <CardDescription>Track performance of your courses, student engagement, and revenue details.</CardDescription>
//           </div>
//         </CardHeader>
//       </Card>

//       <Card className="shadow-lg border bg-card">
//         <CardHeader>
//           <CardTitle className="font-headline text-xl">Detailed Analytics (Coming Soon)</CardTitle>
//           <CardDescription>
//             This section will provide detailed insights specific to your courses, including enrollment trends,
//             student progress, revenue per course, and review statistics.
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="text-center py-12">
//           <Image 
//             src="https://placehold.co/600x350/EBF4FF/3B82F6?text=Seller+Analytics+Placeholder" 
//             alt="Seller analytics charts placeholder" 
//             width={600} 
//             height={350}
//             className="mx-auto rounded-lg shadow-md"
//             data-ai-hint="seller dashboard course performance charts interface"
//           />
//           <p className="mt-6 text-muted-foreground">
//             Detailed course-specific analytics are under development.
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

