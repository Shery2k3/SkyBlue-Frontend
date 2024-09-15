import React from "react";
import "./CategoryGrid.css";
import { useNavigate } from "react-router-dom";

const CategoryGrid = ({ categories }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.Id}?page=1`);
  };

  return (
    <div className="categories-grid-container">
      <h2>All Categories</h2>
      <div className="category-grid">
        {categories.map((category) => (
          <div
            key={category.Id}
            className="category-item"
            onClick={() => handleCategoryClick(category)}
          >
            {category.Name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
