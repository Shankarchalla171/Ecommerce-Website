import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { MenuContext } from "../context/MenuContext";
import Sidebar from "../components/SideBar";

const API = 'https://api.escuelajs.co/api/v1/auth/login';

const LoginPage = () => {
  const { islogged, email, password, authDispatch } = useContext(AuthContext);
  const { menu, setMenu } = useContext(MenuContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Prevent background scrolling when sidebar is open
  useEffect(() => {
    if (menu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menu]);

  const handleEmailChange = (e) => {
    setError(null); // Clear error when user starts typing
    authDispatch({ type: 'EMAIL', payload: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setError(null); // Clear error when user starts typing
    authDispatch({ type: 'PASSWORD', payload: e.target.value });
  };

  const postData = async (email, password) => {
    try {
      const response = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Network error occurred');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const token = await postData(email, password);

      if (token?.access_token) {
        authDispatch({ type: 'LOGIN_SUCCESS', payload: token.access_token });
        navigate('/');
        // Note: Using alert is not ideal UX, but keeping for consistency
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      setError(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleTestLogin = async (e) => {
    e.preventDefault();
    
    const testEmail = "shuxrat@gmail.com";
    const testPassword = "1234";

    try {
      setLoading(true);
      setError(null);

      authDispatch({ type: 'EMAIL', payload: testEmail });
      authDispatch({ type: 'PASSWORD', payload: testPassword });

      const token = await postData(testEmail, testPassword);

      if (token?.access_token) {
        authDispatch({ type: 'LOGIN_SUCCESS', payload: token.access_token });
        navigate('/');
        // Note: Using alert is not ideal UX, but keeping for consistency
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      setError(error.message || 'Test login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authDispatch({ type: 'LOGOUT' });
    setError(null);
    // Note: Using alert is not ideal UX, but keeping for consistency
  };

  const handleMenuToggle = () => {
    setMenu(prev => !prev);
  };

  const handleSidebarClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <Navbar />
      <main className="w-full flex justify-center p-4 min-h-screen">
        {/* Sidebar Overlay */}
        <aside
          className={`fixed top-0 left-0 z-20 w-full h-screen bg-[#f7f3f337] transition-opacity duration-300 ${
            menu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          onClick={handleMenuToggle}
        >
          <div
            className={`w-4/5 max-w-[320px] h-full p-4 bg-amber-50 shadow-lg flex items-center transition-transform duration-300 ease-in-out overflow-y-auto ${
              menu ? "translate-x-0" : "-translate-x-full"
            }`}
            onClick={handleSidebarClick}
          >
            <Sidebar />
          </div>
        </aside>

        {/* Login Form */}
        <div className="w-full max-w-md bg-zinc-100 p-6  h-max rounded-2xl shadow-lg mt-10 flex flex-col">
          <form className="flex flex-col gap-6" onSubmit={islogged ? handleLogout : handleLogin}>
            <h1 className="text-2xl md:text-3xl font-bold text-center underline">
              {islogged ? 'Log Out' : 'Log In'}
            </h1>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {!islogged && (
              <>
                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="font-medium">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email || ''}
                    placeholder="Enter your email..."
                    onChange={handleEmailChange}
                    disabled={loading}
                    className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="password" className="font-medium">Password</label>
                  <input
                    id="password"
                    type="password"
                    value={password || ''}
                    placeholder="Enter your password..."
                    onChange={handlePasswordChange}
                    disabled={loading}
                    className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    required
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`font-semibold py-2 px-4 rounded-lg transition-all ${
                islogged 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-amber-400 hover:bg-amber-500 text-white'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? 'Processing...' : (islogged ? 'Log Out' : 'Log In')}
            </button>

            {!islogged && (
              <button
                type="button"
                onClick={handleTestLogin}
                disabled={loading}
                className="bg-zinc-300 hover:bg-zinc-400 text-black font-medium py-2 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Log In with Test Credentials'}
              </button>
            )}
          </form>
        </div>
      </main>
    </>
  );
};

export default LoginPage;