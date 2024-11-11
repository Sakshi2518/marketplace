import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Cart_page/CartProvider";
import { FaShoppingCart } from "react-icons/fa"; 


export default function Header2(){
  
  const { item } = useContext(CartContext);

    return(

     <nav className="navbar">
      <Link to="/">
        <h3>MARKETPLACE</h3>
      </Link>

    <div className="navbar-heading">
    <div className="explore">
     <Link to="/products/get"><span>Shop</span></Link>
    </div>
    <div className="about">
        <Link to="/#explore-section"><span>About</span></Link>
    </div>
    <div className="about">
        <Link to="/#team-section"><span>Team</span></Link>
    </div>
    <div className="contact">
        <Link to="/#contact-section"><span>Contact</span></Link>
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
