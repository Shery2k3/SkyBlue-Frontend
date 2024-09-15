import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams, Link } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import Header from "../../Components/Header/Header";
import ProductGrid from "../../Components/ProductGrid/ProductGrid";
import Pagination from "../../Components/Pagination/Pagination";
import useRetryRequest from "../../api/useRetryRequest"; // Import the custom hook
import axiosInstance from "../../api/axiosConfig"; // Import the configured Axios instance
import "./Category.css"

const Category = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState("category");
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const navigate = useNavigate();
  const retryRequest = useRetryRequest(); // Use the custom hook

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
        const response = await retryRequest(() =>
          axiosInstance.get(
            `/product/category/${categoryId}?page=${currentPage}&size=18`
          )
        );
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
  }, [categoryId, currentPage, retryRequest]);

  return (
    <Layout pageTitle={category} style="style1" isLoading={isLoading}>
      <Header />
      {products.length > 0 ? (
        <>
          <ProductGrid category={category} products={products} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="empty-category">
          <h2>Oops! It's Empty</h2>
          <p>There are no products listed under this category yet.</p>
          <Link to="/categories">Check Other Categories</Link>
        </div>
      )}
    </Layout>
  );
};

export default Category;
