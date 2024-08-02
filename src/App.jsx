import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import NewArrivals from "./Pages/NewArrival/NewArrivals";
import BestSeller from "./Pages/BestSeller/BestSeller";
import ExclusiveProducts from "./Pages/ExclusiveProducts/ExclusiveProducts";
import ContactUs from "./Pages/ContactUs/ContactUs";
import Cart from "./Pages/Cart/Cart";

function App() {
  return (
    <BrowserRouter>

      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="new-arrivals" element={<NewArrivals />}/>
          <Route path="best-sellers" element={<BestSeller />}/>
          <Route path="exclusive-products" element={<ExclusiveProducts />}/>
          <Route path="contact-us" element={<ContactUs />}/>
          <Route path="cart" element={<Cart />}/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
