import { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { Steps } from "antd";
import ShippingMethod from "../../Components/CheckoutComponents/ShippingMethod/ShippingMethod";
import PaymentInformation from "../../Components/CheckoutComponents/PaymentInformation/PaymentInformation";
import Confirmation from "../../Components/CheckoutComponents/Confirmation/Confirmation";
import { CSSTransition, SwitchTransition } from "react-transition-group";
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
        return <Confirmation shippingMethod={shippingMethod} />;
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
