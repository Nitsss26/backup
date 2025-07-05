// src/lib/geoLookup.ts
interface GeoData {
    country: string;
    lat: number;
    lng: number;
  }
  
  const countryGeoMap: Record<string, { lat: number; lng: number }> = {
    India: { lat: 20.5937, lng: 78.9629 },
    USA: { lat: 37.0902, lng: -95.7129 },
    // Add more countries as needed
  };
  
  export function getGeoCoordinates(country: string): { lat: number; lng: number } {
    return countryGeoMap[country] || { lat: 0, lng: 0 };
  }