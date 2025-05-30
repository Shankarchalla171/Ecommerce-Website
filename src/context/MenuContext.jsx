import React, { createContext, useState } from "react";

export const MenuContext = createContext();

// Add default value to prevent context errors
MenuContext.displayName = 'MenuContext';

const MenuProvider = ({ children }) => {
  const [menu, setMenu] = useState(false);
  
  return (
    <MenuContext.Provider value={{ menu, setMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuProvider;