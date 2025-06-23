import { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { MenuContext } from '../context/MenuContext';
const initialtheme = () => {
  const userPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
  console.log(userPreference);
  const stored_theme = localStorage.getItem("theme");
  if (userPreference) {
    console.log(stored_theme);
    if (stored_theme && JSON.parse(stored_theme) === userPreference) {
      return true;
    }else 
      return stored_theme?JSON.parse(stored_theme):userPreference;
  } else 
      return stored_theme?JSON.parse(stored_theme):userPreference;
}
const Navbar = () => {
  const navigate = useNavigate();
  const { menu, setMenu } = useContext(MenuContext);
  const { islogged, authDispatch } = useContext(AuthContext);
  const [isDark, setDark] = useState(initialtheme);

  const getStyles = ({ isActive }) => {
    return isActive
      ? 'border-b-2 border-indigo-500 hidden text-gray-700 sm:block scale-105 font-bold dark:text-gray-900'
      : 'hover:border-b-2 border-indigo-500 hidden text-[#703BF7] sm:block hover:scale-105 transition-transform duration-100 font-semibold dark:text-cyan-300';
  };

  const handleAuthAction = () => {
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const ToggleMode = () => {
    setDark(!isDark)
  }
  useEffect(() => {

    (isDark) ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', JSON.stringify(isDark));
  }, [isDark])
  return (
    <header className="flex w-full py-2 px-4 sm:px-10   items-center justify-between shadow-md sticky top-0 z-10 
        bg-gradient-to-r from-indigo-200 via-violet-100 to-blue-200
        dark:bg-gradient-to-r dark:from-indigo-900 dark:via-violet-800 dark:to-blue-900 
        dark:shadow-md dark:shadow-violet-400/30">


      <div className="flex items-center gap-3">
        <span className="pt-1 cursor-pointer sm:hidden" onClick={toggleMenu}>
          <img src="/menu.svg" alt="Menu" />
        </span>
        <h1 className="text-[28px] text-indigo-800 sm:text-[36px] font-bold dark:text-slate-100">
          React-shop
        </h1>
      </div>

      <nav className="hidden sm:flex w-full sm:w-[50%] justify-around text-xl">
        <NavLink to="/" className={getStyles}>Home</NavLink>
        <NavLink to="/products" className={getStyles}>Products</NavLink>

        <NavLink to="/cart" className={getStyles}>
          <span className="material-symbols-outlined">
            shopping_cart
          </span>
        </NavLink>
        <NavLink to="/wishlist" className={getStyles}>
          <span className="material-symbols-outlined">
            favorite
          </span>
        </NavLink>
      </nav>
      <div className='flex gap-2 items-center'>
        <button className='hover:cursor-pointer' onClick={ToggleMode}>
          {
            isDark ? (<span className="material-symbols-outlined dark:text-cyan-300">light_mode </span>)
              : (<span className="material-symbols-outlined text-[#703BF7]">dark_mode</span>)
          }
        </button>
        <div className="group relative sm:ml-4">

          <span className="material-symbols-outlined cursor-pointer text-indigo-800 hover:border-b-2 border-indigo-500 dark:text-violet-300"
            onClick={() => navigate('/login')}
          >
            account_circle
          </span>
          <div className="absolute bottom-[-20px] right-0 mt-2 hidden group-hover:block">
            <button
              className="text-sm text-emerald-800 bg-zinc-200 shadow-lg rounded px-3 py-1 cursor-pointer font-semibold"
              onClick={handleAuthAction}
            >
              {islogged ? 'LogOut' : 'LogIn'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;