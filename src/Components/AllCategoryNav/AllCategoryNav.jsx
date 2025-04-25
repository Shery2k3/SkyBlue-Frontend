import { useState, useEffect } from "react";
import { useCategoryNav } from "../../Context/CategoryMenuContext/CategoryMenuContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosConfig";
import useRetryRequest from "../../api/useRetryRequest";
import "./AllCategoryNav.css";

const AllCategoryNav = () => {
  const retryRequest = useRetryRequest();
  const [categories, setCategories] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [navigationPath, setNavigationPath] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  const {isCategoryNavOpen, toggleCategoryNav} = useCategoryNav();
  const navigate = useNavigate();

  // Get window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await retryRequest(() =>
          axiosInstance.get("/product/category/tree")
        );
        setCategories(response.data);
        // Initialize navigation path with root level
        setNavigationPath([{ level: 0, categories: response.data, selected: null }]);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };

    fetchData();
  }, [retryRequest]);

  // Navigate to a subcategory
  const navigateToSubcategory = (category, level) => {
    // If clicking on the same category, just redirect to its page
    if (navigationPath[level] && navigationPath[level].selected === category.Id) {
      redirect(category.Id);
      return;
    }
    
    // Update navigation path
    const newPath = navigationPath.slice(0, level + 1);
    newPath[level] = {
      ...newPath[level],
      selected: category.Id
    };
    
    // Add next level if there are children
    if (category.children && category.children.length > 0) {
      newPath.push({
        level: level + 1,
        categories: category.children,
        selected: null
      });
      setCurrentLevel(level + 1);
    } else {
      // If no children, just redirect to the category page
      redirect(category.Id);
    }
    
    setNavigationPath(newPath);
  };

  const redirect = (id) => {
    navigate(`/category/${id}`);
    toggleCategoryNav();
  };

  // Render a single category column
  const renderCategoryColumn = (levelData, level) => {
    return (
      <div key={`level-${level}`} className="category-column">
        <ul className="category-list">
          {levelData.categories.map((category) => (
            <li 
              key={category.Id} 
              className={`category-item ${levelData.selected === category.Id ? 'selected' : ''}`}
            >
              <div 
                className="category-header"
                onClick={() => navigateToSubcategory(category, level)}
              >
                <span className="category-name">
                  {category.Name}
                </span>
                {category.children && category.children.length > 0 && (
                  <span className="chevron-container">
                    <FontAwesomeIcon icon={faChevronRight} className="chevron-icon" />
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // For mobile view with vertical navigation
  const renderMobileView = () => {
    return (
      <div className="category-mobile-view">
        {navigationPath.map((levelData, index) => (
          <div key={`mobile-level-${index}`} className={`mobile-level ${currentLevel === index ? 'active' : ''}`}>
            {index > 0 && (
              <div className="back-button" onClick={() => setCurrentLevel(index - 1)}>
                <FontAwesomeIcon icon={faChevronRight} className="back-icon" />
                Back
              </div>
            )}
            <ul className="mobile-category-list">
              {levelData.categories.map((category) => (
                <li 
                  key={category.Id} 
                  className={`mobile-category-item ${levelData.selected === category.Id ? 'selected' : ''}`}
                >
                  <div className="mobile-category-header">
                    <span 
                      className="mobile-category-name"
                      onClick={() => redirect(category.Id)}
                    >
                      {category.Name}
                    </span>
                    {category.children && category.children.length > 0 && (
                      <button 
                        className="mobile-next-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToSubcategory(category, index);
                          setCurrentLevel(index + 1);
                        }}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className={`all-category-nav-overlay ${isCategoryNavOpen ? "open" : ""}`} onClick={toggleCategoryNav}></div>
      <div className={`all-category-nav-container ${isCategoryNavOpen ? "open" : ""}`}>
        <FontAwesomeIcon icon={faXmark} className="menu-closer" onClick={toggleCategoryNav} />
        <div className="all-category-nav">
          {windowWidth < 668 ? (
            renderMobileView()
          ) : (
            <div className="category-columns-container">
              {navigationPath.map((levelData, index) => 
                renderCategoryColumn(levelData, index)
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllCategoryNav;