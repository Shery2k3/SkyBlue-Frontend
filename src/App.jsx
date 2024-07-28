import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ProductCard from "./Components/ProductCard";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card" element={<ProductCard/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
