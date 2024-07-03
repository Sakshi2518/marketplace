import React from "react";
import myVideo from '../../images/hero2.mp4';
import { Icon } from '@iconify-icon/react';
import buy from "../../images/buy.png"
import sell from "../../images/sell.png"
import dell from "../../images/delivery.png"



export default function Hero2() {
  return (
    <main className="section-container" id="explore-section">
      <div className="explore-container">
        <video autoPlay loop muted className="stars-video">
          <source src={myVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="about-us">
                <h2>What we offer</h2>
                <div className="about-content">
                <ul>
                  <li><img className="im2" src={sell}/>Buy second hand items from your peers at reasonable price</li>
                  <li><img className="im2" src={buy}/>Sell your old items that may come in use to other students</li>
                  <li><img className="im2" src={dell}/>Collect all the products in the college itself hence no delivery costs</li>
                </ul>
                </div>
            </div>
      <div className="cat-heading">
      <span>List of Categories</span>
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
