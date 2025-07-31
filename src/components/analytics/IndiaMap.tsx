// // "use client";

// // import { useState, useEffect } from 'react';
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Button } from '@/components/ui/button';
// // import { MapPin, Users, MousePointer, ShoppingCart, Heart, DollarSign, Eye, Share2 } from 'lucide-react';

// // interface StateData {
// //   state: string;
// //   cities: {
// //     name: string;
// //     count: number;
// //     lat: number;
// //     lng: number;
// //   }[];
// //   totalCount: number;
// // }

// // interface IndiaMapProps {
// //   activeMap: string;
// //   geoData: any[];
// //   isLoading: boolean;
// // }

// // // Indian states with their coordinates and major cities - accurate positioning
// // const INDIAN_STATES = {
// //   'Jammu and Kashmir': { lat: 34.0837, lng: 74.7973, cities: ['Srinagar', 'Jammu', 'Leh'] },
// //   'Himachal Pradesh': { lat: 31.1048, lng: 77.1734, cities: ['Shimla', 'Dharamshala', 'Manali'] },
// //   'Punjab': { lat: 31.1471, lng: 75.3412, cities: ['Amritsar', 'Ludhiana', 'Jalandhar', 'Patiala'] },
// //   'Haryana': { lat: 29.0588, lng: 76.0856, cities: ['Chandigarh', 'Gurgaon', 'Faridabad'] },
// //   'Delhi': { lat: 28.7041, lng: 77.1025, cities: ['New Delhi', 'Delhi'] },
// //   'Uttar Pradesh': { lat: 26.8467, lng: 80.9462, cities: ['Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Noida'] },
// //   'Uttarakhand': { lat: 30.0668, lng: 79.0193, cities: ['Dehradun', 'Haridwar', 'Nainital'] },
// //   'Rajasthan': { lat: 27.0238, lng: 74.2179, cities: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota'] },
// //   'Gujarat': { lat: 23.0225, lng: 72.5714, cities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'] },
// //   'Maharashtra': { lat: 19.7515, lng: 75.7139, cities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'] },
// //   'Madhya Pradesh': { lat: 22.9734, lng: 78.6569, cities: ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur'] },
// //   'Chhattisgarh': { lat: 21.2787, lng: 81.8661, cities: ['Raipur', 'Bilaspur', 'Korba'] },
// //   'Bihar': { lat: 25.0961, lng: 85.3131, cities: ['Patna', 'Gaya', 'Muzaffarpur'] },
// //   'Jharkhand': { lat: 23.6102, lng: 85.2799, cities: ['Ranchi', 'Jamshedpur', 'Dhanbad'] },
// //   'West Bengal': { lat: 22.9868, lng: 87.8550, cities: ['Kolkata', 'Howrah', 'Durgapur'] },
// //   'Odisha': { lat: 20.9517, lng: 85.0985, cities: ['Bhubaneswar', 'Cuttack', 'Rourkela'] },
// //   'Andhra Pradesh': { lat: 15.9129, lng: 79.7400, cities: ['Visakhapatnam', 'Vijayawada', 'Guntur'] },
// //   'Telangana': { lat: 18.1124, lng: 79.0193, cities: ['Hyderabad', 'Warangal', 'Nizamabad'] },
// //   'Karnataka': { lat: 15.3173, lng: 75.7139, cities: ['Bangalore', 'Mysore', 'Hubli', 'Mangalore'] },
// //   'Tamil Nadu': { lat: 11.1271, lng: 78.6569, cities: ['Chennai', 'Coimbatore', 'Madurai', 'Salem'] },
// //   'Kerala': { lat: 10.8505, lng: 76.2711, cities: ['Thiruvananthapuram', 'Kochi', 'Kozhikode'] },
// //   'Goa': { lat: 15.2993, lng: 74.1240, cities: ['Panaji', 'Margao', 'Vasco da Gama'] },
// //   'Assam': { lat: 26.2006, lng: 92.9376, cities: ['Guwahati', 'Dibrugarh', 'Silchar'] },
// //   'Meghalaya': { lat: 25.4670, lng: 91.3662, cities: ['Shillong', 'Tura'] },
// //   'Manipur': { lat: 24.6637, lng: 93.9063, cities: ['Imphal'] },
// //   'Mizoram': { lat: 23.1645, lng: 92.9376, cities: ['Aizawl'] },
// //   'Tripura': { lat: 23.9408, lng: 91.9882, cities: ['Agartala'] },
// //   'Nagaland': { lat: 26.1584, lng: 94.5624, cities: ['Kohima', 'Dimapur'] },
// //   'Arunachal Pradesh': { lat: 28.2180, lng: 94.7278, cities: ['Itanagar'] },
// //   'Sikkim': { lat: 27.5330, lng: 88.5122, cities: ['Gangtok'] }
// // };

