import React, { useContext } from "react";
import user from "../../images/user.svg";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../Cart_page/CartProvider";

export default function Header() {
  const { item } = useContext(CartContext);


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

      <div className="nav-icons">
        <Link to="/shop/cart" className="cart-link">
          <FaShoppingCart size={24} />
          {item.length > 0 && <span className="cart-count">{item.length}</span>}
        </Link>
        <img src={user} alt="user-logo" />
      </div>
    </nav>
  );
}
