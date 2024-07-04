import React from "react";
import user from "../../images/user.svg"
import rentIcon from "../../images/rent_icon.png"
import buy from "../../images/buy.png"
import sell from "../../images/sell.png"
import dell from "../../images/delivery.png"


export default function Team(){
    return(
        <div id="about-section">
           <div className="about-us">
                <h2>What we offer</h2>
                <div className="about-content">
                <ul>
                  <li><img className="im2" src={sell}/>Buy second hand items from your peers at reasonable price</li>
                  <li><img className="im2" src={rentIcon}/>Rent items for a specific period of time as per your requirement</li>
                  <li><img className="im2" src={buy}/>Sell your old items that may come in use to other students</li>
                  <li><img className="im2" src={dell}/>Collect all the products in the college itself hence no delivery costs</li>
                </ul>
                </div>
            </div>
            <div className="member-heading">Our Team</div>
            <div className="members">        
              <div className="member-info">
                <img className="member-pic" src={user} alt="rent-logo" />
                <h2>Sakshi Singh</h2>
                <h3>ECE AI'26</h3>
              </div>
              <div className="member-info">
                <img className="member-pic" src={user} alt="rent-logo" />
                <h2>Srishneet Kaur</h2>
                <h3>ECE AI'26</h3>
              </div>
              <div className="member-info">
                <img className="member-pic" src={user} alt="rent-logo" />
                <h2>Anshika Aggarwal</h2>
                <h3>CSE'26</h3>
              </div>
              <div className="member-info">
                <img className="member-pic" src={user} alt="rent-logo" />
                <h2>Aayushi Sinha</h2>
                <h3>CSE'26</h3>
              </div>              
            </div>
           
        </div>
        
    )
}