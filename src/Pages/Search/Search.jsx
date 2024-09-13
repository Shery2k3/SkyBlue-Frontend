import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import Header from "../../Components/Header/Header";
import ProductGrid from "../../Components/ProductGrid/ProductGrid";
import Pagination from "../../Components/Pagination/Pagination";
import searchImage from "../../../public/Images/search.webp";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../../api/axiosConfig";
import useRetryRequest from "../../api/useRetryRequest"; // Import the retry hook
import "./Search.css";

const Search = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [size, setSize] = useState(18);

  const navigate = useNavigate();
  const location = useLocation();
  const retryRequest = useRetryRequest(); // Use the retry hook

  const handlePageChange = (pageNumber) => {
    navigate(
      `?category=${category}&term=${searchTerm}&page=${pageNumber}&size=${size}`
    );
  };

  useEffect(() => {
    setIsLoading(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const getQueryParams = () => {
      const params = new URLSearchParams(location.search);
      return {
        category: params.get("category") || "",
        term: params.get("term") || "",
        page: parseInt(params.get("page")) || 1,
        size: parseInt(params.get("size")) || 18,
      };
    };

    const { category, term, page, size } = getQueryParams();
    setCategory(category);
    setSearchTerm(term);
    setCurrentPage(page);
    setSize(size);

    const fetchData = async () => {
      try {
        const response = await retryRequest(() =>
          axiosInstance.get(
            `/product/search/${category}?term=${term}&page=${page}&size=${size}`
          )
        );
        setProducts(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [location.search, retryRequest]);

  return (
    <Layout
      pageTitle={`Search Results for "${searchTerm}"`}
      style="style1"
      isLoading={isLoading}
    >
      <Header />
      {products.length > 0 ? (
        <>
          <ProductGrid
            category={`Search Results (${searchTerm})`}
            products={products}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="no-result">
          <img src={searchImage} alt="No results" />
          <p>No products were found that matched your criteria.</p>
          <Link to="/" className="back-button">
            <FontAwesomeIcon icon={faArrowLeft} className="left" />
            Go Back
          </Link>
        </div>
      )}
    </Layout>
  );
};

export default Search;
