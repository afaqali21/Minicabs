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

  return (
    <main className="min-h-screen relative">
        {/* Background Map - Full Screen */}
        <div className="absolute inset-0 z-0">
             <MapComponent 
                pickup={pickup} 
                destination={destination} 
                height="100vh"
             />
             {/* MapComponent style prop is inline, so we might need to wrap it or adjust MapComponent to accept style.
                 Actually MapComponent has style={{ height: '300px', width: '100%' }}. 
                 Wait, we need full screen map. MapComponent hardcodes 300px.
                 
                 Plan B: We might need to make MapComponent accept a `className` or `style` prop, 
                 OR use a wrapper with `!important` CSS, but hardcoded inline style is stronger than class.
                 
                 Let's check MapComponent again. It has `style={{ height: '300px', ... }}`.
                 I should probably modify MapComponent to accept a `height` prop or use `h-full`.
                 For now, I will modify MapComponent to accept `height` or `style`.
              */}
        </div>
        
        {/* Floating Form - Absolute Positioned */}
        <div className="absolute top-24 left-4 md:left-12 z-10 w-full md:w-100%">
             <FloatingBookingEngine 
                pickup={pickup} 
                setPickup={setPickup} 
                destination={destination} 
                setDestination={setDestination} 
             />
        </div>
    </main>
  )
}
