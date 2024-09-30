import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import Header from "../../Components/Header/Header";
import Banner from "../../Components/Banner/Banner";
import ProductGrid from "../../Components/ProductGrid/ProductGrid";
import useRetryRequest from "../../api/useRetryRequest";
import axiosInstance from "../../api/axiosConfig";

const BestSeller = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const retryRequest = useRetryRequest();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await retryRequest(() =>
          axiosInstance.get("/product/bestseller?size=12")
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
    <Layout pageTitle="Best Seller" style="style1" isLoading={isLoading}>
      <Header />
      <ProductGrid category="Best Sellers" products={products} />
    </Layout>
  );
};

export default BestSeller;
