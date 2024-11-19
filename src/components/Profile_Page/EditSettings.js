import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify-icon/react';
import './EditSettings.css'

const EditSettings = ({  }) => {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [DOB, setDOB] = useState('');
  const [university, setUniversity] = useState('');
  const [address, setAddress] = useState('');
  const [gradYear, setGradYear] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const [userId, setUserId] = useState('');

const fetchUserProfile = async () => {
  try {
   
    const response = await fetch('http://localhost:4000/user/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const userData = await response.json();
    setName(userData.username);
    setEmail(userData.email);
    setPhoneNo(userData.phoneNo);
    setUniversity(userData.university);
    setGradYear(userData.gradYear);
    setAddress(userData.address);
    const formattedDOB = userData.DOB ? new Date(userData.DOB).toISOString().split('T')[0] : '';
    setDOB(formattedDOB);    
    // Add this line to set the User ID
    setUserId(userData._id);

  } catch (error) {
    console.error('Error fetching user data:', error.message);
  }
};

  useEffect(() => {
    fetchUserProfile();
  }, []);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!userId) {
      console.error("User ID is missing");
      return;
    }
  
    console.log("Updating User ID:", userId); // Debug line to confirm userId
  
    const userData = {
      username,
      email,
      phoneNo,
      DOB,
      university,
      address,
      gradYear,
    };
  
    try {
      const response = await fetch(`http://localhost:4000/user/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        const errorText = await response.json();
        throw new Error(errorText.message || "Error updating user");
      }
  
      const result = await response.json();
      console.log(result.message);
      navigate('/user/profile');
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };
  
  


  return (
    <div className='userE-background'>
      <div>
        <form onSubmit={handleSubmit} className='edit-form'>
          <div className='userE-heading'>
            <p>Edit Details</p>
          </div>
          <div className='userE-details'>
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
                onChange={(e) => setUniversity(e.target.value)}
                value={university}
                placeholder="Enter College Name"
                className='userE-input'

              />
            </div>

            <div className="userE-flex">
              <p>Graduating Year</p>
              <input
                type="number"
                onChange={(e) => setGradYear(e.target.value)}
                value={gradYear}
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
