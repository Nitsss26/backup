
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Button } from './ui/button';
import { toast } from '@/hooks/use-toast';

// Fix for default marker icon issue with Webpack
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.imagePath = "/"; // Explicitly set path
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface LocationPickerProps {
    onLocationSelect: (latlng: { lat: number; lng: number }, address: string) => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationSelect }) => {
    const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
    const [address, setAddress] = useState<string>('');
    const mapRef = useRef<L.Map | null>(null);

    // This component handles map events and updates the state
    const LocationEvents = () => {
        useMapEvents({
            click(e) {
                setPosition(e.latlng);
                reverseGeocode(e.latlng);
                mapRef.current?.flyTo(e.latlng, mapRef.current.getZoom());
            },
        });
        return null;
    };
    
    // Reverse geocode to get address from coordinates
    const reverseGeocode = async (latlng: { lat: number; lng: number }) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`);
            const data = await response.json();
            setAddress(data.display_name || 'Address not found');
        } catch (error) {
            setAddress('Could not fetch address');
            console.error("Reverse geocoding error:", error);
        }
    };
    
    // Confirm button handler
    const handleConfirm = () => {
        if (position && address) {
            onLocationSelect(position, address);
        } else {
            toast({ title: "Error", description: "Please select a location on the map first.", variant: "destructive" });
        }
    };

    // Correctly manage map instance lifecycle
    useEffect(() => {
        const map = mapRef.current;
        // This cleanup function will run when the component unmounts
        return () => {
            if (map) {
                map.remove(); // This is the crucial step to prevent the error
                mapRef.current = null;
            }
        };
    }, []); // Empty dependency array ensures this runs only on mount and unmount


    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow h-[calc(100%-8rem)]">
                {typeof window !== 'undefined' && (
                    <MapContainer
                        center={[20.5937, 78.9629]} // Default to India
                        zoom={5}
                        style={{ height: '100%', width: '100%' }}
                        whenCreated={(mapInstance) => { mapRef.current = mapInstance; }} // Store map instance
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <LocationEvents />
                        {position && <Marker position={position}></Marker>}
                    </MapContainer>
                )}
            </div>
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
