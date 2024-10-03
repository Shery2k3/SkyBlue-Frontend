import { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import Header from "../../Components/Header/Header";
import { useNavigate, useParams, useSearchParams, Link } from "react-router-dom";
import ProductGrid from "../../Components/ProductGrid/ProductGrid";
import Pagination from "../../Components/Pagination/Pagination";
import axiosInstance from "../../api/axiosConfig";
import useRetryRequest from "../../api/useRetryRequest";

const AllProducts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState();
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const sortBy = searchParams.get("sortBy") || "name_asc";
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
        const response = await retryRequest(() =>
          axiosInstance.get(`/product/category/-1?page=${currentPage}&size=${pageSize}&sortBy=${sortBy}`)
        );
        console.log(response)
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
  }, [currentPage, currentPage, sortBy, pageSize, retryRequest]);

  const handleSortChange = (value) => {
    setSearchParams({ page: currentPage, sortBy: value, pageSize: pageSize }); // Update sortBy in the URL
  };

  const handleDisplayChange = (value) => {
    setSearchParams({page: 1, sortBy: sortBy, pageSize: value})
  }

  return (
    <Layout pageTitle="All Products" style="style1" isLoading={isLoading}>
      <Header />
      <ProductGrid
        category="All Products"
        products={products}
        sortby={sortBy}
        handleSortChange={handleSortChange} // Pass the sorting handler
        pageSize={pageSize}
        handleDisplayChange={handleDisplayChange}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </Layout>
  );
};

export default AllProducts;
