import { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { Steps } from "antd";
import ShippingMethod from "../../Components/CheckoutComponents/ShippingMethod/ShippingMethod";
import PaymentInformation from "../../Components/CheckoutComponents/PaymentInformation/PaymentInformation";
import Confirmation from "../../Components/CheckoutComponents/Confirmation/Confirmation";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import axiosInstance from "../../api/axiosConfig";
import "./OnePageCheckout.css";

const items = [
  {
    title: "Shipping Method",
  },
  {
    title: "Payment Information",
  },
  {
    title: "Confirmation",
  },
];

const OnePageCheckout = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [shippingMethod, setShippingMethod] = useState("Pickup");
  const [direction, setDirection] = useState("forward");
  const [products, setProducts] = useState([]);
  const [cartSummary, setCartSummary] = useState({
    subtotal: 0,
    Shipping: 0,
    tax: 0,
    Discount: 1.19,
    total: 0,
  });

  const fetchCartData = async () => {
    try {
      const response = await axiosInstance.get("/cart/items");
      setProducts(response.data.cartItems);
      setCartSummary({
        subtotal: response.data.totalPrice,
        Shipping: 0,
        tax: response.data.taxAmount,
        Discount: 1.19,
        total: response.data.finalPrice - 1.19,
      });
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const nextStep = () => {
    if (currentStep < items.length - 1) {
      setDirection("forward");
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setDirection("backward");
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <ShippingMethod
            selectedOption={shippingMethod}
            setSelectedOption={setShippingMethod}
          />
        );
      case 1:
        return <PaymentInformation />;
      case 2:
        return <Confirmation shippingMethod={shippingMethod} products={products} cartSummary={cartSummary} />;
      default:
        return null;
    }
  };

  return (
    <Layout pageTitle="One Page Checkout" isLoading={false}>
      <div className="onepagecheckout">
        <Steps current={currentStep} items={items} />

        <SwitchTransition>
          <CSSTransition
            key={currentStep}
            timeout={300}
            classNames={direction === "forward" ? "fade" : "fade-backward"}
          >
            <div className="step-content">{renderStepContent()}</div>
          </CSSTransition>
        </SwitchTransition>

        <div className="checkout-buttons">
          {currentStep > 0 ? (
            <button onClick={prevStep} className="left-button">
              Back
            </button>
          ) : (
            <div className="spacer"></div>
          )}
          {currentStep < items.length - 1 && (
            <button type="primary" onClick={nextStep} className="right-button">
              Continue
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default OnePageCheckout;
