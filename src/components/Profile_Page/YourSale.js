import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './YourSale.css'
import './YourOrders.css'
import OrderStatus from './OrderStatus';
import { Icon } from '@iconify-icon/react';
import emptyitems from '../../images/emptyitem.png'

const YourSale = () => {
  const { _id } = useParams();  // Accessing _id from the route params
  
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newDeliveryDate, setNewDeliveryDate] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Using the _id parameter in the request
        const { data } = await axios.get(`http://localhost:4000/user/youritems/${_id}`);
        console.log(data);
        setProducts(data.products);
        setOrders(data.orders);
      } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
      }
    };

    if (_id) fetchData(); // Only fetch data if _id is available
  }, [_id]);

  const [showModal, setShowModal] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const[currentProductId , setCurrentProductId]= useState(null);

  const handleConfirmDelivery = async () => {

    if (currentOrderId && currentProductId) {
      try {
        const response = await fetch(`http://localhost:4000/user/yourorders/${currentOrderId}/mark-delivered`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: currentProductId }), // Pass the productId here
        });
  
        if (response.ok) {
          window.location.reload(); // This reloads the page to show updated orders
        }
      } catch (error) {
        console.error("Failed to update order status:", error);
      }
    }
    setShowModal(false); // Close the modal after confirming
  };
  
  const handleCancelDelivery = () => {
    setShowModal(false);
    setCurrentOrderId(null);
  };

  const handleOpenModal = (orderId , productId) => {
    setCurrentOrderId(orderId);
    setCurrentProductId(productId); 
    setShowModal(true);
  };



  const handleDeliveryDateChange = (orderId, productId, existingDate) => {
    setIsEditing({ orderId, productId });
    // Set initial value of the date input if a delivery date exists
    if (existingDate) {
      setNewDeliveryDate(new Date(existingDate).toISOString().split('T')[0]);
    } else {
      setNewDeliveryDate('');
    }
  };

  const handleSaveDeliveryDate = async (orderId, productId) => {
    if (!productId) {
      console.error('Product ID is missing');
      return;
    }
    
    if (!newDeliveryDate) {
      console.error('Delivery date is missing');
      return;
    }
    try {
      // Convert newDeliveryDate to an ISO string format (YYYY-MM-DDTHH:MM:SSZ)
      const formattedDate = new Date(newDeliveryDate).toISOString();

      const response = await axios.put(
        `http://localhost:4000/user/update-delivery-date/${orderId}`,
        {
          productId,
          deliveryDate: formattedDate, // Send the correctly formatted date
        }
      );

      console.log('Delivery date updated successfully:', response.data);

      // Fetch updated orders
      const { data } = await axios.get(`http://localhost:4000/user/youritems/${_id}`);
      setOrders(data.orders);

      // Reset the editing state after saving
      setIsEditing(null);
      setNewDeliveryDate('');
    } catch (error) {
      console.error('Error saving delivery date:', error.response ? error.response.data : error.message);
    }
  };

  

  return (
    <div className="yoursale-container">
    {/* Products Section */}
    <div className="yoursale-products-section">
      <h2 className="yoursale-prod-heading">Your Products</h2>
      {products.length > 0 ? (
        <div className="yoursale-prod-cards">
          {products.map((product) => (
            <div key={product._id} className="yoursale-product-card">
              <div className="yoursale-prod-img">
                <img src={product.imgUrl} alt={product.prod_name} />
              </div>
              <div className="yoursale-prod-content">
                <h3 className="yoursale-prod-title">{product.prod_name}</h3>
                <div className="yoursale-prod-price">Price: Rs. {product.price}.00</div>
                <div className="yoursale-prod-cat">Category: {product.category}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='empty-items-div'>
        <p> No items yet? </p>
        <p> Head over to Sell Products and showcase your products today!</p>
        <img src={emptyitems} className='empty-items'/> </div>
      )}
    </div>
  

      {/* Orders Section */}
      <h2 className="yoursale-order-heading">Orders for Your Products</h2>
{orders.length > 0 ? (
  <table className="orders-table">
    <thead> 
      <tr>
        <th className='orders-page-th'>Order Status</th>
        <th className='orders-page-th'>Product Name</th>
        <th className='orders-page-th'>Ordered By</th>
        <th className='orders-page-th'>Order Date</th>
        <th className='orders-page-th'>Delivery Date</th>
        <th className='orders-page-th'>Change Date</th>

      </tr>
    </thead>
    <tbody>
    {orders.map((order) => (
        <tr key={order._id} className="orders-page-tr">
          <td className="orders-page-td">
            {order.products?.isDelivered ? (
              <span className="orders-page-td">Delivered</span>
            ) : (
              <button onClick={() => handleOpenModal(order._id ,order.products?.product._id)} className='change-deldate'>
                <Icon icon="fluent:box-checkmark-24-regular" width="24" height="24"  style={{color: '#1d1d2b'}} />
              </button>
            )}
          </td>
          <td className="orders-page-td">
              {order.products && order.products.product ? (
                <Link to={`/products/${order.products?.product._id}`}>
                <div>{order.products.product.prod_name}</div> </Link>
              ) : (
                <span>No products available</span>
              )}
            </td>
          <td className="orders-page-td">
            {order.buyer?.username} <br />({order.buyer?.email})
          </td>
          <td className="orders-page-td">
            {new Date(order.orderDate).toLocaleDateString()}
          </td>
          <td className="orders-page-td">
            {order.products.deliveryDate ? (
              <span>{new Date(order.products.deliveryDate).toLocaleDateString()}</span>
            ) : (
              <span>Pending</span>
            )}
          </td>
          <td className='orders-page-td'>
            {isEditing && isEditing.orderId === order._id ? (
              <>
                <input
                  type="date"
                  value={newDeliveryDate}
                  onChange={(e) => setNewDeliveryDate(e.target.value)}
                />
                <button onClick={() => handleSaveDeliveryDate(order._id, order.products?.product._id)} className='save-deldate'>
                  Save
                </button>
              </>
            ) : (
              <button onClick={() => handleDeliveryDateChange(order._id, order.products?.product._id, order.deliveryDate)} className='change-deldate'>
                    <Icon icon="tabler:edit" width="24" height="24"  style={{ color: '#1d1d2b' }} />
              </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
) : (
  <span className='empty-items-div'>No orders yet.
Your products are waiting for their first customer.</span>
)}
<OrderStatus
        show={showModal}
        onConfirm={handleConfirmDelivery}
        onCancel={handleCancelDelivery}
      />
    </div>
  );
};

export default YourSale;
