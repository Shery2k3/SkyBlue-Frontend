import { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import CartItemGrid from "../../Components/CartItemGrid/CartItemGrid";

const Cart = () => {
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setisLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout pageTitle="Cart" isLoading={isLoading}>
      <CartItemGrid />
    </Layout>
  );
};

export default Cart;
