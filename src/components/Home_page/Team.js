import React from "react";
import user from "../../images/user.svg"


export default function Team(){
    return(
        <div id="about-section">
           <div className="about-us">
                <h2>What we offer</h2>
                <div className="about-content">
                <ul>
                  <li>Buy second hand items from your peers at reasonable price</li>
                  <li>Rent items for a specific period of time as per your requirement</li>
                  <li>Sell your old items that may come in use to other students</li>
                  <li>Collect all the products in the college itself hence no delivery costs</li>
                </ul>
                </div>
            </div>
            <div className="member-heading">Our Team</div>
            <div className="members">        
              <div className="member-info">
              <img className="member-pic" src={user} alt="rent-logo" />
            <h2>Student Name</h2>
            <h3>Branch</h3>
            <h3>Year</h3>
              </div>
              <div className="member-info">
              <img className="member-pic" src={user} alt="rent-logo" />
            <h2>Student Name</h2>
            <h3>Branch</h3>
            <h3>Year</h3>
              </div>
              
            </div>
           
        </div>
        
    )
}