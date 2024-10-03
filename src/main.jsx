import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { NavProvider } from "./Context/NavContext/NavContext.jsx";
import { CategoryMenuProvider } from "./Context/CategoryMenuContext/CategoryMenuContext.jsx";
import { AuthProvider } from "./Context/AuthContext/AuthContext.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <NavProvider>
        <CategoryMenuProvider>
          <App />
        </CategoryMenuProvider>
      </NavProvider>
    </AuthProvider>
  </React.StrictMode>
);
