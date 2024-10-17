import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { token } = useContext(AuthContext);
  const isAuthenticated = token || localStorage.getItem("token");
  const location = useLocation();

  // Exclude /reset-password from authentication check
  if (location.pathname === "/reset-password") {
    return <Element {...rest} />;
  }

  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;