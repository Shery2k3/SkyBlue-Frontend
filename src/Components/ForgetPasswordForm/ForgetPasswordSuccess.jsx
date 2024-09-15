import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./ForgetPasswordForm.css";

const ForgetPasswordSuccess = () => {
  return (
    <div className="wrapper-forget-password">
      <div className="inner-wrapper-forget-password">
        <p>A password reset email has been sent to EMAIL</p>
        <span className="sign-in-link">
          <Link to="/login">
            <FontAwesomeIcon icon={faArrowLeft} />{" "}
            Sign In
          </Link>
        </span>
      </div>
    </div>
  );
};

export default ForgetPasswordSuccess;
