import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const WishListContext = createContext();

// Add default value to prevent context errors
WishListContext.displayName = 'WishListContext';

function getStored(islogged){

  if(!islogged){
    return [];
  }else{
    const storedSate=localStorage.getItem("wishlist");
    return storedSate?JSON.parse(storedSate):[];
  }
}
const WishListProvider = ({ children }) => {
  const {islogged}=useContext(AuthContext);

  const [wishList, setWishList] = useState(getStored(islogged));

  useEffect(()=>{
     setWishList(getStored(islogged));
  },[islogged])

  useEffect(()=>{
    if(islogged){
     localStorage.setItem("wishlist",JSON.stringify(wishList));
    }
  },[wishList,islogged])
  return (
    <WishListContext.Provider value={{ wishList, setWishList }}>
      {children}
    </WishListContext.Provider>
  );
};

export default WishListProvider;