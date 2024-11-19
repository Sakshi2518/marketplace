import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Cart_page/CartProvider";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import './Header.css'

export default function Header2() {
  const { item } = useContext(CartContext);
  const [userData, setUserData] = useState({ profImage: '', username: '' });

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:4000/user/profile", {
          withCredentials: true, // Ensure cookies are sent for authentication
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
      }
    };

    fetchUserProfile();
  }, []);

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
          <Link to="/#explore-section">
            <span>About</span>
          </Link>
        </div>
        <div className="about">
          <Link to="/#team-section">
            <span>Team</span>
          </Link>
        </div>
        <div className="contact">
          <Link to="/#contact-section">
            <span>Contact</span>
          </Link>
        </div>
      </div>

      <div className="nav-icons">
        <Link to="/shop/cart" className="cart-link">
          <FaShoppingCart size={24} />
          {item.length > 0 && <span className="cart-count">{item.length}</span>}
        </Link>

        {/* Profile Link */}
        <Link to="/user/profile" className="profile-link">
          {userData.profImage ? (
            <img
              src={userData.profImage}
              alt={userData.username}
              className="profile-img-nav"
            />
          ) : (
            <img
              src="https://via.placeholder.com/40"
              alt="default user"
              className="profile-img-nav"
            />
          )}
        </Link>
      </div>
    </nav>
  );
}
