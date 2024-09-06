import { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import "./Information.css"

const ReturnPolicy = () => {
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setisLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout pageTitle="Return Policy" isLoading={isLoading}>


    </Layout>
  );
};

export default ReturnPolicy;
