import React from "react"
import rocket from '../../images/rocket.mp4';

export default function Hero(){
    return(
        <div className="--landingpg">
            
            <div className="hero-container" id="home-section">
        <video autoPlay loop muted className="rocketvideo">
          <source src={rocket} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
         </div>
           <div className="landing-content">
           <h2>Where College Commerce Meets Convenience<br></br></h2>
            <h3>Welcome to IGDTUW MARKETPLACE- Your one stop destination to <b>Buy</b> , <b>Rent</b> , or <b>Sell </b>
             college essentials hassle free.</h3>
           </div>
            
        </div>
    )
}