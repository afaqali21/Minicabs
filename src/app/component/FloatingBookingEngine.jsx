'use client'
import React, { useEffect, useState, useRef } from 'react';
import Datetimepick from '../component/datetime';
import { useRouter } from 'next/navigation';

const FloatingBookingEngine = ({ 
    pickup, setPickup, 
    destination, setDestination, 
    onMapUpdate 
}) => {
  const router = useRouter();

  const [activeItem, setActiveItem] = useState('minicab');
  const [selectedRadio, setSelectedRadio] = useState('oneway'); // 'oneway' or 'return'
  const [addStops, setAddStops] = useState([]); 
  const [additionalFields, setAdditionalFields] = useState([]);
  
  const [dateTime1, setDateTime1] = useState(null); 
  const [dateTime2, setDateTime2] = useState(null);
  const [isScheduled, setIsScheduled] = useState(false); // Toggle for ASAP / Scheduled
  const [isReturnScheduled, setIsReturnScheduled] = useState(false); // Toggle for Return ASAP / Scheduled

  const [step, setStep] = useState(1); // 1: Form, 2: Vehicle Selection, 3: Payment
  const [selectedCar, setSelectedCar] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [authMode, setAuthMode] = useState(null); // 'login', 'register', 'guest', or null

  // Auth form states
  const [authData, setAuthData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: ''
  });

  const handleAuthChange = (e) => {
    const { name, value } = e.target;
    setAuthData(prev => ({ ...prev, [name]: value }));
  };

  const cars = [
    { id: 1, name: 'Saloon', type: 'Standard family size', image: '/booking-engine-img/saloon-new.png', passengers: 4, suitcases: 2, luggage: 2, price: '£37.50', promoPrice: '£32.50' },
    { id: 2, name: 'Estate', type: 'Standard family size', image: '/booking-engine-img/estate-new.png', passengers: 4, suitcases: 2, luggage: 2, price: '£44' },
    { id: 3, name: '7 Seater', type: 'Large family', image: '/booking-engine-img/7-seater-new.png', passengers: 6, suitcases: 3, luggage: 5, price: '£57' },
    { id: 4, name: '8 Seater', type: 'Extra large family', image: '/booking-engine-img/8-seater-new.png', passengers: 7, suitcases: 4, luggage: 6, price: '£69' },
    { id: 5, name: '9 Seater', type: 'Extra large family', image: '/booking-engine-img/9-seater-new.png', passengers: 8, suitcases: 5, luggage: 7, price: '£77' },
    { id: 6, name: 'Executive', type: 'Executive', image: '/booking-engine-img/executive-new.png', passengers: 4, suitcases: 2, luggage: 2, price: '£53' },
  ];

  // --- Autocomplete State ---
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destSuggestions, setDestSuggestions] = useState([]);
  const shouldFetchPickup = useRef(true);
  const shouldFetchDest = useRef(true);

  // --- Helpers ---
  const handleItemClick = (itemId) => setActiveItem(itemId);

  const handleAddField = () => {
    setAdditionalFields([...additionalFields, '']);
  };
  
  const handleRemoveField = (index) => {
    const updatedFields = [...additionalFields];
    updatedFields.splice(index, 1);
    setAdditionalFields(updatedFields);
    
    const updatedStops = [...addStops];
    updatedStops.splice(index, 1);
    setAddStops(updatedStops);
  };

  const handleAddstopChange = (event, index) => {
    const newStops = [...addStops];
    newStops[index] = event.target.value;
    setAddStops(newStops);
  };

  // --- Autocomplete Logic (Duplicated/Shared from BookingForm) ---
  const fetchSuggestions = async (query, type) => {
    if (!query || query.length < 3) {
        if (type === 'pickup') setPickupSuggestions([]);
        if (type === 'destination') setDestSuggestions([]);
        return;
    }
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=gb&limit=5`);
        const data = await response.json();
        if (type === 'pickup') setPickupSuggestions(data);
        if (type === 'destination') setDestSuggestions(data);
    } catch (error) {
        console.error("Error fetching suggestions:", error);
    }
  };

  // Debounce Pickup
  useEffect(() => {
    const timer = setTimeout(() => {
        if (pickup && shouldFetchPickup.current) fetchSuggestions(pickup, 'pickup');
    }, 500);
    return () => clearTimeout(timer);
  }, [pickup]);

  // Debounce Destination
  useEffect(() => {
    const timer = setTimeout(() => {
        if (destination && shouldFetchDest.current) fetchSuggestions(destination, 'destination');
    }, 500);
    return () => clearTimeout(timer);
  }, [destination]);

  const handlePickupChange = (e) => {
    setPickup(e.target.value);
    shouldFetchPickup.current = true;
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
    shouldFetchDest.current = true;
  };

  const selectSuggestion = (suggestion, type) => {
      const address = suggestion.display_name;
      if (type === 'pickup') {
          shouldFetchPickup.current = false;
          setPickup(address);
          setPickupSuggestions([]);
      } else {
          shouldFetchDest.current = false;
          setDestination(address);
          setDestSuggestions([]);
      }
      // Optional: Trigger map update explicitly if needed
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
        setStep(2);
        return;
    }
    if (step === 2) {
        setStep(3);
        return;
    }

    const formData = {
      selectedService: activeItem,
      pickupLocation: pickup,
      destination: destination,
      dateTime1: dateTime1 === 'ASAP' || !isScheduled ? 'ASAP' : (dateTime1 ? dateTime1.toISOString() : null),
      dateTime2: dateTime2 === 'ASAP' ? 'ASAP' : (dateTime2 ? dateTime2.toISOString() : null),
      additionalStops: addStops,
      travelType: selectedRadio,
      selectedCar: selectedCar,
    };
    
    // Save and Redirect
    localStorage.setItem('bookingData', JSON.stringify(formData));
    if (activeItem === 'airport') {
        router.push('/airport-booking'); 
    } else {
        router.push('/simple-booking');
    }
  };

  const handleEditRide = () => {
    if (step === 3) setStep(2);
    else setStep(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md relative overflow-hidden flex flex-col h-[550px]">
        {step === 1 ? (
            <div className="flex flex-col h-full overflow-hidden">
                {/* Service Type Tabs (Static Top) */}
                <ul className='grid grid-cols-4 gap-2 mb-6 flex-shrink-0'>
                    {['minicab', 'airport', 'courier', 'removal'].map((item) => (
                        <li
                            key={item}
                            className={`cursor-pointer border rounded-md p-2 flex flex-col items-center justify-center transition-all duration-200
                                ${activeItem === item ? 'bg-[linear-gradient(180deg,#193d89,#142954)] text-white border-[#193e89]' : 'bg-white text-gray-600 border-gray-300 hover:border-[#193e89]'}`}
                            onClick={() => handleItemClick(item)}
                        >
                            <img                 
                                className='h-6 w-auto mb-1'
                                src={activeItem === item ? `/booking-engine-img/${item}-active.png` : `/booking-engine-img/${item}.png`}
                                alt={item}
                            />
                            <span className="text-xs font-semibold capitalize">{item}</span>
                        </li>
                    ))}
                </ul>

                <form onSubmit={handleFormSubmit} className="flex flex-col flex-1 overflow-hidden">
                    {/* Scrollable Content Area (Middle) */}
                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4 mb-4">
                        <div className="flex gap-4">
                            {/* Visual Column: Pins and Connecting Line */}
                            <div className="flex flex-col items-center pt-2">
                                <div className="text-[#193e89]">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="flex-grow w-0.5 bg-gray-300 my-1"></div>
                                <div className="text-[#193e89]">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>

                            <div className="flex-1 space-y-4">
                                <div className="relative">
                                    <label className="block text-gray-700 text-sm font-bold mb-1">Pickup address</label>
                                    <div className="relative">
                                        <input 
                                            type="text" 
                                            value={pickup} 
                                            onChange={handlePickupChange}
                                            className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-blue-500 text-sm text-gray-700"
                                            autoComplete="off"
                                            required
                                        />
                                    </div>
                                    {pickupSuggestions.length > 0 && (
                                    <ul className="absolute left-0 right-0 top-full mt-1 z-50 bg-white border border-gray-300 rounded-md shadow-xl max-h-60 overflow-y-auto">
                                        {pickupSuggestions.map((item, index) => (
                                            <li key={index} className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 border-b last:border-b-0" onClick={() => selectSuggestion(item, 'pickup')}>
                                                {item.display_name}
                                            </li>
                                        ))}
                                    </ul>
                                    )}
                                </div>

                                <div className="relative">
                                    <label className="block text-gray-700 text-sm font-bold mb-1">Drop Off address</label>
                                    <div className="relative">
                                        <input 
                                            type="text" 
                                            value={destination} 
                                            onChange={handleDestinationChange}
                                            className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-blue-500 text-sm text-gray-700"
                                            autoComplete="off"
                                            required
                                        />
                                    </div>
                                    {destSuggestions.length > 0 && (
                                    <ul className="absolute left-0 right-0 top-full mt-1 z-50 bg-white border border-gray-300 rounded-md shadow-xl max-h-60 overflow-y-auto">
                                        {destSuggestions.map((item, index) => (
                                            <li key={index} className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 border-b last:border-b-0" onClick={() => selectSuggestion(item, 'destination')}>
                                                {item.display_name}
                                            </li>
                                        ))}
                                    </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center cursor-pointer text-gray-600 hover:text-black pt-2" onClick={handleAddField}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm font-semibold">Add stop</span>
                        </div>
                        {additionalFields.map((field, index) => (
                            <div key={index} className="flex gap-2 relative">
                                 <input type="text" value={addStops[index] || ''} onChange={(e) => handleAddstopChange(e, index)} className="block w-full text-sm text-gray-900 bg-white rounded border border-gray-300 p-2" placeholder={`Stop ${index + 1}`} />
                                 <button type="button" onClick={() => handleRemoveField(index)} className="text-red-500 font-bold fs-2">-</button>
                            </div>
                        ))}

                        <div className="flex gap-2 pt-2">
                            <button type="button" className={`flex-1 py-2 rounded-md text-sm font-semibold border ${!isScheduled ? 'border-[#193e89] text-[#fff] bg-[#193d89]' : 'border-gray-300 text-gray-600'}`} onClick={() => { setIsScheduled(false); setDateTime1(null); }}>ASAP</button>
                            <button type="button" className={`flex-1 py-2 rounded-md text-sm font-semibold border ${isScheduled ? 'border-[#193e89] text-[#fff] bg-[#193d89]' : 'border-gray-300 text-gray-600'}`} onClick={() => { setIsScheduled(true); }}>Scheduled</button>
                        </div>

                        {isScheduled && (
                            <div className="mt-2 text-[#193e89]">
                                 <label className="block text-gray-700 text-sm font-bold mb-1">Date & time</label>
                                 <div className="border border-[#193e89] rounded-md p-1">
                                    <Datetimepick value={dateTime1} onChange={setDateTime1} openOnMount={true} />
                                 </div>
                            </div>
                        )}

                         <div className="flex items-center gap-4 pt-2">
                            <label className="flex items-center cursor-pointer">
                                <input type="radio" name="tripType" value="oneway" checked={selectedRadio === 'oneway'} onChange={() => setSelectedRadio('oneway')} className="form-radio h-4 w-4 text-[#193e89]" />
                                <span className="ml-2 text-sm text-gray-700">One way</span>
                            </label>
                            <label className="flex items-center cursor-pointer">
                                <input type="radio" name="tripType" value="return" checked={selectedRadio === 'return'} onChange={() => setSelectedRadio('return')} className="form-radio h-4 w-4 text-[#193e89]" />
                                <span className="ml-2 text-sm text-gray-700">Return</span>
                            </label>
                        </div>
                         
                         {selectedRadio === 'return' && (
                             <div className="mt-2 text-[#193e89]">
                                <div className="flex gap-2 mb-2">
                                    <button type="button" className={`flex-1 py-2 rounded-md text-sm font-semibold border ${!isReturnScheduled ? 'border-[#193e89] text-[#fff] bg-[#193d89]' : 'border-gray-300 text-gray-600'}`} onClick={() => { setIsReturnScheduled(false); setDateTime2(null); }}>ASAP</button>
                                    <button type="button" className={`flex-1 py-2 rounded-md text-sm font-semibold border ${isReturnScheduled ? 'border-[#193e89] text-[#fff] bg-[#193d89]' : 'border-gray-300 text-gray-600'}`} onClick={() => { setIsReturnScheduled(true); }}>Scheduled</button>
                                </div>
                                 {isReturnScheduled && (
                                    <div className="mt-2">
                                         <label className="block text-gray-700 text-sm font-bold mb-1">Return Date & time</label>
                                         <div className="border border-[#193d89] rounded-md p-1">
                                            <Datetimepick value={dateTime2} onChange={setDateTime2} openOnMount={true} />
                                         </div>
                                    </div>
                                 )}
                            </div>
                         )}
                    </div>

                    {/* Fixed Action Button (Bottom) */}
                    <div className="mt-auto pt-2 bg-white flex-shrink-0">
                        <button type="submit" className="w-full bg-[#7DBF00] hover:bg-[#6ca500] text-white font-bold py-3 rounded-md shadow-md transition-colors text-lg">
                            Continue
                        </button>
                    </div>
                </form>
            </div>
        ) : step === 2 ? ( 
            // Step-2
            <div className="flex flex-col h-full overflow-hidden">
                {/* Static Header (Top) */}
                <div className="flex justify-between items-center mb-4 flex-shrink-0">
                    <h2 className="text-xl font-bold text-[#2b2b2b] pb-1">Select vehicle</h2>
                    <button 
                        onClick={handleEditRide}
                        className="border-none text-sm font-semibold text-gray-500 flex items-center hover:text-[#193e89]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Edit ride
                    </button>
                </div>

                {/* Scrollable Vehicle List (Middle) */}
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-2 mb-4">
                    {cars.map((car) => (
                        <div 
                            key={car.id}
                            onClick={() => setSelectedCar(car)}
                            className={`flex items-center p-3 border-b border-gray-100 cursor-pointer transition-all ${selectedCar?.id === car.id ? 'bg-blue-50 border-b-[#193e89]' : 'hover:bg-gray-50'}`}
                        >
                            {/* Vehicle Image */}
                            <div className="w-20 flex-shrink-0">
                                <img src={car.image} alt={car.name} className="w-full h-auto object-contain" />
                            </div>

                            {/* Details */}
                            <div className="flex-grow ml-4">
                                <h3 className={`font-bold leading-tight ${selectedCar?.id === car.id ? 'text-[#193e89]' : 'text-gray-800'}`}>{car.name}</h3>
                                <p className={`text-[12px] mb-1 ${selectedCar?.id === car.id ? 'text-[#193e89]' : 'text-gray-500'}`}>{car.type}</p>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center text-[11px] text-gray-600">
                                        <img src="/booking-engine-img/person-new.png" className="w-3 h-3 mr-1 opacity-70" alt="people" />
                                        {car.passengers}
                                    </div>
                                    <div className="flex items-center text-[11px] text-gray-600">
                                        <img src="/booking-engine-img/suitcase-new.png" className="w-3 h-3 mr-1 opacity-70" alt="suitcases" />
                                        {car.suitcases}
                                    </div>
                                    <div className="flex items-center text-[11px] text-gray-600">
                                        <img src="/booking-engine-img/luggage-new.png" className="w-3 h-3 mr-1 opacity-70" alt="luggage" />
                                        {car.luggage}
                                    </div>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="text-right flex flex-col items-end gap-1">
                                {car.promoPrice ? (
                                    <>
                                        <span className={`text-sm font-bold line-through leading-none ${selectedCar?.id === car.id ? 'text-[#193e89]' : 'text-gray-400'}`}>{car.price}</span>
                                        <span className="text-lg font-bold  leading-none">{car.promoPrice}</span>
                                    </>
                                ) : (
                                    <span className={`text-lg font-bold leading-none ${selectedCar?.id === car.id ? 'text-[#193e89]' : 'text-gray-800'}`}>{car.price}</span>
                                )}
                                
                                {/* Radio/Check circle shadow */}
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedCar?.id === car.id ? 'border-[#193e89]' : 'border-gray-300'}`}>
                                    {selectedCar?.id === car.id && <div className="w-2.5 h-2.5 rounded-full bg-[#193e89]" />}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Fixed Action Button (Bottom) */}
                <form onSubmit={handleFormSubmit} className="mt-auto pt-2 bg-white flex-shrink-0">
                    <button 
                        type="submit" 
                        disabled={!selectedCar}
                        className={`w-full font-bold py-3 rounded-md shadow-md transition-colors text-lg ${selectedCar ? 'bg-[#7DBF00] hover:bg-[#6ca500] text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    >
                        Book now
                    </button>
                </form>
            </div>
        ) : (
            // Step-3: Payment Options
            <div className="flex flex-col h-full overflow-hidden">
                {/* Static Header (Top) */}
                <div className="flex justify-between items-center mb-4 flex-shrink-0">
                    <h2 className="text-xl font-bold text-[#2b2b2b]">Payment options</h2>
                    <button 
                        onClick={handleEditRide}
                        className="border-none text-sm font-semibold text-gray-500 flex items-center hover:text-[#193e89]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Edit ride
                    </button>
                </div>

                {/* Scrollable Content (Middle) */}
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3 mb-4">
                    {/* Payment Methods List */}
                    <div className="space-y-0.5 border-t border-gray-100">
                        {[
                            { id: 'cash', name: 'Cash', img: 'cash' },
                            { id: 'card', name: 'Card', img: 'card' },
                            { id: 'paypal', name: 'PayPal', img: 'paypal' },
                            { id: 'apple', name: 'Apple pay', img: 'apple-pay' },
                            { id: 'google', name: 'Google pay', img: 'google-pay' }
                        ].map((method) => (
                            <div 
                                key={method.id}
                                onClick={() => setPaymentMethod(method.id)}
                                className="flex items-center justify-between py-3 border-b border-gray-100 cursor-pointer group"
                            >
                                <div className="flex items-center">
                                    <div className="w-10 h-10 flex items-center justify-center mr-3">
                                        <img 
                                            src={paymentMethod === method.id ? `/booking-engine-img/${method.img}-active.png` : `/booking-engine-img/${method.img}.png`} 
                                            alt={method.name} 
                                            className="w-full h-auto object-contain"
                                        />
                                    </div>
                                    <span className={`font-semibold ${paymentMethod === method.id ? 'text-[#193e89]' : 'text-gray-700'}`}>{method.name}</span>
                                </div>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id ? 'border-[#193e89]' : 'border-gray-300'}`}>
                                    {paymentMethod === method.id && <div className="w-2.5 h-2.5 rounded-full bg-[#193e89]" />}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Promo Code */}
                    <button className="border-none text-sm font-semibold text-gray-500 hover:text-black">
                        Click to use promo code
                    </button>

                    {/* Car Summary */}
                    <div className="text-center py-2">
                        <span className="text-[#193e89] text-xl font-bold">
                            {selectedCar?.name} {selectedCar?.promoPrice || selectedCar?.price}
                        </span>
                        <h3 className="text-gray-500 text-lg font-semibold pt-2">Payment options</h3>
                    </div>

                    {/* Auth Badges */}
                    <div className="grid grid-cols-4 gap-1 mt-0">
                        {[
                            { id: 'login', label: 'Login', img: 'login.png' },
                            { id: 'register', label: 'Register', img: 'register.png' },
                            { id: 'guest', label: 'Book as guest', img: 'user2.png' },
                            { id: 'google', label: 'Book via Google', img: 'google-log.png' }
                        ].map((item) => (
                            <div 
                                key={item.id} 
                                onClick={() => item.id !== 'google' && setAuthMode(item.id)}
                                className={`border rounded p-1 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${authMode === item.id ? 'bg-[#193e89] text-white border-[#193e89]' : 'bg-white text-gray-600 border-gray-300 hover:border-[#193e89]'}`}
                            >
                                <img 
                                    src={`/booking-engine-img/${item.img}`} 
                                    alt={item.label} 
                                    className={`h-4 w-auto mb-1 object-contain ${authMode === item.id ? 'brightness-0 invert' : ''}`} 
                                />
                                <span className={`text-[10px] leading-tight text-center font-semibold ${authMode === item.id ? 'text-white' : 'text-gray-600'}`}>
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Conditional Auth Fields */}
                    <div className="space-y-3 pt-2">
                        {authMode === 'login' && (
                            <>
                                <input type="text" name="mobile" placeholder="Mobile Number" value={authData.mobile} onChange={handleAuthChange} className="w-full p-2 border border-gray-300 rounded text-sm outline-none focus:ring-1 focus:ring-blue-500" required />
                                <input type="password" name="password" placeholder="Password" value={authData.password} onChange={handleAuthChange} className="w-full p-2 border border-gray-300 rounded text-sm outline-none focus:ring-1 focus:ring-blue-500" required />
                            </>
                        )}
                        {authMode === 'register' && (
                            <>
                                <input type="text" name="name" placeholder="Name" value={authData.name} onChange={handleAuthChange} className="w-full p-2 border border-gray-300 rounded text-sm outline-none focus:ring-1 focus:ring-blue-500" required />
                                <input type="text" name="mobile" placeholder="Number" value={authData.mobile} onChange={handleAuthChange} className="w-full p-2 border border-gray-300 rounded text-sm outline-none focus:ring-1 focus:ring-blue-500" required />
                                <input type="email" name="email" placeholder="Email" value={authData.email} onChange={handleAuthChange} className="w-full p-2 border border-gray-300 rounded text-sm outline-none focus:ring-1 focus:ring-blue-500" required />
                                <input type="password" name="password" placeholder="Password" value={authData.password} onChange={handleAuthChange} className="w-full p-2 border border-gray-300 rounded text-sm outline-none focus:ring-1 focus:ring-blue-500" required />
                            </>
                        )}
                        {authMode === 'guest' && (
                            <>
                                <input type="text" name="name" placeholder="Name" value={authData.name} onChange={handleAuthChange} className="w-full p-2 border border-gray-300 rounded text-sm outline-none focus:ring-1 focus:ring-blue-500" required />
                                <input type="text" name="mobile" placeholder="Number" value={authData.mobile} onChange={handleAuthChange} className="w-full p-2 border border-gray-300 rounded text-sm outline-none focus:ring-1 focus:ring-blue-500" required />
                                <input type="email" name="email" placeholder="Email" value={authData.email} onChange={handleAuthChange} className="w-full p-2 border border-gray-300 rounded text-sm outline-none focus:ring-1 focus:ring-blue-500" required />
                            </>
                        )}
                    </div>
                </div>

                {/* Final Book Now Button */}
                <form onSubmit={handleFormSubmit} className="mt-auto pt-2 bg-white flex-shrink-0">
                    <button 
                        type="submit" 
                        disabled={!authMode}
                        className={`w-full font-bold py-3 rounded-md shadow-md transition-colors text-lg ${authMode ? 'bg-[#7DBF00] hover:bg-[#6ca500] text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    >
                        Book now
                    </button>
                </form>
            </div>
        )}

        <style jsx>{`
            .custom-scrollbar::-webkit-scrollbar {
                width: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
                background: #ccc;
                border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: #aaa;
            }
        `}</style>
    </div>
  );
};

export default FloatingBookingEngine;
