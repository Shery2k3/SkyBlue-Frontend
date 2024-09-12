// src/pages/Home.js
import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import Header from "../../Components/Header/Header";
import Banner from "../../Components/Banner/Banner";
import SubBanners from "../../Components/SubBanners/SubBanners";
import Category from "../../Components/Category/Category";
import ProductSlider from "../../Components/ProductSlider/ProductSlider";
import About from "../../Components/About/About";
import ProductGrid from "../../Components/ProductGrid/ProductGrid";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import axiosInstance from "../../api/axiosConfig";

const Home = () => {
  const [isLoading, setisLoading] = useState(true);
  const [bestSellers, setBestSellers] = useState([]);
  const [newArrival, setNewArrival] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const { token } = useContext(AuthContext);

  // Retry logic helper function
  const retryRequest = async (axiosCall, retries = 3) => {
    let attempt = 0;
    while (attempt < retries) {
      try {
        const response = await axiosCall();
        return response;
      } catch (error) {
        attempt++;
        if (
          error.response &&
          error.response.status === 401 &&
          attempt < retries
        ) {
          console.warn(`Retrying request, attempt: ${attempt}`);
        } else {
          throw error;
        }
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bestSellersResult, newArrivalResult, allProductsResult] =
          await Promise.allSettled([
            retryRequest(() =>
              axiosInstance.get(`/product/bestseller?size=10`)
            ),
            retryRequest(() =>
              axiosInstance.get(`/product/newarrivals?size=10`)
            ),
            retryRequest(() =>
              axiosInstance.get(`/product/category/-1?page=1&size=12`)
            ),
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

        if (allProductsResult.status === "fulfilled") {
          setAllProducts(allProductsResult.value.data.data);
        } else {
          console.error(
            "Failed to load All Products:",
            allProductsResult.reason
          );
        }

        setisLoading(false);
      } catch (error) {
        console.error("Failed to load data:", error);
        setisLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return (
    <Layout pageTitle="Home" style="style1" isLoading={isLoading}>
      <>
        <Header />
        <Banner />
        <SubBanners />
        <Category />
        <ProductSlider category="New Arrivals" products={newArrival} />
        <About />
        <ProductSlider category="Best Sellers" products={bestSellers} />
        <ProductGrid category="Exclusive Products" products={allProducts} />
      </>
    </Layout>
  );
};

export default Home;
