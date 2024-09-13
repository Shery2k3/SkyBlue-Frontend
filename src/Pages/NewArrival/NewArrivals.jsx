import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import Header from "../../Components/Header/Header";
import Banner from "../../Components/Banner/Banner";
import ProductGrid from "../../Components/ProductGrid/ProductGrid";
import useRetryRequest from "../../api/useRetryRequest"; // Import the custom hook
import axiosInstance from "../../api/axiosConfig"; // Import Axios instance

const NewArrivals = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const retryRequest = useRetryRequest(); // Use the retry hook

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await retryRequest(() =>
          axiosInstance.get("/product/newarrivals?size=12")
        );
        setProducts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [retryRequest]);

  return (
    <Layout pageTitle="New Arrivals" style="style1" isLoading={isLoading}>
      <Header />
      <Banner />
      <ProductGrid category="New Arrivals" products={products} />
    </Layout>
  );
};

export default NewArrivals;