// // const mapTypes = [
// //   { id: 'unique-visitors', title: 'Unique Visitors', icon: Users, color: '#3B82F6' },
// //   { id: 'sessions', title: 'Sessions', icon: Eye, color: '#10B981' },
// //   { id: 'clicks', title: 'Clicks', icon: MousePointer, color: '#F59E0B' },
// //   { id: 'add-to-cart', title: 'Add to Cart', icon: ShoppingCart, color: '#EF4444' },
// //   { id: 'add-to-wishlist', title: 'Add to Wishlist', icon: Heart, color: '#EC4899' },
// //   { id: 'sales', title: 'Sales', icon: DollarSign, color: '#8B5CF6' },
// //   { id: 'visits', title: 'Visits', icon: MapPin, color: '#06B6D4' },
// //   { id: 'utm-sources', title: 'UTM Sources', icon: Share2, color: '#84CC16' }
// // ];

// // export default function IndiaMap({ activeMap, geoData, isLoading }: IndiaMapProps) {
// //   const currentMapType = mapTypes.find(map => map.id === activeMap);

// //   // Process geo data by state
// //   const stateData = Object.keys(INDIAN_STATES).map(stateName => {
// //     const stateItems = geoData.filter(item => 
// //       item.state === stateName || 
// //       item.state?.toLowerCase().includes(stateName.toLowerCase()) ||
// //       stateName.toLowerCase().includes(item.state?.toLowerCase() || '')
// //     );
// //     const totalCount = stateItems.reduce((sum, item) => sum + item.count, 0);

// //     const cities = INDIAN_STATES[stateName as keyof typeof INDIAN_STATES].cities.map(cityName => {
// //       const cityItem = stateItems.find(item => 
// //         item.city === cityName || 
// //         item.city?.toLowerCase().includes(cityName.toLowerCase()) ||
// //         cityName.toLowerCase().includes(item.city?.toLowerCase() || '')
// //       );
// //       return {
// //         name: cityName,
// //         count: cityItem?.count || 0,
// //         lat: 0,
// //         lng: 0
// //       };
// //     });

// //     return {
// //       state: stateName,
// //       cities,
// //       totalCount
// //     };
// //   });

// //   const maxCount = Math.max(...stateData.map(s => s.totalCount), 1);

// //   return (
// //     <div className="space-y-6">
// //       {/* Interactive India Map */}
// //       <Card className="bg-slate-800 border-slate-700">
// //         <CardHeader>
// //           <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
// //             <MapPin className="h-5 w-5" />
// //             India Distribution Map - {currentMapType?.title}
// //           </CardTitle>
// //         </CardHeader>
// //         <CardContent>
// //           <div className="relative bg-slate-900 rounded-lg p-6 min-h-[600px] border border-slate-700">
// //             {/* SVG India Map with accurate state boundaries */}
// //             <svg
// //               viewBox="0 0 1000 800"
// //               className="w-full h-full"
// //               style={{ maxHeight: '600px' }}
// //             >
// //               {/* India outline - more accurate shape */}
// //               <path
// //                 d="M200,150 L250,120 L300,110 L350,105 L400,100 L450,95 L500,90 L550,95 L600,100 L650,110 L700,120 L750,140 L780,160 L800,180 L820,220 L830,260 L840,300 L845,340 L850,380 L845,420 L840,460 L830,500 L820,540 L800,580 L780,620 L750,650 L700,680 L650,700 L600,710 L550,715 L500,720 L450,715 L400,710 L350,700 L300,680 L250,650 L200,620 L170,580 L150,540 L140,500 L130,460 L125,420 L120,380 L125,340 L130,300 L140,260 L150,220 L170,180 Z"
// //                 fill="#1e293b"
// //                 stroke="#475569"
// //                 strokeWidth="2"
// //               />

