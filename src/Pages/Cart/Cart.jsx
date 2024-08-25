import { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import CartItemGrid from "../../Components/CartItemGrid/CartItemGrid";
import axiosInstance from "../../api/axiosConfig";

const Cart = () => {
  const [isLoading, setisLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [cartSummary, setCartSummary] = useState({
    subtotal: 0,
    Shipping: 0,
    tax: 0,
    Discount: 0,
    total: 0,
  });

  const fetchCartData = async () => {
    try {
      const response = await axiosInstance.get("/cart/items");
      setProducts(response.data.cartItems);
      setCartSummary({
        subtotal: response.data.totalPrice,
        Shipping: 0,
        tax: response.data.taxAmount,
        Discount: 0,
        total: response.data.finalPrice,
      });
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setisLoading(false);
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
        <p>Your cart is empty</p>
      ) : (
        <CartItemGrid
          products={products}
          cartSummary={cartSummary}
          onUpdate={handleUpdate}
          onRemove={handleRemove}
        />
      )}
    </Layout>
  );
};

export default Cart;
