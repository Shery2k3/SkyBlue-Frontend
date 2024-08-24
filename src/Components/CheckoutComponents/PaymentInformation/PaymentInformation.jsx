import "./PaymentInformation.css";

const PaymentInformation = () => {
  return (
    <div className="payment-information">
      <h3>Payment Information</h3>
      <span className="address">
        <p>
          Sky Blue Enterprises
          <br />
          1300 Kamato rd, unit 8 & 9,
          <br />
          Mississauga, ON L4W2N2
          <br />
          Canada
        </p>
      </span>

      <span className="red-notice">
        <p>
          Please note that at this time we are not receiving any payments and we
          will call you as soon as possible to confirm your order.
        </p>
      </span>
    </div>
  );
};

export default PaymentInformation;