// //               {/* State representations with accurate positioning */}
// //               {stateData.map((state, index) => {
// //                 const stateInfo = INDIAN_STATES[state.state as keyof typeof INDIAN_STATES];
// //                 const intensity = state.totalCount / maxCount;
// //                 const opacity = Math.max(0.4, intensity);

// //                 // More accurate coordinate mapping for India
// //                 const x = 150 + (stateInfo.lng - 68) * 9.5;
// //                 const y = 700 - (stateInfo.lat - 6) * 18;

// //                 const radius = Math.max(6, Math.min(30, Math.sqrt(state.totalCount) * 2));

// //                 return (
// //                   <g key={state.state}>
// //                     {/* State circle with glow effect */}
// //                     <circle
// //                       cx={x}
// //                       cy={y}
// //                       r={radius + 2}
// //                       fill={currentMapType?.color}
// //                       opacity={0.2}
// //                       className="animate-pulse"
// //                     />
// //                     <circle
// //                       cx={x}
// //                       cy={y}
// //                       r={radius}
// //                       fill={currentMapType?.color}
// //                       opacity={opacity}
// //                       stroke="#ffffff"
// //                       strokeWidth="1.5"
// //                       className="hover:stroke-2 cursor-pointer transition-all hover:opacity-90"
// //                     />

// //                     {/* State label */}
// //                     <text
// //                       x={x}
// //                       y={y - radius - 8}
// //                       textAnchor="middle"
// //                       className="fill-white text-xs font-medium pointer-events-none"
// //                       style={{ fontSize: '9px' }}
// //                     >
// //                       {state.state.length > 15 ? state.state.substring(0, 12) + '...' : state.state}
// //                     </text>

// //                     {/* Count label */}
// //                     <text
// //                       x={x}
// //                       y={y + 3}
// //                       textAnchor="middle"
// //                       className="fill-white text-xs font-bold pointer-events-none"
// //                       style={{ fontSize: '8px' }}
// //                     >
// //                       {state.totalCount > 0 ? state.totalCount.toLocaleString() : ''}
// //                     </text>
// //                   </g>
// //                 );
// //               })}
// //             </svg>

// //             {/* Enhanced Legend */}
// //             <div className="absolute top-4 right-4 bg-slate-800/95 rounded-lg p-4 border border-slate-600 backdrop-blur-sm">
// //               <div className="text-sm text-slate-200 mb-3 font-semibold">Legend</div>
// //               <div className="space-y-2">
// //                 <div className="flex items-center gap-2 text-xs">
// //                   <div 
// //                     className="w-5 h-5 rounded-full border border-white" 
// //                     style={{ backgroundColor: currentMapType?.color, opacity: 0.9 }}
// //                   ></div>
// //                   <span className="text-slate-300">High Activity</span>
// //                 </div>
// //                 <div className="flex items-center gap-2 text-xs">
// //                   <div 
// //                     className="w-3 h-3 rounded-full border border-white" 
// //                     style={{ backgroundColor: currentMapType?.color, opacity: 0.4 }}
// //                   ></div>
// //                   <span className="text-slate-300">Low Activity</span>
// //                 </div>
// //               </div>
// //               <div className="mt-3 pt-3 border-t border-slate-600">
// //                 <div className="text-xs text-slate-400">
// //                   <div>Total: {geoData.reduce((sum, item) => sum + item.count, 0).toLocaleString()}</div>
// //                   <div className="mt-1">States: {stateData.filter(s => s.totalCount > 0).length}</div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Loading overlay */}
// //             {isLoading && (
// //               <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center rounded-lg">
// //                 <div className="text-white text-sm">Loading map data...</div>
// //               </div>
// //             )}
// //           </div>
// //         </CardContent>
// //       </Card>

