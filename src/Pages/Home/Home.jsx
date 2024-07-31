import React from "react";
import { useAuth } from "../../Context/User/UserContextProvider";
import Layout from "../../Components/Layout/Layout";
import ProductCard from "../../Components/ProductCard/ProductCard";

const Home = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout pageTitle="Home">
      
      <br />
      <ProductCard
        productImage="https://skybluewholesale.com/content/images/thumbs/0018350_fanta-fruit-twist-pop-can-24x330ml_260.png"
        productName="Fanta Fruit Twist Pop Can 24x330ML"
        productPrice="31.79"
      />
      <br />
      <ProductCard
        productImage="https://skybluewholesale.com/content/images/thumbs/0018347_slush-puppie-slushie-strawberry-250ml_260.png"
        productName="Slush Puppie Slushie Strawberry 250ml"
        productPrice="2.99"
      />
      <br />
      <ProductCard
        productImage="https://skybluewholesale.com/content/images/thumbs/0012639_rizla-rolling-paper-flavour-cards-combo-special-4999_550.jpeg"
        productName="Rizla Rolling Paper & Flavour Cards **COMBO SPECIAL $49.99**"
        productPrice="49.99"
      />
      <br />
    </Layout>
  );
};

export default Home;
