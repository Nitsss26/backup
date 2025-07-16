
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Loader2 } from 'lucide-react';

interface TrafficChannelData {
  name: string;
  value: number;
}

const ALL_SOURCES = ['google', 'youtube', 'linkedin', 'facebook', 'instagram', 'x', 'whatsapp', 'Direct', 'Other Referral', 'Unknown'];
const COLORS = ['#4285F4', '#FF0000', '#0077B5', '#1877F2', '#E4405F', '#000000', '#25D366', '#64748B', '#9CA3AF', '#CCCCCC'];

const sourceColorMap: Record<string, string> = {};
ALL_SOURCES.forEach((source, index) => {
  sourceColorMap[source] = COLORS[index % COLORS.length];
});

interface TrafficChannelsProps {
    startDate: string;
    endDate: string;
}

export default function TrafficChannels({ startDate, endDate }: TrafficChannelsProps) {
  const [data, setData] = useState<TrafficChannelData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrafficData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/analytics/traffic-sources?startDate=${startDate}&endDate=${endDate}`);
        if (!response.ok) {
          throw new Error('Failed to fetch traffic data');
        }
        const result: TrafficChannelData[] = await response.json();
        
        // Ensure all predefined sources are present, even with a value of 0, for the legend
        const dataMap = new Map(result.map(item => [item.name.toLowerCase(), item.value]));
        const completeData = ALL_SOURCES.map(source => ({
            name: source.charAt(0).toUpperCase() + source.slice(1), // Capitalize for display
            value: dataMap.get(source) || 0
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
      <Card className="bg-gray-800 border-gray-700 mb-6 flex items-center justify-center h-80">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400"/>
      </Card>
    );
  }
  
  if (error) {
    return (
        <Card className="bg-gray-800 border-gray-700 mb-6">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">Traffic by Channel</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-64">
                <p className="text-red-500">{error}</p>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="bg-gray-800 border-gray-700 mb-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">Traffic by Channel</CardTitle>
        <CardDescription className="text-gray-400">Distribution of traffic sources</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          {chartData.length === 0 ? (
             <div className="flex items-center justify-center h-full">
                <p className="text-gray-400">No traffic data available for this period.</p>
            </div>
          ) : (
            <ResponsiveContainer>
                 <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={sourceColorMap[entry.name.toLowerCase()] || '#ccc'} />
                        ))}
                    </Pie>
                    <Tooltip 
                        contentStyle={{ 
                            background: 'rgba(30, 41, 59, 0.9)', 
                            borderColor: '#4A5568',
                            color: '#F7FAFC',
                            borderRadius: '0.5rem'
                        }}
                        formatter={(value, name) => [`${value} sessions`, name]}
                    />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
