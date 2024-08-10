import React from "react";
import Layout from "../../Components/Layout/Layout";
import ProductGrid from "../../Components/ProductGrid/ProductGrid";
import productData from "../../Data/ProductData";

const BestSeller = () => {
  return (
    <Layout pageTitle="Best Seller" style="style1">
      <ProductGrid category="Best Sellers" products={productData} />
    </Layout>
  );
};

export default BestSeller;
