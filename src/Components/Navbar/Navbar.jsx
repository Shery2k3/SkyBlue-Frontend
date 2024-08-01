import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCartShopping,
  faUser,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import LogoAccent from "/Logos/LogoAccent.png";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${isSticky ? "sticky" : ""}`}>
      <Link to="/">
        <img src={LogoAccent} alt="Logo" className={isSticky ? "small-logo" : ""} />
      </Link>
      <ul className="nav-links">
        <li>
          <Link
            className={`nav-items ${
              location.pathname === "/" ? "nav-item-active" : ""
            }`}
            onClick={scrollToTop}
            to="/"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className={`nav-items ${
              location.pathname === "/new-arrivals" ? "nav-item-active" : ""
            }`}
            onClick={scrollToTop}
            to="/new-arrivals"
          >
            New Arrivals
          </Link>
        </li>
        <li>
          <Link
            className={`nav-items ${
              location.pathname === "/best-sellers" ? "nav-item-active" : ""
            }`}
            onClick={scrollToTop}
            to="/best-sellers"
          >
            Best Sellers
          </Link>
        </li>
        <li>
          <Link
            className={`nav-items ${
              location.pathname === "/exclusive-products"
                ? "nav-item-active"
                : ""
            }`}
            onClick={scrollToTop}
            to="/exclusive-products"
          >
            Exclusive Products
          </Link>
        </li>
        <li>
          <Link
            className={`nav-items ${
              location.pathname === "/contact" ? "nav-item-active" : ""
            }`}
            onClick={scrollToTop}
            to="/contact"
          >
            Contact
          </Link>
        </li>
      </ul>
      <div className="icons">
        <FontAwesomeIcon icon={faHeart} />
        <FontAwesomeIcon icon={faCartShopping} />
        <div className="user" onClick={toggleDropdown}>
          <span className="user-icon">
            <FontAwesomeIcon icon={faUser} />
          </span>
          <FontAwesomeIcon className="dropdown-icon" icon={faCaretDown} />
        </div>
        {dropdownVisible && (
          <div className="dropdown-menu">
            <Link to="/profile">Profile</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/logout">Logout</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
