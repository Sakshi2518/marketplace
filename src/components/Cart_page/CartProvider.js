// import React, { createContext, useReducer } from 'react';
// import ContextCart from './ContextCart';
// import { reducer } from './reducer';

// export const CartContext = createContext();

// const initialState = {
//   item: [],
//   totalAmount: 0,
// };

// const CartProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   return (
//     <CartContext.Provider value={{ ...state, dispatch }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// const Cart = () => {
//   return <ContextCart />;
// };

// export { CartProvider, Cart };

import React, { createContext, useReducer } from "react";
import ContextCart from "./ContextCart";
// Import the reducer
import { reducer } from "./reducer";

export const CartContext = createContext();

const initialState = {
  item: [],
  totalAmount: 0, // Initial totalAmount
};

const CartProvider = ({ children }) => {
  // Using useReducer for state management
  const [state, dispatch] = useReducer(reducer, initialState);

  // Calculate total amount
  const totalAmount = state.item.reduce((total, item) => total + item.price, 0);

  return (
    <CartContext.Provider value={{ ...state, totalAmount, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

const Cart = () => {
  return <ContextCart />;
};

export { CartProvider, Cart };

