import { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import NavbarFixed from "../../Components/Navbar/NavbarFixed";
import "./Information.css";

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
      <NavbarFixed />
      <div className="return-policy">
        <h1 className="main-heading">Terms & Conditions</h1>
        <section>
          <h2 className="content-heading">
            SECTION 1 - ORDER ACCEPTANCE POLICY
          </h2>
          <p>
            Your receipt of an electronic or other form of order confirmation
            does not signify our acceptance of your order, nor does it
            constitute confirmation of our offer to sell. Sky Glass reserves the
            right at any time after receipt of your order to accept or decline
            your order for any reason or to supply less than the quantity you
            ordered of any item.
          </p>
        </section>
        <section>
          <h2 className="content-heading">SECTION 2 - CREDIT CARDS</h2>
          <p>
            We accept the following credit cards: Visa, MasterCard, and
            Discover. There is no surcharge for using your credit card to make
            purchases. Please be sure to provide your exact billing address and
            telephone number (i.e. the address and phone number your credit card
            bank has on file for you). Incorrect information will cause a delay
            in processing your order. Your credit card will be billed upon
            completion of your order.
          </p>
        </section>
        <section>
          <h2 className="content-heading">
            SECTION 3 - MONEY ORDERS, CASHIER'S CHECKS, COMPANY CHECKS &
            PERSONAL CHECKS
          </h2>
          <p>
            We accept money orders, cashier’s checks, personal checks, and
            company checks in Canadian currency only. Orders are processed upon
            receipt of a money order or cashier’s check. For personal and
            company checks, please allow up to 10 banking days after receipt for
            clearance of funds before the order is processed. We cannot
            guarantee the availability of a product by the time funds clear or
            payment is received. We will charge a $25 fee on all returned
            checks.
          </p>
        </section>
        <section>
          <h2 className="content-heading">SECTION 4 - ORDER SHIPPING POLICY</h2>
          <p>
            Shipping Time: Most orders received before 5:00PM will ship the same
            day, provided the product ordered is in stock. Most orders received
            after 5:00 PM will ship the next business day. Orders are not
            processed or shipped on Saturday or Sunday, except by prior
            arrangement. We cannot guarantee when an order will arrive. Consider
            any shipping or transit time offered to you by Sky Glass or other
            parties only as an estimate. We encourage you to order in a timely
            fashion to avoid delays caused by shipping or product availability.
          </p>
        </section>
        <section>
          <h2 className="content-heading">SECTION 5 - OUT OF STOCK PRODUCTS</h2>
          <p>
            We will ship your product as it becomes available. Usually, products
            ship the same day if ordered by 5:00PM, or by the next business day
            if your order is received after this time and for orders received on
            Saturday, Sunday, or any major holiday. However, there may be times
            when the product you have ordered is out-of-stock which will delay
            fulfilling your order. We will keep you informed of any products
            that you have ordered that are out-of-stock and unavailable for
            immediate shipment. You may cancel your order at any time prior to
            shipping.
          </p>
        </section>
        <section>
          <h2 className="content-heading">
            SECTION 6 - MULTIPLE PRODUCT ORDERS
          </h2>
          <p>
            For a multiple product order, we will make every attempt to ship all
            products contained in the order at the same time. Products that are
            unavailable at the time of shipping will be shipped as they become
            available, unless you inform us otherwise. You will only be charged
            for products contained in a given shipment, plus any applicable
            shipping charges. You will only be charged for shipping at the rate
            quoted to you on your purchase receipt. The entirety of this
            shipping charge may be applied to the first product(s) shipped on a
            multiple shipment order.
          </p>
        </section>
        <section>
          <h2 className="content-heading">SECTION 7 - TAXES</h2>
          <p>
            Our Store shall automatically charge and withhold the applicable
            sales tax for orders to be delivered to addresses within the state
            of ON. For orders shipped to other states, you are solely
            responsible for all sales taxes or other taxes.
          </p>
        </section>
        <section>
          <h2 className="content-heading">SECTION 8 - TYPOGRAPHICAL ERRORS</h2>
          <p>
            In the event a product is listed at an incorrect price due to
            typographical error or error in pricing information received from
            our suppliers, Sky Glass shall have the right to refuse or cancel
            any orders placed for product listed at the incorrect price. Sky
            Glass shall have the right to refuse or cancel any such orders
            whether or not the order has been confirmed and your credit card
            charged. If your credit card has already been charged for the
            purchase and your order is canceled, Sky Glass shall immediately
            issue a credit to your credit card account in the amount of the
            incorrect price.
          </p>
        </section>
        <section>
          <h2 className="content-heading">SECTION 9 - LINKS</h2>
          <p>
            This site may contain links to other sites on the Internet that are
            owned and operated by third parties. You acknowledge that Sky Glass
            is not responsible for the operation of or content located on or
            through any such site.
          </p>
        </section>
        <section>
          <h2 className="content-heading">
            SECTION 10 - COPYRIGHT AND TRADEMARK NOTICE
          </h2>
          <p>
            Unless otherwise specified, all materials appearing on this site,
            including the text, site design, logos, graphics, icons, and images,
            as well as the selection, assembly, and arrangement thereof, are the
            sole property of Sky Glass, Copyright © [year], ALL RIGHTS RESERVED.
            You may use the content of this site only for the purpose of
            shopping on this site or placing an order on this site and for no
            other purpose. No materials from this site may be copied,
            reproduced, modified, republished, uploaded, posted, transmitted, or
            distributed in any form or by any means without our prior written
            permission. All rights not expressly granted herein are reserved.
            Any unauthorized use of the materials appearing on this site may
            violate copyright, trademark, and other applicable laws and could
            result in criminal or civil penalties.
          </p>
        </section>
        <section>
          <h2 className="content-heading">SECTION 11 - OTHER CONDITIONS</h2>
          <p>
            These Conditions will supersede any terms and/or conditions you
            include with any purchase order, regardless of whether Sky Glass
            signs them or not. We reserve the right to make changes to this site
            and these Conditions at any time.
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default TermsConditions;
