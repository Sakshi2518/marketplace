import React, { useContext } from "react";
import Cart_product from "./Cart_product";
import { CartContext } from "./CartProvider";
import "./Cart.css";
import Header from "../Home_page/Header.js";
import { Link } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";

const ContextCart = () => {
  const { item, totalAmount } = useContext(CartContext);

  return (
    <div className="cart">
      <Header />
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
                <p>Your cart is empty</p>
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
            {/* <div className="total-amount-box">
              <span>Total Amount: Rs.{totalAmount.toFixed(2)}</span>
            </div> */}
            <button className="checkout-button">Checkout</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContextCart;

