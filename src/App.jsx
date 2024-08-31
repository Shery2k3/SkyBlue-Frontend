import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import NewArrivals from "./Pages/NewArrival/NewArrivals";
import BestSeller from "./Pages/BestSeller/BestSeller";
import AllProducts from "./Pages/AllIProducts/AllProducts";
import Search from "./Pages/Search/Search";
import ContactUs from "./Pages/ContactUs/ContactUs";
import Cart from "./Pages/Cart/Cart";
import Login from "./Pages/Login/Login";
import NotFound from "./Components/NotFound/NotFound";
import Category from "./Pages/Category/Category";
import OnePageCheckout from "./Pages/OnePageCheckout/OnePageCheckout";
import { ModalProvider } from "./Context/ModalContext/ModalContext";
import SignUp from "./Pages/SignUp/SignUp";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <ModalProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />

          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute element={Home} />} />
          <Route path="new-arrivals" element={<ProtectedRoute element={NewArrivals} />} />
          <Route path="best-sellers" element={<ProtectedRoute element={BestSeller} />} />
          <Route path="all-products" element={<ProtectedRoute element={AllProducts} />} />
          <Route path="search" element={<ProtectedRoute element={Search} />} />
          <Route path="contact-us" element={<ProtectedRoute element={ContactUs} />} />
          <Route path="cart" element={<ProtectedRoute element={Cart} />} />
          <Route path="category/:categoryId" element={<ProtectedRoute element={Category} />} />
          <Route path="onepagecheckout" element={<ProtectedRoute element={OnePageCheckout} />} />

          {/* Catch-all for non-existent routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ModalProvider>
  );
}

export default App;
