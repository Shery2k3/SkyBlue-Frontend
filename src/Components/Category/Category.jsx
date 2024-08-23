import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../constant";
import "./Category.css";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/product/category/all`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.Id}?page=1`);
  };

  return (
    <div className="category-container">
        <h2>Categories</h2>
      <div className="category-menu">
        {categories.map((category) => (
          <span key={category.Id} onClick={() => handleCategoryClick(category)}>
            {category.Name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Category;
