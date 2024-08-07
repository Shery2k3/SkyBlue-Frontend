import React from "react";
import { useAuth } from "../../Context/User/UserContextProvider";
import Layout from "../../Components/Layout/Layout";
import ProductCard from "../../Components/ProductCard/ProductCard";
import productData from "../../Data/ProductData";
import ProductSlider from "../../Components/ProductSlider/ProductSlider";

const Home = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout pageTitle="Home" style ="style1">
      <ProductSlider category="New Arrivals" products={productData} />
      <ProductSlider category="Best Sellers" products={productData} />
      <ProductSlider category="Exclusive Products" products={productData} />
    </Layout>
  );
};

export default Home;
