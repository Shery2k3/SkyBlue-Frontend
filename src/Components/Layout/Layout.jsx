import { useEffect, useState, lazy, Suspense } from "react";
import Loader from "../Loader/Loader";

// Lazy load components
import Navbar from "../Navbar/Navbar";
import NavMenu from "../NavMenu/NavMenu";
import AllCategoryNav from "../AllCategoryNav/AllCategoryNav";
import Newsletter from "../Newsletter/Newsletter";
const Footer1 = lazy(() => import("../Footer/Footer1"));

import ProductModal from "../ProductModal/ProductModal";
import { useModal } from "../../Context/ModalContext/ModalContext";

const Layout = ({ pageTitle, children, style, isLoading }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 867);
  const { modalProduct, closeModal } = useModal();

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

      <div className="layout">
        <Navbar />
        <NavMenu />
        <AllCategoryNav />
        <div className="content">{children}</div>
        <Newsletter />
        <Suspense fallback={<Loader isActive={true} />}>
          <Footer1 />
        </Suspense>
      </div>

      {modalProduct && (
        <ProductModal product={modalProduct} onClose={closeModal} />
      )}
    </>
  );
};

export default Layout;
