import "./Confirmation.css";
import OrderConfirmation from "../../OrderConfirmation/OrderConfirmation";
import { useModal } from "../../../Context/ModalContext/ModalContext";

const Confirmation = ({ shippingMethod, products, cartSummary, userInfo }) => {
  const { subtotal, Shipping, tax, Discount, total } = cartSummary;

  const { openModal } = useModal();

  return (
    <div className="confirmation">
      <div className="address-container">
        <div className="store-info">
          <h3>Store Info</h3>
          <span>
            <p>
              <strong>Address:</strong> Sky Blue Wholesale 1300 Kamato Rd Unit 8
              & 9 Mississauga, Ontario L4W 2N2
            </p>
            <p>
              <strong>Phone:</strong> 416-841-9595
            </p>
            <p>
              <strong>Fax:</strong> 905-625-5389
            </p>
            <p>
              <strong>Email:</strong> sales@skybluewholesale.com
            </p>
          </span>
        </div>
        <div className="shipping-address">
          <h3>Shipping Address</h3>
          <span>
            <p>
              <strong>Name:</strong> {userInfo.Name}
            </p>
            <p>
              <strong>Email:</strong> {userInfo.Email}
            </p>
            <p>
              <strong>Phone:</strong> {userInfo.PhoneNumber}
            </p>
            <p>
              <strong>Address:</strong> {userInfo.Address}
            </p>
            <p>
              <strong>Payment Method:</strong> {shippingMethod.shippingMethod}
            </p>
          </span>
        </div>
      </div>
      <div className="cartdetails">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Name</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>
                  <span
                    className="image-container"
                    onClick={() => openModal(product)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={product.images}
                      alt={product.Name}
                      className="product-image"
                    />
                  </span>
                </td>
                <td
                  onClick={() => openModal(product)}
                  style={{ cursor: "pointer" }}
                >
                  {product.Name}
                </td>
                <td>${product.Price.toFixed(2)}</td>
                <td>{product.Quantity}</td>
                <td>${(product.Price * product.Quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <OrderConfirmation
        subTotal={subtotal}
        shipping={Shipping}
        tax={tax}
        discount={Discount}
        shippingMethod={shippingMethod}
        total={total.toFixed(2)}
      />
    </div>
  );
};

export default Confirmation;
