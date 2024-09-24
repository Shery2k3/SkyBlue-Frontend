import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import "./Notice.css";

const Notice = () => {
  const [isActive, setIsActive] = useState(true);

  const handleClose = () => {
    setIsActive(false);
  };

  const handleClickOutside = (e) => {
    if (e.target.classList.contains("notice-modal-container")) {
      handleClose();
    }
  };

  useEffect(() => {
    if (!isActive) {
      setTimeout(() => {
        document.querySelector(".notice-modal-container").style.display = "none";
      }, 500);
    }
  }, [isActive]);

  return (
    <div
      className={`notice-modal-container ${isActive ? "active" : "inactive"}`}
      onClick={handleClickOutside}
    >
      <div className="notice-modal">
        <FontAwesomeIcon className="modal-closer" icon={faX} onClick={handleClose} />
        <img src="https://i.ibb.co/cb8YHd5/Logo-Dark.png" alt="Notice" />
      </div>
    </div>
  );
};

export default Notice;
