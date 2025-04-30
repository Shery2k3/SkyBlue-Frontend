import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axiosInstance, { setupInterceptors } from "../../api/axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken || null);
  const [user, setUser] = useState(storedToken ? jwtDecode(storedToken) : null);

  const login = (jwtToken, rememberMe) => {
    if (rememberMe) {
      localStorage.setItem("token", jwtToken);
    }
    setToken(jwtToken);
    const decoded = jwtDecode(jwtToken);
    setUser(decoded);
    setupInterceptors(jwtToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setupInterceptors(null);
  };

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
      setupInterceptors(token);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
