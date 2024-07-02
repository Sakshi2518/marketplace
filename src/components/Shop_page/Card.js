import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Card.css';
import { CartContext } from '../Cart_page/CartProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Card = ({ item }) => {
  const { _id, imgUrl, prod_name, price, delivery, origPrice } = item; // Adjusted to use _id
  const { dispatch, item: cartItems } = useContext(CartContext);

  const handleAddToCart = () => {
    const existingItem = cartItems.find(cartItem => cartItem._id === item._id); // Adjusted to use _id
    if (existingItem) {
      toast.error(`Product "${prod_name}" is already in the cart!`);
    } else {
      dispatch({ type: 'ADD_TO_CART', payload: item });
      toast.success(`Product "${prod_name}" has been added to the cart!`);
    }
  };

  const existingItem = cartItems.find(cartItem => cartItem._id === item._id); // Adjusted to use _id

  return (
    <div className="product-section">
      <Link to={`/product/${_id}`} className="product-link"> {/* Adjusted to use _id */}
        <div className="prod-img">
          <img src={imgUrl} alt={prod_name} className="ev-img" />
        </div>
      </Link>
      <div className="prod-content">
        <h3 className="prod-title">{prod_name}</h3>
        <div className="prod-price">
          Rs.{price}.00<div className='orig-price'>Rs.{origPrice}</div>
        </div>
        <div className="prod-delivery">
          <span className="prod-deliveryby">
            Delivery By <i className="delivery-date"></i> {delivery}
          </span>
        </div>
        <button className="prod-btn-details" onClick={handleAddToCart}>
          {existingItem ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default Card;
