import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ModalProvider } from "./Context/ModalContext/ModalContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import NotFound from "./Components/NotFound/NotFound";
import Loader from "./Components/Loader/Loader";

// Dynamically import components
const Home = lazy(() => import("./Pages/Home/Home"));
const Account = lazy(() => import("./Pages/Account/Account"));
const NewArrivals = lazy(() => import("./Pages/NewArrival/NewArrivals"));
const BestSeller = lazy(() => import("./Pages/BestSeller/BestSeller"));
const AllProducts = lazy(() => import("./Pages/AllIProducts/AllProducts"));
const Search = lazy(() => import("./Pages/Search/Search"));
const ContactUs = lazy(() => import("./Pages/ContactUs/ContactUs"));
const Cart = lazy(() => import("./Pages/Cart/Cart"));
const Login = lazy(() => import("./Pages/Login/Login"));
const SignUp = lazy(() => import("./Pages/SignUp/SignUp"));
const Category = lazy(() => import("./Pages/Category/Category"));
const OnePageCheckout = lazy(() => import("./Pages/OnePageCheckout/OnePageCheckout"));

function App() {
  return (
    <ModalProvider>
      <BrowserRouter>
        {/* Use the Loader as a fallback */}
        <Suspense fallback={<Loader isActive={true} />}>
          <Routes>
            {/* Public Routes */}
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />

            {/* Protected Routes */}
            <Route path="/" element={<ProtectedRoute element={Home} />} />
            <Route path="user/account-info" element={<ProtectedRoute element={Account} page="info" />} />
            <Route path="user/change-password" element={<ProtectedRoute element={Account} page="password" />} />
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
        </Suspense>
      </BrowserRouter>
    </ModalProvider>
  );
}

export default App;
