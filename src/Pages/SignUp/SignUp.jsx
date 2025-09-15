import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "../../Components/SignUpForm/SignUpForm";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { token: contextToken } = useContext(AuthContext); // Get token from AuthContext
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Function to check if user is logged in
  const isLoggedIn = () => {
    // Check both AuthContext and localStorage for token
    const localStorageToken = localStorage.getItem("token");
    return contextToken || localStorageToken;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate loading time
        await new Promise((resolve) => setTimeout(resolve, 1000));
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

  return <>
    <div>
    <div
        style={{
          width: "100%",
          backgroundColor: "black",
          color: "white",
          textAlign: "center",
          fontFamily: "var(--font-primary)", 
          fontWeight: "600",
          fontSize: "0.95rem",
          padding: "5px 0",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
        }}
      >
         For <strong>account registration</strong> queries, call:{" "}647-522-7419
      </div>
      <SignupForm />
    </div>
  </>;
};

export default SignUp;
