import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

export default function PerformanceMetricsTable() {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Metric</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Current</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Previous</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Change</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {[
                { metric: 'Purchase Rate', current: '0.00%', previous: '0.00%', change: '0.00%', trend: 'none' },
                { metric: 'Engagement Rate', current: '0.00%', previous: '0.00%', change: '0.00%', trend: 'none' },
                { metric: 'Bounce Rate', current: '0.00%', previous: '0.00%', change: '0.00%', trend: 'none' },
                { metric: 'Avg. Order Value', current: '$0.00', previous: '$0.00', change: '$0.00', trend: 'none' },
                { metric: 'Customer Acquisition', current: '$0.00', previous: '$0.00', change: '$0.00', trend: 'none' },
              ].map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-white">{item.metric}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-white">{item.current}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">{item.previous}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">{item.change}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center text-gray-400">
                      <span>No data</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}