import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import productData from "../../Data/ProductData";
import ProductSlider from "../../Components/ProductSlider/ProductSlider";
import ProductGrid from "../../Components/ProductGrid/ProductGrid";

const Home = () => {
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
    <Layout pageTitle="Home" style="style1" isLoaded={isLoaded}>
      <>
        <ProductSlider category="New Arrivals" products={productData} />
        <ProductSlider category="Best Sellers" products={productData} />
        <ProductGrid category="Exclusive Products" products={productData} />
      </>
    </Layout>
  );
};

export default Home;
