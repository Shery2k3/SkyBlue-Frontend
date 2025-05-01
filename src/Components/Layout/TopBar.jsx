import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Topbar.css";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const TopBars = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const adminUrl = import.meta.env.VITE_ADMIN_URL;


  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isAdmin = user?.roles?.some(role => role.Name === "Administrators" || role.Name === "Admin");

  return (
    <div>
      {isAdmin && (
        <div className="topbar-admin" onClick={() => window.location.href = adminUrl}>
          Administration
        </div>
      )}
      {!isMobile && (
        <div className="topbar-info">
          For account registration or related queries, please call at
          647-522-7419. &nbsp;&nbsp; For order related queries, please call at
          647-402-5465
        </div>
      )}
    </div>
  );
};

export default TopBars;
