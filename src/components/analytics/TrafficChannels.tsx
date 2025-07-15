
// src/components/analytics/TrafficChannels.tsx
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Loader2 } from 'lucide-react';

interface TrafficChannelData {
  name: string;
  value: number;
}

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#d946ef', '#64748b'];

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
        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrafficData();
  }, [startDate, endDate]);
  
  if (isLoading) {
    return (
      <Card className="bg-gray-800 border-gray-700 mb-6 flex items-center justify-center h-64">
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
            <CardContent className="flex items-center justify-center h-48">
                <p className="text-red-500">{error}</p>
            </CardContent>
        </Card>
    );
  }

  if (data.length === 0) {
      return (
        <Card className="bg-gray-800 border-gray-700 mb-6">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">Traffic by Channel</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-48">
                <p className="text-gray-400">No traffic data available for this period.</p>
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
            <ResponsiveContainer>
                 <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
        </div>
      </CardContent>
    </Card>
  );
}
