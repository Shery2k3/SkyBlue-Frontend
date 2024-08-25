import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./Context/AuthContext/AuthContext.jsx";
import { AgeVerificationProvider } from "./Context/AuthContext/AgeVerificationContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <AgeVerificationProvider>
        <App />
      </AgeVerificationProvider>
    </AuthProvider>
  </React.StrictMode>
);
