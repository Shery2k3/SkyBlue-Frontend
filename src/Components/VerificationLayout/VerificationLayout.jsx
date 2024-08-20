import React from "react";
import "./VerificationLayout.css"
import Loader from "../Loader/Loader";

const VerifcationLayout = ({ children, isLoaded }) => {
  return (
    <div className="verification-container" >
        <Loader isActive={isLoaded} />
      {children}
    </div>
  );
};

export default VerifcationLayout;
