import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Skeleton from "antd/es/skeleton/";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./ProductCard.css";
import { useModal } from "../../Context/ModalContext/ModalContext";

const ProductCard = ({ product }) => {
  const { openModal } = useModal();
  const { Images, Name, Price, Stock } = product.data || product;
  const [isLoading, setIsLoading] = useState(true);

  const shortenedName = Name.length > 36 ? `${Name.substring(0, 36)}...` : Name;

  const handleClick = () => {
    if (Stock > 0) {
      openModal(product);
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

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
        <span className="add-to-cart">
          <FontAwesomeIcon icon={faPlus} />
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
