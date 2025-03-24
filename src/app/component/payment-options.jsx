'use client'
import React, { useState } from 'react';
import Link from 'next/link';
const paymentoptions = ({ onItemClick }) => {
    const [activeItem, setActiveItem] = useState('cash');
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
                            className={` ${activeItem === 'cash' ? 'active-content' : 'inactive-content'
                                } selct-icon rounded-l bg-white border-2 text-center `}          
                            id="cash"
                            onClick={() => handleItemClick('cash')}
                        >
                            <div className={` ${activeItem === 'cash' ? '' : ''}`}>
                                <img src={activeItem === 'cash' ? '/booking-engine-img/cash-active.png' : '/booking-engine-img/cash.png'} alt="" />
                                <p>Cash</p>
                            </div>          
                        </li>
                        <li
                            className={` ${activeItem === 'card' ? 'active-content' : 'inactive-content'
                                } selct-icon bg-white border-2 text-center`}     
                            id="card"
                            onClick={() => handleItemClick('card')}
                        >
                            <div className={` ${activeItem === 'card' ? '' : ''}`}>
                                <img src={activeItem === 'card' ? '/booking-engine-img/credit-active.png' : '/booking-engine-img/credit-card.png'} alt="" />
                                <p>Card</p>
                            </div>
                        </li>
                        <li
                            className={` ${activeItem === 'paypal' ? 'active-content' : 'inactive-content'
                                } selct-icon rounded-r bg-white border-2 text-center`}
                            id="paypal"
                            onClick={() => handleItemClick('paypal')}
                        >
                            <div className={` ${activeItem === 'paypal' ? '' : ''}`}>
                                <img src={activeItem === 'paypal' ? '/booking-engine-img/paypal-active.png' : '/booking-engine-img/paypal.png'} alt="" />
                                <p>Paypal</p>
                            </div>
                        </li>
                    </ul>
                    <div>
                        <p onClick={toggleTextBox} className='text-colorGreen pt-3 font-semibold cursor-pointer'>Click here to use promo code</p>

                        {isVisible &&
                            <div className='d-flex'>
                                <input type='text' placeholder='Promo code' className='mt-3 p-2.5 border-2 rounded-lg focus:border-blue-600 border-gray-500' />
                                <button className="bg-colorGreen text-white p-3 rounded font-semibold"> Apply Now</button>
                            </div>
                        }
                    </div>
                </div>

            </div>
        </>
    )
}

export default paymentoptions
