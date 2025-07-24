
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from './ui/button';
import { toast } from '@/hooks/use-toast';
import { Input } from './ui/input';
import { Search, Loader2 } from 'lucide-react';
import { debounce } from 'lodash';

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
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

    const updateMarkerAndPosition = (latlng: { lat: number; lng: number }, newAddress: string) => {
        const map = mapRef.current;
        if (!map) return;
        
        setPosition(latlng);
        setAddress(newAddress);
        setSearchQuery(newAddress); // Update input field with selected address
        setSuggestions([]); // Hide suggestions

        if (markerRef.current) {
            markerRef.current.setLatLng(latlng);
        } else {
            markerRef.current = L.marker(latlng).addTo(map);
        }
        map.flyTo(latlng, 16); // Zoom in closer on selection
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
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSearch = useCallback(
        debounce(async (query) => {
            if (query.length < 3) {
                setSuggestions([]);
                setIsLoadingSuggestions(false);
                return;
            }
            setIsLoadingSuggestions(true);
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&countrycodes=in&addressdetails=1`);
                if (!response.ok) throw new Error("Network response was not ok.");
                const data = await response.json();
                setSuggestions(data);
            } catch (error) {
                console.error("Geocoding search error:", error);
                setSuggestions([]);
            } finally {
                setIsLoadingSuggestions(false);
            }
        }, 500),
        []
    );
    
    useEffect(() => {
        debouncedSearch(searchQuery);
    }, [searchQuery, debouncedSearch]);


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
            <div className="relative p-2 border-b">
                <Input 
                    placeholder="Search for a city, street, or landmark..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                />
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                 {isLoadingSuggestions && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground"/>}
                 {suggestions.length > 0 && (
                    <div className="absolute top-full left-0 w-full bg-card border shadow-lg rounded-b-md z-[1000]">
                        <ul>
                            {suggestions.map((s) => (
                                <li 
                                    key={s.place_id} 
                                    onClick={() => updateMarkerAndPosition({ lat: parseFloat(s.lat), lng: parseFloat(s.lon) }, s.display_name)}
                                    className="p-2 text-sm cursor-pointer hover:bg-muted"
                                >
                                    {s.display_name}
                                </li>
                            ))}
                        </ul>
                    </div>
                 )}
            </div>
            <div ref={mapContainerRef} className="flex-grow h-[calc(100%-8rem)] w-full" id="map"></div>
            <div className="p-4 bg-muted/50 rounded-b-md">
                <p className="text-sm font-medium">Selected Address:</p>
                <p className="text-xs text-muted-foreground min-h-[2.5rem] line-clamp-2">{address || "Click on the map or use search to set a location."}</p>
                 <Button onClick={handleConfirm} disabled={!position || !address} className="w-full mt-2">
                    Confirm Location
                </Button>
            </div>
        </div>
    );
};

export default LocationPicker;
