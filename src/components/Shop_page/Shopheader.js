import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Cart_page/CartProvider";
import { FaShoppingCart,  FaSearch, FaTimes } from "react-icons/fa";
import axios from "axios";
import "./Shopheader.css"

export default function Shopheader({
  query,
  handleInputChange,
  handleSearch, 
  handleClearSearch,
}) {
  const { item } = useContext(CartContext);
  const [userData, setUserData] = useState({ profImage: "", username: "" });

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
        <div className="navbar-sh">
          <div className="explore">
            <Link to="/">
              <span>Home</span>
            </Link>
          </div>
          <div className="explore">
            <Link to="/products/get">
              <span>Shop</span>
            </Link>
          </div>
        </div>
        <div className="searchForm">
          <form className="nav-search" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              id="searchbox"
              value={query}
              onChange={handleInputChange}
              placeholder="Search for an item"
            />
            {query && ( // Display the cross button only if there's text in the input
              <button
                type="button"
                className="clear-search"
                onClick={handleClearSearch}
              >
                <FaTimes />
              </button>
            )}
            <button
              type="submit"
              className="search-Button"
              onClick={handleSearch}
            >
              <FaSearch />
            </button>
          </form>
        </div>
      </div>

      <div className="nav-icons">
      <Link to="/shop/cart" className="cart-link">
          <FaShoppingCart size={24} />
          {item.length > 0 && <span className="cart-count">{item.length}</span>}
        </Link>
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



