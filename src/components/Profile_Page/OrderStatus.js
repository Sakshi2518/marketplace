import React from "react";
import "./Modal2.css";

const OrderStatus = ({ show, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className="modal2-overlay">
      <div className="modal2">
        <h2>Confirm Delivery</h2>
        <p>Are you sure the product has been delivered?<br />
        <span>The buyer will be notified.</span></p>
        <button className="confirm-btn" onClick={onConfirm}>Yes</button>
        <button className="cancel-btn" onClick={onCancel}>No</button>
      </div>
    </div>
  );
};

export default OrderStatus;
