import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../Cart_page/CartProvider";
import { UserContext } from "../Profile_Page/UserContext";

export default function Header() {
  const { item } = useContext(CartContext);
  const { userId, setUserId } = useContext(UserContext); // Access and update userId
  const navigate = useNavigate();
  

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:4000/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setUserId(null); // Clear user context
        // navigate("/login"); // Redirect to login page
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <h3>MARKETPLACE</h3>
      </Link>

      <div className="navbar-heading">
        <div className="explore">
          <Link to="/products/get">
            <span>Shop</span>
          </Link>
        </div>
        <div className="about">
          <a href="#explore-section">
            <span>About</span>
          </a>
        </div>
        <div className="about">
          <a href="#team-section">
            <span>Team</span>
          </a>
        </div>
        <div className="contact">
          <a href="#contact-section">
            <span>Contact</span>
          </a>
        </div>
      </div>

      <div className="auth-button-container">
        {/* Render Logout Button if Logged In */}
        {userId ? (
          <button className="auth-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="auth-button">Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
}


