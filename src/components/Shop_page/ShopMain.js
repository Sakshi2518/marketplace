import React from 'react';
import Header from '../Home_page/Header'; // Ensure the path is correct
import Products from './Products'; // Ensure the path is correct
import Searchfilter from './Searchfilter'; 
import prodData from '../Alldata/prodData';


console.log(Products); // Add this line to check if Products is being imported correctly

function ShopMain() {
  return (
    <div>
      <Header />
      
      <Searchfilter/>
      {prodData.slice(0, 6).map((item) => (
              <Products item={item} key={item.id} />
            ))}
    </div>
  );
}

export default ShopMain;