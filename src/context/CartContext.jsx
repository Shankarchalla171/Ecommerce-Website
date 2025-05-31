import React, { createContext, useContext, useEffect, useReducer } from "react";
import { cartReducer } from "../reducers/cartReducer";
import { AuthContext } from "./AuthContext";



function getstoredState(islogged){
    if(!islogged){
      return {cart:[]};
    }else{
       let storedSate=(localStorage.getItem("state"));
     return storedSate?JSON.parse(storedSate):{cart:[]};
    }   
}


export const CartContext = createContext();

// Add default value to prevent context errors
CartContext.displayName = 'CartContext';

const CartProvider = ({ children }) => {
  
  const {islogged}=useContext(AuthContext);
  
  const [state, cartDispatch] = useReducer(cartReducer, getstoredState(islogged));
  

  useEffect(()=>{
    if(islogged){
      cartDispatch({
        type:'LOGIN',
        payload:getstoredState(islogged),
      })
    }else{
      cartDispatch({
        type:'LOGOUT',
      })
    }
  },[islogged])

 useEffect(()=>{
  if(islogged){
   localStorage.setItem("state",JSON.stringify(state));
  }
 },[state,islogged])
  
  return (
    <CartContext.Provider value={{ ...state, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;