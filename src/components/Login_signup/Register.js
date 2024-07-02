import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/register", {
        email,
        password,
      });

      if (response.data === "exist") {
        alert("User already exists");
      } else if (response.data === "notexist") {
        history.push("/home", { state: { id: email } });
      }
    } catch (error) {
      alert("Registration failed. Please check your details and try again.");
      console.error("Registration error:", error);
    }
  }

  return (
    <div className="login">
      <h1>Signup</h1>
      <form onSubmit={submit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Submit</button>
      </form>
      <br />
      <p>OR</p>
      <br />
      <Link to="/login">Login Page</Link>
    </div>
  );
}

export default Register;
