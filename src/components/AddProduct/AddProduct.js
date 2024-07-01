import axios from "../axios";
import React, { useState } from "react";

function AddProduct() {
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [accRating, setAccRating] = useState(0);
  const [prodName, setProdName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [altImages, setAltImages] = useState("");
  const [delivery, setDelivery] = useState("");
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
        acc_rating: accRating,
        prod_name: prodName,
        imgUrl,
        altImages: altImagesArray,
        delivery,
        price,
        origPrice,
        dimensions,
        material,
        description
      })
      .then(() => {
        setCategory("");
        setCondition("");
        setAccRating(0);
        setProdName("");
        setImgUrl("");
        setAltImages("");
        setDelivery("");
        setPrice(0);
        setOrigPrice(0);
        setDimensions("");
        setMaterial("");
        setDescription("");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div>
      <div>
        <img src="./amazon_logo.png" alt="" />
      </div>

      <form>
        <h3>Add Product</h3>

        <div>
          <p>Category</p>
          <input
            type="text"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          />
        </div>
        <div>
          <p>Condition</p>
          <input
            type="text"
            onChange={(e) => setCondition(e.target.value)}
            value={condition}
          />
        </div>
        <div>
          <p>Rating</p>
          <input
            type="number"
            onChange={(e) => setAccRating(e.target.value)}
            value={accRating}
          />
        </div>
        <div>
          <p>Product Name</p>
          <input
            type="text"
            onChange={(e) => setProdName(e.target.value)}
            value={prodName}
          />
        </div>
        <div>
          <p>Image URL</p>
          <input
            type="text"
            onChange={(e) => setImgUrl(e.target.value)}
            value={imgUrl}
          />
        </div>
        <div>
          <p>Alternative Images (comma separated URLs)</p>
          <input
            type="text"
            onChange={(e) => setAltImages(e.target.value)}
            value={altImages}
          />
        </div>
        <div>
          <p>Delivery</p>
          <input
            type="text"
            onChange={(e) => setDelivery(e.target.value)}
            value={delivery}
          />
        </div>
        <div>
          <p>Price</p>
          <input
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
        <div>
          <p>Original Price</p>
          <input
            type="number"
            onChange={(e) => setOrigPrice(e.target.value)}
            value={origPrice}
          />
        </div>
        <div>
          <p>Dimensions</p>
          <input
            type="text"
            onChange={(e) => setDimensions(e.target.value)}
            value={dimensions}
          />
        </div>
        <div>
          <p>Material</p>
          <input
            type="text"
            onChange={(e) => setMaterial(e.target.value)}
            value={material}
          />
        </div>
        <div>
          <p>Description</p>
          <input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>

        <button onClick={addProduct}>Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
