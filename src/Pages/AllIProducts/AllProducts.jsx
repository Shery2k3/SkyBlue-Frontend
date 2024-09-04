import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import ProductGrid from "../../Components/ProductGrid/ProductGrid";
import Category from "../../Components/Category/Category";
import Pagination from "../../Components/Pagination/Pagination";
import axiosInstance from "../../api/axiosConfig"; 

const AllProducts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState()
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

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
          `/product/category/-1?page=${currentPage}&size=18`
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
  }, [currentPage]);

  return (
    <Layout pageTitle="All Products" style="style1" isLoading={isLoading}>
      <Category />
      <ProductGrid category="All Products" products={products} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </Layout>
  );
};

export default AllProducts;