// //       {/* Enhanced State-wise breakdown */}
// //       <Card className="bg-slate-800 border-slate-700">
// //         <CardHeader>
// //           <CardTitle className="text-lg font-semibold text-white">
// //             State & City Breakdown - {currentMapType?.title}
// //           </CardTitle>
// //         </CardHeader>
// //         <CardContent>
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// //             {stateData
// //               .filter(state => state.totalCount > 0)
// //               .sort((a, b) => b.totalCount - a.totalCount)
// //               .map((state) => (
// //                 <div key={state.state} className="bg-slate-700 rounded-lg p-4 border border-slate-600 hover:border-slate-500 transition-colors">
// //                   <div className="flex items-center justify-between mb-3">
// //                     <h4 className="font-semibold text-white text-sm">{state.state}</h4>
// //                     <span 
// //                       className="px-2 py-1 rounded text-xs font-medium text-white"
// //                       style={{ backgroundColor: currentMapType?.color }}
// //                     >
// //                       {state.totalCount.toLocaleString()}
// //                     </span>
// //                   </div>

// //                   <div className="space-y-1.5">
// //                     {state.cities
// //                       .filter(city => city.count > 0)
// //                       .sort((a, b) => b.count - a.count)
// //                       .slice(0, 4)
// //                       .map((city) => (
// //                         <div key={city.name} className="flex items-center justify-between text-xs">
// //                           <span className="text-slate-300 truncate">{city.name}</span>
// //                           <span className="text-white font-medium ml-2">{city.count.toLocaleString()}</span>
// //                         </div>
// //                       ))}
// //                     {state.cities.filter(city => city.count > 0).length === 0 && (
// //                       <div className="text-xs text-slate-400 italic">No city data available</div>
// //                     )}
// //                   </div>
// //                 </div>
// //               ))}
// //           </div>

// //           {stateData.filter(state => state.totalCount > 0).length === 0 && (
// //             <div className="text-center py-8 text-slate-400">
// //               <MapPin className="h-12 w-12 mx-auto mb-3 opacity-50" />
// //               <p>No geographical data available for the selected time period.</p>
// //             </div>
// //           )}
// //         </CardContent>
// //       </Card>
// //     </div>
// //   );
// // }

// "use client";

// import { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   MapPin,
//   Users,
//   MousePointer,
//   ShoppingCart,
//   Heart,
//   DollarSign,
//   Eye,
//   Share2,
// } from "lucide-react";

// interface StateData {
//   state: string;
//   cities: {
//     name: string;
//     count: number;
//     lat: number;
//     lng: number;
//   }[];
//   totalCount: number;
// }

// interface IndiaMapProps {
//   activeMap: string;
//   geoData: any[];
//   isLoading: boolean;
// }

