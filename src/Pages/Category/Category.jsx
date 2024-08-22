import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import ProductGrid from "../../Components/ProductGrid/ProductGrid";
import Pagination from "../../Components/Pagination/Pagination";
import API_BASE_URL from "../../constant";
import axios from "axios";

const Category = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const { categoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/product/category/${categoryId}?page=${currentPage}&size=18`
        );
        setProducts(response.data.data);
        setTotalPages(response.data.totalPages);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [categoryId, currentPage]);

  return (
    <Layout pageTitle="Best Seller" style="style1" isLoading={isLoading}>
      <ProductGrid category="Best Sellers" products={products} />
      <Pagination currentPage={currentPage} totalPages={totalPages}/>
    </Layout>
  );
};

export default Category;
