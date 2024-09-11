import React, { useRef, useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductGrid.css";

const ProductGrid = ({ category, products }) => {
  const gridRef = useRef(null);
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
      { threshold: 0.1 } // Trigger when 10% of the grid is visible
    );

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
