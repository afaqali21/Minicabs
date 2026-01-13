'use client'
// components/DateTimeSelector.js
import React, { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_green.css'; // Choose a theme or use the default

const DateTimeSelector = () => {
  const [inputValue, setInputValue] = useState(''); // State to manage input value
  const [showButtons, setShowButtons] = useState(false); // State to manage visibility of buttons
  const [showPopup, setShowPopup] = useState(false); // State to manage visibility of popup
  const [selectedDateTime, setSelectedDateTime] = useState(null); // State to temporarily store the selected date and time

  // Handle input click to show buttons
  const handleInputClick = () => {
    setShowButtons(true);
  };

  // Handle ASAP button click
  const handleAsapClick = () => {
    setInputValue('ASAP');
    setShowButtons(false); // Hide buttons after selection
    setShowPopup(false); // Ensure the popup is hidden
  };

  // Handle Later button click
  const handleLaterClick = () => {
    setShowPopup(true); // Show popup
    setShowButtons(false); // Hide buttons after selection
  };

  // Handle date selection from Flatpickr
  const handleDateChange = (selectedDate) => {
    setSelectedDateTime(selectedDate[0]); // Temporarily store the selected date and time
  };

  // Handle OK button click to save the selected date-time to input
  const handleOkClick = () => {
    if (selectedDateTime) {
      setInputValue(selectedDateTime.toLocaleString()); // Format and set date as input value
    }
    setShowPopup(false); // Hide popup after saving the date-time
  };

  // Handle popup close
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="date-time-selector">
      {/* Input field */}
      <input
        type="text"
        value={inputValue}
        onClick={handleInputClick}
        placeholder="Select ASAP or Later"
        readOnly
        className="input-field"
      />

      {/* Show buttons when input is clicked */}
      {showButtons && (
        <div className="button-group">
          <button onClick={handleAsapClick}>ASAP</button>
          <button onClick={handleLaterClick}>Later</button>
        </div>
      )}

      {/* Popup for merged date and time pickers */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Select Date & Time</h3>
            <Flatpickr
              value={selectedDateTime}
              onChange={handleDateChange}
              options={{
                enableTime: true,
                dateFormat: 'd-m-Y H:i',
                time_24hr: true,
              }}
              className="flatpickr"
            />
            {/* OK button at the bottom center */}
            <button onClick={handleOkClick} className="ok-button">
              OK
            </button>
            <button onClick={handleClosePopup} className="close-button">
              Close
            </button>
          </div>
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
          padding: 5px 10px;
          cursor: pointer;
        }

        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .popup-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          width: 300px;
          text-align: center;
        }

        .flatpickr {
          margin-bottom: 20px;
          width: 100%;
        }

        .ok-button {
          margin-top: 10px;
          padding: 5px 10px;
          cursor: pointer;
        }

        .close-button {
          margin-top: 10px;
          padding: 5px 10px;
          cursor: pointer;
          background-color: red;
          color: white;
          margin-left: 10px;
        }
      `}</style>
    </div>
  );
};

export default DateTimeSelector;

