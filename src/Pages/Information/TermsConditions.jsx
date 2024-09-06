import { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import "./Information.css"

const TermsConditions = () => {
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setisLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout pageTitle="Terms & Conditions" isLoading={isLoading}>


    </Layout>
  );
};

export default TermsConditions;
