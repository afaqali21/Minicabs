'use client'
import React, { useState } from 'react';
import Link from 'next/link';
const paymentoptions = ({ onItemClick }) => {
    const [activeItem, setActiveItem] = useState('cash-li');
    const [isVisible, setIsVisible] = useState(false);

    const toggleTextBox = () => {
        setIsVisible(!isVisible);
    };

    const handleItemClick = (itemId) => {
        setActiveItem(itemId);
        onItemClick(itemId);
    };
    return (
        <>
            <div className='container mx-auto'>
                <div className='bg-colorGrey px-6 py-8 my-7'>
                    <h2 className='text-hColor text-2xl pb-4'>Select Payment Options</h2>
                    <ul className="flex items-end py-3">
                        <li
                            className={` ${activeItem === 'cash-li' ? 'active-content' : 'inactive-content'
                                } selct-icon rounded-l bg-white border-2 text-center`}
                            id="cash-li"
                            onClick={() => handleItemClick('cash-li')}
                        >
                            <div className={` ${activeItem === 'cash-li' ? '' : ''}`}>
                                <img src={activeItem === 'cash-li' ? '/booking-engine-img/cash-active.png' : '/booking-engine-img/cash.png'} alt="" />
                                <p>Cash</p>
                            </div>
                        </li>
                        <li
                            className={` ${activeItem === 'card-li' ? 'active-content' : 'inactive-content'
                                } selct-icon bg-white border-2 text-center`}
                            id="card-li"
                            onClick={() => handleItemClick('card-li')}
                        >
                            <div className={` ${activeItem === 'card-li' ? '' : ''}`}>
                                <img src={activeItem === 'card-li' ? '/booking-engine-img/credit-active.png' : '/booking-engine-img/credit-card.png'} alt="" />
                                <p>Card</p>
                            </div>
                        </li>
                        <li
                            className={` ${activeItem === 'paypal-li' ? 'active-content' : 'inactive-content'
                                } selct-icon rounded-r bg-white border-2 text-center`}
                            id="paypal-li"
                            onClick={() => handleItemClick('paypal-li')}
                        >
                            <div className={` ${activeItem === 'paypal-li' ? '' : ''}`}>
                                <img src={activeItem === 'paypal-li' ? '/booking-engine-img/paypal-active.png' : '/booking-engine-img/paypal.png'} alt="" />
                                <p>Paypal</p>
                            </div>
                        </li>
                    </ul>
                    <div>
                        <p onClick={toggleTextBox} className='text-colorGreen pt-3 font-semibold cursor-pointer'>Click here to use promo code</p>
                        {isVisible && <input type='text' placeholder='Promo code' className='mt-3 p-2.5 border-2 rounded-lg focus:border-blue-600 border-gray-500' />}
                    </div>
                </div>
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
                            <input type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full
                             text-sm text-gray-900 bg-white rounded border-2 border-[#A9ACB3] appearance-none
                             focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500  duration-300 
                             transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2
                            peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
                             peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Name</label>
                        </div>

                        <div className='flex'>
                            <div className="relative w-1/2 mt-4 pr-2">
                                <input type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full
                                text-sm text-gray-900 bg-white rounded border-2 border-[#A9ACB3] appearance-none
                                focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500  duration-300 
                                  transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2
                                  peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
                             peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email</label>
                            </div>
                            <div className="relative w-1/2 mt-4">
                                <input type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full
                                text-sm text-gray-900 bg-white rounded border-2 border-[#A9ACB3] appearance-none
                                focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500  duration-300 
                                transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2
                             peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
                             peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Mobile number</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default paymentoptions
