import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Skeleton from "antd/es/skeleton/";
import axiosInstance from "../../api/axiosConfig";
import { useModal } from "../../Context/ModalContext/ModalContext";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

const SearchBar = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    Id: -1,
    Name: "All Category",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { openModal } = useModal();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/product/category/all`);
        const categoriesData = response.data;
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setSuggestedProducts([]);

    const fetchData = async () => {
      if (debouncedSearchTerm) {
        try {
          const response = await axiosInstance.get(
            `/product/search/${encodeURIComponent(
              selectedCategory.Id
            )}?term=${debouncedSearchTerm.trim()}&page=1&size=6`
          );
          if (response.data.data.length > 0) {
            setSuggestedProducts(response.data.data);
          } else {
            setSuggestedProducts([]);
          }
        } catch (error) {
          console.error("Failed to load data:", error);
          setSuggestedProducts([]);
        }
      } else {
        setSuggestedProducts([]);
      }
    };
    fetchData();
  }, [debouncedSearchTerm, selectedCategory]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setIsDropdownVisible(false);
        setSuggestedProducts([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsDropdownVisible(false);
  };

  const handleButtonClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    if (searchTerm.trim() !== "") {
      navigate(
        `/search?category=${encodeURIComponent(
          selectedCategory.Id
        )}&term=${encodeURIComponent(searchTerm.trim())}`
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleClick = (product) => () => {
    openModal(product);
    setSuggestedProducts([]);
  };

  return (
    <div className="searchbar-container">
      <div className="search-bar">
        {/* <div className="category-dropdown" ref={dropdownRef}>
          <button className="category-dropbtn" onClick={handleButtonClick}>
            {selectedCategory.Name}
            <span className={`drop-down-icon`}>
              <FontAwesomeIcon icon={faCaretDown} />
            </span>
          </button>
          <div
            className={`category-dropdown-content ${
              isDropdownVisible ? "show" : ""
            }`}
          >
            <p
              key={-1}
              onClick={() =>
                handleCategoryClick({
                  Id: -1,
                  Name: "All Category",
                })
              }
              className="category-drop-down-item"
            >
              All Items
            </p>
            {categories.map((category) => (
              <p
                key={category.Id}
                onClick={() => handleCategoryClick(category)}
                className="category-drop-down-item"
              >
                {category.Name}
              </p>
            ))}
          </div>
        </div> */}
        <input
          type="text"
          className="search-input"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search"
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="search-icon"
          onClick={handleSearchClick}
        />
      </div>
      <div
        className={`search-suggestions ${
          suggestedProducts.length > 0 ? "show" : ""
        }`}
        ref={suggestionsRef}
      >
        {suggestedProducts.map((product) => (
          <span key={product.Id} onClick={handleClick(product)}>
            <div className="image-container">
              {isLoading && <Skeleton.Image active />}
              <img
                src={product.Images[0]}
                alt={product.Name}
                className="product-image"
                onLoad={handleImageLoad}
                style={{ display: isLoading ? "none" : "block" }}
              />
            </div>
            {product.Name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
