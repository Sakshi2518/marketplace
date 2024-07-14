import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { CartContext } from "../Cart_page/CartProvider";

export default function Header(){
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
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
  
    

        {/* <div className="nav-search">
        <input type="text" id="searchbox" value="Search for an item"></input>
        <i className="fa fa-search"></i>
        </div> */}

        {/*<div className="nav-icons">*/}
            
      
  
        
       
       
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

            <div className="explore">
                <Link to="/login"><button className="auth-button">Login</button></Link>
            </div>

        </div>
        {/*</div>*/}       
      
      
    </nav>
  )
}
