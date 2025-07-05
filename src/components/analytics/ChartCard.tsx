import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { LayoutGrid } from 'lucide-react';
import { renderChart } from './analyticsUtils';

interface ChartCardProps {
  title: string;
  dataKey: string;
  chartType: string;
  setChartType: (type: string) => void;
  startDate?: Date;
  endDate?: Date;
}

export default function ChartCard({ title, dataKey, chartType, setChartType, startDate, endDate }: ChartCardProps) {
  const [chartData, setChartData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (['users', 'sessions', 'sales', 'enrollments', 'conversion', 'avgTime', 'engagements', 'impressions'].includes(dataKey) && startDate && endDate && !isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
      const endpoint = dataKey === 'users' ? 'totalusers' : dataKey === 'avgTime' ? 'avg-time' : dataKey;

      const formattedStartDate = startDate.toISOString();
      const formattedEndDate = endDate.toISOString();

      console.log(`Fetching ${dataKey} for range: ${formattedStartDate} to ${formattedEndDate}`);

      const fetchChartData = async () => {
        try {
          const response = await fetch(
            `https://6000-firebase-studio-1748862865024.cluster-htdgsbmflbdmov5xrjithceibm.cloudworkstations.dev/api/analytics/${endpoint}?startDate=${formattedStartDate}&endDate=${formattedEndDate}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          console.log(`Fetched ${dataKey} chart data:`, data.chartData);
          // Ensure conversion is numeric
          const formattedData = dataKey === 'conversion' && data.chartData
            ? data.chartData.map((item: any) => ({
                ...item,
                conversion: Number(item.conversion) || 0,
              }))
            : data.chartData || [];
          setChartData(formattedData);
          setError(null);
        } catch (error: any) {
          console.error(`Error fetching ${dataKey} chart data:`, error);
          setChartData([]);
          setError(error.message || `Failed to fetch ${dataKey} data`);
        }
      };
      fetchChartData();
    } else {
      console.log(`No fetch for ${dataKey}: invalid dataKey or date range missing`);
      setChartData([]);
      setError('Invalid data key or date range not provided');
    }
  }, [dataKey, startDate, endDate]);

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-lg font-semibold text-white">{title}</CardTitle>
        <Select value={chartType} onValueChange={setChartType}>
          <SelectTrigger className="w-[180px] bg-gray-700 border-gray-600 text-white">
            <div className="flex items-center">
              <LayoutGrid className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Chart Type" />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 text-white">
            {[
              { value: 'line', label: 'Line', icon: <LayoutGrid size={16} /> },
              { value: 'bar', label: 'Bar', icon: <LayoutGrid size={16} /> },
              { value: 'area', label: 'Area', icon: <LayoutGrid size={16} /> },
              { value: 'pie', label: 'Pie', icon: <LayoutGrid size={16} /> },
              { value: 'scatter', label: 'Scatter', icon: <LayoutGrid size={16} /> },
            ].map((type) => (
              <SelectItem key={type.value} value={type.value}>
                <div className="flex items-center">
                  {type.icon}
                  <span className="ml-2">{type.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="h-80">
        {error ? (
          <div className="flex items-center justify-center h-full text-red-500">
            {error}
          </div>
        ) : chartData.length > 0 ? (
          renderChart(dataKey, chartType, title, chartData)
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No data available
          </div>
        )}
      </CardContent>
    </Card>
  );
}