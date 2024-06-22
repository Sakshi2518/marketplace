import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import prodData from '../Alldata/prodData';
import './ProductDetails.css';
import Header from '../Home_page/Header';

const ProductDetails = () => {
  const { id } = useParams();
  const product = prodData.find((p) => p.id === parseInt(id));

  const [mainImage, setMainImage] = useState(product.imgUrl);
  const [clickedImage, setClickedImage] = useState(product.imgUrl);


  if (!product) {
    return <div>Product not found</div>;
  }

  const handleImageClick = (imgUrl) => {
    setMainImage(imgUrl);
    setClickedImage(imgUrl);
  };

  return (
    <div>
      <Header />
      <div className='single-product'>
        <div className='prod-images'>
          <div className='main-image'>
            <img src={mainImage} alt={product.prod_name} />
          </div>
          <div className='alt-images'>
            {product.altImages.map((imgUrl, index) => (
              <img
                key={index}
                src={imgUrl}
                alt={`${product.prod_name} ${index + 1}`}
                onClick={() => handleImageClick(imgUrl)}
                className={clickedImage === imgUrl ? 'clicked' : ''}
                
              />
            ))}
          </div>
        </div>
        <div className='prod-description'>
          <h1>{product.prod_name}</h1>
          <p>User rating:{product.acc_rating} </p>
          <p>Price: {product.price}</p>
          <p>orig price del {product.origPrice}</p>
          <p>Delivery: {product.delivery}</p>
          <p>Category: {product.category}</p>
          <p>Dimensions : {product.dimensions}</p>
          <p>Material: {product.material}</p>
          <p>{product.description}</p>
          <p>Available for rent? {product.rentavailibility}</p>
          
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
