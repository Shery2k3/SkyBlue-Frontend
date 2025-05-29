import { useState, useEffect } from "react";
import { useNav } from "../../Context/NavContext/NavContext";
import { useCategoryNav } from "../../Context/CategoryMenuContext/CategoryMenuContext";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./NavMenu.css";

const NavMenu = () => {
  const { isNavOpen, toggleNav } = useNav();
  const {isCategoryNavOpen, toggleCategoryNav} = useCategoryNav()
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toggleNav()
    navigate("/login");
  };

  useEffect(() => {
    const body = document.body;
    if (isNavOpen) {
      body.classList.add('scroll-lock');
    } else {
      body.classList.remove('scroll-lock');
    }

    return () => {
      body.classList.remove('scroll-lock');
    };
  }, [isNavOpen]);

  const toggleShop = () => setIsShopOpen(!isShopOpen);
  const toggleAccount = () => setIsAccountOpen(!isAccountOpen);

  return (
    <>
      <div className={`nav-overlay ${isNavOpen ? "open" : ""}`} onClick={toggleNav}></div>
      <div className={`nav-menu ${isNavOpen ? "open" : ""}`}>
        <FontAwesomeIcon
          icon={faXmark}
          className="menu-closer"
          onClick={toggleNav}
        />
        <ul className="items">
          <li>
            <Link to="/" onClick={toggleNav}>
              Home
            </Link>
          </li>
          <li onClick={() => { toggleNav(); toggleCategoryNav(); }}>
            <p>
              All Categories
            </p>
          </li>

          <li className="menu-item">
            <div className="menu-header" onClick={toggleShop}>
              <span>Shop</span>
              <FontAwesomeIcon
                icon={faChevronRight}
                className={`chevron-icon ${isShopOpen ? "rotate" : ""}`}
              />
            </div>
            <ul className={`submenu ${isShopOpen ? "open" : ""}`}>
            <li>
                <Link to="/all-products" onClick={toggleNav}>
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/best-sellers" onClick={toggleNav}>
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" onClick={toggleNav}>
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/categories" onClick={toggleNav}>
                  Categories
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/wishlist" onClick={toggleNav}>
              Wishlist
            </Link>
          </li>

          <li>
            <Link to="/contact-us" onClick={toggleNav}>
              Contact
            </Link>
          </li>

          <li className="menu-item">
            <div className="menu-header" onClick={toggleAccount}>
              <span>My Account</span>
              <FontAwesomeIcon
                icon={faChevronRight}
                className={`chevron-icon ${isAccountOpen ? "rotate" : ""}`}
              />
            </div>
            <ul className={`submenu ${isAccountOpen ? "open" : ""}`}>
              <li>
                <Link to="/user/account-info" onClick={toggleNav}>
                  Account Info
                </Link>
              </li>
              <li>
                <Link to="/user/orders" onClick={toggleNav}>
                  Orders
                </Link>
              </li>
              <li>
                <Link to="/" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavMenu;
