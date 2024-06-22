import React from 'react';
import { Link } from 'react-router-dom';
import "./Card.css";

const Card = ({ item }) => {
  const { id, imgUrl, prod_name, price, delivery, origPrice } = item;

  return (
    <Link to={`/product/${id}`} className="product-link">
      <div className="product-section">
        <div className="prod-img">
          <img src={imgUrl} alt={prod_name} className="ev-img" />
        </div>

        <div className="prod-content">
          
          <h3 className="prod-title">{prod_name}</h3>
          <div className="prod-price">Rs.{price}.00<div className='orig-price'>Rs.{origPrice}</div></div>

          <div className="prod-delivery">
            <span className="prod-deliveryby">
              Delivery By <i className="delivery-date"></i> {delivery}
            </span>
          </div>

          <button className="prod-btn-details">
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Card;
