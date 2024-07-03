import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import prodData from "../Alldata/prodData";
import "./ProductDetails.css";
import Header from "../Home_page/Header";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from '../Cart_page/CartProvider';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = () => {
  const { id } = useParams();
  const product = prodData.find((p) => p._id === parseInt(id));

  const [mainImage, setMainImage] = useState(product?.imgUrl || '');
  const [clickedImage, setClickedImage] = useState(product?.imgUrl || '');
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { dispatch, item: cartItems } = useContext(CartContext);

  if (!product) {
    return <div>Product not found</div>;
  }

  const isInCart = cartItems.some(item => item._id === product._id);

  const handleAddToCart = () => {
    if (isInCart) {
      toast.error(`Product "${product.prod_name}" is already in the cart!`);
    } else {
      dispatch({ type: 'ADD_TO_CART', payload: product });
      toast.success(`Product "${product.prod_name}" has been added to the cart!`);
    }
  };

  const handleImageClick = (imgUrl) => {
    setMainImage(imgUrl);
    setClickedImage(imgUrl);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const truncatedDescription = product.description.substring(0, 70) + "...";

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
          <p className="delivery">Delivery: {product.delivery}</p>

          <p>
            <strong>User rating:</strong> {product.acc_rating}
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
          <div className="price-row">
            <div className="price">
              <strong>Price:</strong>{" "}
              <span className="price-value">Rs.{product.price}</span>
            </div>
            <div className="original-price">
              <span className="original-price-value">
                ( <del> Rs.{product.origPrice}</del> )
              </span>
            </div>
            <button className="add-to-cart" onClick={handleAddToCart}>
              {isInCart ? "Already in Cart" : "Add to Cart"} <FaShoppingCart />
            </button>
          </div>
          <p>{product.rentavailibility}</p>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={true} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default ProductDetails;
