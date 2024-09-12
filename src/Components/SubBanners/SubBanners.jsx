import React, { useRef, useEffect, useState } from "react";
import "./SubBanners.css";
import product1 from "/Images/product1.png";
import product2 from "/Images/product2.png";

const SubBanners = () => {
  const bannerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // Stop observing once the element is in view
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the banner is visible
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => {
      if (bannerRef.current) observer.unobserve(bannerRef.current);
    };
  }, []);

  return (
    <div
      ref={bannerRef}
      className={`sub-banners-container fade-up ${isVisible ? "active" : ""}`}
    >
      <div className="sub-banner">
        <span className="product-detail">
          <h2>Best Seller</h2>
          <p>Product Name</p>
          <button>Shop Now</button>
        </span>
        <span className="product-image-container">
          <img src={product1} alt="product-image" className="product-image" />
        </span>
      </div>
      <div className="sub-banner">
        <span className="product-detail">
          <h2>Best Seller</h2>
          <p>Product Name</p>
          <button>Shop Now</button>
        </span>
        <span className="product-image-container">
          <img src={product2} alt="product-image" className="product-image" />
        </span>
      </div>
    </div>
  );
};

export default SubBanners;
