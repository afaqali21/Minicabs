import React from 'react'
import { useRouter } from 'next/router';

const bookingdetailsuccess = () => {
    const router = useRouter();
    const{
     pickup = '',
    destination = '',
    }= router.query;
   
    return (
        <div>
            <div className='container mx-auto'>
                <div className='bg-colorGrey px-5 py-8 my-7'>
                    <h2 className='text-hColor text-2xl pb-4'>Booking Detail</h2>
                    <div className='grid  md:grid-cols-3'>
                        <div>
                            <p className='text-hColor'>Booking Reference</p>
                            <p className='text-hColor font-semibold'>27548755</p>
                        </div>
                        <div>
                            <p className='text-hColor'>Date & Time</p>
                            <p className='text-hColor font-semibold'>2018</p>
                        </div>
                        <div>
                            <p className='text-hColor'>Payment</p>
                            <p className='text-hColor font-semibold'>$120</p>
                        </div>

                    </div>  
                    <div className='flex space-x-2 pt-4'>   
                        <div className=''>
                            <button className='flex items-center border rounded-md border-[#2A50A1] text-[#2A50A1] hover:bg-colorBlue hover:text-white px-4 py-3'>
                                Edit booking
                            </button>
                        </div>
                        <div className=''>
                            <button className='flex items-center border rounded-md border-[#A82219] text-[#A82219] hover:bg-red-700 hover:text-white px-4 py-3'>
                                Cancel booking
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default bookingdetailsuccess
