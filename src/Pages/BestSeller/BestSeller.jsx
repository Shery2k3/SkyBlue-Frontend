import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import Header from "../../Components/Header/Header";
import Banner from "../../Components/Banner/Banner";
import ProductGrid from "../../Components/ProductGrid/ProductGrid";
import axiosInstance from "../../api/axiosConfig";

const BestSeller = () => {
  const [isLoading, setisLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/product/bestseller?size=12");
        setProducts(response.data);
        setisLoading(false);
        console.log('api hitting')
      } catch (error) {
        console.error("Failed to load data:", error);
        setisLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout pageTitle="Best Seller" style="style1" isLoading={isLoading}>
      <Header />
      <Banner/>
      <ProductGrid category="Best Sellers" products={products} />
    </Layout>
  );
};

export default BestSeller;
