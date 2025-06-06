import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHeart as solidHeart,
  faHeart as regularHeart,
} from "@fortawesome/free-solid-svg-icons";
import { Skeleton, message, notification } from "antd";
import axiosInstance from "../../api/axiosConfig";
import useRetryRequest from "../../api/useRetryRequest";
import { useCartCount } from "../../Context/CartCount/CartCount";
import "./ViewProduct.css";
import Header from "../Header/Header";
import Layout from "../Layout/Layout";

const ViewProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const retryRequest = useRetryRequest();
  const { updateCartCount } = useCartCount();
  
  const product = location.state?.product;

  if (!product) return <div>No product data received.</div>;

  // Extract product data
  const {
    Id,
    Images = [product.images || product.Images?.[0]],
    Name,
    Price,
    Stock,
    AllowedQuantities,
    OrderMinimumQuantity,
    OrderMaximumQuantity,
  } = product.data || product;

  // Memoized values
  const hasAllowedQuantities = !!AllowedQuantities;
  const quantities = useMemo(() => {
    if (!hasAllowedQuantities) return [];
    return AllowedQuantities.split(",").map((val) => parseInt(val.trim(), 10));
  }, [AllowedQuantities, hasAllowedQuantities]);

  const initialQuantity = useMemo(() => {
    if (AllowedQuantities) {
      return AllowedQuantities.split(",")[0].trim();
    }
    return OrderMinimumQuantity.toString();
  }, [AllowedQuantities, OrderMinimumQuantity]);

  // State
  const [quantity, setQuantity] = useState(initialQuantity);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessingWishlist, setIsProcessingWishlist] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alreadyInCartMessage, setAlreadyInCartMessage] = useState("");

  // Refs
  const dropdownContainerRef = useRef(null);

  // Handlers
  const handleQuantityChange = useCallback((e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setQuantity(value);
    }
  }, []);

  const handleQuantityInput = useCallback(() => {
    const parsed = parseInt(quantity, 10);
    if (isNaN(parsed) || parsed < OrderMinimumQuantity) {
      setQuantity(OrderMinimumQuantity.toString());
    } else if (parsed > OrderMaximumQuantity) {
      setQuantity(OrderMaximumQuantity.toString());
    } else {
      setQuantity(parsed.toString());
    }
  }, [quantity, OrderMinimumQuantity, OrderMaximumQuantity]);

  const handleKeyDown = useCallback((e) => {
    // Allow: backspace, delete, tab, escape, enter, Ctrl+A/C/V/X, arrow keys
    if (
      [46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
      (e.keyCode === 65 && e.ctrlKey) ||
      (e.keyCode === 67 && e.ctrlKey) ||
      (e.keyCode === 86 && e.ctrlKey) ||
      (e.keyCode === 88 && e.ctrlKey) ||
      (e.keyCode >= 35 && e.keyCode <= 39)
    ) {
      return;
    }
    // Block non-numeric keys
    if (
      (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
      (e.keyCode < 96 || e.keyCode > 105)
    ) {
      e.preventDefault();
    }
  }, []);

  const navigateToPage = useCallback((path) => {
    setTimeout(() => navigate(path), 0);
  }, [navigate]);

  const showCartNotification = useCallback((isUpdate = false) => {
    const message = isUpdate ? "Product quantity updated in cart" : "Added to Cart!";
    const notificationType = isUpdate ? notification.info : notification.success;
    
    notificationType({
      message: (
        <div style={{ textAlign: "center" }}>
          {message}{" "}
          <a onClick={(e) => {
            e.stopPropagation();
            navigateToPage("/cart");
          }}>
            Go to Cart
          </a>
        </div>
      ),
      duration: 3,
      key: isUpdate ? "updated-cart" : "added-to-cart",
      placement: "top",
    });
  }, [navigateToPage]);

  const handleAddToCart = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const parsedQuantity = parseInt(quantity, 10);
    if (isSubmitting || parsedQuantity < OrderMinimumQuantity) return;

    setIsSubmitting(true);
    setAlreadyInCartMessage("");

    try {
      const response = await axiosInstance.post(`/cart/add`, {
        productId: Id,
        quantity: parsedQuantity,
      });

      if (response.data.success) {
        if (response.data.alreadyInCart) {
          setAlreadyInCartMessage("Product already in your cart");
          showCartNotification(true);
        } else {
          showCartNotification(false);
        }
        updateCartCount();
      } else {
        message.error({
          content: response.data.message,
          key: "add",
          duration: 3,
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      const errorMessage = error.response?.data?.message || "Failed to Add to Cart";
      message.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }, [Id, quantity, isSubmitting, OrderMinimumQuantity, updateCartCount, showCartNotification]);

  const handleWishlistAction = useCallback(async (e, action) => {
    e.stopPropagation();
    if (isProcessingWishlist) return;

    setIsProcessingWishlist(true);
    const isAdding = action === 'add';
    
    setIsInWishlist(isAdding);
    message.loading({ 
      content: `${isAdding ? 'Adding' : 'Removing'} item...`, 
      key: `${isAdding ? 'add' : 'remove'}wishlist` 
    });

    try {
      if (isAdding) {
        await axiosInstance.post(`/customer/wishlist/${Id}`);
        notification.success({
          message: (
            <div style={{ textAlign: "center" }}>
              Added to Wishlist!{" "}
              <a onClick={(e) => {
                e.stopPropagation();
                navigateToPage("/wishlist");
              }}>
                Go to Wishlist
              </a>
            </div>
          ),
          key: "addwishlist",
          duration: 3,
          placement: "top",
        });
      } else {
        await axiosInstance.delete(`/customer/wishlist/${Id}`);
        message.success({
          content: "Removed from Wishlist!",
          key: "removewishlist",
          duration: 1,
        });
        window.location.reload();
      }
    } catch (error) {
      console.error(`Error ${isAdding ? 'adding to' : 'removing from'} wishlist:`, error);
      message.error(`Failed to ${isAdding ? 'Add to' : 'Remove from'} Wishlist`);
      setIsInWishlist(!isAdding);
    } finally {
      setIsProcessingWishlist(false);
    }
  }, [Id, isProcessingWishlist, navigateToPage]);

  // Effects
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
    
    if (Id) fetchWishListInfo();
  }, [Id, retryRequest]);

  return (
    <Layout pageTitle="All Products" style="style1" isLoading={isLoading}>
      <Header />
      <div className="product-page-container">
        <div className="product-image-container">
          {isLoading && <Skeleton.Image active />}
          <img
            src={Images[0]}
            alt={Name}
            onLoad={() => setIsLoading(false)}
            style={{ display: isLoading ? "none" : "block" }}
            className="product-image"
          />
        </div>

        <div className="product-detail">
          <h2 className="product-title">{Name}</h2>
          <p className="product-price">Price: ${Price}</p>
          {Stock === 0 && <p className="out-of-stock">Out of Stock</p>}

          <form onSubmit={handleAddToCart} className="quantity-form">
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

             
            </div>

            <button
              type="submit"
              className="add-to-cart-btn"
              disabled={isSubmitting}
            >
              <FontAwesomeIcon icon={faCartShopping} /> Add to Cart
            </button>
          </form>

          {alreadyInCartMessage && (
            <p className="already-in-cart">{alreadyInCartMessage}</p>
          )}

          <div className="wishlist-section">
            <button
              onClick={(e) => handleWishlistAction(e, isInWishlist ? 'remove' : 'add')}
              disabled={isProcessingWishlist}
              className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
            >
              <FontAwesomeIcon icon={isInWishlist ? solidHeart : regularHeart} />
              {isInWishlist ? ' Remove from Wishlist' : ' Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewProduct;