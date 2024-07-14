import React, { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import './Login.css'


function Login() {

    //const history=useNavigate();

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    /////////////
    const navigate=useNavigate()

    //async function submit(e){
    const submit=(e)=>{
        e.preventDefault();

        // try{

        //     await axios.post("http://localhost:4000/login",{
        //         email,password
        //     })
        //     .then(res=>{
        //         if(res.data==="exist"){
        //             navigate("/",{state:{id:email}})
        //         }
        //         else if(res.data==="notexist"){
        //             alert("User have not sign up")
        //         }
        //     })
        //     .catch(e=>{
        //         alert("wrong details")
        //         console.log(e);
        //     })

        // }
        // catch(e){
        //     console.log(e);

        // }

        axios.post('http://localhost:4000/login',{email,password})
        .then(result=>{
            console.log(result)
            if(result.data==="Success"){
                navigate('/')
            } 
            else if (result.data === "The password is incorrect") {
                alert("The password is incorrect");
            } 
            else if (result.data === "No record existed") {
                alert("Record does not exist. Please Register.");
            }       
        })
        .catch(err=>{
            alert("An error occurred while logging in. Please try again.");
            console.log(err);              
        })
    }

    ////////////


    return (
        <div className="login_page">
            <h1>Login</h1>
            <form onSubmit={submit} /*action="POST"*/>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email" 
                    required
                    className="fmail"
                />
                <input 
                    type="password" 
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
            <p style={{marginTop: '8px'}}>Don't have an account?</p>
            <br />
            <Link to="/register"><button className="sbut">Signup</button></Link>
        </div>
    );
}

export default Login