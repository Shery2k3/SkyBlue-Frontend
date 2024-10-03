import "./CartItemGrid.css";
import CartItem from "../CartItem/CartItem";
import CartInfo from "../CartInfo/CartInfo";
import axiosInstance from "../../api/axiosConfig";
import { useCartCount } from "../../Context/CartCount/CartCount";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const CartItemGrid = ({
  products,
  cartSummary,
  onUpdate,
  onRemove,
  isFetching,
}) => {
  const { subtotal, shipping, tax, discount, total } = cartSummary;

  const navigate = useNavigate();
  const { cartCount, updateCartCount } = useCartCount();

  console.log(isFetching)

  const handleClearCart = async () => {
    try {
      await axiosInstance.delete(`/cart/remove-all`);
      message.success({ content: "Cart Cleared!", key: "remove", duration: 2 });
      navigate("/");
    } catch (error) {
      message.error({
        content: "Failed to remove item. Please try again.",
        key: "remove",
        duration: 2,
      });
    } finally {
      updateCartCount()
    }
  };

  return (
    <>
      <h2 className="cart-heading">Your Cart</h2>
      <div className="cart-grid">
        <div className="cartItemGrid">
          {products.map((product) => (
            <CartItem
              key={product.Id}
              product={product}
              onUpdate={onUpdate}
              onRemove={onRemove}
            />
          ))}
          <span className="clear-button" onClick={handleClearCart}>
            Clear Cart
          </span>
        </div>
        <CartInfo
          isFetching={isFetching}
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
