import { useEffect, useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import Layout from "../../Components/Layout/Layout";
import NavbarFixed from "../../Components/Navbar/NavbarFixed";
import { Steps } from "antd";
const ShippingMethod = lazy(() =>
  import("../../Components/CheckoutComponents/ShippingMethod/ShippingMethod")
);
const PaymentInformation = lazy(() =>
  import(
    "../../Components/CheckoutComponents/PaymentInformation/PaymentInformation"
  )
);
const Confirmation = lazy(() =>
  import("../../Components/CheckoutComponents/Confirmation/Confirmation")
);
import { CSSTransition, SwitchTransition } from "react-transition-group";
import axiosInstance from "../../api/axiosConfig";
import useRetryRequest from "../../api/useRetryRequest";
import "./OnePageCheckOut.css";

const items = [
  { title: "Shipping Method" },
  { title: "Payment Information" },
  { title: "Confirmation" },
];

const countries = [
  { Id: 1, Name: "United States" },
  { Id: 2, Name: "Canada" },
];

const shippingMethods = [
  { newShippingMethodId: 4, shippingMethod: "Pickup" },
  { newShippingMethodId: 1, shippingMethod: "Delivery" },
  { newShippingMethodId: 5, shippingMethod: "Pallet Shipping" },
];

const OnePageCheckout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [shippingMethod, setShippingMethod] = useState(shippingMethods[0]);
  const [direction, setDirection] = useState("forward");
  const [products, setProducts] = useState([]);
  const [cartSummary, setCartSummary] = useState({
    subtotal: 0,
    Shipping: 0,
    tax: 0,
    Discount: 1.19,
    total: 0,
  });

  const [formData, setFormData] = useState({
    Name: "",
    Company: "",
    Address1: "",
    Address2: "",
    ZipPostalCode: "",
    City: "",
    Country: "",
    State: "",
    PhoneNumber: "",
    Email: "",
  });

  const countries = [
    { Id: 1, Name: "United States" },
    { Id: 2, Name: "Canada" },
  ];

  const [states, setStates] = useState([]);

  const navigate = useNavigate();

  const [discountData, setDiscountData] = useState(null);

  const retryRequest = useRetryRequest(); // Use the custom hook]

  const fetchDiscount = async () => {
    try {
      const response = await retryRequest(() =>
        axiosInstance.get("/cart/discount-value")
      );
      console.log("Discount fetched:", response.data);
      setDiscountData(response.data);
    } catch (error) {
      console.error("Failed to fetch discount:", error);
      setDiscountData(null); // Fallback if needed
    }
  };

  useEffect(() => {
    fetchDiscount();
  }, []);

  // Function to fetch both cart and user data in parallel
  const fetchDataInParallel = async () => {
    try {
      const [cartResponse, userInfoResponse] = await Promise.all([
        axiosInstance.get("/cart/items"),
        axiosInstance.get("/customer/info"),
      ]);

      let discountValue = 0;
      if (discountData) {
        if (discountData.UsePercentage) {
          discountValue =
            (cartResponse.data.totalPrice * discountData.DiscountPercentage) /
            100;
        } else {
          discountValue = discountData.DiscountAmount;
        }
      }

      // Set cart data
      const cartItems = cartResponse.data.cartItems;
      setProducts(cartItems);
      setCartSummary({
        subtotal: cartResponse.data.totalPrice,
        Shipping: 0,
        tax: cartResponse.data.taxAmount,
        Discount: discountValue,
        total: cartResponse.data.finalPrice - discountValue,
      });

      // Set user info data
      const userInfo = userInfoResponse.data[0];

      // Find the country name based on the CountryId
      const selectedCountry = countries.find(
        (country) => country.Id === userInfo.CountryId
      );

      // Fetch the state information based on StateProvinceId
      const stateResponse = await axiosInstance.get(
        `/customer/states/${userInfo.CountryId}`
      );

      const selectedState = stateResponse.data.find(
        (State) => State.Id === userInfo.StateProvinceId
      );

      setFormData({
        Name: `${userInfo.FirstName || ""} ${userInfo.LastName || ""}`.trim(),
        Address: `${userInfo.Address1 || ""}${
          userInfo.Address2 ? ", " + userInfo.Address2 : ""
        }${userInfo.City ? ", " + userInfo.City : ""}${
          selectedState.Name ? ", " + selectedState.Name : ""
        }${userInfo.ZipPostalCode ? " " + userInfo.ZipPostalCode : ""}${
          selectedCountry.Name ? ",\n" + selectedCountry.Name : ""
        }`.trim(),
        PhoneNumber: userInfo.PhoneNumber || "",
        Email: userInfo.Email || "",
      });

      if (cartItems.length === 0) {
        message.info("No items in the cart.");
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to load data:", error);
      message.error("Failed to load data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataInParallel();
    console.log(formData);
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
          <Suspense fallback={<div>Loading...</div>}>
            <ShippingMethod
              selectedOption={shippingMethod}
              setSelectedOption={setShippingMethod}
              shippingMethods={shippingMethods}
            />
          </Suspense>
        );
      case 1:
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <PaymentInformation />
          </Suspense>
        );
      case 2:
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <Confirmation
              userInfo={formData}
              shippingMethod={shippingMethod}
              products={products}
              cartSummary={cartSummary}
            />
          </Suspense>
        );
      default:
        return null;
    }
  };

  return (
    <Layout pageTitle="One Page Checkout" isLoading={isLoading}>
      <NavbarFixed />
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
