'use client'
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import MapComponent to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import('./MapComponent'), {
    ssr: false,
    loading: () => <div className="h-[300px] w-full bg-gray-200 animate-pulse flex items-center justify-center">Loading Map...</div>
});

const SidebarForm = ({ bookingData, selectedCar, selectedData, passengerDetails, onSubmit }) => {
    console.log("SidebarForm bookingData:", bookingData);

    return (
        <>
            <div className='w-full'>
                <div className="border-2 rounded-md mt-9">
                    <div className=' pb-7 '>
                        {/* Leaflet Map Integration */}
                        <div className='overflow-hidden relative z-0'>
                            <MapComponent 
                                pickup={bookingData.pickup} 
                                destination={bookingData.destination} 
                            />
                        </div>
                    </div>
                    <div className="mx-7 pb-9" >
                        <div>
                            <div className='pb-6 border-l-2 border-colorGreen flex '>
                                <div className="-ml-[5px] pt-1">
                                    <img src="/booking-engine-img/circle.png" alt="" />
                                </div>
                                <div className="pl-3">
                                    <h2 className="text-[#AAAFB6] font-medium text-base">Pickup At</h2>
                                    <p className="break-words"> {bookingData.pickup || "Select Pickup Location"}</p>
                                </div>   
                            </div>
                             {bookingData.additionalStops && Array.isArray(bookingData.additionalStops) && bookingData.additionalStops.map((stop, index) => (
                                stop && (
                                    <div key={index} className='pb-6 border-l-2 border-colorGreen flex '>
                                        <div className="-ml-[5px] pt-1">
                                            <img src="/booking-engine-img/circle.png" alt="" />
                                        </div>
                                        <div className="pl-3">
                                            <h2 className="text-[#AAAFB6] font-medium text-base">Stop {index + 1}</h2>
                                            <p className="break-words">{stop}</p>
                                        </div>
                                    </div>
                                )
                            ))}
                            <div className='pb-6 border-l-2 border-colorGreen flex '>
                                <div className="-ml-[5px] pt-1">
                                    <img src="/booking-engine-img/circle.png" alt="" />
                                </div>
                                <div className="pl-3">
                                    <h2 className="text-[#AAAFB6] font-medium text-base">Destination</h2>
                                    <p className="break-words">{bookingData.destination || "Select Destination"}</p>
                                </div>
                            </div>
                            <div className='pb-6 border-l-2 border-colorGreen flex '>
                                <div className="-ml-[5px] pt-1">
                                    <img src="/booking-engine-img/circle.png" alt="" />
                                </div>
                                <div className="pl-3">
                                    <h2 className="text-[#AAAFB6] font-medium text-base">Date / Time</h2>
                                    <div className='flex space-x-8'>
                                        <p>{bookingData.dateTime1 === 'ASAP' ? 'ASAP' : (bookingData.dateTime1 ? new Date(bookingData.dateTime1).toLocaleString(): 'N/A')}</p>
                                      
                                    </div>
                                </div>
                            </div>      
                                 {/* Conditionally display Return Date/Time only if user has selected return trip */}
                                 {bookingData.dateTime2 && bookingData.dateTime2 !== 'N/A' && (
                                <div className='pb-6 border-l-2 border-colorGreen flex '>
                                    <div className="-ml-[5px] pt-1">
                                        <img src="/booking-engine-img/circle.png" alt="" />
                                    </div>
                                    <div className="pl-3">
                                        <h2 className="text-[#AAAFB6] font-medium text-base">Return Date / Time</h2>
                                        <div className='flex space-x-8'>
                                            <p>{bookingData.dateTime2 === 'ASAP' ? 'ASAP' : new Date(bookingData.dateTime2).toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            )}     
                            <div className='pb-6 border-l-2 border-colorGreen flex '>
                                <div className="-ml-[5px] pt-1">
                                    <img src="/booking-engine-img/circle.png" alt="" />
                                </div>   
                                <div className="pl-3">
                                    <h2 className="text-[#AAAFB6] font-medium text-base">Services</h2>
                                    {selectedCar && (
                                        <div>
                                            <p className="break-words"> {selectedCar.name}</p>                  
                                        </div>
                                    )}                                                       
                                </div>     
                            </div>              
                            <div className=' border-l-2 border-colorGreen flex '>                  
                                <div className="-ml-[5px] pt-1">
                                    <img src="/booking-engine-img/circle.png" alt="" />
                                </div>
                                <div className="pl-3">
                                    <h2 className="text-[#AAAFB6] font-medium text-base">Payment Method</h2>
                                    <p className="break-words">{selectedData}</p>
                                </div>
                            </div>
                        </div>                                                  
                    </div>
                    <div className="bg-colorGrey px-7 py-5 mt-5">
                        <h2 className="text-[#aaafb6] font-medium text-base">Journey price</h2>
                        <p className="text-3xl text-[#535967]">£228.90</p>
                    </div>
                    <div className="mx-7 my-4">
                        <button className="bg-colorBlue text-white w-full p-5 rounded font-semibold" onClick={(e) => { e.preventDefault(); onSubmit(); }}>BOOK NOW</button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default SidebarForm;