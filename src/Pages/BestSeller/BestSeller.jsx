import React from "react";
import { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import ProductGrid from "../../Components/ProductGrid/ProductGrid";
import productData from "../../Data/ProductData";
import API_BASE_URL from "../../constant";
import axios from "axios";

const BestSeller = () => {
  const [isLoading, setisLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/product/bestseller`)
        setProducts(response.data);
        setisLoading(false); 
      } catch (error) {
        console.error("Failed to load data:", error);
        setisLoading(false);
      }
    };

    fetchData();
  }, []);
  
  return (
    <Layout pageTitle="Best Seller" style="style1" isLoading={isLoading}>
      <ProductGrid category="Best Sellers" products={products} />
    </Layout>
  );
};

export default BestSeller;
