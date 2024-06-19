import React from 'react';
import './Searchfilter.css';

function Sortdd({ sortingValue, setSortingValue }) {

  const handleSortChange = (event) => {
    setSortingValue(event.target.value);
  };

  return (
    <div className='sort-section'>
      
      <form action='#'>
        <label htmlFor='sort' className='sort-label'></label>
        <select
          name='sort'
          id='sort'
          className='sort_section'
          onChange={handleSortChange}
          value={sortingValue}
        >
          <option value="Newly added">Newly Added</option>
          <option value="lowest">Price: Low to High</option>
          <option value="highest">Price: High to Low</option>
          <option value="a-z">Item: A-Z</option>
          <option value="z-a">Item: Z-A</option>
        </select>
      </form>
    </div>
  );
}

export default Sortdd;
