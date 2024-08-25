import React, { createContext, useContext, useState, useEffect } from 'react';

const AgeVerificationContext = createContext();

export const useAgeVerification = () => useContext(AgeVerificationContext);

export const AgeVerificationProvider = ({ children }) => {
  const [isAgeVerified, setIsAgeVerified] = useState(false);

  useEffect(() => {
    const ageVerified = localStorage.getItem('isAgeVerified') === 'true';
    setIsAgeVerified(ageVerified);
  }, []);

  const verifyAge = () => {
    setIsAgeVerified(true);
    localStorage.setItem('isAgeVerified', 'true');
  };

  const resetAgeVerification = () => {
    setIsAgeVerified(false);
    localStorage.removeItem('isAgeVerified');
  };

  return (
    <AgeVerificationContext.Provider value={{ isAgeVerified, verifyAge, resetAgeVerification }}>
      {children}
    </AgeVerificationContext.Provider>
  );
};
