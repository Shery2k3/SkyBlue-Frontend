import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import Header from "../../Components/Header/Header";
import CategoryGrid from "../../Components/CategoryGrid/CategoryGrid";
import useRetryRequest from "../../api/useRetryRequest";
import axiosInstance from "../../api/axiosConfig";

const Categories = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const retryRequest = useRetryRequest();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const response = await retryRequest(() =>
          axiosInstance.get(`/product/categories-flat`)
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout pageTitle="Categories" style="style1" isLoading={isLoading}>
      <Header />
      <CategoryGrid categories={categories} setCategories={setCategories}/>
    </Layout>
  );
};

export default Categories;
