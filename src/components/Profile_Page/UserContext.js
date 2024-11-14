import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(''); // Store only userId
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
      
      setUserId(userData._id);
      console.log('User data fetched successfully:', userData);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };
  

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <UserContext.Provider value={{ userId }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
