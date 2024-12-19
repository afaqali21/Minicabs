'use client'
import React, { useState } from 'react';
import Simplebooking from '../component/booking-form';
import Selectservice from '../component/select-service';
import FlightDetail from '../component/flight-detail';
import Paymentoptions from '../component/payment-options';
import Passengerdetails from '../component/passenger-details';
import SidebarForm from '../component/sidebar-form';
import { useRouter } from 'next/navigation'; 

const Aiportbooking = () => {
  const router = useRouter(); // Initialize the router

  const [bookingData, setBookingData] = useState({ pickup: '',
    destination: '',
    dateTime1: '',
    dateTime2: '',});      
 
  const [selectedData, setSelectedData] = useState('');
  const [passengerDetails, setPassengerDetails] = useState({
    name: '',
    email: '',
    mobileNumber: '',
});
 const handlePassengerDetailsChange = (data) => {
    setPassengerDetails(data);    
};

const [flightDetails, setflightDetails] = useState({
  arrived: '',
  landed: '',
  flightno: '',                   
  meet: '', 
});
const handleflightChange = (data) => {
  setflightDetails(data);    
};                                        
                 
     // Update state from booking form data
     const handleSaveBookingData = (data) => {   
      console.log("Received data in parent:", data); // Check if data is coming from Simplebooking
    
      setBookingData(data);
    };      
        
  const handleItemClick = (itemId) => {                              
    // Store the selected data when an item is clicked        
    setSelectedData(itemId);    
  };       
              
  const [selectedCar, setSelectedCar] = useState(null);
     
  // Function to update the selected car data
  const handleCarSelection = (carData) => {
    setSelectedCar(carData);
  };
   // Handle form submission   
   const handleSubmit = () => {
    // Check if all required fields are filled
    if (
        !bookingData.pickup ||
        !bookingData.destination ||
        !bookingData.dateTime1 ||
        !passengerDetails.name ||
        !passengerDetails.email ||
        !passengerDetails.mobileNumber ||
        !flightDetails.arrived ||
        !flightDetails.landed ||
        !flightDetails.flightno ||
        !selectedCar ||
        !selectedData
    ) {
        console.log("Validation failed. Please fill in all required fields.");
        return; // Stop the submission
    }

    // Log the data to the console for debugging
    console.log("Booking Data:", bookingData);
    console.log("Passenger Details:", passengerDetails);
    console.log("Flight Details:", flightDetails);
    console.log("Selected Car:", selectedCar);
    console.log("Payment Method:", selectedData);

    // Extract specific data for success page
    // const successPageData = {
    //     pickup: bookingData.pickup,
    //     destination: bookingData.destination,
    //     arrived: flightDetails.arrived,
    //     landed: flightDetails.landed,
    //     flightno: flightDetails.flightno,
    //     meet: flightDetails.meet,
    // };

    // Navigate to the success page
    router.push({
        pathname: '/success-booking',
        query: {
          pickup: bookingData.pickup || '',
          destination: bookingData.destination || '',
          // pickup: bookingData.pickup,
          // destination: bookingData.destination,
          // arrived: flightDetails.arrived,
          // landed: flightDetails.landed,
          // flightno: flightDetails.flightno,       
          // meet: flightDetails.meet,
        },
    });   
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
          <div className='block md:flex md:mx-10 '>
            <div className='w-full md:w-[70%] pr-0 md:pr-8'>
              <Simplebooking onSave={handleSaveBookingData} />
              <Selectservice onCarSelect={handleCarSelection} />
              <FlightDetail onFlightchange={handleflightChange}/>                       
              <Paymentoptions onItemClick={handleItemClick} />
              <Passengerdetails  onPassengerChange={handlePassengerDetailsChange}/>
            </div>      
            <div className='relative'>   
              <div className='sticky top-0 pb-10'>
                <SidebarForm bookingData={bookingData} selectedCar={selectedCar} selectedData={selectedData}  onSubmit={handleSubmit} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Aiportbooking
