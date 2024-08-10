import React from 'react'
import Layout from '../../Components/Layout/Layout';
import ProductGrid from "../../Components/ProductGrid/ProductGrid";
import productData from "../../Data/ProductData";

const NewArrivals = () => {

  return (
    <Layout pageTitle="New Arrivals" style ="style1">
      <ProductGrid category="New Arrivals" products={productData} />
    </Layout>


  )
}

export default NewArrivals;
