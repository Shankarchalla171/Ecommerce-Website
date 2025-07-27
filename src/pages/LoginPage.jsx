import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { MenuContext } from "../context/MenuContext";
import Sidebar from "../components/SideBar";

const API = 'https://api.escuelajs.co/api/v1/auth/login';

const LoginPage = () => {
  const { islogged,name,email, password, photo,authDispatch } = useContext(AuthContext);
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

  const getToken = async (email, password) => {
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
  const getData=async(token)=>{
    try {
      const response=await fetch("https://api.escuelajs.co/api/v1/auth/profile",{
        headers:{
           'Authorization': `Bearer ${token.access_token}`,
           'Content-Type': 'application/json'
        }
      });

      if(!response.ok){
            const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Network error occurred');
    }
  }
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const token = await getToken(email, password);

      if (token?.access_token) {
        const data=await getData(token);
        console.log(data);
        authDispatch({type:'NAME', payload:data.name});
        authDispatch({type:'PHOTO',payload:data.avatar});
        authDispatch({ type: 'LOGIN_SUCCESS', payload: token.access_token });
        navigate('/');
        
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

    const testEmail = "shankar@gmail.com";
    const testPassword = "12345678";


    setLoading(true);
    authDispatch({ type: 'EMAIL', payload: testEmail });
    authDispatch({ type: 'PASSWORD', payload: testPassword });

    const token = '123345586u5805';
    authDispatch({ type: 'LOGIN_SUCCESS', payload: token });
    navigate('/');
    // Note: Using alert is not ideal UX, but keeping for consistency
    setLoading(false);

  };

  const handleLogout = () => {
    authDispatch({ type: 'LOGOUT' });
    navigate('/');
    setError(null);
    // Note: Using alert is not ideal UX, but keeping for consistency
  };

 
  const GotoSign=()=>{
    navigate('/signin');
  }

  return (
    <>
      <Navbar />
      <main className="w-full flex justify-center p-4 min-h-screen  dark:bg-[rgb(20,20,20)] transition-all duration-500 ease-in-out">
        {/* Sidebar Overlay */}
        <Sidebar />

        {/* Login Form */}
        <div className="w-full max-w-lg mx-auto mt-20 px-4 sm:px-6">
          <div className="bg-white dark:bg-[#1f1d2b] dark:border-1 dark:border-violet-800 border border-zinc-200 shadow-xl rounded-3xl p-4 sm:p-6 transition-all duration-500 ease-in-out">

            <form onSubmit={islogged ? handleLogout : handleLogin} className="space-y-8">
              <div className="space-y-1">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-zinc-900 dark:text-gray-300 tracking-tight transition-all duration-500 ease-in-out">
                  {islogged ? "Welcome Back" : "Login In"}
                </h2>
                <p className="text-center text-sm text-zinc-500 dark:text-gray-400 transition-all duration-500 ease-in-out">
                  {islogged ? "" : "Access your account to continue"}
                </p>
                {islogged && (
                  <div className="flex flex-col sm:flex-row gap-8 mt-7">
                    <span>
                      <img src={photo} alt="user_photo" className="rounded-full" />
                    </span>
                    <div className="p-2  flex flex-col justify-center" >
                      <div className="text-2xl font-bold text-zinc-500 dark:text-gray-400">{name}</div>
                      <div className="text-md font-bold text-zinc-500 dark:text-gray-400">{email}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Error Alert */}
              {error && (
                <div className="text-sm text-red-700 bg-red-100 border border-red-300 rounded-lg p-3">
                  {error}
                </div>
              )}

              {!islogged && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-gray-300 transition-all duration-500 ease-in-out">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email || ""}
                      onChange={handleEmailChange}
                      disabled={loading}
                      placeholder="you@example.com"
                      className="mt-1 block w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-amber-400 focus:ring-amber-400 shadow-sm placeholder:text-zinc-400 text-zinc-800 bg-zinc-50 disabled:bg-zinc-100 disabled:cursor-not-allowed"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-zinc-700 dark:text-gray-300 transition-all duration-500 ease-in-out">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password || ""}
                      onChange={handlePasswordChange}
                      disabled={loading}
                      placeholder="••••••••"
                      className="mt-1 block w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-amber-400 focus:ring-amber-400 shadow-sm placeholder:text-zinc-400 text-zinc-800 bg-zinc-50 disabled:bg-zinc-100 disabled:cursor-not-allowed"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 px-6 text-base font-semibold rounded-xl transition-colors duration-300 shadow-sm ${islogged
                      ? "bg-red-500 hover:bg-red-600 text-white dark:text-gray-300"
                      : "bg-amber-400 hover:bg-amber-500 text-white dark:text-gray-300"
                    } disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 ease-in-out`}
                >
                  {loading ? "Processing..." : islogged ? "Log Out" : "Log In"}
                </button>
                {!islogged && (
                  <button
                    type="button"
                    onClick={handleTestLogin}
                    disabled={loading}
                    className="w-full py-3 px-6 text-base font-medium rounded-xl border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-700 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed "
                  >
                    {loading ? "Processing..." : "Log In with Test Credentials"}
                  </button>
                  
                )}
                {!islogged && 
                (<p className="font-bold  text-blue-700  underline hover:cursor-pointer" onClick={GotoSign}>Create New Account</p>)
                }

              </div>
            </form>
          </div>
        </div>

      </main>
    </>
  );
};

export default LoginPage;