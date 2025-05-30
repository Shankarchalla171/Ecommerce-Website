import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { MenuContext } from "../context/MenuContext";

const Sidebar = () => {
  const { menu, setMenu } = useContext(MenuContext);
  
  const getStyles = ({ isActive }) => {
    return isActive 
      ? "category-item text-base px-3 py-2 cursor-pointer bg-gradient-to-r from-zinc-200 border-l-4 border-zinc-700 scale-105 ml-1 flex gap-2"
      : "category-item text-base px-3 py-2 cursor-pointer bg-gradient-to-r from-zinc-200 transition-transform duration-200 flex gap-2 hover:scale-110";
  };

  const handleMenuToggle = () => {
    setMenu(prev => !prev);
  };

  return (
    <nav className="flex flex-col p-4 w-1/5 gap-10">
      <NavLink to="/" className={getStyles} onClick={handleMenuToggle}>
        <span className="material-symbols-outlined">
          home
        </span>
        <span>Home</span>
      </NavLink>
      
      <NavLink to="/products" className={getStyles} onClick={handleMenuToggle}>
        <span className="material-symbols-outlined">
          shopping_bag
        </span>
        <span>Products</span>
      </NavLink>
      
      <NavLink to="/cart" className={getStyles} onClick={handleMenuToggle}>
        <span className="material-symbols-outlined">
          shopping_cart
        </span>
        <span>Cart</span>
      </NavLink>
      
      <NavLink to="/wishlist" className={getStyles} onClick={handleMenuToggle}>
        <span className="material-symbols-outlined">
          favorite
        </span>
        <span>WishList</span>
      </NavLink>
    </nav>
  );
};

export default Sidebar;