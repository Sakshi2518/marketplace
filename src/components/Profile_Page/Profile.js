import React, { useState } from 'react'
import Shopheader from '../Shop_page/Shopheader.js'
import './Profile.css'
import Sidebar from './Sidebar.js'
import AccountSettings from './AccountSettings'
import YourOrders from './YourOrders.js'
import YourSale from './YourSale.js'
import SellProd from "./SellProd.js"

const Profile = () => {
    const [currentSection, setCurrentSection] = useState('Basic Info');
    console.log('currentSection:', currentSection); // Check what currentSection is set to

  return (
    <div className='profilepage'>
        <Shopheader/>
        {/*Profile*/}
        <div className='userprofile'>
            <div className='leftside'>
                <Sidebar setCurrentSection={setCurrentSection}/>                
            </div>
            <div className='rightside'>
            {currentSection === 'accountsettings' && <AccountSettings/>}
              {currentSection === 'sellprod' && <SellProd/>}
              {currentSection === 'yourorders' && <YourOrders/>}
              {currentSection === 'yoursale' && <YourSale/>}          
            </div>            
        </div>        
    </div>
  )
}

export default Profile