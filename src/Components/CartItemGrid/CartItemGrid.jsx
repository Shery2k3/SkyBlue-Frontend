import "./CartItemGrid.css";
import CartItem from "../CartItem/CartItem";
import CartInfo from "../CartInfo/CartInfo";

const CartItemGrid = ({ products, cartSummary, onUpdate, onRemove }) => {
  const { subtotal, shipping, tax, discount, total } = cartSummary;

  return (
    <>
      <h2 className="cart-heading">Your Cart</h2>
      <div className="cart-grid">
        <div className="cartItemGrid">
          {products.map((product) => (
            <CartItem
              key={product.ID}
              product={product}
              onUpdate={onUpdate}
              onRemove={onRemove}
            />
          ))}
          <span className="clear-button">Clear Cart</span>
        </div>
        <CartInfo
          subtotal={subtotal}
          shipping={shipping}
          tax={tax}
          discount={discount}
          total={total}
        />
      </div>
    </>
  );
};

export default CartItemGrid;
