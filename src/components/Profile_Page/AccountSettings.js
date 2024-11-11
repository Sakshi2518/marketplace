import React, {useState, useEffect} from 'react';
import './AccountSettings.css';
import { Icon } from '@iconify-icon/react';
import { useNavigate, Link } from 'react-router-dom';


const AccountSettings = () => {
  
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [DOB, setDOB] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [address, setAddress] = useState("");
  const [gradYear, setGradYear] = useState("");
  const navigate= useNavigate();
  const [userId, setUserId] = useState('');



  const fetchUserProfile = async () => {
    try {
      // Retrieve token from localStorage (or wherever you store it)
      const token = localStorage.getItem('token');
      console.log(token)
      
      if (!token) {
        throw new Error('Token not found, please log in again');
      }
      
      console.log('Request Headers:', {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      });
      
      const response = await fetch('http://localhost:4000/user/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  // Attach the token here
        },
        credentials: 'include', // This ensures cookies are sent as well (if any)
      });
      console.log(response.headers)

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
  
      const userData = await response.json();
      setName(userData.username);
      setEmail(userData.email);
      setPhoneNo(userData.phoneNo);
      setCollegeName(userData.collegeName);
      setGradYear(userData.gradYear);
      setAddress(userData.address);
      setDOB(userData.DOB);
      setUserId(userData._id);
      console.log('User data fetched successfully:', userData);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };
  

  useEffect(() => {
    fetchUserProfile();
  }, []);
  

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch('http://localhost:4000/signup', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({username, email, phoneNo, DOB, collegeName, gradYear, address }),
  //     });
  
  //     if (!response.ok) {
  //       const errorText = await response.text();
  //       throw new Error(errorText);
  //     }
  
  //     const result = await response.json();
  //     console.log(result.message);
  //     navigate('/profile');
  //   } catch (error) {
  //     console.error('Error:', error.message);
  //   }
  // };

  const handleEdit = (user) => {
    navigate(`/user/update/${userId}`, { state: { user } });
  };


  return (
    <div className='accountsettings'>
       <div className='mainhead1'>Personal Information</div>
       <button className="edit-btn-acct" type="button" onSubmit={handleEdit}>
       <Icon icon="tabler:edit" width="24" height="24"  style={{ color: '#ffffff' }} />
       <Link to={`/user/update/${userId}`}>
       <p className='edit-btn'> Edit Details</p> </Link>
        </button>
       

      <form className='form-settings'>
        <div className='form-table'>
          <div className='form-row'>
            <div className='form-field'>
              <label htmlFor='name' className='acct-label'>Your Name <span style={{color: '#b80f0f'}}>*</span></label>
              <input type='text' 
              name='name' 
              id='name' 
              className='acct-input'
              onChange={(e) => setName(e.target.value)}
              value={username}
              placeholder={username}
             />
            </div>
            <div className='form-field'>
              <label htmlFor='dob' className='acct-label'>Date of Birth</label>
              <input type='text' 
              name='dob' 
              id='dob' 
              className='acct-input' 
              onChange={(e) => setDOB(e.target.value)}
              value={DOB}/>
            </div>
          </div>

          <div className='form-row'>
            <div className='form-field'>
              <label htmlFor='uni' className='acct-label'>College Name</label>
              <input type='text' 
              name='uni' id='uni' 
              className='acct-input'
              onChange={(e) => setCollegeName(e.target.value)}
              value={collegeName}/>
            </div>

            <div className='form-field'>
              <label htmlFor='grad-year' className='acct-label'>Graduating Year </label>
              <input type='text' 
              name='grad-year' 
              id='grad-year' 
              className='acct-input'
              onChange={(e) => setGradYear(e.target.value)}
              value={gradYear}/>
            </div>
          </div>

          <div className='form-row'>
            <div className='form-field'>
              <label htmlFor='phone' className='acct-label'>Mobile No<span style={{color: '#b80f0f'}}>*</span></label>
              <input type='text' 
              name='phone' 
              id='phone' 
              className='acct-input'
              onChange={(e) => setPhoneNo(e.target.value)}
              value={phoneNo}/>
            </div>

            <div className='form-field'>
              <label htmlFor='email' className='acct-label'>Email <span style={{color: '#b80f0f'}}>*</span></label>
              <input type='email' 
              name='email' 
              id='email' 
              className='acct-input'
              onChange={(e) => setEmail(e.target.value)}
              value={email}/>
            </div>
          </div>

          <div className='form-row full-width'>
            <div className='form-field'>
              <label htmlFor='address' className='acct-label'>Address</label>
              <input type='text' 
              name='address' 
              id='address' 
              className='acct-input full-width'
              onChange={(e) => setAddress(e.target.value)}
              value={address}/>
            </div>
          </div>
        </div>
      </form>

    </div>
  );
}

export default AccountSettings;
