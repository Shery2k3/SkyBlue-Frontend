import React, { createContext, useContext, useState, useEffect } from "react";
import useRetryRequest from "../../api/useRetryRequest";
import axiosInstance from "../../api/axiosConfig";

// Create context
const CartCountContext = createContext();

// Provider component
export const CartCountProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const retryRequest = useRetryRequest();

  const updateCartCount = async () => {
    try {
      const response = await retryRequest(() =>
        axiosInstance.get("/cart/count")
      );
      setCartCount(response.data.count); 
    } catch (error) {
      console.error("Failed to fetch cart count:", error);
    }
  };

  // Optionally, fetch cart count on mount
  useEffect(() => {
    updateCartCount(); // Fetch initial cart count when the provider mounts
  }, []);

  return (
    <CartCountContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartCountContext.Provider>
  );
};

// Custom hook to use cart count context
export const useCartCount = () => {
  const context = useContext(CartCountContext);
  if (!context) {
    throw new Error("useCartCount must be used within a CartCountProvider");
  }
  return context;
};
