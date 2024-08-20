import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./CartItem.css";

const CartItem = ({ product, quantity, price }) => {
  const [tempQuantity, setQuantity] = useState(quantity);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (tempQuantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  return (
    <div className="cart-item">
      <div className="product-data">
        <span className="product-image-container">
          <img src={product.productImage} alt="product-image" className="product-image" />
        </span>
        <span className="product-name">
          <p>{product.productName}</p>
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
        <span className="price">${price}</span>
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </div>
  );
};

export default CartItem;
