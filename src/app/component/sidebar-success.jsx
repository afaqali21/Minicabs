import React from 'react'
import Rating from '../component/rating';
const sidebarsuccess = () => {
  const initialRating = 3;
  return (
    <div>
      {/* customer-detail */}
      <div className='container mx-auto'>
        <div className='bg-colorGrey px-5 py-8 my-7'>
          <h2 className='text-hColor text-2xl pb-4'>Customer Detail</h2>
          <div className='flex'>
            <img className='pr-3' src="/success-img/customer-img.png" alt="" />
            <div className=''>
              <h3 className='text-colorBlue font-semibold text-lg'>John Doe</h3>
              <p className='text-sm text-hColor'>15 mins ago</p>
            </div>
          </div>
          <div className='pt-5'>
            <div className='flex items-center space-x-3'>
              <img className='w-4 h-4' src="/success-img/call.png" alt="" />
              <p className='text-[#535967] font-semibold'>+92 322 3466584</p>
            </div>
            <div className='flex items-center space-x-3'>
              <img className='w-4 h-4' src="/success-img/email.png" alt="" />
              <p className='text-[#535967] font-semibold'>john.doe@company.com</p>
            </div>
          </div>
        </div>
      </div>
      {/* rate driver */}
      <div className='container mx-auto'>
        <div className='bg-colorGrey px-5 py-8 my-7'>
          <h2 className='text-hColor text-2xl '>Rate your driver</h2>
          <Rating initialValue={initialRating} />
          <hr />
          <div className='flex items-center space-x-2 pt-3'>
            <p className='text-xl text-hColor '>Rate us on </p>
            <img src="/success-img/tp.png" alt="" />
          </div>
          <div className='pt-4'>
         <a href="https://uk.trustpilot.com/review/minicabs.co.uk">
          <img src="/success-img/tp-stars.png" alt="" />
          </a>
          </div>
        </div>
      </div>
{/* pervious booking */}
      <div className='container mx-auto'>
        <div className='bg-colorGrey px-5 py-8 my-7'>
          <h2 className='text-hColor text-2xl '>Previous Bookings</h2>
          <hr className='my-4' />
          <div class="relative space-y-5 ">
            <div className='flex space-x-2  '>
              <div >
                <img className=' pt-2  ' src="/success-img/pick-side.png" alt="" />
              </div>
              <div >
                <p className='text-hColor pt-1'>Ealing Broadway Station</p>
              </div>
            </div>
            <div className='absolute top-[7px] left-[5px] border-dotted border-l-2 border-[#AAAFB6] h-6'></div>
            <div className='flex space-x-2'>
              <div >
                <img className=' pt-2  ' src="/success-img/drop-side.png" alt="" />
              </div>
              <div >
                <p className='text-hColor'>Queensbury Station</p>                            
              </div>
            </div>
          </div>
          <div className='flex items-center justify-between pt-4'>
            <p className='text-colorBlue font-semibold'>View details</p>
            <p className='text-hColor'>Sep 2, 2023</p>
          </div>
          <hr className='my-4' />
          <div class="relative space-y-5 ">
            <div className='flex space-x-2  '>
              <div >
                <img className=' pt-2  ' src="/success-img/pick-side.png" alt="" />
              </div>
              <div >
                <p className='text-hColor pt-1'>Ealing Broadway Station</p>
              </div>
            </div>
            <div className='absolute top-[7px] left-[5px] border-dotted border-l-2 border-[#AAAFB6] h-6'></div>
            <div className='flex space-x-2'>
              <div >
                <img className=' pt-2  ' src="/success-img/drop-side.png" alt="" />
              </div>
              <div >
                <p className='text-hColor'>Queensbury Station</p>                            
              </div>
            </div>
          </div>
          <div className='flex items-center justify-between pt-4'>
            <p className='text-colorBlue font-semibold'>View details</p>
            <p className='text-hColor'>Sep 2, 2023</p>
          </div>
        </div>
      </div>
      {/* feedback */}
      <div className='container mx-auto'>
        <div className='bg-colorGrey px-5 py-8 my-7'>
          <h2 className='text-hColor text-2xl '>Suggestions & Feedback</h2>
          <p className='text-hColor '>How was your exerience</p>
          <div className='flex py-3'>
            <img src="/success-img/Happy-face.png" alt="" />
            <img src="/success-img/neutral-face.png" alt="" />
            <img src="/success-img/sad-face.png" alt="" />
          </div>
          <textarea name="" id="" cols="30" rows="5" placeholder='Describe your experience here...'></textarea>
          <button className='bg-colorBlue w-full text-white py-3 rounded-md'>Send Feedback</button>
        </div>
      </div>
    </div>
  )
}

export default sidebarsuccess
