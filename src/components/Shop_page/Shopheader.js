// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { CartContext } from "../Cart_page/CartProvider";
// import { FaShoppingCart } from "react-icons/fa";


// export default function Shopheader(){
 
//   const { item } = useContext(CartContext);

//     return(

//      <nav className="navbar">
//       <a href="home-section">
//         <h3>MARKETPLACE</h3>
//       </a>

//     <div className="navbar-heading">
//     <div className="explore">
//      <Link to="/products/get"><span>Shop</span></Link>
//     </div>
    
//     </div>
  
    

//         {/* <div className="nav-search">
//         <input type="text" id="searchbox" value="Search for an item"></input>
//         <i className="fa fa-search"></i>
//         </div> */}

//         {/*<div className="nav-icons">*/}
            
//       <div className="nav-icons">
//       <Link to="/shop/cart" className="cart-link">
//       <FaShoppingCart size={24} />

//           {item.length > 0 && <span className="cart-count">{item.length}</span>}
//         </Link>
//       <Link to="/profile"><span><img src="" alt="user" /></span></Link>
       
//       </div>
        
      
      
//     </nav>
//   );
// }
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Cart_page/CartProvider";
import { FaShoppingCart, FaSearch, FaTimes } from "react-icons/fa"; // Import FaTimes for the cross button
import "./Shopheader.css"; // Import the CSS file

export default function Shopheader({
  query,
  handleInputChange,
  handleSearch,
  handleClearSearch,
}) {
  const { item } = useContext(CartContext);

  return (
    <nav className="navbar">
      <a href="home-section">
        <h3>MARKETPLACE</h3>
      </a>

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
        <Link to="/profile">
          <span>
            <img src="" alt="user" />
          </span>
        </Link>
      </div>
    </nav>
  );
}


