import React from "react";
import rent from "../../images/rent.jpg";
import myVideo from '../../images/hero2.mp4';
import { Icon } from '@iconify-icon/react';



export default function Hero2() {
  return (
    <main className="section-container" id="explore-section">
      <div className="explore-container">
        <video autoPlay loop muted className="stars-video">
          <source src={myVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="explore-content">        
        <div className="RPS">
          <div className="RPS-items">
            <img className="RPS-logos" src={rent} alt="rent-logo" />
            <h2 className="RPS-names">Buy</h2>
          </div>
          <div className="RPS-items">
            <img className="RPS-logos" src={rent} alt="rent-logo" />
            <h2 className="RPS-names">Rent</h2>
          </div>
          <div className="RPS-items">
            <img className="RPS-logos" src={rent} alt="rent-logo" />
            <h2 className="RPS-names">Sell</h2>
          </div>
        </div>
      </div>
      <div className="cat-heading">
      <span>Choose a category</span>
      </div>
      <div className="categories">
         <div className="--catitems">
         <Icon icon="raphael:books" className="--catlogos"/>
            <h2 className="--catnames">Books</h2>
          </div>
          <div className="--catitems">
          <Icon icon="game-icons:graduate-cap" className="--catlogos"/>
            <h2 className="--catnames">Courses</h2>
          </div>
          <div className="--catitems">
           <Icon icon="mdi:desk-lamp" className="--catlogos"/>
           <h2 className="--catnames">Electronics</h2>
           </div>
          
            <div className="--catitems">
            <Icon icon="la:chair" className="--catlogos"/>
            <h2 className="--catnames">Furniture</h2>
          </div>
          <div className="--catitems">
          <Icon icon="mingcute:electric-cooker-fill" className="--catlogos"/>
            <h2 className="--catnames">Utensils</h2>
          </div>
          <div className="--catitems">
          <Icon icon="fluent:task-list-square-person-20-filled" className="--catlogos"/>
            <h2 className="--catnames">Others</h2>
          </div>
          
      </div>
    </main>
  );
}
