import React from "react";
import { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import ProductGrid from "../../Components/ProductGrid/ProductGrid";
import productData from "../../Data/ProductData";

const BestSeller = () => {
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    // Simulate API calls or other data loading processes here
    const fetchData = async () => {
      try {
        // Replace with actual data fetching logic
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading time
        setIsLoaded(false); // Set to true once data is loaded
      } catch (error) {
        console.error("Failed to load data:", error);
        setIsLoaded(false); // Handle loading failure if necessary
      }
    };

    fetchData();
  }, []);
  
  return (
    <Layout pageTitle="Best Seller" style="style1" isLoaded={isLoaded}>
      <ProductGrid category="Best Sellers" products={productData} />
    </Layout>
  );
};

export default BestSeller;
