'use client';
import React, { useState, useEffect } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_green.css'; // Choose a theme or use the default

const DateTimeSelector = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState(''); // State to manage input value
  const [showButtons, setShowButtons] = useState(false); // State to manage visibility of buttons
  const [showDateTimePicker, setShowDateTimePicker] = useState(false); // State to manage visibility of date-time picker
  const [selectedDateTime, setSelectedDateTime] = useState(value || null); // State to temporarily store the selected date and time
  useEffect(() => {
    if (value) {
      setInputValue(value.toLocaleString()); // Update input if parent component passes a new value
    }
  }, [value]);


  // Handle input click to show buttons
  const handleInputClick = () => {
    setShowButtons((prevShowButtons) => !prevShowButtons); // Toggle state
  };



  // Handle ASAP button click
  const handleAsapClick = () => {
    setInputValue('ASAP');
    setShowButtons(false); // Hide buttons after selection
    setShowDateTimePicker(false); // Hide date-time picker if open
  };

  // Handle Later button click
  const handleLaterClick = () => {
    setShowDateTimePicker((prev) => !prev); // Toggle date-time picker visibility
    setShowButtons(false); // Hide buttons after selection
  };

   // Handle date-time selection from Flatpickr
   const handleDateChange = (selectedDate) => {
    const selected = selectedDate[0]; // Get the selected date
    setSelectedDateTime(selected); // Update local state
    onChange(selected); // Notify parent component with the selected date
  };


  // Handle OK button click to save the selected date-time to input
  const handleOkClick = () => {    
    if (selectedDateTime) {
      const formattedDate = selectedDateTime.toLocaleString(); // Format and set date as input value
      setInputValue(formattedDate);
      onChange(selectedDateTime); // Notify parent with selected date/time

    }
    setShowDateTimePicker(false); // Hide date-time picker after saving the date-time
  };

  return (
    <div className="date-time-selector">
      {/* Input field */}
      <input
        type="text"
        value={inputValue}
        onClick={handleInputClick}
        placeholder="ASAP"
        readOnly
        required
        className="px-2.5 pb-2.5 pt-4 w-full md:w-[476px] text-sm text-gray-900 bg-transparent rounded border-2 border-[#A9ACB3] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      />

      {/* Show buttons when input is clicked */}
      {showButtons && (
        <div className="button-group flex">
          <button onClick={handleAsapClick} className='bg-colorBlue w-full text-white rounded-md'>ASAP</button>
          <button onClick={handleLaterClick} className='bg-colorGreen w-full text-white rounded-md py-7'>Later</button>
        </div>
      )}

      {/* Date-Time Picker */}
      {showDateTimePicker && (
        <div className="datetime-picker-container">
          <h3>Select Date & Time</h3>
          <Flatpickr
            value={selectedDateTime}
            onChange={handleDateChange}
            options={{
              enableTime: true,
              dateFormat: 'Y-m-d H:i',
              time_24hr: true,
            }}
            className="flatpickr flatpickr-datetime"
          />
          <button onClick={handleOkClick} className="ok-button">
            OK
          </button>
        </div>
      )}

      <style jsx>{`
        .date-time-selector {
          position: relative;
          display: inline-block;
        }

        .input-field {
          width: 200px;  
          padding: 8px;
          margin: 5px;
          cursor: pointer;
          box-sizing: border-box;
        }

        .button-group {
          margin-top: 10px;
        }

        .button-group button {
          margin-right: 5px;
          padding: 10px 10px;
          cursor: pointer;
        }

        .datetime-picker-container {
          margin-top: 10px;
          padding: 10px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          width: 300px;
          text-align: center;
        }

        .flatpickr.flatpickr-datetime {
          width: 100%;
        }

        .ok-button {
          margin-top: 10px;
          padding: 5px 10px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default DateTimeSelector;
