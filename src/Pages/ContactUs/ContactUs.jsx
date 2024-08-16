import { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import ContactUsGrid from "../../Components/ContactUsGrid/ContactUsGrid";
import ContactForm from "../../Components/ContactForm/ContactForm";
import Map from "../../Components/Map/Map";

const ContactUs = () => {
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout pageTitle="Contact Us" isLoaded={isLoaded}>
      <ContactUsGrid />
      <ContactForm />
      <Map />
    </Layout>
  );
};

export default ContactUs;
