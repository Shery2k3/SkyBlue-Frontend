import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoAccent from "/Logos/LogoAccent.png";
import { useNav } from "../../Context/NavContext/NavContext";
import { useCategoryNav } from "../../Context/CategoryMenuContext/CategoryMenuContext";
import { useCartCount } from "../../Context/CartCount/CartCount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faBars,
  faHeart,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

const NavbarFixed = () => {
  const { isNavOpen, toggleNav } = useNav();
  const { cartCount, updateCartCount } = useCartCount();
  const { isCategoryNavOpen, toggleCategoryNav } = useCategoryNav();

  return (
    <nav className="navbar visible">
      <FontAwesomeIcon icon={faBars} className="menu" onClick={toggleNav} />
      <Link to="/">
        <img src={LogoAccent} alt="logo" className="logo" />
      </Link>
      <div className="nav-item-container">
        <ul className="items">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li onClick={toggleCategoryNav}>
            <p>All Categories</p>
          </li>
          <li className="shop-menu">
            <Link to="/all-products">
              Shop{" "}
              <span>
                <FontAwesomeIcon icon={faChevronDown} />
              </span>
            </Link>
            <div className="nav-dropdown-content">
              <Link to="/all-products" className="nav-drop-down-item">
                All Products
              </Link>
              <Link to="/best-sellers" className="nav-drop-down-item">
                Best Sellers
              </Link>
              <Link to="/new-arrivals" className="nav-drop-down-item">
                New Arrivals
              </Link>
              <Link to="/categories" className="nav-drop-down-item">
                Categories
              </Link>
            </div>
          </li>
          <li>
            <Link to="/contact-us">Contact</Link>
          </li>
          <li>
            <Link to="/user/account-info">My Account</Link>
          </li>
        </ul>

        <div className="cart-options">
          <Link to="/wishlist" className="heart">
            <FontAwesomeIcon icon={faHeart} />
          </Link>
          <Link to="/cart" className="cart">
            <span className="cart-count">{cartCount}</span>
            <FontAwesomeIcon icon={faCartShopping} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavbarFixed;
