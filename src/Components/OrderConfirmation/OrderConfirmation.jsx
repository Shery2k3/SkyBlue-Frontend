import { useNavigate } from "react-router-dom";
import { message } from "antd";
import "./OrderConfirmation.css";
import axiosInstance from "../../api/axiosConfig";

const OrderConfirmation = ({ subTotal, shipping, tax, discount, shippingMethod, total }) => {

  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post(`/checkout`, {
        newShippingMethodId: shippingMethod.newShippingMethodId,
      });
      navigate("/")
      message.success("Order Placed");
    } catch (error) {
      console.error("Error placing order:", error);
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
      <button onClick={handleSubmit} className="checkout-button">Confirm</button>
    </div>
  );
};

export default OrderConfirmation;