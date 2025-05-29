import React, { createContext, useReducer, useState } from "react";
import { WishReducer } from "../reducers/wishReducer";

export const  WishListContext=createContext();

// const initialState={
//     wishlist:[],
// }

const WishListProvider=({children})=>{
    // const [state,WishDispatch]=useReducer(WishReducer,initialState);
    const [wishList,setWishList]=useState([]);
    return(
        <WishListContext.Provider value={{wishList,setWishList}} >
            {
                children
            }
        </WishListContext.Provider>
    )
}

export default WishListProvider