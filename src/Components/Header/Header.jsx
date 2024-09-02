import SearchBar from "../Search/SearchBar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <div className="header">
      <SearchBar />
      <Link to="/cart">
        <FontAwesomeIcon className="shoping-cart" icon={faCartShopping} />
      </Link>
    </div>
  );
};

export default Header;
