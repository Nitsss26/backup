"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMap from "highcharts/modules/map";
import {
  MapPin, Users, MousePointer, ShoppingCart, Heart, DollarSign, Eye, Share2,
  BarChart3, TrendingUp, Activity, Zap
} from "lucide-react";

// Initialize Highcharts Map module
if (typeof Highcharts === "object") {
  HighchartsMap(Highcharts);
}

interface EnhancedIndiaMapProps {
  startDate?: string;
  endDate?: string;
}

interface StateData {
  state: string;
  cities: {
    name: string;
    count: number;
    lat: number;
    lng: number;
  }[];
  totalCount: number;
}

interface GeoData {
  state: string;
  city: string;
  count: number;
}

// Enhanced Indian states with accurate coordinates
const INDIAN_STATES = {
  "Andhra Pradesh": { lat: 15.9129, lng: 79.7400, cities: ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati"] },
  "Arunachal Pradesh": { lat: 28.2180, lng: 94.7278, cities: ["Itanagar", "Naharlagun", "Pasighat"] },
  "Assam": { lat: 26.2006, lng: 92.9376, cities: ["Guwahati", "Dibrugarh", "Silchar", "Jorhat"] },
  "Bihar": { lat: 25.0961, lng: 85.3131, cities: ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur"] },
  "Chhattisgarh": { lat: 21.2787, lng: 81.8661, cities: ["Raipur", "Bilaspur", "Korba", "Durg"] },
  "Goa": { lat: 15.2993, lng: 74.1240, cities: ["Panaji", "Margao", "Vasco da Gama", "Mapusa"] },
  "Gujarat": { lat: 23.0225, lng: 72.5714, cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"] },
  "Haryana": { lat: 29.0588, lng: 76.0856, cities: ["Chandigarh", "Gurgaon", "Faridabad", "Panipat"] },
  "Himachal Pradesh": { lat: 31.1048, lng: 77.1734, cities: ["Shimla", "Dharamshala", "Manali", "Kullu"] },
  "Jharkhand": { lat: 23.6102, lng: 85.2799, cities: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"] },
  "Karnataka": { lat: 15.3173, lng: 75.7139, cities: ["Bangalore", "Mysore", "Hubli", "Mangalore"] },
  "Kerala": { lat: 10.8505, lng: 76.2711, cities: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"] },
  "Madhya Pradesh": { lat: 22.9734, lng: 78.6569, cities: ["Bhopal", "Indore", "Gwalior", "Jabalpur"] },
  "Maharashtra": { lat: 19.7515, lng: 75.7139, cities: ["Mumbai", "Pune", "Nagpur", "Nashik"] },
  "Manipur": { lat: 24.6637, lng: 93.9063, cities: ["Imphal", "Thoubal", "Bishnupur"] },
  "Meghalaya": { lat: 25.4670, lng: 91.3662, cities: ["Shillong", "Tura", "Jowai"] },
  "Mizoram": { lat: 23.1645, lng: 92.9376, cities: ["Aizawl", "Lunglei", "Saiha"] },
  "Nagaland": { lat: 26.1584, lng: 94.5624, cities: ["Kohima", "Dimapur", "Mokokchung"] },
  "Odisha": { lat: 20.9517, lng: 85.0985, cities: ["Bhubaneswar", "Cuttack", "Rourkela", "Puri"] },
  "Punjab": { lat: 31.1471, lng: 75.3412, cities: ["Amritsar", "Ludhiana", "Jalandhar", "Patiala"] },
  "Rajasthan": { lat: 27.0238, lng: 74.2179, cities: ["Jaipur", "Jodhpur", "Udaipur", "Kota"] },
  "Sikkim": { lat: 27.5330, lng: 88.5122, cities: ["Gangtok", "Namchi", "Gyalshing"] },
  "Tamil Nadu": { lat: 11.1271, lng: 78.6569, cities: ["Chennai", "Coimbatore", "Madurai", "Salem"] },
  "Telangana": { lat: 18.1124, lng: 79.0193, cities: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"] },
  "Tripura": { lat: 23.9408, lng: 91.9882, cities: ["Agartala", "Dharmanagar", "Udaipur"] },
  "Uttar Pradesh": { lat: 26.8467, lng: 80.9462, cities: ["Lucknow", "Kanpur", "Agra", "Varanasi"] },
  "Uttarakhand": { lat: 30.0668, lng: 79.0193, cities: ["Dehradun", "Haridwar", "Nainital", "Rishikesh"] },
  "West Bengal": { lat: 22.9868, lng: 87.8550, cities: ["Kolkata", "Howrah", "Durgapur", "Siliguri"] },
  "Delhi": { lat: 28.7041, lng: 77.1025, cities: ["New Delhi", "Delhi", "Gurgaon", "Noida"] },
  "Jammu and Kashmir": { lat: 34.0837, lng: 74.7973, cities: ["Srinagar", "Jammu", "Leh", "Anantnag"] },
};

const INDIAN_STATES_MAPPING = {
  "Andhra Pradesh": "in-ap",
  "Arunachal Pradesh": "in-ar",
  "Assam": "in-as",
  "Bihar": "in-br",
  "Chhattisgarh": "in-ct",
  "Goa": "in-ga",
  "Gujarat": "in-gj",
  "Haryana": "in-hr",
  "Himachal Pradesh": "in-hp",
  "Jharkhand": "in-jh",
  "Karnataka": "in-ka",
  "Kerala": "in-kl",
  "Madhya Pradesh": "in-mp",
  "Maharashtra": "in-mh",
  "Manipur": "in-mn",
  "Meghalaya": "in-ml",
  "Mizoram": "in-mz",
  "Nagaland": "in-nl",
  "Odisha": "in-or",
  "Punjab": "in-pb",
  "Rajasthan": "in-rj",
  "Sikkim": "in-sk",
  "Tamil Nadu": "in-tn",
  "Telangana": "in-tg",
  "Tripura": "in-tr",
  "Uttar Pradesh": "in-up",
  "Uttarakhand": "in-ut",
  "West Bengal": "in-wb",
  "Delhi": "in-dl",
  "Jammu and Kashmir": "in-jk",
};

const mapTypes = [
  { id: "unique-visitors", title: "Unique Visitors", icon: Users, color: "#3B82F6", description: "Daily unique visitors across India" },
  { id: "sessions", title: "Sessions", icon: Activity, color: "#10B981", description: "User sessions by location" },
  { id: "clicks", title: "Clicks", icon: MousePointer, color: "#F59E0B", description: "Click events distribution" },
  { id: "add-to-cart", title: "Add to Cart", icon: ShoppingCart, color: "#EF4444", description: "Cart additions by region" },
  { id: "add-to-wishlist", title: "Add to Wishlist", icon: Heart, color: "#EC4899", description: "Wishlist additions by state" },
  { id: "sales", title: "Sales", icon: DollarSign, color: "#8B5CF6", description: "Sales performance by location" },
  { id: "visits", title: "Visits", icon: MapPin, color: "#06B6D4", description: "Page visits distribution" },
  { id: "utm-sources", title: "UTM Sources", icon: Share2, color: "#84CC16", description: "Traffic sources by region" },
];

export default function EnhancedIndiaMap({ startDate, endDate }: EnhancedIndiaMapProps) {
  const [activeMap, setActiveMap] = useState('unique-visitors');
  const [mapData, setMapData] = useState<any>(null);
  const [geoData, setGeoData] = useState<GeoData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalMetrics, setTotalMetrics] = useState({
    total: 0,
    states: 0,
    topState: '',
    topStateCount: 0
  });

  const currentMapType = mapTypes.find((map) => map.id === activeMap);

  // Load India map data
  useEffect(() => {
    const loadMapData = async () => {
      try {
        const response = await fetch('https://code.highcharts.com/mapdata/countries/in/in-all.topo.json');
        const topology = await response.json();
        setMapData(topology);
      } catch (error) {
        console.error('Failed to load map data:', error);
      }
    };

    loadMapData();
  }, []);

  // Fetch geo data when map type or date range changes
  useEffect(() => {
    if (activeMap) {
      fetchGeoData();
    }
  }, [activeMap, startDate, endDate]);

  const fetchGeoData = async () => {
    setIsLoading(true);
    try {
      const dateParams = new URLSearchParams();
      if (startDate) dateParams.append('startDate', startDate);
      if (endDate) dateParams.append('endDate', endDate);
      
      const response = await fetch(`/api/analytics/geo/${activeMap}?${dateParams.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setGeoData(data);
        
        // Calculate metrics
        const total = data.reduce((sum: number, item: GeoData) => sum + item.count, 0);
        const stateGroups = data.reduce((acc: Record<string, number>, item: GeoData) => {
          acc[item.state] = (acc[item.state] || 0) + item.count;
          return acc;
        }, {});
        
        const topState = Object.entries(stateGroups).reduce((max, [state, count]) => 
          count > max.count ? { state, count } : max, { state: '', count: 0 });
        
        setTotalMetrics({
          total,
          states: Object.keys(stateGroups).length,
          topState: topState.state,
          topStateCount: topState.count
        });
      } else {
        console.error('Failed to fetch geo data');
        setGeoData([]);
      }
    } catch (error) {
      console.error('Error fetching geo data:', error);
      setGeoData([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Process geo data by state with enhanced logic
  const stateData = useMemo(() => {
    const processedData = Object.keys(INDIAN_STATES).map((stateName) => {
      const stateItems = geoData.filter(
        (item) =>
          item.state === stateName ||
          item.state?.toLowerCase().includes(stateName.toLowerCase()) ||
          stateName.toLowerCase().includes(item.state?.toLowerCase() || "")
      );
      const totalCount = stateItems.reduce((sum, item) => sum + item.count, 0);

      const cities = INDIAN_STATES[stateName as keyof typeof INDIAN_STATES].cities.map((cityName) => {
        const cityItem = stateItems.find(
          (item) =>
            item.city === cityName ||
            item.city?.toLowerCase().includes(cityName.toLowerCase()) ||
            cityName.toLowerCase().includes(item.city?.toLowerCase() || "")
        );
        return {
          name: cityName,
          count: cityItem?.count || 0,
          lat: INDIAN_STATES[stateName as keyof typeof INDIAN_STATES].lat,
          lng: INDIAN_STATES[stateName as keyof typeof INDIAN_STATES].lng,
        };
      });

      return {
        state: stateName,
        cities,
        totalCount,
      };
    });

    // Add default data to Punjab (Amritsar) if no location data found
    const totalDataCount = processedData.reduce((sum, state) => sum + state.totalCount, 0);
    if (totalDataCount === 0 && geoData.length === 0 && !isLoading) {
      const punjabIndex = processedData.findIndex(state => state.state === "Punjab");
      if (punjabIndex !== -1) {
        processedData[punjabIndex].totalCount = 1;
        const amritsarIndex = processedData[punjabIndex].cities.findIndex(city => city.name === "Amritsar");
        if (amritsarIndex !== -1) {
          processedData[punjabIndex].cities[amritsarIndex].count = 1;
        }
      }
    }

    return processedData;
  }, [geoData, isLoading]);

  const maxCount = Math.max(...stateData.map((s) => s.totalCount), 1);
  const totalDataCount = stateData.reduce((sum, state) => sum + state.totalCount, 0);

  // Prepare data for Highcharts
  const chartData = stateData
    .filter((state) => state.totalCount > 0)
    .map((state) => ({
      'hc-key': INDIAN_STATES_MAPPING[state.state as keyof typeof INDIAN_STATES_MAPPING] || 
                state.state.toLowerCase().replace(/\s+/g, '-'),
      name: state.state,
      value: state.totalCount,
    }));

  const chartOptions: Highcharts.Options = {
    chart: {
      map: mapData,
      backgroundColor: '#0f172a',
      height: 600,
    },
    title: {
      text: `${currentMapType?.title} Distribution Across India`,
      style: {
        color: '#ffffff',
        fontSize: '18px',
        fontWeight: 'bold',
      },
    },
    subtitle: {
      text: currentMapType?.description,
      style: {
        color: '#94a3b8',
        fontSize: '14px',
      },
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: 'bottom',
        theme: {
          fill: '#374151',
          'stroke-width': 1,
          stroke: '#6b7280',
          r: 3,
          style: {
            color: '#ffffff',
          },
        },
      },
    },
    colorAxis: {
      min: 0,
      max: maxCount,
      stops: [
        [0, '#1e293b'],
        [0.3, currentMapType?.color + '40'],
        [0.7, currentMapType?.color + '80'],
        [1, currentMapType?.color || '#3B82F6'],
      ],
      labels: {
        style: {
          color: '#ffffff',
        },
      },
    },
    legend: {
      enabled: true,
      itemStyle: {
        color: '#ffffff',
      },
      backgroundColor: '#1e293b',
      borderColor: '#475569',
      borderRadius: 8,
    },
    plotOptions: {
      map: {
        states: {
          hover: {
            color: '#475569',
            brightness: 0.1,
          },
        },
        dataLabels: {
          enabled: false,
        },
        borderColor: '#475569',
        borderWidth: 0.5,
        nullColor: '#1e293b',
      },
    },
    series: [
      {
        type: 'map',
        name: currentMapType?.title || 'Data',
        data: chartData,
        tooltip: {
          pointFormat: '<b>{point.name}</b><br/>{series.name}: <b>{point.value:,.0f}</b><br/>Click for details',
          backgroundColor: '#1e293b',
          borderColor: '#475569',
          borderRadius: 8,
          style: {
            color: '#ffffff',
            fontSize: '12px',
          },
        },
        point: {
          events: {
            click: function() {
              console.log(`Clicked on ${this.name}: ${this.value}`);
            }
          }
        }
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <div className="space-y-6">
      {/* Map Type Selector */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-400" />
            Enhanced India Analytics Map
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
                  {mapType.title}
                </Button>
              );
            })}
          </div>
        </CardHeader>
      </Card>

      {/* Interactive India Map */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {currentMapType?.title} Distribution Map
          </CardTitle>
          <p className="text-sm text-slate-400 mt-1">{currentMapType?.description}</p>
        </CardHeader>
        <CardContent>
          <div className="relative bg-slate-900 rounded-lg p-6 min-h-[600px] border border-slate-700">
            {mapData && !isLoading ? (
              <HighchartsReact
                highcharts={Highcharts}
                constructorType="mapChart"
                options={chartOptions}
              />
            ) : (
              <div className="flex items-center justify-center h-[600px]">
                <div className="text-white text-lg">
                  {isLoading ? "Loading map data..." : "Loading India map..."}
                </div>
              </div>
            )}

            {/* Enhanced Statistics Panel */}
            <div className="absolute top-4 right-4 bg-slate-800/95 rounded-lg p-4 border border-slate-600 backdrop-blur-sm min-w-[200px]">
              <div className="text-sm text-slate-200 mb-3 font-semibold flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Analytics Summary
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs">
                  <div
                    className="w-4 h-4 rounded border border-white"
                    style={{ backgroundColor: currentMapType?.color, opacity: 0.9 }}
                  ></div>
                  <span className="text-slate-300">High Activity</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div
                    className="w-3 h-3 rounded border border-white"
                    style={{ backgroundColor: currentMapType?.color, opacity: 0.4 }}
                  ></div>
                  <span className="text-slate-300">Low Activity</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-600">
                <div className="space-y-2 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Total:</span>
                    <span className="text-white font-medium">{totalMetrics.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active States:</span>
                    <span className="text-white font-medium">{totalMetrics.states}</span>
                  </div>
                  {totalMetrics.topState && (
                    <div className="flex justify-between">
                      <span>Top State:</span>
                      <span className="text-white font-medium">{totalMetrics.topState}</span>
                    </div>
                  )}
                  <div className="mt-2 text-blue-400 font-medium">
                    {currentMapType?.title}
                  </div>
                  {totalDataCount === 0 && geoData.length === 0 && !isLoading && (
                    <div className="mt-2 text-xs text-yellow-400">
                      * Default: Amritsar, Punjab
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced State-wise breakdown */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">
            Detailed State & City Analysis - {currentMapType?.title}
          </CardTitle>
          <p className="text-sm text-slate-400">Comprehensive breakdown by state and major cities</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {stateData
              .filter((state) => state.totalCount > 0)
              .sort((a, b) => b.totalCount - a.totalCount)
              .map((state, index) => (
                <div
                  key={state.state}
                  className="bg-slate-700 rounded-lg p-4 border border-slate-600 hover:border-slate-500 transition-colors relative"
                >
                  {index < 3 && (
                    <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-bold">
                      #{index + 1}
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-white text-sm">{state.state}</h4>
                    <span
                      className="px-2 py-1 rounded text-xs font-medium text-white"
                      style={{ backgroundColor: currentMapType?.color }}
                    >
                      {state.totalCount.toLocaleString()}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {state.cities
                      .filter((city) => city.count > 0)
                      .sort((a, b) => b.count - a.count)
                      .slice(0, 4)
                      .map((city) => (
                        <div key={city.name} className="flex items-center justify-between text-xs">
                          <span className="text-slate-300 truncate">{city.name}</span>
                          <span className="text-white font-medium ml-2">{city.count.toLocaleString()}</span>
                        </div>
                      ))}
                    {state.cities.filter((city) => city.count > 0).length === 0 && (
                      <div className="text-xs text-slate-400 italic">No city data available</div>
                    )}
                  </div>
                  
                  {/* Progress bar showing relative performance */}
                  <div className="mt-3 pt-2 border-t border-slate-600">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>Relative Performance</span>
                      <span>{((state.totalCount / maxCount) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          backgroundColor: currentMapType?.color,
                          width: `${(state.totalCount / maxCount) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {stateData.filter((state) => state.totalCount > 0).length === 0 && (
            <div className="text-center py-8 text-slate-400">
              <MapPin className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No geographical data available for the selected time period.</p>
              <p className="text-sm mt-2">Try selecting a different date range or map type.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}