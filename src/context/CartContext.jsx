import React, { createContext, useReducer } from "react";
import { cartReducer } from "../reducers/cartReducer";

const initialState = {
  cart: [],
};

export const CartContext = createContext();

// Add default value to prevent context errors
CartContext.displayName = 'CartContext';

const CartProvider = ({ children }) => {
  const [{ cart }, cartDispatch] = useReducer(cartReducer, initialState);
  
  return (
    <CartContext.Provider value={{ cart, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;