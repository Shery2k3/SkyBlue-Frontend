import { useState, useEffect } from "react";
import LoginForm from "../../Components/loginform/loginform";
import VerifcationLayout from "../../Components/VerificationLayout/VerificationLayout";

const Login = () => {
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with actual data fetching logic
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading time
        setIsLoaded(false); // Set to true once data is loaded
      } catch (error) {
        console.error("Failed to load data:", error);
        setIsLoaded(false); // Handle loading failure if necessary
      }
    };

    fetchData();
  }, []);

  return (
    <VerifcationLayout isLoaded={isLoaded} > 
      <LoginForm />
    </VerifcationLayout>
  );
};

export default Login;
