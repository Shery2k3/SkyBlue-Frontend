import React from "react";
import { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import ProductGrid from "../../Components/ProductGrid/ProductGrid";
import productData from "../../Data/ProductData";

const ExclusiveProducts = () => {
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    // Simulate API calls or other data loading processes here
    const fetchData = async () => {
      try {
        // Replace with actual data fetching logic
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading time
        setisLoading(false); // Set to true once data is loaded
      } catch (error) {
        console.error("Failed to load data:", error);
        setisLoading(false); // Handle loading failure if necessary
      }
    };

    fetchData();
  }, []);
  return (
    <Layout pageTitle="Exclusive Products" style="style1" isLoading={isLoading}>
      <ProductGrid category="Exclusive Products" products={productData} />
    </Layout>
  );
};

export default ExclusiveProducts;
