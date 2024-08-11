import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faCartShopping, faX } from "@fortawesome/free-solid-svg-icons";
import "./ProductModal.css";

const ProductModal = ({ product, onClose }) => {

  const handleClose = (e) => {
    if (e.target.classList.contains("product-modal-container")) {
      onClose();
    }
  };

  return (
    <div className="product-modal-container" onClick={handleClose}>
      <div className="product-modal">
        <div className="product-image-container">
          <img
            src={product.productImage}
            className="product-image"
            alt={product.productName}
          />
        </div>
        <div className="product-detail">
          <span>
            <h2 className="product-title">{product.productName}</h2>
            <p className="available">Availability: In stock (987)</p>
          </span>
          <span>
            <p className="product-price">${product.productPrice}</p>
            <hr />
            <p className="product-unit-price">
              Unit Price: ${product.productPrice}
            </p>
          </span>
          <div className="product-quantity">
            <span className="button">
              <FontAwesomeIcon icon={faMinus} />
            </span>
            <input
              type="number"
              className="quantity"
              value={1}
              readOnly
            />
            <span className="button">
              <FontAwesomeIcon icon={faPlus} />
            </span>
          </div>
          <div className="add-to-cart">
            <FontAwesomeIcon icon={faCartShopping} /> <p>Add to Cart</p>
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
