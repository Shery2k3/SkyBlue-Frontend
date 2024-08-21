import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../constant";
import axios from "axios";
import "./SearchBar.css";

const SearchBar = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    Id: "all",
    Name: "All Category",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/product/category/all`
        );
        console.log(response);
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    if (searchTerm.trim() !== "") {
      navigate(
        `/search?category=${encodeURIComponent(
          selectedCategory.Id
        )}&term=${encodeURIComponent(searchTerm)}`
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
      <div className="category-dropdown">
        <button className="category-dropbtn">
          {selectedCategory.Name}
          <span className="drop-down-icon">
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        </button>
        <div className="category-dropdown-content">
          {categories.map((category) => (
            <p
              key={category.Id}
              onClick={() => handleCategoryClick(category)}
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
