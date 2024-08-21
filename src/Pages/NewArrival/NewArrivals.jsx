import React from 'react'
import { useState, useEffect } from 'react';
import Layout from '../../Components/Layout/Layout';
import ProductGrid from "../../Components/ProductGrid/ProductGrid";
import API_BASE_URL from '../../constant';
import axios from 'axios';

const NewArrivals = () => {
  const [isLoading, setisLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/product/newarrivals`)
        setProducts(response.data);
        setisLoading(false); 
      } catch (error) {
        console.error("Failed to load data:", error);
        setisLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout pageTitle="New Arrivals" style ="style1" isLoading={isLoading}>
      <ProductGrid category="New Arrivals" products={products} />
    </Layout>


  )
}

export default NewArrivals;
