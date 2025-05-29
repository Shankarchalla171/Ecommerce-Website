import React, { createContext, useReducer } from "react";
import { cartReducer } from "../reducers/cartReducer";

const initialState={
    cart:[],
}

export const cartContext=createContext();
 
const CartProvider=({children})=>{
    const [ { cart }, cartDispatch ]=useReducer(cartReducer,initialState);
   return(
      <cartContext.Provider value={{cart,cartDispatch}}>
        {children}
      </cartContext.Provider>
   )
}

export default CartProvider