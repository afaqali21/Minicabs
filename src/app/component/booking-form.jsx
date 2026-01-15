'use client'
import React, { useEffect, useState, useRef } from 'react';
import Datetimepick from '../component/datetime';

export default function Simplebooking({ onSave }) {
  const [formData, setFormData] = useState(null);
  const [fields, setFields] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState(null);
  const [additionalFields, setAdditionalFields] = useState([]);
  const [activeItem, setActiveItem] = useState('minicab-field');
  const [pickup, setpickup] = useState(''); // Pickup input
  const [addStops, setAddStops] = useState([]); // Array of stops
  const [destination, setDestination] = useState(''); // Destination input
  const [dateTime1, setDateTime1] = useState(null); // First datetime picker
  const [dateTime2, setDateTime2] = useState(null); // Second datetime picker for 'return'
  const [isFromBookingEngine, setIsFromBookingEngine] = useState(false); // Add this state
  const [bookingData, setBookingData] = useState({});

  // Autocomplete State
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destSuggestions, setDestSuggestions] = useState([]);
  
  // Refs to control fetching behavior (prevent loop on selection)
  const shouldFetchPickup = useRef(true);
  const shouldFetchDest = useRef(true);

   // Function to check if data comes from booking engine
   const checkBookingEngineData = () => {
    const storedData = localStorage.getItem('bookingData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setIsFromBookingEngine(true);
      setFormData(parsedData); 
      setpickup(parsedData.pickupLocation || '');  
      setDestination(parsedData.destination || '');
      setDateTime1(parsedData.dateTime1 === 'ASAP' ? 'ASAP' : (parsedData.dateTime1 ? new Date(parsedData.dateTime1) : null));
      setDateTime2(parsedData.dateTime2 === 'ASAP' ? 'ASAP' : (parsedData.dateTime2 ? new Date(parsedData.dateTime2) : null));
      setSelectedRadio(parsedData.travelType || null);
      setActiveItem(parsedData.selectedService || 'minicab-field');
      setActiveItem(parsedData.selectedService || 'minicab-field');
      const loadedStops = Array.isArray(parsedData.additionalStops) ? parsedData.additionalStops : [];
      setAddStops(loadedStops);
      setAdditionalFields(loadedStops.map(() => '')); // Create inputs for each stop

      handleSave(
        parsedData.pickupLocation || '', 
        parsedData.destination || '', 
        parsedData.dateTime1 === 'ASAP' ? 'ASAP' : (parsedData.dateTime1 ? new Date(parsedData.dateTime1) : null),
        parsedData.dateTime2 === 'ASAP' ? 'ASAP' : (parsedData.dateTime2 ? new Date(parsedData.dateTime2) : null)
      );

    } else {
     
      clearFormFields();
    }
  };

  // Clear form fields if no data is available
  const clearFormFields = () => {
    setpickup('');
    setDestination('');
    setDateTime1(null);
    setDateTime2(null);
    setSelectedRadio(null);
    setActiveItem('minicab-field');
    // setaddStop(''); // This line was erroneous in original?
    handleSave('', '', null); // Clear sidebar data

  };

  useEffect(() => {
    checkBookingEngineData();
  }, []);

  const countries = [
    'London Heathrow Airport Terminal 1',
    'London Heathrow Airport Terminal 2',
    'London Heathrow Airport Terminal 3',
    'London Heathrow Airport Terminal 4',
    'London Heathrow Airport Terminal 5',
    'London Gatwick North Airport',
    'London Gatwick South Airport',
    'London Luton Airport',
    'London City Airport',
    'London Stansted Airport',
    'London Southend Airport',
    'London Southend Airport',
  ];

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);      
  };

  const handleRadioClick = (radioType) => {
    if (radioType === 'return') {
      setFields([...fields, { name: '' }]); // Add a new field
      setSelectedRadio('return');
    } else if (radioType === 'oneway') {
      setFields([]); // Clear fields
      setSelectedRadio('oneway');
      setDateTime2(null); // Clear return date
      handleSave(pickup, destination, dateTime1, null); // Update parent to clear return date
    }
  };

  const handleAddField = () => {
    setAdditionalFields([...additionalFields, '']);
  };
                                                                                                      
  const handleRemoveField = (index) => {   
    const updatedFields = [...additionalFields];
    updatedFields.splice(index, 1);
    setAdditionalFields(updatedFields);
  };

  const handleAddstopChange = (event, index) => {
    const newStops = [...addStops];
    newStops[index] = event.target.value;
    setAddStops(newStops);
    handleSave(pickup, destination, dateTime1, dateTime2, newStops);
  };

  const handleDateTime1Change = (date) => {      
    setDateTime1(date);
    handleSave(pickup, destination, date, dateTime2);  // Pass the updated dateTime1 value
  }; 

     
  const handleDateTime2Change = (date) => {
    setDateTime2(date);
    handleSave(pickup, destination, dateTime1, date);  // Pass the updated dateTime1 value
  }; 
      
  const handleSave = (pickupValue, destinationValue, dateTimeValue, dateTime2Value) => {
    console.log("Saving form data:", { pickupValue, destinationValue, dateTimeValue });
    onSave({
      pickup: pickupValue,
      destination: destinationValue,
      dateTime1: dateTimeValue === 'ASAP' ? 'ASAP' : (dateTimeValue instanceof Date && !isNaN(dateTimeValue) ? dateTimeValue.toISOString() : null), 
      dateTime2: dateTime2Value === 'ASAP' ? 'ASAP' : (dateTime2Value instanceof Date && !isNaN(dateTime2Value) ? dateTime2Value.toISOString() : null), 

    });   
  };

  // --- Autocomplete Logic ---

  const fetchSuggestions = async (query, type) => {
    if (!query || query.length < 3) {
        if (type === 'pickup') setPickupSuggestions([]);
        if (type === 'destination') setDestSuggestions([]);
        return;
    }

    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=gb&limit=5`);
        const data = await response.json();
        if (type === 'pickup') setPickupSuggestions(data);
        if (type === 'destination') setDestSuggestions(data);
    } catch (error) {
        console.error("Error fetching suggestions:", error);
    }
  };

  // Debounce helper
  useEffect(() => {
      const timer = setTimeout(() => {
          if (pickup && shouldFetchPickup.current) fetchSuggestions(pickup, 'pickup');
      }, 500);
      return () => clearTimeout(timer);
  }, [pickup]);

  useEffect(() => {
    const timer = setTimeout(() => {
        if (destination && shouldFetchDest.current) fetchSuggestions(destination, 'destination');
    }, 500);
    return () => clearTimeout(timer);
  }, [destination]);

  const handlePickupChange = (event) => {
    const newPickup = event.target.value;
    shouldFetchPickup.current = true; // User is typing, allow fetch
    setpickup(newPickup);
    handleSave(newPickup, destination, dateTime1, dateTime2);
  };

  const handleDestinationChange = (event) => {
    const newDestination = event.target.value;  
    shouldFetchDest.current = true; // User is typing, allow fetch
    setDestination(newDestination);   
    handleSave(pickup, newDestination, dateTime1, dateTime2);
  };

  const selectSuggestion = (suggestion, type) => {
      const address = suggestion.display_name;
      if (type === 'pickup') {
          shouldFetchPickup.current = false; // Prevent re-fetch loop
          setpickup(address);
          setPickupSuggestions([]);
          handleSave(address, destination, dateTime1, dateTime2);
      } else {
          shouldFetchDest.current = false; // Prevent re-fetch loop
          setDestination(address);
          setDestSuggestions([]);
          handleSave(pickup, address, dateTime1, dateTime2);
      }
  };

  return (
    <div className="bg-white py-6  pr-3  rounded-md">
      <div className=''>
        <form action="">
          <div className=''>
            <ul className='grid grid-cols-2 md:grid-cols-5 gap-0 lg:flex w-full md:w-[476px] py-3'>
              {['minicab', 'airport', 'courier', 'removal', 'wheelchair'].map((item, index) => (
                <li
                  key={item}
                  className={`py-2 ${activeItem === `${item}` ? 'active-content' : 'inactive-content'} selct-icon text-center`}
                  id={`${item}`}
                  onClick={() => handleItemClick(`${item}`)}>   
                  <div>   
                    <img
                      className='h-auto max-w-full'
                      src={
                        activeItem === `${item}`
                          ? `/booking-engine-img/${item}-active.png`
                          : `/booking-engine-img/${item}.png`
                      }
                      alt={`${item} image`}
                    />
                    <figcaption className='mt-2 text-sm text-center capitalize'>{item}</figcaption>
                  </div>
                </li>
              ))}
            </ul>
          </div>   
          <div className='bg-colorGrey px-7 py-9'>
            <h2 className='text-hColor text-2xl pb-4'>Enter Pickup / Destination</h2>
            
            {/* Pickup Field */}
            <div className={`relative ${pickupSuggestions.length > 0 ? 'z-50' : 'z-0'}`}>
              <input value={pickup}
                onChange={handlePickupChange}
                 autoComplete="off"
                 type="text" id="pickup" className="block px-2.5 pb-2.5 pt-4 w-full
                 text-sm text-gray-900 bg-white rounded border-2 border-[#A9ACB3] appearance-none
                 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label htmlFor="pickup" className="absolute text-sm text-gray-500  duration-300 
                transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2
               peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
               peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Pickup At</label>
               
               {/* Pickup Suggestions */}
               {pickupSuggestions.length > 0 && (
                   <ul className="absolute left-0 right-0 top-full mt-1 z-50 bg-white border border-gray-300 rounded-md shadow-2xl max-h-60 overflow-y-auto">
                       {pickupSuggestions.map((item, index) => (
                           <li 
                               key={index} 
                               className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 border-b last:border-b-0"
                               onClick={() => selectSuggestion(item, 'pickup')}
                           >
                               {item.display_name}
                           </li>
                       ))}
                   </ul>
               )}
            </div>  
            
            <div className=" py-3 relative z-0">     
              <div className='flex'>
                <span className='pr-2'>Add stop</span> <img className='cursor-pointer' onClick={handleAddField}
                  src="/booking-engine-img/more-1.svg" width={24} height={24} /></div>
              {additionalFields.map((field, index) => (
                <div key={index}>     
                  <div className="relative">
                    <input type="text" value={addStops[index] || ''}
                      onChange={(e) => handleAddstopChange(e, index)}
                      id="destination-add" className="block px-2.5 pb-2.5 pt-4 w-full
                 text-sm text-gray-900 bg-white rounded border-2 border-[#A9ACB3] appearance-none
                 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="destination-add" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Stop {index + 1}</label>
                  </div>
                  <img className='cursor-pointer' onClick={() => handleRemoveField(index)} src="/booking-engine-img/minus.png" width={34} // Set the desired width
                    height={24} alt="" />
                </div>
              ))}
            </div>
            
            {/* Destination Field */}
            <div className={`relative ${destSuggestions.length > 0 ? 'z-50' : 'z-0'}`}>
            <input value={destination}
                onChange={handleDestinationChange}
                 autoComplete="off"
                 type='text' id="destionation" className="block px-2.5 pb-2.5 pt-4 w-full
                 text-sm text-gray-900 bg-white rounded border-2 border-[#A9ACB3] appearance-none
                 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label htmlFor="destionation" className="absolute text-sm text-gray-500  duration-300 
                transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2
               peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
               peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Destination</label>
               
               {/* Destination Suggestions */}
               {destSuggestions.length > 0 && (
                   <ul className="absolute left-0 right-0 top-full mt-1 z-50 bg-white border border-gray-300 rounded-md shadow-2xl max-h-60 overflow-y-auto">
                       {destSuggestions.map((item, index) => (
                           <li 
                               key={index} 
                               className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 border-b last:border-b-0"
                               onClick={() => selectSuggestion(item, 'destination')}
                           >
                               {item.display_name}
                           </li>
                       ))}
                   </ul>
               )}
            </div>    
            
            <div className='flex'>
              <div className="relative mt-4 " >
                <Datetimepick  value={dateTime1} onChange={handleDateTime1Change} />
              </div>                   
              <div className="flex items-center justify-evenly pt-4 ps-3 ">
                <div className="flex items-center pr-4">
                  <input checked={selectedRadio === 'oneway'}
                    onChange={() => handleRadioClick('oneway')} id="default-radio-1" type="radio" value="" name="" className="w-4 h-4 text-[#7DBF00] bg-gray-100 border-gray-300 focus:ring-[#7DBF00] " />
                  <img src="/booking-engine-img/one-way.png" className='pl-1' alt="" />
                  <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">One Way</label>
                </div>
                <div className="flex items-center">
                  <input checked={selectedRadio === 'return'}
                    onChange={() => handleRadioClick('return')} id="default-radio-2" type="radio" value="" name="" className="w-4 h-4 text-[#7DBF00] bg-gray-100 border-gray-300 focus:ring-[#7DBF00] " />
                  <img src="/booking-engine-img/return.png" className='pl-1' alt="" />
                  <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Return</label>
                </div>
              </div>
            </div>
            <div>

{selectedRadio === 'return' && (
  <div className="relative mt-4">
    <Datetimepick value={dateTime2} onChange={handleDateTime2Change} />

  </div>
)}

</div>
          </div>
         
        </form>
      </div>
    </div >
  );
}