'use client'
import React, { useState } from 'react';
const SidebarForm = ({ savedData, selectedCar, selectedData }) => {


    return (
        <>
            <div className='container mx-auto'>
                <div className="border-2 rounded-md mt-9">
                    <div className=' pb-7 '>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d158966.63416266537!2d-0.4496746508605485!3d51.49755292174362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x487604b900d26973%3A0x4291f3172409ea92!2sLondon%20Eye%2C%20London%2C%20UK!3m2!1d51.5031864!2d-0.11951919999999999!4m5!1s0x487673cb743ccf01%3A0xea74a219c60588e1!2sTerminal%202%2C%20Inner%20Ring%20E%2C%20Hounslow%20TW6%201EW%2C%20UK!3m2!1d51.4695758!2d-0.4496072!5e0!3m2!1sen!2s!4v1693216184056!5m2!1sen!2s"
                            width="350" height="300" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div className="mx-7 pb-9" >
                        <div>
                            <div className='pb-6 border-l-2 border-colorGreen flex '>
                                <div className="-ml-[5px] pt-1">
                                    <img src="/booking-engine-img/circle.png" alt="" />
                                </div>
                                <div className="pl-3">
                                    <h2 className="text-[#AAAFB6] font-medium text-base">Pickup At</h2>
                                    <p> {savedData.field1}</p>
                                </div>
                            </div>
                            <div className='pb-6 border-l-2 border-colorGreen flex '>
                                <div className="-ml-[5px] pt-1">
                                    <img src="/booking-engine-img/circle.png" alt="" />
                                </div>
                                <div className="pl-3">
                                    <h2 className="text-[#AAAFB6] font-medium text-base">Destination</h2>
                                    <p>{savedData.field2}</p>
                                </div>
                            </div>
                            <div className='pb-6 border-l-2 border-colorGreen flex '>
                                <div className="-ml-[5px] pt-1">
                                    <img src="/booking-engine-img/circle.png" alt="" />
                                </div>
                                <div className="pl-3">
                                    <h2 className="text-[#AAAFB6] font-medium text-base">Date / Time</h2>
                                    <div className='flex space-x-8'>
                                        <p>{savedData.field3}</p>
                                        <p>{savedData.field4}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='pb-6 border-l-2 border-colorGreen flex '>
                                <div className="-ml-[5px] pt-1">
                                    <img src="/booking-engine-img/circle.png" alt="" />
                                </div>
                                <div className="pl-3">
                                    <h2 className="text-[#AAAFB6] font-medium text-base">Services</h2>
                                    {selectedCar && (
                                        <div>
                                            <p> {selectedCar.name}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className=' border-l-2 border-colorGreen flex '>
                                <div className="-ml-[5px] pt-1">
                                    <img src="/booking-engine-img/circle.png" alt="" />
                                </div>
                                <div className="pl-3">
                                    <h2 className="text-[#AAAFB6] font-medium text-base">Payment Method</h2>
                                    <p>{selectedData}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-colorGrey px-7 py-5 mt-5">
                        <h2 className="text-[#aaafb6] font-medium text-base">Journey price</h2>
                        <p className="text-3xl text-[#535967]">£228.90</p>
                    </div>
                    <div className="mx-7 my-4">
                        <button className="bg-colorBlue text-white w-full p-5 rounded font-semibold">BOOK NOW</button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default SidebarForm;