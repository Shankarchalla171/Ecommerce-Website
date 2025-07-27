import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar";

const API = 'https://api.escuelajs.co/api/v1';
const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { islogged, name, email, password, authDispatch } = useContext(AuthContext);

    const handleNameChange = (e) => {
        setError(null); // Clear error when user starts typing
        authDispatch({ type: 'NAME', payload: e.target.value });
    }
    const handleEmailChange = (e) => {
        setError(null); // Clear error when user starts typing
        authDispatch({ type: 'EMAIL', payload: e.target.value });
    }
    const handlePasswordChange = (e) => {
        setError(null); // Clear error when user starts typing
        authDispatch({ type: 'PASSWORD', payload: e.target.value });
    }
    const handlePhotoChange = () => {

    }
    const GotoLogin = () => {
        navigate('/login')
    }
    const postData = async () => {
        try {
            const response = await fetch(`${API}/users/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, avatar: "https://images.unsplash.com/photo-1554080353-a576cf803bda?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG98ZW58MHx8MHx8fDA%3D" }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            throw new Error(error.message || 'Network error occurred');
        }
    }

    const GetToken = async (email, password) => {
        try {
            const response = await fetch(`${API}/auth/login`, {
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
    }
    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError("please fill the required fields in the form..");
        }

        try {

            setLoading(true);
            setError(null);
            const user = await postData();
            const token = await GetToken(user.email, user.password);

            if (token?.access_token) {
                authDispatch({ type: 'LOGIN_SUCCESS', payload: token.access_token });
                navigate('/');
                // Note: Using alert is not ideal UX, but keeping for consistency
            } else {
                throw new Error('Invalid response from server');
            }

        } catch (error) {
            setError(error.message || 'Login failed');
        }finally{
            setLoading(false);
        }
    }
    return (
        <>
            <Navbar />
            <main className="w-full flex justify-center p-4 min-h-screen dark:bg-[rgb(20,20,20)] transition-all duration-500 ease-in-out">
                {/* Sidebar Overlay */}
                <Sidebar />

                {/* Sign-Up Form */}
                <div className="w-full max-w-md mx-auto mt-20 px-4 sm:px-6">
                    <div className="bg-white dark:bg-[#1f1d2b] dark:border-1 dark:border-violet-800 border border-zinc-200 shadow-xl rounded-3xl p-10 sm:p-12 transition-all duration-500 ease-in-out">

                        <form onSubmit={handleSignUp} className="space-y-8">
                            <div className="space-y-1">
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-zinc-900 dark:text-gray-300 tracking-tight transition-all duration-500 ease-in-out">
                                    Create Account
                                </h2>
                                <p className="text-center text-sm text-zinc-500 dark:text-gray-400 transition-all duration-500 ease-in-out">
                                    Fill in your details to sign up
                                </p>
                            </div>

                            {/* Error Alert */}
                            {error && (
                                <div className="text-sm text-red-700 bg-red-100 border border-red-300 rounded-lg p-3">
                                    {error}
                                </div>
                            )}

                            {/* Input Fields */}
                            <div className="space-y-6">
                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-gray-300 transition-all duration-500 ease-in-out">
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={name || ""}
                                        onChange={handleNameChange}
                                        disabled={loading}
                                        placeholder="Your Name"
                                        className="mt-1 block w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-amber-400 focus:ring-amber-400 shadow-sm placeholder:text-zinc-400 text-zinc-800 bg-zinc-50 disabled:bg-zinc-100 disabled:cursor-not-allowed"
                                        required
                                    />
                                </div>
                                {/* Email */}
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

                                {/* Password */}
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

                                {/* photo*/}
                                <div>
                                    <label htmlFor="clg" className="block text-sm font-medium text-zinc-700 dark:text-gray-300 transition-all duration-500 ease-in-out">
                                        Profile Photo
                                    </label>
                                    <input
                                        id="clg"
                                        type="text"
                                        value={"https://images.unsplash.com/photo-1554080353-a576cf803bda?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG98ZW58MHx8MHx8fDA%3D"}
                                        onChange={handlePhotoChange}
                                        disabled={loading}
                                        className="mt-1 block w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-amber-400 focus:ring-amber-400 shadow-sm placeholder:text-zinc-400 text-zinc-800 bg-zinc-50 disabled:bg-zinc-100 disabled:cursor-not-allowed"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="space-y-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-3 px-6 text-base font-semibold rounded-xl transition-colors duration-300 shadow-sm bg-amber-400 hover:bg-amber-500 text-white dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 ease-in-out`}
                                >
                                    {loading ? "Processing..." : "Sign Up"}
                                </button>

                                <p className="text-center text-sm text-zinc-500 dark:text-gray-400">
                                    Already have an account?{" "}
                                    <span
                                        onClick={GotoLogin}
                                        className="font-bold text-blue-700 underline hover:cursor-pointer"
                                    >
                                        Log In
                                    </span>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

        </>
    )
}

export default SignUp