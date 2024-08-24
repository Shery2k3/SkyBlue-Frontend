import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import NewArrivals from "./Pages/NewArrival/NewArrivals";
import BestSeller from "./Pages/BestSeller/BestSeller";
import ExclusiveProducts from "./Pages/ExclusiveProducts/ExclusiveProducts";
import Search from "./Pages/Search/Search";
import ContactUs from "./Pages/ContactUs/ContactUs";
import Cart from "./Pages/Cart/Cart";
import Login from "./Pages/login/login";
import NotFound from "./Components/NotFound/NotFound";
import AgeVerification from "./Components/AgeVerificationForm/AgeVerificationForm";
import Category from "./Pages/Category/Category";
import OnePageCheckout from "./Pages/OnePageCheckout/OnePageCheckout";
import { ModalProvider } from "./Context/ModalContext/ModalContext";


import SignUp from "./Pages/SignUp/SignUp";


function App() {
  return (
    <ModalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="new-arrivals" element={<NewArrivals />} />
          <Route path="best-sellers" element={<BestSeller />} />
          <Route path="exclusive-products" element={<ExclusiveProducts />} />
          <Route path="search" element={<Search />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          
          
          
          <Route path="category/:categoryId" element={<Category />} />
          <Route path="onepagecheckout" element={<OnePageCheckout />} />
          <Route path="*" element={<NotFound />} /> 
        </Routes>
      </BrowserRouter>
    </ModalProvider>
  );
}

export default App;
