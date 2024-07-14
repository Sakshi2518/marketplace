import React, { useState } from "react";
import axios from "axios";

import { useNavigate, Link } from "react-router-dom";
import './Register.css'

function Register() {
  //const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //////////
  const navigate=useNavigate()

  // async function submit(e) {
  //   e.preventDefault();

  //   // try {
  //   //   const response = await axios.post("http://localhost:4000/register", {
  //   //     email,
  //   //     password,
  //   //   });

  //   //   if (response.data === "exist") {
  //   //     alert("User already exists");
  //   //   } else if (response.data === "notexist") {
  //   //     history.push("/home", { state: { id: email } });
  //   //   }
  //   // } catch (error) {
  //   //   alert("Registration failed. Please check your details and try again.");
  //   //   console.error("Registration error:", error);
  //   // }


  // }



  const submit=(e)=>{
    e.preventDefault()
    axios.post('http://localhost:4000/register',{email,password})
      .then(result=>{console.log(result)
        navigate('/login')
      })
      .catch(err=>console.log(err))
    //)
  }

  
  
  
  {/*



const Signup = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/signup", {
        username,
        email,
        password,
      });
      const token = response.data.token;
      console.log(token);
      localStorage.setItem("token", token); // Store token in localStorage
      setToken(token); // Set token in the application's state
      setError("");
    } catch (err) {
      setError("Error creating account");
      console.error(err);
    }
  };
  
  */}


  ////////////
  return (

    <div className="register_page">
      <h1>Signup</h1>
      <form onSubmit={submit}>

    {/*
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        */}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}

          placeholder="Email"
          required
          className="fmail"

        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}

          placeholder="Password"
          required
          className="fpass"
        />
        <button className="sbut" type="submit">Submit</button>
      </form>
      <br />
      <p>OR</p>
      <p style={{marginTop: '8px'}}>Already have an account?</p>
      <br />
      <Link to="/register"><button className="sbut">Login</button></Link>

        {/*{error && <p>{error}</p>}*/}

    </div>
  );
};

export default Signup;