// // Indian states with their coordinates and major cities - accurate positioning
// const INDIAN_STATES = {
//   "Jammu and Kashmir": { lat: 34.0837, lng: 74.7973, cities: ["Srinagar", "Jammu", "Leh"] },
//   "Himachal Pradesh": { lat: 31.1048, lng: 77.1734, cities: ["Shimla", "Dharamshala", "Manali"] },
//   "Punjab": { lat: 31.1471, lng: 75.3412, cities: ["Amritsar", "Ludhiana", "Jalandhar", "Patiala"] },
//   "Haryana": { lat: 29.0588, lng: 76.0856, cities: ["Chandigarh", "Gurgaon", "Faridabad"] },
//   "Delhi": { lat: 28.7041, lng: 77.1025, cities: ["New Delhi", "Delhi"] },
//   "Uttar Pradesh": { lat: 26.8467, lng: 80.9462, cities: ["Lucknow", "Kanpur", "Agra", "Varanasi", "Noida"] },
//   "Uttarakhand": { lat: 30.0668, lng: 79.0193, cities: ["Dehradun", "Haridwar", "Nainital"] },
//   "Rajasthan": { lat: 27.0238, lng: 74.2179, cities: ["Jaipur", "Jodhpur", "Udaipur", "Kota"] },
//   "Gujarat": { lat: 23.0225, lng: 72.5714, cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"] },
//   "Maharashtra": { lat: 19.7515, lng: 75.7139, cities: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"] },
//   "Madhya Pradesh": { lat: 22.9734, lng: 78.6569, cities: ["Bhopal", "Indore", "Gwalior", "Jabalpur"] },
//   "Chhattisgarh": { lat: 21.2787, lng: 81.8661, cities: ["Raipur", "Bilaspur", "Korba"] },
//   "Bihar": { lat: 25.0961, lng: 85.3131, cities: ["Patna", "Gaya", "Muzaffarpur"] },
//   "Jharkhand": { lat: 23.6102, lng: 85.2799, cities: ["Ranchi", "Jamshedpur", "Dhanbad"] },
//   "West Bengal": { lat: 22.9868, lng: 87.8550, cities: ["Kolkata", "Howrah", "Durgapur"] },
//   "Odisha": { lat: 20.9517, lng: 85.0985, cities: ["Bhubaneswar", "Cuttack", "Rourkela"] },
//   "Andhra Pradesh": { lat: 15.9129, lng: 79.7400, cities: ["Visakhapatnam", "Vijayawada", "Guntur"] },
//   "Telangana": { lat: 18.1124, lng: 79.0193, cities: ["Hyderabad", "Warangal", "Nizamabad"] },
//   "Karnataka": { lat: 15.3173, lng: 75.7139, cities: ["Bangalore", "Mysore", "Hubli", "Mangalore"] },
//   "Tamil Nadu": { lat: 11.1271, lng: 78.6569, cities: ["Chennai", "Coimbatore", "Madurai", "Salem"] },
//   "Kerala": { lat: 10.8505, lng: 76.2711, cities: ["Thiruvananthapuram", "Kochi", "Kozhikode"] },
//   "Goa": { lat: 15.2993, lng: 74.1240, cities: ["Panaji", "Margao", "Vasco da Gama"] },
//   "Assam": { lat: 26.2006, lng: 92.9376, cities: ["Guwahati", "Dibrugarh", "Silchar"] },
//   "Meghalaya": { lat: 25.4670, lng: 91.3662, cities: ["Shillong", "Tura"] },
//   "Manipur": { lat: 24.6637, lng: 93.9063, cities: ["Imphal"] },
//   "Mizoram": { lat: 23.1645, lng: 92.9376, cities: ["Aizawl"] },
//   "Tripura": { lat: 23.9408, lng: 91.9882, cities: ["Agartala"] },
//   "Nagaland": { lat: 26.1584, lng: 94.5624, cities: ["Kohima", "Dimapur"] },
//   "Arunachal Pradesh": { lat: 28.2180, lng: 94.7278, cities: ["Itanagar"] },
//   "Sikkim": { lat: 27.5330, lng: 88.5122, cities: ["Gangtok"] },
// };

// const mapTypes = [
//   { id: "unique-visitors", title: "Unique Visitors", icon: Users, color: "#3B82F6" },
//   { id: "sessions", title: "Sessions", icon: Eye, color: "#10B981" },
//   { id: "clicks", title: "Clicks", icon: MousePointer, color: "#F59E0B" },
//   { id: "add-to-cart", title: "Add to Cart", icon: ShoppingCart, color: "#EF4444" },
//   { id: "add-to-wishlist", title: "Add to Wishlist", icon: Heart, color: "#EC4899" },
//   { id: "sales", title: "Sales", icon: DollarSign, color: "#8B5CF6" },
//   { id: "visits", title: "Visits", icon: MapPin, color: "#06B6D4" },
//   { id: "utm-sources", title: "UTM Sources", icon: Share2, color: "#84CC16" },
// ];

// export default function IndiaMap({ activeMap, geoData, isLoading }: IndiaMapProps) {
//   const currentMapType = mapTypes.find((map) => map.id === activeMap);

//   // Process geo data by state
//   const stateData = Object.keys(INDIAN_STATES).map((stateName) => {
//     const stateItems = geoData.filter(
//       (item) =>
//         item.state === stateName ||
//         item.state?.toLowerCase().includes(stateName.toLowerCase()) ||
//         stateName.toLowerCase().includes(item.state?.toLowerCase() || "")
//     );
//     const totalCount = stateItems.reduce((sum, item) => sum + item.count, 0);

