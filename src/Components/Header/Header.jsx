import SearchBar from "../Search/SearchBar";
import { Link } from "react-router-dom";
import { Dropdown } from "antd";
import LogoAccent from "/Logos/LogoAccent.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNav } from "../../Context/NavContext/NavContext";
import {
  faCartShopping,
  faChevronDown,
  faBars
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

const Header = () => {
  const { isNavOpen, toggleNav } = useNav();

  return (
    <div className="header">
      <div className="header-left">
        <Link to="/">
          <img src={LogoAccent} alt="logo" className="logo" />
        </Link>
        <FontAwesomeIcon icon={faBars} className="menu" onClick={toggleNav}/>
        <ul className="items">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Dropdown
              menu={{ items }}
              placement="bottom"
              arrow={{
                pointAtCenter: true,
              }}
            >
              <Link to="/all-products">
                Shop{" "}
                <span>
                  {" "}
                  <FontAwesomeIcon icon={faChevronDown} />
                </span>
              </Link>
            </Dropdown>
          </li>
          <li>
            <Link to="/contact-us">Contact</Link>
          </li>
          <li>
            <Link to="/">My Account</Link>
          </li>
        </ul>
      </div>

      <div className="header-right">
        <SearchBar />
        <Link to="/cart">
          <FontAwesomeIcon className="shoping-cart" icon={faCartShopping} />
        </Link>
      </div>
    </div>
  );
};

export default Header;
