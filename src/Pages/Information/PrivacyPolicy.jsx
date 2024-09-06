import { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import "./Information.css"

const PrivacyPolicy = () => {
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setisLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout pageTitle="Privacy Policy" isLoading={isLoading}>
      <div className="return-policy">
        <h1 className="main-heading"> Privacy Policy</h1>
        <section>
          <h2 className="content-heading">SECTION 1 - TRANSACTIONAL INFORMATION</h2>
          <p>What do you do with my information?</p>
          <p>
            When you purchase something from our store, as part of the buying and selling process, we collect the personal information you give us such as your name, address and email address.
            When you browse our store, we also automatically receive your computer Internet protocol (IP) address in order to provide us with information that helps us learn about your browser and operating system.
          </p>
          <p>Email marketing (if applicable): With your permission, we may send you emails about our store, new products and other updates.</p>
        </section>

        <section>
          <h2 className="content-heading">SECTION 2 - CONSENT</h2>
          <p>How do you get my consent?</p>
          <p>
            When you provide us with personal information to complete a transaction, verify your credit card, place an order, arrange for a delivery or return a purchase, we imply that you consent to our collecting it and using it for that specific reason only.
            If we ask for your personal information for a secondary reason, such as marketing, we will either ask you directly for your expressed consent, or provide you with an opportunity to say no.
          </p>
          <p>How do I withdraw my consent?</p>
          <p>
            After you opt-in, if you change your mind, you may withdraw your consent for us to contact you, for the continued collection, use or disclosure of your information, at any time, by contacting us at info@skybluewholesale.com or mailing us at:
          </p>
          <address>
            Sky Blue Wholesale<br />
            1300 Kamato Rd, Mississauga, Ontario, Canada, L4W2N2
          </address>
        </section>

        <section>
          <h2 className="content-heading">SECTION 3 - DISCLOSURE</h2>
          <p>Do you disclose my information?</p>
          <p>
            We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service.
          </p>
        </section>

        <section>
          <h2 className="content-heading">SECTION 4 - ONLINE STORE</h2>
          <p>Our online store is hosted by 3dcart. They provide us with the online e-commerce platform that allows us to sell our products and services to you.</p>
          <p>
            You can read more about how 3dcart uses your Personal Information here: <a href="https://www.3dcart.com/privacy.html" target="_blank" rel="noopener noreferrer">3dcart Privacy Policy</a>
          </p>
          <p>
            Payment: If you choose a direct payment gateway to complete your purchase, the online store transmits your credit card data. The store data is encrypted through the Payment Card Industry Data Security Standard (PCI-DSS). Your purchase transaction data is stored only as long as is necessary to complete your purchase transaction. After that is complete, your purchase transaction information is deleted.
          </p>
          <p>
            All direct payment gateways adhere to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, MasterCard, American Express and Discover.
          </p>
          <p>PCI-DSS requirements help ensure the secure handling of credit card information by our store and its service providers.</p>
        </section>

        <section>
          <h2 className="content-heading">SECTION 5 - THIRD-PARTY SERVICES</h2>
          <p>In general, the third-party providers we use will only collect, use, and disclose your information to the extent necessary to allow them to perform the services they provide to us.</p>
          <p>
            However, certain third-party service providers, such as payment gateways and other payment transaction processors, have their own privacy policies in respect to the information we are required to provide to them for your purchase-related transactions.
          </p>
          <p>
            For these providers, we recommend that you read their privacy policies so you can understand the manner in which your personal information will be handled by these providers.
          </p>
          <p>You can opt out of targeted advertising by:</p>
          <ul>
            <li><a href="https://www.facebook.com/settings/?tab=ads" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://www.google.com/settings/ads/anonymous" target="_blank" rel="noopener noreferrer">Google</a></li>
            <li><a href="https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads" target="_blank" rel="noopener noreferrer">Bing</a></li>
          </ul>
          <p>
            In particular, remember that certain providers may be located in or have facilities that are located in a different jurisdiction than either you or us. So if you elect to proceed with a transaction that involves the services of a third-party service provider, then your information may become subject to the laws of the jurisdiction(s) in which that service provider or its facilities are located.
          </p>
          <p>
            As an example, if you are located in Canada and your transaction is processed by a payment gateway located in the United States, then your personal information used in completing that transaction may be subject to disclosure under United States legislation, including the Patriot Act.
          </p>
          <p>Once you leave our store website or are redirected to a third-party website or application, you are no longer governed by this Privacy Policy or our website's Terms of Service.</p>
        </section>

        <section>
          <h2 className="content-heading">SECTION 6 - SECURITY</h2>
          <p>To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.</p>
          <p>
            If you provide us with your credit card information, the information is encrypted using secure socket layer technology (SSL) and stored with AES-256 encryption. Although no method of transmission over the Internet or electronic storage is 100% secure, we follow all PCI-DSS requirements and implement additional generally accepted industry standards.
          </p>
        </section>

        <section>
          <h2 className="content-heading">SECTION 7 - DO NOT TRACK</h2>
          <p>Our website uses “Cookies” as data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit <a href="http://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">All About Cookies</a>.</p>
          <p>
            Please note that we do not alter our Site’s data collection and use practices when we see a Do Not Track signal from your browser.
          </p>
          <p>
            If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.
          </p>
          <p>
            Additionally, if you are a European resident we note that we are processing your information in order to fulfill contracts we might have with you (for example if you make an order through the Site), or otherwise to pursue our legitimate business interests listed above. Additionally, please note that your information will be transferred outside of Europe, including to Canada and the United States.
          </p>
        </section>

        <section>
          <h2 className="content-heading">SECTION 8 - AGE OF CONSENT</h2>
          <p>
            By using this site, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
          </p>
        </section>

        <section>
          <h2 className="content-heading">SECTION 9 - CHANGES TO THIS PRIVACY POLICY</h2>
          <p>
            We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it.
          </p>
          <p>
            If our store is acquired or merged with another company, your information may be transferred to the new owners so that we may continue to sell products to you.
          </p>
        </section>

        <section>
          <h2 className="content-heading">QUESTIONS AND CONTACT INFORMATION</h2>
          <p>
            If you would like to: access, correct, amend or delete any personal information we have about you, register a complaint, or simply want more information contact our Privacy Compliance Officer at <a href="mailto:info@skybluewholesale.com">info@skybluewholesale.com</a> or by mail at:
          </p>
          <address>
            Sky Blue Wholesale<br />
            [Re: Privacy Compliance Officer]<br />
            1300 Kamato Rd, Mississauga, Ontario, Canada, L4W2N2
          </address>
        </section>
      </div>



    </Layout>
  );
};

export default PrivacyPolicy;
