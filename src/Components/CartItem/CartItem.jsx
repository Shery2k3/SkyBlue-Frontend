import { useEffect, useState, useCallback, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../../api/axiosConfig";
import { debounce } from "lodash";
import { message } from "antd";
import { useModal } from "../../Context/ModalContext/ModalContext";
import "./CartItem.css";

const CartItem = ({ product, onUpdate, onRemove }) => {
  console.log("Cartitem.jsx", product);

  const [unitPrice, setUnitPrice] = useState(product.Price);
  const [tempQuantity, setQuantity] = useState(product.Quantity);
  const [price, setPrice] = useState(product.Price * product.Quantity);
  const quantities = product.AllowedQuantities
    ? product.AllowedQuantities.split(",").map(Number)
    : null;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isUserInteraction, setUserInteraction] = useState(false);
  const { openModal } = useModal();

  const dropdownRef = useRef(null);
  const dropdownContainerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setPrice(product.Price * tempQuantity);
  }, [tempQuantity]);

  // Debounced function to update quantity with leading true to apply the first update instantly
  const debouncedUpdateQuantity = useCallback(
    debounce(async (quantity) => {
      try {
        await axiosInstance.put("/cart/update", {
          id: product.Id,
          quantity,
          shoppingCartTypeId: product.ShoppingCartTypeId,
        });
        if (onUpdate) onUpdate();
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }, 500), // 500ms delay
    [product.Id, product.ShoppingCartTypeId, onUpdate]
  );

  // Debounced function to remove item
  const debouncedRemoveItem = useCallback(
    debounce(async () => {
      message.loading({ content: "Removing item...", key: "remove" });
      try {
        await axiosInstance.delete(`/cart/remove/${product.Id}`);
        message.success({
          content: "Item removed successfully!",
          key: "remove",
          duration: 2,
        });
        if (onRemove) onRemove();
      } catch (error) {
        message.error({
          content: "Failed to remove item. Please try again.",
          key: "remove",
          duration: 2,
        });
        console.error("Error removing item from cart:", error);
      }
    }, 300),
    [product.Id, onRemove]
  );

  useEffect(() => {
    if (isUserInteraction) {
      debouncedUpdateQuantity(tempQuantity);
      setUserInteraction(false); // Reset interaction flag
    }
  }, [tempQuantity, isUserInteraction, debouncedUpdateQuantity]);

  const increaseQuantity = () => {
    const incrementValue =
      quantities && quantities.length > 0 ? quantities[0] : 1;

    setQuantity((prevQuantity) => prevQuantity + incrementValue);
    setUserInteraction(true); // Indicate user interaction
  };

  const decreaseQuantity = () => {
    const decrementValue =
      quantities && quantities.length > 0 ? quantities[0] : 1;

    if (tempQuantity > decrementValue) {
      setQuantity((prevQuantity) => prevQuantity - decrementValue);
      setUserInteraction(true); // Indicate user interaction
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
      setUserInteraction(true); // Indicate user interaction
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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownSelection = (selectedQuantity) => {
    setQuantity(selectedQuantity);
    setUserInteraction(true);
    setDropdownOpen(false);
  };

  const handleRemove = () => {
    debouncedRemoveItem(); // Use the debounced function
  };

  const handleClick = () => {
    const modifiedProduct = {
      ...product,
      Id: product.ProductId, // Override Id with ProductId
    };
    openModal(modifiedProduct);
  };

  return (
    <div className="cart-item">
      <div className="product-data">
        <span className="product-image-container">
          <img
            src={product.images}
            alt="product-image"
            className="product-image"
            onClick={handleClick}
          />
        </span>
        <div className="product-info">
          <p onClick={handleClick} className="product-name">
            {product.Name}
          </p>
          <span className="unit-price">
            Unit Price: ${unitPrice.toFixed(2)}
          </span>
          {product.Discount > 0 && (
            <span className="discount-message">
              After discount of ${product.Discount}, final price is $
              {product.FinalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
      <div className="controller-container">
        <div className="product-quantity">
          <button className="quantity-button" onClick={decreaseQuantity}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
          {!quantities ? (
            <input
              type="number"
              className="quantity-input"
              value={tempQuantity}
              onChange={handleQuantityChange}
              min="1"
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
                {tempQuantity}
              </div>
              <div
                className={`quantity-dropdown-menu ${
                  dropdownOpen ? "show" : ""
                }`}
                ref={dropdownRef}
              >
                {quantities.map((qty) => (
                  <div
                    key={qty}
                    className="dropdown-item"
                    onClick={() => handleDropdownSelection(qty)}
                  >
                    {qty}
                  </div>
                ))}
              </div>
            </div>
          )}
          <button className="quantity-button" onClick={increaseQuantity}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <div className="price-info">
          <span className="bigscreen-price">
            {product.Discount > 0 ? (
              <>
        ${ (product.FinalPrice * product.Quantity).toFixed(2) }
        <p className="savings">You Save ${(product.Discount * product.Quantity).toFixed(2)}</p>
      </>
            ) : (
              `$${(product.FinalPrice * product.Quantity).toFixed(2)}`
            )}
          </span>
          <button className="remove-button" onClick={handleRemove}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;