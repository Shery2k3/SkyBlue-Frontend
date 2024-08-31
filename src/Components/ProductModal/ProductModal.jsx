import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus,
  faCartShopping,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import "./ProductModal.css";
import { message } from "antd";
import axiosInstance from "../../api/axiosConfig";

const ProductModal = ({ product, onClose }) => {
  const { Id, Images, Name, Price, Stock, OrderMinimumQuantity } =
    product.data || product;
  const [quantity, setQuantity] = useState(OrderMinimumQuantity || 1);
  const quantities = Array.from(
    { length: 20 },
    (_, i) => (i + 1) * OrderMinimumQuantity
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const dropdownContainerRef = useRef(null);
  const inputRef = useRef(null);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + (OrderMinimumQuantity || 1));
  };

  const decreaseQuantity = () => {
    if (quantity > (OrderMinimumQuantity || 1)) {
      setQuantity((prevQuantity) => prevQuantity - (OrderMinimumQuantity || 1));
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleBlur = () => {
    const value = parseInt(inputRef.current.value, 10);
    if (!isNaN(value) && value >= (OrderMinimumQuantity || 1)) {
      const roundedValue = Math.max(
        OrderMinimumQuantity || 1,
        Math.ceil(value / (OrderMinimumQuantity || 1)) *
          (OrderMinimumQuantity || 1)
      );
      setQuantity(roundedValue);
    } else {
      setQuantity(OrderMinimumQuantity || 1);
    }
  };

  const handleDropdownSelection = (selectedQuantity) => {
    setQuantity(selectedQuantity);
    setDropdownOpen(false);
  };

  const handleClose = (e) => {
    if (e.target.classList.contains("product-modal-container")) {
      onClose();
    }
  };

  const handleClickOutside = (e) => {
    if (
      dropdownContainerRef.current &&
      !dropdownContainerRef.current.contains(e.target)
    ) {
      setDropdownOpen(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post(`/cart/add`, {
        productId: Id,
        quantity: quantity,
      });
      message.success("Order Placed");
      onClose()
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="product-modal-container" onClick={handleClose}>
      <div className="product-modal">
        <div className="product-image-container">
          <img src={Images[0]} className="product-image" alt={Name} />
        </div>
        <div className="product-detail">
          <span>
            <h2 className="product-title">{Name}</h2>
            <p className="available">Availability: In stock ({Stock})</p>
          </span>
          <span>
            <p className="product-price">${Price}</p>
            <hr />
            <p className="product-unit-price">Unit Price: ${Price}</p>
          </span>
          <div className="product-quantity">
            <span className="button" onClick={decreaseQuantity}>
              <FontAwesomeIcon icon={faMinus} />
            </span>
            {OrderMinimumQuantity === 1 ? (
              <input
                type="number"
                className="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                onBlur={handleBlur}
                min={OrderMinimumQuantity || 1}
                ref={inputRef}
              />
            ) : (
              <div
                className="quantity-dropdown-container"
                ref={dropdownContainerRef}
              >
                <div
                  className="quantity-dropdown"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {quantity}
                </div>
                <div
                  className={`quantity-dropdown-menu ${
                    dropdownOpen ? "show" : ""
                  }`}
                  ref={dropdownRef}
                >
                  {quantities.map((qty) => (
                    <span
                      key={qty}
                      onClick={() => handleDropdownSelection(qty)}
                    >
                      {qty}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <span className="button" onClick={increaseQuantity}>
              <FontAwesomeIcon icon={faPlus} />
            </span>
          </div>
          <div className="add-to-cart" onClick={handleSubmit}>
            <FontAwesomeIcon icon={faCartShopping} /> <p>Add to Cart</p>
          </div>
        </div>
        <div className="close" onClick={onClose}>
          <FontAwesomeIcon icon={faX} />
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
