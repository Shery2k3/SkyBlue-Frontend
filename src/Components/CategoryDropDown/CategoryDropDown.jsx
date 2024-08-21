import { useState, useEffect, useRef } from "react";
import sorting from "../../assets/sidebar/Sorting.svg";
import expandarrow from "../../assets/sidebar/ExpandArrow.svg";
import { useNavigate } from "react-router-dom";
import "./CategoryDropDown.css";
import axios from "axios";
import API_BASE_URL from "../../constant";

const CategoryDropDown = () => {
  const [categories, setCategories] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isArrowRotated, setIsArrowRotated] = useState(false); // New state for arrow rotation
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

  const handleButtonClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
    setIsArrowRotated(!isArrowRotated); 
  };

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.Id}`);
    setIsDropdownVisible(false); 
    setIsArrowRotated(false); 
  };

  return (
    <div className="category-button-container" ref={dropdownRef}>
      <button className="category-button" onClick={handleButtonClick}>
        <img src={sorting} alt="sorting image" />
        <p className="button-text">Categories</p>
        <img 
          src={expandarrow} 
          alt="expandarrow" 
          className={`expand-arrow ${isArrowRotated ? 'rotated' : ''}`} 
        />
      </button>
      <div className={`category-drop-down ${isDropdownVisible ? 'show' : ''}`}>
        {categories.map((category) => (
          <span
            className="category-drop-down-item"
            key={category.Id}
            onClick={() => handleCategoryClick(category)}
          >
            {category.Name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CategoryDropDown;
