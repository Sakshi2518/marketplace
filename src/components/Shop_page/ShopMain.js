import React, { useEffect, useState } from "react";
import Shopheader from "./Shopheader";
import Navigation from "./Navigation";
import Searchfilter from "./Searchfilter";
import axios from "../axios";
import Card from "./Card";
import Sortdd from "./Sortdd";
import "./Card.css";
import "./Searchfilter.css";

function ShopMain() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortingValue, setSortingValue] = useState("lowest");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve the token from localStorage (or any other storage you use)
        const token = localStorage.getItem('token');
         console.log("Token:", token); 
        const { data } = await axios.get("http://localhost:4000/products/get", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setProducts(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setQuery("");
    setSearchQuery("");
  };

  const handleFilter = (value) => {
    setSelectedCategory(value);
  };

  const sortingProducts = (a, b) => {
    if (sortingValue === "Newly added") {
      return (
        new Date(b.dateOfProd).getTime() - new Date(a.dateOfProd).getTime()
      );
    }
    if (sortingValue === "lowest") {
      return a.price - b.price;
    }
    if (sortingValue === "highest") {
      return b.price - a.price;
    }
    if (sortingValue === "a-z") {
      return a.prod_name.localeCompare(b.prod_name);
    }
    if (sortingValue === "z-a") {
      return b.prod_name.localeCompare(a.prod_name);
    }
    return 0;
  };

  const filteredProducts = products.filter(
    (product) =>
      product.prod_name &&
      product.prod_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAndSortedProducts = filteredProducts
    .filter(
      (product) => !selectedCategory || product.category === selectedCategory
    )
    .sort(sortingProducts);

  return (
    <div>
      <Shopheader
        query={query}
        handleInputChange={handleInputChange}
        handleSearch={handleSearch}
        handleClearSearch={handleClearSearch}
      />
      <Navigation query={query} handleInputChange={handleInputChange} />
      <div className="sort-filter-section">
        <Searchfilter
          handleFilter={handleFilter}
          setSortingValue={setSortingValue}
        />
        <div className="sort-btn">
          <Sortdd
            sortingValue={sortingValue}
            setSortingValue={setSortingValue}
          />
        </div>
      </div>
      <div className="shop-section-align">
        <div className="product-align">
          {error && <p>Error fetching products: {error}</p>}
          {filteredAndSortedProducts.map((item) => (
            <Card key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShopMain;
