import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faUser,
  faCaretDown,
  faBars,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import Dropdown from "antd/es/dropdown";
import Menu from "antd/es/menu";
import LogoAccent from "/Logos/LogoAccent.png";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isActive, setActive] = useState(false);
  const [startX, setStartX] = useState(0);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const accountItems = [
    {
      key: "1",
      label: <Link to="/user/account-info">Account Info</Link>,
    },
    {
      key: "2",
      label: <Link to="/user/orders">Orders</Link>,
    },
    {
      key: "3",
      label: (
        <Link to="/login" onClick={logout}>
          Logout
        </Link>
      ),
    },
  ];

  const activate = () => {
    setActive(!isActive);
  };

  const closeNav = () => {
    setActive(false);
  };

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (startX - e.touches[0].clientX > 50) {
      closeNav();
    }
  };

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

  const handleLinkClick = () => {
    setActive(false);
    document.body.classList.remove("no-scroll");
  };

  return (
    <nav className={`navbar ${isSticky ? "sticky" : ""}`}>
      <FontAwesomeIcon icon={faBars} onClick={activate} className="menu" />
      <Link to="/">
        <img
          src={LogoAccent}
          alt="Logo"
          className={isSticky ? "small-logo" : ""}
        />
      </Link>

      <Link to="/cart">
        <FontAwesomeIcon icon={faCartShopping} className="menu" />
      </Link>

      <ul
        className={isActive ? "nav-links open" : "nav-links"}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <FontAwesomeIcon
          icon={faX}
          className="menu-closer"
          onClick={closeNav}
        />
        <Link to="/">
          <img src={LogoAccent} alt="Logo" className="nav-logo" />
        </Link>
        <li>
          <Link
            className={`nav-items ${
              location.pathname === "/" ? "nav-item-active" : ""
            }`}
            onClick={() => {
              scrollToTop();
              handleLinkClick();
            }}
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
            onClick={() => {
              scrollToTop();
              handleLinkClick();
            }}
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
            onClick={() => {
              scrollToTop();
              handleLinkClick();
            }}
            to="/best-sellers"
          >
            Best Sellers
          </Link>
        </li>
        <li>
          <Link
            className={`nav-items ${
              location.pathname === "/all-products" ? "nav-item-active" : ""
            }`}
            onClick={() => {
              scrollToTop();
              handleLinkClick();
            }}
            to="/all-products"
          >
            Exclusive Products
          </Link>
        </li>
        <li>
          <Link
            className={`nav-items ${
              location.pathname === "/contact-us" ? "nav-item-active" : ""
            }`}
            onClick={() => {
              scrollToTop();
              handleLinkClick();
            }}
            to="/contact-us"
          >
            Contact
          </Link>
        </li>
        <li>
          <Link
            className={`nav-items responsive ${
              location.pathname === "/user/account-info" ? "nav-item-active" : ""
            }`}
            onClick={() => {
              scrollToTop();
              handleLinkClick();
            }}
            to="/user/account-info"
          >
            My Account
          </Link>
        </li>
      </ul>

      <div className="icons">
        <Link className="cart-icon" to="/cart">
          <FontAwesomeIcon icon={faCartShopping} />
        </Link>
        <Dropdown
          overlay={<Menu items={accountItems} />}
          placement="bottomRight"
          arrow={{
            pointAtCenter: true,
          }}
        >
          <Link to="/user/account-info">
            <div className="user">
              <span className="user-icon">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <FontAwesomeIcon className="dropdown-icon" icon={faCaretDown} />
            </div>
          </Link>
        </Dropdown>
      </div>
    </nav>
  );
};

export default Navbar;
