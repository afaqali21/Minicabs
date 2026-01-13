// 'use client'
// import React, { useState } from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
// import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

// function DateInputField() {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [showDateTimePicker, setShowDateTimePicker] = useState(false);

//   const handleASAPClick = () => {
//     const currentDate = new Date();
//     setSelectedDate(currentDate);
//   };

//   const handleLaterClick = () => {
//     setShowDateTimePicker(true);
//   };

//   const handleDateTimeChange = (date) => {
//     setSelectedDate(date);
//     setShowDateTimePicker(false);
//   };

//   return (
//     <div>
//     <TextField
//       label="Date and Time"
//       value={selectedDate ? selectedDate.toISOString() : ""}
//       fullWidth
//       variant="outlined"
//     />
//     <Button onClick={handleASAPClick} variant="outlined">
//       ASAP
//     </Button>
//     <Button onClick={handleLaterClick} variant="outlined">
//       Later
//     </Button>
//     {showDateTimePicker && (
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DateTimePicker
//         renderInput={(props) => <TextField {...props} fullWidth />}
//         label="Select Date and Time"
//         value={selectedDate}
//         onChange={handleDateTimeChange}
//         ampm={false}
//         disablePast
//       />
//       </LocalizationProvider>
//     )}
//   </div>
// );
// }

// export default DateInputField;

