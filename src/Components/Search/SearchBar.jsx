import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../constant";
import "./SearchBar.css";

const SearchBar = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    Id: "all",
    Name: "All Category",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isArrowRotated, setIsArrowRotated] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/product/category/all`);
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
        setIsArrowRotated(false);
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
        `/search?category=${encodeURIComponent(selectedCategory.Id)}&term=${encodeURIComponent(searchTerm)}`
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className="search-bar">
      <div className="category-dropdown" ref={dropdownRef}>
        <button className="category-dropbtn" onClick={handleButtonClick}>
          {selectedCategory.Name}
          <span className={`drop-down-icon ${isArrowRotated ? "rotated" : ""}`}>
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        </button>
        <div className={`category-dropdown-content ${isDropdownVisible ? "show" : ""}`}>
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
  );
};

export default SearchBar;
