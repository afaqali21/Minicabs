'use client'
import React, { useState } from 'react';
const SelectService = ({ onCarSelect }) => {
  // ... Existing code ...
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleDivClick = (index) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };


  const carData = [
    // Your car data here
    { name: 'Saloon', type: 'Standard Family', image: '/booking-engine-img/saloon.png', passengers: 3, luggage: 2, price: '£191.80' },
    { name: 'Estate', type: 'Standard Family', image: '/booking-engine-img/estate.png', passengers: 3, luggage: 3, price: '£228.90' },
    { name: '7 Seater', type: 'Large Family', image: '/booking-engine-img/7-seater.png', passengers: 5, luggage: 2, price: '£284.20' },
    { name: '8 Seater', type: 'Extra Large Family', image: '/booking-engine-img/8-seater.png', passengers: 6, luggage: 6, price: '£358.40' },
    { name: 'Executive', type: 'Executive Car', image: '/booking-engine-img/executive.png', passengers: 3, luggage: 2, price: '£330.40' },
    // ...
  ];

  return (
    // ... Existing code ...

    <>
      <div className='container mx-auto'>
        <div className='bg-colorGrey px-6 py-8 my-4'>
          <h2 className='text-hColor text-2xl pb-4'>Select Service</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-0 lg:flex text-center">
            {carData.map((car, index) => (
              <div
              key={index}
              className={`border-2 bg-white selct-icon py-6  p-4 ${activeIndex === index ? 'active-cars depth-effect' : ''
                }${index === 0
                  ? 'rounded-l border-r-2 border-t-2 border-b-2'
                  : index === carData.length - 1
                    ? 'rounded-r border-l-2 border-t-2 border-b-2'
                    : ''
                }`}
              onClick={() => {
                handleDivClick(index);
                // Call the onCarSelect function with the selected car data
                onCarSelect(car);
              }}
            >
                <p className={`text-lg font-semibold ${activeIndex === index ? 'text-[#193d89]' : 'text-hColor'}`}>{car.name}</p>
                <p className="text-[13px]">{car.type} </p>
                <div className="">
                  <img className="max-w-full max-h-full" src={car.image} alt={car.name} />
                </div>
                <div className="flex text-center mx-auto">
                  <div className="flex">
                    <img className='w-full h-full' src="/booking-engine-img/user.png" alt="Passengers" />
                    <p className="text-hColor font-semibold">{car.passengers}</p>
                  </div>
                  <div className="flex pl-4">
                    <img className='w-full h-full' src="/booking-engine-img/suitcase.png" alt="Luggage" />
                    <p className="text-hColor pl-1 font-semibold">{car.luggage}</p>
                  </div>
                </div>
                <p className="text-hColor font-semibold">{car.price}</p>
                {activeIndex === index && (
                  <div className="absolute right-0 bottom-0  bg-blue ">

                    <img src='/booking-engine-img/check 1.png' className='bottom-0 right-0 absolute' width={25} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

    </>
  );
};
export default SelectService;
