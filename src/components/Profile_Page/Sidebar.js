import React, { useState , useRef ,useContext } from 'react';
import { UserContext } from './UserContext';
import { Link, useLocation } from 'react-router-dom';
import profilepic from '../../images/profilepic.png';

const Sidebar = ({ currentSection, setCurrentSection }) => {
  const location = useLocation();
  const { userId} = useContext(UserContext);
  const [profImg, setProfImg] = useState(null); // Local state for profile image
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef(null);

 

  const isActive = (path) => location.pathname.includes(path);

  const handleAddImage = () => {
    fileInputRef.current.click();
  };

  // Function to handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to handle removing the profile image
  const handleRemoveImage = () => {
    setProfImg(null);
  };

  return (
    <div className='usersidebar'>
      <div
        className="profile-pic-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          className="profpic"
          src={profImg || profilepic}
          alt="Profile Pic"
        />

        {isHovered && (
          <div className="profile-overlay">
            {profImg ? (
              <>
                <button className="overlay-btn" onClick={handleAddImage}>
                  Edit Image
                </button>
                <button className="overlay-btn" onClick={handleRemoveImage}>
                  Remove Image
                </button>
              </>
            ) : (
              <button className="overlay-btn" onClick={handleAddImage}>
                Add Image
              </button>
            )}
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageChange}
      />

      <Link to='/profile' className='stylenone' onClick={() => setCurrentSection('accountsettings')}>
        <div className={isActive('/profile') ? 's2' : 's1'}>
          <span>Account Settings</span>
        </div>
      </Link>

      <Link to={`/user/yourorders/${userId}`} className='stylenone' onClick={() => setCurrentSection('yourorders')}>
        <div className={isActive('/user/yourorders') ? 's2' : 's1'}>
          <span>Your Orders</span>
        </div>
      </Link>

      <Link to={`/user/youritems/${userId}`} className='stylenone' onClick={() => setCurrentSection('yoursale')}>
        <div className={isActive('/user/youritems') ? 's2' : 's1'}>
          <span>Your Items</span>
        </div>
      </Link>

      <Link to='/products/add' className='stylenone' onClick={() => setCurrentSection('sellprod')}>
        <div className={isActive('/products/add') ? 's2' : 's1'}>
          <span>Sell Products</span>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
