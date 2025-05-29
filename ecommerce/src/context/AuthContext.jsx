import React, { createContext, useReducer } from "react";
import { authReducer } from "../reducers/authReducer";

const initialState={
    islogged:false,
    email:'',
    password:'',
    access_token:''
}

export const AuthContext=createContext();

const AuthProvider=({children})=>{
    const [state,authDispatch]=useReducer(authReducer,initialState);
   return(
      <AuthContext.Provider value={{...state,authDispatch}}>
        {
            children
        }
      </AuthContext.Provider>
   )
}

export default AuthProvider
