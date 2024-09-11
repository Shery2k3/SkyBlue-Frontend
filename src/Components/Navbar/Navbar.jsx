import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoAccent from "/Logos/LogoAccent.png";
import { useNav } from "../../Context/NavContext/NavContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faBars,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

const items = [
  {
    key: "1",
    label: <Link to="/best-sellers">Best Sellers</Link>,
  },
  {
    key: "2",
    label: <Link to="/new-arrivals">New Arrivals</Link>,
  },
  {
    key: "3",
    label: <Link to="/categories">Categories</Link>,
    disabled: true,
  },
];

const Navbar = () => {
  const { isNavOpen, toggleNav } = useNav();
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isVisible ? "visible" : ""}`}>
      <FontAwesomeIcon icon={faBars} className="menu" onClick={toggleNav}/>
      <Link to="/">
        <img src={LogoAccent} alt="logo" className="logo" />
      </Link>
      <div className="nav-item-container">
        <ul className="items">
          <li>
            <Link to="/">Home</Link>
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

        <Link to="/cart" className="cart">
          <FontAwesomeIcon icon={faCartShopping} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
