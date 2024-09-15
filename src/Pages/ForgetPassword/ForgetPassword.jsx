import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ForgetPasswordForm from "../../Components/ForgetPasswordForm/ForgetPasswordForm";
import VerifcationLayout from "../../Components/VerificationLayout/VerificationLayout";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const ForgetPassword = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { token: contextToken } = useContext(AuthContext); 
  const navigate = useNavigate(); 

  const isLoggedIn = () => {
    const localStorageToken = localStorage.getItem("token");
    return contextToken || localStorageToken;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate loading time
        await new Promise((resolve) => setTimeout(resolve, 500));
        setIsLoading(false); // Set to true once data is loaded
      } catch (error) {
        console.error("Failed to load data:", error);
        setIsLoading(false); // Handle loading failure if necessary
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  }, [contextToken, navigate]);

  return (
    <VerifcationLayout isLoading={isLoading}>
      <ForgetPasswordForm />
    </VerifcationLayout>
  );
};

export default ForgetPassword;
