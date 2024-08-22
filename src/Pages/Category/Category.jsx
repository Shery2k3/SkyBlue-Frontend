import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import ProductGrid from "../../Components/ProductGrid/ProductGrid";
import API_BASE_URL from "../../constant";
import axios from "axios";

const Category = () => {
  const [isLoading, setisLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const { categoryId } = useParams();

  useEffect(() => {
    setisLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/product/category/${categoryId}?page=${page}&size=18`
        );
        setProducts(response.data.data);

        setTotalPages(response.data.totalPages);
        setisLoading(false);
      } catch (error) {
        console.error("Failed to load data:", error);
        setisLoading(false);
      }
    };

    fetchData();
  }, [categoryId, page]);

  return (
    <Layout pageTitle="Best Seller" style="style1" isLoading={isLoading}>
      <ProductGrid category="Best Sellers" products={products} />
    </Layout>
  );
};

export default Category;
