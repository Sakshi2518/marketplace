// src/shop_page/Products.js
import React from 'react';
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./Products.css"

const Products=(props) => {
  const { imgUrl, prod_name , price , delivery } = props.item;

  return (
    <main>
      
      <Col lg="4" md="4" sm="6" className="shop-container">
      <div className='product-section'>
      <div className="prod-img">
          <img src={imgUrl} alt="" className="ev-img" />
        </div>

        <div className="prod-content">
          <h3 className="prod-title">{prod_name}</h3>
          <h4 className="prod-price">
            Rs.{price}.00
          </h4>

          <div className="prod-delivery">
            <span className=" prod-deliveryby">
              Delivery By<i class="ri-car-line"></i> {delivery}
            </span>
          </div>

          

          <button className=" prod-btn-details">
            <Link to={`/cars/${prod_name}`}>See more</Link>
          </button>

          
        </div>

      </div>
      </Col>
    </main>
  );
}

export default Products;
