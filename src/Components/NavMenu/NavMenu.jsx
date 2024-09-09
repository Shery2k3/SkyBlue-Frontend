import { useState } from "react";
import { useNav } from "../../Context/NavContext/NavContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./NavMenu.css";

const NavMenu = () => {
  const { isNavOpen, toggleNav } = useNav();
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

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
                <Link to="/best-seller" onClick={toggleNav}>
                  Best Seller
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
                <Link to="/login" onClick={toggleNav}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={toggleNav}>
                  Register
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
