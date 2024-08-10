import React from "react";
import Layout from "../../Components/Layout/Layout";
import ProductGrid from "../../Components/ProductGrid/ProductGrid";
import productData from "../../Data/ProductData";

const ExclusiveProducts = () => {
  return (
    <Layout pageTitle="Exclusive Products" style="style1">
      <ProductGrid category="Exclusive Products" products={productData} />
    </Layout>
  );
};

export default ExclusiveProducts;
