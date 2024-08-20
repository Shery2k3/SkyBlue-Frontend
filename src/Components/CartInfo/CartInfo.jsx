import { useState, useEffect } from "react";
import "./CartInfo.css";

const CartInfo = ({ subTotal, shipping, tax, discount }) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calculatedTotal = subTotal + shipping + tax - discount;
    setTotal(calculatedTotal.toFixed(2));
  }, [subTotal, shipping, tax, discount]);

  return (
    <div className="cart-info">
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
      <button className="checkout-button">Checkout</button>
    </div>
  );
};

export default CartInfo;