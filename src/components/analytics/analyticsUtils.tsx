
// "use client";

// import { 
//   LineChart as RechartsLine, 
//   BarChart as RechartsBar, 
//   PieChart as RechartsPie, 
//   AreaChart as RechartsArea, 
//   ResponsiveContainer, 
//   Line, 
//   Bar, 
//   Pie, 
//   Area, 
//   XAxis, 
//   YAxis, 
//   CartesianGrid, 
//   Tooltip, 
//   Legend, 
//   Cell 
// } from 'recharts';
// import { PieChart, BarChart, LineChart, AreaChart as AreaChartIcon } from 'lucide-react';
// import { cn } from '@/lib/utils';

// export const chartTypes = [
//     { value: 'line', label: 'Line Chart', icon: <LineChart size={16} /> },
//     { value: 'bar', label: 'Bar Chart', icon: <BarChart size={16} /> },
//     { value: 'area', label: 'Area Chart', icon: <AreaChartIcon size={16} /> },
//     { value: 'pie', label: 'Pie Chart', icon: <PieChart size={16} /> },
// ];

// const COLORS = {
//   blue: '#3B82F6',
//   pink: '#EC4899',
//   yellow: '#F59E0B',
//   teal: '#14B8A6',
//   purple: '#8B5CF6',
//   green: '#2ECC71',
//   red: '#E74C3C',
//   orange: '#F97316'
// };

// const colorCycle = [COLORS.blue, COLORS.pink, COLORS.yellow, COLORS.teal, COLORS.purple, COLORS.green, COLORS.orange, COLORS.red];

// const keyToLabelAndColor = {
//   'desktop': { label: 'Desktop', color: COLORS.blue },
//   'mobile': { label: 'Mobile', color: COLORS.pink },
//   'users': { label: 'Users', color: COLORS.blue },
//   'sessions': { label: 'Sessions', color: COLORS.teal },
//   'sales': { label: 'Sales', color: COLORS.green },
//   'enrollments': { label: 'Enrollments', color: COLORS.purple },
//   'conversion': { label: 'Conversion', color: COLORS.orange },
//   'avgTime': { label: 'Avg. Time', color: COLORS.yellow },
//   'engagements': { label: 'Engagements', color: COLORS.red },
//   'impressions': { label: 'Impressions', color: COLORS.pink },
// }
  
// export const renderChart = (dataKeys: string[], chartType: string, title: string, data: any[] = []) => {
    
//     if (data.length === 0) {
//       return <div className="flex items-center justify-center h-full text-slate-500">No data available for this period.</div>;
//     }
    
//     const isValidData = data.every(item => {
//         const hasLabel = item.date || item.name;
//         const allKeysValid = dataKeys.every(key => typeof item[key] === 'number' && !isNaN(item[key]));
//         return hasLabel && allKeysValid;
//     });

//     if (!isValidData) {
//         console.error("Invalid data format for chart:", {dataKeys, data});
//         return <div className="flex items-center justify-center h-full text-red-400">Invalid data format for chart.</div>;
//     }
    
//     const isTimeSeries = data[0]?.date;
//     const effectiveChartType = (chartType === 'pie' && isTimeSeries) ? 'line' : chartType;
  
//     const chartProps = {
//       data,
//       margin: { top: 5, right: 20, left: -10, bottom: 5 },
//     };
  
//     const formatValue = (value: number, key: string) => {
//       if (isNaN(value)) return '0';
//       if (key === 'sales') return `₹${value.toLocaleString('en-IN')}`;
//       if (key === 'avgTime') {
//         const minutes = Math.floor(value / 60);
//         const seconds = Math.round(value % 60).toString().padStart(2, '0');
//         return `${minutes}:${seconds}`;
//       }
//       if (key === 'conversion') return `${value.toFixed(2)}%`;
//       return value.toLocaleString();
//     };
  
//     const CustomTooltip = ({ active, payload, label }: any) => {
//       if (active && payload && payload.length) {
//         return (
//           <div className="bg-[#0F172A] border border-slate-700 p-2 rounded shadow-lg text-white text-xs">
//             <p className="font-bold mb-2">{label}</p>
//             {payload.map((p: any, index: number) => {
//                  const keyConfig = keyToLabelAndColor[p.dataKey as keyof typeof keyToLabelAndColor] || { label: p.name, color: colorCycle[index % colorCycle.length] };
//                  return (
//                     <div key={index} className="flex items-center justify-between gap-4">
//                         <span style={{ color: keyConfig.color }}>{keyConfig.label}:</span>
//                         <span className="font-semibold">{formatValue(p.value, p.dataKey)}</span>
//                     </div>
//                 )
//             })}
//           </div>
//         );
//       }
//       return null;
//     };
  
