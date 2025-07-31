"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMap from "highcharts/modules/map";
import {
  MapPin,
  Users,
  MousePointer,
  ShoppingCart,
  Heart,
  DollarSign,
  Eye,
  Share2,
} from "lucide-react";

// Initialize Highcharts Map module
if (typeof Highcharts === "object") {
  HighchartsMap(Highcharts);
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

interface IndiaMapProps {
  activeMap: string;
  geoData: any[];
  isLoading: boolean;
  startDate?: string;
  endDate?: string;
}

// Indian states mapping for Highcharts
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

const INDIAN_STATES = {
  "Jammu and Kashmir": { lat: 34.0837, lng: 74.7973, cities: ["Srinagar", "Jammu", "Leh"] },
  "Himachal Pradesh": { lat: 31.1048, lng: 77.1734, cities: ["Shimla", "Dharamshala", "Manali"] },
  "Punjab": { lat: 31.1471, lng: 75.3412, cities: ["Amritsar", "Ludhiana", "Jalandhar", "Patiala"] },
  "Haryana": { lat: 29.0588, lng: 76.0856, cities: ["Chandigarh", "Gurgaon", "Faridabad"] },
  "Delhi": { lat: 28.7041, lng: 77.1025, cities: ["New Delhi", "Delhi"] },
  "Uttar Pradesh": { lat: 26.8467, lng: 80.9462, cities: ["Lucknow", "Kanpur", "Agra", "Varanasi", "Noida"] },
  "Uttarakhand": { lat: 30.0668, lng: 79.0193, cities: ["Dehradun", "Haridwar", "Nainital"] },
  "Rajasthan": { lat: 27.0238, lng: 74.2179, cities: ["Jaipur", "Jodhpur", "Udaipur", "Kota"] },
  "Gujarat": { lat: 23.0225, lng: 72.5714, cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"] },
  "Maharashtra": { lat: 19.7515, lng: 75.7139, cities: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"] },
  "Madhya Pradesh": { lat: 22.9734, lng: 78.6569, cities: ["Bhopal", "Indore", "Gwalior", "Jabalpur"] },
  "Chhattisgarh": { lat: 21.2787, lng: 81.8661, cities: ["Raipur", "Bilaspur", "Korba"] },
  "Bihar": { lat: 25.0961, lng: 85.3131, cities: ["Patna", "Gaya", "Muzaffarpur"] },
  "Jharkhand": { lat: 23.6102, lng: 85.2799, cities: ["Ranchi", "Jamshedpur", "Dhanbad"] },
  "West Bengal": { lat: 22.9868, lng: 87.8550, cities: ["Kolkata", "Howrah", "Durgapur"] },
  "Odisha": { lat: 20.9517, lng: 85.0985, cities: ["Bhubaneswar", "Cuttack", "Rourkela"] },
  "Andhra Pradesh": { lat: 15.9129, lng: 79.7400, cities: ["Visakhapatnam", "Vijayawada", "Guntur"] },
  "Telangana": { lat: 18.1124, lng: 79.0193, cities: ["Hyderabad", "Warangal", "Nizamabad"] },
  "Karnataka": { lat: 15.3173, lng: 75.7139, cities: ["Bangalore", "Mysore", "Hubli", "Mangalore"] },
  "Tamil Nadu": { lat: 11.1271, lng: 78.6569, cities: ["Chennai", "Coimbatore", "Madurai", "Salem"] },
  "Kerala": { lat: 10.8505, lng: 76.2711, cities: ["Thiruvananthapuram", "Kochi", "Kozhikode"] },
  "Goa": { lat: 15.2993, lng: 74.1240, cities: ["Panaji", "Margao", "Vasco da Gama"] },
  "Assam": { lat: 26.2006, lng: 92.9376, cities: ["Guwahati", "Dibrugarh", "Silchar"] },
  "Meghalaya": { lat: 25.4670, lng: 91.3662, cities: ["Shillong", "Tura"] },
  "Manipur": { lat: 24.6637, lng: 93.9063, cities: ["Imphal"] },
  "Mizoram": { lat: 23.1645, lng: 92.9376, cities: ["Aizawl"] },
  "Tripura": { lat: 23.9408, lng: 91.9882, cities: ["Agartala"] },
  "Nagaland": { lat: 26.1584, lng: 94.5624, cities: ["Kohima", "Dimapur"] },
  "Arunachal Pradesh": { lat: 28.2180, lng: 94.7278, cities: ["Itanagar"] },
  "Sikkim": { lat: 27.5330, lng: 88.5122, cities: ["Gangtok"] },
};

const mapTypes = [
  { id: "unique-visitors", title: "Unique Visitors", icon: Users, color: "#3B82F6" },
  { id: "sessions", title: "Sessions", icon: Eye, color: "#10B981" },
  { id: "clicks", title: "Clicks", icon: MousePointer, color: "#F59E0B" },
  { id: "add-to-cart", title: "Add to Cart", icon: ShoppingCart, color: "#EF4444" },
  { id: "add-to-wishlist", title: "Add to Wishlist", icon: Heart, color: "#EC4899" },
  { id: "sales", title: "Sales", icon: DollarSign, color: "#8B5CF6" },
  { id: "visits", title: "Visits", icon: MapPin, color: "#06B6D4" },
  { id: "utm-sources", title: "UTM Sources", icon: Share2, color: "#84CC16" },
];

export default function IndiaMap({ activeMap, geoData, isLoading, startDate, endDate }: IndiaMapProps) {
  const [mapData, setMapData] = useState<any>(null);
  const [actualGeoData, setActualGeoData] = useState<any[]>([]);
  const currentMapType = mapTypes.find((map) => map.id === activeMap);

  // Load India map data
  useEffect(() => {
    const loadMapData = async () => {
      try {
        // Using Highcharts built-in India map
        const response = await fetch('https://code.highcharts.com/mapdata/countries/in/in-all.topo.json');
        const topology = await response.json();
        setMapData(topology);
      } catch (error) {
        console.error('Failed to load map data:', error);
      }
    };

    loadMapData();
  }, []);

  // Use the geoData passed from parent component
  useEffect(() => {
    setActualGeoData(geoData || []);
  }, [geoData]);

  // Process geo data by state with default to Amritsar, Punjab
  const stateData = useMemo(() => {
    const processedData = Object.keys(INDIAN_STATES).map((stateName) => {
      const stateItems = actualGeoData.filter(
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
    if (totalDataCount === 0 && actualGeoData.length === 0 && !isLoading) {
      // Add default data to Punjab (Amritsar) when no location is detected
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
  }, [actualGeoData, isLoading]);

  const maxCount = Math.max(...stateData.map((s) => s.totalCount), 1);
  const totalDataCount = stateData.reduce((sum, state) => sum + state.totalCount, 0);

  // Prepare data for Highcharts
  const chartData = stateData
    .filter((state) => state.totalCount > 0)
    .map((state) => ({
      'hc-key': INDIAN_STATES_MAPPING[state.state as keyof typeof INDIAN_STATES_MAPPING] || state.state.toLowerCase().replace(/\s+/g, '-'),
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
      text: `India ${currentMapType?.title} Distribution`,
      style: {
        color: '#ffffff',
        fontSize: '18px',
        fontWeight: 'bold',
      },
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: 'bottom',
      },
    },
    colorAxis: {
      min: 0,
      max: maxCount,
      stops: [
        [0, '#1e293b'],
        [0.5, currentMapType?.color || '#3B82F6'],
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
    },
    plotOptions: {
      map: {
        states: {
          hover: {
            color: '#475569',
          },
        },
        dataLabels: {
          enabled: false,
        },
        borderColor: '#475569',
        borderWidth: 1,
      },
    },
    series: [
      {
        type: 'map',
        name: currentMapType?.title || 'Data',
        data: chartData,
        tooltip: {
          pointFormat: '<b>{point.name}</b><br/>{series.name}: <b>{point.value:,.0f}</b><br/>Click to view details',
          backgroundColor: '#1e293b',
          borderColor: '#475569',
          borderRadius: 8,
          style: {
            color: '#ffffff',
            fontSize: '12px',
          },
        },
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <div className="space-y-6">
      {/* Interactive India Map */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            India Distribution Map - {currentMapType?.title}
          </CardTitle>
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

            {/* Enhanced Legend */}
            <div className="absolute top-4 right-4 bg-slate-800/95 rounded-lg p-4 border border-slate-600 backdrop-blur-sm">
              <div className="text-sm text-slate-200 mb-3 font-semibold">Legend</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <div
                    className="w-5 h-5 rounded border border-white"
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
              <div className="mt-3 pt-3 border-t border-slate-600">
                <div className="text-xs text-slate-400">
                  <div>
                    Total: {actualGeoData.reduce((sum, item) => sum + item.count, 0).toLocaleString()}
                  </div>
                  <div className="mt-1">
                    States: {stateData.filter((s) => s.totalCount > 0).length}
                  </div>
                  <div className="mt-1 text-blue-400">
                    {currentMapType?.title}
                  </div>
                  {totalDataCount === 0 && actualGeoData.length === 0 && !isLoading && (
                    <div className="mt-2 text-xs text-yellow-400">
                      * Default location: Amritsar, Punjab
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
            State & City Breakdown - {currentMapType?.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {stateData
              .filter((state) => state.totalCount > 0)
              .sort((a, b) => b.totalCount - a.totalCount)
              .map((state) => (
                <div
                  key={state.state}
                  className="bg-slate-700 rounded-lg p-4 border border-slate-600 hover:border-slate-500 transition-colors"
                >
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
                </div>
              ))}
          </div>

          {stateData.filter((state) => state.totalCount > 0).length === 0 && (
            <div className="text-center py-8 text-slate-400">
              <MapPin className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No geographical data available for the selected time period.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}