//     const cities = INDIAN_STATES[stateName as keyof typeof INDIAN_STATES].cities.map((cityName) => {
//       const cityItem = stateItems.find(
//         (item) =>
//           item.city === cityName ||
//           item.city?.toLowerCase().includes(cityName.toLowerCase()) ||
//           cityName.toLowerCase().includes(item.city?.toLowerCase() || "")
//       );
//       return {
//         name: cityName,
//         count: cityItem?.count || 0,
//         lat: 0,
//         lng: 0,
//       };
//     });

//     return {
//       state: stateName,
//       cities,
//       totalCount,
//     };
//   });

//   const maxCount = Math.max(...stateData.map((s) => s.totalCount), 1);

//   return (
//     <div className="space-y-6">
//       {/* Interactive India Map */}
//       <Card className="bg-slate-800 border-slate-700">
//         <CardHeader>
//           <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
//             <MapPin className="h-5 w-5" />
//             India Distribution Map - {currentMapType?.title}
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="relative bg-slate-900 rounded-lg p-6 min-h-[600px] border border-slate-700">
//             {/* SVG India Map with more accurate state boundaries */}
//             <svg viewBox="0 0 1000 800" className="w-full h-full" style={{ maxHeight: "600px" }}>
//               {/* Improved India outline - approximates real shape */}
//               <path
//                 d="M150,100 L200,80 Q250,60,300,70 L350,80 Q400,90,450,100 L500,110 Q550,120,600,130 L650,140 Q700,150,750,160 L800,180 Q850,200,870,250 L880,300 Q890,350,900,400 L900,450 Q890,500,880,550 L870,600 Q850,650,800,680 L750,700 Q700,720,650,730 L600,740 Q550,750,500,750 L450,740 Q400,730,350,720 L300,710 Q250,700,200,690 L150,670 Q100,650,80,600 L70,550 Q60,500,50,450 L50,400 Q60,350,70,300 L80,250 Q100,200,150,150 Z"
//                 fill="#1e293b"
//                 stroke="#475569"
//                 strokeWidth="2"
//               />

//               {/* State representations with adjusted positioning */}
//               {stateData.map((state, index) => {
//                 const stateInfo = INDIAN_STATES[state.state as keyof typeof INDIAN_STATES];
//                 const intensity = state.totalCount / maxCount;
//                 const opacity = Math.max(0.4, intensity);

//                 // Adjusted coordinate mapping for better India shape alignment
//                 const x = 100 + (stateInfo.lng - 68) * 10; // Adjusted scaling for longitude
//                 const y = 750 - (stateInfo.lat - 6) * 15; // Adjusted scaling for latitude

//                 const radius = Math.max(6, Math.min(30, Math.sqrt(state.totalCount) * 2));

//                 return (
//                   <g key={state.state}>
//                     {/* State circle with glow effect */}
//                     <circle
//                       cx={x}
//                       cy={y}
//                       r={radius + 2}
//                       fill={currentMapType?.color}
//                       opacity={0.2}
//                       className="animate-pulse"
//                     />
//                     <circle
//                       cx={x}
//                       cy={y}
//                       r={radius}
//                       fill={currentMapType?.color}
//                       opacity={opacity}
//                       stroke="#ffffff"
//                       strokeWidth="1.5"
//                       className="hover:stroke-2 cursor-pointer transition-all hover:opacity-90"
//                     />

//                     {/* State label */}
//                     <text
//                       x={x}
//                       y={y - radius - 8}
//                       textAnchor="middle"
//                       className="fill-white text-xs font-medium pointer-events-none"
//                       style={{ fontSize: "9px" }}
//                     >
//                       {state.state.length > 15
//                         ? state.state.substring(0, 12) + "..."
//                         : state.state}
//                     </text>