//     switch (effectiveChartType) {
//       case 'line':
//         return (
//           <ResponsiveContainer width="100%" height="100%">
//             <RechartsLine {...chartProps}>
//               <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
//               <XAxis dataKey="date" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
//               <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => formatValue(val, dataKeys[0])} />
//               <Tooltip content={<CustomTooltip />} />
//               <Legend wrapperStyle={{fontSize: "12px"}}/>
//               {dataKeys.map((key, index) => {
//                  const keyConfig = keyToLabelAndColor[key as keyof typeof keyToLabelAndColor] || { label: key, color: colorCycle[index % colorCycle.length] };
//                  return <Line key={key} type="monotone" dataKey={key} name={keyConfig.label} stroke={keyConfig.color} strokeWidth={2} dot={false} />
//               })}
//             </RechartsLine>
//           </ResponsiveContainer>
//         );
//       case 'bar':
//         return (
//           <ResponsiveContainer width="100%" height="100%">
//             <RechartsBar {...chartProps}>
//               <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
//               <XAxis dataKey="date" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
//               <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => formatValue(val, dataKeys[0])} />
//               <Tooltip content={<CustomTooltip />} />
//               <Legend wrapperStyle={{fontSize: "12px"}}/>
//               {dataKeys.map((key, index) => {
//                  const keyConfig = keyToLabelAndColor[key as keyof typeof keyToLabelAndColor] || { label: key, color: colorCycle[index % colorCycle.length] };
//                  return <Bar key={key} dataKey={key} name={keyConfig.label} fill={keyConfig.color} radius={[4, 4, 0, 0]} />
//               })}
//             </RechartsBar>
//           </ResponsiveContainer>
//         );
//       case 'area':
//         return (
//           <ResponsiveContainer width="100%" height="100%">
//             <RechartsArea {...chartProps}>
//               <defs>
//                  {dataKeys.map((key, index) => {
//                     const keyConfig = keyToLabelAndColor[key as keyof typeof keyToLabelAndColor] || { label: key, color: colorCycle[index % colorCycle.length] };
//                     return (
//                         <linearGradient key={key} id={`color-${key}`} x1="0" y1="0" x2="0" y2="1">
//                             <stop offset="5%" stopColor={keyConfig.color} stopOpacity={0.8}/>
//                             <stop offset="95%" stopColor={keyConfig.color} stopOpacity={0}/>
//                         </linearGradient>
//                     )
//                  })}
//               </defs>
//               <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
//               <XAxis dataKey="date" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
//               <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => formatValue(val, dataKeys[0])} />
//               <Tooltip content={<CustomTooltip />} />
//               <Legend wrapperStyle={{fontSize: "12px"}}/>
//               {dataKeys.map((key, index) => {
//                  const keyConfig = keyToLabelAndColor[key as keyof typeof keyToLabelAndColor] || { label: key, color: colorCycle[index % colorCycle.length] };
//                  return <Area key={key} type="monotone" dataKey={key} stroke={keyConfig.color} fillOpacity={1} fill={`url(#color-${key})`} name={keyConfig.label} />
//               })}
//             </RechartsArea>
//           </ResponsiveContainer>
//         );
//       case 'pie':
//         const pieData = data.map(item => ({ name: item.name, value: item.value }));
//         return (
//           <ResponsiveContainer width="100%" height="100%">
//             <RechartsPie>
//               <Pie
//                 data={pieData}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 outerRadius={100}
//                 fill="#8884d8"
//                 dataKey="value"
//                 nameKey="name"
//                 label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//               >
//                 {pieData.map((entry, index) => (
//                   <Cell key={`cell-${entry.name}`} fill={colorCycle[index % colorCycle.length]} />
//                 ))}
//               </Pie>
//               <Tooltip 
//                 contentStyle={{ background: '#0F172A', border: '1px solid #334155', color: '#E2E8F0', borderRadius: '0.5rem' }} 
//                 formatter={(value, name) => [`${(value as number).toLocaleString()} sessions`, name]} 
//               />
//               <Legend wrapperStyle={{fontSize: "12px"}}/>
//             </RechartsPie>
//           </ResponsiveContainer>
//         );
//       default:
//         return null;
//     }
//   };


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
];

// Special chart types for traffic sources (includes pie chart)
export const trafficChartTypes = [
    { value: 'line', label: 'Line Chart', icon: <LineChart size={16} /> },
    { value: 'bar', label: 'Bar Chart', icon: <BarChart size={16} /> },
    { value: 'area', label: 'Area Chart', icon: <AreaChartIcon size={16} /> },
    { value: 'pie', label: 'Pie Chart', icon: <PieChart size={16} /> },
];

const COLORS = {
  blue: '#3B82F6',      // Bright blue (from image)
  pink: '#EC4899',      // Bright pink (from image)
  yellow: '#F59E0B',    // Orange/amber (from image)
  teal: '#14B8A6',      // Teal/cyan (from image)
  purple: '#8B5CF6',    // Purple
  green: '#10B981',     // Emerald
  red: '#EF4444',       // Red
  orange: '#F97316',    // Orange
  slate: '#64748B',     // Slate
  emerald: '#059669',   // Dark emerald
  violet: '#7C3AED',    // Violet
  rose: '#F43F5E'       // Rose
};

