import { useEffect } from "react";
import Sidebar from "../SideBar/Sidebar";
import Footer2 from "../Footer/Footer2";
import "./Layout.css"

const Layout = ({ pageTitle, children }) => {
  useEffect(() => {
    document.title = `SkyBlue | ${pageTitle}`;
  }, [pageTitle]);

  return (
    <>
      <div className="layout">
        <Sidebar />
        <div class="content">{children}</div>
        <Footer2 />
      </div>
    </>
  );
};

export default Layout;
