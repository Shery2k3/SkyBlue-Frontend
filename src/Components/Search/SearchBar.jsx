import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosConfig"; // Import the configured Axios instance
import { useModal } from "../../Context/ModalContext/ModalContext";
import "./SearchBar.css";

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
    Id: "all",
    Name: "All Category",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isArrowRotated, setIsArrowRotated] = useState(false);
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { openModal } = useModal();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `/product/category/all`
        );
        setCategories(response.data);
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
            `/product/search/${encodeURIComponent(selectedCategory.Id)}?term=${debouncedSearchTerm.trim()}&page=1&size=6`
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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
        setIsArrowRotated(false);
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
    setIsArrowRotated(false);
  };

  const handleButtonClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
    setIsArrowRotated(!isArrowRotated);
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

  const handleClick = (product) => () => {
    openModal(product);
    setSuggestedProducts([]);
  };

  return (
    <div className="searchbar-container">
      <div className="search-bar">
        <div className="category-dropdown" ref={dropdownRef}>
          <button className="category-dropbtn" onClick={handleButtonClick}>
            {selectedCategory.Name}
            <span
              className={`drop-down-icon ${isArrowRotated ? "rotated" : ""}`}
            >
              <FontAwesomeIcon icon={faCaretDown} />
            </span>
          </button>
          <div
            className={`category-dropdown-content ${
              isDropdownVisible ? "show" : ""
            }`}
          >
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
        </div>
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
        className={`search-suggestions ${suggestedProducts.length > 0 ? "show" : ""}`}
        ref={suggestionsRef}
      >
        {suggestedProducts.map((product) => (
          <span key={product.Id} onClick={handleClick(product)}>
            <div className="image-container">
              <img src={product.Image} alt={product.Name} className="product-image"/>
            </div>
            {product.Name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
