import { useNavigate, useLocation, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import "./AccountOptions.css";

const AccountOptions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Function to check if the link is active
  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <div className="account-options-container">
      <ul className="account-options">
        <li>
          <Link to="/user/account-info" className={`account-link ${isActive("/user/account-info")}`}>
            Account Info
          </Link>
        </li>
        <li>
          <Link to="/user/orders" className={`account-link ${isActive("/user/orders")}`}>
            Orders
          </Link>
        </li>
        <li>
          <Link to="/user/change-password" className={`account-link ${isActive("/user/change-password")}`}>
            Change Password
          </Link>
        </li>
      </ul>
      <button className="logout-button" onClick={handleLogout}>
        Logout Account
      </button>
    </div>
  );
};

export default AccountOptions;
