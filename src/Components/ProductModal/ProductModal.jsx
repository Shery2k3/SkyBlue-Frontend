import React, { useState, useRef, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCartCount } from "../../Context/CartCount/CartCount";
import useRetryRequest from "../../api/useRetryRequest";
import axiosInstance from "../../api/axiosConfig";
import {
  faMinus,
  faPlus,
  faCartShopping,
  faX,
  faArrowLeft,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import "./ProductModal.css";
import { Skeleton, message, notification } from "antd";
import { useNavigate } from "react-router-dom";

const ProductModal = ({ product, onClose }) => {
  const { updateCartCount } = useCartCount();
  const navigate = useNavigate();
  const retryRequest = useRetryRequest();

  // Extract product data
  const {
    Id,
    Images = [product.images],
    Name,
    Price,
    Stock,
    OrderMinimumQuantity = 1,
    AllowedQuantities,
    ShortDescription,
    FullDescription,
  } = product.data || product;

  console.log("Product data:", product);

  // Parse allowed quantities
  const quantities = AllowedQuantities
    ? AllowedQuantities.split(",").map(Number)
    : null;

  // State management
  const [quantity, setQuantity] = useState(
    quantities && quantities.length > 0 ? quantities[0] : OrderMinimumQuantity
  );
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessingWishlist, setIsProcessingWishlist] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [alreadyInCartMessage, setAlreadyInCartMessage] = useState("");

  // Refs
  const dropdownRef = useRef(null);
  const dropdownContainerRef = useRef(null);
  const inputRef = useRef(null);

  // Handler functions
  const increaseQuantity = useCallback(() => {
    const incrementValue =
      quantities && quantities.length > 0 ? quantities[0] : 1;
    setQuantity((prevQuantity) => prevQuantity + incrementValue);
  }, [quantities]);

  const decreaseQuantity = useCallback(() => {
    const decrementValue =
      quantities && quantities.length > 0 ? quantities[0] : 1;
    if (quantity > decrementValue) {
      setQuantity((prevQuantity) => prevQuantity - decrementValue);
    }
  }, [quantities, quantity]);

  const handleQuantityChange = useCallback((e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setQuantity(value);
    }
  }, []);

  const handleBlur = useCallback(() => {
    const value = parseInt(inputRef.current.value, 10);
    if (!isNaN(value) && value >= OrderMinimumQuantity) {
      const roundedValue = Math.max(
        OrderMinimumQuantity,
        Math.ceil(value / OrderMinimumQuantity) * OrderMinimumQuantity
      );
      setQuantity(roundedValue);
    } else {
      setQuantity(OrderMinimumQuantity);
    }
  }, [OrderMinimumQuantity]);

  const handleDropdownSelection = useCallback((selectedQuantity) => {
    setQuantity(selectedQuantity);
    setDropdownOpen(false);
  }, []);

  const handleClose = useCallback(
    (e) => {
      if (e.target.classList.contains("product-modal-container")) {
        onClose();
      }
    },
    [onClose]
  );

  const navigateToPage = useCallback(
    (path) => {
      onClose(); // Close the modal first
      setTimeout(() => navigate(path), 0); // Navigate in the next tick to ensure modal has closed
    },
    [navigate, onClose]
  );

  // Handle adding to cart
  const handleSubmit = useCallback(
    async (e) => {
      e.stopPropagation();
      if (isSubmitting) return;

      setIsSubmitting(true);
      setAlreadyInCartMessage(""); // clear message before request

      try {
        const response = await axiosInstance.post(`/cart/add`, {
          productId: Id,
          quantity: quantity,
        });

        if (response.data.success) {
          if (response.data.alreadyInCart) {
            // Show message but still success notification optional
            setAlreadyInCartMessage("Product already in your cart");
            // Optional: you can also show a small notification if you want:
            notification.info({
              message: "Product quantity updated in cart",
              duration: 3,
              key: "updated-cart",
              placement: "top",
            });
          } else {
            notification.success({
              message: (
                <div style={{ textAlign: "center" }}>
                  Added to Cart!{" "}
                  <a
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateToPage("/cart");
                    }}
                  >
                    Go to Cart
                  </a>
                </div>
              ),
              duration: 3,
              key: "added-to-cart",
              placement: "top",
            });
          }
          updateCartCount();
        } else {
          // Show error message for other failures
          message.error({
            content: response.data.message,
            key: "add",
            duration: 3,
          });
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
        const errorMessage =
          error.response?.data?.message || "Failed to Add to Cart";
        message.error(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    },
    [Id, quantity, isSubmitting, updateCartCount, navigateToPage]
  );

  // Wishlist operations
  const addToWishlist = useCallback(
    async (e) => {
      e.stopPropagation();
      if (isProcessingWishlist) return;

      setIsProcessingWishlist(true);
      setIsInWishlist(true);
      message.loading({ content: "Adding item...", key: "addwishlist" });

      try {
        await axiosInstance.post(`/customer/wishlist/${Id}`);
        notification.success({
          message: (
            <div style={{ textAlign: "center" }}>
              Added to Wishlist!{" "}
              <a
                onClick={(e) => {
                  e.stopPropagation();
                  navigateToPage("/wishlist");
                }}
              >
                Go to Wishlist
              </a>
            </div>
          ),
          key: "addwishlist",
          duration: 3,
          placement: "top",
        });
      } catch (error) {
        console.error("Error adding to wishlist:", error);
        message.error("Failed to Add to Wishlist");
        setIsInWishlist(false);
      } finally {
        setIsProcessingWishlist(false);
      }
    },
    [Id, isProcessingWishlist, navigateToPage]
  );

  const removeFromWishlist = useCallback(
    async (e) => {
      e.stopPropagation();
      if (isProcessingWishlist) return;

      setIsProcessingWishlist(true);
      setIsInWishlist(false);
      message.loading({ content: "Removing item...", key: "removewishlist" });

      try {
        await axiosInstance.delete(`/customer/wishlist/${Id}`);
        message.success({
          content: "Removed from Wishlist!",
          key: "removewishlist",
          duration: 1,
        });
        window.location.reload(); // Reload the page to reflect changes
      } catch (error) {
        console.error("Error removing from wishlist:", error);
        message.error("Failed to Remove from Wishlist");
        setIsInWishlist(true);
      } finally {
        setIsProcessingWishlist(false);
      }
    },
    [Id, isProcessingWishlist]
  );

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Load wishlist status
  useEffect(() => {
    const fetchWishListInfo = async () => {
      try {
        const response = await retryRequest(() =>
          axiosInstance.get(`/customer/check-wishlist/${Id}`)
        );
        setIsInWishlist(response.data);
      } catch (error) {
        console.error("Failed to load wishlist data:", error);
      }
    };

    if (Id) {
      fetchWishListInfo();
    }
  }, [Id, retryRequest]);

  // Handle share functionality
  const handleShare = async (productName) => {
    // Create search URL with the product name
    const baseUrl = window.location.origin;
    const encodedProductName = encodeURIComponent(productName);
    const shareUrl = `${baseUrl}/search?category=-1&term=${encodedProductName}`;

    try {
      // Copy to clipboard directly
      await navigator.clipboard.writeText(shareUrl);

      // Optional: Show success feedback
      // You can replace this with your preferred notification method
      message.success("Product link copied to clipboard!");

      // Or show a toast notification if you have one
      // showToast('Link copied to clipboard!');
    } catch (error) {
      // Fallback for older browsers or if clipboard API fails
      try {
        // Create a temporary textarea element
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        // Execute copy command
        document.execCommand("copy");
        document.body.removeChild(textArea);

        console.log("Product link copied to clipboard (fallback)!");
      } catch (fallbackError) {
        // Final fallback - show prompt
        prompt("Copy this link to share the product:", shareUrl);
      }
    }
  };
  // Handle back navigation
  const onBack = () => {
    navigate("/"); // Go back to the previous page
    onClose();
  };

  return (
    <div className="product-modal-container" onClick={handleClose}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header buttons */}
        <div className="modal-header-buttons">
          <div className="modal-header-button" onClick={onBack} title="Go Back">
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
          <div
            className="modal-header-button"
            onClick={() => handleShare(Name)}
            title="Share Product"
          >
            <FontAwesomeIcon icon={faShare} />
          </div>
        </div>

        {/* Close Button */}
        <div className="close" onClick={onClose}>
          <FontAwesomeIcon icon={faX} />
        </div>
        {/* Top section with image and details side by side */}
        <div className="product-modal-top">
          <div className="product-image-container">
            {isLoading && <Skeleton.Image active />}
            <img
              src={Images[0]}
              className="product-image"
              alt={Name}
              onLoad={() => setIsLoading(false)}
              style={{ display: isLoading ? "none" : "block" }}
            />
          </div>

          <div className="product-detail">
            {/* Product Info Section */}
            <div className="product-info-section">
              <h2 className="product-title">{Name}</h2>
              <p className="available">
                Availability: {Stock > 0 ? "In Stock" : "Out of stock"}
              </p>
              {ShortDescription && (
                <p className="short-description">{ShortDescription}</p>
              )}
            </div>

            {/* Price Section */}
            <div className="price-section">
              <p className="product-price">${Price.toFixed(2)}</p>
              <hr />
              <p className="product-unit-price">Unit Price: ${Price}</p>
            </div>

            {/* Quantity Section */}
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
                  min={OrderMinimumQuantity}
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

            {/* Already in cart message */}
            {alreadyInCartMessage && (
              <h3 style={{ color: "#0075c2", textAlign: "center" }}>
                {alreadyInCartMessage}
              </h3>
            )}

            {/* Add to Cart and Wishlist Section */}
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
                onClick={isInWishlist ? removeFromWishlist : addToWishlist}
                style={{ cursor: isProcessingWishlist ? "wait" : "pointer" }}
              />
            </div>
          </div>
        </div>

        {/* Full Description Section - spans full width at bottom with scroll */}
        {FullDescription && (
          <div
            className="full-description"
            dangerouslySetInnerHTML={{ __html: FullDescription }}
          />
        )}
      </div>
    </div>
  );
};

export default ProductModal;
