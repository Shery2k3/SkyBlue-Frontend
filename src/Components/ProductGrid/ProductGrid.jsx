import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductGrid.css";

const ProductGrid = ({ category, products }) => {
  return (
    <div className="product-grid-container">
      <h2>{category}</h2>
      <div className="product-grid">
        {products.map((product, index) => (
          <ProductCard
            productImage={product.productImage}
            productName={product.productName}
            productPrice={product.productPrice}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
