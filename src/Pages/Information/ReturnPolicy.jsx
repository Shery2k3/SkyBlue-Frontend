import { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import "./Information.css";

const ReturnPolicy = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout pageTitle="Return Policy" isLoading={isLoading}>
      (
      <div className="return-policy">
        <h1 className="main-heading">Returns Policy</h1>
        <section>
          <h2 className="content-heading">Policy Duration</h2>
          <p>Our policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately, we cannot offer you a refund or exchange.</p>
        </section>
        <section>
          <h2 className="content-heading">Eligibility for Return</h2>
          <p>To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.</p>
          <p>Several types of goods are exempt from being returned. Perishable goods such as food, flowers, newspapers, or magazines cannot be returned. We also do not accept products that are intimate or sanitary goods, hazardous materials, or flammable liquids or gases.</p>
          <p>Additional non-returnable items include:</p>
          <ul>
            <li>Gift cards</li>
            <li>Downloadable software products</li>
            <li>Some health and personal care items</li>
          </ul>
          <p>To complete your return, we require a receipt or proof of purchase.</p>
          <p>Please do not send your purchase back to the manufacturer.</p>
        </section>
        <section>
          <h2 className="content-heading">Partial Refunds (if applicable)</h2>
          <p>There are certain situations where only partial refunds are granted:</p>
          <ul>
            <li>Book with obvious signs of use</li>
            <li>CD, DVD, VHS tape, software, video game, cassette tape, or vinyl record that has been opened.</li>
            <li>Any item not in its original condition, is damaged or missing parts for reasons not due to our error.</li>
            <li>Any item that is returned more than 30 days after delivery</li>
          </ul>
        </section>
        <section>
          <h2 className="content-heading">Refunds (if applicable)</h2>
          <p>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.</p>
          <p>If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.</p>
        </section>
        <section>
          <h2 className="content-heading">Late or Missing Refunds (if applicable)</h2>
          <p>If you haven't received a refund yet, please check your bank or credit card account again, then contact the respective financial institution, as there is often some processing time before a refund is posted.</p>
          <p>If you've done all of this and you still have not received your refund yet, please contact us at <a href="mailto:info@skyglass.ca">info@skyglass.ca</a>.</p>
        </section>
        <section>
          <h2 className="content-heading">Sale Items (if applicable)</h2>
          <p>Only regular priced items may be refunded; unfortunately, sale items cannot be refunded.</p>
        </section>
        <section>
          <h2 className="content-heading">Exchanges (if applicable)</h2>
          <p>We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at <a href="mailto:info@skyglass.ca">info@skyglass.ca</a> and send your item to: 1300 Kamato Rd Mississauga ON L4W 2N2.</p>
        </section>
        <section>
          <h2 className="content-heading">Gifts</h2>
          <p>If the item was marked as a gift when purchased and shipped directly to you, you will receive a gift credit for the value of your return. Once the returned item is received, a gift certificate will be mailed to you.</p>
          <p>If the item was not marked as a gift when purchased, or the gift giver had the order shipped to themselves to give to you later, we will send a refund to the gift giver, and they will find out about your return.</p>
        </section>
        <section>
          <h2 className="content-heading">Shipping</h2>
          <p>To return your product, you should mail your product to: 1300 Kamato Rd Mississauga ON L4W 2N2.</p>
          <p>You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.</p>
          <p>Depending on where you live, the time frame to receive your exchanged product may vary.</p>
          <p>If you are returning an item over $75, you should consider using a shipping service that offers tracking or purchasing shipping insurance. We offer no guarantees towards the receiving of your returned item.</p>
        </section>
      </div>
    </Layout>
  );
};

export default ReturnPolicy;
