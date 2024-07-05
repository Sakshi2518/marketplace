import React from "react";
import user from "../../images/user.svg"



export default function Team(){
    return(
        <div id="team-section" className="team-content">
            <div className="team-top"></div>
            <div className="member-heading">Our Team</div>
            <div className="team-intro"> Meet our dedicated team of students who brought this website to life </div>
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