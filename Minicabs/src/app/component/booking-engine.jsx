'use client'
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { Button, Dialog } from '@mui/material';

const Booking = () => {
  const [fields, setFields] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState(null);
  const [additionalFields, setAdditionalFields] = useState([]);
  const [activeItem, setActiveItem] = useState('minicab-field');

  const [isDivVisible, setDivVisibility] = useState(false);
  const [inputValue, setInputValue] = useState('ASAP');
  const [open, setOpen] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);


  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
  };
  const handleRadioClick = (radioType) => {
    if (radioType === 'return') {
      // Create a new field object and add it to the fields array
      const newField = { name: '' };
      setFields([...fields, newField]);

      // Set the selected radio to 'oneway'
      setSelectedRadio('return');
    } else if (radioType === 'oneway') {
      // Clear the fields array and reset the selected radio to 'return'
      setFields([]);
      setSelectedRadio('oneway');
    }
  };

  const handleChange = (e, index) => {
    const { name } = e.target;

    // Update the specific field object in the array
    const updatedFields = [...fields];
    updatedFields[index] = { ...updatedFields[index], [name]: value };

    setFields(updatedFields);
  };

  const handleAddField = () => {
    setAdditionalFields([...additionalFields, '']);
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...additionalFields];
    updatedFields.splice(index, 1);
    setAdditionalFields(updatedFields);
  };

  const [date, setDate] = useState('');

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const [time, setTime] = useState('');

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleInputClick = () => {
    setDivVisibility(!isDivVisible);
  };

  const handleButtonClick = (event) => {
    const buttonValue = event.target.value;
    setInputValue(buttonValue);
    setDivVisibility(false); // Hide the options when a button is clicked
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateTimeChange = (dateTime) => {
    const formattedDateTime = dayjs(dateTime).format('DD-MM-YYYY HH:mm:ss');

    setSelectedDateTime(dateTime)
    setInputValue(formattedDateTime);
    setOpen(false);
  };

  const [inputValue2, setInputValue2] = useState('');
  const countries =
    ['London Heathrow Airport Terminal 1',
      'London Heathrow Airport Terminal 2',
      'London Heathrow Airport Terminal 3',
      'London Heathrow Airport Terminal 4',
      'London Heathrow Airport Terminal 5',
      'London Gatwick North Airport',
      'London Gatwick South Airport',
      'London Luton Airport',
      'London City Airport',
      'London Stansted Airport',
      'London Southend Airport',];

  const handleInput2Change = (event) => {
    setInputValue2(event.target.value);
  };

  return (
    <div className='container  mx-auto '>
      <div className=" md:block lg:flex relative">
        <div className="  absolute top-20 right-0 md:right-[25%]  lg:right-[43%] xl:right-[54%] 2xl:right-[61%] left-0  md:left-1 md:top-32 mx-4 md:mx-7  ">
          <div className="bg-white py-6 pl-5 pr-3  rounded-md">
            <div className='overflow-y-auto h-[350px] md:h-[440px] pr-2'>
              <form action="">
                <div className=''>
                  <ul className=" grid grid-cols-2 md:grid-cols-5 gap-0 lg:flex w-full md:w-[476px] py-3">
                    <li
                      className={` ${activeItem === 'minicab-field' ? 'active-content' : 'inactive-content'} selct-icon rounded-l text-center`}
                      id="minicab-field"
                      onClick={() => handleItemClick('minicab-field')}>
                      <div className={` ${activeItem === 'minicab-field' ? '' : ''}`}>
                        <img className="h-auto max-w-full" src={activeItem === 'minicab-field' ? '/booking-engine-img/minicab-active.png' : '/booking-engine-img/minicab.png'} alt="image description" />
                        <figcaption className="mt-2 text-sm text-center ">Minicab</figcaption>
                      </div>
                    </li>
                    <li
                      className={` py-2 ${activeItem === 'airport-field' ? 'active-content' : 'inactive-content'} selct-icon text-center`}
                      id="airport-field"
                      onClick={() => handleItemClick('airport-field')}>
                      <div className={` ${activeItem === 'airport-field' ? '' : ''}`}>
                        <img className="h-auto max-w-full" src={activeItem === 'airport-field' ? '/booking-engine-img/airport-transfer-active.png' : '/booking-engine-img/airport-transfer.png'} alt="image description" />
                        <figcaption className="mt-2 text-sm text-center ">Airport</figcaption>
                      </div>
                    </li>
                    <li
                      className={` py-2 ${activeItem === 'courier-field' ? 'active-content' : 'inactive-content'} selct-icon text-center`}
                      id="courier-field"
                      onClick={() => handleItemClick('courier-field')}>
                      <div className={activeItem === 'courier-field' ? '' : ''}>
                        <img className="h-auto max-w-full mx-auto" src={activeItem === 'courier-field' ? '/booking-engine-img/courier-active.png' : '/booking-engine-img/courier.png'} alt="image description" />
                        <figcaption className="mt-2 text-sm text-center ">Courier</figcaption>
                      </div>
                    </li>
                    <li
                      className={` ${activeItem === 'removal-field' ? 'active-content' : 'inactive-content'} selct-icon text-center`}
                      id="removal-field"
                      onClick={() => handleItemClick('removal-field')}>
                      <div className={`  ${activeItem === 'removal-field' ? '' : ''}`}>
                        <img className="h-auto max-w-full" src={activeItem === 'removal-field' ? '/booking-engine-img/removal-active.png' : '/booking-engine-img/removal.png'} alt="image description" />
                        <figcaption className="mt-2 text-sm text-center ">removal</figcaption>
                      </div>
                    </li>
                    <li
                      className={` ${activeItem === 'wheelchair-field' ? 'active-content' : 'inactive-content'} selct-icon text-center`}
                      id="wheelchair-field"
                      onClick={() => handleItemClick('wheelchair-field')}>
                      <div className={` ${activeItem === 'wheelchair-field' ? '' : ''}`}>
                        <img className="h-auto max-w-full" src={activeItem === 'wheelchair-field' ? '/booking-engine-img/minicab-active.png' : '/booking-engine-img/minicabs.png'} alt="image description" />
                        <figcaption className="mt-2 text-sm text-center ">wheelchair</figcaption>
                      </div>
                    </li>
                  </ul>

                </div>
                <div className="relative">
                  <input type="text" value={inputValue2}
                    onChange={handleInput2Change}
                    list="countries" id="Pickup" className="block px-2.5 pb-2.5 pt-4 w-full md:w-[476px]
                 text-sm text-gray-900 bg-transparent rounded border-2 border-[#A9ACB3] appearance-none
                 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
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
                        <input type="text" id="Destination" class="block mt-2 px-2.5 pb-2.5 pt-4 w-full md:w-[476px]
                 text-sm text-gray-900 bg-white rounded border-2 border-[#A9ACB3] appearance-none
                 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label for="Destination" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Destination</label>
                      </div>
                      <img className='cursor-pointer' onClick={() => handleRemoveField(index)} src="/booking-engine-img/minus.png" width={34} // Set the desired width
                        height={24} alt="" />

                    </div>
                  ))}
                </div>
                <div className="relative">
                  <input type="text" id="Destination " className="block px-2.5 pb-2.5 pt-4 w-full md:w-[476px]
                 text-sm text-gray-900 bg-transparent rounded border-2 border-[#A9ACB3] appearance-none
                 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                  <label htmlFor="Destination " className="absolute text-sm text-gray-500  duration-300 
                transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2
               peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
               peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Destination</label>
                </div>

                <div className="relative mt-4">
                  <input type="text" value={inputValue}
                    id="Date"
                    onClick={handleInputClick} className=" px-2.5 pb-2.5 pt-4 w-full         
                      text-sm text-gray-900 bg-transparent rounded border-2 border-[#A9ACB3] appearance-none
                      focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                  <label htmlFor="Date" className="absolute text-sm text-gray-500  duration-300 
                       transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2
                       peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2  
                        peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1" >Date</label>
                </div>

                {isDivVisible && (
                  <div className="flex justify-center py-3 bg-gray-200">
                    <button
                      value="ASAP"
                      onClick={handleButtonClick}
                      className='uppercase bg-colorGreen w-2/5 h-11 text-white p-3 rounded-md mr-2'
                    >
                      ASAP
                    </button>
                    <Button
                      onClick={handleOpen}
                      className='uppercase clr-btn w-2/5 h-11 text-white p-3 rounded-md'
                    >
                      Later
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          label="Date Time"
                          viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                            seconds: renderTimeViewClock,
                          }}
                          value={selectedDateTime}
                          onChange={handleDateTimeChange}
                        />
                      </LocalizationProvider>
                    </Dialog>
                  </div>
                )}
                <div>


                  {/* <div className="relative mt-4 w-full md:w-1/2">
                    <input type="date" id="Date" className=" px-2.5 pb-2.5 pt-4 w-full         
                      text-sm text-gray-900 bg-transparent rounded border-2 border-[#A9ACB3] appearance-none
                      focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="Date" className="absolute text-sm text-gray-500  duration-300 
                       transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2
                       peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2  
                        peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1" >Date</label>
                  </div> */}
                  {/* <div className="relative mt-4 w-full md:w-1/2 ml-2">
                    <input
                      type="time" id="Time" className=" px-2.5 pb-2.5 pt-4 w-full
                   text-sm text-gray-900 bg-transparent rounded border-2 border-[#A9ACB3] ap  pearance-none
                   focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="Time" className="absolute text-sm text-gray-500  duration-300 
                 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2
                 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
                 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Time</label>
                  </div> */}
                </div>
                <div>
                  <div className="flex items-center pt-4">
                    <div className="flex items-center pr-4">
                      <input checked={selectedRadio === 'oneway'}
                        onChange={() => handleRadioClick('oneway')} id="default-radio-1" type="radio" value="" name="" className="w-4 h-4 text-[#7DBF00] bg-gray-100 border-gray-300 focus:ring-[#7DBF00] " />
                      <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">One Way</label>
                    </div>
                    <div className="flex items-center">
                      <input checked={selectedRadio === 'return'}
                        onChange={() => handleRadioClick('return')} id="default-radio-2" type="radio" value="" name="" className="w-4 h-4 text-[#7DBF00] bg-gray-100 border-gray-300 focus:ring-[#7DBF00] " />
                      <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Return</label>
                    </div>
                  </div>
                  {selectedRadio === 'return' && (
                    <div>
                      <div className="relative mt-4">
                        <input type="text" value={inputValue}
                          id="Date"
                          onClick={handleInputClick} className=" px-2.5 pb-2.5 pt-4 w-full         
                      text-sm text-gray-900 bg-transparent rounded border-2 border-[#A9ACB3] appearance-none
                      focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="Date" className="absolute text-sm text-gray-500  duration-300 
                       transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2
                       peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2  
                        peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1" >Date</label>
                      </div>

                      {isDivVisible && (
                        <div className="flex justify-center py-3 bg-gray-200">
                          <button
                            value="ASAP"
                            onClick={handleButtonClick}
                            className='uppercase bg-colorGreen w-2/5 h-11 text-white p-3 rounded-md mr-2'
                          >
                            ASAP
                          </button>
                          <Button
                            onClick={handleOpen}
                            className='uppercase clr-btn w-2/5 h-11 text-white p-3 rounded-md'
                          >
                            Later
                          </Button>
                          <Dialog open={open} onClose={handleClose}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DateTimePicker
                                label="Date Time"
                                viewRenderers={{
                                  hours: renderTimeViewClock,
                                  minutes: renderTimeViewClock,
                                  seconds: renderTimeViewClock,
                                }}
                                value={selectedDateTime}
                                onChange={handleDateTimeChange}
                              />
                            </LocalizationProvider>
                          </Dialog>
                        </div>
                      )}
                    </div>
                    //     <div className='block md:flex pt-4  md:w-[476px]'>
                    //       <div className='relative w-full md:w-1/2'>
                    //         <input value={date}
                    //           onChange={handleDateChange}
                    //           style={{ padding: '10px', fontSize: '16px' }} type="date" id="r-date" className="mb-2 md:mb-0 px-2.5 pb-2.5 pt-4 w-full           
                    //       text-sm text-gray-900 bg-transparent rounded border-2 border-[#A9ACB3] appearance-none
                    //       focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    //         <label htmlFor="r-date" className="absolute text-sm text-gray-500  duration-300 
                    //        transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2
                    //        peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2  
                    //         peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1" >Date</label>
                    //       </div>
                    //       <div className='relative w-full md:w-1/2 ml-2'>
                    //         <input value={time}
                    //           onChange={handleTimeChange}
                    //           style={{ padding: '10px', fontSize: '16px' }} type="time" id="r-time" className=" px-2.5 pb-2.5 pt-4 w-full
                    //    text-sm text-gray-900 bg-transparent rounded border-2 border-[#A9ACB3] ap  pearance-none
                    //    focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    //         <label htmlFor="r-time" className="absolute text-sm text-gray-500  duration-300 
                    //  transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2
                    //  peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
                    //  peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Time</label>
                    //       </div>
                    //     </div>
                  )}
                  <div>
                    <button className='uppercase bg-colorBlue text-white w-full md:w-[476px] mt-5 py-3 rounded-md'>Get Instant Quote</button>
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
            <img src="/booking-engine-img/DBS-icon.png" alt="" />
            <img src="/booking-engine-img/ico-icon.png" alt="" />
            <img src="/booking-engine-img/NVQ-icon.png" alt="" />
            <img src="/booking-engine-img/TFL-icon.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Booking;           