import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { Icon } from '@iconify-icon/react';
import './login.css'

const Register = () => {
    const [username, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const[phoneNo , setPhoneNo]= useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4000/signup', {username, email, password, phoneNo})
        .then(res => {
            navigate('/login')
        })
        .catch(err => console.log(err))
    }
  return (
    // <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
    //   <div className="bg-white p-3 rounded w-25">
    //     <h2>Register</h2>
    //     <form onSubmit={handleSubmit}>
    //     <div className="mb-3">
    //         <label htmlFor="email">
    //           <strong>Name</strong>
    //         </label>
    //         <input
    //           type="text"
    //           placeholder="Enter Name"
    //           autoComplete="off"
    //           name="email"
    //           className="form-control rounded-0"
    //           onChange={(e) => setName(e.target.value)}
    //         />
    //       </div>
    //       <div className="mb-3">
    //         <label htmlFor="email">
    //           <strong>Email</strong>
    //         </label>
    //         <input
    //           type="email"
    //           placeholder="Enter Email"
    //           autoComplete="off"
    //           name="email"
    //           className="form-control rounded-0"
    //           onChange={(e) => setEmail(e.target.value)}
    //         />
    //       </div>
    //       <div className="mb-3">
    //         <label htmlFor="email">
    //           <strong>Password</strong>
    //         </label>
    //         <input
    //           type="password"
    //           placeholder="Enter Password"
    //           name="password"
    //           className="form-control rounded-0"
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //       </div>
    //       <button type="submit" className="btn btn-success w-100 rounded-0">
    //         Register
    //       </button>
    //       </form>
    //       <p>Already Have an Account</p>
    //       <button className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
    //         Login
    //       </button>
        
    //   </div>
    // </div>
    <div>
   
    <div class="main-content-login">
        <div class="form-container-login">
            <h1>Welcome!</h1>
            <h3>Create a new account</h3>
            <form action="/login" className='form-login' onSubmit={handleSubmit}>
                <div class="form-group-login">
                    <Icon icon="mdi:user" width="24" height="24" className='user-icon'/>
                    {/* <label for="name" className='input-label'>Name:</label> */}
                    <input type="text"
                     id="name" 
                     name="username" 
                     placeholder="Enter your Name" 
                     required autocomplete="off" 
                     className='input-box-login'  
                     onChange={(e) => setName(e.target.value)}
                     autoComplete="off"
                     >
                     </input>
                </div>
                <div class="form-group-login">
                <Icon icon="mdi:email" width="24" height="24"  className='lock-icon' />
                    {/* <label for="name" className='input-label'>Name:</label> */}
                    <input type="text" 
                    id="email" 
                    name="email" 
                    placeholder="Enter your Email" 
                    required 
                    autocomplete="off" 
                    className='input-box-login'   
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                     ></input>
                </div>
                <div class="form-group-login">
                <Icon icon="mingcute:lock-fill" width="24" height="24" className='lock-icon'/>
                    {/* <label for="password" className='input-label'>Password:</label> */}
                    <input type="password" 
                    id="password" 
                    name="password" 
                    placeholder="Password" 
                    required 
                    autoComplete="off" 
                    className='input-box-login'
                    onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div class="form-group-login">
                <Icon icon="ic:round-phone" width="24" height="24"  className='lock-icon' />        
                    {/* <label for="password" className='input-label'>Password:</label> */}
                    <input type="tel" 
                    id="phone_no" 
                    name="phone_no" 
                    placeholder="Enter Mobile No." 
                    required 
                    autoComplete="off" 
                    className='input-box-login'
                    onChange={(e) => setPhoneNo(e.target.value)}></input>
                </div>
                <button type="submit" class="login-btn">SIGN UP</button>
            </form>
            <p className='login-end'>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    </div>


    </div>

  )
}

export default Register



