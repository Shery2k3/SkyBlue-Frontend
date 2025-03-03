import { useState, useEffect } from "react";
import { useCategoryNav } from "../../Context/CategoryMenuContext/CategoryMenuContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosConfig";
import useRetryRequest from "../../api/useRetryRequest";
import "./AllCategoryNav.css";

const AllCategoryNav = () => {
  const retryRequest = useRetryRequest();
  const [categories, setCategories] = useState([]);
  const [openCategories, setOpenCategories] = useState({});
  
  const {isCategoryNavOpen, toggleCategoryNav} = useCategoryNav()

  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await retryRequest(() =>
          axiosInstance.get("/product/category/tree")
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };

    fetchData();
  }, [retryRequest]);




  console.log(categories);

  // Function to toggle the open state for a category
  const toggleCategory = (categoryId) => {
    setOpenCategories((prevOpenCategories) => ({
      ...prevOpenCategories,
      [categoryId]: !prevOpenCategories[categoryId],
    }));
  };

  const redirect = (id) => {
    navigate(`/category/${id}`);
  };

  // Recursive rendering of categories and subcategories
  const renderCategories = (categories) => {
    return categories.map((category) => (
      <li key={category.Id} className="category-item">
        <div className="category-header">
          <span className="category-name" onClick={() => {redirect(category.Id); toggleCategoryNav()}}>
            {category.Name}
          </span>
          {category.children && category.children.length > 0 && (
            <span
              className="chevron-container"
              onClick={() => toggleCategory(category.Id)}
            >
              <FontAwesomeIcon
                icon={faChevronRight}
                className={`chevron-icon ${
                  openCategories[category.Id] ? "rotate" : ""
                }`}
              />
            </span>
          )}
        </div>
        {category.children && category.children.length > 0 && (
          <ul
            className={`subcategory ${
              openCategories[category.Id] ? "open" : ""
            }`}
          >
            {renderCategories(category.children)}
          </ul>
        )}
      </li>
    ));
  };

  return (
    <>
      <div className={`all-category-nav-overlay ${isCategoryNavOpen ? "open" : ""}`} onClick={toggleCategoryNav}></div>
      <div className={`all-category-nav-container ${isCategoryNavOpen ? "open" : ""}`}>
        <FontAwesomeIcon icon={faXmark} className="menu-closer" onClick={toggleCategoryNav} />
        <div className="all-category-nav">
          <ul className="category-list">{renderCategories(categories)}</ul>
        </div>
      </div>
    </>
  );
};

export default AllCategoryNav;
