import SearchBar from "../Search/SearchBar";
import { Link } from "react-router-dom";
import LogoAccent from "/Logos/LogoAccent.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCategoryNav } from "../../Context/CategoryMenuContext/CategoryMenuContext";
import { useNav } from "../../Context/NavContext/NavContext";
import { useCartCount } from "../../Context/CartCount/CartCount";
import {
  faHeart,
  faCartShopping,
  faChevronDown,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const { isNavOpen, toggleNav } = useNav();
  const { cartCount, updateCartCount } = useCartCount();
  const { isCategoryNavOpen, toggleCategoryNav } = useCategoryNav();

  return (
    <div className="header">
      <div className="header-left">
        <Link to="/">
          <img src={LogoAccent} alt="logo" className="logo" />
        </Link>
        <FontAwesomeIcon icon={faBars} className="menu" onClick={toggleNav} />
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

          <li onClick={toggleCategoryNav}>
            <p>All Categories</p>
          </li>
        </ul>
      </div>

      <div className="header-right">
        <SearchBar />
        <div className="cart-options">
          <Link to="/wishlist">
            <FontAwesomeIcon className="shoping-cart" icon={faHeart} />
          </Link>
          <Link className="cart" to="/cart">
            <span className="cart-count">{cartCount}</span>
            <FontAwesomeIcon className="shoping-cart" icon={faCartShopping} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
