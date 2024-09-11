import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import Header from "../../Components/Header/Header";
import ProductGrid from "../../Components/ProductGrid/ProductGrid";
import Pagination from "../../Components/Pagination/Pagination";
import axiosInstance from "../../api/axiosConfig"; // Import the configured Axios instance

const Category = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState("category");
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    navigate(`?page=${pageNumber}`);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `/product/category/${categoryId}?page=${currentPage}&size=18`
        );
        console.log(response.data);
        setCategory(response.data.categoryName);
        setProducts(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [categoryId, currentPage]);

  return (
    <Layout pageTitle={category} style="style1" isLoading={isLoading}>
      <Header />
      <ProductGrid category={category} products={products} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </Layout>
  );
};

export default Category;
