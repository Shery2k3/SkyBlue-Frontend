import { useState, useEffect } from "react";
import "./OrderConfirmation.css";

const OrderConfirmation = ({ subTotal, shipping, tax, discount, total }) => {

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
      <button className="checkout-button">Confirm</button>
    </div>
  );
};

export default OrderConfirmation;