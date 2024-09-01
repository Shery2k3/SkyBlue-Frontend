import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import "./AccountOptions.css";

const AccountOptions = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="account-options-container">
      <ul className="account-options">
        <li>
          <Link to="/user/account-info" className="account-link">Account Info</Link>
        </li>
        <li>
          <Link to="/user/orders" className="account-link">Orders</Link>
        </li>
        <li>
          <Link to="/user/change-password" className="account-link">Change Password</Link>
        </li>
      </ul>
      <button className="logout-button" onClick={handleLogout}>
        Logout Account
      </button>
    </div>
  );
};

export default AccountOptions;
