import axios from "../axios";
import React, { useState , useEffect } from "react";
import "./SellProd.css"
//import Sidebar from "./Sidebar";
import "./Sidebar.css"

const SellProd = () => {
    const [category, setCategory] = useState("");
    const [condition, setCondition] = useState("");
    const [prodName, setProdName] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [altImages, setAltImages] = useState("");
    const [price, setPrice] = useState(0);
    const [origPrice, setOrigPrice] = useState(0);
    const [dimensions, setDimensions] = useState("");
    const [material, setMaterial] = useState("");
    const [description, setDescription] = useState("");

    const addProduct = (e) => {
        e.preventDefault();
    
        const altImagesArray = altImages.split(',').map(image => image.trim());
    
        axios
          .post("/products/add", {
            category,
            condition,
            prod_name: prodName,
            imgUrl,
            altImages: altImagesArray,
            price,
            origPrice,
            dimensions,
            material,
            description
          })
          .then(() => {
            setCategory("");
            setCondition("");
            setProdName("");
            setImgUrl("");
            setAltImages("");
            setPrice(0);
            setOrigPrice(0);
            setDimensions("");
            setMaterial("");
            setDescription("");
    
          })
          .catch((error) => alert(error.message));
      };
    
   ;

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
            <div>
              <p>Main Cover Image</p>
              <div className="pic-upload">
              <input
                type="text"
                onChange={(e) => setImgUrl(e.target.value)}
                value={imgUrl}
                placeholder="add url/upload the main cover image"
              />
               <button> Add photo </button>
              </div> 
            </div>
            <div>
              <p>Main Cover Image</p>
              <div className="pic-upload">
              <input
                type="text"
                onChange={(e) => setAltImages(e.target.value)}
                value={altImages}
                placeholder="add url/upload 2-3 extra from different angles"
              />
               <button> Add photo </button>
              </div> 
            </div>
            
            <div className="prod-price-cat">
              <div className="prod-flex">
                <p>Your Selling Price<span> (in Rs.) </span></p>
                <input
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}

                />
              </div>
              <div className="prod-flex">
                <p>Original Price<span> (in Rs.) </span></p>
                <input
                  type="number"
                  onChange={(e) => setOrigPrice(e.target.value)}
                  value={origPrice}
                />
              </div>
              <div className="prod-category">
              <p>Category</p>
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                placeholder="select condition"
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
        </div>
    )
}

export default SellProd