import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../../api/axiosConfig";
import { debounce } from "lodash";
import { message } from 'antd';
import "./CartItem.css";

const CartItem = ({ product, onUpdate, onRemove }) => {
  const [tempQuantity, setQuantity] = useState(product.Quantity);
  const [price, setPrice] = useState(product.Price * product.Quantity);
  const [isUserInteraction, setUserInteraction] = useState(false);

  useEffect(() => {
    setPrice(product.Price * tempQuantity);
  }, [tempQuantity]);

  // Debounced function to update quantity
  const debouncedUpdateQuantity = debounce(async (quantity) => {
    try {
      await axiosInstance.post("/cart/update", {
        id: product.ID,
        quantity,
        shoppingCartTypeId: product.ShoppingCartTypeId,
      });
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  }, 500); // Delay of 500ms

  // Debounced function to remove item
  const debouncedRemoveItem = debounce(async () => {
    message.loading({ content: 'Removing item...', key: 'remove' });
    try {
      await axiosInstance.delete(`/cart/remove/${product.Id}`);
      message.success({ content: 'Item removed successfully!', key: 'remove', duration: 2 });
      if (onRemove) onRemove();
    } catch (error) {
      message.error({ content: 'Failed to remove item. Please try again.', key: 'remove', duration: 2 });
      console.error("Error removing item from cart:", error);
    }
  }, 300); 

  useEffect(() => {
    if (isUserInteraction) {
      debouncedUpdateQuantity(tempQuantity);
      setUserInteraction(false); // Reset interaction flag
    }
  }, [tempQuantity, isUserInteraction]);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    setUserInteraction(true); // Indicate user interaction
  };

  const decreaseQuantity = () => {
    if (tempQuantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
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

  const handleRemove = () => {
    debouncedRemoveItem(); // Use the debounced function
  };

  return (
    <div className="cart-item">
      <div className="product-data">
        <span className="product-image-container">
          <img
            src={product.image}
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
          <input
            type="number"
            className="quantity"
            value={tempQuantity}
            onChange={handleQuantityChange}
            min="1"
          />
          <span className="button" onClick={increaseQuantity}>
            <FontAwesomeIcon icon={faPlus} />
          </span>
        </div>
        <span className="price">${price.toFixed(2)}</span>
        <FontAwesomeIcon className="remove-item" icon={faTrash} onClick={handleRemove} />
      </div>
    </div>
  );
};

export default CartItem;
