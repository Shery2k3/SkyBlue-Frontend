import React, { useState, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { PDFDownloadLink } from "@react-pdf/renderer";
import OrderSheet from "../OrderSheet/OrderSheet";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb } from "antd";
import "./ProductGrid.css";

const ProductGrid = ({
  category,
  products,
  subCategory,
  sortby,
  handleSortChange,
  pageSize,
  handleDisplayChange,
}) => {
  const [sortingDropdownVisible, setSortingDropdownVisible] = useState(false);
  const [displayDropdownVisible, setDisplayDropdownVisible] = useState(false);

  const toggleSortingDropdown = () => {
    setSortingDropdownVisible(!sortingDropdownVisible);
  };

  const toggleDisplayDropdown = () => {
    setDisplayDropdownVisible(!displayDropdownVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sortingDropdownVisible &&
        event.target.closest(".sort-button") === null
      ) {
        setSortingDropdownVisible(false);
      }
    };

    const handleScroll = () => {
      if (sortingDropdownVisible) {
        setSortingDropdownVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("scroll", handleScroll);
    };
  }, [sortingDropdownVisible]);

  useEffect(() => {
    setSortingDropdownVisible(false);
    setDisplayDropdownVisible(false);
  }, [sortby, pageSize]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        displayDropdownVisible &&
        event.target.closest(".display-button") === null
      ) {
        setDisplayDropdownVisible(false);
      }
    };

    const handleScroll = () => {
      if (displayDropdownVisible) {
        setDisplayDropdownVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("scroll", handleScroll);
    };
  }, [displayDropdownVisible]);

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
              <button className="download-button loading">
                Preparing Order Sheet...
              </button>
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
                  {item.Name.length > 20
                    ? `${item.Name.substring(0, 20)}...`
                    : item.Name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
      {products.length > 0 && (
        <div className="products-controller">
          <div className="sort-container">
            <p>Sort by:</p>
            <div className="sort-button">
              <div className="sorted-option" onClick={toggleSortingDropdown}>
                {sortby === "price_asc"
                  ? "Lowest Price"
                  : sortby === "price_desc"
                  ? "Highest Price"
                  : sortby === "name_asc"
                  ? "Name: A-Z"
                  : sortby === "name_desc"
                  ? "Name: Z-A"
                  : "Latest"}{" "}
                <span>
                  <FontAwesomeIcon icon={faChevronDown} />
                </span>
              </div>

              {/* Dropdown options */}
              {sortingDropdownVisible && (
                <div className="sort-dropdown-content">
                  <span
                    className="sort-drop-down-item"
                    onClick={() => handleSortChange("recent")}
                  >
                    Latest
                  </span>
                  <span
                    className="sort-drop-down-item"
                    onClick={() => handleSortChange("price_asc")}
                  >
                    Lowest Price
                  </span>
                  <span
                    className="sort-drop-down-item"
                    onClick={() => handleSortChange("price_desc")}
                  >
                    Highest Price
                  </span>
                  <span
                    className="sort-drop-down-item"
                    onClick={() => handleSortChange("name_asc")}
                  >
                    Name: A-Z
                  </span>
                  <span
                    className="sort-drop-down-item"
                    onClick={() => handleSortChange("name_desc")}
                  >
                    Name: Z-A
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="display-container">
            <p>Display:</p>
            <div className="display-button">
              <div className="displayed-option" onClick={toggleDisplayDropdown}>
                {pageSize}{" "}
                <span>
                  <FontAwesomeIcon icon={faChevronDown} />
                </span>
              </div>

              {/* Dropdown options */}
              {displayDropdownVisible && (
                <div className="display-dropdown-content">
                  <span
                    className="display-drop-down-item"
                    onClick={() => handleDisplayChange(12)}
                  >
                    12
                  </span>
                  <span
                    className="display-drop-down-item"
                    onClick={() => handleDisplayChange(24)}
                  >
                    24
                  </span>
                  <span
                    className="display-drop-down-item"
                    onClick={() => handleDisplayChange(36)}
                  >
                    36
                  </span>
                  <span
                    className="display-drop-down-item"
                    onClick={() => handleDisplayChange(48)}
                  >
                    48
                  </span>
                  <span
                    className="display-drop-down-item"
                    onClick={() => handleDisplayChange(60)}
                  >
                    60
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
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
