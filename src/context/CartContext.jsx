import React, { createContext, useEffect, useReducer } from "react";
import { cartReducer } from "../reducers/cartReducer";

function setInitialState(){
  let storedSate=(localStorage.getItem("state"));
  return storedSate?JSON.parse(storedSate):{cart:[]};
}


export const CartContext = createContext();

// Add default value to prevent context errors
CartContext.displayName = 'CartContext';

const CartProvider = ({ children }) => {
  const [state, cartDispatch] = useReducer(cartReducer, setInitialState());
 useEffect(()=>{
  localStorage.setItem("state",JSON.stringify(state));
 },[state])
  
  return (
    <CartContext.Provider value={{ ...state, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;