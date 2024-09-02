import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../public/Logos/logo.png";
import CategoryDropDown from "../CategoryDropDown/CategoryDropDown";
import home from "../../assets/sidebar/HomePage.svg";
import newarrival from "../../assets/sidebar/New.svg";
import bestseller from "../../assets/sidebar/BestSeller.svg";
import exclusiveproducts from "../../assets/sidebar/Star.svg";
import contact from "../../assets/sidebar/IDVerified.svg";
import account from "../../assets/sidebar/Registration.svg";

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Category button */}
      <div className="upper-nav">
        <div className="logo">
          <img src={logo} alt="SkyBlue Logo" />
        </div>
        <CategoryDropDown />

        <nav className="nav-section main-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/">
                <div className="nav-link">
                  <img src={home} alt="home" />
                  <span>Home</span>
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/new-arrivals">
                <div className="nav-link">
                  <img src={newarrival} alt="new-arrivals" />
                  <span>New Arrivals</span>
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/best-sellers">
                <div className="nav-link">
                  <img src={bestseller} alt="best-seller" />
                  <span>Best Seller</span>
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/all-products">
                <div className="nav-link">
                  <img src={exclusiveproducts} alt="all-products" />
                  <span>Exclusive Products</span>
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact-us">
                <div className="nav-link">
                  <img src={contact} alt="contact-us" />
                  <span>Contact</span>
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <nav className="nav-section bottom-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <hr className="divider" />
            <Link to="/user/account-info">
              <div className="nav-link">
                <img src={account} alt="account" />
                <span>Account</span>
              </div>
            </Link>
          </li>
      
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
