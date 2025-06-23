import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { MenuContext } from "../context/MenuContext";


const Sidebar = () => {
  const { menu, setMenu } = useContext(MenuContext);

  const getStyles = ({ isActive }) => {
    return isActive
      ? "category-item text-base px-3 py-2 cursor-pointer bg-gradient-to-r from-zinc-200 border-l-5 border-violet-800 scale-105 ml-1 flex gap-2"
      : "category-item text-base px-3 py-2 cursor-pointer bg-gradient-to-r from-zinc-200 transition-transform duration-200 flex gap-2 hover:scale-110";
  };

  const handleMenuToggle = () => {
    setMenu(prev => !prev);
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-20 w-full h-screen bg-transparent transition-opacity duration-300
                          ${menu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      onClick={() => setMenu(prev => !prev)}
    >
      <div
        className={`w-4/5 max-w-[320px] h-full p-4 bg-amber-50 shadow-lg relative flex items-center transition-transform duration-300 ease-in-out
                            ${menu ? "translate-x-0" : "-translate-x-full"} dark:bg-[rgb(41,40,40)]`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          title="Go back"
          className="p-2 rounded-full absolute top-0 right-0 hover:cursor-pointer z-20"
          onClick={() => setMenu(prev => !prev)}
        >
          <span className="material-symbols-outlined text-2xl dark:text-gray-300">arrow_back</span>
        </button>
        <nav className="flex flex-col p-4 gap-10 w-full">
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
      </div>
    </aside>


  );
};

export default Sidebar;