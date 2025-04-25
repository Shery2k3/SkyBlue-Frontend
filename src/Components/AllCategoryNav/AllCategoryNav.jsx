import { useState, useEffect, useRef } from "react";
import { useCategoryNav } from "../../Context/CategoryMenuContext/CategoryMenuContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faXmark,
  faPlus,
  faHome,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
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
  const [isLoading, setIsLoading] = useState(true);
  const navigationRef = useRef(null);

  const { isCategoryNavOpen, toggleCategoryNav } = useCategoryNav();
  const navigate = useNavigate();

  // Get window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle escape key to close navigation
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && isCategoryNavOpen) {
        toggleCategoryNav();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isCategoryNavOpen, toggleCategoryNav]);

  // Prevent body scroll when nav is open
  useEffect(() => {
    if (isCategoryNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isCategoryNavOpen]);

  // Fetch categories data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await retryRequest(() =>
          axiosInstance.get("/product/category/tree")
        );
        setCategories(response.data);
        // Initialize navigation path with root level
        setNavigationPath([
          { level: 0, categories: response.data, selected: null },
        ]);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [retryRequest]);

  // Navigate to a subcategory
  const navigateToSubcategory = (category, level) => {
    // If clicking on the same category, just redirect to its page
    if (
      navigationPath[level] &&
      navigationPath[level].selected === category.Id
    ) {
      redirect(category.Id);
      return;
    }

    // Update navigation path
    const newPath = navigationPath.slice(0, level + 1);
    newPath[level] = {
      ...newPath[level],
      selected: category.Id,
    };

    // Add next level if there are children
    if (category.children && category.children.length > 0) {
      newPath.push({
        level: level + 1,
        categories: category.children,
        selected: null,
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

  // Navigate to home/all categories
  const navigateToHome = () => {
    navigate("/");
    toggleCategoryNav();
  };

  // Generate breadcrumb data for mobile view
  const generateBreadcrumbs = () => {
    const breadcrumbs = [{ name: "All Categories", id: null }];

    navigationPath.forEach((level, index) => {
      if (level.selected) {
        const selectedCategory = level.categories.find(
          (cat) => cat.Id === level.selected
        );
        if (selectedCategory) {
          breadcrumbs.push({
            name: selectedCategory.Name,
            id: selectedCategory.Id,
            level: index,
          });
        }
      }
    });

    return breadcrumbs;
  };

  // Navigate to specific breadcrumb level
  const navigateToBreadcrumb = (level) => {
    if (level === null) {
      // Reset to initial state
      setCurrentLevel(0);
      const initialPath = navigationPath.slice(0, 1);
      initialPath[0].selected = null;
      setNavigationPath(initialPath);
    } else {
      setCurrentLevel(level);
      setNavigationPath(navigationPath.slice(0, level + 1));
    }
  };

  // Render a single category column
  const renderCategoryColumn = (levelData, level) => {
    return (
      <div key={`level-${level}`} className="category-column">
        <ul className="category-list">
          {levelData.categories.length > 0 ? (
            levelData.categories.map((category) => (
              <li
                key={category.Id}
                className={`category-item ${
                  levelData.selected === category.Id ? "selected" : ""
                }`}
              >
                <div
                  className="category-header"
                  onClick={() => navigateToSubcategory(category, level)}
                >
                  <span className="category-name">{category.Name}</span>
                  {category.children && category.children.length > 0 && (
                    <span className="chevron-container">
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="chevron-icon"
                      />
                    </span>
                  )}
                </div>
              </li>
            ))
          ) : (
            <li className="empty-category-message">
              No subcategories available
            </li>
          )}
        </ul>
      </div>
    );
  };

  // Render breadcrumb navigation for mobile view
  const renderBreadcrumbs = () => {
    const breadcrumbs = generateBreadcrumbs();

    return (
      <div className="mobile-category-breadcrumb">
        {breadcrumbs.map((crumb, index) => (
          <span key={`crumb-${index}`} className="breadcrumb-item">
            {index < breadcrumbs.length - 1 ? (
              <span
                className="breadcrumb-link"
                onClick={() => navigateToBreadcrumb(crumb.level)}
              >
                {crumb.name}
              </span>
            ) : (
              <span>{crumb.name}</span>
            )}
          </span>
        ))}
      </div>
    );
  };

  // For mobile view with vertical navigation
  const renderMobileView = () => {
    return (
      <div className="category-mobile-view">
        {currentLevel > 0 && renderBreadcrumbs()}

        {navigationPath.map((levelData, index) => (
          <div
            key={`mobile-level-${index}`}
            className={`mobile-level ${currentLevel === index ? "active" : ""}`}
          >
            {index > 0 && (
              <div
                className="back-button"
                onClick={() => setCurrentLevel(index - 1)}
              >
                <FontAwesomeIcon icon={faChevronRight} className="back-icon" />
                Back
              </div>
            )}
            <ul className="mobile-category-list">
              {index === 0 && (
                <li className="mobile-category-item">
                  <div className="mobile-category-header">
                    <span
                      className="mobile-category-name"
                      onClick={navigateToHome}
                    >
                      <FontAwesomeIcon
                        icon={faHome}
                        style={{ marginRight: "8px" }}
                      />
                      Home / All Categories
                    </span>
                  </div>
                </li>
              )}

              {levelData.categories.length > 0 ? (
                levelData.categories.map((category) => (
                  <li
                    key={category.Id}
                    className={`mobile-category-item ${
                      levelData.selected === category.Id ? "selected" : ""
                    }`}
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
                          aria-label={`View subcategories of ${category.Name}`}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      )}
                    </div>
                  </li>
                ))
              ) : (
                <li className="empty-category-message">
                  No subcategories available
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  // Render loading state
  const renderLoading = () => (
    <div className="category-loading">
      <div className="loading-spinner"></div>
    </div>
  );

  return (
    <>
      <div
        className={`all-category-nav-overlay ${
          isCategoryNavOpen ? "open" : ""
        }`}
        onClick={toggleCategoryNav}
        aria-hidden="true"
      ></div>
      <div
        className={`all-category-nav-container ${
          isCategoryNavOpen ? "open" : ""
        }`}
        ref={navigationRef}
        role="dialog"
        aria-modal="true"
        aria-label="Category navigation"
      >
        <button
          className="menu-closer"
          onClick={toggleCategoryNav}
          aria-label="Close category menu"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <div className="all-category-nav">
          {isLoading ? (
            renderLoading()
          ) : windowWidth < 768 ? (
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
