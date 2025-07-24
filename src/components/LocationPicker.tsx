
"use client";

import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from './ui/button';
import { toast } from '@/hooks/use-toast';

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

    // Reverse geocode to get address from coordinates
    const reverseGeocode = async (latlng: { lat: number; lng: number }) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`);
            if (!response.ok) throw new Error('Failed to fetch address');
            const data = await response.json();
            setAddress(data.display_name || 'Address not found');
        } catch (error) {
            setAddress('Could not fetch address');
            console.error("Reverse geocoding error:", error);
            toast({ title: "Error", description: "Could not fetch address details.", variant: "destructive" });
        }
    };

    // Initialize the map
    useEffect(() => {
        if (mapContainerRef.current && !mapRef.current) { // Only initialize if it doesn't exist
            const map = L.map(mapContainerRef.current).setView([20.5937, 78.9629], 5);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            map.on('click', (e) => {
                const { lat, lng } = e.latlng;
                setPosition({ lat, lng });
                reverseGeocode({ lat, lng });
                
                if (markerRef.current) {
                    markerRef.current.setLatLng(e.latlng);
                } else {
                    markerRef.current = L.marker(e.latlng).addTo(map);
                }
                map.flyTo(e.latlng, map.getZoom());
            });

            mapRef.current = map;
        }

        // Cleanup function: this is crucial
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []); // Empty dependency array ensures this runs only once on mount

    // Confirm button handler
    const handleConfirm = () => {
        if (position && address) {
            onLocationSelect(position, address);
        } else {
            toast({ title: "Error", description: "Please select a location on the map first.", variant: "destructive" });
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div ref={mapContainerRef} className="flex-grow h-[calc(100%-8rem)] w-full" id="map"></div>
            <div className="p-4 bg-muted/50 rounded-b-md">
                <p className="text-sm font-medium">Selected Address:</p>
                <p className="text-xs text-muted-foreground min-h-[2.5rem]">{address || "Click on the map to set a location."}</p>
                 <Button onClick={handleConfirm} disabled={!position || !address} className="w-full mt-2">
                    Confirm Location
                </Button>
            </div>
        </div>
    );
};

export default LocationPicker;
