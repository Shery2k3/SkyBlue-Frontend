import { useParams, useLocation } from 'react-router-dom';

const ViewProduct = () => {
  const { id } = useParams();
  const location = useLocation();  // <---- This is missing in your code!
  const product = location.state?.product;

  console.log("Product ID:", id);
  console.log("Product Data:", product);

  if (!product) {
    return <div>No product data received.</div>;
  }

  return (
    <div>
      <h2>Viewing Product {id}</h2>
      <p>Name: {product.Name || product.data?.Name}</p>
      {/* You can render more product details here */}
    </div>
  );
};

export default ViewProduct;
