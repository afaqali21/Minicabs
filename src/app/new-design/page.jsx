'use client'
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import FloatingBookingEngine from '../component/FloatingBookingEngine';

// Dynamically import MapComponent to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import('../component/MapComponent'), {
    ssr: false,
    loading: () => <div className="h-screen w-full bg-gray-200 animate-pulse flex items-center justify-center">Loading Map...</div>
});

export default function NewDesign() {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [stops, setStops] = useState([]); // Array of stop addresses

  return (
    <main className="h-screen w-full relative overflow-hidden bg-gray-100">
        <div className="absolute inset-0 z-0">
             <MapComponent 
                pickup={pickup} 
                destination={destination} 
                stops={stops}
                height="100vh"
             />
        </div>
        
        <div className="absolute top-[50px] md:top-20 left-4 md:left-12 z-10 w-full md:w-auto max-w-[calc(100vw-2rem)] md:max-w-md">
             <FloatingBookingEngine 
                pickup={pickup} 
                setPickup={setPickup} 
                destination={destination} 
                setDestination={setDestination} 
                stops={stops}
                setStops={setStops}
             />
        </div>
    </main>
  )
}
