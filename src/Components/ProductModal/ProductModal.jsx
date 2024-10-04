import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCartCount } from "../../Context/CartCount/CartCount";
import useRetryRequest from "../../api/useRetryRequest";
import axiosInstance from "../../api/axiosConfig";
import {
  faMinus,
  faPlus,
  faCartShopping,
  faX,
} from "@fortawesome/free-solid-svg-icons";

import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import "./ProductModal.css";
import Skeleton from "antd/es/skeleton/";
import message from "antd/es/message/";

const ProductModal = ({ product, onClose }) => {
  const { cartCount, updateCartCount } = useCartCount();

  const {
    Id,
    Images = [product.images],
    Name,
    Price,
    Stock,
    OrderMinimumQuantity,
    AllowedQuantities,
  } = product.data || product;

  const quantities = AllowedQuantities
    ? AllowedQuantities.split(",").map(Number)
    : null;
  const [quantity, setQuantity] = useState(
    quantities && quantities.length > 0 ? quantities[0] : 1
  );

  const [isInWishlist, setIsInWishlist] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessingWishlist, setIsProcessingWishlist] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dropdownRef = useRef(null);
  const retryRequest = useRetryRequest();
  const dropdownContainerRef = useRef(null);
  const inputRef = useRef(null);

  const increaseQuantity = () => {
    const incrementValue =
      quantities && quantities.length > 0 ? quantities[0] : 1;

    setQuantity((prevQuantity) => prevQuantity + incrementValue);
  };

  const decreaseQuantity = () => {
    const decrementValue =
      quantities && quantities.length > 0 ? quantities[0] : 1;

    if (quantity > decrementValue) {
      setQuantity((prevQuantity) => prevQuantity - decrementValue);
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
    if (isSubmitting) return;
    setIsSubmitting(true);

    message.loading({ content: "Adding item...", key: "add" });
    try {
      const response = await axiosInstance.post(`/cart/add`, {
        productId: Id,
        quantity: quantity,
      });
      message.success({
        content: "Added to Cart!",
        key: "add",
        duration: 1,
      });
      onClose();
    } catch (error) {
      console.error("Error submitting product:", error);
      message.error("Failed to Add to Cart");
    } finally {
      updateCartCount();
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchWishListInfo = async () => {
      try {
        const response = await retryRequest(() =>
          axiosInstance.get(`/customer/check-wishlist/${Id}`)
        );
        setIsInWishlist(response.data);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };

    fetchWishListInfo();
  }, [retryRequest]);

  const addtoWishlist = async () => {
    if (isProcessingWishlist) return; // Prevent action if processing
    setIsProcessingWishlist(true); // Set processing state
    setIsInWishlist(true);
    message.loading({ content: "Adding item...", key: "addwishlist" });
    try {
      const response = await axiosInstance.post(`/customer/wishlist/${Id}`);
      message.success({
        content: "Added to Wishlist!",
        key: "addwishlist",
        duration: 1,
      });
    } catch (error) {
      console.error("Error submitting product:", error);
      message.error("Failed to Add to Wishlist");
      setIsInWishlist(false);
    } finally {
      setIsProcessingWishlist(false); // Reset processing state
    }
  };

  const removefromWishlist = async () => {
    if (isProcessingWishlist) return; // Prevent action if processing
    setIsProcessingWishlist(true); // Set processing state
    setIsInWishlist(false);
    message.loading({ content: "Removing item...", key: "removewishlist" });
    try {
      const response = await axiosInstance.delete(`/customer/wishlist/${Id}`);
      message.success({
        content: "Removed from Wishlist!",
        key: "removewishlist",
        duration: 1,
      });
    } catch (error) {
      console.error("Error submitting product:", error);
      message.error("Failed to Remove from Wishlist");
      setIsInWishlist(true);
    } finally {
      setIsProcessingWishlist(false); // Reset processing state
    }
  };

  return (
    <div className="product-modal-container" onClick={handleClose}>
      <div className="product-modal">
        <div className="product-image-container">
          {isLoading && <Skeleton.Image active />}
          <img
            src={Images[0]}
            className="product-image"
            alt={Name}
            onLoad={handleImageLoad}
            style={{ display: isLoading ? "none" : "block" }}
          />
        </div>

        <div className="product-detail">
          <span>
            <h2 className="product-title">{Name}</h2>
            <p className="available">Availability: In stock ({Stock})</p>
          </span>
          <span>
            <p className="product-price">${Price.toFixed(2)}</p>
            <hr />
            <p className="product-unit-price">Unit Price: ${Price}</p>
          </span>
          <div className="product-quantity">
            {!AllowedQuantities && (
              <span className="button" onClick={decreaseQuantity}>
                <FontAwesomeIcon icon={faMinus} />
              </span>
            )}

            {!AllowedQuantities ? (
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
            {!AllowedQuantities && (
              <span className="button" onClick={increaseQuantity}>
                <FontAwesomeIcon icon={faPlus} />
              </span>
            )}
          </div>
          <div className="add-to-cart-container">
            <div
              className={`add-to-cart ${isSubmitting ? "disabled" : ""}`}
              onClick={handleSubmit}
              style={{ cursor: isSubmitting ? "wait" : "pointer" }}
            >
              <FontAwesomeIcon icon={faCartShopping} /> <p>Add to Cart</p>
            </div>
            <FontAwesomeIcon
              className="wishlist-mark"
              icon={isInWishlist ? solidHeart : regularHeart}
              onClick={isInWishlist ? removefromWishlist : addtoWishlist}
              style={{ cursor: isProcessingWishlist ? "wait" : "pointer" }}
            />
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
