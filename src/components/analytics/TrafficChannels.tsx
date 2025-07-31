
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Loader2 } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { trafficChartTypes, renderChart } from './analyticsUtils';

interface TrafficChannelData {
  name: string;
  value: number;
}

const ALL_SOURCES = ['Google', 'WhatsApp', 'Instagram', 'LinkedIn', 'YouTube', 'Google Form', 'Facebook', 'Twitter', 'Reddit', 'Direct', 'Other', 'Unknown'];

const COLORS = {
  'Google': '#4285F4',      // Google blue
  'WhatsApp': '#25D366',    // WhatsApp green
  'Instagram': '#E4405F',   // Instagram pink
  'LinkedIn': '#0077B5',    // LinkedIn blue
  'YouTube': '#FF0000',     // YouTube red
  'Google Form': '#34A853', // Google green
  'Facebook': '#1877F2',    // Facebook blue
  'Twitter': '#1DA1F2',     // Twitter blue
  'Reddit': '#FF4500',      // Reddit orange
  'Direct': '#64748B',      // Slate
  'Other': '#9CA3AF',       // Gray
  'Unknown': '#6B7280'      // Dark gray
};

interface TrafficChannelsProps {
    startDate?: string;
    endDate?: string;
}

export default function TrafficChannels({ startDate, endDate }: TrafficChannelsProps) {
  const [data, setData] = useState<TrafficChannelData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartType, setChartType] = useState('pie');

  useEffect(() => {
    if (!startDate || !endDate) {
        setIsLoading(false);
        setError("Please select a date range.");
        return;
    };

    const fetchTrafficData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Use the new UTM tracking API with date parameters
        const response = await fetch(`/api/analytics/traffic-sources?startDate=${startDate}&endDate=${endDate}`);
        if (!response.ok) {
          throw new Error('Failed to fetch traffic data');
        }
        const result = await response.json();
        
        // Handle both formats: {source, count} or {name, value}
        const trafficData = result.map((item: any) => ({
          name: item.source || item.name || 'Unknown',
          value: Number(item.count || item.value || 0)
        }));
        
        const dataMap = new Map(trafficData.map((item: any) => [item.name, item.value]));
        const completeData = ALL_SOURCES.map(source => ({
            name: source,
            value: Number(dataMap.get(source) || 0)
        }));

        setData(completeData);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrafficData();
  }, [startDate, endDate]);
  
  const chartData = data.filter(item => item.value > 0);

  if (isLoading) {
    return (
      <Card className="bg-slate-800 border-slate-700 mb-6 flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400"/>
      </Card>
    );
  }
  
  if (error) {
    return (
        <Card className="bg-slate-800 border-slate-700 mb-6">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">Traffic by Channel</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-80">
                <p className="text-red-400">{error}</p>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="bg-slate-800 border-slate-700 mb-6">
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle className="text-lg font-semibold text-white">Traffic by Channel</CardTitle>
          <CardDescription className="text-slate-300">Distribution of traffic sources based on UTM and referrals</CardDescription>
        </div>
        <Select value={chartType} onValueChange={setChartType}>
          <SelectTrigger className="w-[150px] bg-slate-800 border-slate-600 text-slate-300 text-xs h-8">
            <SelectValue placeholder="Chart Type" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-600 text-slate-300">
            {trafficChartTypes.map((type) => (
              <SelectItem key={type.value} value={type.value} className="text-xs">
                <div className="flex items-center gap-2">
                  {type.icon}
                  <span>{type.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-96 w-full">
          {chartData.length === 0 ? (
             <div className="flex items-center justify-center h-full">
                <p className="text-slate-300">No traffic data available for this period.</p>
            </div>
          ) : (
            chartType === 'pie' ? (
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="transparent"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {chartData.map((entry) => (
                      <Cell key={`cell-${entry.name}`} fill={COLORS[entry.name as keyof typeof COLORS] || '#9CA3AF'} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(30, 41, 59, 0.95)', 
                      borderColor: '#475569',
                      color: '#F1F5F9',
                      borderRadius: '0.5rem'
                    }}
                    formatter={(value, name) => [`${(value as number).toLocaleString()} sessions`, name]}
                  />
                  <Legend 
                    wrapperStyle={{ color: '#F1F5F9' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              renderChart(['value'], chartType, 'Traffic by Channel', chartData)
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}
