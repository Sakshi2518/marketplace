import React from 'react';
import './Sidebar.css';
import profilepic from "../../images/profilepic.png";
import { Link } from 'react-router-dom';

export const Sidebar = ({ currentSection, setCurrentSection }) => {
  return (
    <div className='usersidebar'>
      <img className='profpic' src={profilepic} alt='Profile Pic' />

      <Link
        to='/user/accountsettings'
        className='stylenone'
        onClick={() => setCurrentSection('accountsettings')}
      >
        <div className={currentSection === 'accountsettings' ? 's2' : 's1'}>
          <span>Account Settings</span>
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
        to='/user/changepassword'
        className='stylenone'
        onClick={() => setCurrentSection('changepassword')}
      >
        <div className={currentSection === 'changepassword' ? 's2' : 's1'}>
          <span>Change Password</span>
        </div>
      </Link>
    </div>
  );
}

export default Sidebar;
