import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import NewArrivals from "./Pages/NewArrival/NewArrivals";

function App() {
  return (
    <BrowserRouter>

      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="new-arrivals" element={<NewArrivals />}/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