//                     {/* Count label */}
//                     <text
//                       x={x}
//                       y={y + 3}
//                       textAnchor="middle"
//                       className="fill-white text-xs font-bold pointer-events-none"
//                       style={{ fontSize: "8px" }}
//                     >
//                       {state.totalCount > 0 ? state.totalCount.toLocaleString() : ""}
//                     </text>
//                   </g>
//                 );
//               })}
//             </svg>

//             {/* Enhanced Legend */}
//             <div className="absolute top-4 right-4 bg-slate-800/95 rounded-lg p-4 border border-slate-600 backdrop-blur-sm">
//               <div className="text-sm text-slate-200 mb-3 font-semibold">Legend</div>
//               <div className="space-y-2">
//                 <div className="flex items-center gap-2 text-xs">
//                   <div
//                     className="w-5 h-5 rounded-full border border-white"
//                     style={{ backgroundColor: currentMapType?.color, opacity: 0.9 }}
//                   ></div>
//                   <span className="text-slate-300">High Activity</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-xs">
//                   <div
//                     className="w-3 h-3 rounded-full border border-white"
//                     style={{ backgroundColor: currentMapType?.color, opacity: 0.4 }}
//                   ></div>
//                   <span className="text-slate-300">Low Activity</span>
//                 </div>
//               </div>
//               <div className="mt-3 pt-3 border-t border-slate-600">
//                 <div className="text-xs text-slate-400">
//                   <div>
//                     Total: {geoData.reduce((sum, item) => sum + item.count, 0).toLocaleString()}
//                   </div>
//                   <div className="mt-1">
//                     States: {stateData.filter((s) => s.totalCount > 0).length}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Loading overlay */}
//             {isLoading && (
//               <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center rounded-lg">
//                 <div className="text-white text-sm">Loading map data...</div>
//               </div>
//             )}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Enhanced State-wise breakdown */}
//       <Card className="bg-slate-800 border-slate-700">
//         <CardHeader>
//           <CardTitle className="text-lg font-semibold text-white">
//             State & City Breakdown - {currentMapType?.title}
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//             {stateData
//               .filter((state) => state.totalCount > 0)
//               .sort((a, b) => b.totalCount - a.totalCount)
//               .map((state) => (
//                 <div
//                   key={state.state}
//                   className="bg-slate-700 rounded-lg p-4 border border-slate-600 hover:border-slate-500 transition-colors"
//                 >
//                   <div className="flex items-center justify-between mb-3">
//                     <h4 className="font-semibold text-white text-sm">{state.state}</h4>
//                     <span
//                       className="px-2 py-1 rounded text-xs font-medium text-white"
//                       style={{ backgroundColor: currentMapType?.color }}
//                     >
//                       {state.totalCount.toLocaleString()}
//                     </span>
//                   </div>

//                   <div className="space-y-1.5">
//                     {state.cities
//                       .filter((city) => city.count > 0)
//                       .sort((a, b) => b.count - a.count)
//                       .slice(0, 4)
//                       .map((city) => (
//                         <div key={city.name} className="flex items-center justify-between text-xs">
//                           <span className="text-slate-300 truncate">{city.name}</span>
//                           <span className="text-white font-medium ml-2">
//                             {city.count.toLocaleString()}
//                           </span>
//                         </div>
//                       ))}
//                     {state.cities.filter((city) => city.count > 0).length === 0 && (
//                       <div className="text-xs text-slate-400 italic">No city data available</div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//           </div>

//           {stateData.filter((state) => state.totalCount > 0).length === 0 && (
//             <div className="text-center py-8 text-slate-400">
//               <MapPin className="h-12 w-12 mx-auto mb-3 opacity-50" />
//               <p>No geographical data available for the selected time period.</p>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
}

// Indian states with their coordinates and major cities
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

