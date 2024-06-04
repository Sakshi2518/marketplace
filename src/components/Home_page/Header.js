import React from "react"
import user from "../../images/user.svg"


export default function Header(){
    return(
    <nav className="navbar">
        <a href="home-section"><h3>MARKETPLACE</h3></a>
    

    <div className="navbar-heading">
    <div className="explore">
        <a href="#explore-section"><span>Shop</span></a>
    </div>
    <div className="about">
        <a href="#about-section"><span>About</span></a>
    </div>
    <div className="contact">
        <a href="#contact-section"><span>Contact</span></a>
    </div>
    </div>
  
    

        {/* <div className="nav-search">
        <input type="text" id="searchbox" value="Search for an item"></input>
        <i className="fa fa-search"></i>
        </div> */}

        <div className="nav-icons">
        <i className="fa fa-shopping-cart fa-lg"></i>
        <img src={user} alt="user-logo" />
        </div>
        
        
    </nav>
            
          
    ) 
    
}
