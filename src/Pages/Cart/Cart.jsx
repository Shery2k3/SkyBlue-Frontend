import { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import NavbarFixed from "../../Components/Navbar/NavbarFixed";
import { Link } from "react-router-dom";
import emptyCart from "/Images/empty-cart.webp";
import CartItemGrid from "../../Components/CartItemGrid/CartItemGrid";
import useRetryRequest from "../../api/useRetryRequest";
import axiosInstance from "../../api/axiosConfig";
import "./Cart.css";

const Cart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setFetching] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartSummary, setCartSummary] = useState({
    subtotal: 0,
    Shipping: 0,
    tax: 0,
    discount: 1.19,
    total: 0,
  });
  const retryRequest = useRetryRequest(); // Use the custom hook

  const fetchCartData = async () => {
    setFetching(true);
    try {
      const response = await retryRequest(() => axiosInstance.get("/cart/items"));
      setProducts(response.data.cartItems);
      setCartSummary({
        subtotal: response.data.totalPrice,
        Shipping: 0,
        tax: response.data.taxAmount,
        discount: 1.19,
        total: response.data.finalPrice - 1.19,
      });
      setIsLoading(false);
      setFetching(false);
    } catch (error) {
      console.error("Failed to load data:", error);
      setIsLoading(false);
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, [retryRequest]);

  const handleUpdate = () => {
    fetchCartData();
  };

  const handleRemove = () => {
    fetchCartData();
  };

  return (
    <Layout pageTitle="Cart" isLoading={isLoading}>
      <NavbarFixed />
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
