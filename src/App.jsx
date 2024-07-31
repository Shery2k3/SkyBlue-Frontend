import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import NewArrival from "./Pages/NewArrival/NewArrival";
import Footer1 from "./Components/Footer/Footer1";

function App() {
  return (
    <BrowserRouter>

      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="new-arrival" element={<NewArrival/>}/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
