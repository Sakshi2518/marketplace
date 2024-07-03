import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Card.css';
import { CartContext } from '../Cart_page/CartProvider';
import { toast, ToastContainer } from 'react-toastify';

const Card = ({ item }) => {
  const { id, imgUrl, prod_name, price, delivery, origPrice } = item;
  const { dispatch, item: cartItems } = useContext(CartContext);

  const handleAddToCart = () => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      toast.error(`Product "${prod_name}" is already in the cart!`);
    } else {
      dispatch({ type: 'ADD_TO_CART', payload: item });
      toast.success(`Product "${prod_name}" has been added to the cart!`);
    }
  };

  const existingItem = cartItems.find(cartItem => cartItem.id === item.id);

  return (
    <div className="product-section">
      <Link to={`/product/${id}`} className="product-link">
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
      {/* <ToastContainer position="top-right" autoClose={3000} hideProgressBar={true} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover /> */}
    </div>
  );
};

export default Card;
