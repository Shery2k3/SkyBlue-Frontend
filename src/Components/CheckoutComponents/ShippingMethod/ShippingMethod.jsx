import { useState, useEffect } from "react";
import "./ShippingMethod.css";

const ShippingMethod = ({ selectedOption, setSelectedOption, shippingMethods }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(shippingMethods);
  }, [shippingMethods]);

  const handleOptionChange = (e) => {
    const selectedMethod = options.find(option => option.shippingMethod === e.target.value);
    setSelectedOption(selectedMethod);
  };

  return (
    <div className="shipping-method">
      <h3>Select Shipping Method</h3>
      <div className="options">
        {options.map((method) => (
          <label key={method.newShippingMethodId} className={`option ${selectedOption === method ? "active" : ""}`}>
            <input
              type="radio"
              value={method.shippingMethod}
              checked={selectedOption === method}
              onChange={handleOptionChange}
            />
            {method.shippingMethod} ($0.00)
          </label>
        ))}
      </div>
    </div>
  );
};

export default ShippingMethod;
