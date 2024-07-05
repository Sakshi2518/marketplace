import "./Cart.css";
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
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 2);
  const options = { day: "numeric", month: "long" };

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
      <td>
        {deliveryDate.toLocaleDateString("en-US", options)}
      </td>
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
