import { useState, useEffect, useRef } from "react";
import { useCategoryNav } from "../../Context/CategoryMenuContext/CategoryMenuContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faXmark,
  faPlus,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosConfig";
import useRetryRequest from "../../api/useRetryRequest";
import "./AllCategoryNav.css";

const MAX_DEPTH_TO_DISPLAY = 2; // Maximum depth of categories to display (0-based)

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

  // Update window width
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && isCategoryNavOpen) {
        // Reset and close
        resetNavigationState();
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
        // response.data expected to be a tree array
        setCategories(response.data || []);
        setNavigationPath([
          { level: 0, categories: response.data || [], selected: null },
        ]);
        setCurrentLevel(0);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [retryRequest]);

  // Utility: reset navigation state to root
  const resetNavigationState = () => {
    setCurrentLevel(0);
    setNavigationPath([{ level: 0, categories: categories, selected: null }]);
  };

  // Navigate to a subcategory (desktop columns)
  const navigateToSubcategory = (category, level) => {
    // If clicking same selected category -> redirect
    if (navigationPath[level] && navigationPath[level].selected === category.Id) {
      redirect(category.Id);
      return;
    }

    const newPath = navigationPath.slice(0, level + 1);
    newPath[level] = {
      ...newPath[level],
      selected: category.Id,
    };

    if (category.children && category.children.length > 0 && level < MAX_DEPTH_TO_DISPLAY) {
      newPath.push({
        level: level + 1,
        categories: category.children,
        selected: null,
      });
      setCurrentLevel(level + 1);
    } else {
      // no children or reached max depth
      redirect(category.Id);
    }

    setNavigationPath(newPath);
  };

  // Redirect helper (navigates then closes & resets)
  const redirect = (id) => {
    navigate(`/category/${id}`);
    // close and reset so next open starts from top
    resetNavigationState();
    toggleCategoryNav();
  };

  // Navigate to home/all categories
  const navigateToHome = () => {
    navigate("/");
    resetNavigationState();
    toggleCategoryNav();
  };

  // Build breadcrumbs (display only)
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

  // Check deeper nested children exist
  const hasNestedChildren = (category) => {
    if (!category.children) return false;
    for (const child of category.children) {
      if (child.children && child.children.length > 0) return true;
    }
    return false;
  };

  // Render a single column (desktop / tablet)
  const renderCategoryColumn = (levelData, level) => {
    return (
      <div key={`level-${level}`} className="category-column">
        <ul className="category-list">
          {levelData.categories && levelData.categories.length > 0 ? (
            levelData.categories.map((category) => (
              <li
                key={category.Id}
                className={`category-item ${levelData.selected === category.Id ? "selected" : ""}`}
              >
                <div
                  className="category-header"
                  onClick={() => navigateToSubcategory(category, level)}
                >
                  <span className="category-name">{category.Name}</span>
                  {category.children && category.children.length > 0 && (
                    <span className="chevron-container">
                      <FontAwesomeIcon icon={faChevronRight} className="chevron-icon" />
                    </span>
                  )}
                </div>

                {/* Show "View More" on desktop/tablet at max depth when deeper children exist */}
                {level === MAX_DEPTH_TO_DISPLAY && hasNestedChildren(category) && (
                  <div
                    className="view-more-link"
                    onClick={() => redirect(category.Id)}
                  >
                    View More
                  </div>
                )}
              </li>
            ))
          ) : (
            <li className="empty-category-message">No subcategories available</li>
          )}
        </ul>
      </div>
    );
  };

  // MOBILE: breadcrumbs (display only, not clickable)
  const renderBreadcrumbs = () => {
    const breadcrumbs = generateBreadcrumbs();

    return (
      <div className="mobile-category-breadcrumb">
        {breadcrumbs.map((crumb, index) => (
          <span key={`crumb-${index}`} className="breadcrumb-item">
            <span>{crumb.name}</span>
          </span>
        ))}
      </div>
    );
  };

  // MOBILE vertical view
  const renderMobileView = () => {
    return (
      <div className="category-mobile-view">
        {currentLevel > 0 && renderBreadcrumbs()}

        {navigationPath.map((levelData, index) => (
          <div
            key={`mobile-level-${index}`}
            className={`mobile-level ${currentLevel === index ? "active" : ""}`}
            aria-hidden={currentLevel !== index}
          >
            {index > 0 && (
              <div
                className="back-button"
                onClick={() => {
                  // go back one level and clear selection for the level we left
                  setCurrentLevel(index - 1);
                  const newPath = navigationPath.slice(0, index + 1);
                  // clear the selection on the current index
                  newPath[index] = { ...newPath[index], selected: null };
                  setNavigationPath(newPath);
                }}
              >
                <FontAwesomeIcon icon={faChevronRight} className="back-icon" />
                Back
              </div>
            )}

            <ul className="mobile-category-list">
              {index === 0 && (
                <li className="mobile-category-item">
                  <div className="mobile-category-header">
                    <span className="mobile-category-name" onClick={navigateToHome}>
                      <FontAwesomeIcon icon={faHome} style={{ marginRight: "8px" }} />
                      Home / All Categories
                    </span>
                  </div>
                </li>
              )}

              {levelData.categories && levelData.categories.length > 0 ? (
                levelData.categories.map((category) => (
                  <li
                    key={category.Id}
                    className={`mobile-category-item ${levelData.selected === category.Id ? "selected" : ""}`}
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
                            // if we're at max depth and it has deeper children -> go to category page
                            if (index === MAX_DEPTH_TO_DISPLAY && hasNestedChildren(category)) {
                              redirect(category.Id);
                            } else {
                              // open next level
                              // ensure navigationPath has this level set
                              const newPath = navigationPath.slice(0, index + 1);
                              newPath[index] = { ...newPath[index], selected: category.Id };
                              newPath.push({
                                level: index + 1,
                                categories: category.children || [],
                                selected: null,
                              });
                              setNavigationPath(newPath);
                              setCurrentLevel(index + 1);
                            }
                          }}
                          aria-label={`View subcategories of ${category.Name}`}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      )}
                    </div>

                    {/* Show "View More" on mobile at max depth if deeper children exist */}
                    {index === MAX_DEPTH_TO_DISPLAY && hasNestedChildren(category) && (
                      <div
                        className="mobile-view-more"
                        onClick={() => redirect(category.Id)}
                      >
                        View More
                      </div>
                    )}
                  </li>
                ))
              ) : (
                <li className="empty-category-message">No subcategories available</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  const renderLoading = () => (
    <div className="category-loading">
      <div className="loading-spinner"></div>
    </div>
  );

  // overlay click handler: reset & close
  const handleOverlayClick = () => {
    resetNavigationState();
    toggleCategoryNav();
  };

  return (
    <>
      <div
        className={`all-category-nav-overlay ${isCategoryNavOpen ? "open" : ""}`}
        onClick={handleOverlayClick}
        aria-hidden="true"
      />
      <div
        className={`all-category-nav-container ${isCategoryNavOpen ? "open" : ""}`}
        ref={navigationRef}
        role="dialog"
        aria-modal="true"
        aria-label="Category navigation"
      >
        <button
          className="menu-closer"
          onClick={() => {
            resetNavigationState();
            toggleCategoryNav();
          }}
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
              {navigationPath.map((levelData, index) => renderCategoryColumn(levelData, index))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllCategoryNav;
