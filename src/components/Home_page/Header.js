import React from "react"
import user from "../../images/user.svg"
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function Header(){
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
    return(

    <nav className="navbar">
        <a href="home-section"><h3>MARKETPLACE</h3></a>
    

    <div className="navbar-heading">
    <div className="explore">
     <Link to="/shop"><span>Shop</span></Link>
    </div>
    <div className="about">
        <a href="#about-section"><span>About</span></a>
    </div>
    <div className="contact">
        <a href="#contact-section"><span>Contact</span></a>
    </div>
    </div>
  
    <div className="nav-icons">
        <i className="fa fa-shopping-cart fa-lg"></i>
        
       
       
  <div className="auth-button-container">
            {isAuthenticated ? (
                <button className="auth-button" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                    Logout
                </button>
            ) : (
                <button className="auth-button" onClick={() => loginWithRedirect()}>
                    Login
                </button>
            )}
        </div>
        </div>
        
    </nav>
            
          
    ) 
    
}
