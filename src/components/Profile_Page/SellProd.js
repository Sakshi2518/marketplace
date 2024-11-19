import axios from "../axios";
import React, { useState , useContext } from "react";
import "./SellProd.css"
//import Sidebar from "./Sidebar";
import "./Sidebar.css"
import { Icon } from '@iconify-icon/react';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AddProdModal from "./AddProdModal";
import { UserContext } from './UserContext';

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
    const [showModal, setShowModal] = useState(false);
    const { userId} = useContext(UserContext);




    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
          setImgUrl(file);
      }
  };

  const handleAltImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 3); 
    setAltImages((prevImages) => [...prevImages, ...files]);
};


  const removeImage = (index) => {
    setAltImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleOpenModal = (e) => {
    e.preventDefault();
    if (!imgUrl || altImages.length < 3) {
        toast.error("Please add a main image and at least 3 additional images.");
    } else {
        setShowModal(true);
    }
};
    

  const handleConfirmProduct  = (e) => {
    e.preventDefault();

    if (!imgUrl || altImages.length < 3) {
        toast.error("Please add a main image and at least 3 additional images.");
        return;
    }

    if(!userId){
      toast.error("Login to add product")
      return;
    }
    const currentDate = new Date().toISOString();
    const formData = new FormData();
    formData.append("category", category);
    formData.append("condition", condition);
    formData.append("prod_name", prodName);
    formData.append("price", price);
    formData.append("origPrice", origPrice);
    formData.append("dimensions", dimensions);
    formData.append("material", material);
    formData.append("description", description);
    formData.append("imgUrl", imgUrl); // add main image file
    altImages.forEach((file, index) => formData.append(`altImages`, file)); // add all alt images files
    formData.append("userId", userId);
    formData.append("dateOfProd", currentDate);
    axios
        .post("/products/add", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        .then(() => {
            // Reset fields
            setCategory("Books");
            setCondition("");
            setProdName("");
            setImgUrl(null);
            setAltImages([]);
            setPrice(0);
            setOrigPrice(0);
            setDimensions("");
            setMaterial("");
            setDescription("");

            toast.success("Product added successfully! Check it out on the Shop page.");
        })
        .catch((error) => {
            toast.error("Make sure to fill out all the required fields!");
            console.error(error);
        });
        setShowModal(false);
};
  
const handleCancelProduct = () => {
  setShowModal(false);
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

            <div className="addprod-row">
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
                              style={{ display: 'none' }}
                              placeholder="add url/upload the main cover image"
                              id="input-file"
                          />
                          <label htmlFor="input-file" className="add-photo-label">
                            Add photo 
                            <Icon icon="mdi:camera" width="24" height="24" style={{ color: '#dfe9f5a1' }} />
                        </label>
                            </div>
                        
                       <div className="main-image-container">
                       {imgUrl && (
                            <div className="main-img">
                                <img src={URL.createObjectURL(imgUrl)} alt="Product Cover" />
                                <div className="sellprod-btn" type="button" onClick={()=> setImgUrl(null)}>
                                  <Icon icon="charm:cross" width="20" height="20"className="cross-icon"  style={{ color: '#b80f0f' }} />
                                </div>
                            </div>
                        )}
                       </div>
                       </div>
                    </div>
                </div>

          <div className="img-div">
              <p className="img-head">Additional Images (at least 3)</p>
              <div className="pic-container">
                <div className="pic-upload">
                  <div className="input-container">
                  <input
                      type="file"
                      onChange={handleAltImageChange}
                      accept="image/jpeg, image/png, image/jpg"
                      multiple
                      style={{ display: 'none' }}
                      id="alt-input-file"
                  />
                  <label htmlFor="alt-input-file" className="add-photo-label">
                      Add photos 
                      <Icon icon="mdi:camera" width="24" height="24" style={{ color: '#dfe9f5a1' }} />
                  </label> </div>
                  <div className="alt-images-container">
                      {altImages.map((file, index) => (
                          <div key={index} className="alt-image">
                              <img src={URL.createObjectURL(file)} alt={`Alt ${index}`} />
                              <div className="sellprod-btn" type="button" onClick={() => removeImage(index)}>
                                  <Icon icon="charm:cross" width="20" height="20" style={{ color: '#b80f0f' }} />
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
            
            <button onClick={(e) => handleOpenModal(e)}>Add Product</button>
            </form>
        </div>
      </div>
    </div>
    <AddProdModal
                show={showModal}
                onConfirm={handleConfirmProduct}
                onCancel={handleCancelProduct}
            />
            <ToastContainer hideProgressBar={true}
      />
        </div>
        
    )
}




export default SellProd