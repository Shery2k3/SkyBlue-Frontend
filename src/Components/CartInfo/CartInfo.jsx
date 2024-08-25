import { Link } from "react-router-dom";
import "./CartInfo.css";

const CartInfo = ({ subtotal = 0, shipping = 0, tax = 0, discount = 0, total = 0 }) => {

  return (
    <div className="cart-info">
      <div className="info-item">
        <span>Sub-Total:</span>
        <span>${subtotal.toFixed(2)}</span>
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
        <span>${total.toFixed(2)}</span>
      </div>
      <Link to='/onepagecheckout'><button className="checkout-button">Checkout</button></Link>
    </div>
  );
};

export default CartInfo;