// Exact colors from the image - bright and vibrant with equal priority
const barChartColors = [
  '#3B82F6',  // Bright blue (Course 1)
  '#EC4899',  // Bright pink (Course 2)  
  '#F59E0B',  // Orange/amber (Course 3)
  '#14B8A6',  // Teal/cyan (Course 4)
  '#8B5CF6',  // Purple (equal priority)
  '#10B981',  // Emerald (equal priority)
  '#EF4444',  // Red (equal priority)
  '#F97316',  // Orange (equal priority)
  '#7C3AED',  // Violet (equal priority)
  '#F43F5E',  // Rose (equal priority)
  '#059669',  // Dark emerald (equal priority)
  '#06B6D4'   // Cyan (equal priority)
];

const colorCycle = barChartColors; // Use the same color array for consistency

const keyToLabelAndColor = {
  'desktop': { label: 'Desktop', color: COLORS.blue },
  'mobile': { label: 'Mobile', color: COLORS.pink },
  'users': { label: 'Users', color: COLORS.blue },
  'sessions': { label: 'Sessions', color: COLORS.teal },
  'sales': { label: 'Sales', color: COLORS.emerald },
  'enrollments': { label: 'Enrollments', color: COLORS.violet },
  'conversion': { label: 'Conversion', color: COLORS.orange },
  'avgTime': { label: 'Avg. Time', color: COLORS.yellow },
  'engagements': { label: 'Engagements', color: COLORS.rose },
  'impressions': { label: 'Impressions', color: COLORS.pink },
  'addToCart': { label: 'Add to Cart', color: COLORS.red },
  'purchases': { label: 'Purchases', color: COLORS.green },
  'count': { label: 'Count', color: COLORS.blue },
  'revenue': { label: 'Revenue', color: COLORS.emerald },
  'bounceRate': { label: 'Bounce Rate', color: COLORS.orange },
}
  
export const renderChart = (dataKeys: string[], chartType: string, title: string, data: any[] = []) => {
    
    if (data.length === 0) {
      return <div className="flex items-center justify-center h-full text-slate-500">No data available for this period.</div>;
    }
    
    const isValidData = data.every(item => {
        // For pie charts, we expect 'name' and 'value'
        if (chartType === 'pie') {
            return typeof item.name === 'string' && typeof item.value === 'number' && !isNaN(item.value);
        }
        // For other charts, we expect a date/name and numeric values for dataKeys
        const hasLabel = item.date || item.name;
        const allKeysValid = dataKeys.every(key => typeof item[key] === 'number' && !isNaN(item[key]));
        return hasLabel && allKeysValid;
    });

    if (!isValidData) {
        console.error("Invalid data format for chart:", {title, dataKeys, data, chartType});
        return <div className="flex items-center justify-center h-full text-red-400">Invalid data format for chart. Check console for details.</div>;
    }
    
    const isTimeSeries = data[0]?.date;
    // If chartType is pie but data is time series, default to line chart
    const effectiveChartType = (chartType === 'pie' && isTimeSeries) ? 'line' : chartType;
  
    const chartProps = {
      data,
      margin: { top: 5, right: 20, left: -10, bottom: 5 },
    };
  
    const formatValue = (value: any, key: string) => {
      if (typeof value !== 'number' || isNaN(value)) return 'N/A';

      if (key === 'sales' || key === 'revenue') return `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
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
                 // For bar charts, use the data point index to get the color
                 const dataPointIndex = data.findIndex(item => (item.date || item.name) === label);
                 const barColor = effectiveChartType === 'bar' ? barChartColors[dataPointIndex % barChartColors.length] : colorCycle[index % colorCycle.length];
                 const keyConfig = keyToLabelAndColor[p.dataKey as keyof typeof keyToLabelAndColor] || { label: p.name || p.dataKey, color: barColor };
                 
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
              <XAxis dataKey={isTimeSeries ? "date" : "name"} stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
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
              <XAxis dataKey={isTimeSeries ? "date" : "name"} stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => formatValue(val, dataKeys[0])} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{fontSize: "12px"}}/>
              {dataKeys.map((key, index) => {
                 const keyConfig = keyToLabelAndColor[key as keyof typeof keyToLabelAndColor] || { label: key, color: barChartColors[index % barChartColors.length] };

                 return (
                   <Bar key={key} dataKey={key} name={keyConfig.label} radius={[4, 4, 0, 0]}>
                     {data.map((entry, dataIndex) => (
                       <Cell key={`cell-${dataIndex}`} fill={barChartColors[dataIndex % barChartColors.length]} />
                     ))}
                   </Bar>
                 );
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
              <XAxis dataKey={isTimeSeries ? "date" : "name"} stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
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
                fill="transparent"
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
