'use client'
import React, { useState } from 'react'

const Flightdetail = () => {
    const [isVisible, setIsVisible] = useState(false);

  const toggleTextBox = () => {
    setIsVisible(!isVisible);
  };
    return (
        <div>
            <div className='container mx-auto'>
                <div className='bg-colorGrey px-4 py-8 my-7'>
                    <h2 className='text-hColor text-2xl pb-4'>Flight details</h2>
                    <div className='flex space-x-2'>
                    <div className="relative w-1/2 mt-4">
                        <input type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full
                                text-sm text-gray-900 bg-white rounded border-2 border-[#A9ACB3] appearance-none
                                focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500  duration-300 
                                  transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2
                                  peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
                             peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Arriving from</label>
                    </div>
                    <div className="relative w-1/2 mt-4">
                        <input type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full
                                text-sm text-gray-900 bg-white rounded border-2 border-[#A9ACB3] appearance-none
                                focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500  duration-300 
                                transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2
                             peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
                             peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Flat landing time</label>
                    </div>
                </div>

                <div className='flex space-x-2'>
                    <div className="relative w-1/2 mt-4">
                        <input type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full
                                text-sm text-gray-900 bg-white rounded border-2 border-[#A9ACB3] appearance-none
                                focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500  duration-300 
                                  transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2
                                  peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
                             peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Flight number</label>
                    </div>
                    <div className="relative w-1/2 mt-4">
                        <input type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full
                                text-sm text-gray-900 bg-white rounded border-2 border-[#A9ACB3] appearance-none
                                focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500  duration-300 
                                transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2
                             peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
                             peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">How long after landing should the driver meet you?</label>
                    </div>
                </div>
                <div>
                    <p onClick={toggleTextBox} className='text-colorGreen pt-3 font-semibold cursor-pointer'>+ Add additional information</p>
                    {isVisible && <textarea rows="4" cols="50" placeholder="Write Info..." className='mt-3 p-2.5 border-2 rounded-lg focus:border-blue-600 border-gray-500' />}
                </div>
            </div>
            </div>
        </div>
    )
};

export default Flightdetail
