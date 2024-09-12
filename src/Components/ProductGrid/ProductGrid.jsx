import React, { useRef, useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductGrid.css";

const ProductGrid = ({ category, products }) => {
  const gridRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let observerTimeout;
    const observer = new IntersectionObserver((entries) => {
      clearTimeout(observerTimeout);
      observerTimeout = setTimeout(() => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              setIsVisible(true);
            });
            observer.disconnect();
          }
        });
      }, 100);
    }, { threshold: 0.1 });

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => {
      if (gridRef.current) observer.unobserve(gridRef.current);
    };
  }, []);

  return (
    <div
      ref={gridRef}
      className={`product-grid-container fade-up ${isVisible ? "active" : ""}`}
    >
      <h2>{category}</h2>
      <div className="product-grid">
        {products &&
          products.map((product) => (
            <ProductCard key={product.Id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default ProductGrid;
