import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Card.css';
import { CartContext } from '../Cart_page/CartProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Card = ({ item }) => {
  const { _id, imgUrl, prod_name, price, origPrice } = item;
  const { dispatch, item: cartItems } = useContext(CartContext);

  const [isExpanded, setIsExpanded] = useState(false); // State to manage "Read more" toggle
  const maxChars = 30; // Maximum characters to show before truncating

  const handleAddToCart = () => {
    const existingItem = cartItems.find((cartItem) => cartItem._id === item._id);
    if (existingItem) {
      toast.error(`Product ${prod_name} is already in the cart!`);
    } else {
      dispatch({ type: 'ADD_TO_CART', payload: item });
      toast.success(`Product ${prod_name} has been added to the cart!`);
    }
  };

  const existingItem = cartItems.find((cartItem) => cartItem._id === item._id);
  const options = { day: 'numeric', month: 'long' };

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 2);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedName =
    prod_name.length > maxChars && !isExpanded
      ? `${prod_name.substring(0, maxChars)}...`
      : prod_name;

  return (
    <div className="product-section">
      <Link to={`/products/${_id}`} className="product-link">
        <div className="prod-img">
          <img src={imgUrl} alt={prod_name} className="ev-img" />
        </div>
      </Link>
      <div className="prod-content">
        <h3 className={`prod-title ${isExpanded ? 'expanded' : ''}`}>
          {truncatedName}
          {prod_name.length > maxChars && (
            <span onClick={toggleReadMore} className="read-more-toggle">
              {isExpanded ? ' Read less' : ' ...Read more'}
            </span>
          )}
        </h3>
        <div className="prod-price">
          Rs.{price}.00
          <div className="orig-price">Rs.{origPrice}</div>
        </div>
        <div className="prod-delivery">
          <span className="prod-deliveryby">
            Delivery By{' '}
            <i className="delivery-date">
              {deliveryDate.toLocaleDateString('en-US', options)}
            </i>
          </span>
        </div>
        <button className="prod-btn-details" onClick={handleAddToCart}>
          {existingItem ? 'Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default Card;
