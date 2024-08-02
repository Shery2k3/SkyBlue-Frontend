import { useEffect, useState } from "react";
import Sidebar from "../SideBar/Sidebar";
import Navbar from "../Navbar/Navbar";
import Footer1 from "../Footer/Footer1";
import Footer2 from "../Footer/Footer2";
import "./Layout.css";

const Layout = ({ pageTitle, children, style }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 867);

  useEffect(() => {
    document.title = `SkyBlue | ${pageTitle}`;

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 867);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pageTitle]);

  return (
    <>
      {style == "style1" ? (
        <div className="layout1">
          {isMobile ? <Navbar /> : <Sidebar />}
          <div className="content-style1">{children}</div>
          {isMobile ? <Footer1 /> : <Footer2 />}
        </div>
      ) : (
        <div className="layout2">
          <Navbar />
          <div className="content-style2">{children}</div>
          <Footer1 />
        </div>
      )}
    </>
  );
};

export default Layout;
