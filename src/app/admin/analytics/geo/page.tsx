"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Loader2, Download, RefreshCw } from 'lucide-react';
import { debounce } from 'lodash';
import { getHcKey } from '@/lib/stateMapping';

// Load Highcharts Map module dynamically
const loadHighchartsMap = async () => {
  const mapModule = await import('highcharts/modules/map');
  mapModule.default(Highcharts);
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
    const initializeMap = async () => {
      try {
        await loadHighchartsMap();
        console.log('Highcharts Map module loaded');
        const response = await fetch('https://code.highcharts.com/mapdata/countries/in/in-all.topo.json');
        if (!response.ok) throw new Error(`Failed to load map topology: HTTP ${response.status}`);
        const topology = await response.json();
        setMapTopology(topology);
        setMapLoaded(true);
        console.log('Map topology loaded successfully');
      } catch (err) {
        console.error('Error initializing map:', err);
        setError('Failed to load map data. Please try again.');
      }
    };
    initializeMap();
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
        console.log('City API response:', cityResult);
        const cityArray = Array.isArray(cityResult) ? cityResult : cityResult.data || [];
        const validCityData = cityArray.filter((item: { city: any; activeUsersCount: any; }) => {
          const isValid = typeof item.city === 'string' && typeof item.activeUsersCount === 'number';
          if (!isValid) console.warn('Invalid city data item:', item);
          return isValid;
        });
        if (cityArray.length > 0 && validCityData.length === 0) {
          throw new Error('No valid city data received from the server.');
        }
        setCityData(validCityData);

        // Fetch state data
        const stateResponse = await fetch(`/api/analytics/geo/india/states?timeframe=${encodeURIComponent(selectedTimeframe)}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!stateResponse.ok) {
          throw new Error(getErrorMessage(stateResponse.status, 'states'));
        }
        const stateResult = await stateResponse.json();
        console.log('State API response:', stateResult);
        const stateArray = Array.isArray(stateResult) ? stateResult : stateResult.data || [];
        const validStateData = stateArray.filter((item: { state: any; activeUsersCount: any; }) => {
          const isValid = typeof item.state === 'string' && typeof item.activeUsersCount === 'number';
          if (!isValid) console.warn('Invalid state data item:', item);
          return isValid;
        });
        if (stateArray.length > 0 && validStateData.length === 0) {
          throw new Error('No valid state data received from the server.');
        }
        // Add hcKey for map
        const mappedStateData = validStateData.map((item: GeoData) => ({
          ...item,
          hcKey: getHcKey(item.state || 'unknown'),
        }));
        setStateData(mappedStateData);
        console.log('State data fetched:', mappedStateData);
        setRetryCount(0);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load geo analytics data.';
        if (attempt <= 3) {
          const delay = Math.pow(2, attempt) * 1000;
          console.warn(`Retry attempt ${attempt} for timeframe ${selectedTimeframe} after ${delay}ms`);
          setTimeout(() => fetchGeoData(selectedTimeframe, attempt + 1), delay);
          setRetryCount(attempt);
        } else {
          setError(message);
          console.error('Error fetching geo data:', err);
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
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }), [sortedData, view]);

  // Memoized chart options
  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Active Users',
        },
      },
      x: {
        title: {
          display: true,
          text: view === 'cities' ? 'Cities in India' : 'States in India',
        },
        ticks: {
          autoSkip: true,
          maxRotation: 45,
          minRotation: 0,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Active Users by ${view === 'cities' ? 'City' : 'State'} in India`,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${context.raw}`,
        },
      },
    },
  }), [view]);

  // Memoized map configuration with "heavenly" design
  const mapOptions = useMemo(() => ({
    chart: {
      map: mapTopology,
      height: 500,
      backgroundColor: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        stops: [
          [0, 'rgba(15, 23, 42, 0.9)'],  // var(--bg-dark)
          [0.5, 'rgba(30, 41, 59, 0.8)'],  // var(--bg-medium)
          [1, 'rgba(51, 65, 85, 0.9)'],    // var(--bg-light)
        ],
      },
      plotBackgroundColor: 'rgba(124, 58, 237, 0.1)',  // var(--secondary-purple)
      plotBorderColor: 'rgba(45, 212, 191, 0.3)',      // var(--accent-teal)
      style: {
        fontFamily: "'Poppins', sans-serif",
        color: '#F1F5F9',  // var(--text-light)
      },
    },
    title: {
      text: 'Active Users by State in India',
      style: {
        color: '#F1F5F9',  // var(--text-light)
        fontWeight: '600',
        fontSize: '1.2rem',
        textShadow: '0 0 5px rgba(124, 58, 237, 0.7)',  // var(--secondary-purple)
      },
    },
    subtitle: {
      text: 'Source map: <a href="https://code.highcharts.com/mapdata/countries/in/in-all.topo.json" style="color:#2DD4BF">India</a>',
      style: {
        color: '#2DD4BF',  // var(--accent-teal)
      },
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: 'bottom',
        theme: {
          fill: 'rgba(30, 58, 138, 0.8)',  // var(--primary-blue)
          stroke: '#7C3AED',                // var(--secondary-purple)
          'stroke-width': 1,
          style: {
            color: '#F1F5F9',               // var(--text-light)
          },
          states: {
            hover: {
              fill: 'rgba(124, 58, 237, 0.9)',  // var(--secondary-purple)
              stroke: '#2DD4BF',                 // var(--accent-teal)
              style: {
                color: '#F1F5F9',                // var(--text-light)
              },
            },
            select: {
              fill: '#2DD4BF',                   // var(--accent-teal)
              stroke: '#7C3AED',                 // var(--secondary-purple)
              style: {
                color: '#0F172A',                // var(--bg-dark)
              },
            },
          },
        },
      },
    },
    legend: {
      backgroundColor: 'rgba(30, 41, 59, 0.7)',  // var(--bg-medium)
      borderColor: '#7C3AED',                    // var(--secondary-purple)
      borderWidth: 1,
      itemStyle: {
        color: '#F1F5F9',                      // var(--text-light)
        fontWeight: '500',
      },
      itemHoverStyle: {
        color: '#2DD4BF',                      // var(--accent-teal)
      },
    },
    colorAxis: {
      min: 0,
      minColor: 'rgba(45, 212, 191, 0.7)',      // var(--accent-teal) with opacity
      maxColor: 'rgba(30, 58, 138, 0.9)',       // var(--primary-blue) with opacity
      labels: {
        style: {
          color: '#F1F5F9',                    // var(--text-light)
          fontWeight: '500',
          textShadow: '0 0 2px rgba(15, 23, 42, 0.8)', // var(--bg-dark)
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(30, 41, 59, 0.95)', // var(--bg-medium)
      borderColor: '#7C3AED',                    // var(--secondary-purple)
      borderRadius: 8,
      style: {
        color: '#F1F5F9',                       // var(--text-light)
        textShadow: '0 0 2px rgba(15, 23, 42, 0.8)', // var(--bg-dark)
      },
      formatter: function (this: any) {
        return `<b style="color:#2DD4BF">${this.point.name}</b><br>${this.point.value || 0} active users`;
      },
    },
    series: [
      {
        data: stateData.map(d => [d.hcKey, d.activeUsersCount]),
        name: 'Active Users',
        borderColor: 'rgba(241, 245, 249, 0.3)', // var(--text-light)
        borderWidth: 1,
        states: {
          hover: {
            color: 'rgba(124, 58, 237, 0.8)',  // var(--secondary-purple)
            borderColor: '#2DD4BF',            // var(--accent-teal)
            brightness: 0.1,
          },
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}',
          style: {
            color: '#F1F5F9',                 // var(--text-light)
            textOutline: 'none',
            fontWeight: '500',
            fontSize: '10px',
            textShadow: '0 0 3px rgba(15, 23, 42, 0.9)', // var(--bg-dark)
          },
        },
        nullColor: 'rgba(51, 65, 85, 0.5)',   // var(--bg-light)
        joinBy: 'hc-key',
      },
    ],
  }), [mapTopology, stateData]);

  // Export data to CSV with formatted timestamp
  const exportToCSV = () => {
    const headers = [view === 'cities' ? 'City' : 'State', 'Active Users'];
    const rows = sortedData.map(d => [(d[view === 'cities' ? 'city' : 'state'] as string) || 'Unknown', d.activeUsersCount.toString()]);
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    link.href = url;
    link.setAttribute('download', `geo_analytics_india_${view}_${timeframe}_${timestamp}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Handle sorting
  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  return (
    <Card className="w-full max-w-6xl mx-auto" role="region" aria-labelledby="geo-analytics-title">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <CardTitle id="geo-analytics-title">Geo-Location Analytics - India</CardTitle>
        <div className="flex items-center gap-2 flex-wrap">
          <Select value={timeframe} onValueChange={setTimeframe} aria-label="Select time frame for analytics data">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30m">Last 30 Minutes</SelectItem>
              <SelectItem value="1h">Last 1 Hour</SelectItem>
              <SelectItem value="6h">Last 6 Hours</SelectItem>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
            </SelectContent>
          </Select>
          {!isLoading && !error && currentData.length > 0 && view !== 'map' && (
            <Button onClick={exportToCSV} size="sm" variant="outline" aria-label="Export analytics data to CSV">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs
          value={view}
          onValueChange={(v) => setView(v as ViewType)}
          className="w-full"
          aria-label="Select analytics view"
        >
          <TabsList className="grid w-full grid-cols-3 max-w-sm">
            <TabsTrigger value="cities" aria-controls="cities-tab-content">Cities</TabsTrigger>
            <TabsTrigger value="states" aria-controls="states-tab-content">States</TabsTrigger>
            <TabsTrigger value="map" aria-controls="map-tab-content">Map</TabsTrigger>
          </TabsList>
          <TabsContent value="cities" id="cities-tab-content">
            {renderContent('cities')}
          </TabsContent>
          <TabsContent value="states" id="states-tab-content">
            {renderContent('states')}
          </TabsContent>
          <TabsContent value="map" id="map-tab-content">
            {renderMapContent()}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );

  function renderContent(type: 'cities' | 'states') {
    if (isLoading) {
      return (
        <div className="flex flex-col gap-4" aria-live="polite">
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" aria-hidden="true" />
            <span className="ml-2 sr-only">Loading {type} data...</span>
          </div>
          <Table aria-label={`Loading placeholder for ${type} analytics table`}>
            <TableHeader>
              <TableRow>
                <TableHead>{type === 'cities' ? 'City' : 'State'}</TableHead>
                <TableHead>Active Users</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array(5).fill(0).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" /></TableCell>
                  <TableCell><div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center text-red-500 h-64 flex flex-col gap-4 items-center justify-center" aria-live="assertive" aria-describedby="error-description">
          <p id="error-description">{error}</p>
          {retryCount > 0 && <p>Retry attempt {retryCount} of 3</p>}
          <Button onClick={() => fetchGeoData(timeframe, 1)} variant="outline" aria-label="Retry fetching analytics data">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      );
    }

    if (currentData.length === 0) {
      return (
        <div className="text-center text-gray-500 h-64 flex items-center justify-center" aria-live="polite">
          No data available for the selected time frame.
        </div>
      );
    }

    return (
      <div className="space-y-6" aria-live="polite">
        <div className="h-96">
          <Bar data={chartData} options={chartOptions} aria-label={`Bar chart of active users by ${type} in India`} />
        </div>
        <div className="overflow-x-auto">
          <Table role="grid" aria-label={`${type} analytics data table`}>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort(type === 'cities' ? 'city' : 'state')}
                  onKeyDown={(e) => e.key === 'Enter' && handleSort(type === 'cities' ? 'city' : 'state')}
                  tabIndex={0}
                  aria-sort={sortKey === (type === 'cities' ? 'city' : 'state') ? sortOrder : 'none'}
                >
                  {type === 'cities' ? 'City' : 'State'} {sortKey === (type === 'cities' ? 'city' : 'state') && (sortOrder === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort('activeUsersCount')}
                  onKeyDown={(e) => e.key === 'Enter' && handleSort('activeUsersCount')}
                  tabIndex={0}
                  aria-sort={sortKey === 'activeUsersCount' ? sortOrder : 'none'}
                >
                  Active Users {sortKey === 'activeUsersCount' && (sortOrder === 'asc' ? '↑' : '↓')}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((item, index) => (
                <TableRow key={(item[type === 'cities' ? 'city' : 'state'] as string) || `fallback-${index}`} role="row">
                  <TableCell>{(item[type === 'cities' ? 'city' : 'state'] as string) || 'Unknown'}</TableCell>
                  <TableCell>{item.activeUsersCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  function renderMapContent() {
    if (isLoading || !mapLoaded) {
      return (
        <div className="flex justify-center items-center h-64" aria-live="polite">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" aria-hidden="true" />
          <span className="ml-2 sr-only">Loading map data...</span>
        </div>
      );
    }

    if (error || !mapTopology) {
      return (
        <div className="text-center text-red-500 h-64 flex flex-col items-center justify-center gap-4" aria-live="assertive" aria-describedby="map-error-description">
          <p id="map-error-description">{error || 'Failed to load map data.'}</p>
          {retryCount > 0 && <p>Retry attempt {retryCount} of 3</p>}
          <Button onClick={() => fetchGeoData(timeframe, 1)} variant="outline" aria-label="Retry fetching map data">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      );
    }

    if (stateData.length === 0) {
      return (
        <div className="text-center text-gray-500 h-64 flex items-center justify-center" aria-live="polite">
          No state data available for the selected time frame.
        </div>
      );
    }

    return (
      <div className="relative h-[520px] min-w-[310px] max-w-[800px] mx-auto rounded-xl overflow-hidden shadow-xl border border-[var(--secondary-purple)]" 
           aria-label="Map of active users by state in India">
        {/* Starry background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--primary-blue)/10%] via-[var(--bg-dark)/80%] to-[var(--bg-dark)] z-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                opacity: Math.random() * 0.7 + 0.3,
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        {/* Glowing effect */}
        <div className="absolute inset-0 rounded-xl overflow-hidden z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--accent-teal)/10%] via-transparent to-transparent animate-pulse-slow rounded-full w-[150%] h-[150%] -left-2/4 -top-1/4"></div>
        </div>
        
        {/* The actual map */}
        <div className="relative h-full z-20">
          <HighchartsReact
            highcharts={Highcharts}
            options={mapOptions}
            constructorType={'mapChart'}
            containerProps={{ 
              style: { height: '100%' }, 
              className: "rounded-xl overflow-hidden",
              role: 'region', 
              'aria-label': 'India Map Analytics' 
            }}
          />
        </div>
        
        {/* Floating clouds */}
        <div className="absolute top-10 left-10 w-24 h-12 bg-white/10 backdrop-blur-sm rounded-full blur-[2px] z-10 animate-float-cloud-1"></div>
        <div className="absolute top-20 right-20 w-32 h-16 bg-white/15 backdrop-blur-sm rounded-full blur-[3px] z-10 animate-float-cloud-2"></div>
        <div className="absolute bottom-16 left-1/3 w-28 h-14 bg-white/10 backdrop-blur-sm rounded-full blur-[2px] z-10 animate-float-cloud-3"></div>
      </div>
    );
  }
}