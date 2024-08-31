// src/pages/Home.js
import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import Category from "../../Components/Category/Category";
import ProductSlider from "../../Components/ProductSlider/ProductSlider";
import ProductGrid from "../../Components/ProductGrid/ProductGrid";
import axiosInstance from "../../api/axiosConfig"; // Import the Axios instance

const Home = () => {
  const [isLoading, setisLoading] = useState(true);
  const [bestSellers, setBestSellers] = useState([]);
  const [newArrival, setNewArrival] = useState([]);
  const [allProducts, setAllProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bestSellersResult, newArrivalResult, allProducts] = await Promise.allSettled([
          axiosInstance.get(`/product/bestseller`),
          axiosInstance.get(`/product/newarrivals`),
          axiosInstance.get(`/product/category/-1?page=1&size=12`),
        ]);

        if (bestSellersResult.status === "fulfilled") {
          setBestSellers(bestSellersResult.value.data);
        } else {
          console.error(
            "Failed to load bestsellers:",
            bestSellersResult.reason
          );
        }

        if (newArrivalResult.status === "fulfilled") {
          setNewArrival(newArrivalResult.value.data);
        } else {
          console.error(
            "Failed to load new arrivals:",
            newArrivalResult.reason
          );
        }

        if (allProducts.status === "fulfilled") {
          setAllProducts(allProducts.value.data.data);
        } else {
          console.error(
            "Failed to load All Products:",
            allProducts.reason
          );
        }

        setisLoading(false);
      } catch (error) {
        console.error("Failed to load data:", error);
        setisLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout pageTitle="Home" style="style1" isLoading={isLoading}>
      <>
        <Category />
        <ProductSlider category="New Arrivals" products={newArrival} />
        <ProductSlider category="Best Sellers" products={bestSellers} />
        <ProductGrid category="Exclusive Products" products={allProducts} />
      </>
    </Layout>
  );
};

export default Home;
