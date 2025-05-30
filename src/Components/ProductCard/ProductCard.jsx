import { useState, useMemo } from "react";
import Skeleton from "antd/es/skeleton/";
import axiosInstance from "../../api/axiosConfig.js";
import { useModal } from "../../Context/ModalContext/ModalContext";
import { message, notification } from "antd";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, updateCartCount }) => {
  const {
    Id,
    Images,
    Name,
    Price,
    Stock,
    AllowedQuantities,
    OrderMinimumQuantity,
    OrderMaximumQuantity,
  } = product.data || product;

  // console.log("product", product);
  // console.log("AllowedQuantities", AllowedQuantities);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [quantity, setQuantity] = useState(() => {
    if (AllowedQuantities) {
      const first = AllowedQuantities.split(",")[0].trim();
      return first;
    }
    return OrderMinimumQuantity.toString();
  });

  const { openModal } = useModal();
  const navigate = useNavigate();

  const hasAllowedQuantities = !!AllowedQuantities;

  const quantities = useMemo(() => {
    if (!hasAllowedQuantities) return [];
    return AllowedQuantities.split(",").map((val) => parseInt(val.trim(), 10));
  }, [AllowedQuantities]);

  const shortenedName = Name.length > 36 ? `${Name.substring(0, 36)}...` : Name;

  const handleImageLoad = () => setIsLoading(false);

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setQuantity(value); // store as string to allow editing freely
    }
  };

  // Handle manual input for number input (prevent going below minimum)
  const handleQuantityInput = () => {
    const parsed = parseInt(quantity, 10);
    if (isNaN(parsed) || parsed < OrderMinimumQuantity) {
      setQuantity(OrderMinimumQuantity.toString());
    } else if (parsed > OrderMaximumQuantity) {
      setQuantity(OrderMaximumQuantity.toString());
    } else {
      setQuantity(parsed.toString());
    }
  };

  // Handle key events to prevent invalid input
  const handleKeyDown = (e) => {
    // Allow: backspace, delete, tab, escape, enter
    if (
      [46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      (e.keyCode === 65 && e.ctrlKey === true) ||
      (e.keyCode === 67 && e.ctrlKey === true) ||
      (e.keyCode === 86 && e.ctrlKey === true) ||
      (e.keyCode === 88 && e.ctrlKey === true) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)
    ) {
      return;
    }
    // Ensure that it is a number and stop the keypress
    if (
      (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
      (e.keyCode < 96 || e.keyCode > 105)
    ) {
      e.preventDefault();
    }
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (isSubmitting || quantity < OrderMinimumQuantity) return;

    setIsSubmitting(true);

    const parsedQuantity = parseInt(quantity, 10);
    if (isSubmitting || parsedQuantity < OrderMinimumQuantity) return;

    try {
      const response = await axiosInstance.post(`/cart/add`, {
        productId: Id,
        quantity: parsedQuantity,
      });

      console.log("Add to Cart Response:", response);

      if (response.data.success) {
        notification.success({
          message: (
            <div style={{ textAlign: "center" }}>
              Added to Cart! <a onClick={() => navigate("/cart")}>Go to Cart</a>
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
              {hasAllowedQuantities ? (
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
