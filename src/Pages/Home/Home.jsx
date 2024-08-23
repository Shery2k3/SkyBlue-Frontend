import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import Category from "../../Components/Category/Category";
import ProductSlider from "../../Components/ProductSlider/ProductSlider";
import ProductGrid from "../../Components/ProductGrid/ProductGrid";
import API_BASE_URL from "../../constant";
import axios from "axios";

const Home = () => {
  const [isLoading, setisLoading] = useState(true);
  const [bestSellers, setBestSellers] = useState([]);
  const [newArrival, setNewArrival] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bestSellersResult, newArrivalResult] = await Promise.allSettled([
          axios.get(`${API_BASE_URL}/product/bestseller`),
          axios.get(`${API_BASE_URL}/product/newarrivals`),
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
        <ProductGrid category="Exclusive Products" products={bestSellers} />
      </>
    </Layout>
  );
};

export default Home;
