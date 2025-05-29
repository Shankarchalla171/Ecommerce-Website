import React, { useContext } from "react";
import Navbar from "../components/navbar";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API = 'https://api.escuelajs.co/api/v1/auth/login';

const Loginpage = () => {
    const { islogged, email, password, authDispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const setEmail = (e) => {
        authDispatch({ type: 'EMAIL', payload: e.target.value });
    };

    const setPassword = (e) => {
        authDispatch({ type: 'PASSWORD', payload: e.target.value });
    };

    const postData = async (email, password) => {
        try {
            const res = await fetch(API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Login failed');
            }

            return await res.json();
        } catch (error) {
            console.log(error);
        }
    };

    const LogIN = async (e) => {
        e.preventDefault();
        const token = await postData(email, password);

        if (token?.access_token) {
            authDispatch({ type: 'LOGIN_SUCCESS', payload: token.access_token });
            navigate('/');
            alert("Your login has been successful");
        }
    };

    const testLogIN = async (e) => {
        e.preventDefault();
        const testEmail = "john@mail.com";
        const testPassword = "changeme";

        authDispatch({ type: 'EMAIL', payload: testEmail });
        authDispatch({ type: 'PASSWORD', payload: testPassword });

        const token = await postData(testEmail, testPassword);

        if (token?.access_token) {
            authDispatch({ type: 'LOGIN_SUCCESS', payload: token.access_token });
            navigate('/');
            alert("Logged in with test credentials");
        }
    };

    const LogOut = () => {
        authDispatch({ type: 'LOGOUT' });
        alert("You have logged out successfully");
    };

    return (
        <>
            <Navbar />
            <main className="w-full flex justify-center p-4">
                <div className="w-full max-w-md bg-zinc-100 p-6 rounded-2xl shadow-lg mt-10 flex flex-col">
                    <form className="flex flex-col gap-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-center underline">
                            {islogged ? 'Log Out' : 'Log In'}
                        </h1>

                        <div className="flex flex-col gap-1">
                            <label className="font-medium">Email</label>
                            <input
                                type="email"
                                value={email}
                                placeholder="Enter your email..."
                                onChange={setEmail}
                                className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="font-medium">Password</label>
                            <input
                                type="password"
                                value={password}
                                placeholder="Enter your password..."
                                onChange={setPassword}
                                className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                            />
                        </div>

                        <button
                            className="bg-amber-400 hover:bg-amber-500 text-white font-semibold py-2 px-4 rounded-lg transition-all"
                            onClick={islogged ? LogOut : LogIN}
                        >
                            {islogged ? 'Log Out' : 'Log In'}
                        </button>

                        {!islogged && (
                            <button
                                className="bg-zinc-300 hover:bg-zinc-400 text-black font-medium py-2 px-4 rounded-lg transition-all"
                                onClick={testLogIN}
                            >
                                Log In with Test Credentials
                            </button>
                        )}
                    </form>
                </div>
            </main>
        </>
    );
};

export default Loginpage;
