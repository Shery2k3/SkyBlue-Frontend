import { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import NavbarFixed from "../../Components/Navbar/NavbarFixed";
import AccountOptions from "../../Components/AccountOptions/AccountOptions";
import AccountInfo from "../../Components/AccountInfo/AccountInfo";
import OrderHistory from "../../Components/OrderHistory/OrderHistory";
import ChangePassword from "../../Components/ChangePassword/ChangePassword";
import "./Account.css";

const Account = ({ page }) => {
  const [isLoading, setisLoading] = useState(true);

  return (
    <Layout pageTitle="Account" isLoading={isLoading}>
      <NavbarFixed />
      <div className="accountPage">
        <AccountOptions />
        {page === "info" && (
          <AccountInfo isLoading={isLoading} setIsLoading={setisLoading} />
        )}
        {page === "password" && <ChangePassword setIsLoading={setisLoading} />}
        {page === "orders" && <OrderHistory setIsLoading={setisLoading} />}
      </div>
    </Layout>
  );
};

export default Account;
