import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import Skeleton from "antd/es/skeleton";
import { message, notification } from "antd";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";
import { useModal } from "../../Context/ModalContext/ModalContext";
import { useCartCount } from "../../Context/CartCount/CartCount";
import axiosInstance from "../../api/axiosConfig";

const ProductCard = ({ product }) => {
  const { openModal } = useModal();
  const { updateCartCount } = useCartCount();
  const navigate = useNavigate();
  const quantityContainerRef = useRef(null);
  
  // Extract product data once
  const {
    Images,
    Name,
    Price,
    Stock,
    OrderMinimumQuantity = 1,
    OrderMaximumQuantity,
    AllowedQuantities,
    Id
  } = product.data || product;

  // Component states
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showQuantityInput, setShowQuantityInput] = useState(false);
  const [quantity, setQuantity] = useState(OrderMinimumQuantity);
  
  // Derived data using useMemo
  const shortenedName = useMemo(() => 
    Name.length > 36 ? `${Name.substring(0, 36)}...` : Name
  , [Name]);

  // Calculate quantity options and restrictions once when product changes
  const { quantityOptions, hasRestrictions } = useMemo(() => {
    // Case 1: If AllowedQuantities is specified
    if (AllowedQuantities && Array.isArray(AllowedQuantities) && AllowedQuantities.length > 0) {
      return {
        quantityOptions: AllowedQuantities,
        hasRestrictions: true
      };
    }
    
    // Case 2: If OrderMinimumQuantity suggests an increment pattern
    if (OrderMinimumQuantity && OrderMinimumQuantity > 1) {
      const possibleIncrement = OrderMinimumQuantity;
      const maxQty = Math.min(
        OrderMaximumQuantity || Stock,
        Stock || 1000,
        240
      );
      
      const options = [];
      for (let i = possibleIncrement; i <= maxQty; i += possibleIncrement) {
        options.push(i);
      }
      
      if (options.length > 1) {
        return {
          quantityOptions: options,
          hasRestrictions: true
        };
      }
    }
    
    // Default: no special restrictions
    return {
      quantityOptions: [],
      hasRestrictions: false
    };
  }, [AllowedQuantities, OrderMinimumQuantity, OrderMaximumQuantity, Stock]);

  // Update quantity when options change
  useEffect(() => {
    setQuantity(hasRestrictions && quantityOptions.length > 0 ? quantityOptions[0] : OrderMinimumQuantity);
  }, [hasRestrictions, quantityOptions, OrderMinimumQuantity]);

  // Close quantity selector when clicking outside
  useEffect(() => {
    if (!showQuantityInput) return;
    
    const handleClickOutside = (event) => {
      if (quantityContainerRef.current && !quantityContainerRef.current.contains(event.target)) {
        setShowQuantityInput(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showQuantityInput]);

  // Event handlers (wrapped in useCallback to prevent unnecessary rerenders)
  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleClick = useCallback(() => {
    if (Stock > 0 && !showQuantityInput) {
      openModal(product);
    }
  }, [Stock, showQuantityInput, openModal, product]);

  const toggleQuantityInput = useCallback((e) => {
    e.stopPropagation();
    if (Stock > 0) {
      setShowQuantityInput(prev => !prev);
    }
  }, [Stock]);

  const handleQuantityChange = useCallback((e) => {
    e.stopPropagation();
    const value = Math.max(
      OrderMinimumQuantity,
      Math.min(
        parseInt(e.target.value) || OrderMinimumQuantity,
        OrderMaximumQuantity || Stock,
        Stock
      )
    );
    setQuantity(value);
  }, [OrderMinimumQuantity, OrderMaximumQuantity, Stock]);

  const handleQuantityOptionClick = useCallback((qty, e) => {
    e.stopPropagation();
    setQuantity(qty);
  }, []);

  const handleAddToCart = useCallback(async (e) => {
    e.stopPropagation();
    setIsSubmitting(true);
    
    try {
      const response = await axiosInstance.post('/cart/add', {
        productId: Id || product.Id,
        quantity
      });

      if (response.data.success) {
        notification.success({
          message: (
            <div style={{ textAlign: "center" }}>
              Added to Cart!{" "}
              <a onClick={() => navigate("/cart")}>Go to Cart</a>
            </div>
          ),
          duration: 3,
          key: "added-to-cart",
          placement: "top"
        });
      } else {
        message.error({
          content: response.data.message,
          key: "add",
          duration: 3
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      const errorMessage = error.response?.data?.message || "Failed to Add to Cart";
      message.error(errorMessage);
    } finally {
      updateCartCount();
      setIsSubmitting(false);
      setShowQuantityInput(false);
    }
  }, [Id, product.Id, quantity, navigate, updateCartCount]);

  // Render helpers - split rendering into logical sections
  const renderQuantitySelector = () => {
    if (!showQuantityInput) {
      return (
        <span className="add-to-cart" onClick={toggleQuantityInput}>
          <FontAwesomeIcon icon={faPlus} />
        </span>
      );
    }

    return (
      <div
        ref={quantityContainerRef}
        className={hasRestrictions ? "quantity-options-container" : "quantity-input-container"}
        onClick={(e) => e.stopPropagation()}
      >
        {hasRestrictions ? (
          <>
            <button className="close-btn" onClick={toggleQuantityInput} disabled={isSubmitting}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <div className="quantity-tabs-wrapper">
              <div className="quantity-tabs">
                {quantityOptions.map((qty) => (
                  <button
                    key={qty}
                    className={`quantity-tab ${quantity === qty ? "active" : ""}`}
                    onClick={(e) => handleQuantityOptionClick(qty, e)}
                    disabled={isSubmitting}
                  >
                    {qty}
                  </button>
                ))}
              </div>
            </div>
            <button 
              className="quantity-btn add" 
              onClick={handleAddToCart}
              disabled={isSubmitting}
            >
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
              min={OrderMinimumQuantity}
              max={OrderMaximumQuantity || Stock}
              disabled={isSubmitting}
            />
            <button 
              className="quantity-btn add" 
              onClick={handleAddToCart}
              disabled={isSubmitting}
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>
          </>
        )}
      </div>
    );
  };

  // Main render
  return (
    <div className="product-card" onClick={handleClick}>
      <div className="product-image-container">
        {isLoading && <Skeleton.Image active />}
        <img
          src={Images[0]}
          alt={Name}
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
        {renderQuantitySelector()}
      </div>
    </div>
  );
};

export default ProductCard;