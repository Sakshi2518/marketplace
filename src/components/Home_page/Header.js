import React from "react"
import user from "../../images/user.svg"
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa"; // me


export default function Header(){
    return (
      <nav className="navbar">
        <a href="home-section">
          <h3>MARKETPLACE</h3>
        </a>

        <div className="navbar-heading">
          <div className="explore">
            <Link to="/shop">
              <span>Shop</span>
            </Link>
          </div>
          <div className="about">
            <a href="#about-section">
              <span>About</span>
            </a>
          </div>
          <div className="contact">
            <a href="#contact-section">
              <span>Contact</span>
            </a>
          </div>
        </div>

        {/* <div className="nav-search">
        <input type="text" id="searchbox" value="Search for an item"></input>
        <i className="fa fa-search"></i>
        </div> */}

        <div className="nav-icons">
          <Link to="./components/Shop_page/Cart" className="cart-link">
            <FaShoppingCart size={24} /> </Link> 
          {/* <i className="fa fa-shopping-cart fa-lg"></i> */}
          <img src={user} alt="user-logo" />
        </div>
      </nav>
    ); 
    
}
