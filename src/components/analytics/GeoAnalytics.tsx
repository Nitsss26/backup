import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, MapPin, Users, MousePointer, ShoppingCart, Heart, DollarSign, Eye, Share2 } from 'lucide-react';
import IndiaMap from './IndiaMap';

interface GeoData {
  state: string;
  city: string;
  count: number;
  latitude?: number;
  longitude?: number;
}

interface GeoAnalyticsProps {
  startDate?: string;
  endDate?: string;
}

const mapTypes = [
  { id: 'unique-visitors', title: 'Unique Visitors Distribution', icon: Users, color: '#3B82F6' },
  { id: 'sessions', title: 'Sessions Distribution', icon: Eye, color: '#10B981' },
  { id: 'clicks', title: 'Clicks Distribution', icon: MousePointer, color: '#F59E0B' },
  { id: 'add-to-cart', title: 'Add to Cart Distribution', icon: ShoppingCart, color: '#EF4444' },
  { id: 'add-to-wishlist', title: 'Add to Wishlist Distribution', icon: Heart, color: '#EC4899' },
  { id: 'sales', title: 'Sales Distribution', icon: DollarSign, color: '#8B5CF6' },
  { id: 'visits', title: 'Visit Distribution', icon: MapPin, color: '#06B6D4' },
  { id: 'utm-sources', title: 'UTM Sources Distribution', icon: Share2, color: '#84CC16' }
];

export default function GeoAnalytics({ startDate, endDate }: GeoAnalyticsProps) {
  const [activeMap, setActiveMap] = useState('unique-visitors');
  const [geoData, setGeoData] = useState<GeoData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!startDate || !endDate) {
      setError("Please select a date range.");
      return;
    }
    fetchGeoData();
  }, [activeMap, startDate, endDate]);

  const fetchGeoData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/analytics/geo/${activeMap}?startDate=${startDate}&endDate=${endDate}`);
      if (!response.ok) {
        throw new Error('Failed to fetch geo data');
      }
      const result = await response.json();
      setGeoData(result);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setGeoData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const currentMapType = mapTypes.find(map => map.id === activeMap);

  return (
    <Card className="bg-slate-800 border-slate-700 mb-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Geo Analytics - India Distribution
        </CardTitle>
        <div className="flex flex-wrap gap-2 mt-4">
          {mapTypes.map((mapType) => {
            const Icon = mapType.icon;
            return (
              <Button
                key={mapType.id}
                variant={activeMap === mapType.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveMap(mapType.id)}
                className={`flex items-center gap-2 ${
                  activeMap === mapType.id 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-slate-700 hover:bg-slate-600 text-slate-300 border-slate-600'
                }`}
              >
                <Icon className="h-4 w-4" />
                {mapType.title.replace(' Distribution', '')}
              </Button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="text-red-400 text-center py-4">{error}</div>
        )}
        
        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
          </div>
        ) : (
          <IndiaMap 
            activeMap={activeMap}
            geoData={geoData}
            isLoading={isLoading}
          />
        )}
      </CardContent>
    </Card>
  );
}