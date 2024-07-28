import React from "react";
import random from "../assets/pexels-mirrographer-1194030.jpg"

const ProductCard = () => {
  const styles = {
    card: {
      backgroundColor: "#e0f7fa",
      borderRadius: "10px",
      padding: "20px",
      width: "200px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      position: "relative",
      textAlign: "center",
    },
    image: {
      width: "100%",
      height: "auto",
      borderRadius: "10px",
    },
    title: {
      fontSize: "16px",
      color: "#333",
      margin: "10px 0",
    },
    price: {
      fontSize: "18px",
      color: "#000",
      margin: "10px 0",
    },
    addToCart: {
      backgroundColor: "#000",
      color: "#fff",
      border: "none",
      borderRadius: "50%",
      width: "30px",
      height: "30px",
      fontSize: "20px",
      cursor: "pointer",
      position: "absolute",
      bottom: "20px",
      right: "20px",
    },
    favorite: {
      background: "none",
      border: "none",
      color: "#000",
      fontSize: "24px",
      cursor: "pointer",
      position: "absolute",
      top: "10px",
      right: "10px",
    },
  };

  return (
    <div style={styles.card}>
      <img
        src={random}
        alt="random drink"
        style={styles.image}
      />
      <h2 style={styles.title}>Energy Drink C4 Hawaiian Punch</h2>
      <p style={styles.price}>$39.75</p>
      <button style={styles.addToCart}>+</button>
      <button style={styles.favorite}>&#9825;</button>
    </div>
  );
};

export default ProductCard;
