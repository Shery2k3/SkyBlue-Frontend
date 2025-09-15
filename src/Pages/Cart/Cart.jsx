import { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import NavbarFixed from "../../Components/Navbar/NavbarFixed";
import { Link } from "react-router-dom";
import emptyCart from "/Images/empty-cart.webp";
import CartItemGrid from "../../Components/CartItemGrid/CartItemGrid";
import useRetryRequest from "../../api/useRetryRequest";
import axiosInstance from "../../api/axiosConfig";
import { useCartCount } from "../../Context/CartCount/CartCount";
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
  const retryRequest = useRetryRequest(); // Use the custom hook]
  const { cartCount, updateCartCount } = useCartCount();

  const [discountData, setDiscountData] = useState(null);

  const fetchDiscount = async () => {
    try {
      const response = await retryRequest(() =>
        axiosInstance.get("/cart/discount-value")
      );
      console.log("Discount fetched:", response.data);
      setDiscountData(response.data);
    } catch (error) {
      console.error("Failed to fetch discount:", error);
      setDiscountData(null); // Fallback if needed
    }
  };

  useEffect(() => {
    fetchDiscount();
  }, []);

  const fetchCartData = async () => {
    setFetching(true);
    try {
      const response = await retryRequest(() =>
        axiosInstance.get("/cart/items")
      );
      const cartSubtotal = response.data.totalPrice;
      const taxAmount = response.data.taxAmount;

      // Check discount validity based on dates
      let isDiscountValid = false;
      let discountValue = 0;

      if (discountData) {
        const now = new Date();

        // Parse discount start/end
        const startDate = discountData.StartDateUtc
          ? new Date(discountData.StartDateUtc)
          : null;
        const endDate = discountData.EndDateUtc
          ? new Date(discountData.EndDateUtc)
          : null;

        // Check if discount is active
        if (
          (!startDate || now >= startDate) && // If no startDate or current >= startDate
          (!endDate || now <= endDate) // If no endDate or current <= endDate
        ) {
          isDiscountValid = true;
        }

        // Apply discount only if valid
        if (isDiscountValid) {
          if (discountData.UsePercentage) {
            discountValue =
              (cartSubtotal * discountData.DiscountPercentage) / 100;
          } else {
            discountValue = discountData.DiscountAmount;
          }
        }
      }

      const finalPrice = cartSubtotal + taxAmount - discountValue;

      const sorted = response.data.cartItems.sort(
        (a, b) => new Date(b.CreatedOnUtc) - new Date(a.CreatedOnUtc)
      );

      setProducts(sorted);
      setCartSummary({
        subtotal: cartSubtotal,
        Shipping: 0,
        tax: taxAmount,
        discount: discountValue,
        total: finalPrice,
      });

      setIsLoading(false);
      setFetching(false);
    } catch (error) {
      console.error("Failed to load data:", error);
      setIsLoading(false);
      setFetching(false);
    } finally {
      updateCartCount();
    }
  };

  useEffect(() => {
    if (discountData !== null) {
      fetchCartData(); // now safe to call
    }
  }, [discountData]); // only when discountData is ready

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
