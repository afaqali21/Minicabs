'use client'
import React, { useState } from 'react';
import Simplebooking from '../component/booking-form';
import Selectservice from '../component/select-service';
import Paymentoptions from '../component/payment-options';
import SidebarForm from '../component/sidebar-form';

export default function Simpleboking() {
    const [savedData, setSavedData] = useState({});
    const [selectedData, setSelectedData] = useState('');
    const handleItemClick = (itemId) => {
        // Store the selected data when an item is clicked
        setSelectedData(itemId);
    };
    const handleSaveData = (data) => {
        setSavedData(data); // Update the saved data in the state
    };
    const [selectedCar, setSelectedCar] = useState(null);

    // Function to update the selected car data
    const handleCarSelection = (carData) => {
        setSelectedCar(carData);
    };

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
                    <div className='block lg:flex md:mx-10 '>
                        <div className='w-full lg:w-[70%] pr-0 md:pr-8'>
                            <Simplebooking onSave={handleSaveData} />
                            <Selectservice onCarSelect={handleCarSelection} />
                            <Paymentoptions onItemClick={handleItemClick} />
                        </div>
                        <div className='relative'>
                            <div className='sticky top-0 pb-10'>
                                <SidebarForm savedData={savedData} selectedCar={selectedCar} selectedData={selectedData} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
