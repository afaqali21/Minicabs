'use client'
import React, { useEffect, useState } from 'react';
import Datetimepick from '../component/datetime';

export default function Simplebooking({ onSave }) {
  const [formData, setFormData] = useState(null);
  const [fields, setFields] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState(null);
  const [additionalFields, setAdditionalFields] = useState([]);
  const [activeItem, setActiveItem] = useState('minicab-field');
  const [pickup, setpickup] = useState(''); // Pickup input
  const [addStop, setaddStop] = useState(''); // addstopinput
  const [destination, setDestination] = useState(''); // Destination input
  const [dateTime1, setDateTime1] = useState(null); // First datetime picker
  const [dateTime2, setDateTime2] = useState(null); // Second datetime picker for 'return'
  const [isFromBookingEngine, setIsFromBookingEngine] = useState(false); // Add this state
  const [bookingData, setBookingData] = useState({});
   // Function to check if data comes from booking engine
   const checkBookingEngineData = () => {
    const storedData = localStorage.getItem('bookingData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setIsFromBookingEngine(true);
      setFormData(parsedData); 
      setpickup(parsedData.pickupLocation || '');  
      setDestination(parsedData.destination || '');
      setDateTime1(parsedData.dateTime1 ? new Date(parsedData.dateTime1) : null);
      setDateTime2(parsedData.dateTime2 ? new Date(parsedData.dateTime2) : null);
      setSelectedRadio(parsedData.travelType || null);
      setActiveItem(parsedData.selectedService || 'minicab-field');
      setaddStop(parsedData.additionalStops || '');

      handleSave(parsedData.pickupLocation || '', parsedData.destination || '', parsedData.dateTime1 ? new Date(parsedData.dateTime1) : null || '',parsedData.dateTime2 ? new Date(parsedData.dateTime2) : null);

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
    setaddStop('');
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

  const handlePickupChange = (event) => {
    const newPickup = event.target.value;
    setpickup(newPickup);
    handleSave(newPickup, destination, dateTime1, dateTime2);  // Pass the updated pickup value
  };

  const handleAddstopChange = (event) => {
    setaddStop(event.target.value);
  };

  const handleDestinationChange = (event) => {
    const newDestination = event.target.value;  
    setDestination(newDestination);   
    handleSave(pickup, newDestination, dateTime1, dateTime2);  // Pass the updated destination value
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
      dateTime1: dateTimeValue ? dateTimeValue.toISOString() : null, // Convert dateTime1 to ISO format
      dateTime2: dateTime2Value ? dateTime2Value.toISOString() : null, // Convert dateTime1 to ISO format

    });   
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
            <div className="relative">
              <input value={pickup}
                onChange={handlePickupChange}
                 list="countries" type="text" id="pickup" className="block px-2.5 pb-2.5 pt-4 w-full
                 text-sm text-gray-900 bg-white rounded border-2 border-[#A9ACB3] appearance-none
                 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label htmlFor="pickup" className="absolute text-sm text-gray-500  duration-300 
                transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2
               peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
               peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Pickup At</label>
            </div>  
            <datalist id="countries">
              {countries.map((country, index) => (
                <option key={index} value={country} />
              ))}
            </datalist>
            <div className=" py-3">     
              <div className='flex'>
                <span className='pr-2'>Add stop</span> <img className='cursor-pointer' onClick={handleAddField}
                  src="/booking-engine-img/more-1.svg" width={24} height={24} /></div>
              {additionalFields.map((field, index) => (
                <div key={index}>     
                  <div class="relative">
                    <input type="text" value={addStop}
                      onChange={handleAddstopChange}
                      id="destination-add" class="block px-2.5 pb-2.5 pt-4 w-full
                 text-sm text-gray-900 bg-white rounded border-2 border-[#A9ACB3] appearance-none
                 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label for="destination-add" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Floating outlined</label>
                  </div>
                  <img className='cursor-pointer' onClick={() => handleRemoveField(index)} src="/booking-engine-img/minus.png" width={34} // Set the desired width
                    height={24} alt="" />
                </div>
              ))}
            </div>
            <div className="relative">
            <input value={destination}
                onChange={handleDestinationChange}
                 list="countries" type='text' id="destionation" className="block px-2.5 pb-2.5 pt-4 w-full
                 text-sm text-gray-900 bg-white rounded border-2 border-[#A9ACB3] appearance-none
                 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label htmlFor="destionation" className="absolute text-sm text-gray-500  duration-300 
                transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2
               peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
               peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Destination</label>
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