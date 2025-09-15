import React from "react";
import "./VerificationLayout.css";
import Loader from "../Loader/Loader";

const VerifcationLayout = ({ children, isLoading }) => {
  return (
    <div className="verification-container">
      {/* 🔹 Top Welcome Banner */}
      <div
        style={{
          width: "100%",
          backgroundColor: "black",
          color: "white",
          textAlign: "center",
          fontFamily: "var(--font-primary)", 
          fontWeight: "600",
          fontSize: "0.95rem",
          padding: "5px 0",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
        }}
      >
         For <strong>account registration</strong> queries, call:{" "}647-522-7419
      </div>

      {/* 🔹 Push content down so it's not hidden */}
      <div style={{ paddingTop: "50px" }}>
        <Loader isActive={isLoading} />
        {children}
      </div>
    </div>
  );
};

export default VerifcationLayout;
