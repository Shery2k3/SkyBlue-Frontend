import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Sidebar from "../SideBar/Sidebar";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import Banner from "../Banner/Banner";
import Footer1 from "../Footer/Footer1";
import Footer2 from "../Footer/Footer2";
import ProductModal from "../ProductModal/ProductModal";
import { useModal } from "../../Context/ModalContext/ModalContext";
import "./Layout.css";

const Layout = ({ pageTitle, children, style, isLoaded }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 867);
  const { modalProduct, closeModal } = useModal();

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
      <Loader isActive={isLoaded} />

      {style == "style1" ? (
        <div className="layout1">
          {isMobile ? <Navbar /> : <Sidebar />}
          <div className="content-style1">
            <Header />
            <Banner />
            {children}
          </div>
          {isMobile ? <Footer1 /> : <Footer2 />}
        </div>
      ) : (
        <div className="layout2">
          <Navbar />
          <div className="content-style2">{children}</div>
          <Footer1 />
        </div>
      )}
      {modalProduct && (
        <ProductModal product={modalProduct} onClose={closeModal} />
      )}
    </>
  );
};

export default Layout;
