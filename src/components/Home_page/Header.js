import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { CartContext } from "../Cart_page/CartProvider";

export default function Header(){

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
        <a href="#explore-section"><span>About</span></a>
    </div>
    <div className="about">
        <a href="#team-section"><span>Team</span></a>
    </div>
    <div className="contact">
        <a href="#contact-section"><span>Contact</span></a>
    </div>
    </div>
  
    

   
            
      
        
       
       
       
      <div className="auth-button-container">

            {/*{isAuthenticated ? (
                <button className="auth-button" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                    Logout
                </button>
            ) : (
                <button className="auth-button" onClick={() => loginWithRedirect()}>
                    Login
                </button>
            )}*/}

{/* <div className="explore">
                <Link to="/login"><button className="auth-button">Login</button></Link>
            </div>*/}


       <Link to='/login'>
       <button className="auth-button">
        Login
       </button></Link>

        </div>
        {/*</div>*/}       
      
      
    </nav>
  )
}
