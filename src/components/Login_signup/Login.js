import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Icon } from '@iconify-icon/react';
import './login.css'


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/login', { email, password }, { withCredentials: true });
      if (response.data.Login) {
        navigate('/dashboard');
      } else {
        alert(response.data.Message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    // <form onSubmit={handleLogin}>
    //   <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
    //   <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
    //   <button type="submit">Login</button>
    // </form>
    <div>
   
    <div class="main-content-login">
        <div class="form-container-login">
            <h1>Welcome Back!</h1>
            <h3>Login to your account</h3>
            <form className='form-login' onSubmit={handleLogin}>
                <div class="form-group-login">
                    <Icon icon="mdi:user" width="24" height="24" className='user-icon'/>
                    {/* <label for="email" className='input-label'>Email:</label> */}
                    <input  type="text" 
                            id="email" 
                            name="username" 
                            placeholder="Enter Email" 
                            value={email} 
                            className='input-box-login' 
                            onChange={(e) => setEmail(e.target.value)}
                            required></input>
                </div>
                <div class="form-group-login">
                <Icon icon="mingcute:lock-fill" width="24" height="24" className='lock-icon'/>
                    {/* <label for="password" className='input-label'>Password:</label> */}
                    <input  type="password" 
                            id="password"
                            name="password" 
                            placeholder="Enter password" 
                            required 
                            className='input-box-login' 
                            value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <button type="submit" className="login-btn">LOG IN</button>
            </form>
            <p className='login-end'>Don't have an account? <Link to="/signup" className='login-end-link'>Sign up</Link> </p>
        </div>
    </div>
    
    
    </div>
    


  );
};

export default Login;




