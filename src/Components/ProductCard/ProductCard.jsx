import { useState, useMemo, useCallback } from "react";
import Skeleton from "antd/es/skeleton/";
import axiosInstance from "../../api/axiosConfig.js";
import { useModal } from "../../Context/ModalContext/ModalContext";
import { message, notification } from "antd";
import "./ProductCard.css";

const ProductCard = ({ product, updateCartCount, navigateToPage }) => {
  const {
    Id,
    Images,
    Name,
    Price,
    Stock,
    OrderMinimumQuantity,
    OrderMaximumQuantity ,
  } = product.data || product;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quantity, setQuantity] = useState(OrderMinimumQuantity);

  const { openModal } = useModal();

  const isFixedStep = OrderMinimumQuantity === 12;

  const quantities = useMemo(() => {
    if (!isFixedStep) return [];
    const list = [];
    for (let i = OrderMinimumQuantity; i <= 228 && i <= OrderMaximumQuantity; i += OrderMinimumQuantity) {
      list.push(i);
    }
    return list;
  }, [OrderMinimumQuantity, OrderMaximumQuantity]);

  const shortenedName = Name.length > 36 ? `${Name.substring(0, 36)}...` : Name;

  const handleImageLoad = () => setIsLoading(false);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= OrderMinimumQuantity && value <= OrderMaximumQuantity) {
      setQuantity(value);
    }
  };

  // Handle manual input for number input (prevent going below minimum)
  const handleQuantityInput = (e) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < OrderMinimumQuantity) {
      setQuantity(OrderMinimumQuantity);
    } else if (value > OrderMaximumQuantity) {
      setQuantity(OrderMaximumQuantity);
    } else {
      setQuantity(value);
    }
  };

  // Handle key events to prevent invalid input
  const handleKeyDown = (e) => {
    // Allow: backspace, delete, tab, escape, enter
    if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        (e.keyCode === 65 && e.ctrlKey === true) ||
        (e.keyCode === 67 && e.ctrlKey === true) ||
        (e.keyCode === 86 && e.ctrlKey === true) ||
        (e.keyCode === 88 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (isSubmitting || quantity < OrderMinimumQuantity) return;

    setIsSubmitting(true);

    try {
      const response = await axiosInstance.post(`/cart/add`, {
        productId: Id,
        quantity,
      });

      if (response.data.success) {
        notification.success({
          message: (
            <div style={{ textAlign: "center" }}>
              Added to Cart! <a onClick={() => navigateToPage("/cart")}>Go to Cart</a>
            </div>
          ),
          duration: 3,
          key: "added-to-cart",
          placement: "top",
        });
        updateCartCount?.();
      } else {
        message.error(response.data.message || "Error adding to cart");
      }
    } catch (error) {
      console.error("Add to Cart Error:", error);
      message.error("Failed to Add to Cart");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (Stock > 0) openModal(product);
  };

  return (
    <div className="product-card">
      <div className="product-image-container" onClick={handleClick}>
        {isLoading && <Skeleton.Image active />}
        <img
          src={Images[0]}
          alt="Product"
          className="product-image"
          onLoad={handleImageLoad}
          style={{ display: isLoading ? "none" : "block" }}
        />
        {Stock === 0 && (
          <div className="out-of-stock-overlay">
            <p>Out of Stock</p>
          </div>
        )}
      </div>

      <hr className="card-seperator" />

      <div className="product-detail">
        <p className="product-name">{shortenedName}</p>
        
        {Stock > 0 && (
          <div className="price-controls-container">
            <p className="product-price">${Price.toFixed(2)}</p>
            
            <div className="quantity-cart-controls">
              {isFixedStep ? (
                <select
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="quantity-select"
                >
                  {quantities.map((qty) => (
                    <option key={qty} value={qty}>
                      {qty}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="number"
                  min={OrderMinimumQuantity}
                  max={OrderMaximumQuantity}
                  value={quantity}
                  onChange={handleQuantityChange}
                  onBlur={handleQuantityInput}
                  onKeyDown={handleKeyDown}
                  className="quantity-input"
                />
              )}
              <button
                className="add-btn"
                onClick={handleAddToCart}
                disabled={isSubmitting || quantity < OrderMinimumQuantity}
              >
                {isSubmitting ? "..." : "Add"}
              </button>
            </div>
          </div>
        )}

        {Stock === 0 && (
          <div className="price-controls-container">
            <p className="product-price">${Price.toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;