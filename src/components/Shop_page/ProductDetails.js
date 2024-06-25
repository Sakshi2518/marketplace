import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import prodData from "../Alldata/prodData";
import "./ProductDetails.css";
import Header from "../Home_page/Header";
import { FaShoppingCart } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const product = prodData.find((p) => p.id === parseInt(id));

  const [mainImage, setMainImage] = useState(product.imgUrl);
  const [clickedImage, setClickedImage] = useState(product.imgUrl);
  const [showFullDescription, setShowFullDescription] = useState(false);
  

  if (!product) {
    return <div>Product not found</div>;
  }
  const handleImageClick = (imgUrl) => {
    setMainImage(imgUrl);
    setClickedImage(imgUrl);
  };
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  
  const truncatedDescription = product.description.substring(0, 70) + "...";

  const handleAddToCart = () => {
    alert(`${product.prod_name} has been added to your cart!`);
  };

  return (
    <div>
      <Header />
      <div className="single-product">
        <div className="prod-images">
          <div className="main-image">
            <img src={mainImage} alt={product.prod_name} />
          </div>
          <div className="alt-images">
            {product.altImages.map((imgUrl, index) => (
              <img
                key={index}
                src={imgUrl}
                alt={`${product.prod_name} ${index + 1}`}
                onClick={() => handleImageClick(imgUrl)}
                className={clickedImage === imgUrl ? "clicked" : ""}
              />
            ))}
          </div>
        </div>
        <div className="prod-description">
          <h1 className="product-name">{product.prod_name}</h1>
        
          <p>
            <strong>User rating:</strong> {product.acc_rating}
          </p>
          <p>
            <strong>Price:</strong> {product.price}
          </p>
          <p>
            <strong>Original Price:</strong> <del>{product.origPrice}</del>
          </p>
          <p>
            <strong>Delivery:</strong> {product.delivery}
          </p>
          <p>
            <strong>Category:</strong> {product.category}
          </p>
          <p>
            <strong>Dimensions:</strong> {product.dimensions}
          </p>
          <p>
            <strong>Material:</strong> {product.material}
          </p>
          <hr />
          <h3>Description</h3>
          <p>
            {showFullDescription ? product.description : truncatedDescription}
            <span onClick={toggleDescription} className="toggle-description">
              {showFullDescription ? " Read Less" : " Read More"}
            </span>
          </p>
          <hr />
          <p>
            <strong>Available for rent?</strong> {product.rentavailibility}
          </p>
          <button className="add-to-cart" onClick={handleAddToCart}>
            Add to Cart <FaShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
