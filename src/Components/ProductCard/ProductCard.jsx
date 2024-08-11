import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./ProductCard.css";
import { useModal } from "../../Context/ModalContext/ModalContext"; 

const ProductCard = ({ product }) => {
  const { openModal } = useModal();
  const { productImage, productName, productPrice } = product;

  const shortenedName =
    productName.length > 36
      ? `${productName.substring(0, 36)}...`
      : productName;

  const handleClick = () => {
    openModal(product);
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="product-image-container">
        <img src={productImage} alt="Product" className="product-image" />
      </div>
      <hr className="card-seperator" />
      <div className="product-detail">
        <p className="product-name">{shortenedName}</p>
        <p className="product-price">${productPrice}</p>
        <span className="favorite-icon">
          <FontAwesomeIcon icon={faHeart} />
        </span>
        <span className="add-to-cart">
          <FontAwesomeIcon icon={faPlus} />
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
