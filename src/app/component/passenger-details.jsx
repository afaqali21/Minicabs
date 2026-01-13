'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
const PassengerDetails = ({ onPassengerChange }) => {
     // States to store input values
     const [name, setName] = useState('');
     const [email, setEmail] = useState('');
     const [mobile, setMobile] = useState('');  
 
     // Handle input changes
     const handleInputChange = (e) => {
         const { id, value } = e.target;
         if (id === 'name') setName(value);
         if (id === 'email') setEmail(value);
         if (id === 'mobile') setMobile(value);                        
     };
 
     // Effect to notify parent of changes
     useEffect(() => {
         onPassengerChange({ name, email, mobileNumber: mobile });
       
     }, [name, email, mobile, onPassengerChange]);
    return (
        <>
<div className='bg-colorGrey px-6 py-8 my-7'>
<h2 className='text-hColor text-2xl pb-4'>Passenger information</h2>
<ul className="grid grid-cols-2 sm:grid-cols-5 gap-0 lg:flex ">
    <div className="bg-white selct-icon px-3 pt-2 rounded-l ">
        <li className="block xl:flex items-center py-2 ">
            <img className='mx-auto' src="booking-engine-img/user2.png" alt="" />
            <p className="ps-3 sm:text-sm lg:text-base">Book as guest</p>
        </li>
    </div>
    <div className="bg-white selct-icon px-5 pt-2 ">
        <li className="block xl:flex  items-center py-2 ">
            <img className='mx-auto' src="booking-engine-img/google-log.png" alt="" />
            <p className="ps-3 sm:text-sm lg:text-base text-center">Book with google</p>
        </li>
    </div>
    <div className="bg-white selct-icon px-3 pt-2 text-center">
        <Link href="./login" >
            <li className="block xl:flex items-center py-2">
                <img className='mx-auto' src="booking-engine-img/login.png" alt="" />
                <p className="ps-3 sm:text-sm lg:text-base">Login</p>
            </li>
        </Link>
    </div>
    <div className="bg-white selct-icon px-3 pt-2 text-center rounded-r">
        <Link href="./register">
        <li className="block xl:flex items-center py-2">
            <img className='mx-auto' src="booking-engine-img/register.png" alt="" />
            <p className="ps-3 sm:text-sm lg:text-base">Register</p>
        </li>   
        </Link>
    </div>     
</ul>
<div>
    <div className="relative mt-4">
        <input type="text" value={name} 
         onChange={handleInputChange}  id="name" className="block px-2.5 pb-2.5 pt-4 w-full
         text-sm text-gray-900 bg-white rounded border-2 border-[#A9ACB3] appearance-none
         focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
        <label htmlFor="name" className="absolute text-sm text-gray-500  duration-300 
         transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2
        peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
         peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Name</label>
    </div>       

    <div className='flex'>
        <div className="relative w-1/2 mt-4 pr-2">
            <input type="email"  value={email} 
            onChange={handleInputChange}  id="email" className="block px-2.5 pb-2.5 pt-4 w-full
            text-sm text-gray-900 bg-white rounded border-2 border-[#A9ACB3] appearance-none
            focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label htmlFor="email" className="absolute text-sm text-gray-500  duration-300 
              transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2
              peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
         peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email</label>
        </div>
        <div className="relative w-1/2 mt-4">
            <input type="tel"  value={mobile} 
            onChange={handleInputChange}  id="mobile" className="block px-2.5 pb-2.5 pt-4 w-full
            text-sm text-gray-900 bg-white rounded border-2 border-[#A9ACB3] appearance-none
            focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label htmlFor="mobile" className="absolute text-sm text-gray-500  duration-300 
            transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2
         peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
         peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Mobile number</label>
        </div>
    </div>           
</div>               
  
</div>
</>
   )
}

export default PassengerDetails