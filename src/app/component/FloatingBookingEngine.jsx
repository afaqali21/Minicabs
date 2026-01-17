import React, { useEffect, useState, useRef } from 'react';
import DateTimeSelector from '../component/datetime';
import { useRouter } from 'next/navigation';

const FloatingBookingEngine = ({ 
    pickup, setPickup, 
    destination, setDestination, 
    stops, setStops,
    onMapUpdate 
}) => {
  const router = useRouter();

  const [activeItem, setActiveItem] = useState('minicab');
  const [selectedRadio, setSelectedRadio] = useState('oneway'); // 'oneway' or 'return'
  const addStops = stops || [];
  const setAddStops = setStops;
  const [additionalFields, setAdditionalFields] = useState([]);
  
  const [dateTime1, setDateTime1] = useState(null); 
  const [dateTime2, setDateTime2] = useState(null);
  const [isScheduled, setIsScheduled] = useState(false); // Toggle for ASAP / Scheduled
  const [isReturnScheduled, setIsReturnScheduled] = useState(false); // Toggle for Return ASAP / Scheduled

  const scrollContainerRef = useRef(null);
  const scheduledRef = useRef(null);
  const returnRef = useRef(null);
  const tripTypeRef = useRef(null);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const paymentSectionRef = useRef(null);
  const authSectionRef = useRef(null);

  const [step, setStep] = useState(1); // 1: Form, 2: Vehicle Selection, 3: Payment
  const [selectedCar, setSelectedCar] = useState({ id: 1, name: 'Saloon', type: 'Standard family size', image: '/booking-engine-img/Saloon-new.png', passengers: 4, suitcases: 2, luggage: 2, price: '£37.00', promoPrice: '£32.00' });
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [authMode, setAuthMode] = useState('guest'); // 'login', 'register', 'guest'

  // Auth form states
  const [authData, setAuthData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: ''
  });

  const [showAuthSection, setShowAuthSection] = useState(false);

  // Promo state
  const [promoInput, setPromoInput] = useState('');
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState(null);

  // Airport state
  const [airportData, setAirportData] = useState({
    airline: '',
    flightNumber: '',
    arrivingFrom: '',
    meetTime: ''
  });

  const handleAirportChange = (e) => {
    const { name, value } = e.target;
    setAirportData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (step === 1 && dateTime1 && tripTypeRef.current) {
        setTimeout(() => {
            tripTypeRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
    }
  }, [dateTime1, step]);

  const handleApplyPromo = () => {
    if (promoInput.toUpperCase() === 'SAVE10') {
        const basePrice = parseFloat(selectedCar?.promoPrice?.replace('£', '') || selectedCar?.price?.replace('£', '') || 0);
        const discount = basePrice * 0.1;
        setDiscountAmount(discount);
        setAppliedPromo(promoInput.toUpperCase());   
        setShowPromoInput(false);
    } else {
        alert("Invalid promo code. Try 'SAVE10' for 10% off!");
    }
  };

  const handleAuthChange = (e) => {
    const { name, value } = e.target;
    setAuthData(prev => ({ ...prev, [name]: value }));
  };

  const cars = [
    { id: 1, name: 'Saloon', type: 'Standard family size', image: '/booking-engine-img/Saloon-new.png', passengers: 4, suitcases: 2, luggage: 2, price: '£37.00', promoPrice: '£32.00' },
    { id: 2, name: 'Estate', type: 'Standard family size', image: '/booking-engine-img/Estate-new.png', passengers: 4, suitcases: 2, luggage: 2, price: '£44' },
    { id: 3, name: '7 Seater', type: 'Large family', image: '/booking-engine-img/7-Seater-new.png', passengers: 6, suitcases: 3, luggage: 5, price: '£57' },
    { id: 4, name: '8 Seater', type: 'Extra large family', image: '/booking-engine-img/8-Seater-new.png', passengers: 7, suitcases: 4, luggage: 6, price: '£69' },
    { id: 5, name: '9 Seater', type: 'Extra large family', image: '/booking-engine-img/9-Seater-new.png', passengers: 8, suitcases: 5, luggage: 7, price: '£77' },
    { id: 6, name: 'Executive', type: 'Executive', image: '/booking-engine-img/executive-new.png', passengers: 4, suitcases: 2, luggage: 2, price: '£53' },
  ];

  // --- Autocomplete State ---
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destSuggestions, setDestSuggestions] = useState([]);
  const [stopSuggestions, setStopSuggestions] = useState({}); // { index: [suggestions] }
  const shouldFetchPickup = useRef(true);
  const shouldFetchDest = useRef(true);
  const shouldFetchStops = useRef({}); // { index: boolean }

  // Auto-scroll logic
  useEffect(() => {
    if (isScheduled && scheduledRef.current) {
        setTimeout(() => {
            scheduledRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
  }, [isScheduled]);

  useEffect(() => {
    if (selectedRadio === 'return' && returnRef.current) {
        setTimeout(() => {
            returnRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
  }, [selectedRadio]);

  // Progressive Step 3 Section Scroll
  const isAirportComplete = activeItem === 'airport' ? (
    isScheduled ? (airportData.flightNumber && airportData.meetTime) : true
  ) : true;

  useEffect(() => {
    if (step === 3) {
        if (isAirportComplete && paymentSectionRef.current) {
            setTimeout(() => {
                paymentSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        }
    }
  }, [isAirportComplete, step]);

  useEffect(() => {
    if (step === 3 && showAuthSection && nameRef.current) {
        setTimeout(() => {
            nameRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }
  }, [showAuthSection, step]);

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
    shouldFetchStops.current[index] = true;
  };

  // Form validation for Step 3
  const isFormComplete = () => {
    // Check if airport details are required and filled
    if (activeItem === 'airport' && isScheduled) {
      if (!airportData.flightNumber || !airportData.meetTime) return false;
    }

    // Check if payment method is selected
    if (!paymentMethod) return false;

    // Check if auth mode is selected
    if (!authMode) return false;

    // Check auth fields based on mode
    if (authMode === 'login') {
      if (!authData.mobile || !authData.password) return false;
    } else if (authMode === 'register') {
      if (!authData.name || !authData.mobile || !authData.email || !authData.password) return false;
    } else if (authMode === 'guest') {
      if (!authData.name || !authData.mobile || !authData.email) return false;
    }

    return true;
  };

  // --- Autocomplete Logic (Duplicated/Shared from BookingForm) ---
  const fetchSuggestions = async (query, type, index = null) => {
    if (!query || query.length < 3) {
        if (type === 'pickup') setPickupSuggestions([]);
        if (type === 'destination') setDestSuggestions([]);
        if (type === 'stop' && index !== null) {
            setStopSuggestions(prev => ({ ...prev, [index]: [] }));
        }
        return;
    }
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=gb&limit=5`);
        const data = await response.json();
        if (type === 'pickup') setPickupSuggestions(data);
        if (type === 'destination') setDestSuggestions(data);
        if (type === 'stop' && index !== null) {
            setStopSuggestions(prev => ({ ...prev, [index]: data }));
        }
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

  // Debounce Stops
  useEffect(() => {
    const timer = setTimeout(() => {
        addStops.forEach((stop, index) => {
            if (stop && shouldFetchStops.current[index]) {
                fetchSuggestions(stop, 'stop', index);
            }
        });
    }, 500);
    return () => clearTimeout(timer);
  }, [addStops]);

  const handlePickupChange = (e) => {
    setPickup(e.target.value);
    shouldFetchPickup.current = true;
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
    shouldFetchDest.current = true;
  };

  const selectSuggestion = (suggestion, type, index = null) => {
      const address = suggestion.display_name;
      if (type === 'pickup') {
          shouldFetchPickup.current = false;
          setPickup(address);
          setPickupSuggestions([]);
      } else if (type === 'destination') {
          shouldFetchDest.current = false;
          setDestination(address);
          setDestSuggestions([]);
      } else if (type === 'stop' && index !== null) {
          shouldFetchStops.current[index] = false;
          const newStops = [...addStops];
          newStops[index] = address;
          setAddStops(newStops);
          setStopSuggestions(prev => ({ ...prev, [index]: [] }));
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
    <div className="bg-white rounded-lg shadow-2xl p-6 w-[500px] max-w-lg relative flex flex-col h-[600px]">
        {step === 1 ? (
            <div className="flex flex-col h-full">
                {/* Service Type Tabs (Static Top) */}
                <ul className='grid grid-cols-5 gap-1 mb-6 flex-shrink-0'>
                    {['minicab', 'airport', 'courier', 'removal', 'wheelchair'].map((item) => (
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
                            <span className="text-[10px] sm:text-xs font-semibold capitalize">{item}</span>
                        </li>
                    ))}
                </ul>

                <form onSubmit={handleFormSubmit} className="flex flex-col flex-1 overflow-hidden">
                    {/* Scrollable Content Area (Middle) */}
                    <div ref={scrollContainerRef} className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4 mb-4">
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
                                            placeholder='Airport, Station, Postcode e.g'
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
                          <div className="flex items-center cursor-pointer text-gray-600 hover:text-black pt-2" onClick={handleAddField}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm font-semibold">Add stop</span>
                        </div>
                        {additionalFields.map((field, index) => (
                            <div key={index} className="relative">
                                <div className="flex gap-2 mb-2">
                                     <input 
                                         type="text" 
                                         value={addStops[index] || ''} 
                                         onChange={(e) => handleAddstopChange(e, index)} 
                                         className="block w-full text-sm text-gray-900 bg-white rounded border border-gray-300 p-2 outline-none focus:ring-1 focus:ring-blue-500" 
                                         placeholder={`Airport, Station, Postcode e.g`} 
                                         autoComplete="off"
                                     />
                                     <button type="button" onClick={() => handleRemoveField(index)} className="border-none text-gray-400 hover:text-red-500 transition-colors flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                        </svg>
                                     </button>
                                </div>
                                {stopSuggestions[index] && stopSuggestions[index].length > 0 && (
                                    <ul className="absolute left-0 right-0 top-[38px] z-[60] bg-white border border-gray-300 rounded-md shadow-xl max-h-40 overflow-y-auto">
                                        {stopSuggestions[index].map((item, i) => (
                                            <li key={i} className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 border-b last:border-b-0" onClick={() => selectSuggestion(item, 'stop', index)}>
                                                {item.display_name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                                <div className="relative">
                                    <label className="block text-gray-700 text-sm font-bold mb-1">Drop Off address</label>
                                    <div className="relative">
                                        <input 
                                            type="text" 
                                            value={destination} 
                                            onChange={handleDestinationChange}
                                            placeholder='Airport, Station, Postcode e.g'
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
                        
                      

                        <div className="flex gap-2 pt-2">
                            <button 
                                type="button" 
                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold border-2 transition-all
                                    ${!isScheduled ? 'border-[#193e89] text-white bg-[#193d89] shadow-md' : 'border-gray-200 text-gray-500 bg-gray-50 hover:border-gray-300'}`} 
                                onClick={() => { setIsScheduled(false); setDateTime1(null); }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                ASAP
                            </button>
                            <button 
                                type="button" 
                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold border-2 transition-all
                                    ${isScheduled ? 'border-[#193e89] text-white bg-[#193d89] shadow-md' : 'border-gray-200 text-gray-500 bg-gray-50 hover:border-gray-300'}`} 
                                onClick={() => { setIsScheduled(true); }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Scheduled
                            </button>
                        </div>

                        {isScheduled && (
                            <div ref={scheduledRef} className="mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                <DateTimeSelector value={dateTime1} onChange={setDateTime1} openOnMount={false} />
                            </div>
                        )}

                         <div ref={tripTypeRef} className="flex items-center gap-4 pt-2 pl-2">
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
                             <div ref={returnRef} className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200 animate-in zoom-in-95 duration-200">
                                <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Return Trip Date & Time</h3>
                                <div className="mt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <DateTimeSelector value={dateTime2} onChange={setDateTime2} openOnMount={false} />
                                </div>
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
            // Step-3: Payment Options & Passenger Info
            <div className="flex flex-col h-full overflow-hidden">
                {/* Scrollable Content (Middle) */}
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4 mb-4">
                    {/* Journey Detail Header */}
                    <div className="flex justify-between items-center px-1">
                        <h2 className="text-lg font-bold text-gray-700">Journey detail</h2>
                        <button 
                            onClick={handleEditRide}
                            className="border-none text-sm font-semibold text-gray-400 flex items-center hover:text-[#193e89]"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 pb-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                            Edit ride
                        </button>
                    </div>

                    {/* Journey Stats */}
                    <div className="space-y-1.5 px-1 text-[13px] text-gray-600">
                        <div className="grid grid-cols-[80px_1fr] gap-2">
                            <span className="font-bold">Pick up:</span>
                            <span className="truncate">{pickup || 'Not set'}</span>
                        </div>
                        {addStops.map((stop, index) => stop && (
                            <div key={index} className="grid grid-cols-[80px_1fr] gap-2">
                                <span className="font-bold">Stop {index + 1}:</span>
                                <span className="truncate">{stop}</span>
                            </div>
                        ))}
                        <div className="grid grid-cols-[80px_1fr] gap-2">
                            <span className="font-bold">Drop Off:</span>
                            <span className="truncate">{destination || 'Not set'}</span>
                        </div>
                        <div className="grid grid-cols-[80px_1fr] gap-2">
                            <span className="font-bold">Date:</span>
                            <span>
                                {dateTime1 ? (
                                    <>
                                        {new Date(dateTime1).toLocaleDateString('en-GB')} {new Date(dateTime1).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                                    </>
                                ) : 'ASAP'}
                            </span>
                        </div>
                        <div className="grid grid-cols-[80px_1fr] gap-2">
                            <span className="font-bold">{selectedCar?.name || 'Car'}:</span>
                            <span className="text-gray-500">{selectedCar?.type || 'Standard'}</span>
                        </div>
                    </div>

                    <hr className="border-gray-400" />

                    {/* Airport Details Section (Conditional) */}
                    {activeItem === 'airport' && isScheduled && (
                        <div className="pt-1 animate-in fade-in slide-in-from-top-2 duration-300">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 px-1">Airport details</h3>
                            <div className="grid grid-cols-2 gap-3 px-1">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Flight Number</label>
                                    <input 
                                        type="text" 
                                        name="flightNumber"
                                        value={airportData.flightNumber}
                                        onChange={handleAirportChange}
                                        className="w-full p-2.5 bg-white border border-gray-300 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#193d89]" 
                                        placeholder="e.g. BA123"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Meet you</label>
                                    <select 
                                        name="meetTime"
                                        value={airportData.meetTime}
                                        onChange={handleAirportChange}
                                        className="w-full p-2.5 bg-white border border-gray-300 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#193d89] appearance-none cursor-pointer"
                                    >
                                        <option value="">Please select</option>
                                        <option value="15">15 Minutes</option>
                                        <option value="30">30 Minutes</option>
                                        <option value="45">45 Minutes</option>
                                        <option value="60">60 Minutes</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}


                    {/* Payment Options Section */}
                    {isAirportComplete && (
                        <div ref={paymentSectionRef} className="animate-in fade-in slide-in-from-top-2 duration-300">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 px-1 pt-2">Payment options</h3>
                            <div className="grid grid-cols-4 gap-2 px-1">
                                {[
                                    { id: 'cash', name: 'Cash', img: 'cash' },
                                    { id: 'card', name: 'Card', img: 'card' },
                                    { id: 'apple', name: 'Apple pay', img: 'apple-pay' },
                                    { id: 'google', name: 'Google pay', img: 'google-pay' }
                                ].map((m) => (
                                    <div 
                                        key={m.id}
                                        onClick={() => { setPaymentMethod(m.id); setShowAuthSection(true); }}
                                        className={`border-2 rounded-xl p-1 flex flex-col items-center justify-center cursor-pointer transition-all gap-1 h-18
                                            ${paymentMethod === m.id ? 'border-[#193d89] bg-gradient-to-b from-[#193d89] to-[#142954] text-white shadow-lg' : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200 shadow-sm'}`}
                                    >
                                        <div className="w-8 h-8 flex items-center justify-center mb-1">
                                            <img 
                                                src={paymentMethod === m.id ? `/booking-engine-img/${m.img}-active.png` : `/booking-engine-img/${m.img}.png`} 
                                                alt={m.name} 
                                                className="w-100% h-100% object-contain transition-all"
                                            />
                                        </div>
                                        <span className="text-[10px] font-bold text-center leading-tight">{m.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Promo & Total Price Row */}
                    {isAirportComplete && (
                        <div className="flex flex-col gap-2 pt-2 px-1">
                            <div className="flex justify-between items-center">
                                {!appliedPromo ? (
                                    <button 
                                        onClick={() => setShowPromoInput(!showPromoInput)}
                                        className="border-none text-sm font-semibold text-gray-400 hover:text-[#193d89] transition-colors"
                                    >
                                        {showPromoInput ? 'Cancel' : 'Click to use promo code'}
                                    </button>
                                ) : (
                                    <div className="flex items-center gap-2 text-[#7DBF00] text-sm font-bold">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l5-5z" clipRule="evenodd" />
                                        </svg>
                                        Promo code {appliedPromo} applied!
                                    </div>
                                )}
                                <div className="flex items-center gap-3">
                                    {(appliedPromo || selectedCar?.promoPrice) && (
                                        <span className="text-gray-400 text-sm font-bold line-through">
                                            {selectedCar?.price || '£0.00'}
                                        </span>
                                    )}
                                    <span className="text-[#193d89] text-xl font-extrabold">
                                        £{(parseFloat(selectedCar?.promoPrice?.replace('£', '') || selectedCar?.price?.replace('£', '') || 0) - discountAmount).toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {showPromoInput && !appliedPromo && (
                                <div className="flex gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
                                    <input 
                                        type="text" 
                                        value={promoInput}
                                        onChange={(e) => setPromoInput(e.target.value)}
                                        placeholder="Enter SAVE10"
                                        className="flex-1 p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#193d89]"
                                    />
                                    <button 
                                        onClick={handleApplyPromo}
                                        className="px-4 py-2 bg-[#193d89] text-white text-sm font-bold rounded-lg hover:bg-[#142954] transition-all"
                                    >
                                        Apply
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {isAirportComplete && <hr className="border-gray-400" />}

                    {isAirportComplete && showAuthSection && (
                        <div ref={authSectionRef} className="pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                            <h3 className="text-center text-lg font-bold text-gray-800 mb-4 tracking-wide">Passenger information</h3>
                            
                            {/* Auth Grid */}
                            <div className="grid grid-cols-4 gap-2 px-1">
                                {[
                                    { id: 'login', label: 'Login', img: 'login.png' },
                                    { id: 'register', label: 'Register', img: 'register.png' },
                                    { id: 'guest', label: 'Book as guest', img: 'user2.png' },
                                    { id: 'google', label: 'Book via Google', img: 'google-log.png' }
                                ].map((item) => (
                                    <div 
                                        key={item.id} 
                                        onClick={() => item.id !== 'google' && setAuthMode(item.id)}
                                        className={`border rounded-lg py-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 h-14
                                            ${authMode === item.id ? 'bg-[#193d89] text-white border-[#193d89] shadow-md' : 'bg-white text-gray-500 border-gray-300 hover:border-gray-400 shadow-sm'}`}
                                    >
                                        <span className="text-[10px] font-bold text-center px-1 leading-tight">{item.label}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Conditional Auth Fields */}
                            <div className="space-y-3 mt-4 px-1">
                                {authMode === 'login' && (
                                    <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <input ref={nameRef} type="text" name="mobile" placeholder="Mobile Number" value={authData.mobile} onChange={handleAuthChange} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#193d89] transition-all" required />
                                        <input type="password" name="password" placeholder="Password" value={authData.password} onChange={handleAuthChange} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#193d89] transition-all" required />
                                        <div className="text-right">
                                            <button 
                                                type="button"
                                                className="border-none text-xs text-[#193d89] hover:text-[#142954] font-semibold transition-colors"
                                            >
                                                Forgot password?
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {authMode === 'register' && (
                                    <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <input ref={nameRef} type="text" name="name" placeholder="Name" value={authData.name} onChange={handleAuthChange} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#193d89] transition-all" required />
                                        <input type="text" name="mobile" placeholder="Number" value={authData.mobile} onChange={handleAuthChange} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#193d89] transition-all" required />
                                        <input type="email" name="email" placeholder="Email" value={authData.email} onChange={handleAuthChange} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#193d89] transition-all" required />
                                        <input type="password" name="password" placeholder="Password" value={authData.password} onChange={handleAuthChange} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#193d89] transition-all" required />
                                    </div>
                                )}
                                {authMode === 'guest' && (
                                    <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <input ref={nameRef} type="text" name="name" placeholder="Name" value={authData.name} onChange={handleAuthChange} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#193d89] transition-all" required />
                                        <input type="text" name="mobile" placeholder="Number" value={authData.mobile} onChange={handleAuthChange} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#193d89] transition-all" required />
                                        <input type="email" name="email" placeholder="Email" value={authData.email} onChange={handleAuthChange} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#193d89] transition-all" required />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Fixed Bottom Button */}
                <div className="mt-auto pt-2 bg-white flex-shrink-0">
                    <button 
                        type="button"
                        onClick={handleFormSubmit}
                        disabled={!isFormComplete()}
                        className={`w-full font-bold py-3.5 rounded-xl shadow-[0_4px_15px_rgba(125,191,0,0.3)] transition-all text-lg active:scale-[0.98]
                            ${isFormComplete() ? 'bg-[#7DBF00] hover:bg-[#6ca500] text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'}`}
                    >
                        Lets Go
                    </button>
                </div>
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
