import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import "./ProductGrid2.css";

const ProductGrid2 = ({ category, products, header }) => {
  return (
    <div className="product-grid-container2">
      {header ? (
        <div className="product-grid-header">
          <h2>{category}</h2>
          <Breadcrumb
            separator=">"
            items={[
              {
                title: <Link to="/">Home</Link>,
              },
              {
                title: category,
              },
            ]}
          />
        </div>
      ) : (
        <h2>{category}</h2>
      )}
      <div className="product-grid">
        {products &&
          products.map((product) => (
            <ProductCard key={product.Id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default ProductGrid2;
