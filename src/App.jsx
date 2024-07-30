import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import ProductCard from "./Components/ProductCard";
import Layout from "./Components/Layout";
import NewArrival from "./Components/NewArrival";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="new-arrival" element={<NewArrival/>}/>
          <Route path="/card" element={<ProductCard />} />
        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
