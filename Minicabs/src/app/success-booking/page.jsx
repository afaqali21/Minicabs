'use client'
import React, { useState } from 'react';
import VehicleDetails from '../component/vehicle-detail-sucess';
import BookingDetails from '../component/booking-detail-success';
import JourneyPS from '../component/journeyPS-success';
import SidebarSuccess from '../component/sidebar-success';

const Successbooking = () => {
  return (
    <div>
      <main className=" min-h-screen">
        <div className='simple-boking'>
          <div className=' relative container mx-auto'>
            <div className="absolute top-28 left-5 mx-7">
              <h2 className="text-4xl text-white">Book a Ride</h2>
              <p className="text-white text-lg">Select a ride type according to your needs</p>
            </div>
          </div>

        </div>
        <div className='container mx-auto '>
          <div className='block md:flex md:mx-10 '>
            <div className='w-full md:w-[70%] pr-0 md:pr-8'>
              <VehicleDetails />
              <BookingDetails />    
              <JourneyPS />
            </div>
            <div className='relative'>
            <div className='sticky top-0 pb-10'>
              <SidebarSuccess />
            </div>
            </div>
          </div>
        </div>                               
      </main>
    </div>
  )
}

export default Successbooking
