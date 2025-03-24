import React from 'react'

const journeyps = ({ pickup, destination, arrived, landed, flightno, meet }) => {
  
    return (
        
        <div>
            <div className='container mx-auto'>
                <div className='bg-colorGrey px-5 py-8 my-7'>
                    <h2 className='text-hColor text-2xl pb-4'>Journey Detail</h2>
                    <div class="relative">
                        <div className='flex space-x-2 '>
                            <div >
                                <img className=' pt-2  ' src="/success-img/pickup.png" alt="" />
                            </div>
                            <div >
                                <p className='text-hColor'>Pickup At</p>
                                <p className='text-hColor font-semibold pb-4'>{pickup}</p>
                            </div>
                        </div>
                        <div className='absolute top-7 left-1 border-dotted border-l-2 border-[#AAAFB6] h-16 md:h-10'></div>
                        <div className='flex space-x-2'>
                            <div >
                                <img className=' pt-2  ' src="/success-img/drop.png" alt="" />
                            </div>
                            <div >
                                <p className='text-hColor'>Drop Off</p>
                                <p className='text-hColor font-semibold'>{destination}</p>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-4 pt-6'>                                  
                        <div className=''>              
                            <p className='text-hColor'>Arriving From</p>
                            <p className='text-hColor font-semibold pb-4'>{arrived}</p>
                        </div>
                        <div className=''>
                            <p className='text-hColor'>Landing Time</p>
                            <p className='text-hColor font-semibold pb-4'>{landed}</p>
                        </div>
                        <div className=''>
                            <p className='text-hColor'>Flight No</p>
                            <p className='text-hColor font-semibold pb-4'>{flightno}</p>
                        </div>
                        <div className=''>
                            <p className='text-hColor'>Driver Meeting Time</p>
                            <p className='text-hColor font-semibold pb-4'>{meet}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container mx-auto'>
                <div className='bg-colorGrey px-5 py-8 my-7'>
                    <h2 className='text-hColor text-2xl pb-4'>Passengers & Suitcase</h2>
                    <div className='grid grid-cols-5'>
                        <div className='flex space-x-3'>
                            <img className='w-4 h-5' src="/success-img/user.png" alt="" />
                            <p className='text-hColor font-semibold pb-4'>2</p>
                        </div>
                        <div className='flex space-x-3'>
                            <img className='w-4 h-6' src="/success-img/suitcase.png" alt="" />
                            <p className='text-hColor font-semibold'>3</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex space-x-4 pb-5'>

                <button className='flex items-center border rounded-md border-[#2A50A1] bg-[#2A50A1] text-white hover:bg-transparent hover:text-[#2A50a1] px-4 py-3'>
                    My bookings
                </button>
                <button className='flex items-center border rounded-md border-[#2A50A1] text-[#2A50A1] hover:bg-colorBlue hover:text-white px-4 py-3'>
                    Book return
                </button>
                <button className='flex items-center border rounded-md  border-[#2A50A1] text-[#2A50A1] hover:bg-colorBlue hover:text-white px-4 py-3'>
                    Book again
                </button>


            </div>
        </div>
    )
}

export default journeyps