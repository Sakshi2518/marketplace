import React, { createContext, useReducer } from 'react';
import ContextCart from './ContextCart';
import { reducer } from './reducer';

export const CartContext = createContext();

const initialState = {
  item: [],
  totalAmount: 0,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

const Cart = () => {
  return <ContextCart />;
};

export { CartProvider, Cart };
