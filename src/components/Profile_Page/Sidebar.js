import React from 'react';
import './Sidebar.css';
import profilepic from "../../images/profilepic.png";
import { Link } from 'react-router-dom';

const Sidebar = ({ currentSection, setCurrentSection }) => {
  return (
    <div className='usersidebar'>
      <img className='profpic' src={profilepic} alt='Profile Pic' />
  

      <Link
        to='/profile'
        className='stylenone'
        onClick={() => setCurrentSection('accountsettings')}
      >
        <div>
        <div className={currentSection === null || currentSection === 'accountsettings' ? 's2' : 's1'}>
        {/* <div className={currentSection === null ? 's2' : 's1'}> */}
          <span>Account Settings</span></div>
        </div> 
      </Link>

      <Link
        to='/user/yourorders'
        className='stylenone'
        onClick={() => setCurrentSection('yourorders')}
      >
        <div className={currentSection === 'yourorders' ? 's2' : 's1'}>
          <span>Your Orders</span>
        </div>
      </Link>

      <Link
        to='/user/yoursale'
        className='stylenone'
        onClick={() => setCurrentSection('yoursale')}
      >
        <div className={currentSection === 'yoursale' ? 's2' : 's1'}>
          <span>Your Items</span>
        </div>
      </Link>

      <Link
        to='/products/add'
        className='stylenone'
        onClick={() => setCurrentSection('sellprod')}
      >
        <div className={currentSection === 'sellprod' ? 's2' : 's1'}>
          <span>Sell Products</span>
        </div>
      </Link>
    </div>
  );
}

export default Sidebar;
