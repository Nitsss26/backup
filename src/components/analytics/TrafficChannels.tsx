// src/components/analytics/TrafficChannels.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function TrafficChannels() {
  return (
    <Card className="bg-gray-800 border-gray-700 mb-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">Traffic by Channel</CardTitle>
        <CardDescription className="text-gray-400">Distribution of traffic sources</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: 'Google Ads', value: 7.76, color: '#4f46e5' },
            { name: 'Twitter Ads', value: 14.46, color: '#10b981' },
            { name: 'TikTok', value: 14.66, color: '#f59e0b' },
            { name: 'Facebook', value: 14.96, color: '#ef4444' },
            { name: 'Instagram', value: 22.18, color: '#8b5cf6' },
            { name: 'LinkedIn', value: 25.98, color: '#06b6d4' },
          ].map((channel, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full flex items-center justify-center" 
                  style={{ 
                    background: `conic-gradient(${channel.color} ${channel.value * 3.6}deg, #374151 0)` 
                  }}>
                  <div className="absolute inset-4 bg-gray-800 rounded-full"></div>
                  <span className="text-white font-bold text-lg z-10">{channel.value}%</span>
                </div>
              </div>
              <div className="mt-2 text-center">
                <div className="text-white font-medium">{channel.name}</div>
                <div className="flex items-center justify-center mt-1">
                  <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: channel.color }}></div>
                  <span className="text-gray-400 text-xs">{channel.value}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}