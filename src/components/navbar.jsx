import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { MenuContext } from '../context/MenuContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { menu, setMenu } = useContext(MenuContext);
  const { islogged, authDispatch } = useContext(AuthContext);

  const getStyles = ({ isActive }) => {
    return isActive
      ? 'border-b-2 border-indigo-500 hidden sm:block scale-105'
      : 'hover:border-b-2 border-indigo-500 hidden sm:block hover:scale-105 transition-transform duration-100';
  };

  const handleAuthAction = () => {
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenu(!menu);
  };

  return (
    <header className="flex w-full py-2 px-4 sm:px-10 items-center justify-between shadow-md sticky top-0 bg-zinc-100 z-10">
      <div className="flex items-center gap-3">
        <span className="pt-1 cursor-pointer sm:hidden" onClick={toggleMenu}>
          <img src="/menu.svg" alt="Menu" />
        </span>
        <h1 className="text-[28px] sm:text-[36px] font-bold">
          React-shop
        </h1>
      </div>

      <nav className="hidden sm:flex w-full sm:w-[50%] justify-around text-xl">
        <NavLink to="/" className={getStyles}>Home</NavLink>
        <NavLink to="/products" className={getStyles}>Products</NavLink>
        <div className="flex gap-6">
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
        </div>
      </nav>

      <div className="group relative sm:ml-4">
        <span className="material-symbols-outlined cursor-pointer hover:border-b-2 border-indigo-500"
          onClick={()=>navigate('/login')}
        >
          account_circle
        </span>
        <div className="absolute bottom-[-20px] right-0 mt-2 hidden group-hover:block">
          <button
            className="text-sm text-emerald-800 bg-zinc-200 shadow-lg rounded px-3 py-1 cursor-pointer"
            onClick={handleAuthAction}
          >
            {islogged ? 'LogOut' : 'LogIn'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;