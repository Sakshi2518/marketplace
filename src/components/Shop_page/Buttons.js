import React from 'react';

const Buttons = ({ onClickHandler, value, title, active }) => {
  return (
    <button
      className={`search-btn-details ${active ? 'active' : ''}`}
      onClick={onClickHandler}
    >
      {title}
    </button>
  );
};

export default Buttons;
