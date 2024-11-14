


      import React from "react";
      import "./Modal2.css"; // Ensure you create appropriate styles for the modal
      
      const AddProdModal = ({ show, onConfirm, onCancel }) => {
        if (!show) {
          return null;
        }
      
        return (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Confirm Product Addition</h2>
              <p>Are you sure you want to add this Product?<br/>
              <span> No changes can be made to the details</span></p>
              <button onClick={onConfirm}>Yes</button>
              <button onClick={onCancel}>No</button>
            </div>
          </div>
        );
      };
      
      export default AddProdModal;
      