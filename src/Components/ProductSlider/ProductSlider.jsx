import React, { useRef } from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./ProductSlider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductSlider = ({ category, products }) => {
  const sliderRef = useRef(null); // Create a ref for the Slider

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1820,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          dots: true,
        },
      },
      {
        breakpoint: 1580,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1340,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1060,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 867,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 523,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="product-slider">
      <div className="slider-header">
        <h2>{category}</h2>
        <div className="slider-controller">
          <FontAwesomeIcon
            className="slider-controller-button"
            icon={faArrowLeft}
            onClick={() => sliderRef.current.slickPrev()}
          />
          <FontAwesomeIcon
            className="slider-controller-button"
            icon={faArrowRight}
            onClick={() => sliderRef.current.slickNext()}
          />
        </div>
      </div>
      <div className="slider-container">
        <Slider ref={sliderRef} {...settings}>
          {products.map((product, index) => (
            <div className="slider-item" key={index}>
              <ProductCard key={index} product={product} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductSlider;
