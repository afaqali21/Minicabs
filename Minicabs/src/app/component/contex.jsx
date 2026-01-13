'use client'
import React, { createContext, useContext, useState } from 'react';

// Create a context for the shared state
const InputContext = createContext();

// Create a provider component to wrap your app
export function InputProvider({ children }) {
  const [input1Value, setInput1Value] = useState('');
  const [input2Value, setInput2Value] = useState('');

  return (
    <InputContext.Provider
      value={{ input1Value, setInput1Value, input2Value, setInput2Value }}
    >
      {children}
    </InputContext.Provider>
  );
}

// Create a custom hook to access the context
export function useInput() {
  return useContext(InputContext);
}
