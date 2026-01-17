'use client';
import React, { useState, useEffect } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_blue.css'; 

const DateTimeSelector = ({ value, onChange, openOnMount }) => {
  const [inputValue, setInputValue] = useState('');
  const [showDateTimePicker, setShowDateTimePicker] = useState(openOnMount || false);
  const [selectedDateTime, setSelectedDateTime] = useState(value || null);

  useEffect(() => {
    if (value && value !== 'ASAP') {
      const date = new Date(value);
      if (!isNaN(date)) {
        setInputValue(date.toLocaleString('en-GB', { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric',
            hour: '2-digit', 
            minute: '2-digit' 
        }));
      }
    } else if (value === 'ASAP') {
        setInputValue('ASAP');
    }
  }, [value]);

  const handleDateChange = (selectedDate) => {
    const selected = selectedDate[0];
    setSelectedDateTime(selected);
  };

  const handleOkClick = () => {    
    if (selectedDateTime) {
      onChange(selectedDateTime);
      setShowDateTimePicker(false);
    }
  };

  const togglePicker = () => {
      setShowDateTimePicker(!showDateTimePicker);
  };

  return (
    <div className="relative w-full">
      {/* Premium Input Field */}
      <div 
        onClick={togglePicker}
        className="flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg cursor-pointer hover:border-[#193e89] transition-all shadow-sm"
      >
        <div className="flex items-center gap-3">
          <div className="text-[#193e89]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <span className="block text-[10px] uppercase text-gray-500 font-bold tracking-wider">Date & Time</span>
            <span className="text-sm font-semibold text-[#193e89]">{inputValue || 'Select Date & Time'}</span>
          </div>
        </div>
        <div className="text-[#193e89]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      {/* Modal Popup (Scoped to Booking Engine) */}
      {showDateTimePicker && (
        <div className="absolute inset-x-0 top-0 bottom-0 z-[500] flex items-center justify-center p-4">
          {/* Backdrop (Scoped) */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px] rounded-lg animate-in fade-in duration-300"
            onClick={() => setShowDateTimePicker(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white top-[-128px] p-4 rounded-2xl shadow-2xl border border-gray-100 w-full max-w-[350px] animate-in zoom-in-95 duration-300">
            <div className="flatpickr-custom-container mb-2">
                <Flatpickr
                value={selectedDateTime}
                onChange={handleDateChange}
                options={{
                    enableTime: true,
                    dateFormat: 'Y-m-d H:i',
                    time_24hr: true,
                    inline: true,
                    minDate: 'today',
                    monthSelectorType: 'static'
                }}
                className="hidden"
                />
            </div>

            <div className="mt-6 flex gap-3">
                <button 
                    onClick={() => setShowDateTimePicker(false)}
                    className="flex-1 py-3 text-sm font-bold text-gray-500 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all"
                    type="button"
                >
                    Cancel
                </button>
                <button 
                    onClick={handleOkClick}
                    className="flex-1 py-3 text-sm font-bold text-white bg-[#7DBF00] hover:bg-[#6ca500] rounded-xl shadow-[0_4px_10px_rgba(125,191,0,0.3)] transition-all active:scale-95"
                    type="button"
                >
                    Confirm Time
                </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
      .flatpickr-time.time24hr{
        margin-left:0px !important;

      }
        .flatpickr-calendar.inline {
            box-shadow: none !important;
            border: 1px solid #e5e7eb !important;
            // width: 100% !important;
            background: #fff !important;
            font-family: inherit !important;
            border-radius: 12px !important;
            overflow: hidden !important;
        }
        .flatpickr-months {
            background: #fff !important;
            height: 35px !important;
        }
        .flatpickr-months .flatpickr-month {
            color: #fff !important;
            fill: #fff !important;
            background:#193d89 !important;
        }
        .flatpickr-current-month {
            color: #fff !important;
            font-weight: 800 !important;
        }

        /* Weekday Header Blue Background */
        .flatpickr-weekdays {
            background: #193d89 !important;
            height: 28px !important;
        }
        .flatpickr-weekday {
        background:#193d89 !important;
            color: #fff !important;
            font-weight: 700 !important;
            text-transform: uppercase !important;
            font-size: 0.75rem !important;
        }

        /* Day Styling */
        .flatpickr-day {
            color: #374151 !important;
            font-weight: 500 !important;
            border-radius: 6px !important;
            height: 30px !important;
            line-height: 30px !important;
            width: 40px !important;
            max-width: 30px !important;
            font-size: 0.8rem !important;
            margin: 1px auto !important;
        }
        .flatpickr-day:hover {
            background: #f3f4f6 !important;
        }
        .flatpickr-day.selected {
            background: #193d89 !important;
            border-color: #193d89 !important;
            color: #fff !important;
        }
        .flatpickr-day.prevMonthDay, .flatpickr-day.nextMonthDay {
            color: #9ca3af !important;
        }

        /* Time Styling */
        .flatpickr-time {
            border-top: 1px solid #f3f4f6 !important;
            margin-top: 10px !important;
            padding-top: 10px !important;
            background: #fff !important;
        }
        .flatpickr-time input {
            color: #374151 !important;
            font-weight: 800 !important;
            font-size: 1rem !important;
        }
        .flatpickr-time .flatpickr-time-separator {
            color: #374151 !important;
        }
        .flatpickr-months .flatpickr-prev-month, .flatpickr-months .flatpickr-next-month {
            color: #193d89 !important;
            padding: 10px !important;
        }
            .flatpickr-time{
            padding-top:0px !important;
            }
      `}</style>
    </div>
  );
};


export default DateTimeSelector;
