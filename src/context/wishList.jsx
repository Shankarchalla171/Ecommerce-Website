import React, { createContext, useEffect, useState } from "react";

export const WishListContext = createContext();

// Add default value to prevent context errors
WishListContext.displayName = 'WishListContext';
function setInitialState(){
  const storedSate=localStorage.getItem("wishlist");
  return storedSate?JSON.parse(storedSate):[];
}
const WishListProvider = ({ children }) => {
  const [wishList, setWishList] = useState(setInitialState());

  useEffect(()=>{
     localStorage.setItem("wishlist",JSON.stringify(wishList));
  },[wishList])
  return (
    <WishListContext.Provider value={{ wishList, setWishList }}>
      {children}
    </WishListContext.Provider>
  );
};

export default WishListProvider;