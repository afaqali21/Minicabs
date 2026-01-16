'use client'
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Next.js/Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Define blue icon for pickup (#193d89 equivalent)
const blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Define green icon for destination (#7bc010 equivalent)
const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Define black icon for stops
const blackIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to update map view bounds based on markers/route
const MapUpdater = ({ bounds }) => {
    const map = useMap();
    useEffect(() => {
        if (bounds) {
             try {
                // Determine responsive left padding based on the form position
                const isDesktop = typeof window !== 'undefined' && window.innerWidth > 768;
                const leftOffset = isDesktop ? 500 : 70; // 500px offset to right of the floating form
                
                map.fitBounds(bounds, { 
                    paddingTopLeft: [leftOffset, 70], 
                    paddingBottomRight: [70, 70], 
                    maxZoom: 16 
                });
            } catch (e) {
                console.warn("Invalid bounds pass to map:", e);
            }
        }
    }, [bounds, map]);
    return null;
};

const MapComponent = ({ pickup, destination, stops = [], height }) => {
    const [pickupCoords, setPickupCoords] = useState(null);
    const [destCoords, setDestCoords] = useState(null);
    const [stopsCoords, setStopsCoords] = useState([]);
    const [routePath, setRoutePath] = useState(null);
    const [bounds, setBounds] = useState(null);
    const [status, setStatus] = useState(''); // 'searching', 'found', 'error', 'idle'

    // Geocoding function
    const geocodeAddress = async (address) => {
        if (!address) return null;
        try {
            console.log(`Geocoding: ${address}`);
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`);
            const data = await response.json();
            if (data && data.length > 0) {
                console.log(`Found: ${address} -> ${data[0].lat}, ${data[0].lon}`);
                return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
            } else {
                console.warn(`Address not found: ${address}`);
            }
        } catch (err) {
            console.error("Geocoding error:", err);
        }
        return null;
    };

    // Update coordinates when props change
    useEffect(() => {
        const updateMap = async () => {
            if (!pickup && !destination) {
                setStatus('idle');
                return;
            }

            setStatus('searching');
            const pCoords = await geocodeAddress(pickup);
            const dCoords = await geocodeAddress(destination);
            
            // Geocode all stops
            const sCoords = await Promise.all(
                stops.map(stop => geocodeAddress(stop))
            );
            const validStops = sCoords.filter(c => c !== null);

            setPickupCoords(pCoords);
            setDestCoords(dCoords);
            setStopsCoords(validStops);

            // Logic to determine status
            if ((pickup && !pCoords) || (destination && !dCoords)) {
                setStatus('error'); // Partial failure
            } else {
                setStatus('found');
            }

            // If we have both primary points, calculate route
            if (pCoords && dCoords) {
                try {
                    // Build waypoint string for OSRM: pickup;stop1;stop2;...;destination
                    const allPoints = [pCoords, ...validStops, dCoords];
                    const waypointStr = allPoints.map(p => `${p[1]},${p[0]}`).join(';');
                    
                    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${waypointStr}?overview=full&geometries=geojson`;
                    const response = await fetch(osrmUrl);
                    const data = await response.json();

                    if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
                        const coordinates = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]); // Flip to [lat, lng]
                        setRoutePath(coordinates);
                        
                        // Create bounds to include all points
                        const group = new L.LatLngBounds(allPoints);
                        setBounds(group);
                    }
                } catch (err) {
                    console.error("Routing error:", err);
                     const group = new L.LatLngBounds([pCoords, ...validStops, dCoords]);
                     setBounds(group);
                }
            } else if (pCoords) {
                const group = new L.LatLngBounds([pCoords, ...validStops]);
                setBounds(group);
                setRoutePath(null);
            } else if (dCoords) {
                const group = new L.LatLngBounds([...validStops, dCoords]);
                setBounds(group);
                setRoutePath(null);
            } else if (validStops.length > 0) {
                const group = new L.LatLngBounds(validStops);
                setBounds(group);
                setRoutePath(null);
            }
        };

        const timeoutId = setTimeout(() => {
            updateMap();
        }, 1000); // Debounce

        return () => clearTimeout(timeoutId);

    }, [pickup, destination, stops]);

    // Default center (London)
    const defaultCenter = [51.505, -0.09];

    return (
        <div style={{ position: 'relative', height: height || '300px' }}>
            {status === 'searching' && (
                <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1000, background: 'rgba(255,255,255,0.8)', padding: '5px', borderRadius: '4px', fontSize: '12px' }}>
                    Searching location...
                </div>
            )}
             {status === 'error' && (
                <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1000, background: 'rgba(255,200,200,0.9)', padding: '5px', borderRadius: '4px', fontSize: '12px', color: 'red' }}>
                    Location not found. Try a more specific address.
                </div>
            )}

            <MapContainer 
                center={defaultCenter} 
                zoom={11} 
                style={{ height: height || '300px', width: '100%' }}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {pickupCoords && (
                    <Marker position={pickupCoords} icon={blueIcon}>
                        <Popup>Pickup: {pickup}</Popup>
                    </Marker>
                )}

                {destCoords && (
                    <Marker position={destCoords} icon={greenIcon}>
                        <Popup>Destination: {destination}</Popup>
                    </Marker>
                )}

                {stopsCoords.map((coord, index) => (
                    <Marker key={index} position={coord} icon={blackIcon}>
                        <Popup>Stop {index + 1}</Popup>
                    </Marker>
                ))}

                {routePath && <Polyline positions={routePath} color="blue" />}
                
                {bounds && <MapUpdater bounds={bounds} />}
            </MapContainer>
        </div>
    );
};

export default MapComponent;
