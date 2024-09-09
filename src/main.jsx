import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { NavProvider } from "./Context/NavContext/NavContext.jsx";
import { AuthProvider } from "./Context/AuthContext/AuthContext.jsx";
import { AgeVerificationProvider } from "./Context/AuthContext/AgeVerificationContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <AgeVerificationProvider>
        <NavProvider>
          <App />
        </NavProvider>
      </AgeVerificationProvider>
    </AuthProvider>
  </React.StrictMode>
);
