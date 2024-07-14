import Header from "./components/Home_page/Header";
import Hero from "./components/Home_page/Hero";
import Hero2 from "./components/Home_page/Hero2";
import Team from "./components/Home_page/Team";
import Footer from "./components/Home_page/Footer";
import "./App.css"; // Import the CSS file
import "./components/Home_page/Header.css";
import "./components/Home_page/Hero.css";
import "./components/Home_page/Footer.css";
import "./components/Home_page/Hero2.css";
import "./components/Home_page/Team.css";
import React, { useState } from "react";
import Signup from "./components/Login_signup/Register";
import Login from "./components/Login_signup/Login";

export default function Homepage() {
  const [token, setToken] = useState("");
  return (
    <div>
    
      <Header />
      <section>
        <Hero />
      </section>
      <section>
        <Hero2 />
      </section>
      <section>
        <Team />
      </section>
      <section>
    
        <Footer />
      </section>

    </div>
  );
}
