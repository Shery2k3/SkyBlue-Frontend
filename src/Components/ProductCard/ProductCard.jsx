import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Skeleton from "antd/es/skeleton/";
import { faPlus, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./ProductCard.css";
import { useModal } from "../../Context/ModalContext/ModalContext";
import { useCartCount } from "../../Context/CartCount/CartCount";
import { message } from "antd";
import axiosInstance from "../../api/axiosConfig";

const ProductCard = ({ product }) => {
  const { openModal } = useModal();
  const { cartCount, updateCartCount } = useCartCount();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    Images,
    Name,
    Price,
    Stock,
    OrderMinimumQuantity,
    OrderMaximumQuantity,
    AllowedQuantities,
  } = product.data || product;
  const [isLoading, setIsLoading] = useState(true);
  const [showQuantityInput, setShowQuantityInput] = useState(false);
  const [quantity, setQuantity] = useState(OrderMinimumQuantity || 1);
  const [quantityOptions, setQuantityOptions] = useState([]);
  const [hasRestrictions, setHasRestrictions] = useState(false);
  const quantityContainerRef = useRef(null);

  const shortenedName = Name.length > 36 ? `${Name.substring(0, 36)}...` : Name;

  // Determine if product has quantity restrictions and generate options
  useEffect(() => {
    // If AllowedQuantities is specified, use those values
    if (
      AllowedQuantities &&
      Array.isArray(AllowedQuantities) &&
      AllowedQuantities.length > 0
    ) {
      setQuantityOptions(AllowedQuantities);
      setHasRestrictions(true);
      return;
    }

    // If OrderMinimumQuantity > 1, check if it's a case of increment restriction
    if (OrderMinimumQuantity && OrderMinimumQuantity > 1) {
      // Check if OrderMinimumQuantity is likely an increment value (e.g., 12, 24, 36)
      const possibleIncrement = OrderMinimumQuantity;

      // Generate options based on increment up to max or stock
      const options = [];
      const maxQty = Math.min(
        OrderMaximumQuantity || Stock,
        Stock || 1000,
        240
      ); // Set maximum to 240 as requested

      for (let i = possibleIncrement; i <= maxQty; i += possibleIncrement) {
        options.push(i);
      }

      if (options.length > 1) {
        setQuantityOptions(options);
        setHasRestrictions(true);
        setQuantity(options[0]);
        return;
      }
    }

    // Default: no special restrictions
    setHasRestrictions(false);
    setQuantity(OrderMinimumQuantity || 1);
  }, [OrderMinimumQuantity, OrderMaximumQuantity, AllowedQuantities, Stock]);

  // Close quantity selector when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showQuantityInput &&
        quantityContainerRef.current &&
        !quantityContainerRef.current.contains(event.target)
      ) {
        setShowQuantityInput(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showQuantityInput]);

  const handleClick = () => {
    if (Stock > 0 && !showQuantityInput) {
      openModal(product);
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const toggleQuantityInput = (e) => {
    e.stopPropagation();
    if (Stock > 0) {
      setShowQuantityInput(!showQuantityInput);
      if (!showQuantityInput) {
        setQuantity(
          hasRestrictions ? quantityOptions[0] : OrderMinimumQuantity || 1
        );
      }
    }
  };

  const handleQuantityChange = (e) => {
    e.stopPropagation();
    let value = parseInt(e.target.value) || OrderMinimumQuantity || 1;

    // Apply min/max constraints
    if (OrderMinimumQuantity && value < OrderMinimumQuantity) {
      value = OrderMinimumQuantity;
    }
    if (OrderMaximumQuantity && value > OrderMaximumQuantity) {
      value = OrderMaximumQuantity;
    }
    if (value > Stock) {
      value = Stock;
    }

    setQuantity(value);
  };

  const handleQuantityOptionClick = (qty, e) => {
    e.stopPropagation();
    setQuantity(qty);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post(`/cart/add`, {
        productId: product.Id,
        quantity: quantity,
      });

      console.log(response);

      if (response.data.success) {
        message.success({
          content: "Added to Cart!",
          key: "add",
          duration: 1,
        });
      } else {
        // Handle validation errors from backend
        message.error({
          content: response.data.message,
          key: "add",
          duration: 3,
        });
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      // Extract error message from the backend if available
      const errorMessage =
        error.response?.data?.message || "Failed to Add to Cart";
      message.error(errorMessage);
    } finally {
      updateCartCount();
      setIsSubmitting(false);
      // Reset the quantity input display
      setShowQuantityInput(false);
    }
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="product-image-container">
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
        <p className="product-price">${Price.toFixed(2)}</p>

        {!showQuantityInput ? (
          <span className="add-to-cart" onClick={toggleQuantityInput}>
            <FontAwesomeIcon icon={faPlus} />
          </span>
        ) : (
          <div
            ref={quantityContainerRef}
            className={
              hasRestrictions
                ? "quantity-options-container"
                : "quantity-input-container"
            }
            onClick={(e) => e.stopPropagation()}
          >
            {hasRestrictions ? (
              <>
                <button className="close-btn" onClick={toggleQuantityInput}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
                <div className="quantity-tabs-wrapper">
                  <div className="quantity-tabs">
                    {quantityOptions.map((qty) => (
                      <button
                        key={qty}
                        className={`quantity-tab ${
                          quantity === qty ? "active" : ""
                        }`}
                        onClick={(e) => handleQuantityOptionClick(qty, e)}
                      >
                        {qty}
                      </button>
                    ))}
                  </div>
                </div>
                <button className="quantity-btn add" onClick={handleAddToCart}>
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              </>
            ) : (
              <>
                <input
                  type="number"
                  className="quantity-input"
                  value={quantity}
                  onChange={handleQuantityChange}
                  onClick={(e) => e.stopPropagation()}
                  min={OrderMinimumQuantity || 1}
                  max={OrderMaximumQuantity || Stock}
                />
                <button className="quantity-btn add" onClick={handleAddToCart}>
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
