import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify-icon/react';
import './EditSettings.css'

const EditSettings = ({  }) => {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [DOB, setDOB] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [address, setAddress] = useState('');
  const [gradYear, setGradYear] = useState('');
  const [profImg, setProfImg] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state || { user: {}};

  const [userId, setUserId] = useState('');

const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found, please log in again');
    }

    const response = await fetch('http://localhost:4000/user/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const userData = await response.json();
    setProfImg(userData.profImg);
    setName(userData.username);
    setEmail(userData.email);
    setPhoneNo(userData.phoneNo);
    setCollegeName(userData.collegeName);
    setGradYear(userData.gradYear);
    setAddress(userData.address);
    setDOB(userData.DOB);
    
    // Add this line to set the User ID
    setUserId(userData._id);

  } catch (error) {
    console.error('Error fetching user data:', error.message);
  }
};

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setProfImg(URL.createObjectURL(file)); // Preview image
    }
  };

  const removeMainImage = () => {
    setProfImg('');
    setImageFile(null);
  };

  // Handle form submission to update user data
  const handleSubmit = async (e) => {
  e.preventDefault();

  // Use the fetched userId instead of user._id
  if (!userId) {
    console.error("User ID is missing");
    return;
  }

  try {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('phoneNo', phoneNo);
    formData.append('DOB', DOB);
    formData.append('collegeName', collegeName);
    formData.append('address', address);
    formData.append('gradYear', gradYear);

    if (imageFile) {
      formData.append('profImage', imageFile);
    }

    const response = await fetch(`http://localhost:4000/user/update/${userId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const result = await response.json();
    console.log(result.message);
    navigate('/profile'); // Redirect to profile page after successful update
  } catch (error) {
    console.error('Error updating user:', error.message);
  }
};


  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} className='edit-form'>
          <div className='userE-heading'>
            <p>Edit Details</p>
          </div>
          <div className='userE-details'>
            <div className='userE-flex-pfp'>
              <p>Profile Picture</p>
              <input
                type='file'
                onChange={handleImageChange}
                className='userE-prod-ip'
                accept='image/jpeg, image/png, image/jpg'
              />
              <Icon icon='mdi:camera' width='24' height='24' style={{ color: '#dfe9f5a1' }} />
              <div className='main-image-container'>
                {profImg && (
                  <div className='main-img'>
                    <img src={profImg} alt='Profile' id='profile-pic' />
                    <button type='button' className='sellprod-btn' onClick={removeMainImage}>
                      <Icon icon='charm:cross' width='20' height='20' style={{ color: '#b80f0f' }} />
                    </button>
                  </div>
                )}
              </div>
            </div>



          <div className="userE-flex">
              <p>Full Name</p>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={username}
                placeholder="Enter Your Name"
                required
                className='userE-input'
              />
            </div>

            <div className="userE-flex">
              <p>DOB</p>
              <input
                type="date"
                onChange={(e) => setDOB(e.target.value)}
                value={DOB}
                placeholder="Enter Your DOB"
                className='userE-input'

              />
            </div>

            <div className="userE-flex">
              <p>College Name</p>
              <input
                type="text"
                onChange={(e) => setCollegeName(e.target.value)}
                value={collegeName}
                placeholder="Enter College Name"
                className='userE-input'

              />
            </div>

            <div className="userE-flex">
              <p>Graduating Year</p>
              <input
                type="number"
                onChange={(e) => setGradYear(e.target.value)}
                value={DOB}
                min="2020"
                max="2040"
                placeholder="Enter Graduation Year"
                className='userE-input'

              />
            </div>

            <div className="userE-flex">
              <p>Mobile Number</p>
              <input
                type="tel"
                onChange={(e) => setPhoneNo(e.target.value)}
                value={phoneNo}
                required
                placeholder="Enter Phone Number"
                className='userE-input'

              />
            </div>

            <div className="userE-flex">
              <p>Email</p>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                placeholder="Enter Your Email"
                className='userE-input'

              />
            </div>

            <div className="userE-flex">
              <p>Address</p>
              <input
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                placeholder="Enter Your Address"
                required
                className='userE-input'

              />
            </div>

            
          </div>
          <button type="submit" className='userE-btn'>SAVE CHANGES</button>
        </form>
      </div>
    </div>
  );
};

export default EditSettings;
