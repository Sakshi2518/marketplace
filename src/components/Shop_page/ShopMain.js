import React, { useState } from 'react';
import Header from '../Home_page/Header';
import Navigation from "./Navigation";
import Searchfilter from './Searchfilter';
import prodData from '../Alldata/prodData';
import "./Card.css";
import Card from './Card';

function ShopMain() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");
  const [sortingValue, setSortingValue] = useState("lowest");

  const handleInputChange = event => {
    setQuery(event.target.value);
  };

  const handleFilter = (value) => {
    setSelectedCategory(value);
  };

  const sortingProducts = (a, b) => {
    if (sortingValue === "Newly added") {
      const dateA = new Date(a.dateOfProd).getTime();
      const dateB = new Date(b.dateOfProd).getTime();
      return dateB - dateA; // Sort in descending order (latest date first)
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

  const filteredItems = prodData.filter((product) =>
    product.prod_name && product.prod_name.toLowerCase().includes(query.toLowerCase())
  );

  function filteredData(products, selected, query) {
    let filteredProducts = products;

    if (query) {
      filteredProducts = filteredItems;
    }

    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ category}) =>
          category === selected 
          
      );
    }

    return filteredProducts;
  }

  const filteredAndSortedProducts = filteredData(prodData, selectedCategory, query).sort(sortingProducts);

  return (
    <div>
      <Header />
      <Navigation query={query} handleInputChange={handleInputChange} />
      <Searchfilter
        handleFilter={handleFilter}
        setSortingValue={setSortingValue} 
      />
      <div className='shop-section-align'>
        <div className='product-align'>
          {filteredAndSortedProducts.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShopMain;
