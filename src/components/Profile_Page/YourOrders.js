import React from "react";
import "./YourOrders.css";
import { useLocation } from "react-router-dom";

const YourOrders = () => {
  const location = useLocation();
  const { items, userId, userEmail, checkoutTime } = location.state;
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 2);
  const options = { day: "numeric", month: "long" };

  return (
    <div className="orders-page">
      <h1>Order Details</h1>
      <p>User ID: {userId}</p>
      <p>User Email: {userEmail}</p>
      <p>Checkout Time: {new Date(checkoutTime).toLocaleString()}</p>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Price</th>
            <th>Delivery</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>
                <img
                  src={item.imgUrl}
                  alt="Product"
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td>{item.prod_name}</td>
              <td>Rs.{item.price.toFixed(2)}</td>
              <td>{deliveryDate.toLocaleDateString("en-US", options)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default YourOrders;
