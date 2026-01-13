'use client'
import React, { useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='container mx-auto'>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link href="https://flowbite.com"> <span className="flex items-center">
            <Image src="/header-img/logo.png" width={150} height={300} className=" mr-3" alt="Logo" />
          </span></Link>
          <div className="block md:flex items-center md:space-x-5">
            <div className='flex items-center space-x-4 px-3'>
              <Image src="/header-img/phone-icon.png" alt='minicab-phone' width={30} height={10} />
              <Link href="tel:5541251234"><p className='text-[#737373] text-lg font-bold'>Call: <br /> (555) 412-1234</p></Link>
            </div>
            <div className='flex items-center space-x-4 px-3'>
              <Image src="/header-img/whatsapp-icon.png" alt='minicab-phone' width={30} height={50} />
              <Link href="tel:5541251234"> <p className='text-[#737373] text-lg font-bold'>Whatsapp <br /> (555) 412-1234</p></Link>
            </div>
            <div className='px-3'>
              <Link href="/"><Image src="/header-img/trustpilot.png" alt='trustpilot-icon' width={240} height={200} /></Link>
            </div>
          </div>
        </div>
      </nav >
      <nav className="bg-[#193D89] rounded border-2 border-white relative bottom-0 top-10 left-0  z-40">
        <div className="max-w-screen-xl px-5 pb-4 mt-4 mx-auto">
          <div className="block lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
            >
              <svg
                className={`fill-current h-5 w-5 text-white ${isOpen ? "hidden" : "block"}`}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
              <svg
                className={`fill-current h-5 w-5 text-white ${isOpen ? "block" : "hidden"}`}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
              </svg>
            </button>
          </div>
          <div
            className={` block lg:flex md:items-center md:justify-between  ${isOpen ? "block" : "hidden"}`}>
            
              <ul className="block md:flex  flex-col md:flex-row font-medium  mt-3 md:mt-0 mr-6 space-y-3 md:space-y-0  md:space-x-14 text-sm">
                <li>
                  <Link href="/"><span className="text-white uppercase" aria-current="page">Business Account</span></Link>
                </li>

                <li>
                  <Link href="/"> <span className="text-white uppercase">Family Account</span></Link>
                </li>
                <li>
                  <Link href="/"><span className="text-white uppercase">Airport Transfer</span></Link>
                </li>
                <li>
                  <Link href="/"> <span className="text-white uppercase">Download App</span></Link>
                </li>
                <li>
                  <Link href="/"> <span className="text-white uppercase">Become A Driver</span></Link>
                </li>
              </ul>
           
            
              <div className=' mt-5 md:mt-0 flex  space-x-2 pr-3'>
                <Link href=""><Image src="/header-img/facebook-icon.png" alt='' width={24} height={30} /> </Link>
                <Link href=""><Image src="/header-img/twiter-icon.png" alt='' width={24} height={50} /> </Link>
                <Link href=""><Image src="/header-img/linkdin-icon.png" alt='' width={24} height={50} /> </Link>
                <Link href=""><Image src="/header-img/insta-icon.png" alt='' width={24} height={50} /> </Link>
              </div>
            
          </div>
        </div>
      </nav>
    </div >
  )
}