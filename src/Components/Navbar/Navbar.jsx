import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "antd";
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

        <Link to="/cart" className="cart">
          <FontAwesomeIcon icon={faCartShopping} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
