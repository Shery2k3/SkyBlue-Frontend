import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Skeleton from "antd/es/skeleton/";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./ProductCard.css";
import { useModal } from "../../Context/ModalContext/ModalContext";

const ProductCard = ({ product }) => {
  const { openModal } = useModal();
  const { Images, Name, Price } = product.data || product;
  const [isLoading, setIsLoading] = useState(true);

  const shortenedName = Name.length > 36 ? `${Name.substring(0, 36)}...` : Name;

  const handleClick = () => {
    openModal(product);
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
