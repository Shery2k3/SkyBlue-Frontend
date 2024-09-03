import { useEffect, useState, lazy, Suspense } from "react";
import Loader from "../Loader/Loader";

// Lazy load components
const Sidebar = lazy(() => import("../SideBar/Sidebar"));
const Navbar = lazy(() => import("../Navbar/Navbar"));
const Header = lazy(() => import("../Header/Header"));
const Banner = lazy(() => import("../Banner/Banner"));
const Footer1 = lazy(() => import("../Footer/Footer1"));
const Footer2 = lazy(() => import("../Footer/Footer2"));
const AgeVerificationForms = lazy(() =>
  import("../AgeVerificationForm/AgeVerificationForm")
);

import ProductModal from "../ProductModal/ProductModal";
import { useModal } from "../../Context/ModalContext/ModalContext";
import { useAgeVerification } from "../../Context/AuthContext/AgeVerificationContext";

const Layout = ({ pageTitle, children, style, isLoading }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 867);
  const { modalProduct, closeModal } = useModal();
  const { isAgeVerified } = useAgeVerification();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    document.title = `SkyBlue | ${pageTitle}`;

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 867);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pageTitle]);

  return (
    <>
      <Loader isActive={isLoading} />
      {!isAgeVerified ? (
        <Suspense fallback={<Loader isActive={true} />}>
          <AgeVerificationForms />
        </Suspense>
      ) : (
        <>
          {style === "style1" ? (
            <div className="layout1">
              <Suspense fallback={<Loader isActive={true} />}>
                {isMobile ? <Navbar /> : <Sidebar />}
                <div className="content-style1">
                  <Header />
                  <Banner />
                  {children}
                </div>
                {isMobile ? (
                  <Suspense fallback={<Loader isActive={true} />}>
                    <Footer1 />
                  </Suspense>
                ) : (
                  <Suspense fallback={<Loader isActive={true} />}>
                    <Footer2 />
                  </Suspense>
                )}
              </Suspense>
            </div>
          ) : (
            <div className="layout2">
              <Suspense fallback={<Loader isActive={true} />}>
                <Navbar />
              </Suspense>
              <div className="content-style2">{children}</div>
              <Suspense fallback={<Loader isActive={true} />}>
                <Footer1 />
              </Suspense>
            </div>
          )}
          {modalProduct && (
            <ProductModal product={modalProduct} onClose={closeModal} />
          )}
        </>
      )}
    </>
  );
};

export default Layout;
