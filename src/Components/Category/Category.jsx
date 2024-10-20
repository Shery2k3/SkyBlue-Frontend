import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosConfig"; // Import the configured Axios instance
import "./Category.css";
import { Link } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `/product/category/all`
        ); // Use axiosInstance
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
    <div className="home-category-container">
      <h2>Top Categories</h2>
      <div className="sub-category-container">
          <div className="sub-categories">
            {categories.map((item) => (
              <Link
                to={`/category/${item.Id}`}
                key={item.Id}
                className="sub-category-item"
              >
                <span className="image-container">
                  <img src={item.Image} alt={item.Name} />
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
    </div>
  );
};

export default Category;
