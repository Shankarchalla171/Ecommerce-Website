import React, { createContext, useEffect, useReducer } from "react";
import { authReducer } from "../reducers/authReducer";

const initialState = {
  islogged: false,
  name:'',
  email: '',
  password: '',
  photo:'',
  access_token: '',
};

function setInitialState(){
  const storedSate=localStorage.getItem("Auth");
  return storedSate?JSON.parse(storedSate):initialState;
}

export const AuthContext = createContext();

// Add default value to prevent context errors
AuthContext.displayName = 'AuthContext';

const AuthProvider = ({ children }) => {
  const [state, authDispatch] = useReducer(authReducer, setInitialState());

  useEffect(()=>{
    localStorage.setItem("Auth",JSON.stringify(state));
  },[state]);
  
  return (
    <AuthContext.Provider value={{ ...state, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;