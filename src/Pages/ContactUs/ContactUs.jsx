import React from "react";
import Layout from "../../Components/Layout/Layout";
import ContactUsGrid from "../../Components/ContactUsGrid/ContactUsGrid";
import ContactForm from "../../Components/ContactForm/ContactForm";
import Map from "../../Components/Map/Map";

const ContactUs = () => {
  return (
    <Layout pageTitle="Contact Us">
      <ContactUsGrid />
      <ContactForm />
      <Map />
    </Layout>
  );
};

export default ContactUs;
