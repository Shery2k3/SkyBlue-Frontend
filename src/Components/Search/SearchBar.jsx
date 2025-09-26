import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCaretDown,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
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
  const searchBarRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/product/category/all`);
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to load categories:", error);
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
          setSuggestedProducts(response.data.data || []);
        } catch (error) {
          console.error("Failed to fetch suggestions:", error);
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
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
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
    <div className="searchbar-wrapper">
      <div className="searchbar-container" ref={searchBarRef}>
        <div className="search-bar">
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

    </div>
  );
};

export default SearchBar;
