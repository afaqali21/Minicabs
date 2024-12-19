'use client'
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Simplebooking({onSave }) {

  const [fields, setFields] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState(null);
  const [additionalFields, setAdditionalFields] = useState([]);
  const [activeItem, setActiveItem] = useState('minicab-field');

  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [field3, setField3] = useState('');
  const [field4, setField4] = useState('');

  // Update the data and call onSave on each input change
  const handleField1Change = (e) => {
    const value = e.target.value;
    setField1(value);
    onSave({ field1: value, field2, field3, field4 });
  };

  const handleField2Change = (e) => {
    const value = e.target.value;
    setField2(value);
    onSave({ field1, field2: value, field3, field4 });
  };

  const handleField3Change = (e) => {
    const value = e.target.value;
    setField3(value);
    onSave({ field1, field2, field3: value, field4 });
  };

  const handleField4Change = (e) => {
    const value = e.target.value;
    setField4(value);
    onSave({ field1, field2, field3, field4: value });
  };

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
  };     


  // const handleInputChange = (event) => {
  //   const newValue = event.target.value;
  //   setInputValue(newValue);
  //   onDataChange(newValue); // Notify the parent component about the change

  // };

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




  return (
    <div className="bg-white py-6  pr-3  rounded-md">
      <div className=''>
        <form action="">
          <div className=''>
            <ul className="grid grid-cols-2  gap-0 lg:flex w-full md:w-[570px] items-end py-3 ">
              <li
                className={` ${activeItem === 'minicab-field' ? 'active-content' : 'inactive-content'} selct-icon rounded-l text-center`}
                id="minicab-field"
                onClick={() => handleItemClick('minicab-field')}
              >
                <div className={` ${activeItem === 'minicab-field' ? '' : ''}`}>
                  <img className="h-auto max-w-full" src={activeItem === 'minicab-field' ? '/booking-engine-img/minicab-active.png' : '/booking-engine-img/minicab.png'} alt="image description" />
                  <figcaption className="mt-2 text-sm text-center ">Minicab</figcaption>
                </div>
              </li>
              <li
                className={` py-2 ${activeItem === 'airport-field' ? 'active-content' : 'inactive-content'} selct-icon text-center`}
                id="airport-field"
                onClick={() => handleItemClick('airport-field')}
              >
                <div className={` ${activeItem === 'airport-field' ? '' : ''}`}>
                  <img className="h-auto max-w-full" src={activeItem === 'airport-field' ? '/booking-engine-img/airport-transfer-active.png' : '/booking-engine-img/airport-transfer.png'} alt="image description" />
                  <figcaption className="mt-2 text-sm text-center ">Airport</figcaption>
                </div>
              </li>
              <li
                className={`py-2 ${activeItem === 'courier-field' ? 'active-content' : 'inactive-content'} selct-icon text-center`}
                id="courier-field"
                onClick={() => handleItemClick('courier-field')}
              >
                <div className={activeItem === 'courier-field' ? '' : ''}>
                  <img className="h-auto max-w-full m-auto" src={activeItem === 'courier-field' ? '/booking-engine-img/courier-active.png' : '/booking-engine-img/courier.png'} alt="image description" />
                  <figcaption className="mt-2 text-sm text-center ">Courier</figcaption>
                </div>
              </li>
              <li
                className={` ${activeItem === 'removal-field' ? 'active-content' : 'inactive-content'} selct-icon text-center`}
                id="removal-field"
                onClick={() => handleItemClick('removal-field')}
              >
                <div className={`  ${activeItem === 'removal-field' ? '' : ''}`}>
                  <img className="h-auto max-w-full" src={activeItem === 'removal-field' ? '/booking-engine-img/removal-active.png' : '/booking-engine-img/removal.png'} alt="image description" />
                  <figcaption className="mt-2 text-sm text-center ">Removal</figcaption>
                </div>
              </li>
              <li
                className={` ${activeItem === 'wheelchair-field' ? 'active-content' : 'inactive-content'} selct-icon text-center`}
                id="wheelchair-field"
                onClick={() => handleItemClick('wheelchair-field')}
              >
                <div className={` ${activeItem === 'wheelchair-field' ? '' : ''}`}>
                  <img className="h-auto max-w-full" src={activeItem === 'wheelchair-field' ? '/booking-engine-img/minicab-active.png' : '/booking-engine-img/minicabs.png'} alt="image description" />
                  <figcaption className="mt-2 text-sm text-center ">Wheelchair</figcaption>
                </div>
              </li>

            </ul>
          </div>
          <div className='bg-colorGrey px-7 py-9'>
            <h2 className='text-hColor text-2xl pb-4'>Enter Pickup / Destination</h2>
            <div className="relative">
              <input   value={field1}
        onChange={handleField1Change} type="text" id="pickup" className="block px-2.5 pb-2.5 pt-4 w-full
                 text-sm text-gray-900 bg-white rounded border-2 border-[#A9ACB3] appearance-none
                 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label htmlFor="pickup" className="absolute text-sm text-gray-500  duration-300 
                transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2
               peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
               peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Pickup At</label>
            </div>
            <div className=" py-3">
              <div className='flex'>
                <span className='pr-2'>Add stop</span> <img className='cursor-pointer' onClick={handleAddField}
                  src="/booking-engine-img/more-1.svg" width={24} height={24} /></div>
              {additionalFields.map((field, index) => (
                <div key={index}>
                  <div class="relative">
                    <input type="text" id="destination-add" class="block px-2.5 pb-2.5 pt-4 w-full
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
              <input value={field2}
        onChange={handleField2Change} type='text' id="destionation" className="block px-2.5 pb-2.5 pt-4 w-full
                 text-sm text-gray-900 bg-white rounded border-2 border-[#A9ACB3] appearance-none
                 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label htmlFor="destionation" className="absolute text-sm text-gray-500  duration-300 
                transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2
               peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
               peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Destination</label>
            </div>
            <div className="block md:flex">
              <div className='w-full md:w-1/2 block md:flex'>
                <div className="relative mt-4 w-full">
                  <input type="date" value={field3}
        onChange={handleField3Change} id="date" className=" px-2.5 pb-2.5 pt-4 w-full           
                      text-sm text-gray-900 bg-white rounded border-2 border-[#A9ACB3] appearance-none
                      focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                  <label htmlFor="date" className="absolute text-sm text-gray-500  duration-300 
                       transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2
                       peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2  
                        peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1" >Date</label>
                </div>
                <div className="relative mt-4 w-full ml-0 md:ml-2">
                  <input
                    type="time" value={field4}
                    onChange={handleField4Change} id="time" className=" px-2.5 pb-2.5 pt-4 w-full
                   text-sm text-gray-900 bg-white rounded border-2 border-[#A9ACB3] ap  pearance-none
                   focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                  <label htmlFor="time" className="absolute text-sm text-gray-500  duration-300 
                 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2
                 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
                 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Time</label>
                </div>
              </div>
              <div className="flex items-center justify-evenly pt-4 w-1/2">
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
                <div className='block w-full md:w-1/2 md:flex pt-4'>
                  <div className='relative mt-4 w-full '>
                  <input value={date}
                    onChange={handleDateChange}
                    style={{ padding: '10px', fontSize: '16px' }} type="date" id="r-date" className="mb-3 md:mb-0 px-2.5 pb-2.5 pt-4 w-full           
                      text-sm text-gray-900 bg-white rounded border-2 border-[#A9ACB3] appearance-none
                      focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                  <label htmlFor="r-date" className="absolute text-sm text-gray-500  duration-300 
                       transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2
                       peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2  
                        peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1" >Date</label>
                  </div>
                  <div className='relative mt-4 w-full ml-0 md:ml-2'>
                  <input value={time}
                    onChange={handleTimeChange}
                    style={{ padding: '10px', fontSize: '16px' }} type="time" id="r-time" className=" px-2.5 pb-2.5 pt-4 w-full
                   text-sm text-gray-900 bg-white rounded border-2 border-[#A9ACB3] ap  pearance-none
                   focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                  <label htmlFor="r-time" className="absolute text-sm text-gray-500  duration-300 
                 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2
                 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
                 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Time</label>
                </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}                                   