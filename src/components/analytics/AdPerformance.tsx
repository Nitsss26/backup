// src/components/analytics/AdPerformance.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdPerformance() {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">Ad Campaign Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            { name: 'Google Ads', cpc: 0.27, impressions: 224, clicks: 651 },
            { name: 'Facebook Ads', cpc: 0.32, impressions: 198, clicks: 589 },
            { name: 'Instagram Ads', cpc: 0.29, impressions: 185, clicks: 542 },
            { name: 'LinkedIn Ads', cpc: 0.41, impressions: 156, clicks: 412 },
            { name: 'TikTok Ads', cpc: 0.25, impressions: 210, clicks: 601 },
          ].map((campaign, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="text-white font-medium">{campaign.name}</div>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-gray-400 text-xs">CPC</div>
                  <div className="text-white">${campaign.cpc}</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400 text-xs">Impressions</div>
                  <div className="text-white">{campaign.impressions}K</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400 text-xs">Clicks</div>
                  <div className="text-white">{campaign.clicks}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}