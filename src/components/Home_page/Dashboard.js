import React, { useEffect , useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header2 from './Header2';
import { UserContext } from '../Profile_Page/UserContext';

const Dashboard = () => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f0f0f0",
      position: "relative",
    },
    welcomeText: {
      fontSize: "48px",
      fontWeight: "bold",
      animation: "fadeIn 2s ease-in-out",
    },
    shopText: {
      fontSize: "24px",
      fontWeight: "normal",
      marginTop: "20px",
      animation: "slideIn 1s ease-in-out",
    },
    button: {
      marginTop: "30px",
      padding: "10px 20px",
      fontSize: "16px",
      fontWeight: "bold",
      backgroundColor: "#1d1d2b",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    sticker: {
      width: "60px",
      height: "60px",
      position: "absolute",
      borderRadius: "50%",

    },
    sticker1: {
      top: "10%",
      left: "30%",
    },
    sticker2: {
      top: "40%",
      right: "10%",
    },
    sticker3: {
      bottom: "30%",
      left: "10%",
    },
    sticker4: {
      bottom: "10%",
      right: "30%",
    },
  };


  const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { userId} = useContext(UserContext);
    const [username, setName] = useState("");
   
    
  
  
  
    const fetchUserProfile = async () => {
      try {
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
        console.log('User data fetched successfully:', userData);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };
    
  
    useEffect(() => {
      fetchUserProfile();
    }, []);
    


  return (
    <div style={styles.container}>
      <h1 style={styles.welcomeText}>Hello {username}!</h1>
      <p style={styles.shopText}>Today is a good day to shop</p>
        <Link to='/products/get'>
          <button style={styles.button}>See Products</button>
         </Link>


      <img
        src="https://i.etsystatic.com/15626339/r/il/b2b04c/3920480981/il_570xN.3920480981_d3kc.jpg"
        alt="Sticker"
        style={{ ...styles.sticker, ...styles.sticker1 }}
      />
      <img
        src="https://i.etsystatic.com/15626339/r/il/b2b04c/3920480981/il_570xN.3920480981_d3kc.jpg"
        alt="Sticker"
        style={{ ...styles.sticker, ...styles.sticker2 }}
      />
      <img
        src="https://i.etsystatic.com/15626339/r/il/b2b04c/3920480981/il_570xN.3920480981_d3kc.jpg"
        alt="Sticker"
        style={{ ...styles.sticker, ...styles.sticker3 }}
      />
      <img
        src="https://i.etsystatic.com/15626339/r/il/b2b04c/3920480981/il_570xN.3920480981_d3kc.jpg"
        alt="Sticker"
        style={{ ...styles.sticker, ...styles.sticker4 }}
      />

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideIn {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;

