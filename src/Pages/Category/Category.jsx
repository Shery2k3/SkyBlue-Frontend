import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams, Link } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import Header from "../../Components/Header/Header";
import ProductGrid from "../../Components/ProductGrid/ProductGrid";
import Pagination from "../../Components/Pagination/Pagination";
import useRetryRequest from "../../api/useRetryRequest";
import axiosInstance from "../../api/axiosConfig";

const Category = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState("category");
  const [products, setProducts] = useState([]);
  const [childProducts, setChildProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const { categoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const sortBy = searchParams.get("sortBy") || "recent";
  const pageSize = searchParams.get("pageSize") || 12;
  const navigate = useNavigate();
  const retryRequest = useRetryRequest();

  const handlePageChange = (pageNumber) => {
    setSearchParams({ page: pageNumber, sortBy, pageSize }); 
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const [categoryResponse, childCategoryResponse] = await retryRequest(() =>
          Promise.all([
            axiosInstance.get(
              `/product/category/${categoryId}?page=${currentPage}&size=${pageSize}&sortBy=${sortBy}`
            ),
            axiosInstance.get(`/product/category/child/${categoryId}`),
          ])
        );
        setCategory(categoryResponse.data.categoryName);
        setProducts(categoryResponse.data.data);
        setTotalPages(categoryResponse.data.totalPages);
        setChildProducts(childCategoryResponse.data);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [categoryId, currentPage, sortBy, pageSize, retryRequest]); // Add sortBy to dependencies

  const handleSortChange = (value) => {
    setSearchParams({ page: currentPage, sortBy: value, pageSize: pageSize }); // Update sortBy in the URL
  };

  const handleDisplayChange = (value) => {
    setSearchParams({page: 1, sortBy: sortBy, pageSize: value})
  }

  return (
    <Layout pageTitle={category} style="style1" isLoading={isLoading}>
      <Header />
      {childProducts.length > 0 || products.length > 0 ? (
        <>
          <ProductGrid
            category={category}
            products={products}
            subCategory={childProducts}
            sortby={sortBy}
            handleSortChange={handleSortChange} // Pass the sorting handler
            pageSize={pageSize}
            handleDisplayChange={handleDisplayChange}
          />
           {products.length > 0 && 
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />}
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
