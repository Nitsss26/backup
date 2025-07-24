
"use client";

import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from './ui/button';
import { toast } from '@/hooks/use-toast';
import { Input } from './ui/input';
import { Search } from 'lucide-react';

// Fix for default marker icon issue with Webpack
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.imagePath = "/";
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface LocationPickerProps {
    onLocationSelect: (latlng: { lat: number; lng: number }, address: string) => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationSelect }) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<L.Map | null>(null);
    const markerRef = useRef<L.Marker | null>(null);
    
    const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
    const [address, setAddress] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState('');

    const updateMarkerAndPosition = (latlng: { lat: number; lng: number }, newAddress: string) => {
        const map = mapRef.current;
        if (!map) return;
        
        setPosition(latlng);
        setAddress(newAddress);

        if (markerRef.current) {
            markerRef.current.setLatLng(latlng);
        } else {
            markerRef.current = L.marker(latlng).addTo(map);
        }
        map.flyTo(latlng, 15); // Zoom in on the selected location
    };

    const reverseGeocode = async (latlng: { lat: number; lng: number }) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}&addressdetails=1`);
            if (!response.ok) throw new Error('Failed to fetch address');
            const data = await response.json();
            updateMarkerAndPosition(latlng, data.display_name || 'Address not found');
        } catch (error) {
            console.error("Reverse geocoding error:", error);
            setAddress('Could not fetch address details.');
            toast({ title: "Error", description: "Could not fetch address details for the clicked point.", variant: "destructive" });
        }
    };
    
    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1&countrycodes=in`);
            if (!response.ok) throw new Error("Network response was not ok.");
            const data = await response.json();

            if (data.length > 0) {
                const { lat, lon, display_name } = data[0];
                const newPosition = { lat: parseFloat(lat), lng: parseFloat(lon) };
                updateMarkerAndPosition(newPosition, display_name);
            } else {
                toast({ title: "Not Found", description: "Could not find the location. Please try being more specific.", variant: "destructive" });
            }
        } catch (error) {
            console.error("Geocoding search error:", error);
            toast({ title: "Error", description: "Failed to search for location.", variant: "destructive" });
        }
    };

    useEffect(() => {
        if (mapContainerRef.current && !mapRef.current) {
            const map = L.map(mapContainerRef.current).setView([20.5937, 78.9629], 5);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            map.on('click', (e) => reverseGeocode(e.latlng));

            mapRef.current = map;
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    const handleConfirm = () => {
        if (position && address) {
            onLocationSelect(position, address);
        } else {
            toast({ title: "Error", description: "Please select a location on the map first.", variant: "destructive" });
        }
    };

    return (
        <div className="flex flex-col h-full">
            <form onSubmit={handleSearch} className="flex gap-2 p-2 border-b">
                <Input 
                    placeholder="Search for a city, street, or landmark..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" size="icon" variant="outline">
                    <Search className="h-4 w-4"/>
                </Button>
            </form>
            <div ref={mapContainerRef} className="flex-grow h-[calc(100%-8rem)] w-full" id="map"></div>
            <div className="p-4 bg-muted/50 rounded-b-md">
                <p className="text-sm font-medium">Selected Address:</p>
                <p className="text-xs text-muted-foreground min-h-[2.5rem]">{address || "Click on the map or use search to set a location."}</p>
                 <Button onClick={handleConfirm} disabled={!position || !address} className="w-full mt-2">
                    Confirm Location
                </Button>
            </div>
        </div>
    );
};

export default LocationPicker;
