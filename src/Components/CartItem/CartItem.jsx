import { useEffect, useState, useCallback, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../../api/axiosConfig";
import { debounce } from "lodash";
import { message } from "antd";
import "./CartItem.css";

const CartItem = ({ product, onUpdate, onRemove }) => {
  const [tempQuantity, setQuantity] = useState(product.Quantity);
  const [price, setPrice] = useState(product.Price * product.Quantity);
  const [MinimumQuantity, setMinimumQuantity] = useState(
    product.OrderMinimumQuantity
  );
  const quantities = Array.from(
    { length: 20 },
    (_, i) => (i + 1) * MinimumQuantity
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isUserInteraction, setUserInteraction] = useState(false);  

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
    setQuantity((prevQuantity) => prevQuantity + MinimumQuantity);
    setUserInteraction(true); // Indicate user interaction
  };

  const decreaseQuantity = () => {
    if (tempQuantity > MinimumQuantity) {
      setQuantity((prevQuantity) => prevQuantity - MinimumQuantity);
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

  return (
    <div className="cart-item">
      <div className="product-data">
        <span className="product-image-container">
          <img
            src={product.images}
            alt="product-image"
            className="product-image"
          />
        </span>
        <span className="product-name">
          <p>{product.Name}</p>
        </span>
      </div>
      <div className="controller-container">
        <div className="product-quantity">
          <span className="button" onClick={decreaseQuantity}>
            <FontAwesomeIcon icon={faMinus} />
          </span>
          {MinimumQuantity === 1 ? (
            <input
              type="number"
              className="quantity"
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
                  <span key={qty} onClick={() => handleDropdownSelection(qty)}>
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
        <span className="price">${price.toFixed(2)}</span>
        <FontAwesomeIcon
          className="remove-item"
          icon={faTrash}
          onClick={handleRemove}
        />
      </div>
    </div>
  );
};

export default CartItem;
