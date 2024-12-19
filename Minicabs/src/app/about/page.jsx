 'use client'
//  import React, { useState } from 'react';
//  import Datetime from '../component/value1';
//  const Aboutus = () => {
//   return (
//     <>
//     <div className="">
//     <Datetime/>
//     </div>
//     </>
//     )
// }
// export default Aboutus; 

     


import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Button, Dialog, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

const Aboutus = () => {
  const [isDivVisible, setDivVisibility] = useState(false);
  const [inputValue, setInputValue] = useState('ASAP');
  const [open, setOpen] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);


  const handleInputClick= (e) => {
    setDivVisibility(!isDivVisible);
  };


  

  const handleButtonClick = (event) => {
    const buttonValue = event.target.value;
    setInputValue(buttonValue);
    setDivVisibility(false); // Hide the options when a button is clicked
  };
  

  const handleOpen = () => {
    setOpen(true);
  };
  
  // const handleDateTimeChange = (dateTime) => {
  //   const formattedDateTime = dayjs(dateTime).format('DD-MM-YYYY HH:mm:ss');

  //   setSelectedDateTime(dateTime)
  //   setInputValue(formattedDateTime);
  //   setOpen(false);
  // };
  
  const handleClose = () => {
    setOpen(false);
  };
  

 
 

  return (  
    <>    
      <div className="">
        <input   
          type="text"
          value={inputValue}
          id="Date"                       
          onClick={handleInputClick}
          placeholder='ASAP'
        />  
      </div>
      {isDivVisible && (
        <div className="flex">
          <button
            value="ASAP"
            onClick={handleButtonClick}
            className='uppercase bg-colorBlue text-white p-3 rounded-md mr-2'
          >
            ASAP
          </button>
          <Button        
            onClick={handleOpen}
            className='uppercase bg-colorBlue text-white p-3 rounded-md' 
          >
            Later
          </Button>
            <Dialog open={open} onClose={handleClose}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>                   
              <DateTimePicker
                label="Date Time"
                 value={selectedDateTime}
               
                viewRenderers={{         
                  hours: renderTimeViewClock, 
                  minutes: renderTimeViewClock,               
                  seconds: renderTimeViewClock,
                }}
             />
 
            </LocalizationProvider>
          </Dialog>
        </div>
      )}
      <div>
  
      </div>
     
    </>
  );
};       

export default Aboutus;
