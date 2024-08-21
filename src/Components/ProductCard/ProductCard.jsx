import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./ProductCard.css";
import { useModal } from "../../Context/ModalContext/ModalContext";

const ProductCard = ({ product }) => {
  const { openModal } = useModal();
  const { data } = product;
  const { Image, Name, Price } = data;

  const shortenedName =
    Name.length > 36
      ? `${Name.substring(0, 36)}...`
      : Name;

  const handleClick = () => {
    openModal(product);
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="product-image-container">
        <img src={Image} alt="Product" className="product-image" />
      </div>
      <hr className="card-seperator" />
      <div className="product-detail">
        <p className="product-name">{shortenedName}</p>
        <p className="product-price">${Price}</p>
        <span className="add-to-cart">
          <FontAwesomeIcon icon={faPlus} />
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
