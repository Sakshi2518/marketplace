import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './YourOrders.css';
import { useParams } from 'react-router-dom';
import emptyorder from '../../images/emptyorder.png'
import { Link } from 'react-router-dom';

const YourOrders = () => {
  const { _id } = useParams();  // Accessing _id from the route params
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch orders for the logged-in user
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/user/yourorders/${_id}`);
        console.log(response)
        setOrders(response.data);
      } catch (error) {
        // Ensure error.message is set properly
        setError(error.response ? error.response.data.message : 'An error occurred while fetching orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [_id]);

  return (
    <div className="orders-container">
      <h2 className='orders-page-heading'>Your Orders</h2>

      {loading && <p>Loading orders...</p>} {/* Loading state */}
      {error && <p className="error-message">{error}</p>} {/* Error handling */}

      {!loading && !error && orders.length === 0 && 
       <div className='empty-order-div'>
        <p> College essentials at your fingertips!</p>
          <p>Shop now for everything you need. </p>
        <img src={emptyorder} className='empty-order'/></div>}

      {!loading && !error && orders.length > 0 && (
        <table className="orders-table">
          <thead>
            <tr className='orders-page-tr'>
              <th className='orders-page-th'>Product Name</th>
              <th className='orders-page-th'>Price</th>
              <th className='orders-page-th'>Image</th>
              <th className='orders-page-th'>Delivery Date</th>
              <th className='orders-page-th'>Status</th>
              <th className='orders-page-th'>Contact Seller</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className='orders-page-tr'>
                <td className='orders-page-td'>
                <Link to={`/products/${order.productDetails?._id}`}>
                {order.productDetails?.prod_name}
                </Link></td>
                <td className='orders-page-td'>Rs.{order.productDetails?.price}</td>
                <td className='orders-page-td'>
                  <img 
                    src={order.productDetails?.imgUrl} 
                    alt={order.productDetails?.prod_name} 
                    width="80" 
                    height="80" 
                  />
                </td>
                <td className='orders-page-td'>{order.products.deliveryDate ? new Date(order.products.deliveryDate).toLocaleDateString() : 'Pending'}</td> {/* Handle dynamic delivery date */}
                <td className='orders-page-td'>{order.products.isDelivered ? "Delivered" : 'Pending'}</td> {/* Handle dynamic delivery date */}
                <td className='orders-page-th'>
                  <a href={`mailto:${order.sellerDetails?.email}`} className="contact-seller">
                  {order.sellerDetails?.email}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default YourOrders;
