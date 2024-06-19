// src/components/Shop_page/ProductDetails.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import prodData from '../Alldata/prodData'; // Adjust path as necessary

const ProductDetails = () => {
  const { id } = useParams();
  const product = prodData.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.prod_name}</h1>
      <img src={product.imgUrl} alt={product.prod_name} />
      <p>Price: {product.price}</p>
      <p>Delivery: {product.delivery}</p>
      <p>{product.description}</p> {/* Assuming a description field exists */}
    </div>
  );
};

export default ProductDetails;
