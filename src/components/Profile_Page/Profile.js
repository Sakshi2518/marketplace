import React, { useState, useEffect } from 'react';
import Header2 from '../Home_page/Header2.js';
import './Profile.css';
import Sidebar from './Sidebar.js';
import AccountSettings from './AccountSettings.js';
import YourOrders from './YourOrders.js';
import YourSale from './YourSale.js';
import SellProd from "./SellProd.js";
import { useLocation, useParams } from "react-router-dom";

const Profile = () => {
    let { section } = useParams();

    const [currentSection, setCurrentSection] = useState(section || 'Basic Info');
    const location = useLocation();

    useEffect(() => {
        if (section) {
            setCurrentSection(section);
        } else if (location.state && location.state.currentSection) {
            setCurrentSection(location.state.currentSection);
        }
    }, [location.state, section]);

    return (
        <div className='profilepage'>
            <Header2 />
            {/* Profile */}
            <div className='userprofile'>
                <div className='leftside'>
                    <Sidebar setCurrentSection={setCurrentSection} currentSection={currentSection}/>                
                </div>
                <div className='rightside'>
                    {currentSection === 'accountsettings' && <AccountSettings />}
                    {currentSection === 'sellprod' && <SellProd />}
                    {currentSection === 'yourorders' && <YourOrders />}
                    {currentSection === 'yoursale' && <YourSale />}          
                </div>            
            </div>        
        </div>
    );
};

export default Profile;
