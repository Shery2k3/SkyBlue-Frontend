import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import Header from "../../Components/Header/Header";
import ProductGrid from "../../Components/ProductGrid/ProductGrid";
import Pagination from "../../Components/Pagination/Pagination";
import searchImage from "../../../public/Images/search.webp";
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
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const sortBy = searchParams.get("sortBy") || "name_asc";
  const pageSize = searchParams.get("pageSize") || 12;
  const categoryParam = searchParams.get("category") || "";
  const term = searchParams.get("term") || "";

  const navigate = useNavigate();
  const retryRequest = useRetryRequest(); // Use the retry hook

  const handlePageChange = (pageNumber) => {
    setSearchParams({ category: categoryParam, term, page: pageNumber, pageSize });
  };

  const handleSortChange = (value) => {
    setSearchParams({ category: categoryParam, page: currentPage, term, sortBy: value, pageSize: pageSize }); // Update sortBy in the URL
  };

  const handleDisplayChange = (value) => {
    setSearchParams({ category: categoryParam, page: 1, term, sortBy: sortBy, pageSize: value})
  }

  useEffect(() => {
    setIsLoading(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setCategory(categoryParam);
    setSearchTerm(term);

    const fetchData = async () => {
      try {
        const response = await retryRequest(() =>
          axiosInstance.get(
            `/product/search/${categoryParam}?term=${term}&page=${currentPage}&size=${pageSize}&sortBy=${sortBy}`
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
  }, [searchParams, retryRequest, currentPage, pageSize, categoryParam, term]);

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
            sortby={sortBy}
            handleSortChange={handleSortChange}
            pageSize={pageSize}
            handleDisplayChange={handleDisplayChange}
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
