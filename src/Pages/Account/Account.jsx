import { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import axiosInstance from "../../api/axiosConfig";
import AccountOptions from "../../Components/AccountOptions/AccountOptions";
import AccountInfo from "../../Components/AccountInfo/AccountInfo";
import ChangePassword from "../../Components/ChangePassword/ChangePassword";
import "./Account.css";

const Account = ({ page }) => {
  const [isLoading, setisLoading] = useState(true);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get("/customer/info");
        setUserInfo(response.data[0]);
        setisLoading(false);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <Layout pageTitle="Account" isLoading={isLoading}>
      <div className="accountPage">
        <AccountOptions />
        {page === "info" && <AccountInfo userInfo={userInfo} />}
        {page === "password" && <ChangePassword />}
      </div>
    </Layout>
  );
};

export default Account;
