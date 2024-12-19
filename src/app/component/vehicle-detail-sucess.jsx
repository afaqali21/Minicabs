import React from 'react'

const vehicleDetailSucess = () => {
    return (
        <div>
            <div className='container mx-auto'>
                <div className='bg-colorGrey px-5 py-8 my-7'>
                    <h2 className='text-hColor text-2xl pb-4'>Vehicle Detail</h2>
                    <div className='grid  md:grid-cols-2'>
                        <div className='grid grid-cols-2'>
                            <div>
                                <p className='text-hColor'>Vehicle</p>
                                <p className='text-hColor font-semibold'>Toyata Gli</p>
                            </div>
                            <div>
                                <p className='text-hColor'>Model</p>
                                <p className='text-hColor font-semibold'>2018</p>
                            </div>
                            <div>
                                <p className='text-hColor'>Color</p>
                                <p className='text-hColor font-semibold'>White</p>
                            </div>
                            <div>
                                <p className='text-hColor'>Number</p>
                                <p className='text-hColor font-semibold'>AXL 3210</p>
                            </div>
                        </div>

                        <div>
                            <img src="/success-img/suces-car.png" alt="" />
                        </div>          
                    </div>
                    <div className='flex'>
                        <img src="/success-img/driver-img.png" alt="" />
                        <div className=' pl-3'>
                            <p className='text-hColor'>Driver</p>
                            <p className='text-hColor font-semibold'>Alex Doe</p>
                        </div>
                        <div className='pl-12 '>
                            <button className='flex items-center border rounded-md border-[#2A50A1] text-[#2A50A1] hover:bg-colorBlue hover:text-white px-4 py-3'>
                            <img className='pr-2' src="/success-img/track-driver.png"  alt="Default Image"   />
                                Track your driver
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default vehicleDetailSucess
