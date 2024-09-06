import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./NotFound.css";
import tick from "../../assets/tick.png";

const OrderPlaced = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state || !location.state.orderPlaced) {
      navigate("/404");
    }
  }, [location, navigate]);

  return (
    <div className="bg-container">
      <div className="container">
        <img src={tick} alt="404 image" />
        <p className="text">Thank you for Ordering!</p>
        <p>We will be sending you an email confirmation shortly</p>
        <Link to="/" className="link">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderPlaced;
