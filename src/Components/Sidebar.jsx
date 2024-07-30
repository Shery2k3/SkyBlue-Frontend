import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import logo from "../assets/sidebar/Logo.svg";
import sorting from "../assets/sidebar/Sorting.svg";
import expandarrow from "../assets/sidebar/ExpandArrow.svg";
import home from "../assets/sidebar/HomePage.svg";
import newarrival from "../assets/sidebar/New.svg";
import bestseller from "../assets/sidebar/BestSeller.svg";
import exclusiveproducts from "../assets/sidebar/Star.svg";
import contact from "../assets/sidebar/IDVerified.svg";
import account from "../assets/sidebar/Registration.svg"
import settings from "../assets/sidebar/Settings.svg"

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="SkyBlue Logo" />
      </div>
      
      {/* Category button */}
      <button className="category-button">
        <img src={sorting} alt="sorting image" />
        <p className="button-text">Categories</p>
        <img src={expandarrow} alt="expandarrow" />
      </button>

      <nav className="nav-section">
        <ul>
          <li>
            <Link to="/">
              <div className="nav-link">
                <img src={home} alt="home" />
                <span>Home</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/new-arrival">
              <div className="nav-link">
                <img src={newarrival} alt="new-arrival" />
                <span>New Arrival</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/best-sellers">
              <div className="nav-link">
                <img src={bestseller} alt="best-seller" />
                <span>Best Seller</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/exclusive-products">
              <div className="nav-link">
                <img src={exclusiveproducts} alt="exclusive-products" />
                <span>Exclusive Products</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <div className="nav-link">
                <img src={contact} alt="contact" />
                <span>Contact</span>
              </div>
            </Link>
          </li>
        </ul>
      </nav>

      <hr />

      <nav className="nav-section">
        <ul>
          <li>
            <Link to="/account">
              <div className="nav-link">
                <img src={account} alt="account" />
                <span>Account</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <div className="nav-link">
                <img src={settings} alt="settings" />
                <span>Settings</span>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
