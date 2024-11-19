import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";
import Header2 from "../Home_page/Header2";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../Cart_page/CartProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const { _id } = useParams(); // useParams to access the _id parameter
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [mainImage, setMainImage] = useState("");
  const [clickedImage, setClickedImage] = useState("");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { dispatch, item: cartItems } = useContext(CartContext);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/products/${_id}`
        );
        console.log(data); // Log the response for debugging
        setProduct(data);
        setMainImage(data.imgUrl); // Set the main image once the product is fetched
        setClickedImage(data.imgUrl); // Set clicked image as well
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [_id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }
  
  const isInCart = cartItems.some((item) => item._id === product._id);

  const handleAddToCart = () => {
    if (isInCart) {
      toast.error(`Product "${product.prod_name}" is already in the cart!`);
    } else {
      dispatch({ type: "ADD_TO_CART", payload: product });
      toast.success(
        `Product "${product.prod_name}" has been added to the cart!`
      );
    }
  };

  const handleImageClick = (imgUrl) => {
    
      setMainImage(imgUrl);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const truncatedDescription = product.description.substring(0, 70) + "...";

  const sellerName = product.seller?.userId?.username || "Unknown";
  const sellerEmail = product.seller?.userId?.email || "Not provided";
  return (
    <div>
      <Header2 />
      <div className="single-product">
        <div className="prod-images">
          <div className="main-image">
            <img src={mainImage} alt={product.prod_name} />
          </div>

          <div className="alt-images">
            {[product.imgUrl, ...product.altImages].map((imgUrl, index) => (
              <img
                key={index}
                src={imgUrl}
                alt={`${product.prod_name} ${index + 1}`}
                onClick={() => handleImageClick(imgUrl)} // Update the main image
                className={mainImage === imgUrl ? "clicked" : ""}
              />
            ))}
          </div>
        </div>

        <div className="prod-description">
          <h1 className="product-name">{product.prod_name}</h1>
          <p>
            <strong>Seller:</strong> {sellerName}
          </p>
          <p>
            <strong>Contact Seller at:</strong> {sellerEmail}
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default ProductDetails; 