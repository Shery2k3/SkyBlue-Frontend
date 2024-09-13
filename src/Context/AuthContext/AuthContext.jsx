// AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axiosInstance, { setupInterceptors } from "../../api/axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const login = (jwtToken, rememberMe) => {
    if (rememberMe) {
      localStorage.setItem("token", jwtToken);
    }
    setToken(jwtToken);
    setupInterceptors(jwtToken); // Setup interceptors with the new token
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setupInterceptors(null); // Clear interceptors when logging out
  };

  // Setup interceptors when the token changes
  useEffect(() => {
    setupInterceptors(token);
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
