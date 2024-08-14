import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

const SearchBar = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Category");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); 

  const categories = [
    "All Category",
    "Vape",
    "Clothing",
    "Lambi wali category hai ye",
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/search?category=${encodeURIComponent(selectedCategory)}&term=${encodeURIComponent(searchTerm)}`);
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
          {selectedCategory}
          <span className="drop-down-icon">
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        </button>
        <div className="category-dropdown-content">
          {categories.map((category) => (
            <p key={category} onClick={() => handleCategoryClick(category)}>
              {category}
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
