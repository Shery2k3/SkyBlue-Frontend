import { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { Link } from "react-router-dom";
import emptyCart from "/Images/empty-cart.webp";
import CartItemGrid from "../../Components/CartItemGrid/CartItemGrid";
import axiosInstance from "../../api/axiosConfig";
import "./Cart.css";

const Cart = () => {
  const [isLoading, setisLoading] = useState(true);
  const [isFetching, setFetching] = useState(false)
  const [products, setProducts] = useState([]);
  const [cartSummary, setCartSummary] = useState({
    subtotal: 0,
    Shipping: 0,
    tax: 0,
    discount: 1.19,
    total: 0,
  });

  const fetchCartData = async () => {
    setFetching(true)
    try {
      const response = await axiosInstance.get("/cart/items");
      setProducts(response.data.cartItems);
      setCartSummary({
        subtotal: response.data.totalPrice,
        Shipping: 0,
        tax: response.data.taxAmount,
        discount: 1.19,
        total: response.data.finalPrice - 1.19,
      });
      setisLoading(false);
      setFetching(false)
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const handleUpdate = () => {
    fetchCartData();
  };

  const handleRemove = () => {
    fetchCartData();
  };

  return (
    <Layout pageTitle="Cart" isLoading={isLoading}>
      {products.length === 0 ? (
        <div className="cart-page">
          <img src={emptyCart} alt="" />
          <h2>Your Cart Is Currently Empty!</h2>
          <Link className="return-home" to="/">
            Return to Home
          </Link>
        </div>
      ) : (
        <CartItemGrid
          products={products}
          cartSummary={cartSummary}
          isFetching={isFetching}
          onUpdate={handleUpdate}
          onRemove={handleRemove}
        />
      )}
    </Layout>
  );
};

export default Cart;
