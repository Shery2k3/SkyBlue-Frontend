import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductGrid.css";

const ProductGrid = ({ category, products }) => {
  return (
    <div className="product-grid-container">
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
