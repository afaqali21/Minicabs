'use client'
import React, { useEffect, useState } from 'react';
import Datetimepick from '../component/datetime';
import { useRouter } from 'next/navigation'; // Import useRouter

const Booking = () => {
  const router = useRouter(); // Initialize the router

  const [fields, setFields] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState('oneway');
  const [additionalFields, setAdditionalFields] = useState([]);
  const [activeItem, setActiveItem] = useState('minicab');
  const [pickup, setpickup] = useState(''); // Pickup input
  const [addStop, setaddStop] = useState(''); // addstopinput
  const [destination, setDestination] = useState(''); // Destination input
  const [dateTime1, setDateTime1] = useState(null); // First datetime picker
  const [dateTime2, setDateTime2] = useState(null); // Second datetime picker for 'return'

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
    setpickup(event.target.value);
  };
  const handleAddstopChange = (event) => {
    setaddStop(event.target.value);
  };

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  const handleDateTime1Change = (date) => {
    setDateTime1(date);
  };

  const handleDateTime2Change = (date) => {
    setDateTime2(date);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent form submission

    // Collecting all data
    const formData = {
      selectedService: activeItem,
      pickupLocation: pickup,
      destination: destination,
      dateTime1: dateTime1 ? dateTime1.toISOString() : null,
      dateTime2: dateTime2 ? dateTime2.toISOString() : null,
      additionalStops: addStop,
      travelType: selectedRadio,
    };
    // If 'airport' is selected, clear the stored data
  if (activeItem === 'airport') {
    localStorage.setItem('bookingData', JSON.stringify(formData));
    router.push('./airport-booking'); // Redirect to the airport page
  } else {
    // Save the form data in localStorage for other selections
    localStorage.setItem('bookingData', JSON.stringify(formData));
    router.push('./simple-booking'); // Redirect to simple booking for non-airport options
  }    
  };
  return (
    <div className='container  mx-auto '>
      <div className=" md:block lg:flex relative">
        <div className="  absolute top-20 right-0 md:right-[25%]  lg:right-[43%] xl:right-[54%] 2xl:right-[61%] left-0  md:left-1 md:top-32 mx-4 md:mx-7  ">
          <div className="bg-white py-6 pl-5 pr-3  rounded-md">
            <div className='overflow-y-auto h-[350px] md:h-[440px] pr-2'>
              <form action="" onSubmit={handleFormSubmit}>
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
                <div className="relative">
                  <input type="text" value={pickup}
                    onChange={handlePickupChange}
                    list="countries" id="Pickup" className="block px-2.5 pb-2.5 pt-4 w-full md:w-[476px]
                 text-sm text-gray-900 bg-transparent rounded border-2 border-[#A9ACB3] appearance-none
                 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                  <label htmlFor="Pickup" className="absolute text-sm text-gray-500  duration-300 
                transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2
               peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
               peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Pickup At</label>
                </div>
                <datalist id="countries">
                  {countries.map((country, index) => (
                    <option key={index} value={country} />
                  ))}
                </datalist>
                <div className=" py-3 ">
                  <div className='flex'>
                    <span className='pr-2'>Add stop</span> <img className='cursor-pointer' onClick={handleAddField}
                      src="/booking-engine-img/more-1.svg" // Replace with the actual path to your SVG file
                      width={24} // Set the desired width
                      height={24} // Set the desired height
                    /></div>
                  {additionalFields.map((field, index) => (
                    <div key={index}>
                      <div class="relative">
                        <input type="text" list="countries" value={addStop}
                    onChange={handleAddstopChange} id={`Destination-${index}`} class="block mt-2 px-2.5 pb-2.5 pt-4 w-full md:w-[476px]
                 text-sm text-gray-900 bg-white rounded border-2 border-[#A9ACB3] appearance-none
                 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                        <label htmlFor={`Destination-${index}`} class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Stops</label>
                      </div>
                      
                      <img className='cursor-pointer' onClick={() => handleRemoveField(index)} src="/booking-engine-img/minus.png" width={34} // Set the desired width
                        height={24} alt="" />

                    </div>
                  ))}
                </div>
                <div className="relative">
                  <input type="text" id="Destination "
                    value={destination}
                    onChange={handleDestinationChange} list="countries" className="block px-2.5 pb-2.5 pt-4 w-full md:w-[476px]
                 text-sm text-gray-900 bg-transparent rounded border-2 border-[#A9ACB3] appearance-none
                 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                  <label htmlFor="Destination " className="absolute text-sm text-gray-500  duration-300 
                transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2
               peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
               peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Destination</label>
                </div>
          
                <div className="relative mt-4">
                  <Datetimepick value={dateTime1} onChange={handleDateTime1Change} />

                </div>


                <div>
                  <div className="flex items-center pt-4">
                    <div className="flex items-center pr-4">
                      <input checked={selectedRadio === 'oneway'}
                        onChange={() => handleRadioClick('oneway')} id="default-radio-1" type="radio" value="oneway" name="" className="w-4 h-4 text-[#7DBF00] bg-gray-100 border-gray-300 focus:ring-[#7DBF00] " required/>
                      <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">One Way</label>
                    </div>
                    <div className="flex items-center">
                      <input checked={selectedRadio === 'return'}
                        onChange={() => handleRadioClick('return')} id="default-radio-2" type="radio" value="return" name="" className="w-4 h-4 text-[#7DBF00] bg-gray-100 border-gray-300 focus:ring-[#7DBF00] " required/>
                      <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Return</label>
                    </div>
                  </div>
                  {selectedRadio === 'return' && (
                    <div>
                      <div className="relative mt-4">
                        <Datetimepick value={dateTime2} onChange={handleDateTime2Change} />

                      </div>
                    </div>
                  )}
                  <div>
                    <button type='submit' className='uppercase bg-colorBlue text-white w-full md:w-[476px] mt-5 py-3 rounded-md'>Get Instant Quote</button>
                  </div>
                </div>

              </form> 
            </div>
          </div>

        </div>                 
        <div className=" absolute top-[520px] md:top-72 left-[10%] md:left-[60%]">
          <div className='flex items-center'>
            <img src="/booking-engine-img/fixed-fares.png" alt="" />
            <div>
              <h2 className='text-white text-5xl font-semibold'>Fixed Fares</h2>
              <h3 className='text-white text-2xl'>NO PRICE INCREASE</h3>
            </div>
          </div>
          <div className='grid grid-cols-4 pt-4'>
            <img src="/booking-engine-img/DBS-icon.png"  alt="" />
            <img src="/booking-engine-img/ico-icon.png" alt="" />
            <img src="/booking-engine-img/NVQ-icon.png" alt="" />
            <img src="/booking-engine-img/TFL-icon.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;