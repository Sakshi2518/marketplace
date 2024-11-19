import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cart_product from "./Cart_product";
import { CartContext } from "./CartProvider";
import "./Cart.css";
import Header2 from "../Home_page/Header2.js";
import { Link } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "./Modal";
import { OrderContext } from "../Profile_Page/OrderContext.js";
import {UserContext} from "../Profile_Page/UserContext.js";
import emptycart from '../../images/emptycart.png'

const ContextCart = () => {
  const { item, totalAmount, dispatch } = useContext(CartContext);
  const { setOrderDetails } = useContext(OrderContext); // Get setOrderDetails from OrderContext
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { userId } = useContext(UserContext);


  const handleCheckout = () => {
    if (item.length === 0) {
      toast.error("Your cart is empty!");
    } else {
      setShowModal(true);
    }
  };
  console.log("UserId:" , userId)
  const handleConfirm = async () => {
    setShowModal(false);
    if (!userId) {
      toast.error("User not logged in");
      return;
    }
  
    if (item.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
  
    const orderData = {
      buyerId: userId, 
      orderDate: Date.now(),
      items: item.map(currItem => ({
        product: currItem._id,
        isOrdered : true,
      })),
      totalAmount: totalAmount,
      sellerId: item[0]?.seller?.userId || null,
    };

    console.log("Order Data" , orderData);
  
    try {
      const response = await fetch("http://localhost:4000/orders/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
  
      const data = await response.json();
      if (response.ok) {
        toast.success("Order placed successfully!");
        dispatch({ type: "CLEAR_CART" });
        navigate(`/user/yourorders/${userId}`); 
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error placing order");
    }
  };
  

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="cart">
      <Header2 />
      <div className="cart-section">
        <div className="cont-shopping">
          <Link to="/products/get">
            <span>
              <MdArrowBackIosNew /> Continue Shopping
            </span>
          </Link>
        </div>
      </div>
      <section className="main-cart-sec">
        <div className="cart-and-summary">
          <div className="cart-table">
            <h1>Your Cart</h1>
            <div className="table-wrapper">
              {item.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th></th>
                      <th>Deliver By</th>
                      <th>Price</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.map((currItem) => (
                      <Cart_product key={currItem._id} {...currItem} />
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="empty-cart-div">
                  <p>Your cart is empty!
                  Visit our shop and fill it with your favorites.</p>
                  <img src={emptycart} className="empty-cart"/></div>
              )}
            </div>
          </div>

          <div className="order-summary">
            <h1>Order Summary</h1>
            <hr />
            <table>
              <tbody>
                <tr>
                  <td>Number of Products</td>
                  <td>{item.length}</td>
                </tr>
                <tr className="total-amount-box">
                  <td>Total Amount: </td>
                  <td>Rs.{totalAmount.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
            <button className="checkout-button" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      </section>
      <ConfirmationModal
        show={showModal} 
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <ToastContainer hideProgressBar={true}
      />
    </div>
  );
};

export default ContextCart;
