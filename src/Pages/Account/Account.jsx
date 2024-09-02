import { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import AccountOptions from "../../Components/AccountOptions/AccountOptions";
import AccountInfo from "../../Components/AccountInfo/AccountInfo";
import ChangePassword from "../../Components/ChangePassword/ChangePassword";
import "./Account.css";

const Account = ({ page }) => {
  const [isLoading, setisLoading] = useState(true);

  return (
    <Layout pageTitle="Account" isLoading={isLoading}>
      <div className="accountPage">
        <AccountOptions />
        {page === "info" && (
          <AccountInfo isLoading={isLoading} setIsLoading={setisLoading} />
        )}
        {page === "password" && <ChangePassword setIsLoading={setisLoading} />}
      </div>
    </Layout>
  );
};

export default Account;
