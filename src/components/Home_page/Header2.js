import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Cart_page/CartProvider";
import { FaShoppingCart } from "react-icons/fa"; 


export default function Header2(){
  
  const { item } = useContext(CartContext);

    return(

     <nav className="navbar">
      <a href="home-section">
        <h3>MARKETPLACE</h3>
      </a>

    <div className="navbar-heading">
    <div className="explore">
     <Link to="/products/get"><span>Shop</span></Link>
    </div>
    <div className="about">
        <a href="#explore-section"><span>About</span></a>
    </div>
    <div className="about">
        <a href="#team-section"><span>Team</span></a>
    </div>
    <div className="contact">
        <a href="#contact-section"><span>Contact</span></a>
    </div>
    </div>
  
    

    <div className="nav-icons">
        <Link to="/shop/cart" className="cart-link">
          <FaShoppingCart size={24} />
          {item.length > 0 && <span className="cart-count">{item.length}</span>}
        </Link>
        <Link to="/profile">
          <span>
            <img src="" alt="user" />
          </span>
        </Link>
      </div>
            
      

        
       
       
      
      
      
    </nav>
  )
}
