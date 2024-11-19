import React, { useState, useRef, useContext, useEffect } from 'react';
import { UserContext } from './UserContext';
import { Link, useLocation } from 'react-router-dom';
import { FaImage, FaEdit, FaTrash } from "react-icons/fa"; 
import profilepic from '../../images/profilepic.png';

const Sidebar = ({ currentSection, setCurrentSection }) => {
  const location = useLocation();
  const { userId } = useContext(UserContext);
  const [profImage, setProfImage] = useState(null); // Local state for profile image
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef(null);

  const isActive = (path) => location.pathname.includes(path);

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const fetchUserProfileImage = async () => {
    try {
      const response = await fetch("http://localhost:4000/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) throw new Error(await response.text());

      const imageData = await response.json();
      if (imageData.profImage) {
        setProfImage(imageData.profImage);
      }
    } catch (error) {
      console.error("Error fetching profile image:", error.message);
    }
  };

  useEffect(() => {
    fetchUserProfileImage();
  }, []);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfImage(URL.createObjectURL(file)); // Show preview

      try {
        const formData = new FormData();
        formData.append("profImage", file);

        const response = await fetch(`http://localhost:4000/user/profile/update-pic/${userId}`, {
          method: "PUT",
          body: formData,
        });

        const result = await response.json();

        if (response.ok) {
          console.log("Upload successful");
          setProfImage(result.profImage); // Update with server image URL
        } else {
          console.error("Failed to update profile picture:", result.message);
        }
      } catch (error) {
        console.error("Error updating profile picture:", error.message);
      }
    }
  };

  const handleRemoveImage = async () => {
    try {
      const response = await fetch(`http://localhost:4000/user/profile/remove-pic/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Profile picture removed successfully");
        setProfImage(null);
      } else {
        const result = await response.json();
        console.error("Failed to remove profile picture:", result.message);
      }
    } catch (error) {
      console.error("Error removing profile picture:", error.message);
    }
  };

  // Mouse hover effect
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div className="usersidebar">
      <div
        className="profile-pic-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          className="profpic"
          src={profImage ? profImage : profilepic}
          alt="Profile Pic"
        />

        {isHovered && (
          <div className="profile-overlay">
            {profImage ? (
              <>
                <button className="icon-btn" onClick={triggerFileInput}>
                  <FaEdit/>
                </button>
                <button className="icon-btn" onClick={handleRemoveImage}>
                  <FaTrash/>
                </button>
              </>
            ) : (
              <button className="add-btn" onClick={triggerFileInput}>
                <FaImage/>
              </button>
            )}
          </div>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageChange}
      />

      <Link to='/user/profile' className='stylenone' onClick={() => setCurrentSection('accountsettings')}>
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


