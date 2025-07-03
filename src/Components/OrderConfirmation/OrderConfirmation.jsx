import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import "./OrderConfirmation.css";
import axiosInstance from "../../api/axiosConfig";

const OrderConfirmation = ({ subTotal, shipping, tax, discount, shippingMethod, total }) => {
  console.log({
    subTotal,
    shipping,
    tax,
    discount,
    shippingMethod,
    total
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (loading) return; // Prevent multiple requests if already loading

    setLoading(true);
    const loadingMessage = message.loading("Placing order...", 0); // Show loading message

    try {
      const response = await axiosInstance.post(`/checkout`, {
        newShippingMethodId: shippingMethod.newShippingMethodId,
      });
      navigate("/orderplaced", { state: { orderPlaced: true } });
      loadingMessage(); // Clear the loading message
      message.success("Order Placed");
    } catch (error) {
      console.error("Error placing order:", error);
      loadingMessage(); // Clear the loading message
      message.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Order-Confirmation">
      <div className="info-item">
        <span>Sub-Total:</span>
        <span>${subTotal.toFixed(2)}</span>
      </div>
      <div className="info-item">
        <span>Shipping:</span>
        <span>${shipping.toFixed(2)}</span>
      </div>
      <div className="info-item">
        <span>Tax:</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <div className="info-item">
        <span>Discount:</span>
        <span>-${discount.toFixed(2)}</span>
      </div>
      <div className="cart-total">
        <span>Total:</span>
        <span>${total}</span>
      </div>
      <button 
        onClick={handleSubmit} 
        className="checkout-button" 
        disabled={loading}
      >
        {loading ? "Processing..." : "Confirm"}
      </button>
    </div>
  );
};

export default OrderConfirmation;
