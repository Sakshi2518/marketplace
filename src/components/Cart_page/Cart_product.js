// import React from 'react'
// import { Link } from 'react-router-dom'

// const Cart_product = ({prod_name , imgUrl , price , rentavailibility, delivery, id }) => {
//   return (
//     <>
//         <div className='product-img'>
//                     <img src={imgUrl} alt='no img'></img>
//                 </div>
//                 <div className='cart-prod-title'>
//                     <h2>{prod_name}</h2>
//                     <p>Delivery by {delivery}</p>
//                 </div>
//                 <div className='rent-availibility'>
//                     <button> {rentavailibility}</button>
//                 </div>
//                 <div className='cart-price'>
//                      rs {price}
//                 </div>
//                 <div className='cart-remove'>
//                     remove icon
//                 </div>
//                 <Link to={`/product/${id}`} className="product-link">
//               <div className="view-prod"> View Product
//                </div>
//       </Link>
//     </>
//   )
// }

// export default Cart_product

// import React from "react";
// import { Link } from "react-router-dom";

// const CartProduct = ({
//   prod_name,
//   imgUrl,
//   price,
//   rentavailibility,
//   delivery,
//   id,
//   onRemove,
// }) => {
//   const handleRemove = () => {
//     onRemove(id); // Call the onRemove function with the product id
//   };

//   return (
//     <tr>
//       <td className="product-img">
//         <img
//           src={imgUrl}
//           alt="Product Image"
//           style={{ width: "50px", height: "50px" }}
//         />
//       </td>
//       <td className="cart-prod-title">
//         <h2>{prod_name}</h2>
//         <p>Delivery by {delivery}</p>
//       </td>
//       <td className="rent-availibility">
//         <button>{rentavailibility}</button>
//       </td>
//       <td className="cart-remove">
//         <button onClick={handleRemove}>Remove</button>
//       </td>
//       <td className="cart-price">Rs {price}</td>
//       <td>
//         <Link to={`/product/${id}`} className="product-link">
//           View Product
//         </Link>
//       </td>
//     </tr>
//   );
// };

// export default CartProduct;

import React from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { CartContext } from "../Cart_page/CartProvider";
import { useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart_Product = ({ prod_name, imgUrl, price, delivery, _id }) => {
  const { dispatch, item: cartItems } = useContext(CartContext); // Assuming CartContext provides dispatch and cartItems
  const product = cartItems.find((p) => p._id === parseInt(_id));

  const handleRemove = () => {
    dispatch({ type: "REMOVE_FROM_CART", payload: _id });
    toast.success(`Product "${prod_name}" has been removed!`);
  };
  return (
    <tr>
      <td className="product-img">
        <Link to={`/product/${_id}`} className="product-link">
          <img
            src={imgUrl}
            alt="Product Image"
            style={{ width: "50px", height: "50px" }}
          />{" "}
        </Link>
      </td>
      <td className="cart-prod-title">
        <Link to={`/product/${_id}`} className="product-link">
          <span>{prod_name}</span>
        </Link>
      </td>
      <td>{delivery}</td>
      <td className="cart-price">Rs {price}</td>
      <td className="cart-remove">
        <div>
          <FaTrash onClick={handleRemove} />
        </div>
      </td>
    </tr>
  );
};

export default Cart_Product;