export default function IndiaMap({ activeMap, geoData, isLoading }: IndiaMapProps) {
  const currentMapType = mapTypes.find((map) => map.id === activeMap);

  // Process geo data by state
  const stateData = Object.keys(INDIAN_STATES).map((stateName) => {
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
        lat: 0,
        lng: 0,
      };
    });

    return {
      state: stateName,
      cities,
      totalCount,
    };
  });

  const maxCount = Math.max(...stateData.map((s) => s.totalCount), 1);

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
            {/* SVG India Map with more accurate boundaries */}
            <svg viewBox="0 0 1000 1000" className="w-full h-full" style={{ maxHeight: "600px" }}>
              {/* More accurate India outline */}
              <path
                d="M100,200 L150,150 Q200,120,250,130 L300,140 Q350,150,400,160 L450,170 Q500,180,550,190 L600,200 Q650,210,700,220 L750,230 Q800,240,850,260 L900,300 Q920,350,930,400 L940,450 Q950,500,960,550 L970,600 Q960,650,950,700 L930,750 Q900,800,850,820 L800,840 Q750,860,700,870 L650,880 Q600,890,550,900 L500,910 Q450,900,400,890 L350,880 Q300,870,250,860 L200,850 Q150,840,100,820 L50,780 Q20,740,10,700 L0,650 Q10,600,20,550 L30,500 Q40,450,50,400 L60,350 Q80,300,100,250 Z"
                fill="#1e293b"
                stroke="#475569"
                strokeWidth="2"
              />

              {/* State representations with refined positioning */}
              {stateData.map((state, index) => {
                const stateInfo = INDIAN_STATES[state.state as keyof typeof INDIAN_STATES];
                const intensity = state.totalCount / maxCount;
                const opacity = Math.max(0.4, intensity);

                // Refined coordinate mapping for India's shape
                const lngRange = 97 - 68; // 68°E to 97°E
                const latRange = 37 - 6; // 6°N to 37°N
                const x = 50 + ((stateInfo.lng - 68) / lngRange) * 900; // Scale to SVG width (1000)
                const y = 950 - ((stateInfo.lat - 6) / latRange) * 900; // Invert and scale to SVG height (1000)

                const radius = Math.max(6, Math.min(30, Math.sqrt(state.totalCount) * 2));

                return (
                  <g key={state.state}>
                    {/* State circle with glow effect */}
                    <circle
                      cx={x}
                      cy={y}
                      r={radius + 2}
                      fill={currentMapType?.color}
                      opacity={0.2}
                      className="animate-pulse"
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r={radius}
                      fill={currentMapType?.color}
                      opacity={opacity}
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      className="hover:stroke-2 cursor-pointer transition-all hover:opacity-90"
                    />

                    {/* State label */}
                    <text
                      x={x}
                      y={y - radius - 8}
                      textAnchor="middle"
                      className="fill-white text-xs font-medium pointer-events-none"
                      style={{ fontSize: "9px" }}
                    >
                      {state.state.length > 15
                        ? state.state.substring(0, 12) + "..."
                        : state.state}
                    </text>

                    {/* Count label */}
                    <text
                      x={x}
                      y={y + 3}
                      textAnchor="middle"
                      className="fill-white text-xs font-bold pointer-events-none"
                      style={{ fontSize: "8px" }}
                    >
                      {state.totalCount > 0 ? state.totalCount.toLocaleString() : ""}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Enhanced Legend */}
            <div className="absolute top-4 right-4 bg-slate-800/95 rounded-lg p-4 border border-slate-600 backdrop-blur-sm">
              <div className="text-sm text-slate-200 mb-3 font-semibold">Legend</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <div
                    className="w-5 h-5 rounded-full border border-white"
                    style={{ backgroundColor: currentMapType?.color, opacity: 0.9 }}
                  ></div>
                  <span className="text-slate-300">High Activity</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div
                    className="w-3 h-3 rounded-full border border-white"
                    style={{ backgroundColor: currentMapType?.color, opacity: 0.4 }}
                  ></div>
                  <span className="text-slate-300">Low Activity</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-600">
                <div className="text-xs text-slate-400">
                  <div>
                    Total: {geoData.reduce((sum, item) => sum + item.count, 0).toLocaleString()}
                  </div>
                  <div className="mt-1">
                    States: {stateData.filter((s) => s.totalCount > 0).length}
                  </div>
                </div>
              </div>
            </div>

            {/* Loading overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center rounded-lg">
                <div className="text-white text-sm">Loading map data...</div>
              </div>
            )}
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
                          <span className="text-white font-medium ml-2">
                            {city.count.toLocaleString()}
                          </span>
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