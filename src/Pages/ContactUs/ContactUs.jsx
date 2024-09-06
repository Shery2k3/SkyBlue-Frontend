import { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import ContactUsGrid from "../../Components/ContactUsGrid/ContactUsGrid";
import ContactForm from "../../Components/ContactForm/ContactForm";
import Map from "../../Components/Map/Map";

const ContactUs = () => {
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setisLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout pageTitle="Contact Us" isLoading={isLoading}>
      <ContactUsGrid />
      <ContactForm />
      <Map />
    </Layout>
  );
};

export default ContactUs;
