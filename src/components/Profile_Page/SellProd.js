import axios from "../axios";
import React, { useState } from "react";
import "./SellProd.css"
//import Sidebar from "./Sidebar";
import "./Sidebar.css"
import { Icon } from '@iconify-icon/react';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SellProd = () => {
    const [category, setCategory] = useState("Books");
    const [condition, setCondition] = useState("");
    const [prodName, setProdName] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [altImages, setAltImages] = useState([]);
    const [price, setPrice] = useState();
    const [origPrice, setOrigPrice] = useState();
    const [dimensions, setDimensions] = useState("");
    const [material, setMaterial] = useState("");
    const [description, setDescription] = useState("");

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImgUrl(imageUrl);
      }
    };
  
    const handleAltImageChange = (e) => {
      const files = Array.from(e.target.files).slice(0, 2); 
      const newAltImages = files.map((file) => URL.createObjectURL(file));
      setAltImages((prevImages) => [...prevImages, ...newAltImages]); // Append new images to existing ones
    };
  
    
    const removeImage = (index) => {
      setAltImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const removeMainImage = () => {
      setImgUrl("");
    };


    const addProduct = (e) => {
        e.preventDefault();
        
        axios
          .post("/products/add", {
            category,
            condition,
            prod_name: prodName,
            imgUrl,
            altImages: JSON.stringify(altImages),
            price,
            origPrice,
            dimensions,
            material,
            description
          })
          .then(() => {
            setCategory("Books");
            setCondition("");
            setProdName("");
            setImgUrl("");
            setAltImages([]);
            setPrice(0);
            setOrigPrice(0);
            setDimensions("");
            setMaterial("");
            setDescription("");

            toast.success('Product added successfully! Check it out on the Shop page');

    
          })
          .catch((error) => {
            toast.error(`Make sure to fill out all the required fields!!`);
        });
};
   

    return (
        <div className='accountsettings'>

<div className="Addprod-container">
       
      <div className="Addprod-section">
        <div className="Addprod-heading">
          <div>Add Product</div>
        </div>
        <div className="Addprod-form">
          <form>
            <div>
              <p>Product Name</p>
              <input
                type="text"
                onChange={(e) => setProdName(e.target.value)}
                value={prodName}
                placeholder="e.g. Schaum Series Data Structures"
              />
            </div>

            <div className="img-div">
  <p className="img-head">Main Cover Image (only 1)</p>
  <div className="pic-container">
    <div className="pic-upload">
      <div className="input-container">
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/jpeg, image/png, image/jpg"
          id="input-file"
          placeholder="add url/upload the main cover image"
          style={{ display: 'none' }}
        />
        <label htmlFor="input-file" className="add-photo-label">
          Add photo 
          <Icon icon="mdi:camera" width="24" height="24" style={{ color: '#dfe9f5a1' }} />
        </label>
      </div>
      <div className="main-image-container">
        {imgUrl && (
          <div className="main-img">
            <img src={imgUrl} alt="Product Cover" id="profile-pic" />
            <div className="btn" type="button" onClick={removeMainImage}>
              <Icon icon="charm:cross" width="20" height="20"className="cross-icon"  style={{ color: '#b80f0f' }} />
            </div>
          </div>
        )}
      </div>
    </div> 
  </div>    
</div>

            
              {/*
              <p>Main Cover Image</p>
              <div className="pic-upload">
              <input
                type="text"
                onChange={(e) => setAltImages(e.target.value)}
                value={altImages}
                placeholder="add url/upload 2-3 extra from different angles"
              />
               <label> Add photo </label>
              </div> 
              */}

              {/*<div className="alt-images-container">
                  {altImages.map((image, index) => (
                    <div key={index} className="alt-image">
                      <img src={image} alt={`Alt ${index}`} />
                      <button type="button" onClick={() => removeImage(index)}>
                        Delete
                      </button>
                    </div>
                  ))}
                </div>*/}


              
              

          <div className="img-div">
            <p className="img-head">Additional Images (atleast 3)</p>
                <div className="pic-container">
                  <div className="pic-upload">
                    <div className="input-container">
                      <input
                        type="file"
                        onChange={handleAltImageChange}
                        accept="image/jpeg, image/png, image/jpg"
                        multiple="multiple"
                        id="alt-input-file"
                        placeholder="add url/upload the main cover image"
                      />
                      <label htmlFor="alt-input-file" className="add-photo-label">
                        Add photo 
                        <Icon icon="mdi:camera" width="24" height="24" style={{ color: '#dfe9f5a1' }} />
                      </label>
                    </div>
                    <div className="alt-images-container">
                                  {altImages.map((image, index) => (
                                    <div key={index} className="alt-image">
                                      <img src={image} alt={`Alt ${index}`} />
                                      <div className="btn" type="button" onClick={() => removeImage(index)}>
                                      <Icon icon="charm:cross" width="20" height="20"className="cross-icon"  style={{ color: '#b80f0f' }} />
                               </div>
                                </div>
                                    
                             ))}
                              
                              </div>
                  </div> 
                </div>    
              </div>

                          
            
            <div className="prod-price-cat">
              <div className="prod-flex">
                <p>Your Selling Price<span> (in Rs.) </span></p>
                <input
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  placeholder="00"
                />
              </div>
              <div className="prod-flex">
                <p>Original Price<span> (in Rs.) </span></p>
                <input
                  type="number"
                  onChange={(e) => setOrigPrice(e.target.value)}
                  value={origPrice}
                  placeholder="00"
                />
              </div>
              <div className="prod-category">
              <p>Category</p>
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                placeholder="select category"
              > 
                <option value="Books">Books</option>
                <option value="Courses">Courses</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Utensils">Utensils</option>
                <option value="Others">Others</option>
              </select>
            </div>
            </div>
            <div className="prod-des">
              <p>Description</p>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                rows="2"  
                cols="77" 
                placeholder="write 1-2 lines describing your product"
              />
            </div>
            <div>
          <p>Condition</p>
          <input
            type="text"
            onChange={(e) => setCondition(e.target.value)}
            value={condition}
            placeholder="e.g 1 year old but looks new"

          />
        </div>
            
            <div>
              <p>Dimensions</p>
              <input
                type="text"
                onChange={(e) => setDimensions(e.target.value)}
                value={dimensions}
                placeholder="e.g. 56cm * 56cm * 70cm for a square table"
              />
            </div>
            <div>
              <p>Material</p>
              <input
                type="text"
                onChange={(e) => setMaterial(e.target.value)}
                value={material}
                placeholder="e.g teak wood"
              />
            </div>
            
            <button onClick={addProduct}>Add Product</button>
          </form>
        </div>
      </div>
    </div>
            {/* <h1 className='mainhead1'>Change Password</h1>

            <div className='form'>
                <div className='form-group'>
                    <label htmlFor='oldpass'>Old Password <span>*</span></label>
                    <input type="password"
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='newpass'>New Password <span>*</span></label>
                    <input type="password"
                    />
                </div>


            </div>

            <button className='mainbutton1'>Save Changes</button> */}
            <ToastContainer hideProgressBar={true}
      />
        </div>
    )
}

export default SellProd