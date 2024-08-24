import "./Confirmation.css";
import OrderConfirmation from "../../OrderConfirmation/OrderConfirmation";

const productData = [
  {
    Image:
      "https://skybluewholesale.com/content/images/thumbs/0016493_7up-regular-591ml-1ct_550.png",
    Name: "7up Regular 591ML 1ct",
    Price: 1.59,
    Quantity: 2, // Add quantity to each product
  },
  {
    Image:
      "https://skybluewholesale.com/content/images/thumbs/0012639_rizla-rolling-paper-flavour-cards-combo-special-4999_550.jpeg",
    Name: "Rizla Rolling Paper & Flavour Cards **COMBO SPECIAL $49.99**",
    Price: 49.99,
    Quantity: 3, // Add quantity to each product
  },
];

const Confirmation = ({ shippingMethod }) => {
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
              <strong>Name:</strong> Noman
            </p>
            <p>
              <strong>Email:</strong> Noman@skybluewholesale.com
            </p>
            <p>
              <strong>Phone:</strong> 6475227419
            </p>
            <p>
              <strong>Address:</strong> Ontario, Canada
            </p>
            <p>
              <strong>Payment Method:</strong> {shippingMethod}
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
            {productData.map((product, index) => (
              <tr key={index}>
                <td>
                  <span className="image-container">
                    <img
                      src={product.Image}
                      alt={product.Name}
                      className="product-image"
                    />
                  </span>
                </td>
                <td>{product.Name}</td>
                <td>${product.Price.toFixed(2)}</td>
                <td>{product.Quantity}</td>
                <td>${(product.Price * product.Quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <OrderConfirmation
        subTotal={152.85}
        shipping={0}
        tax={19.87}
        discount={1.19}
      />
    </div>
  );
};

export default Confirmation;
