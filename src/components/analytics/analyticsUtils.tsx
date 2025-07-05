import { 
    LineChart as RechartsLine, 
    BarChart as RechartsBar, 
    PieChart as RechartsPie, 
    AreaChart as RechartsArea, 
    ScatterChart as RechartsScatter,
    ResponsiveContainer, 
    Line, 
    Bar, 
    Pie, 
    Area, 
    Scatter, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    Cell 
  } from 'recharts';
  
  export const chartTypes = [
    { value: 'line', label: 'Line' },
    { value: 'bar', label: 'Bar' },
    { value: 'area', label: 'Area' },
    { value: 'pie', label: 'Pie' },
    { value: 'scatter', label: 'Scatter' },
  ];
  
  export const mockData = {
    users: [
      { date: '2025-06-01', users: 100 },
      { date: '2025-06-30', users: 150 },
    ],
    sessions: [
      { date: '2025-06-01', sessions: 200 },
      { date: '2025-06-30', sessions: 250 },
    ],
    sales: [
      { date: '2025-06-01', sales: 5000 },
      { date: '2025-06-30', sales: 7500 },
    ],
    enrollments: [
      { date: '2025-06-01', enrollments: 50 },
      { date: '2025-06-30', enrollments: 75 },
    ],
    conversion: [
      { date: '2025-06-01', conversion: 0, dailyIncrement: 'No data' },
      { date: '2025-06-30', conversion: 7.5, dailyIncrement: '↑ 100%' },
    ],
    avgTime: [
      { date: '2025-06-01', avgTime: 120 },
      { date: '2025-06-30', avgTime: 180 },
    ],
    engagements: [
      { date: '2025-06-01', engagements: 300 },
      { date: '2025-06-30', engagements: 400 },
    ],
    impressions: [
      { date: '2025-06-01', impressions: 1000 },
      { date: '2025-06-30', impressions: 1500 },
    ],
  };
  
  const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
  
  export const renderChart = (dataKey: string, chartType: string, title: string, data: any[] = []) => {
    // Validate data format
    const isValidData = data.every((item, index) => {
      const isValid = item.date && typeof item[dataKey] === 'number' && !isNaN(item[dataKey]);
      if (!isValid) {
        console.warn(`Invalid data at index ${index} for ${dataKey} chart:`, item);
      }
      return isValid;
    });
  
    if (!isValidData && data.length > 0) {
      return (
        <div className="flex items-center justify-center h-full text-gray-400">
          Invalid or malformed data format
        </div>
      );
    }
  
    if (data.length === 0) {
      return (
        <div className="flex items-center justify-center h-full text-gray-400">
          No data available for the selected period
        </div>
      );
    }
  
    // Default to line chart for time-series data if pie is selected
    const effectiveChartType = (chartType === 'pie' && (dataKey === 'users' || dataKey === 'sessions' || dataKey === 'sales' || dataKey === 'enrollments' || dataKey === 'engagements' || dataKey === 'avgTime' || dataKey === 'impressions' || dataKey === 'conversion')) ? 'line' : chartType;
  
    const chartProps = {
      data,
      margin: { top: 20, right: 30, left: 20, bottom: 10 },
    };
  
    // Formatter for Y-axis and tooltip
    const formatValue = (value: number) => {
      if (dataKey === 'sales') {
        return `₹${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      } else if (dataKey === 'avgTime') {
        const minutes = Math.floor(value / 60);
        const seconds = Math.round(value % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
      } else if (dataKey === 'impressions') {
        return value.toLocaleString();
      } else if (dataKey === 'conversion') {
        return `${value.toFixed(2)}%`;
      }
      return value.toLocaleString();
    };
  
    // Custom tooltip to show daily increment for conversion
    const CustomTooltip = ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
          <div className="bg-gray-800 border-gray-700 p-2 rounded shadow">
            <p className="text-white">{`Date: ${label}`}</p>
            <p className="text-white">{`${title}: ${formatValue(data[dataKey])}`}</p>
            {dataKey === 'conversion' && data.dailyIncrement && (
              <p className={`text-xs ${data.dailyIncrement.includes('↑') ? 'text-green-500' : data.dailyIncrement.includes('↓') ? 'text-red-500' : 'text-gray-400'}`}>
                {`Change: ${data.dailyIncrement}`}
              </p>
            )}
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
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" tickFormatter={formatValue} />
              <Tooltip 
                content={<CustomTooltip />}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey={dataKey} 
                stroke={COLORS[0]} 
                activeDot={{ r: 8 }} 
                name={title}
              />
            </RechartsLine>
          </ResponsiveContainer>
        );
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBar {...chartProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" tickFormatter={formatValue} />
              <Tooltip 
                content={<CustomTooltip />}
              />
              <Legend />
              <Bar dataKey={dataKey} fill={COLORS[1]} name={title} />
            </RechartsBar>
          </ResponsiveContainer>
        );
      case 'area':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsArea {...chartProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" tickFormatter={formatValue} />
              <Tooltip 
                content={<CustomTooltip />}
              />
              <Legend />
              <Area type="monotone" dataKey={dataKey} fill={COLORS[2]} stroke={COLORS[2]} name={title} />
            </RechartsArea>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPie>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey={dataKey}
                nameKey="date"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                content={<CustomTooltip />}
              />
              <Legend />
            </RechartsPie>
          </ResponsiveContainer>
        );
      case 'scatter':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsScatter {...chartProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" tickFormatter={formatValue} />
              <Tooltip 
                content={<CustomTooltip />}
              />
              <Legend />
              <Scatter name={title} dataKey={dataKey} fill={COLORS[4]} />
            </RechartsScatter>
          </ResponsiveContainer>
        );
      default:
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLine {...chartProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" tickFormatter={formatValue} />
              <Tooltip 
                content={<CustomTooltip />}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey={dataKey} 
                stroke={COLORS[0]} 
                activeDot={{ r: 8 }} 
                name={title}
              />
            </RechartsLine>
          </ResponsiveContainer>
        );
    }
  };