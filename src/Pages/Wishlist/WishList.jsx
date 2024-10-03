import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import Header from "../../Components/Header/Header";
import ProductGrid2 from "../../Components/ProductGrid2/ProductGrid2";
import useRetryRequest from "../../api/useRetryRequest";
import axiosInstance from "../../api/axiosConfig";

const WishList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const retryRequest = useRetryRequest();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await retryRequest(() =>
          axiosInstance.get("/customer/wishlist")
        );
        setProducts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [retryRequest]);

  return (
    <Layout pageTitle="Wishlist" style="style1" isLoading={isLoading}>
      <Header />
      {products.length > 0 ? (
        <ProductGrid2 category="Wishlist" products={products} header={true} />
      ) : (
        <div className="empty-category">
          <h2>Oops! It's Empty</h2>
          <p>You dont have anything in the Wishlist yet</p>
          <Link to="/">Go to Shop</Link>
        </div>
      )}
    </Layout>
  );
};

export default WishList;
