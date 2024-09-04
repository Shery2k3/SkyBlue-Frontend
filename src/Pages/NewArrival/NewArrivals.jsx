import React, { useState, useEffect } from "react";
import Category from "../../Components/Category/Category";
import Layout from "../../Components/Layout/Layout";
import ProductGrid from "../../Components/ProductGrid/ProductGrid";
import axiosInstance from "../../api/axiosConfig";

const NewArrivals = () => {
  const [isLoading, setisLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          "/product/newarrivals?size=12"
        );
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
    <Layout pageTitle="New Arrivals" style="style1" isLoading={isLoading}>
      <Category />
      <ProductGrid category="New Arrivals" products={products} />
    </Layout>
  );
};

export default NewArrivals;
