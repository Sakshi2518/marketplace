import React, { useState } from 'react';
import './Searchfilter.css'; 
import Buttons from './Buttons';

function Searchfilter({ handleFilter }) {
  const [activeButton, setActiveButton] = useState('All Products');

  const handleButtonClick = (value) => {
    setActiveButton(value); // Set the active button value
    handleFilter(value); // Pass the value to parent component
  };

  return (
    <div className='search-filter-section'>
      <div>
        <Buttons
          onClickHandler={() => handleButtonClick('')}
          value=''
          title='All Products'
          active={activeButton === ''}
        />
        <Buttons
          onClickHandler={() => handleButtonClick('Books')}
          value='Books'
          title='Books'
          active={activeButton === 'Books'}
        />
        <Buttons
          onClickHandler={() => handleButtonClick('Courses')}
          value='Courses'
          title='Courses'
          active={activeButton === 'Courses'}
        />
        <Buttons
          onClickHandler={() => handleButtonClick('Electronics')}
          value='Electronics'
          title='Electronics'
          active={activeButton === 'Electronics'}
        />
        <Buttons
          onClickHandler={() => handleButtonClick('Furniture')}
          value='Furniture'
          title='Furniture'
          active={activeButton === 'Furniture'}
        />
        <Buttons
          onClickHandler={() => handleButtonClick('Utensils')}
          value='Utensils'
          title='Utensils'
          active={activeButton === 'Utensils'}
        />
        <Buttons
          onClickHandler={() => handleButtonClick('Others')}
          value='Others'
          title='Others'
          active={activeButton === 'Others'}
        />
      </div>
    </div>
  );
}

export default Searchfilter;
