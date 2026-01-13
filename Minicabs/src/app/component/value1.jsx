// import * as React from 'react';
// import TextField from '@mui/material/TextField';
// import Stack from '@mui/material/Stack';
// import Autocomplete from '@mui/material/Autocomplete';

// export default function FreeSolo() {
//   return (
  
    
//       <Autocomplete
//         freeSolo
//         id="free-solo-demo"
//         disableClearable
//         options={pickupauto.map((option) => option.Pickup)}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             label="Search input"
//             InputProps={{
//               ...params.InputProps,
//               type: 'search',
//             }}
//           />
//         )}
//       />
//   );
// }

// // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
// const pickupauto = [
//   { Pickup: 'London Heathrow Airport Terminal 1' },
//   { Pickup: 'London Heathrow Airport Terminal 2'},
//   { Pickup: 'London Heathrow Airport Terminal 3' },
//   { Pickup: 'London Heathrow Airport Terminal 4' },
//   { Pickup: 'London Heathrow Airport Terminal 5' },
//   { Pickup: "London Gatwick North Airport" },
//   { Pickup: 'London Gatwick South Airport' },
//   { Pickup: 'London luton Airport' },
//   { Pickup: 'London City Airport' },
//   { Pickup: 'London Stansted Airport' },
//   { Pickup: 'London Southend Airport'   },
  
// ];

// import React, { useState } from 'react';
// import Select from 'react-select';

// const options = [
//   { value: 'London Heathrow Airport Terminal 1', label: 'London Heathrow Airport Terminal 1' },
//   { value: 'London Heathrow Airport Terminal 2', label: 'London Heathrow Airport Terminal 2' },
//   { value: 'London Heathrow Airport Terminal 3', label: 'London Heathrow Airport Terminal 3' },
//   { value: 'London Heathrow Airport Terminal 4', label: 'London Heathrow Airport Terminal 4' },
//   { value: 'London Heathrow Airport Terminal 5', label: 'London Heathrow Airport Terminal 5' },
//   { value: 'London Gatwick North Airport', label: 'London Gatwick North Airport' },
//   { value: 'London Gatwick South Airport', label: 'London Gatwick South Airport' },

// ];

// export default function App() {
//   const [selectedOption, setSelectedOption] = useState(null);

//   return (
//     <div className="App">
//       <Select
//         defaultValue={selectedOption}
//         onChange={setSelectedOption}
//         options={options}
//       />
//     </div>
//   );
// }
// components/AutoCompleteInput.js

const AutoCompleteInput = () => {
    return (
      <div>
       <div className="relative">
                  <input type="text" list="fruits" id="Pickup" className="block px-2.5 pb-2.5 pt-4 w-full md:w-[476px]
                 text-sm text-gray-900 bg-transparent rounded border-2 border-[#A9ACB3] appearance-none
                 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                  <label htmlFor="Pickup" className="absolute text-sm text-gray-500  duration-300 
                transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2
               peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
               peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Pickup At</label>
                
        <datalist id="fruits">
          <option value="London Heathrow Airport Terminal 1" />
          <option value="London Heathrow Airport Terminal 2" />
          <option value="London Heathrow Airport Terminal 3" />
          <option value="London Heathrow Airport Terminal 4" />
          <option value="London Heathrow Airport Terminal 5" />
          <option value="London Gatwick North Airport" />
          <option value="London Gatwick South Airport" />
          <option value="London Luton Airport" />
          <option value="London City Airport" />
          <option value="London Stansted Airport" />
          <option value="London Southend Airport" />
          {/* Add more options as needed */}
        </datalist>
        </div>
      </div>  
    );
  };
  
  export default AutoCompleteInput;

// import React, { useState } from 'react';

// const AutocompleteInput = () => {
//   const [inputValue, setInputValue] = useState('');

//   const countries = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua & Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan'];

//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//   };
          
//   return (
//     <div>
//      <div className="relative">
//                   <input type="text" value={inputValue}
//         onChange={handleInputChange}
//         list="countries" id="Pickup" className="block px-2.5 pb-2.5 pt-4 w-full md:w-[476px]
//                  text-sm text-gray-900 bg-transparent rounded border-2 border-[#A9ACB3] appearance-none
//                  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
//                   <label htmlFor="Pickup" className="absolute text-sm text-gray-500  duration-300 
//                 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2
//                peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
//                peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Pickup At</label>
//                 </div>
//       <datalist id="countries">
//         {countries.map((country, index) => (
//           <option key={index} value={country} />
//         ))}
//       </datalist>
//     </div>
//   );
// };

// export default AutocompleteInput;

  