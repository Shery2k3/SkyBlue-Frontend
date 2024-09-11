import React, { useRef, useEffect, useState } from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./ProductSlider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductSlider = ({ category, products }) => {
  const sliderRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
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
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1120,
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("agya me", category)
            setIsVisible(true);
            observer.disconnect(); // Stop observing once the element is in view
          }
        });
      },
      { threshold: 0.25 } // Trigger when 10% of the slider is visible
    );

    if (sliderRef.current) {
      observer.observe(sliderRef.current);
    }

    return () => {
      if (sliderRef.current) observer.unobserve(sliderRef.current);
    };
  }, []);

  return (
    <div
      ref={sliderRef}
      className={`product-slider fade-up ${isVisible ? "active" : ""}`}
    >
      <div className="slider-header">
        <h2>{category}</h2>
      </div>
      <div className="slider-container">
        {products.length > 0 && (
          <Slider ref={sliderRef} {...settings}>
            {products.map((product, index) => (
              <div className="slider-item" key={index}>
                <ProductCard product={product} />
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default ProductSlider;
