import { useState } from "react";
import "./ShippingMethod.css";

const ShippingMethod = ({ selectedOption, setSelectedOption }) => {

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="shipping-method">
      <h3>Select Shipping Method</h3>
      <div className="options">
        <label className={`option ${selectedOption === "Pickup" ? "active" : ""}`}>
          <input
            type="radio"
            value="Pickup"
            checked={selectedOption === "Pickup"}
            onChange={handleOptionChange}
          />
          Pickup ($0.00)
        </label>
        <label className={`option ${selectedOption === "Delivery" ? "active" : ""}`}>
          <input
            type="radio"
            value="Delivery"
            checked={selectedOption === "Delivery"}
            onChange={handleOptionChange}
          />
          Delivery ($0.00)
        </label>
        <label className={`option ${selectedOption === "Pallet Shipping" ? "active" : ""}`}>
          <input
            type="radio"
            value="Pallet Shipping"
            checked={selectedOption === "Pallet Shipping"}
            onChange={handleOptionChange}
          />
          Pallet Shipping ($0.00)
        </label>
      </div>
    </div>
  );
};

export default ShippingMethod;
