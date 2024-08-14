import { React, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import ProductGrid from "../../Components/ProductGrid/ProductGrid";
import productData from "../../Data/ProductData";
import searchImage from "../../../public/Images/search.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./Search.css";

const Search = () => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();

  useEffect(() => {
    const getQueryParams = () => {
      const params = new URLSearchParams(location.search);
      return {
        category: params.get("category") || "",
        term: params.get("term") || "",
      };
    };

    const { category, term } = getQueryParams();
    setCategory(category);
    setSearchTerm(term);

    const fetchData = async () => {
      setIsLoaded(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const filtered = productData.filter((product) => {
          const matchesCategory =
            category === "All Category" ||
            product.productName.includes(category);
          const matchesTerm = product.productName
            .toLowerCase()
            .includes(term.toLowerCase());
          return matchesCategory && matchesTerm;
        });

        setFilteredProducts(filtered);
        setIsLoaded(false);
      } catch (error) {
        console.error("Failed to load data:", error);
        setIsLoaded(false);
      }
    };

    fetchData();
  }, [location.search]);

  return (
    <Layout
      pageTitle={`Search Results for "${searchTerm}"`}
      style="style1"
      isLoaded={isLoaded}
    >
      {filteredProducts.length > 0 ? (
        <ProductGrid category={`Search Results (${searchTerm})`} products={filteredProducts} />
      ) : (
        <div className="no-result">
          <img src={searchImage} alt="" />
          <p>No products were found that matched your criteria.</p>
          <Link to="/" className="back-button"><FontAwesomeIcon icon={faArrowLeft} className="left"/>Go Back</Link>
        </div>
      )}
    </Layout>
  );
};

export default Search;
