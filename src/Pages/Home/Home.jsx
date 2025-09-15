// src/pages/Home.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import Notice from "../../Components/Notice/Notice";
import Header from "../../Components/Header/Header";
import Banner from "../../Components/Banner/Banner";
import SubBanners from "../../Components/SubBanners/SubBanners";
import Category from "../../Components/Category/Category";
import ProductSlider from "../../Components/ProductSlider/ProductSlider";
import About from "../../Components/About/About";
import ProductGrid2 from "../../Components/ProductGrid2/ProductGrid2";
import useRetryRequest from "../../api/useRetryRequest";
import axiosInstance from "../../api/axiosConfig";
import { useCartCount } from "../../Context/CartCount/CartCount";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bestSellers, setBestSellers] = useState([]);
  const [newArrival, setNewArrival] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [showNotice, setShowNotice] = useState(false);
  const { cartCount, updateCartCount } = useCartCount();
  const navigate = useNavigate();
  const retryRequest = useRetryRequest();

  useEffect(() => {
    const hasSeenNotice = sessionStorage.getItem("hasSeenNotice");
    if (!hasSeenNotice) {
      setShowNotice(true);
      sessionStorage.setItem("hasSeenNotice", "true");
    }
  }, []);

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

        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate, retryRequest]);

  const handleCloseNotice = () => {
    setShowNotice(false);
  };

  return (
    <Layout pageTitle="Home" style="style1" isLoading={isLoading}>
      <>
        {showNotice && <Notice onClose={handleCloseNotice} />}
        <Header />
        <Banner />
        <SubBanners />
        <Category />
        <ProductSlider category="New Arrivals" products={newArrival} updateCartCount={updateCartCount} />
        <About />
        <ProductSlider category="Best Sellers" products={bestSellers} updateCartCount={updateCartCount} />
        <ProductGrid2 category="Exclusive Products" products={allProducts} />
      </>
    </Layout>
  );
};

export default Home;
