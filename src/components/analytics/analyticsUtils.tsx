
"use client";

import { 
  LineChart as RechartsLine, 
  BarChart as RechartsBar, 
  PieChart as RechartsPie, 
  AreaChart as RechartsArea, 
  ResponsiveContainer, 
  Line, 
  Bar, 
  Pie, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  Cell 
} from 'recharts';
import { PieChart, BarChart, LineChart, AreaChart as AreaChartIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export const chartTypes = [
    { value: 'line', label: 'Line Chart', icon: <LineChart size={16} /> },
    { value: 'bar', label: 'Bar Chart', icon: <BarChart size={16} /> },
    { value: 'area', label: 'Area Chart', icon: <AreaChartIcon size={16} /> },
    { value: 'pie', label: 'Pie Chart', icon: <PieChart size={16} /> },
];

const COLORS = {
  blue: '#3B82F6',
  pink: '#EC4899',
  yellow: '#F59E0B',
  teal: '#14B8A6',
  purple: '#8B5CF6',
  green: '#2ECC71',
  red: '#E74C3C',
  orange: '#F97316'
};

const colorCycle = [COLORS.blue, COLORS.pink, COLORS.yellow, COLORS.teal, COLORS.purple, COLORS.green, COLORS.orange, COLORS.red];

const keyToLabelAndColor = {
  'desktop': { label: 'Desktop', color: COLORS.blue },
  'mobile': { label: 'Mobile', color: COLORS.pink },
  'users': { label: 'Users', color: COLORS.blue },
  'sessions': { label: 'Sessions', color: COLORS.teal },
  'sales': { label: 'Sales', color: COLORS.green },
  'enrollments': { label: 'Enrollments', color: COLORS.purple },
  'conversion': { label: 'Conversion', color: COLORS.orange },
  'avgTime': { label: 'Avg. Time', color: COLORS.yellow },
  'engagements': { label: 'Engagements', color: COLORS.red },
  'impressions': { label: 'Impressions', color: COLORS.pink },
}
  
export const renderChart = (dataKeys: string[], chartType: string, title: string, data: any[] = []) => {
    
    if (data.length === 0) {
      return <div className="flex items-center justify-center h-full text-slate-500">No data available for this period.</div>;
    }
    
    const isValidData = data.every(item => {
        const hasLabel = item.date || item.name;
        const allKeysValid = dataKeys.every(key => typeof item[key] === 'number' && !isNaN(item[key]));
        return hasLabel && allKeysValid;
    });

    if (!isValidData) {
        console.error("Invalid data format for chart:", {dataKeys, data});
        return <div className="flex items-center justify-center h-full text-red-400">Invalid data format for chart.</div>;
    }
    
    const isTimeSeries = data[0]?.date;
    const effectiveChartType = (chartType === 'pie' && isTimeSeries) ? 'line' : chartType;
  
    const chartProps = {
      data,
      margin: { top: 5, right: 20, left: -10, bottom: 5 },
    };
  
    const formatValue = (value: number, key: string) => {
      if (isNaN(value)) return '0';
      if (key === 'sales') return `₹${value.toLocaleString('en-IN')}`;
      if (key === 'avgTime') {
        const minutes = Math.floor(value / 60);
        const seconds = Math.round(value % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
      }
      if (key === 'conversion') return `${value.toFixed(2)}%`;
      return value.toLocaleString();
    };
  
    const CustomTooltip = ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-[#0F172A] border border-slate-700 p-2 rounded shadow-lg text-white text-xs">
            <p className="font-bold mb-2">{label}</p>
            {payload.map((p: any, index: number) => {
                 const keyConfig = keyToLabelAndColor[p.dataKey as keyof typeof keyToLabelAndColor] || { label: p.name, color: colorCycle[index % colorCycle.length] };
                 return (
                    <div key={index} className="flex items-center justify-between gap-4">
                        <span style={{ color: keyConfig.color }}>{keyConfig.label}:</span>
                        <span className="font-semibold">{formatValue(p.value, p.dataKey)}</span>
                    </div>
                )
            })}
          </div>
        );
      }
      return null;
    };
  
    switch (effectiveChartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLine {...chartProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="date" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => formatValue(val, dataKeys[0])} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{fontSize: "12px"}}/>
              {dataKeys.map((key, index) => {
                 const keyConfig = keyToLabelAndColor[key as keyof typeof keyToLabelAndColor] || { label: key, color: colorCycle[index % colorCycle.length] };
                 return <Line key={key} type="monotone" dataKey={key} name={keyConfig.label} stroke={keyConfig.color} strokeWidth={2} dot={false} />
              })}
            </RechartsLine>
          </ResponsiveContainer>
        );
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBar {...chartProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="date" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => formatValue(val, dataKeys[0])} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{fontSize: "12px"}}/>
              {dataKeys.map((key, index) => {
                 const keyConfig = keyToLabelAndColor[key as keyof typeof keyToLabelAndColor] || { label: key, color: colorCycle[index % colorCycle.length] };
                 return <Bar key={key} dataKey={key} name={keyConfig.label} fill={keyConfig.color} radius={[4, 4, 0, 0]} />
              })}
            </RechartsBar>
          </ResponsiveContainer>
        );
      case 'area':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsArea {...chartProps}>
              <defs>
                 {dataKeys.map((key, index) => {
                    const keyConfig = keyToLabelAndColor[key as keyof typeof keyToLabelAndColor] || { label: key, color: colorCycle[index % colorCycle.length] };
                    return (
                        <linearGradient key={key} id={`color-${key}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={keyConfig.color} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={keyConfig.color} stopOpacity={0}/>
                        </linearGradient>
                    )
                 })}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="date" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => formatValue(val, dataKeys[0])} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{fontSize: "12px"}}/>
              {dataKeys.map((key, index) => {
                 const keyConfig = keyToLabelAndColor[key as keyof typeof keyToLabelAndColor] || { label: key, color: colorCycle[index % colorCycle.length] };
                 return <Area key={key} type="monotone" dataKey={key} stroke={keyConfig.color} fillOpacity={1} fill={`url(#color-${key})`} name={keyConfig.label} />
              })}
            </RechartsArea>
          </ResponsiveContainer>
        );
      case 'pie':
        const pieData = data.map(item => ({ name: item.name, value: item.value }));
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPie>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${entry.name}`} fill={colorCycle[index % colorCycle.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ background: '#0F172A', border: '1px solid #334155', color: '#E2E8F0', borderRadius: '0.5rem' }} 
                formatter={(value, name) => [`${(value as number).toLocaleString()} sessions`, name]} 
              />
              <Legend wrapperStyle={{fontSize: "12px"}}/>
            </RechartsPie>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };
