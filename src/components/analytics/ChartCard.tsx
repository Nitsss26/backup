
"use client";

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Loader2, RefreshCw } from 'lucide-react';
import { renderChart, chartTypes } from './analyticsUtils';
import { Button } from '@/components/ui/button';

interface ChartCardProps {
  title: string;
  dataKey?: string; // Optional for single data key charts
  dataKeys?: string[]; // Optional for multi-data key charts
  endpoint: string;
  chartType: string;
  setChartType: (type: string) => void;
  startDate?: Date;
  endDate?: Date;
}

export default function ChartCard({ title, dataKey, dataKeys, endpoint, chartType, setChartType, startDate, endDate }: ChartCardProps) {
  const [chartData, setChartData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const keysToRender = dataKeys || (dataKey ? [dataKey] : []);

  const fetchChartData = useCallback(async () => {
    if (!startDate || !endDate || isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      setError('Please select a valid date range.');
      setIsLoading(false);
      return;
    }

    const apiEndpoint = endpoint;
    const formattedStartDate = startDate.toISOString();
    const formattedEndDate = endDate.toISOString();
    
    setIsLoading(true);
    setError(null);
    try {
      // Always use query parameters for date filtering
      const response = await fetch(`/api/analytics/${apiEndpoint}?startDate=${formattedStartDate}&endDate=${formattedEndDate}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      // Handle both formats: direct array or nested in chartData
      const rawData = Array.isArray(data) ? data : (Array.isArray(data.chartData) ? data.chartData : []);
      
      const formattedData = rawData.map((item: any) => {
        const newItem: { [key: string]: any } = { date: item.date };
        keysToRender.forEach(key => {
          newItem[key] = Number(item[key] ?? 0);
        });
        // For single-key charts that might use a different property name in API response
        if (dataKey && !keysToRender.includes(dataKey) && item[dataKey]) {
            newItem[dataKey] = Number(item[dataKey]);
        }
        return newItem;
      });

      setChartData(formattedData);
    } catch (error: any) {
      console.error(`Error fetching ${title} chart data:`, error);
      setChartData([]);
      setError(error.message || `Failed to fetch ${title} data`);
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, startDate, endDate, refreshKey, title, dataKey, keysToRender]);

  useEffect(() => {
    fetchChartData();
  }, [fetchChartData]);

  return (
    <Card className="bg-[#1E293B] border-slate-700 shadow-lg">
      <CardHeader className="flex flex-row justify-between items-center p-4">
        <CardTitle className="text-base font-semibold text-slate-300">{title}</CardTitle>
        <div className="flex items-center gap-2">
            <Select value={chartType} onValueChange={setChartType}>
                <SelectTrigger className="w-[150px] bg-slate-800 border-slate-600 text-slate-300 text-xs h-8">
                    <SelectValue placeholder="Chart Type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600 text-slate-300">
                    {chartTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value} className="text-xs">
                        <div className="flex items-center gap-2">
                        {type.icon}
                        <span>{type.label}</span>
                        </div>
                    </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:bg-slate-800 hover:text-white" onClick={() => setRefreshKey(k => k + 1)}>
              <RefreshCw className="h-4 w-4" />
            </Button>
        </div>
      </CardHeader>
      <CardContent className="h-80">
        {isLoading ? (
          <div className="flex items-center justify-center h-full text-slate-400">
            <Loader2 className="h-8 w-8 animate-spin"/>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full text-red-400">
            {error}
          </div>
        ) : chartData.length > 0 ? (
          renderChart(keysToRender, chartType, title, chartData)
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500">
            No data available for this period.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
