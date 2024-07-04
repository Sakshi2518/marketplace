import React, { useState } from 'react'
import Header from '../Home_page/Header';
import './Profile.css'
import Sidebar from './Sidebar.js'
import AccountSettings from './AccountSettings'
import YourOrders from './YourOrders.js'
import YourSale from './YourSale.js'
import ChangePassword from './ChangePassword.js'

const Profile = () => {
    const [currentSection, setCurrentSection] = useState('Basic Info');
  return (
    <div className='profilepage'>
        <Header/>
        {/*Profile*/}
        <div className='userprofile'>
            <div className='leftside'>
                <Sidebar setCurrentSection={setCurrentSection}/>                
            </div>
            <div className='rightside'>
            {currentSection === 'accountsettings' && <AccountSettings/>}
              {currentSection === 'changepassword' && <ChangePassword/>}
              {currentSection === 'yourorders' && <YourOrders/>}
              {currentSection === 'yoursale' && <YourSale/>}          
            </div>            
        </div>        
    </div>
  )
}

export default Profile