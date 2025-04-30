import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Skeleton from "antd/es/skeleton/";
import { faPlus, faMinus, faCheck } from "@fortawesome/free-solid-svg-icons";
import "./ProductCard.css";
import { useModal } from "../../Context/ModalContext/ModalContext";

const ProductCard = ({ product }) => {
  const { openModal } = useModal();
  const { Images, Name, Price, Stock, OrderMinimumQuantity, OrderMaximumQuantity } = product.data || product;
  const [isLoading, setIsLoading] = useState(true);
  const [showQuantityInput, setShowQuantityInput] = useState(false);
  const [quantity, setQuantity] = useState(OrderMinimumQuantity || 1);
  
  const shortenedName = Name.length > 36 ? `${Name.substring(0, 36)}...` : Name;

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
        setQuantity(OrderMinimumQuantity || 1);
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

  const handleAddToCart = (e) => {
    e.stopPropagation();
    console.log("Adding to cart:", {
      product: product,
      quantity: quantity
    });
    
    // Reset the quantity input display
    setShowQuantityInput(false);
  };

  console.log("ProductCard render", product);

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
          <div className="quantity-input-container">
            <button 
              className="quantity-btn decrease" 
              onClick={(e) => {
                e.stopPropagation();
                if (quantity > (OrderMinimumQuantity || 1)) {
                  setQuantity(quantity - 1);
                }
              }}
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
            
            <input
              type="number"
              className="quantity-input"
              value={quantity}
              onChange={handleQuantityChange}
              onClick={(e) => e.stopPropagation()}
              min={OrderMinimumQuantity || 1}
              max={OrderMaximumQuantity || Stock}
            />
            
            <button 
              className="quantity-btn add" 
              onClick={handleAddToCart}
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;