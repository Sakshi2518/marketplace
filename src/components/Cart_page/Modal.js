import React from "react";
import "./Modal.css"; // Ensure you create appropriate styles for the modal

const ConfirmationModal = ({ show, onConfirm, onCancel }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Confirm Order</h2>
        <p>Are you sure you want to place the order?</p>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div> 
  );
};

export default ConfirmationModal;
