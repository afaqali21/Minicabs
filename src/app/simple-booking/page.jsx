'use client';
import React, { useState } from 'react';
import BookingForm from '../component/booking-form';
import Selectservice from '../component/select-service';
import Paymentoptions from '../component/payment-options';
import Passengerdetails from '../component/passenger-details';

import SidebarForm from '../component/sidebar-form';

export default function Simpleboking() {
    const [bookingData, setBookingData] = useState({ pickup: '',
        destination: '',
        dateTime1: '',
        dateTime2: '',});
    const [selectedData, setSelectedData] = useState('');
    const [selectedCar, setSelectedCar] = useState(null);
    const [passengerDetails, setPassengerDetails] = useState({
        name: '',
        email: '',
        mobileNumber: '',
    });
     const handlePassengerDetailsChange = (data) => {
        setPassengerDetails(data);                                    
    };  
 
    // Update state from booking form data                                 
    const handleSaveBookingData = (data) => {
        console.log("Received data in parent:", data); // Check if data is coming from Simplebooking

        setBookingData(data);
      };  
                    
    const handleItemClick = (itemId) => {
        setSelectedData(itemId);
    };

    const handleCarSelection = (carData) => {
        setSelectedCar(carData);
    };
     // Handle form submission
     const handleSubmit = () => {
        // Destructure the booking data
        const { pickup, destination, dateTime1, dateTime2, } = bookingData;

        // Validation: Check if all required fields are filled
        if (
            pickup.trim() !== '' &&
            destination.trim() !== '' &&
            dateTime1.trim() !== '' &&
            selectedCar !== null &&
            selectedData.trim() !== ''
        ) {
            // All fields are filled; prepare the data object
            const allData = {
                pickup,
                destination,
                dateTime1,
                dateTime2: bookingData.dateTime2 || 'N/A', // Handle optional return
                selectedCar,
                paymentMethod: selectedData,         
                passenger: passengerDetails,
            };                        
   
            // Log the data to the console
            console.log('All fields filled. Booking Data:', allData);
             // Optional: Reset form
            setBookingData({      
                pickup: '',    
                destination: '',
                dateTime1: '',
                dateTime2: '',
                additionalStops: [],
            });  
            setSelectedCar(null);
            setSelectedData('');
            setPassengerDetails({
                name: '',
                email: '',
                mobileNumber: '',
            });
         

        } else {
            // Some fields are missing; alert the user
            alert('Please fill in all required fields before booking.');
        }
    };


    return (
        <div>                           
            <main className="min-h-screen">
                <div className="simple-boking">
                    <div className="relative container mx-auto">
                        <div className="absolute top-28 left-5 mx-7">
                            <h2 className="text-4xl text-white">Book a Ride</h2>
                            <p className="text-white text-lg">Select a ride type according to your needs</p>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto">
                    <div className="block lg:flex md:mx-10">
                        <div className="w-full lg:w-[70%] pr-0 md:pr-8">
                            {/* Pass the handleSave function to update bookingData */}
                            <BookingForm onSave={handleSaveBookingData} />
                            <Selectservice onCarSelect={handleCarSelection} />
                            <Paymentoptions onItemClick={handleItemClick} />
                            <Passengerdetails  onPassengerChange={handlePassengerDetailsChange}/>
                        </div>
                        <div className="relative">
                            <div className="sticky top-0 pb-10">
                                {/* Sidebar receives bookingData, selectedCar, and selectedData */}
                                <SidebarForm bookingData={bookingData} selectedCar={selectedCar} selectedData={selectedData}  onSubmit={handleSubmit}  />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
