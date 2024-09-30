import React, { useState, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { PDFDownloadLink } from "@react-pdf/renderer";
import OrderSheet from "../OrderSheet/OrderSheet";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb } from "antd";
import "./ProductGrid.css";

const ProductGrid = ({ category, products, subCategory }) => {
  const [sortby, setSortby] = useState("Price (Low to High)");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Function to handle sorting change
  const handleSortChange = (value, label) => {
    setSortby(label);
    setDropdownVisible(false);
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownVisible && event.target.closest(".sort-button") === null) {
        setDropdownVisible(false);
      }
    };

    const handleScroll = () => {
      if (dropdownVisible) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("scroll", handleScroll);

    // Clean up event listeners
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("scroll", handleScroll);
    };
  }, [dropdownVisible]);

  return (
    <div className="product-grid-container">
      <div className="product-grid-header">
        <h2>{category}</h2>
        <Breadcrumb
          separator=">"
          items={[
            {
              title: <Link to="/">Home</Link>,
            },
            {
              title: category,
            },
          ]}
        />
      </div>

      <div className="download-button-container">
        <PDFDownloadLink
          document={<OrderSheet category={category} products={products} />}
          fileName={`OrderSheet.pdf`}
        >
          {({ loading }) =>
            loading ? (
              <button>Preparing PDF...</button>
            ) : (
              <button className="download-button">Download Order Sheet</button>
            )
          }
        </PDFDownloadLink>
      </div>

      {Array.isArray(subCategory) && subCategory.length > 0 && (
        <div className="sub-category-container">
          <div className="sub-categories">
            {subCategory.map((item) => (
              <Link
                to={`/category/${item.Id}`}
                key={item.Id}
                className="sub-category-item"
              >
                <span className="image-container">
                  <img src={item.ImageUrl} alt={item.Name} />
                </span>
                <span className="category-name">
                  {" "}
                  {item.Name.length > 20
                    ? `${item.Name.substring(0, 20)}...`
                    : item.Name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="products-controller">
        <div className="sort-container">
          <p>Sort by:</p>
          <div className="sort-button">
            <div className="sorted-option" onClick={toggleDropdown}>
              {sortby}{" "}
              <span>
                <FontAwesomeIcon icon={faChevronDown} />
              </span>
            </div>

            {/* Dropdown options */}
            {dropdownVisible && (
              <div className="sort-dropdown-content">
                <span
                  className="sort-drop-down-item"
                  onClick={() => handleSortChange("price_asc", "Lowest Price")}
                >
                  Lowest Price
                </span>
                <span
                  className="sort-drop-down-item"
                  onClick={() =>
                    handleSortChange("price_desc", "Highest Price")
                  }
                >
                  Highest Price
                </span>
                <span
                  className="sort-drop-down-item"
                  onClick={() => handleSortChange("name_desc", "Name: A-Z")}
                >
                  Name: A-Z
                </span>
                <span
                  className="sort-drop-down-item"
                  onClick={() => handleSortChange("name_asc", "Name: Z-A")}
                >
                  Name: Z-A
                </span>
                <span
                  className="sort-drop-down-item"
                  onClick={() => handleSortChange("recent", "Latest")}
                >
                  Latest
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="product-grid">
        {products &&
          products.map((product) => (
            <ProductCard key={product.Id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default ProductGrid;
