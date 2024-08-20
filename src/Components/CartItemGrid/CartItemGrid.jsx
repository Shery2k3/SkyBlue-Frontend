import "./CartItemGrid.css";
import CartItem from "../CartItem/CartItem";
import productData from "../../Data/ProductData";
import CartInfo from "../CartInfo/CartInfo";

const CartItemGrid = () => {
  return (
    <>
      <h2 className="cart-heading">Your Cart</h2>
      <div className="cart-grid">
        <div className="cartItemGrid">
          {productData.map((product) => (
            <CartItem product={product} quantity={4} price={199} />
          ))}
          <span className="clear-button">Clear Cart</span>
        </div>
        <CartInfo subTotal={152.85} shipping={0} tax={19.87} discount={1.19} />
      </div>
    </>
  );
};

export default CartItemGrid;
