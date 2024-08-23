// src/Context/AgeVerificationContext.js
import React, { createContext, useState, useContext } from 'react';

const AgeVerificationContext = createContext();

export const AgeVerificationProvider = ({ children }) => {
  const [isAgeVerified, setIsAgeVerified] = useState(false);

  return (
    <AgeVerificationContext.Provider value={{ isAgeVerified, setIsAgeVerified }}>
      {children}
    </AgeVerificationContext.Provider>
  );
};

export const useAgeVerification = () => useContext(AgeVerificationContext);
