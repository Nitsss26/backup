
"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Loader2, Download, RefreshCw, Map } from 'lucide-react';
import { debounce } from 'lodash';
import { getHcKey } from '@/lib/stateMapping';

// Load Highcharts Map module dynamically
const loadHighchartsMap = async () => {
  try {
      const mapModule = await import('highcharts/modules/map');
      mapModule.default(Highcharts);
  } catch (e) {
      console.error("Failed to load highcharts map module", e);
  }
};

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface GeoData {
  city?: string;
  state?: string;
  activeUsersCount: number;
  hcKey?: string; // For map data
}

type SortKey = 'city' | 'state' | 'activeUsersCount';
type SortOrder = 'asc' | 'desc';
type ViewType = 'cities' | 'states' | 'map';

export default function GeoAnalyticsPage() {
  const [timeframe, setTimeframe] = useState<string>('30m');
  const [view, setView] = useState<ViewType>('cities');
  const [cityData, setCityData] = useState<GeoData[]>([]);
  const [stateData, setStateData] = useState<GeoData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>('activeUsersCount');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [retryCount, setRetryCount] = useState<number>(0);
  const [mapTopology, setMapTopology] = useState<any>(null);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);

  // Load Highcharts Map and topology
  useEffect(() => {
    let isMounted = true;
    const initializeMap = async () => {
      try {
        await loadHighchartsMap();
        if (!isMounted) return;
        console.log('Highcharts Map module loaded');
        const response = await fetch('https://code.highcharts.com/mapdata/countries/in/in-all.topo.json');
        if (!response.ok) throw new Error(`Failed to load map topology: HTTP ${response.status}`);
        const topology = await response.json();
        if (isMounted) {
            setMapTopology(topology);
            setMapLoaded(true);
            console.log('Map topology loaded successfully');
        }
      } catch (err) {
        console.error('Error initializing map:', err);
        if (isMounted) setError('Failed to load map data. Please try again.');
      }
    };
    initializeMap();
    return () => { isMounted = false };
  }, []);

  // Debounced fetch function with retry logic and data validation
  const fetchGeoData = useCallback(
    debounce(async (selectedTimeframe: string, attempt = 1) => {
      setIsLoading(true);
      setError(null);
      console.log('Fetching data for timeframe:', selectedTimeframe, 'Attempt:', attempt);
      try {
        // Fetch city data
        const cityResponse = await fetch(`/api/analytics/geo/india?timeframe=${encodeURIComponent(selectedTimeframe)}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!cityResponse.ok) {
          throw new Error(getErrorMessage(cityResponse.status, 'cities'));
        }
        const cityResult = await cityResponse.json();
        const cityArray = Array.isArray(cityResult) ? cityResult : cityResult.data || [];
        setCityData(cityArray);

        // Fetch state data
        const stateResponse = await fetch(`/api/analytics/geo/india/states?timeframe=${encodeURIComponent(selectedTimeframe)}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!stateResponse.ok) {
          throw new Error(getErrorMessage(stateResponse.status, 'states'));
        }
        const stateResult = await stateResponse.json();
        const stateArray = Array.isArray(stateResult) ? stateResult : stateResult.data || [];
        const mappedStateData = stateArray.map((item: GeoData) => ({
          ...item,
          hcKey: getHcKey(item.state || 'unknown'),
        }));
        setStateData(mappedStateData);
        setRetryCount(0);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load geo analytics data.';
        if (attempt <= 3) {
          const delay = Math.pow(2, attempt) * 1000;
          setTimeout(() => fetchGeoData(selectedTimeframe, attempt + 1), delay);
          setRetryCount(attempt);
        } else {
          setError(message);
          setRetryCount(0);
        }
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    fetchGeoData(timeframe);
    return () => fetchGeoData.cancel();
  }, [timeframe, fetchGeoData]);

  // Error message helper
  const getErrorMessage = (status: number, type: 'cities' | 'states') => {
    if (status === 404) return `${type.charAt(0).toUpperCase() + type.slice(1)} geo analytics endpoint not found.`;
    if (status === 500) return `Server error while fetching ${type} geo analytics.`;
    return `Failed to fetch ${type} geo analytics data (Status: ${status}).`;
  };

  // Get current data based on view
  const currentData = view === 'cities' ? cityData : stateData;

  // Memoized sorted data
  const sortedData = useMemo(() => {
    return [...currentData].sort((a, b) => {
      const key = view === 'cities' ? 'city' : 'state';
      const valueA = (a[key as keyof GeoData] as string) || '';
      const valueB = (b[key as keyof GeoData] as string) || '';
      if (sortKey === key) {
        return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }
      return sortOrder === 'asc' ? a.activeUsersCount - b.activeUsersCount : b.activeUsersCount - a.activeUsersCount;
    });
  }, [currentData, sortKey, sortOrder, view]);

  // Memoized chart data
  const chartData = useMemo(() => ({
    labels: sortedData.map(d => (d[view === 'cities' ? 'city' : 'state'] as string) || 'Unknown'),
    datasets: [
      {
        label: 'Active Users',
        data: sortedData.map(d => d.activeUsersCount),
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  }), [sortedData, view]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true },
    },
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
  };

  // Memoized map configuration
  const mapOptions = useMemo(() => ({
    chart: { map: mapTopology, backgroundColor: '#1E293B' },
    title: { text: '' },
    mapNavigation: { enabled: true, buttonOptions: { verticalAlign: 'bottom' } },
    colorAxis: { min: 0, stops: [
        [0, '#E0F2F7'],
        [0.5, '#4DD0E1'],
        [1, '#00796B']
    ]},
    series: [{
      data: stateData.map(d => [d.hcKey, d.activeUsersCount]),
      name: 'Active Users',
      states: { hover: { color: '#F59E0B' } },
      dataLabels: { enabled: true, format: '{point.name}', color: '#FFFFFF', style: { textOutline: 'none' } }
    }]
  }), [mapTopology, stateData]);
  
  // Export data to CSV
  const exportToCSV = () => {
    // ... CSV export logic
  };

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  function renderContent(type: 'cities' | 'states') {
    if (isLoading) return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-blue-400"/></div>
    if (error) return <div className="text-center text-red-400 h-64 flex flex-col gap-4 items-center justify-center"><p>{error}</p><Button onClick={() => fetchGeoData(timeframe, 1)} variant="outline"><RefreshCw className="h-4 w-4 mr-2" /> Retry</Button></div>
    if (currentData.length === 0) return <div className="text-center text-slate-400 h-64 flex items-center justify-center">No data available for this period.</div>

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-96">
          <Bar data={chartData} options={chartOptions} />
        </div>
        <div className="overflow-x-auto h-96">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-slate-800/20">
                <TableHead className="cursor-pointer text-slate-300" onClick={() => handleSort(type === 'cities' ? 'city' : 'state')}>
                  {type === 'cities' ? 'City' : 'State'} {sortKey === (type === 'cities' ? 'city' : 'state') && (sortOrder === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead className="cursor-pointer text-slate-300" onClick={() => handleSort('activeUsersCount')}>
                  Active Users {sortKey === 'activeUsersCount' && (sortOrder === 'asc' ? '↑' : '↓')}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((item, index) => (
                <TableRow key={(item[type === 'cities' ? 'city' : 'state'] as string) || `fallback-${index}`} className="hover:bg-slate-800/20">
                  <TableCell className="text-white">{(item[type === 'cities' ? 'city' : 'state'] as string) || 'Unknown'}</TableCell>
                  <TableCell className="text-white">{item.activeUsersCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  function renderMapContent() {
    if (isLoading || !mapLoaded) return <div className="flex justify-center items-center h-96"><Loader2 className="h-8 w-8 animate-spin text-blue-400" /></div>
    if (error || !mapTopology) return <div className="text-center text-red-400 h-96 flex flex-col items-center justify-center gap-4"><p>{error || 'Failed to load map.'}</p><Button onClick={() => fetchGeoData(timeframe, 1)} variant="outline"><RefreshCw className="h-4 w-4 mr-2" />Retry</Button></div>
    if (stateData.length === 0) return <div className="text-center text-slate-400 h-96 flex items-center justify-center">No state data available.</div>

    return (
      <HighchartsReact highcharts={Highcharts} options={mapOptions} constructorType={'mapChart'} containerProps={{ style: { height: '500px' } }} />
    );
  }

  return (
    <Card className="w-full bg-[#1E293B] border-slate-700 shadow-lg">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                 <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                    <Map className="text-green-400"/>
                    Real-Time Geo Analytics
                </CardTitle>
                <CardDescription className="text-slate-400">User distribution across India by city, state, and map view.</CardDescription>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Select value={timeframe} onValueChange={setTimeframe} aria-label="Select time frame for analytics data">
                <SelectTrigger className="w-[180px] bg-slate-800 border-slate-600 text-slate-300">
                  <SelectValue placeholder="Select time frame" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600 text-slate-300">
                  <SelectItem value="30m">Last 30 Minutes</SelectItem>
                  <SelectItem value="1h">Last 1 Hour</SelectItem>
                  <SelectItem value="6h">Last 6 Hours</SelectItem>
                  <SelectItem value="24h">Last 24 Hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={view} onValueChange={(v) => setView(v as ViewType)} className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-sm bg-slate-800 text-slate-300">
            <TabsTrigger value="cities">Cities</TabsTrigger>
            <TabsTrigger value="states">States</TabsTrigger>
            <TabsTrigger value="map">Map</TabsTrigger>
          </TabsList>
          <TabsContent value="cities">{renderContent('cities')}</TabsContent>
          <TabsContent value="states">{renderContent('states')}</TabsContent>
          <TabsContent value="map">{renderMapContent()}</TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
